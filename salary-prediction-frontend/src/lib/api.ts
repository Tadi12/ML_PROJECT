import axios from 'axios';
import { PredictionFormData, PredictionResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictSalary = async (data: PredictionFormData): Promise<PredictionResponse> => {
  try {
    const response = await api.post<PredictionResponse>('/api/predict', data);
    return response.data;
  } catch (error) {
    console.error('Error predicting salary:', error);
    throw error;
  }
};

export default api;
