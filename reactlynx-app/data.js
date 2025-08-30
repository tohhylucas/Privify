// Single User Privacy Dashboard Data - ReactLynx
const singleUserDashboardData = {
  user: {
    id: "user_001",
    name: "John Doe",
    totalComments: 145,
    avgRiskScore: 8.2,
    piiTypes: ["Email", "Phone", "Name"],
    lastActivity: "2025-08-29",
    status: "High Risk",
    accountAge: 89, // days
    joinDate: "2025-06-01",
  },

  aiExecutiveSummary: {
    overview:
      "Your privacy profile shows elevated risk with consistent high-risk behavior patterns. You've shared sensitive information including email addresses and phone numbers across 145 comments, resulting in an 8.2 average risk score that requires immediate attention.",
    keyFindings: [
      "Email addresses exposed in 67% of your comments",
      "Phone number shared 23 times in the last 30 days",
      "Risk score increased 45% since account creation",
      "Peak sharing occurs during evening hours (6-9 PM)",
      "Support-related comments show highest PII exposure",
    ],
    priorities: [
      "Review and edit comments containing email addresses",
      "Enable privacy notifications for high-risk content",
      "Complete privacy training module (required)",
      "Set up automatic PII detection alerts",
      "Review privacy settings for support interactions",
    ],
    compliance: {
      status: "at-risk",
      issues: 12,
      improvements: 3,
      nextReview: "2025-09-05",
    },
  },

  riskDistribution: [
    {
      level: "Low (0-3)",
      count: 34,
      percentage: 23.4,
      aiAnnotation: "Baseline comments with good privacy awareness",
    },
    {
      level: "Medium (4-6)",
      count: 63,
      percentage: 43.4,
      aiAnnotation: "Moderate risk - monitor for patterns",
    },
    {
      level: "High (7-10)",
      count: 48,
      percentage: 33.1,
      aiAnnotation: "Critical exposure requiring immediate review",
    },
  ],

  riskTrends: [
    { date: "2025-07-30", riskScore: 6.8 },
    { date: "2025-07-31", riskScore: 7.1 },
    { date: "2025-08-01", riskScore: 7.4 },
    { date: "2025-08-02", riskScore: 6.9 },
    { date: "2025-08-03", riskScore: 7.8 },
    { date: "2025-08-04", riskScore: 8.1 },
    { date: "2025-08-05", riskScore: 7.6 },
    { date: "2025-08-06", riskScore: 8.3 },
    { date: "2025-08-07", riskScore: 8.7 },
    { date: "2025-08-08", riskScore: 8.2 },
    { date: "2025-08-09", riskScore: 8.9 },
    { date: "2025-08-10", riskScore: 8.4 },
    { date: "2025-08-11", riskScore: 9.1 },
    { date: "2025-08-12", riskScore: 8.6 },
    { date: "2025-08-13", riskScore: 8.8 },
    { date: "2025-08-14", riskScore: 9.2 },
    { date: "2025-08-15", riskScore: 8.7 },
    { date: "2025-08-16", riskScore: 8.5 },
    { date: "2025-08-17", riskScore: 9.0 },
    { date: "2025-08-18", riskScore: 8.8 },
    { date: "2025-08-19", riskScore: 8.3 },
    { date: "2025-08-20", riskScore: 8.6 },
    { date: "2025-08-21", riskScore: 8.1 },
    { date: "2025-08-22", riskScore: 8.4 },
    { date: "2025-08-23", riskScore: 8.0 },
    { date: "2025-08-24", riskScore: 8.2 },
    { date: "2025-08-25", riskScore: 7.9 },
    { date: "2025-08-26", riskScore: 8.1 },
    { date: "2025-08-27", riskScore: 8.3 },
    { date: "2025-08-28", riskScore: 8.2 },
    { date: "2025-08-29", riskScore: 8.5 },
  ],

  intelligentInsights: [
    {
      title: "Peak Risk Pattern Detected",
      content:
        "Your highest risk comments occur between 6-9 PM on weekdays, suggesting emotional or tired decision-making affects privacy awareness",
      impact: "high",
      actionable: true,
      confidence: 0.91,
    },
    {
      title: "Email Exposure Trend",
      content:
        "You've shared email addresses in 67% of support-related comments, creating a significant privacy vulnerability pattern",
      impact: "critical",
      actionable: true,
      confidence: 0.94,
    },
    {
      title: "Positive Improvement Window",
      content:
        "Weekend comments show 40% lower risk scores, indicating better privacy decisions during relaxed periods",
      impact: "positive",
      actionable: false,
      confidence: 0.87,
    },
    {
      title: "Learning Opportunity",
      content:
        "Users who complete privacy training show 60% reduction in repeat violations - strong recommendation for your profile",
      impact: "high",
      actionable: true,
      confidence: 0.89,
    },
  ],

  recentHighRiskComments: [
    {
      id: "comment_1543",
      preview:
        "My email is john.doe@gmail.com and you can reach me at 555-123-4567 for any questions about this issue...",
      fullText:
        "My email is john.doe@gmail.com and you can reach me at 555-123-4567 for any questions about this issue. I've been having problems with my account and need immediate help.",
      riskScore: 9.2,
      piiTypes: ["Email", "Phone"],
      timestamp: "2025-08-29 14:23",
      platform: "Support Forum",
      aiAction: "Auto-redacted and user notified",
      category: "Support Request",
    },
    {
      id: "comment_1542",
      preview:
        "Hi everyone! I'm John Doe from Springfield, you can contact me directly at john.doe@company.com...",
      fullText:
        "Hi everyone! I'm John Doe from Springfield, you can contact me directly at john.doe@company.com if you want to collaborate on this project. I'm really excited about this opportunity!",
      riskScore: 8.7,
      piiTypes: ["Name", "Email", "Location"],
      timestamp: "2025-08-29 11:45",
      platform: "Community Forum",
      aiAction: "High-risk pattern detected - review recommended",
      category: "Social",
    },
    {
      id: "comment_1541",
      preview:
        "You can call me at 555-123-4567 anytime after 6 PM. My name is John and I'm available most evenings...",
      fullText:
        "You can call me at 555-123-4567 anytime after 6 PM. My name is John and I'm available most evenings to discuss this further. Thanks for your help!",
      riskScore: 8.4,
      piiTypes: ["Phone", "Name"],
      timestamp: "2025-08-28 19:32",
      platform: "Marketplace",
      aiAction: "Privacy education notification sent",
      category: "Transaction",
    },
    {
      id: "comment_1540",
      preview:
        "My email address is john.doe@gmail.com in case anyone wants to reach out about this topic...",
      fullText:
        "My email address is john.doe@gmail.com in case anyone wants to reach out about this topic. I have a lot of experience in this area and would love to help.",
      riskScore: 7.9,
      piiTypes: ["Email"],
      timestamp: "2025-08-28 16:18",
      platform: "Discussion Board",
      aiAction: "Moderate risk - monitoring enabled",
      category: "Educational",
    },
    {
      id: "comment_1539",
      preview:
        "Hey, I'm John from the Springfield area. Feel free to contact me at john.doe@company.com...",
      fullText:
        "Hey, I'm John from the Springfield area. Feel free to contact me at john.doe@company.com if you have any questions about local services. I've been in this business for years.",
      riskScore: 7.6,
      piiTypes: ["Name", "Email", "Location"],
      timestamp: "2025-08-27 20:15",
      platform: "Local Forum",
      aiAction: "Geographic privacy guidance recommended",
      category: "Business",
    },
    {
      id: "comment_1538",
      preview:
        "You can reach John Doe at 555-123-4567 for more information about this service...",
      fullText:
        "You can reach John Doe at 555-123-4567 for more information about this service. We offer competitive rates and excellent customer support.",
      riskScore: 8.1,
      piiTypes: ["Name", "Phone"],
      timestamp: "2025-08-27 15:42",
      platform: "Business Directory",
      aiAction: "Business context detected - privacy review needed",
      category: "Professional",
    },
    {
      id: "comment_1537",
      preview:
        "Hi there! My contact info is john.doe@gmail.com if anyone needs to follow up...",
      fullText:
        "Hi there! My contact info is john.doe@gmail.com if anyone needs to follow up on this discussion. I check my email regularly and respond quickly.",
      riskScore: 7.3,
      piiTypes: ["Email"],
      timestamp: "2025-08-26 13:27",
      platform: "Help Forum",
      aiAction: "Pattern recognition - education opportunity",
      category: "Support",
    },
    {
      id: "comment_1536",
      preview:
        "My phone number is 555-123-4567 and I'm usually available after work hours...",
      fullText:
        "My phone number is 555-123-4567 and I'm usually available after work hours to discuss this further. John here, thanks for the great advice everyone!",
      riskScore: 8.3,
      piiTypes: ["Phone", "Name"],
      timestamp: "2025-08-25 18:55",
      platform: "Advice Forum",
      aiAction: "Evening pattern confirmed - timing guidance needed",
      category: "Personal",
    },
  ],

  aiProcessingStats: {
    lastUpdated: "2025-08-29 17:30:00",
    processingTime: "0.8s",
    confidence: 0.92,
    modelsActive: 3,
    totalAnalyzed: 145,
  },
};
