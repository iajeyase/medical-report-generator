import express, { Request, Response } from 'express';
import cors from 'cors';
import { PatientData } from './types';
import { ReportGenerator } from './services/reportGenerator';
import { OllamaService } from './services/ollamaService';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

const reportGenerator = new ReportGenerator();
const ollamaService = new OllamaService();

// Health Check
app.get('/api/health', async (req: Request, res: Response) => {
  const ollamaHealthy = await ollamaService.checkHealth();
  res.json({
    status: 'ok',
    ollama: ollamaHealthy ? 'connected' : 'disconnected'
  });
});

// Generate Report
app.post('/api/generate-report', async (req: Request, res: Response) => {
  try {
    const patientData: PatientData = req.body;

    // Validation
    if (!patientData.patientId || !patientData.diagnosis) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const report = await reportGenerator.generate(patientData);
    res.json(report);
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});