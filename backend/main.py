
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and encoders
MODEL_PATH = 'model/salary_model.pkl'
LE_GENDER_PATH = 'model/le_gender.pkl'
LE_EDUCATION_PATH = 'model/le_education.pkl'
LE_JOB_PATH = 'model/le_job.pkl'

if not all(os.path.exists(p) for p in [MODEL_PATH, LE_GENDER_PATH, LE_EDUCATION_PATH, LE_JOB_PATH]):
    raise RuntimeException("Model files missing. Please run train_model.py first.")

model = joblib.load(MODEL_PATH)
le_gender = joblib.load(LE_GENDER_PATH)
le_education = joblib.load(LE_EDUCATION_PATH)
le_job = joblib.load(LE_JOB_PATH)

class PredictionInput(BaseModel):
    age: float
    gender: str
    education: str
    job_role: str
    experience: float

@app.get("/")
def read_root():
    return {"message": "Salary Prediction API is running"}

@app.get("/metadata")
def get_metadata():
    return {
        "genders": list(le_gender.classes_),
        "education_levels": list(le_education.classes_),
        "job_titles": list(le_job.classes_)
    }

@app.post("/predict")
def predict(data: PredictionInput):
    try:
        # Encode inputs
        try:
            gender_encoded = le_gender.transform([data.gender])[0]
        except ValueError:
            gender_encoded = le_gender.transform([le_gender.classes_[0]])[0] # Default to first
            
        try:
            education_encoded = le_education.transform([data.education])[0]
        except ValueError:
            education_encoded = le_education.transform([le_education.classes_[0]])[0]
            
        try:
            job_encoded = le_job.transform([data.job_role])[0]
        except ValueError:
            # Fallback for unseen job titles: map to the most common one or a default
            # For now, let's just pick the first one to avoid crash, 
            # in a real app we'd have an 'Other' category
            job_encoded = le_job.transform([le_job.classes_[0]])[0]
            
        # Prepare feature vector
        features = np.array([[data.age, gender_encoded, education_encoded, job_encoded, data.experience]])
        
        # Predict
        prediction = model.predict(features)
        
        return {"predicted_salary": round(float(prediction[0]), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
