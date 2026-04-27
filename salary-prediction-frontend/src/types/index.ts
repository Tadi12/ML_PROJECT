export interface PredictionFormData {
  age: number;
  education: string;
  experience: number;
  job_role: string;
  location?: string;
}

export interface PredictionResponse {
  predicted_salary: number;
}
