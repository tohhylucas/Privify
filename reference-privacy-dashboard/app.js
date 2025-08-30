// Enhanced Dashboard Data with AI capabilities
const dashboardData = {
  metrics: {
    totalComments: 15420,
    highRiskComments: 247,
    piiTypesDetected: 6,
    averageRiskScore: 2.8,
    aiInsights: {
      trendDirection: "improving",
      weeklyChange: -8.5,
      riskLevel: "moderate",
      confidence: 0.89,
    },
  },
  aiExecutiveSummary: {
    overview:
      "Your privacy posture shows moderate risk with improving trends. High-risk comments decreased 8.5% this week, primarily due to reduced email exposure in support channels.",
    keyFindings: [
      "Email addresses represent 45% of all PII detected",
      "New users (<30 days) show 3x higher risk scores",
      "Weekend activity has 40% fewer privacy violations",
      "Support ticket integration shows highest PII exposure",
    ],
    priorities: [
      "Implement auto-redaction for email addresses in support flow",
      "Enhanced onboarding privacy education for new users",
      "Review and optimize weekend monitoring coverage",
      "Deploy real-time PII detection in support channels",
    ],
    compliance: {
      status: "compliant",
      issues: 3,
      improvements: 12,
    },
  },
  smartSuggestions: [
    {
      type: "urgent",
      title: "High-Risk User Pattern Detected",
      description:
        "User_003 has shared SSN and email in last 24hrs. Recommend immediate privacy training and account review.",
      action: "Review User",
      confidence: 0.94,
    },
    {
      type: "optimization",
      title: "Auto-Redaction Opportunity",
      description:
        "3 users repeatedly share email addresses. Consider implementing smart redaction for email patterns.",
      action: "Configure Rule",
      confidence: 0.87,
    },
    {
      type: "trend",
      title: "Weekend Privacy Monitoring",
      description:
        "40% reduction in PII detection on weekends suggests monitoring gaps. Consider 24/7 coverage.",
      action: "Adjust Schedule",
      confidence: 0.78,
    },
    {
      type: "policy",
      title: "Credit Card Exposure Alert",
      description:
        "2 credit card numbers detected this week. Review payment flow privacy controls.",
      action: "Security Review",
      confidence: 0.92,
    },
  ],
  anomalyAlerts: [
    {
      type: "spike",
      title: "Email Detection Spike",
      description: "200% increase in email PII detection since Tuesday",
      severity: "medium",
      affectedUsers: 15,
      timeframe: "Last 3 days",
    },
    {
      type: "user",
      title: "Behavioral Change",
      description: "User_001 risk score jumped from 3.2 to 8.2",
      severity: "high",
      affectedUsers: 1,
      timeframe: "Last 24 hours",
    },
    {
      type: "temporal",
      title: "Off-Hours Activity",
      description: "Unusual PII sharing pattern detected 2-4 AM",
      severity: "low",
      affectedUsers: 8,
      timeframe: "This week",
    },
  ],
  intelligentInsights: [
    {
      title: "Most Common PII Leak",
      content:
        "Email addresses in support requests account for 45% of all privacy violations",
      impact: "high",
      actionable: true,
    },
    {
      title: "Risk Reduction Success",
      content:
        "Privacy notifications reduced repeat violations by 23% among notified users",
      impact: "positive",
      actionable: false,
    },
    {
      title: "Peak Risk Hours",
      content:
        "2-4 PM weekdays show highest concentration of privacy violations",
      impact: "medium",
      actionable: true,
    },
    {
      title: "New User Risk Pattern",
      content:
        "Users in first 30 days are 3.2x more likely to share sensitive information",
      impact: "high",
      actionable: true,
    },
  ],
  nlQuerySuggestions: [
    "What's driving the increase in risk scores this week?",
    "Which users need immediate attention?",
    "How effective are our privacy controls?",
    "Show me trends for credit card data exposure",
    "Which PII types are most common in high-risk comments?",
    "What time of day sees the most privacy violations?",
  ],
  riskDistribution: [
    {
      level: "Low (0-3)",
      count: 12890,
      aiAnnotation: "Stable baseline - good privacy awareness",
    },
    {
      level: "Medium (4-6)",
      count: 2283,
      aiAnnotation: "Monitor for escalation patterns",
    },
    {
      level: "High (7-10)",
      count: 247,
      aiAnnotation: "Requires immediate attention",
    },
  ],
  piiHeatmap: [
    {
      piiType: "Email",
      day1: 15,
      day2: 12,
      day3: 18,
      day4: 8,
      day5: 22,
      day6: 14,
      day7: 19,
      aiInsight: "Support channel integration driving increase",
    },
    {
      piiType: "Phone",
      day1: 8,
      day2: 6,
      day3: 11,
      day4: 4,
      day5: 13,
      day6: 7,
      day7: 9,
      aiInsight: "Consistent pattern - no immediate concern",
    },
    {
      piiType: "SSN",
      day1: 2,
      day2: 1,
      day3: 3,
      day4: 0,
      day5: 4,
      day6: 2,
      day7: 1,
      aiInsight: "Critical - each incident requires investigation",
    },
    {
      piiType: "Credit Card",
      day1: 1,
      day2: 0,
      day3: 2,
      day4: 1,
      day5: 3,
      day6: 0,
      day7: 1,
      aiInsight: "Payment flow leakage - security review needed",
    },
    {
      piiType: "Address",
      day1: 12,
      day2: 9,
      day3: 15,
      day4: 6,
      day5: 18,
      day6: 11,
      day7: 14,
      aiInsight: "Geographic features driving oversharing",
    },
    {
      piiType: "Name",
      day1: 25,
      day2: 28,
      day3: 32,
      day4: 19,
      day5: 35,
      day6: 24,
      day7: 29,
      aiInsight: "Highest volume - consider auto-detection",
    },
  ],
  riskTrends: [
    { date: "2025-07-30", low: 420, medium: 78, high: 12 },
    { date: "2025-07-31", low: 445, medium: 82, high: 8 },
    { date: "2025-08-01", low: 438, medium: 71, high: 15 },
    { date: "2025-08-02", low: 461, medium: 89, high: 10 },
    { date: "2025-08-03", low: 429, medium: 76, high: 18 },
    { date: "2025-08-04", low: 456, medium: 94, high: 7 },
    { date: "2025-08-05", low: 443, medium: 68, high: 14 },
    { date: "2025-08-06", low: 467, medium: 85, high: 9 },
    { date: "2025-08-07", low: 434, medium: 91, high: 16 },
    { date: "2025-08-08", low: 452, medium: 73, high: 11 },
    { date: "2025-08-09", low: 448, medium: 87, high: 13 },
    { date: "2025-08-10", low: 441, medium: 79, high: 8 },
    { date: "2025-08-11", low: 459, medium: 96, high: 17 },
    { date: "2025-08-12", low: 436, medium: 74, high: 12 },
    { date: "2025-08-13", low: 463, medium: 88, high: 6 },
    { date: "2025-08-14", low: 447, medium: 81, high: 15 },
    { date: "2025-08-15", low: 454, medium: 92, high: 9 },
    { date: "2025-08-16", low: 442, medium: 77, high: 14 },
    { date: "2025-08-17", low: 468, medium: 84, high: 10 },
    { date: "2025-08-18", low: 435, medium: 90, high: 18 },
    { date: "2025-08-19", low: 451, medium: 76, high: 7 },
    { date: "2025-08-20", low: 446, medium: 93, high: 13 },
    { date: "2025-08-21", low: 459, medium: 71, high: 11 },
    { date: "2025-08-22", low: 433, medium: 87, high: 16 },
    { date: "2025-08-23", low: 462, medium: 80, high: 8 },
    { date: "2025-08-24", low: 449, medium: 94, high: 15 },
    { date: "2025-08-25", low: 456, medium: 78, high: 12 },
    { date: "2025-08-26", low: 444, medium: 86, high: 9 },
    { date: "2025-08-27", low: 461, medium: 82, high: 14 },
    { date: "2025-08-28", low: 439, medium: 89, high: 17 },
  ],
  users: [
    {
      id: "user_001",
      totalComments: 145,
      avgRiskScore: 8.2,
      piiTypes: ["Email", "Phone", "Name"],
      lastActivity: "2025-08-28",
      status: "High Risk",
      aiAssessment: "Consistent high-risk behavior - requires training",
    },
    {
      id: "user_002",
      totalComments: 89,
      avgRiskScore: 6.4,
      piiTypes: ["Address", "Name"],
      lastActivity: "2025-08-27",
      status: "Medium Risk",
      aiAssessment: "Geographic oversharing pattern detected",
    },
    {
      id: "user_003",
      totalComments: 234,
      avgRiskScore: 7.8,
      piiTypes: ["Email", "SSN", "Name"],
      lastActivity: "2025-08-28",
      status: "High Risk",
      aiAssessment: "CRITICAL: SSN exposure - immediate action required",
    },
    {
      id: "user_004",
      totalComments: 67,
      avgRiskScore: 3.2,
      piiTypes: ["Name"],
      lastActivity: "2025-08-26",
      status: "Low Risk",
      aiAssessment: "Good privacy practices - minimal concern",
    },
    {
      id: "user_005",
      totalComments: 156,
      avgRiskScore: 5.9,
      piiTypes: ["Phone", "Address"],
      lastActivity: "2025-08-28",
      status: "Medium Risk",
      aiAssessment: "Contact info oversharing - education opportunity",
    },
    {
      id: "user_006",
      totalComments: 98,
      avgRiskScore: 8.7,
      piiTypes: ["Credit Card", "Email", "Name"],
      lastActivity: "2025-08-27",
      status: "High Risk",
      aiAssessment: "URGENT: Payment data exposure - security incident",
    },
    {
      id: "user_007",
      totalComments: 123,
      avgRiskScore: 4.1,
      piiTypes: ["Name", "Address"],
      lastActivity: "2025-08-25",
      status: "Medium Risk",
      aiAssessment: "Moderate risk - monitor for escalation",
    },
    {
      id: "user_008",
      totalComments: 78,
      avgRiskScore: 2.8,
      piiTypes: ["Name"],
      lastActivity: "2025-08-28",
      status: "Low Risk",
      aiAssessment: "Privacy-conscious user - positive example",
    },
  ],
  recentHighRiskComments: [
    {
      id: "comment_1543",
      preview:
        "My email is john.doe@gmail.com and my phone number is 555-123-4567...",
      riskScore: 9.2,
      piiTypes: ["Email", "Phone"],
      timestamp: "2025-08-28 14:23",
      userId: "user_001",
      aiAction: "Auto-redact and notify user",
    },
    {
      id: "comment_1542",
      preview:
        "I live at 123 Main Street, Springfield and my SSN is 123-45-6789...",
      riskScore: 9.8,
      piiTypes: ["Address", "SSN"],
      timestamp: "2025-08-28 13:45",
      userId: "user_003",
      aiAction: "IMMEDIATE: Delete and security review",
    },
    {
      id: "comment_1541",
      preview: "You can charge my card 4532-1234-5678-9012 for the order...",
      riskScore: 8.9,
      piiTypes: ["Credit Card"],
      timestamp: "2025-08-28 12:12",
      userId: "user_006",
      aiAction: "Remove payment data and investigate",
    },
    {
      id: "comment_1540",
      preview:
        "Hi, I'm Sarah Johnson and you can reach me at sarah.j@company.com...",
      riskScore: 7.4,
      piiTypes: ["Name", "Email"],
      timestamp: "2025-08-28 11:34",
      userId: "user_002",
      aiAction: "Educational notification recommended",
    },
    {
      id: "comment_1539",
      preview: "My billing address is 456 Oak Avenue, Denver CO 80202...",
      riskScore: 7.1,
      piiTypes: ["Address"],
      timestamp: "2025-08-28 10:56",
      userId: "user_005",
      aiAction: "Geographic privacy guidance",
    },
  ],
  predictiveAnalytics: {
    riskForecast:
      "Based on current trends, expect 15-20 high-risk comments next week",
    userRiskPrediction:
      "3 users likely to escalate to high-risk status within 7 days",
    complianceProjection:
      "Maintained compliance expected with current controls",
    recommendedActions: 5,
  },
  aiProcessingStats: {
    lastUpdated: "2025-08-29 17:19:00",
    processingTime: "1.2s",
    confidence: 0.91,
    modelsActive: 3,
  },
};

// Global chart instances
let riskDistributionChart = null;
let riskTrendsChart = null;
let userRiskChart = null;
let aiInsightsEnabled = true;

// Dashboard initialization
document.addEventListener("DOMContentLoaded", function () {
  initializeDashboard();
  setupEventListeners();
  startAIProcessing();
});

function initializeDashboard() {
  updateMetrics();
  populateAIExecutiveSummary();
  populateSmartSuggestions();
  populateAnomalyAlerts();
  populateIntelligentInsights();
  populateNLQuerySuggestions();
  populatePredictiveAnalytics();
  createRiskDistributionChart();
  createRiskTrendsChart();
  createPIIHeatmap();
  populateUserTable();
  populateRecentComments();
  updateAIAnnotations();
}

function setupEventListeners() {
  // AI Toggle
  document
    .getElementById("aiInsightsToggle")
    .addEventListener("change", handleAIToggle);

  // Time range filter
  document
    .getElementById("timeRange")
    .addEventListener("change", handleTimeRangeChange);

  // Risk level filter
  document
    .getElementById("riskFilter")
    .addEventListener("change", handleRiskFilterChange);

  // PII type filters
  document.querySelectorAll("[data-pii]").forEach((checkbox) => {
    checkbox.addEventListener("change", updatePIIHeatmap);
  });

  // Table sorting
  document.querySelectorAll("[data-sort]").forEach((header) => {
    header.addEventListener("click", handleTableSort);
  });

  // Modal controls
  document
    .getElementById("closeModal")
    .addEventListener("click", closeUserModal);
  document.getElementById("userModal").addEventListener("click", function (e) {
    if (e.target === this) closeUserModal();
  });

  // Query modal controls
  if (document.getElementById("closeQueryModal")) {
    document
      .getElementById("closeQueryModal")
      .addEventListener("click", closeQueryModal);
    document
      .getElementById("queryModal")
      .addEventListener("click", function (e) {
        if (e.target === this) closeQueryModal();
      });
  }

  // Natural Language Query
  document
    .getElementById("querySubmit")
    .addEventListener("click", handleNLQuery);
  document
    .getElementById("nlQueryInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") handleNLQuery();
    });

  // Suggestion chips
  document.querySelectorAll(".suggestion-chip").forEach((chip) => {
    chip.addEventListener("click", function () {
      document.getElementById("nlQueryInput").value = this.textContent;
      handleNLQuery();
    });
  });

  // Action buttons
  document
    .getElementById("exportBtn")
    .addEventListener("click", handleAIExport);
  document
    .getElementById("refreshSuggestions")
    .addEventListener("click", refreshAISuggestions);
  document
    .getElementById("dismissAlerts")
    .addEventListener("click", dismissAnomalyAlerts);
  document
    .getElementById("generateUserReport")
    .addEventListener("click", generateUserReport);
}

function handleAIToggle(event) {
  aiInsightsEnabled = event.target.checked;
  const aiElements = document.querySelectorAll(
    ".ai-panel, .ai-enhanced, .ai-annotation, .ai-insight"
  );

  aiElements.forEach((element) => {
    if (aiInsightsEnabled) {
      element.style.opacity = "1";
      element.style.pointerEvents = "auto";
    } else {
      element.style.opacity = "0.5";
      element.style.pointerEvents = "none";
    }
  });

  // Update AI status indicator
  const aiStatus = document.querySelector(".ai-status-text");
  aiStatus.textContent = aiInsightsEnabled ? "AI Active" : "AI Disabled";
}

function populateAIExecutiveSummary() {
  const summary = dashboardData.aiExecutiveSummary;

  document.getElementById("summaryOverview").textContent = summary.overview;

  // Key findings
  const keyFindingsList = document.getElementById("keyFindings");
  keyFindingsList.innerHTML = "";
  summary.keyFindings.forEach((finding) => {
    const li = document.createElement("li");
    li.textContent = finding;
    keyFindingsList.appendChild(li);
  });

  // Priority actions
  const priorityActionsList = document.getElementById("priorityActions");
  priorityActionsList.innerHTML = "";
  summary.priorities.forEach((priority) => {
    const li = document.createElement("li");
    li.textContent = priority;
    priorityActionsList.appendChild(li);
  });

  // Compliance status
  const complianceStatus = document.getElementById("complianceStatus");
  complianceStatus.innerHTML = `
        <div class="compliance-badge ${summary.compliance.status}">
            ${summary.compliance.status.toUpperCase()}
        </div>
        <div>
            <small>${summary.compliance.issues} issues • ${
    summary.compliance.improvements
  } improvements</small>
        </div>
    `;
}

function populateSmartSuggestions() {
  const container = document.getElementById("suggestionsList");
  container.innerHTML = "";

  dashboardData.smartSuggestions.forEach((suggestion) => {
    const card = document.createElement("div");
    card.className = "suggestion-card";
    card.innerHTML = `
            <div class="suggestion-header">
                <span class="suggestion-type ${suggestion.type}">${
      suggestion.type
    }</span>
                <span class="suggestion-confidence">${Math.round(
                  suggestion.confidence * 100
                )}%</span>
            </div>
            <div class="suggestion-title">${suggestion.title}</div>
            <div class="suggestion-description">${suggestion.description}</div>
            <div class="suggestion-action">
                <button class="btn btn--sm btn--primary" onclick="executeSuggestion('${
                  suggestion.action
                }')">
                    ${suggestion.action}
                </button>
            </div>
        `;
    container.appendChild(card);
  });
}

function populateAnomalyAlerts() {
  const container = document.getElementById("anomalyList");
  container.innerHTML = "";

  dashboardData.anomalyAlerts.forEach((anomaly) => {
    const card = document.createElement("div");
    card.className = "anomaly-card";
    card.innerHTML = `
            <div class="anomaly-header">
                <span class="anomaly-severity ${anomaly.severity}">${anomaly.severity}</span>
            </div>
            <div class="anomaly-title">${anomaly.title}</div>
            <div class="anomaly-description">${anomaly.description}</div>
            <div class="anomaly-meta">
                <span>Affected: ${anomaly.affectedUsers} users</span>
                <span>Timeframe: ${anomaly.timeframe}</span>
            </div>
        `;
    container.appendChild(card);
  });
}

function populateIntelligentInsights() {
  const container = document.getElementById("insightsGrid");
  container.innerHTML = "";

  dashboardData.intelligentInsights.forEach((insight) => {
    const card = document.createElement("div");
    card.className = "insight-card";
    card.innerHTML = `
            <div class="insight-header">
                <div class="insight-impact ${
                  insight.impact
                }">${insight.impact.toUpperCase()}</div>
            </div>
            <div class="insight-title">${insight.title}</div>
            <div class="insight-content">${insight.content}</div>
        `;

    if (insight.actionable) {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        showActionableInsight(insight);
      });
    }

    container.appendChild(card);
  });
}

function populateNLQuerySuggestions() {
  const container = document.getElementById("querySuggestions");
  container.innerHTML = "";

  dashboardData.nlQuerySuggestions.forEach((suggestion) => {
    const chip = document.createElement("span");
    chip.className = "suggestion-chip";
    chip.textContent = suggestion;
    chip.addEventListener("click", function () {
      document.getElementById("nlQueryInput").value = suggestion;
      handleNLQuery();
    });
    container.appendChild(chip);
  });
}

function populatePredictiveAnalytics() {
  const container = document.getElementById("predictionsGrid");
  const predictions = dashboardData.predictiveAnalytics;

  const predictionData = [
    { title: "Risk Forecast", content: predictions.riskForecast },
    { title: "User Risk Prediction", content: predictions.userRiskPrediction },
    {
      title: "Compliance Projection",
      content: predictions.complianceProjection,
    },
    {
      title: "Recommended Actions",
      content: `${predictions.recommendedActions} actions pending`,
    },
  ];

  container.innerHTML = "";
  predictionData.forEach((prediction) => {
    const card = document.createElement("div");
    card.className = "prediction-card";
    card.innerHTML = `
            <div class="prediction-title">${prediction.title}</div>
            <div class="prediction-content">${prediction.content}</div>
        `;
    container.appendChild(card);
  });

  // Update timestamp
  document.getElementById(
    "predictionUpdateTime"
  ).textContent = `Updated: ${dashboardData.aiProcessingStats.lastUpdated}`;
}

function updateMetrics() {
  document.getElementById("totalComments").textContent =
    dashboardData.metrics.totalComments.toLocaleString();
  document.getElementById("highRiskComments").textContent =
    dashboardData.metrics.highRiskComments.toLocaleString();
  document.getElementById("piiTypesDetected").textContent =
    dashboardData.metrics.piiTypesDetected;
  document.getElementById("averageRiskScore").textContent =
    dashboardData.metrics.averageRiskScore;
}

function updateAIAnnotations() {
  // Risk Distribution annotation
  document.getElementById("riskDistributionInsight").textContent =
    "AI detected 89% of users maintain good privacy practices";

  // Risk Trends annotation
  document.getElementById("riskTrendsInsight").textContent =
    "Trending improvement: 8.5% reduction in high-risk comments this week";

  // Heatmap annotation updates based on most critical PII type
  const criticalPII = dashboardData.piiHeatmap.find(
    (item) => item.piiType === "SSN"
  );
  document.getElementById("heatmapInsight").textContent = criticalPII.aiInsight;
}

function createRiskDistributionChart() {
  const ctx = document.getElementById("riskDistributionChart").getContext("2d");

  riskDistributionChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dashboardData.riskDistribution.map((item) => item.level),
      datasets: [
        {
          label: "Comments",
          data: dashboardData.riskDistribution.map((item) => item.count),
          backgroundColor: ["#1FB8CD", "#FFC185", "#B4413C"],
          borderColor: ["#1FB8CD", "#FFC185", "#B4413C"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            afterBody: function (context) {
              const index = context[0].dataIndex;
              return dashboardData.riskDistribution[index].aiAnnotation;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const riskLevel = dashboardData.riskDistribution[index].level;
          filterUsersByRisk(riskLevel);
        }
      },
    },
  });
}

function createRiskTrendsChart() {
  const ctx = document.getElementById("riskTrendsChart").getContext("2d");

  riskTrendsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dashboardData.riskTrends.map((item) => {
        const date = new Date(item.date);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }),
      datasets: [
        {
          label: "Low Risk",
          data: dashboardData.riskTrends.map((item) => item.low),
          borderColor: "#1FB8CD",
          backgroundColor: "#1FB8CD",
          tension: 0.4,
        },
        {
          label: "Medium Risk",
          data: dashboardData.riskTrends.map((item) => item.medium),
          borderColor: "#FFC185",
          backgroundColor: "#FFC185",
          tension: 0.4,
        },
        {
          label: "High Risk",
          data: dashboardData.riskTrends.map((item) => item.high),
          borderColor: "#B4413C",
          backgroundColor: "#B4413C",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            afterBody: function () {
              return "AI Insight: Peak risks occur during business hours";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function createPIIHeatmap() {
  const container = document.getElementById("piiHeatmap");
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Create grid
  const grid = document.createElement("div");
  grid.className = "heatmap-grid";

  // Empty corner cell
  const cornerCell = document.createElement("div");
  grid.appendChild(cornerCell);

  // Day labels
  dayLabels.forEach((day) => {
    const dayLabel = document.createElement("div");
    dayLabel.className = "heatmap-day-label";
    dayLabel.textContent = day;
    grid.appendChild(dayLabel);
  });

  // PII type rows
  dashboardData.piiHeatmap.forEach((row) => {
    // PII type label
    const label = document.createElement("div");
    label.className = "heatmap-label";
    label.textContent = row.piiType;
    grid.appendChild(label);

    // Day cells
    for (let i = 1; i <= 7; i++) {
      const value = row[`day${i}`];
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      cell.textContent = value;
      cell.dataset.piiType = row.piiType;
      cell.dataset.day = i;
      cell.dataset.value = value;
      cell.title = `${row.piiType}: ${value} detections\nAI Insight: ${row.aiInsight}`;

      // Calculate intensity based on value (0-4 scale)
      const maxValue = 35; // Maximum value in dataset
      const intensity = Math.floor((value / maxValue) * 4);
      cell.classList.add(`intensity-${intensity}`);

      cell.addEventListener("click", () => {
        handleHeatmapClick(row.piiType, i, value, row.aiInsight);
      });

      grid.appendChild(cell);
    }
  });

  container.innerHTML = "";
  container.appendChild(grid);
}

function populateUserTable() {
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  dashboardData.users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.totalComments}</td>
            <td>
                <span class="risk-badge ${user.status
                  .toLowerCase()
                  .replace(" risk", "")}">${user.avgRiskScore}</span>
            </td>
            <td>
                <div class="pii-tags">
                    ${user.piiTypes
                      .map((pii) => `<span class="pii-tag">${pii}</span>`)
                      .join("")}
                </div>
            </td>
            <td>${user.lastActivity}</td>
            <td class="ai-assessment-cell">${user.aiAssessment}</td>
            <td>
                <button class="btn btn--sm btn--primary" onclick="showUserDetails('${
                  user.id
                }')">
                    View Details
                </button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

function populateRecentComments() {
  const container = document.getElementById("recentComments");
  container.innerHTML = "";

  dashboardData.recentHighRiskComments.forEach((comment) => {
    const card = document.createElement("div");
    card.className = "comment-card";
    card.innerHTML = `
            <div class="comment-header">
                <div class="comment-meta">
                    <span class="comment-risk-score">Risk: ${
                      comment.riskScore
                    }</span>
                    <span class="comment-timestamp">${comment.timestamp}</span>
                </div>
            </div>
            <div class="comment-preview">${comment.preview}</div>
            <div class="comment-footer">
                <div class="pii-tags">
                    ${comment.piiTypes
                      .map((pii) => `<span class="pii-tag">${pii}</span>`)
                      .join("")}
                </div>
                <div class="comment-user">User: ${comment.userId}</div>
                <div class="ai-action-suggestion">🤖 ${comment.aiAction}</div>
            </div>
        `;
    container.appendChild(card);
  });
}

function handleNLQuery() {
  const query = document.getElementById("nlQueryInput").value.trim();
  if (!query) return;

  showAIProcessing();

  // Simulate AI processing delay
  setTimeout(() => {
    const response = generateAIResponse(query);
    showQueryResponse(response);
    hideAIProcessing();
    document.getElementById("nlQueryInput").value = "";
  }, 1500);
}

function generateAIResponse(query) {
  const responses = {
    "What's driving the increase in risk scores this week?": {
      summary:
        "Based on my analysis, the risk score changes are primarily driven by:",
      details: [
        "Email address exposure in support channels increased by 200%",
        "New user onboarding flow lacks privacy guidance",
        "Weekend monitoring gaps allowing undetected violations",
        "Integration with support ticket system exposing PII",
      ],
      recommendations: [
        "Implement auto-redaction for email patterns",
        "Add privacy education to user onboarding",
        "Enable 24/7 monitoring coverage",
      ],
      confidence: 0.91,
    },
    "Which users need immediate attention?": {
      summary: "I've identified 3 users requiring immediate attention:",
      details: [
        "User_003: Critical SSN exposure in recent comments",
        "User_006: Payment data (credit card) shared publicly",
        "User_001: Consistent high-risk pattern with multiple PII types",
      ],
      recommendations: [
        "Immediate privacy training for User_003 and User_006",
        "Security incident review for payment data exposure",
        "Account monitoring for User_001",
      ],
      confidence: 0.94,
    },
    "How effective are our privacy controls?": {
      summary: "Current privacy control effectiveness analysis:",
      details: [
        "23% reduction in repeat violations after notifications",
        "Auto-detection accuracy: 89% for common PII types",
        "Response time: Average 1.2 hours for high-risk incidents",
        "User education completion rate: 67%",
      ],
      recommendations: [
        "Expand auto-redaction to cover more PII patterns",
        "Improve user education completion rates",
        "Reduce incident response time to under 30 minutes",
      ],
      confidence: 0.87,
    },
    default: {
      summary:
        "I understand you're asking about privacy patterns in your data.",
      details: [
        "Current risk level is moderate with improving trends",
        "Email addresses are the most commonly exposed PII type",
        "New users require additional privacy guidance",
        "Weekend monitoring needs optimization",
      ],
      recommendations: [
        "Review specific data patterns you mentioned",
        "Consider implementing suggested privacy controls",
        "Monitor trends for the areas of concern",
      ],
      confidence: 0.78,
    },
  };

  return responses[query] || responses["default"];
}

function showQueryResponse(response) {
  const responseContainer = document.getElementById("queryResponse");
  responseContainer.innerHTML = `
        <div style="margin-bottom: 16px;">
            <strong>🤖 AI Analysis (${Math.round(
              response.confidence * 100
            )}% confidence)</strong>
        </div>
        <p><strong>${response.summary}</strong></p>
        <div style="margin: 16px 0;">
            <strong>Key Points:</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
                ${response.details
                  .map((detail) => `<li>${detail}</li>`)
                  .join("")}
            </ul>
        </div>
        <div>
            <strong>Recommendations:</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
                ${response.recommendations
                  .map((rec) => `<li>${rec}</li>`)
                  .join("")}
            </ul>
        </div>
    `;
  responseContainer.classList.add("show");
}

function showUserDetails(userId) {
  const user = dashboardData.users.find((u) => u.id === userId);
  if (!user) return;

  // Update modal content
  document.getElementById(
    "modalUserTitle"
  ).textContent = `User Details - ${user.id}`;
  document.getElementById("modalTotalComments").textContent =
    user.totalComments;
  document.getElementById("modalRiskScore").textContent = user.avgRiskScore;
  document.getElementById("modalPiiTypes").textContent =
    user.piiTypes.join(", ");
  document.getElementById("modalLastActivity").textContent = user.lastActivity;
  document.getElementById("assessmentText").textContent = user.aiAssessment;

  // Create user risk timeline chart
  createUserRiskChart(user);

  // Show modal
  document.getElementById("userModal").classList.remove("hidden");
}

function createUserRiskChart(user) {
  const ctx = document.getElementById("userRiskChart").getContext("2d");

  // Generate sample timeline data for the user
  const dates = [];
  const riskScores = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );

    // Generate realistic risk score variations around user's average
    const variation = (Math.random() - 0.5) * 2;
    const score = Math.max(0, Math.min(10, user.avgRiskScore + variation));
    riskScores.push(score);
  }

  if (userRiskChart) {
    userRiskChart.destroy();
  }

  userRiskChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Risk Score",
          data: riskScores,
          borderColor: "#1FB8CD",
          backgroundColor: "rgba(31, 184, 205, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
    },
  });
}

function startAIProcessing() {
  // Simulate periodic AI updates
  setInterval(() => {
    if (aiInsightsEnabled) {
      updateAIInsights();
    }
  }, 30000); // Update every 30 seconds
}

function updateAIInsights() {
  // Simulate real-time AI analysis updates
  showAIProcessing();

  setTimeout(() => {
    // Update processing stats
    const now = new Date();
    dashboardData.aiProcessingStats.lastUpdated = now.toLocaleString();
    dashboardData.aiProcessingStats.processingTime =
      (Math.random() * 2 + 0.5).toFixed(1) + "s";

    // Update prediction timestamp
    if (document.getElementById("predictionUpdateTime")) {
      document.getElementById(
        "predictionUpdateTime"
      ).textContent = `Updated: ${dashboardData.aiProcessingStats.lastUpdated}`;
    }

    hideAIProcessing();
  }, 2000);
}

function showAIProcessing() {
  document.getElementById("aiProcessingStatus").classList.add("show");
}

function hideAIProcessing() {
  document.getElementById("aiProcessingStatus").classList.remove("show");
}

function closeUserModal() {
  document.getElementById("userModal").classList.add("hidden");
}

function closeQueryModal() {
  document.getElementById("queryModal").classList.add("hidden");
}

// Helper functions for AI actions
function executeSuggestion(action) {
  showAIProcessing();
  setTimeout(() => {
    alert(
      `Executing AI suggestion: ${action}\n\nThis would integrate with your privacy management system.`
    );
    hideAIProcessing();
  }, 1500);
}

function refreshAISuggestions() {
  showAIProcessing();
  setTimeout(() => {
    // Simulate refreshing suggestions
    populateSmartSuggestions();
    hideAIProcessing();
  }, 2000);
}

function dismissAnomalyAlerts() {
  document.getElementById("anomalyList").innerHTML =
    '<p style="text-align: center; color: var(--color-text-secondary); padding: 20px;">No active anomaly alerts</p>';
}

function generateUserReport() {
  showAIProcessing();
  setTimeout(() => {
    alert(
      "AI-Enhanced User Risk Report Generated!\n\nThis would generate a comprehensive report with:\n- User risk assessments\n- Behavioral patterns\n- Recommended interventions\n- Predictive risk modeling"
    );
    hideAIProcessing();
  }, 3000);
}

function showActionableInsight(insight) {
  alert(
    `Actionable Insight: ${insight.title}\n\n${insight.content}\n\nThis insight can be acted upon to improve privacy protection.`
  );
}

function handleHeatmapClick(piiType, day, value, aiInsight) {
  alert(
    `${piiType} Detection\n\nDay ${day}: ${value} incidents\n\nAI Insight: ${aiInsight}`
  );
}

function handleAIExport() {
  showAIProcessing();
  setTimeout(() => {
    // Create enhanced CSV with AI insights
    const enhancedData = dashboardData.users.map((user) => [
      user.id,
      user.totalComments,
      user.avgRiskScore,
      user.piiTypes.join("; "),
      user.lastActivity,
      user.status,
      user.aiAssessment,
    ]);

    const csvContent = [
      [
        "User ID",
        "Total Comments",
        "Risk Score",
        "PII Types",
        "Last Activity",
        "Status",
        "AI Assessment",
      ],
      ...enhancedData,
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "ai_enhanced_privacy_report.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    hideAIProcessing();
  }, 2000);
}

// Existing functionality (updated for AI compatibility)
function handleTimeRangeChange(event) {
  const timeRange = event.target.value;
  showAIProcessing();
  setTimeout(() => {
    console.log("Time range changed to:", timeRange);
    // Would update charts and data here
    hideAIProcessing();
  }, 1000);
}

function handleRiskFilterChange(event) {
  const riskLevel = event.target.value;
  filterUserTable(riskLevel);
}

function filterUserTable(riskLevel) {
  const tbody = document.getElementById("userTableBody");
  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    if (riskLevel === "all") {
      row.style.display = "";
    } else {
      const riskBadge = row.querySelector(".risk-badge");
      const userRiskLevel = riskBadge.classList.contains(riskLevel);
      row.style.display = userRiskLevel ? "" : "none";
    }
  });
}

function filterUsersByRisk(riskLevel) {
  let filterValue = "all";
  if (riskLevel.includes("Low")) filterValue = "low";
  else if (riskLevel.includes("Medium")) filterValue = "medium";
  else if (riskLevel.includes("High")) filterValue = "high";

  document.getElementById("riskFilter").value = filterValue;
  filterUserTable(filterValue);
}

function handleTableSort(event) {
  const column = event.target.dataset.sort;
  const tbody = document.getElementById("userTableBody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Remove existing sort indicators
  document.querySelectorAll("[data-sort]").forEach((header) => {
    header.classList.remove("sort-asc", "sort-desc");
  });

  // Determine sort order
  const isAscending = !event.target.classList.contains("sort-asc");
  event.target.classList.add(isAscending ? "sort-asc" : "sort-desc");

  rows.sort((a, b) => {
    let aValue, bValue;

    switch (column) {
      case "id":
        aValue = a.cells[0].textContent;
        bValue = b.cells[0].textContent;
        break;
      case "comments":
        aValue = parseInt(a.cells[1].textContent);
        bValue = parseInt(b.cells[1].textContent);
        break;
      case "risk":
        aValue = parseFloat(a.cells[2].textContent);
        bValue = parseFloat(b.cells[2].textContent);
        break;
      case "activity":
        aValue = new Date(a.cells[4].textContent);
        bValue = new Date(b.cells[4].textContent);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return isAscending ? -1 : 1;
    if (aValue > bValue) return isAscending ? 1 : -1;
    return 0;
  });

  // Re-append sorted rows
  rows.forEach((row) => tbody.appendChild(row));
}

function updatePIIHeatmap() {
  const checkedPII = Array.from(
    document.querySelectorAll("[data-pii]:checked")
  ).map((cb) => cb.dataset.pii);

  document.querySelectorAll(".heatmap-cell").forEach((cell) => {
    const piiType = cell.dataset.piiType;
    if (checkedPII.includes(piiType)) {
      cell.style.display = "flex";
    } else {
      cell.style.display = "none";
    }
  });

  // Hide/show PII type labels
  document.querySelectorAll(".heatmap-label").forEach((label) => {
    if (checkedPII.includes(label.textContent)) {
      label.style.display = "flex";
    } else {
      label.style.display = "none";
    }
  });
}
