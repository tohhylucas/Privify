import { useState, useEffect } from '@lynx-js/react';

interface PrivacyScoreProps {
  score: number;
  isMobile?: boolean;
}

export function PrivacyScore({ score, isMobile = true }: PrivacyScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 600);
    return () => clearTimeout(timer);
  }, [score]);

  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 7) return "#FE2C55"; // TikTok red for high risk
    if (score >= 4) return "#FF6B35"; // Orange for medium risk
    return "#25F4EE"; // TikTok cyan for low risk
  };

  // Determine risk level for display
  const getRiskLevel = (score: number) => {
    if (score >= 7) return "High Risk";
    if (score >= 4) return "Medium Risk";
    return "Low Risk";
  };

  const circleSize = isMobile ? 120 : 160;
  const strokeWidth = isMobile ? 8 : 12;

  return (
    <view className="privacy-score-container">
      {/* Simplified circular progress indicator */}
      <view 
        className="privacy-score-circle"
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          border: `${strokeWidth}px solid #f0f0f0`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        {/* Progress overlay using conic gradient */}
        <view
          className="privacy-score-fill"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(${getColor(animatedScore)} 0deg, ${getColor(animatedScore)} ${(animatedScore / 10) * 360}deg, transparent ${(animatedScore / 10) * 360}deg)`,
            mask: `radial-gradient(transparent ${circleSize * 0.35}px, black ${circleSize * 0.35}px)`,
            WebkitMask: `radial-gradient(transparent ${circleSize * 0.35}px, black ${circleSize * 0.35}px)`,
          }}
        />
        
        {/* Score text in center */}
        <view className="privacy-score-text">
          <text
            className="privacy-score-number"
            style={{ 
              color: getColor(animatedScore),
            }}
          >
            {animatedScore.toFixed(1)}
          </text>
          <text className="privacy-score-label">
            / 10
          </text>
        </view>
      </view>

      {/* Risk level indicator */}
      <view className="privacy-score-level">
        <text
          className={`risk-badge ${
            animatedScore >= 7 ? "high" : animatedScore >= 4 ? "medium" : "low"
          }`}
        >
          {getRiskLevel(animatedScore)}
        </text>
      </view>
    </view>
  );
}

