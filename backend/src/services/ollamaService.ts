import axios from 'axios';

const OLLAMA_URL = 'http://localhost:11434/api/generate';

export class OllamaService {
  async generateReport(prompt: string): Promise<string> {
    try {
      const response = await axios.post(OLLAMA_URL, {
        model: 'llama3.2:3b',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3, // Niedrig für medizinische Präzision
          top_p: 0.9,
        }
      });

      return response.data.response;
    } catch (error) {
      console.error('Ollama API Error:', error);
      throw new Error('Failed to generate report with Ollama');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      await axios.get('http://localhost:11434/api/tags');
      return true;
    } catch {
      return false;
    }
  }
}