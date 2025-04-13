
# 📦 Barcode & Nutrition Analyzer

An intelligent web application that allows users to upload an image of a food product (with a barcode or QR code), then extracts the **barcode**, retrieves **nutrition details**, and enhances the result with **AI-powered health analysis** using LangChain and Gemini.

---

## 🚀 Features

- 📷 Upload images of food products
- 🔍 Automatically detects barcodes or QR codes
- 🧠 Extracts nutritional facts using OCR
- 🤖 Integrates with Google Gemini via LangChain for intelligent analysis
- 🌐 Built with **FastAPI backend** + **React frontend**
- 🔄 Frontend and backend communicate using REST API

---

## 📁 Project Structure

```
├── backend/
│   ├── main.py                  # FastAPI server
│   ├── Scanner_update.py        # Barcode scanner module (custom)
│   ├── Bot.py                   # LLM-driven product information extractor
│   └── temp/                    # Temporary file storage
│
├── frontend/
│   ├── Home.jsx                 # Image upload and result display
│   ├── MessageFeedback.jsx      # Displays sections (warnings, benefits, etc.)
│   ├── CSS/
│   │   └── home.css             # Styling for the UI
│   └── ...                     # React/Vite boilerplate
```

---

## ⚙️ Backend - FastAPI (`main.py`)

### 🔧 Features:
- Accepts image upload via `/upload`
- Extracts barcode/QR from the image
- Passes image to `data()` (LLM-enhanced function) to get nutrition info and product insights
- Sends result back to frontend

### 🔐 CORS Config:
Make sure your frontend (React/Vite) port matches this:
```python
allow_origins=["http://localhost:5173"]
```

---

## 💻 Frontend - React (`Home.jsx`)

### 🔧 Features:
- Handles file uploads
- Sends image to `/upload` backend
- Displays:
  - Product Name
  - Nutrition Table
  - AI-explained health warnings, benefits, and suggestions

---

## 🔗 API Contract

### `POST /upload`

**Request**:
- Content-Type: `multipart/form-data`
- Body:
```form-data
file: <image>
```

**Response**:
```json
{
  "product": {
    "name": "Nutella",
    "brand": "Ferrero",
    "nutrition_value": {
      "Calories": "200 kcal",
      "Protein": "2g"
    },
    "harmful_substances": [...],
    "health_benefits_uses": [...],
    "warnings_side_effects": [...],
    "products": {
      "alternative_suggestions": [...]
    }
  }
}
```

---

## 🧪 How to Run

### 📦 Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

> Ensure `.env` has your Gemini API Key.

### 🌐 Frontend
```bash
cd frontend
npm install
npm run dev
```

> Make sure it runs on port `5173` (or change CORS config in backend).

---

## 🧠 Powered By

- [FastAPI](https://fastapi.tiangolo.com/) – Python web framework
- [React](https://reactjs.org/) – Frontend UI
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) – Text extraction from images
- [Pyzbar](https://github.com/NaturalHistoryMuseum/pyzbar) – Barcode/QR decoding
- [LangChain](https://www.langchain.com/) – Tool abstraction + memory
- [Google Gemini](https://ai.google.dev/) – Generative AI for analysis

---

## 🛠️ To-Do / Future Improvements

- [ ] Improve OCR with better image denoising
- [ ] Use Open Food Facts API for barcode lookups
- [ ] Offline fallback for Gemini
- [ ] Upload history and local cache
- [ ] Mobile support for camera capture

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📃 License

MIT License – use freely, modify with credits!
