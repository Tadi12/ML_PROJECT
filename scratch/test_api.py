
import requests

url = "http://localhost:8000/predict"
data = {
    "age": 30,
    "gender": "Male",
    "education": "Bachelor's",
    "job_role": "Software Engineer",
    "experience": 5
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
