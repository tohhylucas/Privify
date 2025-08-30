interface RiskDistributionData {
  level: string;
  count: number;
  percentage: number;
  aiAnnotation: string;
}

interface RiskChartProps {
  data: RiskDistributionData[];
  title: string;
}

export function RiskChart({ data, title }: RiskChartProps) {
  const getColor = (level: string) => {
    if (level.includes("High")) return "#FE2C55";
    if (level.includes("Medium")) return "#FF6B35";
    return "#25F4EE";
  };

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <view className="chart-container">
      <text className="chart-title">
        {title}
      </text>

      {data.map((item, index) => (
        <view key={`${item.level}-${index}`} style={{ marginBottom: '12px' }}>
          <view style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '4px'
          }}>
            <text style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
              {item.level}
            </text>
            <text style={{ fontSize: '14px', color: '#666' }}>
              {item.count} ({item.percentage}%)
            </text>
          </view>
          
          {/* Simple bar chart representation */}
          <view className="chart-bar">
            <view 
              className="chart-fill"
              style={{
                width: `${(item.count / maxCount) * 100}%`,
                backgroundColor: getColor(item.level),
                '--target-width': `${(item.count / maxCount) * 100}%`
              } as any}
            />
          </view>
          
          <text style={{ 
            fontSize: '11px', 
            color: '#888', 
            marginTop: '4px',
            fontStyle: 'italic'
          }}>
            {item.aiAnnotation}
          </text>
        </view>
      ))}
    </view>
  );
}

