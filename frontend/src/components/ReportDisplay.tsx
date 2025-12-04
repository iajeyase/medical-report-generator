import React, { useState } from 'react';
import type { MedicalReport } from '../types';

interface Props {
  report: MedicalReport;
}

export const ReportDisplay: React.FC<Props> = ({ report }) => {
  const [editedReport, setEditedReport] = useState(report.report);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Hier könntest du den editierten Report speichern
    console.log('Saving edited report:', editedReport);
    setIsEditing(false);
  };

  return (
    <div className="report-display">
      <div className="report-header">
        <h2>Generierter Arztbericht</h2>
        <div className="report-meta">
          <span>Report ID: {report.reportId}</span>
          <span>Erstellt: {new Date(report.generatedAt).toLocaleString('de-CH')}</span>
          <span>Patient: {report.patientId}</span>
        </div>
      </div>

      <div className="report-actions">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Abbrechen' : 'Bearbeiten'}
        </button>
        {isEditing && <button onClick={handleSave}>Speichern</button>}
        <button onClick={() => window.print()}>Drucken</button>
      </div>

      <div className="report-content">
        {isEditing ? (
          <textarea
            value={editedReport}
            onChange={e => setEditedReport(e.target.value)}
            rows={25}
            className="report-editor"
          />
        ) : (
          <pre className="report-text">{editedReport}</pre>
        )}
      </div>
    </div>
  );
};