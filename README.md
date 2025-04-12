# Food-Nutrition-Tracker
ByteVerse hackathon project

A smart web application that scans QR codes and nutrition labels from food product images. It extracts detailed nutritional information and provides insightful analysis using the Gemini API. Built with React (JSS), HTML, CSS, and Python (Streamlit, LangChain).

Features
1.QR & Barcode Scanner
Scan barcodes or QR codes directly from images and extract their data.

2.Nutrition Label Analyzer
Uses OCR (Tesseract) to extract and parse nutritional values from food labels.

3.Gemini AI-Powered Insights
Fills missing data and generates useful food information, health benefits, harmful substances, and suggestions.

4. Integration with OpenFoodFacts & UPC DB
Looks up product data from multiple online sources before falling back to Gemini for inference.

5. Conversational Agent Support
Ask questions in natural language about the food product—powered by LangChain and Gemini Pro.
