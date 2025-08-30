# ReactLynx Personal Privacy Dashboard

A mobile-friendly web application dashboard built with ReactLynx framework for monitoring personal privacy data and risk scores.

## Features

- **AI Executive Summary**: Comprehensive overview of privacy posture with key findings, priority actions, and compliance status
- **Risk Score Distribution**: Visual representation of comment risk levels with AI annotations
- **Risk Trends**: 30-day timeline showing privacy risk score evolution
- **Intelligent Insights**: AI-powered actionable recommendations for improving privacy practices
- **Recent High-Risk Comments**: Scrollable list of comments requiring immediate attention
- **Mobile-Friendly**: Responsive design optimized for all screen sizes
- **Real-time Updates**: Simulated live data refresh every 30 seconds
- **Offline Support**: Service worker enables offline functionality

## Technology Stack

- **Frontend**: Vanilla JavaScript (ReactLynx framework pattern)
- **Charts**: Chart.js for data visualization
- **Styling**: CSS3 with CSS Grid and Flexbox
- **PWA**: Service Worker for offline capability
- **Responsive**: Mobile-first design approach

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for Python server) OR Node.js (for npm commands)

### Quick Start

Choose any of these cross-platform methods:

#### **Option 1: One-Command Start (Recommended)**

```bash
# UNIX/Linux/macOS
make start

# Or using npm (cross-platform)
npm start
```

#### **Option 2: Shell Script (UNIX/Linux/macOS)**

```bash
# First time setup
make setup
# or manually: chmod +x start-server.sh

# Then run
./start-server.sh
```

#### **Option 3: Batch File (Windows)**

```cmd
start-server.bat
```

#### **Option 4: Manual Commands**

```bash
# Using Python (cross-platform)
python -m http.server 8000
# or
python3 -m http.server 8000

# Using Node.js (cross-platform)
npx http-server -p 8000 -o

# Using PHP (if available)
php -S localhost:8000
```

### Development Mode

For development with live reload:

```bash
# Using make
make dev

# Using npm
npm run dev
```

### Available Commands

| Command             | Platform         | Description                  |
| ------------------- | ---------------- | ---------------------------- |
| `make start`        | UNIX/Linux/macOS | Start server using Python    |
| `make serve`        | UNIX/Linux/macOS | Start server using Node.js   |
| `make dev`          | UNIX/Linux/macOS | Start with live reload       |
| `make test`         | UNIX/Linux/macOS | Open test page               |
| `make setup`        | UNIX/Linux/macOS | Make shell script executable |
| `make help`         | UNIX/Linux/macOS | Show all available commands  |
| `./start-server.sh` | UNIX/Linux/macOS | Run shell script directly    |
| `start-server.bat`  | Windows          | Run batch file               |
| `npm start`         | Cross-platform   | Start using npm script       |
| `npm run serve`     | Cross-platform   | Start using http-server      |
| `npm run dev`       | Cross-platform   | Start with live reload       |
| `npm run test`      | Cross-platform   | Open test page               |

4. Navigate to `http://localhost:8000` in your browser

## Usage

### Dashboard Components

1. **Header**: Shows current user information and last update timestamp
2. **AI Executive Summary**:

   - Overview of privacy status
   - Key findings from AI analysis
   - Priority actions to take
   - Compliance status with issue count

3. **Charts Section**:

   - **Risk Distribution**: Doughnut chart showing comment risk levels
   - **Risk Trends**: Line chart displaying 30-day risk score evolution
   - Click on chart elements for detailed information

4. **Intelligent Insights**:

   - AI-powered recommendations
   - Color-coded impact levels (High, Critical, Positive, Medium)
   - Confidence scores for each insight
   - Click for detailed explanations

5. **Recent High-Risk Comments**:
   - Scrollable list of high-risk comments
   - PII type tags for quick identification
   - AI action recommendations
   - Click to view full comment details

### Keyboard Shortcuts

- `Ctrl/Cmd + R`: Refresh dashboard data
- `Ctrl/Cmd + E`: Export dashboard data as JSON

### Mobile Features

- Touch-friendly interface
- Optimized chart sizes for mobile screens
- Smooth scrolling for comment browsing
- Responsive grid layouts

## Data Structure

The dashboard uses a single-user data model with the following structure:

```javascript
{
  user: {
    id: "user_001",
    name: "John Doe",
    totalComments: 145,
    avgRiskScore: 8.2,
    // ... more user properties
  },
  aiExecutiveSummary: {
    overview: "Privacy posture analysis...",
    keyFindings: [...],
    priorities: [...],
    compliance: {...}
  },
  riskDistribution: [...],
  riskTrends: [...],
  intelligentInsights: [...],
  recentHighRiskComments: [...]
}
```

## Customization

### Modifying Data

Edit `data.js` to customize:

- User information
- Risk scores and trends
- AI insights and recommendations
- Comment examples

### Styling

Modify `styles.css` to customize:

- Color scheme (CSS variables in `:root`)
- Layout and spacing
- Chart styling
- Mobile responsiveness

### Functionality

Extend `app.js` to add:

- Additional chart types
- New dashboard sections
- Enhanced AI features
- API integrations

## Browser Compatibility

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## Performance

- **Initial Load**: ~2 seconds (including simulated data loading)
- **Chart Rendering**: Optimized with Chart.js
- **Memory Usage**: Lightweight, single-user focused
- **Offline**: Full functionality available offline after first load

## Security Notes

- No external API calls (data stored locally)
- HTTPS recommended for production
- Service worker caching for offline use
- No sensitive data transmission

## Development

### File Structure

```
reactlynx-app/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles and responsive design
├── app.js             # Main application logic and ReactLynx framework
├── data.js            # Sample data for single user
├── sw.js              # Service worker for offline functionality
└── README.md          # This documentation
```

### Adding New Features

1. **New Chart Types**: Extend the `renderCharts()` method
2. **Additional Insights**: Add to `intelligentInsights` array in data.js
3. **New Sections**: Create new HTML sections and corresponding render methods
4. **Enhanced AI**: Extend the AI analysis in various render methods

## Troubleshooting

### Common Issues

1. **Charts not displaying**: Ensure Chart.js CDN is accessible
2. **Mobile layout issues**: Check viewport meta tag and CSS media queries
3. **Data not loading**: Verify data.js is properly formatted
4. **Service worker errors**: Check browser console for SW registration issues

### Debug Mode

Open browser developer tools to:

- Check console for errors
- Inspect network requests
- Monitor performance
- Test responsive design

## Future Enhancements

- Real API integration
- Multi-user support
- Advanced AI analytics
- Export to PDF reports
- Push notifications
- Real-time collaboration

## License

This project is part of the ReactLynx framework demonstration.

## Support

For issues or questions:

1. Check browser console for errors
2. Verify all files are properly loaded
3. Test with different browsers
4. Review this README for troubleshooting steps
