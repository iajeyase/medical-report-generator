import { PatientData, MedicalReport } from '../types';
import { OllamaService } from './ollamaService';
import { v4 as uuidv4 } from 'uuid';

export class ReportGenerator {
  private ollamaService: OllamaService;

  constructor() {
    this.ollamaService = new OllamaService();
  }

  private buildPrompt(data: PatientData): string {
    return `Du bist ein medizinischer Berichtsassistent. Erstelle einen strukturierten Arztbericht auf Deutsch.

PATIENTENDATEN:
- ID: ${data.patientId}
- Alter: ${data.age} Jahre
- Geschlecht: ${data.gender}
- Symptome: ${data.symptoms.join(', ')}
- Vitalzeichen: ${JSON.stringify(data.vitalSigns)}
- Diagnose: ${data.diagnosis}
- Medikation: ${data.medications.join(', ')}
- Allergien: ${data.allergies.join(', ')}
- Notizen: ${data.notes}

Erstelle einen professionellen Arztbericht mit folgenden Abschnitten:

1. PATIENTENINFORMATIONEN
2. ANAMNESE UND SYMPTOMATIK
3. KLINISCHE BEFUNDE
4. DIAGNOSE UND BEURTEILUNG
5. THERAPIE UND MEDIKATION

Halte dich an medizinische Standards. Sei präzise und faktisch.`;
  }

  async generate(patientData: PatientData): Promise<MedicalReport> {
    const prompt = this.buildPrompt(patientData);
    const fullReport = await this.ollamaService.generateReport(prompt);

    // Parse den Report in Sections
    const sections = this.parseReportSections(fullReport);

    return {
      reportId: uuidv4(),
      generatedAt: new Date().toISOString(),
      patientId: patientData.patientId,
      report: fullReport,
      sections
    };
  }

  private parseReportSections(report: string) {
    // Simple Parsing - kann verbessert werden
    const sections = {
      patientInfo: this.extractSection(report, 'PATIENTENINFORMATIONEN', 'ANAMNESE'),
      chiefComplaint: this.extractSection(report, 'ANAMNESE', 'KLINISCHE'),
      clinicalFindings: this.extractSection(report, 'KLINISCHE BEFUNDE', 'DIAGNOSE'),
      assessment: this.extractSection(report, 'DIAGNOSE', 'THERAPIE'),
      treatment: this.extractSection(report, 'THERAPIE', null)
    };

    return sections;
  }

  private extractSection(text: string, start: string, end: string | null): string {
    const startIdx = text.indexOf(start);
    if (startIdx === -1) return '';

    const endIdx = end ? text.indexOf(end, startIdx) : text.length;
    return text.substring(startIdx, endIdx === -1 ? text.length : endIdx).trim();
  }
}