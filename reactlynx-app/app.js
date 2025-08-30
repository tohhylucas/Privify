// ReactLynx Personal Privacy Dashboard Application
class ReactLynxDashboard {
  constructor() {
    this.data = singleUserDashboardData;
    this.charts = {};
    this.isLoading = true;
  }

  static async create() {
    const dashboard = new ReactLynxDashboard();
    await dashboard.init();
    return dashboard;
  }

  async init() {
    this.showLoading();
    await this.simulateDataLoading();
    this.hideLoading();
    this.render();
    this.bindEvents();
    this.startRealTimeUpdates();
  }

  async simulateDataLoading() {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  showLoading() {
    const loadingElement = document.getElementById("loading-indicator");
    loadingElement.classList.remove("hidden");
  }

  hideLoading() {
    const loadingElement = document.getElementById("loading-indicator");
    loadingElement.classList.add("hidden");
  }

  render() {
    this.renderUserInfo();
    this.renderAIExecutiveSummary();
    this.renderCharts();
    this.renderIntelligentInsights();
    this.renderRecentComments();
    this.addAnimations();
  }

  renderUserInfo() {
    const user = this.data.user;
    document.getElementById(
      "current-user"
    ).textContent = `${user.name} (${user.id}) - ${user.status}`;

    document.getElementById("last-updated").textContent =
      this.data.aiProcessingStats.lastUpdated;
  }

  renderAIExecutiveSummary() {
    const summary = this.data.aiExecutiveSummary;

    // Overview
    document.getElementById("summary-overview").textContent = summary.overview;

    // Key Findings
    const keyFindingsList = document.getElementById("key-findings");
    keyFindingsList.innerHTML = "";
    summary.keyFindings.forEach((finding) => {
      const li = document.createElement("li");
      li.textContent = finding;
      li.classList.add("slide-in");
      keyFindingsList.appendChild(li);
    });

    // Priority Actions
    const priorityActionsList = document.getElementById("priority-actions");
    priorityActionsList.innerHTML = "";
    summary.priorities.forEach((priority) => {
      const li = document.createElement("li");
      li.textContent = priority;
      li.classList.add("slide-in");
      priorityActionsList.appendChild(li);
    });

    // Compliance Status
    const complianceStatus = document.getElementById("compliance-status");
    complianceStatus.innerHTML = `
            <div class="compliance-badge ${summary.compliance.status}">
                ${summary.compliance.status.replace("-", " ").toUpperCase()}
            </div>
            <div style="font-size: var(--font-size-sm);">
                ${summary.compliance.issues} issues • ${
      summary.compliance.improvements
    } improvements<br>
                <span style="color: var(--text-muted);">Next review: ${
                  summary.compliance.nextReview
                }</span>
            </div>
        `;
  }

  renderCharts() {
    this.createRiskDistributionChart();
    this.createRiskTrendsChart();
    this.updateChartInsights();
  }

  createRiskDistributionChart() {
    const ctx = document
      .getElementById("riskDistributionChart")
      .getContext("2d");

    if (this.charts.riskDistribution) {
      this.charts.riskDistribution.destroy();
    }

    this.charts.riskDistribution = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.data.riskDistribution.map((item) => item.level),
        datasets: [
          {
            data: this.data.riskDistribution.map((item) => item.count),
            backgroundColor: ["#1FB8CD", "#FFC185", "#B4413C"],
            borderColor: ["#1FB8CD", "#FFC185", "#B4413C"],
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const item =
                  singleUserDashboardData.riskDistribution[context.dataIndex];
                return [
                  `${context.label}: ${context.parsed} comments`,
                  `${item.percentage}% of total`,
                  `AI: ${item.aiAnnotation}`,
                ];
              },
            },
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#1FB8CD",
            borderWidth: 1,
          },
        },
        animation: {
          animateRotate: true,
          duration: 1500,
        },
      },
    });
  }

  createRiskTrendsChart() {
    const ctx = document.getElementById("riskTrendsChart").getContext("2d");

    if (this.charts.riskTrends) {
      this.charts.riskTrends.destroy();
    }

    const trendData = this.data.riskTrends;
    const labels = trendData.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    });

    this.charts.riskTrends = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Risk Score",
            data: trendData.map((item) => item.riskScore),
            borderColor: "#1FB8CD",
            backgroundColor: "rgba(31, 184, 205, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#1FB8CD",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
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
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#1FB8CD",
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                return `Risk Score: ${context.parsed.y}`;
              },
              afterLabel: function (context) {
                const score = context.parsed.y;
                if (score >= 7) return "High Risk - Requires attention";
                if (score >= 4) return "Medium Risk - Monitor closely";
                return "Low Risk - Good privacy practices";
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 8,
            },
          },
          y: {
            beginAtZero: true,
            max: 10,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              callback: function (value) {
                return value.toFixed(1);
              },
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        },
      },
    });
  }

  updateChartInsights() {
    // Risk Distribution Insight
    const avgRisk = this.data.user.avgRiskScore;
    let riskLevel;
    if (avgRisk >= 7) {
      riskLevel = "high";
    } else if (avgRisk >= 4) {
      riskLevel = "moderate";
    } else {
      riskLevel = "low";
    }

    const riskDistInsight = document.getElementById(
      "risk-distribution-insight"
    );
    riskDistInsight.textContent = `AI Analysis: ${avgRisk} average risk score indicates ${riskLevel} privacy risk profile`;

    // Risk Trends Insight
    const trends = this.data.riskTrends;
    const recent = trends.slice(-7);
    const trend =
      recent[recent.length - 1].riskScore > recent[0].riskScore
        ? "increasing"
        : "decreasing";
    const riskTrendInsight = document.getElementById("risk-trends-insight");
    riskTrendInsight.textContent = `AI Trend Analysis: Risk scores are ${trend} over the last 7 days`;
  }

  renderIntelligentInsights() {
    const container = document.getElementById("insights-grid");
    container.innerHTML = "";

    this.data.intelligentInsights.forEach((insight, index) => {
      const card = document.createElement("div");
      card.className = "insight-card fade-in";
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
                <div class="insight-header">
                    <div class="insight-impact ${insight.impact}">
                        ${insight.impact.toUpperCase()}
                    </div>
                    <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
                        ${Math.round(insight.confidence * 100)}%
                    </div>
                </div>
                <div class="insight-title">${insight.title}</div>
                <div class="insight-content">${insight.content}</div>
            `;

      if (insight.actionable) {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
          this.showInsightDetails(insight);
        });
      }

      container.appendChild(card);
    });
  }

  renderRecentComments() {
    const container = document.getElementById("comments-container");
    const highRiskCount = document.getElementById("high-risk-count");

    highRiskCount.textContent = this.data.recentHighRiskComments.length;
    container.innerHTML = "";

    this.data.recentHighRiskComments.forEach((comment, index) => {
      const card = document.createElement("div");
      card.className = "comment-card fade-in";
      card.style.animationDelay = `${index * 0.05}s`;

      card.innerHTML = `
                <div class="comment-header">
                    <div class="comment-meta">
                        <span class="comment-risk-score">Risk: ${
                          comment.riskScore
                        }</span>
                        <span class="comment-timestamp">${
                          comment.timestamp
                        }</span>
                    </div>
                    <div class="comment-platform">${comment.platform}</div>
                </div>
                <div class="comment-preview">${comment.preview}</div>
                <div class="comment-footer">
                    <div class="pii-tags">
                        ${comment.piiTypes
                          .map((pii) => `<span class="pii-tag">${pii}</span>`)
                          .join("")}
                    </div>
                    <div style="font-size: var(--font-size-sm); color: var(--text-muted);">
                        Category: ${comment.category}
                    </div>
                    <div class="ai-action-suggestion">🤖 ${
                      comment.aiAction
                    }</div>
                </div>
            `;

      // Add click handler to expand comment
      card.addEventListener("click", () => {
        this.expandComment(comment);
      });

      container.appendChild(card);
    });
  }

  expandComment(comment) {
    // Create modal-like expansion (simple alert for now)
    const details = `
Full Comment: ${comment.fullText}

Risk Score: ${comment.riskScore}
PII Types: ${comment.piiTypes.join(", ")}
Platform: ${comment.platform}
Category: ${comment.category}
AI Recommendation: ${comment.aiAction}
Timestamp: ${comment.timestamp}
        `;

    alert(details);
  }

  showInsightDetails(insight) {
    const details = `
${insight.title}

${insight.content}

Impact Level: ${insight.impact.toUpperCase()}
Confidence: ${Math.round(insight.confidence * 100)}%
Actionable: ${insight.actionable ? "Yes" : "No"}

This insight can help you improve your privacy practices.
        `;

    alert(details);
  }

  addAnimations() {
    // Add staggered animations to elements
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      if (!el.style.animationDelay) {
        el.style.animationDelay = `${index * 0.1}s`;
      }
    });
  }

  bindEvents() {
    // Smooth scrolling for better mobile experience
    this.addSmoothScrolling();

    // Chart interaction events
    this.bindChartEvents();

    // Window resize handler for charts
    window.addEventListener("resize", () => {
      this.debounce(() => {
        Object.values(this.charts).forEach((chart) => {
          if (chart) chart.resize();
        });
      }, 250)();
    });
  }

  bindChartEvents() {
    // Add click events to charts for interactivity
    if (this.charts.riskDistribution) {
      this.charts.riskDistribution.options.onClick = (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const riskLevel = this.data.riskDistribution[index];
          this.showRiskLevelDetails(riskLevel);
        }
      };
    }
  }

  showRiskLevelDetails(riskLevel) {
    const details = `
Risk Level: ${riskLevel.level}
Comments: ${riskLevel.count} (${riskLevel.percentage}%)
AI Analysis: ${riskLevel.aiAnnotation}

This represents ${riskLevel.percentage}% of your total comments.
        `;

    alert(details);
  }

  addSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Enhanced scroll behavior for comments container
    const commentsContainer = document.getElementById("comments-container");
    if (commentsContainer) {
      commentsContainer.style.scrollBehavior = "smooth";
    }
  }

  startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
      this.updateTimestamp();
      this.simulateDataRefresh();
    }, 30000);
  }

  updateTimestamp() {
    const now = new Date();
    document.getElementById("last-updated").textContent = now.toLocaleString();
  }

  simulateDataRefresh() {
    // Simulate minor data changes
    const riskVariation = (Math.random() - 0.5) * 0.2;
    const currentRisk = this.data.user.avgRiskScore;
    const newRisk = Math.max(0, Math.min(10, currentRisk + riskVariation));

    // Update risk score with animation
    this.animateNumberChange(
      document.querySelector(".user-info span"),
      newRisk.toFixed(1)
    );

    this.data.user.avgRiskScore = newRisk;
  }

  animateNumberChange(element, newValue) {
    if (!element) return;

    element.style.transition = "all 0.3s ease";
    element.style.transform = "scale(1.1)";
    element.style.color = "#1FB8CD";

    setTimeout(() => {
      element.style.transform = "scale(1)";
      element.style.color = "";
    }, 300);
  }

  // Utility function for debouncing
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Method to manually refresh data (can be called externally)
  async refresh() {
    this.showLoading();
    await this.simulateDataLoading();
    this.render();
    this.hideLoading();
  }

  // Method to export data (can be extended)
  exportData() {
    const exportData = {
      user: this.data.user,
      summary: this.data.aiExecutiveSummary,
      riskTrends: this.data.riskTrends,
      insights: this.data.intelligentInsights,
      recentComments: this.data.recentHighRiskComments,
      exportTimestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `privacy-dashboard-${this.data.user.id}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  window.dashboard = await ReactLynxDashboard.create();

  // Add global keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + R to refresh dashboard
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
      e.preventDefault();
      window.dashboard.refresh();
    }

    // Ctrl/Cmd + E to export data
    if ((e.ctrlKey || e.metaKey) && e.key === "e") {
      e.preventDefault();
      window.dashboard.exportData();
    }
  });
});

// Error handling
window.addEventListener("error", (e) => {
  console.error("Dashboard error:", e.error);

  // Hide loading if there's an error
  const loadingElement = document.getElementById("loading-indicator");
  if (loadingElement) {
    loadingElement.classList.add("hidden");
  }

  // Show user-friendly error message
  const errorDiv = document.createElement("div");
  errorDiv.innerHTML = `
        <div style="
            position: fixed; 
            top: 20px; 
            right: 20px; 
            background: #FEE2E2; 
            color: #991B1B; 
            padding: 16px; 
            border-radius: 8px; 
            border: 1px solid #FECACA;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            max-width: 300px;
        ">
            <strong>⚠️ Dashboard Error</strong><br>
            Something went wrong. Please refresh the page.
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="float: right; background: none; border: none; color: #991B1B; cursor: pointer;">×</button>
        </div>
    `;
  document.body.appendChild(errorDiv);

  // Auto-remove error after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentElement) {
      errorDiv.remove();
    }
  }, 5000);
});

// Service Worker registration for offline capability (optional)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch((err) => {
    console.log("Service Worker registration failed:", err);
  });
}
