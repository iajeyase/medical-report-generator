import React, { useState, useEffect } from 'react';
import { PatientForm } from './components/PatientForm';
import { ReportDisplay } from './components/ReportDisplay';
import { api } from './services/api';
import type { PatientData, MedicalReport } from './types';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<MedicalReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ollamaStatus, setOllamaStatus] = useState<boolean>(false);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const health = await api.checkHealth();
      setOllamaStatus(health.ollama === 'connected');
    } catch {
      setOllamaStatus(false);
    }
  };

  const handleGenerateReport = async (patientData: PatientData) => {
    setIsLoading(true);
    setError(null);

    try {
      const generatedReport = await api.generateReport(patientData);
      setReport(generatedReport);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Fehler beim Generieren des Berichts');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>KISIM AI - Medical Report Generator</h1>
        <div className={`status ${ollamaStatus ? 'online' : 'offline'}`}>
          Ollama: {ollamaStatus ? 'Verbunden' : 'Nicht verbunden'}
        </div>
      </header>

      <main>
        {error && <div className="error-banner">{error}</div>}

        <div className="layout">
          <div className="form-section">
            <PatientForm onSubmit={handleGenerateReport} isLoading={isLoading} />
          </div>

          <div className="report-section">
            {isLoading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Generiere Arztbericht... Dies kann 30-60 Sekunden dauern.</p>
              </div>
            )}
            {report && !isLoading && <ReportDisplay report={report} />}
            {!report && !isLoading && (
              <div className="placeholder">
                <p>Fülle das Formular aus und generiere einen Bericht.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;