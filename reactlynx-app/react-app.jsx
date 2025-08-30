/* React 17 dashboard app (no build step) */
const { useState, useEffect, useRef, useMemo } = React;

// Add a small hook to detect mobile screens
function useIsMobile(breakpoint = 768) {
  const getIsMobile = () =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false;
  const [isMobile, setIsMobile] = useState(getIsMobile);
  useEffect(() => {
    function onResize() {
      setIsMobile(getIsMobile());
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function RiskDistributionChart({ data, isMobile }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    const labels = data.map((d) => d.level);
    const counts = data.map((d) => d.count);

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: ["#1FB8CD", "#FFC185", "#B4413C"],
            borderColor: ["#1FB8CD", "#FFC185", "#B4413C"],
            borderWidth: isMobile ? 1 : 2,
            hoverOffset: isMobile ? 6 : 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: isMobile ? "60%" : "70%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: isMobile ? 12 : 20,
              usePointStyle: true,
              font: { size: isMobile ? 10 : 12 },
            },
          },
          tooltip: {
            callbacks: {
              label(context) {
                const item = data[context.dataIndex];
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
            titleFont: { size: isMobile ? 11 : 13 },
            bodyFont: { size: isMobile ? 10 : 12 },
          },
        },
        animation: { animateRotate: true, duration: isMobile ? 800 : 1500 },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [data, isMobile]);

  return React.createElement("canvas", {
    ref: canvasRef,
    id: "riskDistributionChart",
  });
}

function RiskTrendsChart({ trendData, isMobile }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const labels = useMemo(
    () =>
      trendData.map((item) =>
        new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
    [trendData]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Risk Score",
            data: trendData.map((item) => item.riskScore),
            borderColor: "#1FB8CD",
            backgroundColor: "rgba(31, 184, 205, 0.1)",
            borderWidth: isMobile ? 2 : 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#1FB8CD",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: isMobile ? 2 : 4,
            pointHoverRadius: isMobile ? 4 : 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#1FB8CD",
            borderWidth: 1,
            titleFont: { size: isMobile ? 11 : 13 },
            bodyFont: { size: isMobile ? 10 : 12 },
            callbacks: {
              label(context) {
                return `Risk Score: ${context.parsed.y}`;
              },
              afterLabel(context) {
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
            grid: { display: false },
            ticks: {
              maxTicksLimit: isMobile ? 4 : 8,
              autoSkip: true,
              maxRotation: 0,
              font: { size: isMobile ? 10 : 12 },
            },
          },
          y: {
            beginAtZero: true,
            max: 10,
            grid: { color: "rgba(0, 0, 0, 0.1)" },
            ticks: {
              callback(value) {
                return Number(value).toFixed(1);
              },
              font: { size: isMobile ? 10 : 12 },
            },
          },
        },
        interaction: { mode: "nearest", axis: "x", intersect: false },
        animation: {
          duration: isMobile ? 1000 : 2000,
          easing: "easeInOutQuart",
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, trendData, isMobile]);

  return React.createElement("canvas", {
    ref: canvasRef,
    id: "riskTrendsChart",
  });
}

function CommentCard({ comment, onClick }) {
  return (
    <button
      type="button"
      className="comment-card fade-in"
      style={{ animationDelay: `${comment._delay || 0}s`, cursor: "pointer" }}
      onClick={() => onClick(comment)}
      aria-label={`Expand comment ${comment.id}`}
    >
      <div className="comment-header">
        <div className="comment-meta">
          <span className="comment-risk-score">Risk: {comment.riskScore}</span>
          <span className="comment-timestamp">{comment.timestamp}</span>
        </div>
        <div className="comment-platform">{comment.platform}</div>
      </div>
      <div className="comment-preview">{comment.preview}</div>
      <div className="comment-footer">
        <div className="pii-tags">
          {comment.piiTypes.map((pii) => (
            <span key={`${pii}-${comment.id}`} className="pii-tag">
              {pii}
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--text-muted)",
          }}
        >
          Category: {comment.category}
        </div>
        <div className="ai-action-suggestion">🤖 {comment.aiAction}</div>
      </div>
    </button>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Detect mobile once at the app level and pass down
  const isMobile = useIsMobile();

  // Load data from service
  useEffect(() => {
    async function loadData() {
      try {
        const loadedData = await dataService.loadData();
        setData(JSON.parse(JSON.stringify(loadedData)));
        setLastUpdated(new Date().toISOString());
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Real-time updates every 30s
  useEffect(() => {
    const id = setInterval(() => {
      setLastUpdated(new Date().toLocaleString());
      setData((prev) => {
        const variation = (Math.random() - 0.5) * 0.2;
        const newRisk = Math.max(
          0,
          Math.min(10, prev.user.avgRiskScore + variation)
        );
        return {
          ...prev,
          user: { ...prev.user, avgRiskScore: Number(newRisk.toFixed(1)) },
        };
      });
    }, 30000);
    return () => clearInterval(id);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handler(e) {
      const key = (e.key || "").toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "r") {
        e.preventDefault();
        refresh();
      }
      if ((e.ctrlKey || e.metaKey) && key === "e") {
        e.preventDefault();
        exportData();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [data]);

  function refresh() {
    setIsLoading(true);
    async function reloadData() {
      try {
        const loadedData = await dataService.loadData();
        setData(JSON.parse(JSON.stringify(loadedData)));
        setLastUpdated(new Date().toISOString());
      } catch (error) {
        console.error("Failed to reload data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    reloadData();
  }

  function exportData() {
    const exportPayload = {
      user: data.user,
      summary: data.aiExecutiveSummary,
      riskTrends: data.riskTrends,
      riskDistribution: data.riskDistribution,
      recentComments: data.recentHighRiskComments,
      exportTimestamp: new Date().toISOString(),
    };
    const str = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([str], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `privacy-dashboard-${data.user.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function expandComment(comment) {
    alert(
      `Full Comment: ${comment.fullText}\n\nRisk Score: ${
        comment.riskScore
      }\nPII Types: ${comment.piiTypes.join(", ")}\nPlatform: ${
        comment.platform
      }\nCategory: ${comment.category}\nAI Recommendation: ${
        comment.aiAction
      }\nTimestamp: ${comment.timestamp}`
    );
  }

  const recent = data.riskTrends.slice(-7);
  const trend =
    recent[recent.length - 1].riskScore > recent[0].riskScore
      ? "increasing"
      : "decreasing";

  // Determine risk level for display
  const getRiskLevel = (score) => {
    if (score >= 7) return "high";
    if (score >= 4) return "moderate";
    return "low";
  };

  // Show loading while data is being fetched
  if (!data || isLoading) {
    return (
      <div id="app">
        <div id="loading-indicator" className="loading">
          <div className="spinner"></div>
          <p>Loading privacy analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="app">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Personal Privacy Dashboard</h1>
        <div className="user-info">
          <span id="current-user">{`${data.user.name} (${data.user.id}) - ${data.user.status}`}</span>
          <div className="last-updated">
            Last updated: <span id="last-updated">{lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* AI Executive Summary */}
      <section className="ai-summary-section">
        <div className="section-header">
          <h2>🤖 AI Executive Summary</h2>
          <div className="ai-status">
            <span className="ai-indicator active"></span>
            <span>AI Active</span>
          </div>
        </div>
        <div className="summary-content">
          <div className="overview-card">
            <h3>Overview</h3>
            <p id="summary-overview">{data.aiExecutiveSummary.overview}</p>
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <h4>Key Findings</h4>
              <ul id="key-findings">
                {data.aiExecutiveSummary.keyFindings.map((finding) => (
                  <li key={finding} className="slide-in">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
            <div className="summary-item">
              <h4>Priority Actions</h4>
              <ul id="priority-actions">
                {data.aiExecutiveSummary.priorities.map((p) => (
                  <li key={p} className="slide-in">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="summary-item">
              <h4>Compliance Status</h4>
              <div id="compliance-status">
                <div
                  className={`compliance-badge ${data.aiExecutiveSummary.compliance.status}`}
                >
                  {data.aiExecutiveSummary.compliance.status
                    .replace("-", " ")
                    .toUpperCase()}
                </div>
                <div style={{ fontSize: "var(--font-size-sm)" }}>
                  {data.aiExecutiveSummary.compliance.issues} issues •{" "}
                  {data.aiExecutiveSummary.compliance.improvements} improvements
                  <br />
                  <span style={{ color: "var(--text-muted)" }}>
                    Next review: {data.aiExecutiveSummary.compliance.nextReview}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="charts-grid">
          <div className="chart-container">
            <div className="chart-header">
              <h3>Risk Score Distribution</h3>
              <div className="ai-insight">
                <span id="risk-distribution-insight">{`AI Analysis: ${
                  data.user.avgRiskScore
                } average risk score indicates ${getRiskLevel(
                  data.user.avgRiskScore
                )} privacy risk profile`}</span>
              </div>
            </div>
            <div className="chart-wrapper">
              <RiskDistributionChart
                data={data.riskDistribution}
                isMobile={isMobile}
              />
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-header">
              <h3>Risk Trends (30 Days)</h3>
              <div className="ai-insight">
                <span id="risk-trends-insight">{`AI Trend Analysis: Risk scores are ${trend} over the last 7 days`}</span>
              </div>
            </div>
            <div className="chart-wrapper">
              <RiskTrendsChart
                trendData={data.riskTrends}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent High-Risk Comments */}
      <section className="comments-section">
        <div className="section-header">
          <h2>⚠️ Recent High-Risk Comments</h2>
          <div className="comments-count">
            <span id="high-risk-count">
              {data.recentHighRiskComments.length}
            </span>{" "}
            high-risk comments found
          </div>
        </div>
        <div className="comments-container" id="comments-container">
          {data.recentHighRiskComments.map((c, i) => (
            <CommentCard
              key={c.id}
              comment={{ ...c, _delay: i * 0.05 }}
              onClick={expandComment}
            />
          ))}
        </div>
      </section>

      {/* Loading overlay */}
      <div
        id="loading-indicator"
        className={`loading ${isLoading ? "" : "hidden"}`}
      >
        <div className="spinner"></div>
        <p>Loading privacy analysis...</p>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch((err) => {
    console.log("Service Worker registration failed:", err);
  });
}
