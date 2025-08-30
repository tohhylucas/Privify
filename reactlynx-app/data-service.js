// Data service for loading API data from JSON files
class DataService {
  constructor() {
    this.commentsData = null;
    this.aggregateData = null;
    this.processedData = null;
  }

  async loadData() {
    try {
      // Load both JSON files
      const [commentsResponse, aggregateResponse] = await Promise.all([
        fetch("./sample_data/comments.json"),
        fetch("./sample_data/aggregate_data.json"),
      ]);

      this.commentsData = await commentsResponse.json();
      this.aggregateData = await aggregateResponse.json();

      // Process the data to match the expected dashboard format
      this.processedData = this.processData();

      return this.processedData;
    } catch (error) {
      console.error("Error loading data:", error);
      throw error;
    }
  }

  processData() {
    // Generate risk trends from comments data
    const riskTrends = this.generateRiskTrends();

    // Process recent high-risk comments
    const recentHighRiskComments = this.processHighRiskComments();

    // Calculate risk distribution from comments data
    const riskDistribution = this.calculateRiskDistribution();

    return {
      user: this.aggregateData.user,
      aiExecutiveSummary: this.aggregateData.aiExecutiveSummary,
      riskDistribution: riskDistribution,
      riskTrends: riskTrends,
      recentHighRiskComments: recentHighRiskComments,
    };
  }

  generateRiskTrends() {
    // Create a 30-day trend based on comments data
    const trends = [];
    const today = new Date();

    // Group comments by date and calculate average risk score per day
    const commentsByDate = {};

    this.commentsData.comments.forEach((comment) => {
      const date = comment.commentDateTime.split("T")[0];
      if (!commentsByDate[date]) {
        commentsByDate[date] = [];
      }
      commentsByDate[date].push(comment.riskLevel);
    });

    // Generate 30 days of data (fill missing days with interpolated values)
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      let riskScore;
      if (commentsByDate[dateStr]) {
        // Calculate average risk score for this day
        const scores = commentsByDate[dateStr];
        riskScore =
          scores.reduce((sum, score) => sum + score, 0) / scores.length;
      } else {
        // Interpolate based on user's average risk score with some variation
        riskScore =
          this.aggregateData.user.avgRiskScore + (Math.random() - 0.5) * 2;
        riskScore = Math.max(0, Math.min(10, riskScore)); // Clamp between 0-10
      }

      trends.push({
        date: dateStr,
        riskScore: Math.round(riskScore * 10) / 10, // Round to 1 decimal
      });
    }

    return trends;
  }

  processHighRiskComments() {
    // Filter and format high-risk comments (risk level >= 7)
    const highRiskComments = this.commentsData.comments
      .filter((comment) => comment.riskLevel >= 7)
      .sort((a, b) => new Date(b.commentDateTime) - new Date(a.commentDateTime))
      .slice(0, 8) // Get top 8 most recent high-risk comments
      .map((comment, index) => {
        const piiTypes = [];
        if (comment.contactInformation) piiTypes.push("Email", "Phone");
        if (comment.geolocationInformation) piiTypes.push("Location");
        if (comment.scheduleInformation) piiTypes.push("Schedule");

        // Extract name if present in comment
        if (comment.comment.toLowerCase().includes("john"))
          piiTypes.push("Name");

        // Remove duplicates
        const uniquePiiTypes = [...new Set(piiTypes)];

        return {
          id: `comment_${1543 - index}`,
          preview:
            comment.comment.substring(0, 100) +
            (comment.comment.length > 100 ? "..." : ""),
          fullText: comment.comment,
          riskScore: comment.riskLevel,
          piiTypes: uniquePiiTypes,
          timestamp: this.formatTimestamp(comment.commentDateTime),
          platform: this.determinePlatform(comment),
          aiAction: this.determineAiAction(comment.riskLevel),
          category: this.determineCategory(comment),
        };
      });

    return highRiskComments;
  }

  formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  }

  determinePlatform(comment) {
    if (comment.contactInformation && comment.comment.includes("help"))
      return "Support Forum";
    if (comment.geolocationInformation) return "Community Forum";
    if (comment.scheduleInformation) return "Marketplace";
    return "Discussion Board";
  }

  determineAiAction(riskLevel) {
    if (riskLevel >= 9) return "Auto-redacted and user notified";
    if (riskLevel >= 8)
      return "High-risk pattern detected - review recommended";
    if (riskLevel >= 7) return "Privacy education notification sent";
    return "Moderate risk - monitoring enabled";
  }

  determineCategory(comment) {
    if (comment.contactInformation && comment.comment.includes("help"))
      return "Support Request";
    if (comment.geolocationInformation && comment.contactInformation)
      return "Social";
    if (comment.scheduleInformation && comment.contactInformation)
      return "Transaction";
    if (comment.geolocationInformation) return "Educational";
    return "Personal";
  }

  calculateRiskDistribution() {
    const comments = this.commentsData.comments;
    const totalComments = comments.length;

    let lowCount = 0;
    let mediumCount = 0;
    let highCount = 0;

    comments.forEach((comment) => {
      if (comment.riskLevel >= 0 && comment.riskLevel <= 3) {
        lowCount++;
      } else if (comment.riskLevel >= 4 && comment.riskLevel <= 6) {
        mediumCount++;
      } else if (comment.riskLevel >= 7 && comment.riskLevel <= 10) {
        highCount++;
      }
    });

    return [
      {
        level: "Low (0-3)",
        count: lowCount,
        percentage: Math.round((lowCount / totalComments) * 100 * 10) / 10,
        aiAnnotation: "Baseline comments with good privacy awareness",
      },
      {
        level: "Medium (4-6)",
        count: mediumCount,
        percentage: Math.round((mediumCount / totalComments) * 100 * 10) / 10,
        aiAnnotation: "Moderate risk - monitor for patterns",
      },
      {
        level: "High (7-10)",
        count: highCount,
        percentage: Math.round((highCount / totalComments) * 100 * 10) / 10,
        aiAnnotation: "Critical exposure requiring immediate review",
      },
    ];
  }

  getData() {
    return this.processedData;
  }
}

// Global instance
const dataService = new DataService();
