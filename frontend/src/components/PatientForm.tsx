import React, { useState } from 'react';
import type { PatientData } from '../types';

interface Props {
  onSubmit: (data: PatientData) => void;
  isLoading: boolean;
}

export const PatientForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PatientData>({
    patientId: '',
    age: 0,
    gender: 'male',
    symptoms: [],
    vitalSigns: {},
    diagnosis: '',
    medications: [],
    allergies: [],
    notes: ''
  });

  const [symptomInput, setSymptomInput] = useState('');
  const [medicationInput, setMedicationInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSymptom = () => {
    if (symptomInput.trim()) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, symptomInput.trim()]
      }));
      setSymptomInput('');
    }
  };

  const addMedication = () => {
    if (medicationInput.trim()) {
      setFormData(prev => ({
        ...prev,
        medications: [...prev.medications, medicationInput.trim()]
      }));
      setMedicationInput('');
    }
  };

  const addAllergy = () => {
    if (allergyInput.trim()) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()]
      }));
      setAllergyInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h2>Patientendaten</h2>

      <div className="form-group">
        <label>Patienten-ID *</label>
        <input
          type="text"
          value={formData.patientId}
          onChange={e => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Alter *</label>
          <input
            type="number"
            value={formData.age}
            onChange={e => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
            required
          />
        </div>

        <div className="form-group">
          <label>Geschlecht</label>
          <select
            value={formData.gender}
            onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
          >
            <option value="male">Männlich</option>
            <option value="female">Weiblich</option>
            <option value="other">Divers</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Symptome</label>
        <div className="input-with-button">
          <input
            type="text"
            value={symptomInput}
            onChange={e => setSymptomInput(e.target.value)}
            placeholder="z.B. Kopfschmerzen"
          />
          <button type="button" onClick={addSymptom}>Hinzufügen</button>
        </div>
        <div className="tags">
          {formData.symptoms.map((s, i) => (
            <span key={i} className="tag">
              {s}
              <button type="button" onClick={() => setFormData(prev => ({
                ...prev,
                symptoms: prev.symptoms.filter((_, idx) => idx !== i)
              }))}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Vitalzeichen</label>
        <div className="vitals-grid">
          <input
            type="text"
            placeholder="Blutdruck (z.B. 120/80)"
            value={formData.vitalSigns.bloodPressure || ''}
            onChange={e => setFormData(prev => ({
              ...prev,
              vitalSigns: { ...prev.vitalSigns, bloodPressure: e.target.value }
            }))}
          />
          <input
            type="number"
            placeholder="Herzfrequenz"
            value={formData.vitalSigns.heartRate || ''}
            onChange={e => setFormData(prev => ({
              ...prev,
              vitalSigns: { ...prev.vitalSigns, heartRate: parseInt(e.target.value) }
            }))}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Temperatur (°C)"
            value={formData.vitalSigns.temperature || ''}
            onChange={e => setFormData(prev => ({
              ...prev,
              vitalSigns: { ...prev.vitalSigns, temperature: parseFloat(e.target.value) }
            }))}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Diagnose *</label>
        <input
          type="text"
          value={formData.diagnosis}
          onChange={e => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
          required
          placeholder="z.B. Akute Bronchitis"
        />
      </div>

      <div className="form-group">
        <label>Medikation</label>
        <div className="input-with-button">
          <input
            type="text"
            value={medicationInput}
            onChange={e => setMedicationInput(e.target.value)}
            placeholder="z.B. Ibuprofen 400mg"
          />
          <button type="button" onClick={addMedication}>Hinzufügen</button>
        </div>
        <div className="tags">
          {formData.medications.map((m, i) => (
            <span key={i} className="tag">
              {m}
              <button type="button" onClick={() => setFormData(prev => ({
                ...prev,
                medications: prev.medications.filter((_, idx) => idx !== i)
              }))}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Allergien</label>
        <div className="input-with-button">
          <input
            type="text"
            value={allergyInput}
            onChange={e => setAllergyInput(e.target.value)}
            placeholder="z.B. Penicillin"
          />
          <button type="button" onClick={addAllergy}>Hinzufügen</button>
        </div>
        <div className="tags">
          {formData.allergies.map((a, i) => (
            <span key={i} className="tag">
              {a}
              <button type="button" onClick={() => setFormData(prev => ({
                ...prev,
                allergies: prev.allergies.filter((_, idx) => idx !== i)
              }))}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Zusätzliche Notizen</label>
        <textarea
          value={formData.notes}
          onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={4}
          placeholder="Weitere relevante Informationen..."
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Generiere Bericht...' : 'Bericht generieren'}
      </button>
    </form>
  );
};