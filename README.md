# Privify

## 📋 Table of Contents

- [Privify Backend](#privify-backend)
  - [Quick Start](#-quick-start)
  - [API Endpoints](#-api-endpoints)
  - [Example Inference](#-example-inference)
  - [File Structure & Purpose](#-file-structure--purpose)
  - [Privacy Features](#-privacy-features)
  - [Development](#-development)
  - [Data Flow](#-data-flow)
  - [Troubleshooting](#-troubleshooting)
- [Privify Frontend](#privify-frontend)
  - [Project Structure](#-project-structure)
  - [Quick Start](#-quick-start-1)
  - [Technology Stack](#-technology-stack)
  - [Sample Data](#-sample-data)

---

# Privify Backend

This backend implements a privacy-preserving comment analysis system using Fully Homomorphic Encryption (FHE) and on-device inference. The system consists of two servers that work together to analyze TikTok comments while maintaining user privacy.

## 🚀 Quick Start

### 1. Create and Activate Virtual Environment

```bash
cd backend
```

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Servers

You need to run two servers simultaneously in separate terminal windows:

**Terminal 1 - On-Device Server (Port 8000):**

```bash
uvicorn on_device_server:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2 - TikTok Server (Port 5000):**

```bash
uvicorn tiktok_server:app --reload --host 127.0.0.1 --port 5000
```

## 📡 API Endpoints

### On-Device Server (Port 8000)

**POST** `/process`

- **Purpose**: Main endpoint for comment analysis
- **Request Body**:

```json
{
  "comment": "lol my street, literally see my bike rack"
}
```

- **Response**: Category classification, risk score, reasoning, and suggestions

## 🔍 Example Inference: For Single Comment

### Input Comment

```
"can't believe u at pine&4th, memories"
```

### Output Analysis

**Category**: Location/Geoinformation Violation

**Risk Score**: 9

**Reason**: The comment "can't believe u at pine&4th, memories" violates the location/geoinformation violation type because it reveals the user's physical location, which is a sensitive personal information. The comment also raises concerns about privacy, as it could potentially reveal the user's whereabouts to third parties.

**Suggestion**: To protect the user's privacy, the comment should be edited to remove any mention of the user's physical location. The user should be encouraged to avoid posting sensitive information about their location in the future.

## 📝 Example Inference: For Aggregated Smart Insights

### Input

```
(comment history, reasoning, and suggestion excerpts from first 20 rows of `backend/outputs_with_reasons.csv`)
```

### Output Analysis

```json
{
  "overall_summary": "The user frequently reveals sensitive personal information in comments by disclosing specific locations and daily routines. These disclosures create privacy vulnerabilities because outsiders can track the user's whereabouts, past residences, and habits. Although the tone is casual, the accumulation of details forms a detailed picture of the user's life.",

  "pattern": "The user often references identifiable locations (streets, plazas, malls, bus stops, apartments) and shares details of routines (walking to class, running routes, daily commutes, dog walking). They also link personal history to places (old flat, backyard, afterschool spot). Most disclosures appear unintentional, made in casual or humorous ways.",

  "key_findings": "1. Frequent location/geoinformation exposure through specific landmarks and intersections. 2. Multiple routine disclosures that make movements predictable. 3. References to personal residences and history tied to physical places. 4. Individually low-risk comments, but collectively high-risk when aggregated.",

  "suggestions": "Avoid posting exact street names, intersections, or landmarks; use general terms instead. Do not share predictable routines or timing details. Refrain from referencing current or past residences or personally tied locations. Replace specific mentions with broader, symbolic, or generic phrasing. Before posting, ask: 'Could this detail be used to locate me or predict my movements?' If yes, rephrase or omit."
}
```


## 📁 File Structure & Purpose

### Core Server Files

- **`on_device_server.py`**: Main server that receives comments, handles encryption/decryption, and provides the public API endpoint
- **`tiktok_server.py`**: Simulates TikTok's ML infrastructure, runs FHE inference on encrypted data and returns encrypted results

### ML Training & FHE-Compliance Models

- **`train_model.py`**: Trains a classifier to predict comment categories using Concrete ML library, saves FHE-compatible model to `fhe_directory/`
- **`train_risk_model.py`**: Trains a regressor to predict risk scores using Concrete ML library, saves FHE-compatible model to `fhe_directory_risk/`

### Client & Utilities

- **`client_side.py`**: Handles quantization, encryption, serialization, FHE server communication, and decryption to output final category and risk score
- **`utils.py`**: Helper functions for text processing and risk score post-processing

### Data & Models

- **`fhe_directory/`**: Contains FHE-compatible category classification model and client
- **`fhe_directory_risk/`**: Contains FHE-compatible risk scoring model and client
- **`comments.csv`**: Sample training data with 600+ synthetic comments, category labels, and risk scores generated using GPT

## 🔐 Privacy Features

- **Fully Homomorphic Encryption (FHE)**: Enables ML inference on encrypted data
- **On-Device Processing**: Sensitive data never leaves the user's device unencrypted
- **Zero-Knowledge Inference**: TikTok servers cannot see the actual comment content

## 🛠️ Development

### Prerequisites

- Python 3.8+
- Concrete ML library
- FastAPI
- Uvicorn

## 📊 Data Flow

1. **Comment Input** → On-Device Server
2. **Encryption** → Client-side encryption using FHE
3. **FHE Inference** → TikTok Server processes encrypted data
4. **Decryption** → On-Device Server decrypts results
5. **Analysis** → Local LLM provides reasoning and suggestions
6. **Output** → Final results with privacy insights

## 🔧 Troubleshooting

- Ensure both servers are running simultaneously
- Check that virtual environment is activated
- Verify all dependencies are installed correctly
- Check port availability (8000 and 5000)
- Ensure FHE model directories exist and contain valid models

# Privify Frontend

## 📱 Project Structure

This repository contains two applications that provide the same privacy dashboard view:

- **`reactlynx-app/`** - Web application built with React 17 and vanilla JavaScript
- **`reactlynx-mobile/`** - Mobile application built with ReactLynx framework and TypeScript

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Running the Web Application (reactlynx-app)

```bash
# Navigate to the web app directory
cd reactlynx-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The web application will be available at `http://localhost:8000`

### Running the Mobile Application (reactlynx-mobile)

```bash
# Navigate to the mobile app directory
cd reactlynx-mobile

# Install dependencies
npm install

# Start the development server
npm run dev
```

The mobile application will start and display a QR code in the terminal. Scan this QR code with your LynxExplorer App to view the mobile version.

## 🛠️ Technology Stack

### Mobile Application

- **Frontend**: ReactLynx framework, TypeScript
- **Charts**: Chart.js
- **Build Tool**: Rspeedy (Rsbuild-based)

### Web Application

- **Frontend**: React 17, Vanilla JavaScript
- **Charts**: Chart.js
- **Styling**: CSS3 with Grid and Flexbox

## 📊 Sample Data

Both applications use data that is generated from the SLMs under the sample_data folder:

- Aggregate privacy data (`aggregate_data.json`)
- Comment analysis data (`comments.json`)
