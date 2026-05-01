# Salary Prediction System 🚀

A full-stack Machine Learning application that predicts employee salaries based on age, gender, education level, job role, and years of experience. This project features a robust ML pipeline, a high-performance FastAPI backend, and a modern Next.js frontend.

---

## 🌟 Features
- **Data-Driven Predictions:** Accurate salary estimation using Linear Regression.
- **Automated ML Pipeline:** End-to-end processing from data cleaning to model export.
- **Interactive Dashboard:** Premium UI built with Next.js and Tailwind CSS for easy input and instant results.
- **Real-time API:** Scalable FastAPI backend with automatic Swagger documentation.
- **Comprehensive Visualizations:** Automatically generated EDA plots (Salary Distribution, Experience vs Salary, etc.).

---

## 🛠️ Tech Stack

### Machine Learning & Data Science
- **Python 3.10+**
- **Scikit-learn:** Model training and evaluation.
- **Pandas & NumPy:** Data manipulation and processing.
- **Matplotlib & Seaborn:** Data visualization and EDA.
- **Joblib:** Model serialization.

### Backend
- **FastAPI:** Modern, high-performance web framework.
- **Uvicorn:** ASGI server for production deployment.
- **Pydantic:** Data validation and settings management.

### Frontend
- **Next.js 15 (App Router):** React framework for production.
- **React 19:** UI library.
- **Tailwind CSS 4:** Utility-first styling with modern aesthetics.
- **Lucide React:** Iconography.

---

## 📁 Project Structure

```text
ML_PROJECT/
├── backend/                # FastAPI application
│   └── main.py             # API entry point & prediction logic
├── model/                  # Trained models & label encoders (.pkl)
├── plots/                  # Generated EDA visualizations
├── salary-prediction-frontend/ # Next.js frontend application
│   ├── src/                # UI components & logic
│   └── package.json        # Frontend dependencies
├── train_model.py          # ML pipeline & model training script
├── Salary Data.csv         # Raw dataset
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn

### 2. Backend Setup
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. (Optional) Train the model to generate the latest artifacts:
   ```bash
   python3 train_model.py
   ```
3. Start the FastAPI server:
   ```bash
   python3 backend/main.py
   ```
   *The API will be available at `http://localhost:8000`.*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd salary-prediction-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The application will be live at `http://localhost:3000`.*

---

## 📊 Model Performance
The current Linear Regression model achieves high precision in salary estimation. 
Detailed metrics (MAE, MSE, R2 Score) are generated during the execution of `train_model.py` and visualized in the `plots/` directory.
- **R2 Score:** High correlation between features and target salary.

Check the `plots/` directory for detailed insights into the data distributions and correlations.

---

## 📝 License
This project is for educational purposes. Feel free to use and modify it.

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.

---

## 👥 Group Members (Group 6)
| No. | Name | ID Number |
|:---:|:---|:---:|
| 1 | DEREJE TESFAYE | 160416 |
| 2 | TADIOS MISGANAW | 161162 |
| 3 | WAGNEW NIGUSSIE | 161255 |
| 4 | EYERUSALEM NIGUSSIE | 160528 |
| 5 | BIZUYE ABEBE | 160355 |
| 6 | GEBREMIKEAL AWOTA | 160578 |
