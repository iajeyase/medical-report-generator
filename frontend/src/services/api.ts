import axios from 'axios';
import type { PatientData, MedicalReport } from '../types';

const API_BASE = 'http://localhost:3001/api';

export const api = {
  checkHealth: async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
  },

  generateReport: async (patientData: PatientData): Promise<MedicalReport> => {
    const response = await axios.post(`${API_BASE}/generate-report`, patientData);
    return response.data;
  }
};