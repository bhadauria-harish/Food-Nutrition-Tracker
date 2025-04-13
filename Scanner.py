from tempfile import NamedTemporaryFile # temporary saving of file to upload in FastAPI
import os # For accessing environment variables and file paths
from dotenv import load_dotenv # Loads variables from a .env file(likely API Keys)
from langchain.agents import initialize_agent # To initialize agent
from langchain.chains.conversation.memory import ConversationBufferWindowMemory # Save memory of past k searches
from langchain.tools import BaseTool 
import cv2 # Image processing Task
import numpy as np # For array manipulation
from pyzbar.pyzbar import decode # Scans and decodes QR codes or barcodes
from PIL import Image # Handles image formats
import torch
import re # For regular expression pattern matching
import pytesseract # Uses OCR library to extract text from image
import pandas as pd # Data handling
from langchain_google_genai import GoogleGenerativeAI # Use Gemini API as LLM 

# ------------------ CONFIG ------------------
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe" # Set the tesseract path
load_dotenv() # Loads the environment variables from .env
api_key = os.getenv("API_KEY")  # Replace with your API key

# ------------------ OCR PREPROCESSING ------------------
def preprocess_for_ocr(image):
    gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY) # Converts image to grayscale
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU) # Applies thresholding to clean up the image for OCR.
    return Image.fromarray(thresh) # Converts back to PIL Image format

# ------------------ TOOL DEFINITIONS ------------------
class QRCodeScannerTool(BaseTool):
    name: str = "QR code scanner"
    description: str = "Scans QR or barcode from the image."

    def _run(self, img_path): # Loads image using OpenCV, scans for QR/barcode using pyzbar, returns decoded results.
        image = cv2.imread(img_path)
        if image is None:
            return "Failed to load image for QR scanning."
        decoded_objects = decode(image)
        if not decoded_objects:
            return "No QR or barcode found."
        results = [{"data": obj.data.decode("utf-8"), "type": obj.type} for obj in decoded_objects]
        return results

    def _arun(self, query: str): # Raises NotImplementedError because async is not implemented.
        raise NotImplementedError("Async not supported.")

class NutritionAnalyzerTool(BaseTool):
    name: str = "Nutrition analyzer"
    description: str = "Extracts nutrition info from a product label."

    def _run(self, img_path):
        raw_image = Image.open(img_path) # Loads the image
        image = preprocess_for_ocr(raw_image) # preprocesses the image using ocr
        text = pytesseract.image_to_string(image) # Extraction of string from image
        nutrition_data = {}

        lines = [line.strip() for line in text.split("\n") if line.strip()]
        joined_text = "\n".join(lines)

        # Define your nutrient_patterns here or load from external file
        nutrient_patterns = {
                # Macronutrients
                "Calories": {
                    "pattern": r"(?:calories|energy|food\s*energy).*?(\d+)\s*k?cal",
                    "unit": "kcal",
                    "type": "macronutrient"
                },
                "Total Fat": {
                    "pattern": r"total\s*fat.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Saturated Fat": {
                    "pattern": r"saturated\s*fat.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Trans Fat": {
                    "pattern": r"trans\s*fat.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Monounsaturated Fat": {
                    "pattern": r"monounsaturated\s*fat.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Polyunsaturated Fat": {
                    "pattern": r"polyunsaturated\s*fat.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Cholesterol": {
                    "pattern": r"cholesterol.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "macronutrient"
                },
                "Sodium": {
                    "pattern": r"sodium.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "macronutrient"
                },
                "Total Carbohydrates": {
                    "pattern": r"total\s*carbohydrates.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Dietary Fiber": {
                    "pattern": r"dietary\s*fiber.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Sugars": {
                    "pattern": r"sugars.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Added Sugars": {
                    "pattern": r"added\s*sugars.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },
                "Protein": {
                    "pattern": r"proteins?.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "macronutrient"
                },

                # Vitamins
                "Vitamin A": {
                    "pattern": r"vitamin\s*a.?(\d+\.?\d)\s*(?:mcg|µg|iu)",
                    "unit": "mcg/IU",
                    "type": "vitamin"
                },
                "Vitamin B1 (Thiamine)": {
                    "pattern": r"(?:vitamin\s*b1|thiamine).?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "vitamin"
                },
                "Vitamin B2 (Riboflavin)": {
                    "pattern": r"(?:vitamin\s*b2|riboflavin).?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "vitamin"
                },
                "Vitamin B3 (Niacin / Nicotinic Acid)": {
                    "pattern": r"(?:vitamin\s*b3|niacin|nicotinic\s*acid).?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "vitamin"
                },
                "Vitamin B5 (Pantothenic Acid)": {
                    "pattern": r"(?:vitamin\s*b5|pantothenic\s*acid).?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "vitamin"
                },
                "Vitamin B6 (Pyridoxine)": {
                    "pattern": r"(?:vitamin\s*b6|pyridoxine).?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "vitamin"
                },
                "Vitamin B7 (Biotin)": {
                    "pattern": r"(?:vitamin\s*b7|biotin).?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "vitamin"
                },
                "Vitamin B9 (Folic Acid / Folate)": {
                    "pattern": r"(?:vitamin\s*b9|folic\s*acid|folate).?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "vitamin"
                },
                "Vitamin B12 (Cobalamin)": {
                    "pattern": r"(?:vitamin\s*b12|cobalamin).?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "vitamin"
                },
                "Vitamin C (Ascorbic Acid)": {
                    "pattern": r"(?:vitamin\s*c|ascorbic\s*acid).?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "vitamin"
                },
                "Vitamin D": {
                    "pattern": r"vitamin\s*d.?(\d+\.?\d)\s*(?:mcg|iu)",
                    "unit": "mcg/IU",
                    "type": "vitamin"
                },
                "Vitamin E": {
                    "pattern": r"vitamin\s*e.?(\d+\.?\d)\s*(?:mg|iu)",
                    "unit": "mg/IU",
                    "type": "vitamin"
                },
                "Vitamin K": {
                    "pattern": r"vitamin\s*k.?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "vitamin"
                },

                # Minerals
                "Calcium": {
                    "pattern": r"calcium.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Iron": {
                    "pattern": r"iron.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Magnesium": {
                    "pattern": r"magnesium.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Phosphorus": {
                    "pattern": r"phosphorus.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Potassium": {
                    "pattern": r"potassium.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Zinc": {
                    "pattern": r"zinc.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Copper": {
                    "pattern": r"copper.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Manganese": {
                    "pattern": r"manganese.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Selenium": {
                    "pattern": r"selenium.?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "mineral"
                },
                "Iodine": {
                    "pattern": r"iodine.?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "mineral"
                },
                "Chromium": {
                    "pattern": r"chromium.?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "mineral"
                },
                "Molybdenum": {
                    "pattern": r"molybdenum.?(\d+\.?\d)\s*mcg",
                    "unit": "mcg",
                    "type": "mineral"
                },
                "Fluoride": {
                    "pattern": r"fluoride.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },
                "Chloride": {
                    "pattern": r"chloride.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "mineral"
                },

                # Other components
                "Omega-3 Fatty Acids": {
                    "pattern": r"omega\s*-?3.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "other"
                },
                "Omega-6 Fatty Acids": {
                    "pattern": r"omega\s*-?6.?(\d+\.?\d)\s*g",
                    "unit": "g",
                    "type": "other"
                },
                "Caffeine": {
                    "pattern": r"caffeine.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "other"
                },
                "Taurine": {
                    "pattern": r"taurine.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "other"
                },
                "Creatine": {
                    "pattern": r"creatine.?(\d+\.?\d)\s*mg",
                    "unit": "mg",
                    "type": "other"
                }
        }

        for label, info in nutrient_patterns.items(): # matching of words from list
            match = re.search(info["pattern"], joined_text, re.IGNORECASE)
            if match:
                nutrition_data[label] = f"{match.group(1)} {info['unit']}"

        return nutrition_data if nutrition_data else "No nutrition data found.", joined_text

    def _arun(self, query: str):
        raise NotImplementedError("Async not supported.")

# ------------------ AGENT SETUP ------------------
tools = [QRCodeScannerTool(), NutritionAnalyzerTool()] # List of tools we used
memory = ConversationBufferWindowMemory(memory_key='chat_history', k=5, return_messages=True) # Remembers last 5 messages
llm = GoogleGenerativeAI(model="models/gemini-1.5-pro-latest", google_api_key=api_key) # Google Gemini API

# A conversational agent that uses the tools and Gemini to process queries, answer questions, etc.

agent = initialize_agent(
    agent="chat-conversational-react-description",
    tools=tools,
    llm=llm,
    max_iterations=5,
    verbose=True,
    memory=memory,
    early_stopping_method='generate',
    handle_parsing_errors=True
)

# Example usage of the tools
image_path = r"image_path"  # Provide the path to your image here

# Scan QR code
qr_result = QRCodeScannerTool()._run(image_path)
print(qr_result)

# Extract nutrition info
nutrition_result, raw_text = NutritionAnalyzerTool()._run(image_path)
print(nutrition_result)
