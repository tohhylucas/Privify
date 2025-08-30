// Data service for loading API data from TypeScript files
import commentsData from '../sample_data/comments.js';
import aggregateData from '../sample_data/aggregate_data.js';

interface Comment {
  comment: string;
  commentDateTime: string;
  riskLevel: number;
  contactInformation: boolean;
  geolocationInformation: boolean;
  scheduleInformation: boolean;
}

interface AggregateData {
  user: {
    id: string;
    name: string;
    status: string;
    avgRiskScore: number;
    totalComments?: number;
  };
  aiExecutiveSummary: {
    overview: string;
    keyFindings: string[];
    suggestions: string[];
  };
}

interface ProcessedData {
  user: {
    id: string;
    name: string;
    status: string;
    avgRiskScore: number;
    avgPrivacyScore: number;
    totalComments?: number;
  };
  aiExecutiveSummary: {
    overview: string;
    keyFindings: string[];
    suggestions: string[];
  };
  riskDistribution: Array<{
    level: string;
    count: number;
    percentage: number;
    aiAnnotation: string;
  }>;
  riskTrends: Array<{
    date: string;
    riskScore: number;
  }>;
  recentHighRiskComments: Array<{
    id: string;
    preview: string;
    fullText: string;
    riskScore: number;
    piiTypes: string[];
    timestamp: string;
    platform: string;
    category: string;
    reasoning: string;
    aiAction: string;
  }>;
}

class DataService {
  private commentsData: { comments: Comment[] } | null = null;
  private aggregateData: AggregateData | null = null;
  private processedData: ProcessedData | null = null;

  async loadData(): Promise<ProcessedData> {
    try {
      // Add small delay to simulate loading and ensure proper initialization
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Use imported data directly
      this.commentsData = commentsData as { comments: Comment[] };
      this.aggregateData = aggregateData as AggregateData;

      // Validate data
      if (!this.commentsData?.comments || !this.aggregateData?.user) {
        throw new Error("Invalid data structure");
      }

      // Process the data to match the expected dashboard format
      this.processedData = this.processData();

      return this.processedData;
    } catch (error) {
      console.error("Error loading data:", error);
      throw new Error(`Data loading failed: ${error}`);
    }
  }

  private processData(): ProcessedData {
    if (!this.commentsData || !this.aggregateData) {
      throw new Error("Data not loaded");
    }

    // Calculate average privacy score from comments data
    const avgPrivacyScore = this.calculateAveragePrivacyScore();

    // Generate risk trends from comments data
    const riskTrends = this.generateRiskTrends();

    // Process recent high-risk comments
    const recentHighRiskComments = this.processHighRiskComments();

    // Calculate risk distribution from comments data
    const riskDistribution = this.calculateRiskDistribution();

    return {
      user: {
        ...this.aggregateData.user,
        avgPrivacyScore: avgPrivacyScore,
      },
      aiExecutiveSummary: this.aggregateData.aiExecutiveSummary,
      riskDistribution: riskDistribution,
      riskTrends: riskTrends,
      recentHighRiskComments: recentHighRiskComments,
    };
  }

  private calculateAveragePrivacyScore(): number {
    if (
      !this.commentsData ||
      !this.commentsData.comments ||
      this.commentsData.comments.length === 0
    ) {
      return 0;
    }

    const totalScore = this.commentsData.comments.reduce((sum, comment) => {
      return sum + (comment.riskLevel || 0);
    }, 0);

    const averageScore = totalScore / this.commentsData.comments.length;
    return Math.round(averageScore * 10) / 10;
  }

  private generateRiskTrends(): Array<{ date: string; riskScore: number }> {
    if (!this.commentsData || !this.aggregateData) {
      return [];
    }

    const trends: Array<{ date: string; riskScore: number }> = [];
    const today = new Date();
    const commentsByDate: { [key: string]: number[] } = {};

    this.commentsData.comments.forEach((comment) => {
      const date = comment.commentDateTime.split("T")[0];
      if (!commentsByDate[date]) {
        commentsByDate[date] = [];
      }
      commentsByDate[date].push(comment.riskLevel);
    });

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      let riskScore: number;
      if (commentsByDate[dateStr]) {
        const scores = commentsByDate[dateStr];
        riskScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      } else {
        riskScore = this.aggregateData.user.avgRiskScore + (Math.random() - 0.5) * 2;
        riskScore = Math.max(0, Math.min(10, riskScore));
      }

      trends.push({
        date: dateStr,
        riskScore: Math.round(riskScore * 10) / 10,
      });
    }

    return trends;
  }

  private processHighRiskComments(): Array<{
    id: string;
    preview: string;
    fullText: string;
    riskScore: number;
    piiTypes: string[];
    timestamp: string;
    platform: string;
    category: string;
    reasoning: string;
    aiAction: string;
  }> {
    if (!this.commentsData) {
      return [];
    }

    return this.commentsData.comments
      .filter((comment) => comment.riskLevel >= 7)
      .sort((a, b) => new Date(b.commentDateTime).getTime() - new Date(a.commentDateTime).getTime())
      .slice(0, 8)
      .map((comment, index) => {
        const piiTypes: string[] = [];

        if (comment.contactInformation) {
          piiTypes.push("Contact Information");
        }
        if (comment.geolocationInformation) {
          piiTypes.push("Geolocation");
        }
        if (comment.scheduleInformation) {
          piiTypes.push("Routines");
        }

        return {
          id: `tiktok_comment_${Date.now() - index}`,
          preview: comment.comment.substring(0, 120) + (comment.comment.length > 120 ? "..." : ""),
          fullText: comment.comment,
          riskScore: comment.riskLevel,
          piiTypes: piiTypes,
          timestamp: this.formatTimestamp(comment.commentDateTime),
          platform: "TikTok",
          category: this.determineTikTokCategory(comment),
          reasoning: this.generateSimpleReasoning(comment),
          aiAction: this.generateAiAction(comment),
        };
      });
  }

  private formatTimestamp(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(",", "");
  }

  private generateSimpleReasoning(comment: Comment): string {
    const reasons: string[] = [];

    if (comment.contactInformation) reasons.push("Contains contact information");
    if (comment.geolocationInformation) reasons.push("Contains location information");
    if (comment.scheduleInformation) reasons.push("Contains schedule/timing information");

    if (reasons.length === 0) {
      return "Risk level elevated due to content analysis";
    }

    let reasoning = reasons.join(", ");

    if (comment.riskLevel >= 9) {
      reasoning += " - Critical exposure requiring immediate review";
    } else if (comment.riskLevel >= 8) {
      reasoning += " - High risk exposure detected";
    } else if (comment.riskLevel >= 7) {
      reasoning += " - Moderate privacy risk detected";
    }

    return reasoning;
  }

  private generateAiAction(comment: Comment): string {
    if (comment.riskLevel >= 9) return "🚨 Delete immediately";
    if (comment.riskLevel >= 8) return "⚠️ Review and edit";
    if (comment.riskLevel >= 7) return "🔍 Monitor closely";
    return "✅ No action needed";
  }

  private determineTikTokCategory(comment: Comment): string {
    const text = comment.comment.toLowerCase();

    if (text.includes("dance") || text.includes("trend") || text.includes("moves")) {
      return "Dance/Trend";
    }
    if (text.includes("makeup") || text.includes("tutorial") || text.includes("beauty")) {
      return "Beauty/Tutorial";
    }
    if (text.includes("collab") || text.includes("dm") || text.includes("follow")) {
      return "Collaboration";
    }
    if (text.includes("cry") || text.includes("dead") || text.includes("obsessed")) {
      return "Reaction";
    }
    if (text.includes("aesthetic") || text.includes("energy") || text.includes("vibe")) {
      return "Lifestyle";
    }
    if (text.includes("concert") || text.includes("show") || text.includes("event")) {
      return "Entertainment";
    }
    if (text.includes("job") || text.includes("work") || text.includes("shift")) {
      return "Personal Life";
    }

    return "General Comment";
  }

  private calculateRiskDistribution(): Array<{
    level: string;
    count: number;
    percentage: number;
    aiAnnotation: string;
  }> {
    if (!this.commentsData) return [];

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

  getData(): ProcessedData | null {
    return this.processedData;
  }
}

export default DataService;
export type { ProcessedData, Comment, AggregateData };