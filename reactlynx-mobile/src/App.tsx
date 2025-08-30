import { useCallback, useEffect, useState } from '@lynx-js/react'
import DataService from './services/DataService.js'
import { PrivacyScore } from './components/PrivacyScore.js'
import { CommentCard } from './components/CommentCard.js'
import { RiskChart } from './components/RiskChart.js'
import type { ProcessedData } from './services/DataService.js'

import './App.css'
import lynxLogo from './assets/lynx-logo.png'

export function App(props: {
  onRender?: () => void
}) {
  const [data, setData] = useState<ProcessedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // Initialize data service
  const dataService = new DataService()

  useEffect(() => {
    console.info('Hello, ReactLynx - TikTok Privacy Dashboard')
    loadData()
  }, [])
  
  props.onRender?.()

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      const loadedData = await dataService.loadData()
      setData(loadedData)
      setLastUpdated(new Date().toLocaleString())
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleCommentTap = useCallback((comment: any) => {
    // Show comment details in a simple alert for now
    const details = [
      `📱 TikTok Comment Details`,
      ``,
      `📝 Full Comment: ${comment.fullText}`,
      ``,
      `🚨 Risk Score: ${comment.riskScore}/10`,
      `🏷️ Privacy Info: ${comment.piiTypes.join(", ") || "None detected"}`,
      `📂 Category: ${comment.category}`,
      `🎯 AI Action: ${comment.aiAction}`,
      `⏰ Timestamp: ${comment.timestamp}`,
      ``,
      `💡 Analysis: ${comment.reasoning}`,
    ].join("\n")

    // For mobile, we could use a modal or sheet, but alert works for demo
    alert(details)
  }, [])

  const handleRefresh = useCallback(() => {
    loadData()
  }, [loadData])

  if (isLoading) {
    return (
      <view style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <view className="loading">
          <text>Loading TikTok privacy analysis...</text>
        </view>
      </view>
    )
  }

  if (!data) {
    return (
      <view style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <view className="loading">
          <text>Failed to load data</text>
          <view bindtap={handleRefresh} className="refresh-button">
            <text>Retry</text>
          </view>
        </view>
      </view>
    )
  }

  return (
    <view className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <view className="dashboard-header" style={{
        paddingTop: 'max(80px, env(safe-area-inset-top, 80px))',
        paddingLeft: 'max(20px, env(safe-area-inset-left, 20px))',
        paddingRight: 'max(20px, env(safe-area-inset-right, 20px))',
        paddingBottom: '20px'
      }}>
        <view style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <image src={lynxLogo} style={{ width: '32px', height: '32px', marginRight: '12px' }} />
          <text style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
            TikTok Privacy Dashboard
          </text>
        </view>
        <view className="user-info">
          <text style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
            {data.user.name} (@{data.user.id}) - {data.user.status}
          </text>
          {lastUpdated && (
            <text style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              Last updated: {lastUpdated}
            </text>
          )}
        </view>
      </view>

      {/* Scrollable content */}
      <scroll-view 
        scroll-y={true}
        enable-flex={true}
        style={{ 
          flex: 1, 
          backgroundColor: '#f8f8f8',
          paddingTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: '16px'
        }}
      >
        
        {/* AI Executive Summary */}
        <view className="card ai-summary">
          <view className="section-header">
            <text className="section-title">
              🎯 AI Privacy Analysis
            </text>
            <view className="ai-status">
              <view className="ai-indicator" />
              <text>AI Active</text>
            </view>
          </view>
          
          <text className="summary-overview">
            {data.aiExecutiveSummary.overview}
          </text>

          <text className="text-bold mb-sm">Key Findings:</text>
          <view className="summary-list">
            {data.aiExecutiveSummary.keyFindings.map((finding, index) => (
              <text key={index} className="summary-list-item">
                {finding}
              </text>
            ))}
          </view>

          <text className="text-bold mb-sm mt-md">Recommended Actions:</text>
          <view className="summary-list">
            {data.aiExecutiveSummary.suggestions.map((suggestion, index) => (
              <text key={index} className="summary-list-item">
                {suggestion}
              </text>
            ))}
          </view>
        </view>

        {/* Privacy Score */}
        <view className="card">
          <text className="chart-title text-center">Privacy Score</text>
          <text className="text-muted text-center mb-md" style={{ fontSize: '12px' }}>
            Average privacy risk from {data.user.totalComments || 'your'} TikTok comments analyzed
          </text>
          <PrivacyScore score={data.user.avgPrivacyScore || data.user.avgRiskScore} isMobile={true} />
        </view>

        {/* Risk Distribution Chart */}
        <RiskChart 
          data={data.riskDistribution} 
          title="Comment Risk Distribution" 
        />

        {/* Recent High-Risk Comments */}
        <view className="card">
          <view className="section-header">
            <text className="section-title">
              ⚠️ High-Risk Comments
            </text>
            <view style={{
              backgroundColor: 'var(--primary-color)',
              padding: '4px 8px',
              borderRadius: '12px'
            }}>
              <text style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>
                {data.recentHighRiskComments.length}
              </text>
            </view>
          </view>
          
          {data.recentHighRiskComments.length > 0 ? (
            data.recentHighRiskComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onTap={handleCommentTap}
              />
            ))
          ) : (
            <text style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              No high-risk comments found
            </text>
          )}
        </view>

        {/* Refresh button */}
        <view 
          bindtap={handleRefresh}
          className="refresh-button"
          style={{
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <text style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
            🔄 Refresh Data
          </text>
        </view>

        {/* Extra content to ensure scrolling works */}
        <view style={{ height: '200px', background: 'rgba(254, 44, 85, 0.05)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <text style={{ color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>
            📱 Scroll Test
          </text>
          <text style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
            If you can see this section and scroll up and down smoothly, the scrolling is working correctly! 
            This extra content ensures there's enough height to test the scroll functionality in the mobile app.
          </text>
        </view>

        <view style={{ height: '100px', background: 'rgba(37, 244, 238, 0.05)', borderRadius: '12px', padding: '16px' }}>
          <text style={{ color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>
            ✅ End of Content
          </text>
          <text style={{ color: '#666', fontSize: '14px' }}>
            You've reached the bottom of the dashboard!
          </text>
        </view>

      </scroll-view>
    </view>
  )
}