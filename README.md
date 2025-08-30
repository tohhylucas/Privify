# Privify

A comprehensive privacy monitoring solution featuring both web and mobile applications for tracking and analyzing personal privacy data and risk scores from TikTok and other social media platforms.

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

### Web Application

- **Frontend**: React 17, Vanilla JavaScript
- **Charts**: Chart.js
- **Styling**: CSS3 with Grid and Flexbox

### Mobile Application

- **Frontend**: ReactLynx framework, TypeScript
- **Charts**: Chart.js
- **Build Tool**: Rspeedy (Rsbuild-based)

## 📊 Sample Data

Both applications use data that is generated from the SLMs under the sample_data folder:

- Aggregate privacy data (`aggregate_data.json`)
- Comment analysis data (`comments.json`)
