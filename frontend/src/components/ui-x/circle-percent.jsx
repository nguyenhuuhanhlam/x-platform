const CirclePercent = ({
  value,
  total,
  size = 120,
  stroke = 10,
  color = '#22c55e',
  bgColor = '#e5e7eb',
  showText = false
}) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  const percent = total > 0 ? Math.min(value / total, 1) : 0
  const offset = circumference * (1 - percent)

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={stroke}
          fill="none"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {showText && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {Math.round(percent * 100)}%
        </div>
      )}
    </div>
  )
}

export default CirclePercent
