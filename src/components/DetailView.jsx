import TierBadge from './TierBadge'
import CountryRadar from './CountryRadar'

const COMPLEXITY_QUESTIONS = [
  { key: 'q1_export_uniqueness', label: 'Export Uniqueness', max: 2 },
  { key: 'q2_trajectory', label: 'Trajectory', max: 2 },
  { key: 'q3_dutch_disease', label: 'Dutch Disease Resistance', max: 2 },
  { key: 'q4_brain_drain', label: 'Brain Drain Direction', max: 2 },
  { key: 'q5_fdi_quality', label: 'FDI Quality', max: 2 },
]

const SOVEREIGNTY_QUESTIONS = [
  { key: 'q1_airframe_engine', label: 'Airframe & Engine', max: 1 },
  { key: 'q2_nuclear', label: 'Nuclear Deterrent', max: 1 },
  { key: 'q3_arms_sales_free', label: 'Arms Export Freedom', max: 1 },
  { key: 'q4_software_sovereign', label: 'Software Sovereignty', max: 1 },
  { key: 'q5_others_seek_your_tech', label: 'Others Seek Your Tech', max: 1 },
  { key: 'q6_consistent_doctrine', label: 'Consistent Doctrine', max: 1 },
  { key: 'q7_build_domestically', label: 'Domestic Procurement', max: 1 },
  { key: 'q8_survive_without_alliance', label: 'Survive Without Alliance', max: 1 },
  { key: 'q9_edge_chips', label: 'Edge Chip Access', max: 1 },
  { key: 'q10_autonomous_ops', label: 'Autonomous Operations', max: 1 },
]

function gapCallout(country) {
  const diff = Math.abs(country.complexity.total - country.sovereignty.total)
  if (diff < 0.1) {
    return `Complexity and sovereignty are balanced at ${country.binding_constraint}. The binding constraint governs both dimensions equally.`
  }
  if (country.sovereignty.total > country.complexity.total) {
    return `Sovereignty exceeds complexity by ${diff.toFixed(1)} points. The binding constraint is the economy, not the military.`
  }
  return `Complexity exceeds sovereignty by ${diff.toFixed(1)} points. The binding constraint is the military-political stack, not the industrial base.`
}

export default function DetailView({ country, onBack, onPrev, onNext, prevName, nextName }) {
  return (
    <div>
      <div className="detail-nav">
        <button className="btn-back" onClick={onBack}>← Back to Grid</button>
        <div className="detail-nav-spacer" />
        {onPrev && (
          <button className="btn-nav" onClick={onPrev}>← {prevName}</button>
        )}
        {onNext && (
          <button className="btn-nav" onClick={onNext}>{nextName} →</button>
        )}
      </div>

      <div className="detail-header">
        <h2 className="detail-title">{country.name}</h2>
        <TierBadge tier={country.tier} />
      </div>

      <div className="score-blocks">
        <div className="score-block">
          <div className="score-block-label">Complexity</div>
          <div className="score-block-value complexity">{country.complexity.total}</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Sovereignty</div>
          <div className="score-block-value sovereignty">{country.sovereignty.total}</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Binding Constraint</div>
          <div className="score-block-value binding">{country.binding_constraint}</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Gap</div>
          <div className="score-block-value" style={{ color: '#1a1a1a' }}>{country.gap}</div>
        </div>
      </div>

      <div className="gap-callout">{gapCallout(country)}</div>

      <div className="detail-chart-section">
        <h3>Sub-score radar — all 15 dimensions</h3>
        <CountryRadar country={country} />
      </div>

      <div className="detail-breakdown">
        <div className="breakdown-section">
          <h4>Complexity (Q1–Q5)</h4>
          {COMPLEXITY_QUESTIONS.map((q, i) => (
            <div className="breakdown-row" key={q.key}>
              <div className="breakdown-row-top">
                <span className="breakdown-q">Q{i + 1}</span>
                <span className="breakdown-label">{q.label}</span>
                <span className="breakdown-score" style={{ color: 'var(--complexity)' }}>
                  {country.complexity[q.key] ?? 0} / {q.max}
                </span>
              </div>
            </div>
          ))}
          {country.complexity.notes && (
            <div style={{ marginTop: 10, fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
              {country.complexity.notes}
            </div>
          )}
        </div>

        <div className="breakdown-section">
          <h4>Sovereignty (Q1–Q10)</h4>
          {SOVEREIGNTY_QUESTIONS.map((q, i) => (
            <div className="breakdown-row" key={q.key}>
              <div className="breakdown-row-top">
                <span className="breakdown-q">Q{i + 1}</span>
                <span className="breakdown-label">{q.label}</span>
                <span className="breakdown-score" style={{ color: 'var(--sovereignty)' }}>
                  {country.sovereignty[q.key] ?? 0} / {q.max}
                </span>
              </div>
            </div>
          ))}
          {country.sovereignty.notes && (
            <div style={{ marginTop: 10, fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
              {country.sovereignty.notes}
            </div>
          )}
        </div>
      </div>

      <div className="key-signal-section">
        <h3>Key Signal</h3>
        <p className="key-signal-text">{country.key_signal}</p>
      </div>
    </div>
  )
}
