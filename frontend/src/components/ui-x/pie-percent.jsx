const polarToCartesian = (cx, cy, r, angleDeg) => {
	const angleRad = (angleDeg - 90) * Math.PI / 180
	return {
		x: cx + r * Math.cos(angleRad),
		y: cy + r * Math.sin(angleRad)
	}
}

const describeArc = (cx, cy, r, startAngle, endAngle) => {
	const start = polarToCartesian(cx, cy, r, endAngle)
	const end = polarToCartesian(cx, cy, r, startAngle)
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

	return [
		`M ${cx} ${cy}`,
		`L ${start.x} ${start.y}`,
		`A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
		'Z'
	].join(' ')
}

const PiePercent = ({
	value,
	total,
	size = 120,
	color = '#22c55e',
	bgColor = '#e5e7eb',
	showText = false
}) => {
	const percent = total > 0 ? Math.min(value / total, 1) : 0
	const angle = percent * 360
	const r = size / 2
	const cx = r
	const cy = r

	return (
		<div style={{ width: size, height: size }} className="relative">
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				{/* Background circle */}
				<circle cx={cx} cy={cy} r={r} fill={bgColor} />

				{/* Pie slice */}
				{angle > 0 && (
					<path
						d={describeArc(cx, cy, r, 0, angle)}
						fill={color}
					/>
				)}
			</svg>

			{showText && (
				<div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
					{Math.round(percent * 100)}%
				</div>
			)}
		</div>
	)
}

export default PiePercent
