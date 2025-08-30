import { useCallback } from '@lynx-js/react';

interface CommentData {
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
}

interface CommentCardProps {
  comment: CommentData;
  onTap?: (comment: CommentData) => void;
}

export function CommentCard({ comment, onTap }: CommentCardProps) {
  // Determine risk level class for styling
  const getRiskClass = (score: number) => {
    if (score >= 9) return "risk-critical";
    if (score >= 7) return "risk-high";
    if (score >= 4) return "risk-medium";
    return "risk-low";
  };

  const getRiskColor = (score: number) => {
    if (score >= 9) return "#FF0000";
    if (score >= 7) return "#FE2C55";
    if (score >= 4) return "#FF6B35";
    return "#25F4EE";
  };

  const handleTap = useCallback(() => {
    if (onTap) {
      onTap(comment);
    }
  }, [comment, onTap]);

  return (
    <view
      className={`comment-card ${getRiskClass(comment.riskScore)}`}
      bindtap={handleTap}
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        borderLeft: `4px solid ${getRiskColor(comment.riskScore)}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <view className="comment-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '8px' 
      }}>
        <view className="comment-meta">
          <text style={{ 
            color: getRiskColor(comment.riskScore), 
            fontSize: '14px', 
            fontWeight: 'bold' 
          }}>
            🚨 Risk: {comment.riskScore}/10
          </text>
          <text style={{ 
            color: '#666', 
            fontSize: '12px', 
            marginLeft: '12px' 
          }}>
            {comment.timestamp}
          </text>
        </view>
        <text style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '4px 8px', 
          borderRadius: '8px', 
          fontSize: '10px',
          color: '#666'
        }}>
          {comment.platform}
        </text>
      </view>

      <view className="comment-preview" style={{ marginBottom: '12px' }}>
        <text style={{ 
          color: '#333', 
          fontSize: '14px', 
          lineHeight: '1.4' 
        }}>
          {comment.preview}
        </text>
      </view>

      <view className="comment-footer">
        <view className="pii-tags" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          marginBottom: '8px' 
        }}>
          {comment.piiTypes.map((pii, index) => (
            <text
              key={`${pii}-${comment.id}-${index}`}
              style={{
                backgroundColor: getRiskColor(comment.riskScore),
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                marginRight: '6px',
                marginBottom: '4px',
              }}
            >
              {pii === "Contact Information" && "📞"}
              {pii === "Geolocation" && "📍"}
              {pii === "Routines" && "⏰"}
              {" " + pii}
            </text>
          ))}
        </view>

        <text style={{ 
          color: '#666', 
          fontSize: '12px', 
          fontWeight: 'bold' 
        }}>
          {comment.aiAction}
        </text>

        {comment.reasoning && (
          <text style={{
            fontSize: '11px',
            color: '#888',
            fontStyle: 'italic',
            marginTop: '4px',
          }}>
            💡 {comment.reasoning}
          </text>
        )}
      </view>
    </view>
  );
}

