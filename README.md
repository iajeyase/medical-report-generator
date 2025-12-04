# Medical Report Generator

Full-Stack Anwendung zur automatischen Generierung strukturierter Arztberichte mit lokalen LLM-Modellen (Ollama). Entwickelt für die digitale Transformation im Gesundheitswesen.

## 🎯 Features

- **Automatische Berichtgenerierung**: Strukturierte Arztberichte aus Patientendaten
- **Lokale LLM-Integration**: Datenschutzkonform mit Ollama (keine Cloud-Abhängigkeit)
- **Full-Stack TypeScript**: Type-safe von Backend bis Frontend
- **Medizinische Standards**: DSGVO-konforme Verarbeitung sensibler Gesundheitsdaten
- **Editierfunktion**: Manuelle Nachbearbeitung generierter Berichte
- **Echtzeit-Validierung**: Strukturierte Eingabe mit Vitalzeichen, Medikation, Allergien

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express** - REST API
- **TypeScript** - Type Safety
- **Ollama API** - Lokale LLM-Integration (Llama 3.2)
- **Axios** - HTTP Client

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build Tool
- **Axios** - API Communication
- **CSS3** - Responsive Design

## 📋 Voraussetzungen

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Ollama** (für lokales LLM)
- **RAM**: Mind. 8GB (für Llama 3.2:3b) oder 16GB (für 8b-Modell)

## 🚀 Installation

### 1. Ollama installieren

**Windows:**
```bash
# Download von https://ollama.com/download
# Installiere Ollama
# Starte Ollama und lade Modell:
ollama pull llama3.2:3b
```

**Linux/Mac:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

Backend läuft auf: `http://localhost:3001`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend läuft auf: `http://localhost:5173`

### 4. Ollama starten
```bash
ollama serve
```

Prüfe Status auf: `http://localhost:11434`

## 📁 Projektstruktur
```
medical-report-generator/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── ollamaService.ts      # Ollama API Integration
│   │   │   └── reportGenerator.ts    # Bericht-Generierung
│   │   ├── types.ts                  # TypeScript Typen
│   │   └── index.ts                  # Express Server
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PatientForm.tsx       # Patientendaten-Formular
│   │   │   └── ReportDisplay.tsx     # Bericht-Anzeige
│   │   ├── services/
│   │   │   └── api.ts                # API Client
│   │   ├── types.ts                  # TypeScript Typen
│   │   ├── App.tsx                   # Haupt-Komponente
│   │   └── App.css                   # Styling
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 🔧 Konfiguration

### Backend Environment

Erstelle optional `.env` in `backend/`:
```env
PORT=3001
OLLAMA_URL=http://localhost:11434
```

### LLM-Modell wechseln

In `backend/src/services/ollamaService.ts`:
```typescript
model: 'llama3.2:8b',  // Für bessere Qualität (mehr RAM nötig)
```

Verfügbare Modelle:
- `llama3.2:3b` - Schnell, 8GB RAM
- `llama3.2:8b` - Bessere Qualität, 16GB RAM
- `mistral:7b` - Alternative

## 📖 Verwendung

### 1. Patientendaten eingeben

- **Pflichtfelder**: Patienten-ID, Alter, Diagnose
- **Optional**: Symptome, Vitalzeichen, Medikation, Allergien, Notizen

### 2. Bericht generieren

Klicke auf "Bericht generieren". Die Generierung dauert 30-60 Sekunden.

### 3. Bericht bearbeiten

- Klicke "Bearbeiten" für manuelle Anpassungen
- "Speichern" für Änderungen
- "Drucken" für PDF-Export

## 🧪 Test-Beispiel
```json
{
  "patientId": "P-2024-001",
  "age": 45,
  "gender": "male",
  "symptoms": ["Husten", "Fieber", "Atemnot"],
  "vitalSigns": {
    "bloodPressure": "130/85",
    "heartRate": 88,
    "temperature": 38.5,
    "respiratoryRate": 22
  },
  "diagnosis": "Akute Bronchitis",
  "medications": ["Amoxicillin 500mg 3x täglich"],
  "allergies": ["Keine"],
  "notes": "Patient berichtet von Symptombeginn vor 3 Tagen"
}
```

## 🏥 Medizinische Features

### Generierte Berichtsstruktur

1. **Patienteninformationen** - ID, Alter, Geschlecht
2. **Anamnese und Symptomatik** - Symptome, Krankheitsverlauf
3. **Klinische Befunde** - Vitalzeichen, Untersuchungsergebnisse
4. **Diagnose und Beurteilung** - Medizinische Einschätzung
5. **Therapie und Medikation** - Behandlungsplan

### DSGVO-Compliance

- Alle Daten bleiben lokal (keine Cloud)
- Keine Speicherung von Patientendaten
- Ollama-Modelle laufen on-premise
- Keine externe API-Calls

## 🔍 API Endpoints

### Health Check
```http
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "ollama": "connected"
}
```

### Generate Report
```http
POST /api/generate-report
Content-Type: application/json

{
  "patientId": "P-2024-001",
  "age": 45,
  "gender": "male",
  "symptoms": ["Husten"],
  "diagnosis": "Bronchitis",
  ...
}
```

## 🐛 Troubleshooting

### Ollama nicht erreichbar
```bash
# Prüfe ob Ollama läuft:
ollama list

# Starte Ollama:
ollama serve

# Teste API:
curl http://localhost:11434/api/tags
```

### CORS Fehler
Stelle sicher, dass Backend auf Port 3001 läuft und Frontend auf 5173.

### Langsame Generierung
- Nutze kleineres Modell: `llama3.2:3b` statt `8b`
- Reduziere `max_tokens` in `ollamaService.ts`
- Prüfe CPU/RAM Auslastung

### TypeScript Fehler
```bash
# Backend:
cd backend && npm run build

# Frontend:
cd frontend && npm run build
```

## 🚀 Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve dist/ mit nginx oder serve
```

## 📈 Erweiterungen

Mögliche weitere Features:
- **ICD-10 Code-Extraktion** mit NLP
- **Medikamenten-Datenbank** Integration
- **PDF-Export** mit Styling
- **Template-System** für verschiedene Berichtstypen
- **Audit-Log** für Änderungen
- **Multi-User** mit Authentifizierung
- **Vector DB** für semantische Suche in Berichten

## 🤝 Entwickelt für

Systeme im Gesundheitswesen

**Technologie-Demonstration für:**
- AI-gestützte klinische Informationssysteme
- Automatisierte Berichtgenerierung
- Lokale LLM-Integration
- Full-Stack TypeScript Development
- DSGVO-konforme AI-Lösungen

## 👨‍💻 Autor
JJ
---

**Hinweis**: Dies ist eine Demo-Anwendung. Für den Produktiveinsatz im medizinischen Umfeld sind zusätzliche Validierungen, Zertifizierungen und Sicherheitsmaßnahmen erforderlich.
```

---

## Repository Description (kurz)
```
Full-Stack Medical Report Generator mit lokalen LLMs (Ollama). Automatische Arztbericht-Erstellung aus strukturierten Patientendaten. Node.js + React + TypeScript. DSGVO-konform, keine Cloud.