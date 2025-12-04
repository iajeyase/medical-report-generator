export interface PatientData {
  patientId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  symptoms: string[];
  vitalSigns: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
  };
  diagnosis: string;
  medications: string[];
  allergies: string[];
  notes: string;
}

export interface MedicalReport {
  reportId: string;
  generatedAt: string;
  patientId: string;
  report: string;
  sections: {
    patientInfo: string;
    chiefComplaint: string;
    clinicalFindings: string;
    assessment: string;
    treatment: string;
  };
}