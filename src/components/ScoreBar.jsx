export default function ScoreBar({ value, max = 10, color }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="score-label" style={{ color }}>{value}</span>
    </div>
  )
}
