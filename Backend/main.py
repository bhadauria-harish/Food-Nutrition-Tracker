from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

# Your custom modules
from Scanner_update import QRCodeScannerTool, barcode_number
from Bot import get_product_info, data  # Handles barcode → product info

app = FastAPI()

# ✅ Allow frontend (Vite/React) connection — no trailing slash!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React/Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    # Step 1: Save the uploaded image
    os.makedirs("temp", exist_ok=True)
    temp_path = f"temp/{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 2: Process image to extract barcode/product info
    # If you use QR/barcode reader:
    # qr_result = QRCodeScannerTool()._run(temp_path)
    # barcode = qr_result[0]["data"] if isinstance(qr_result, list) and qr_result else None

    # Optional: If using barcode_number for decoding
    # barcodeNumber = barcode_number(temp_path)
    # if not barcodeNumber:
    #     return {
    #         "error": "No barcode found in the image.",
    #         "status": "fail"
    #     }
    # product_data = get_product_info(barcodeNumber)

    # If using your `data()` function directly:
    product_data = data(temp_path)

    # Step 3: Return data to frontend
    return {
        "product": product_data
    }
