import TierBadge from './TierBadge'

const ALIGNMENT_CLASSES = {
  'NATO': 'alignment-NATO',
  'China-aligned': 'alignment-China',
  'non-aligned': 'alignment-non-aligned',
  'contested': 'alignment-contested',
}

function gapCallout(c) {
  const diff = +(c.complexity.total - c.sovereignty.total).toFixed(1)
  if (Math.abs(diff) < 0.05) {
    return 'Complexity and sovereignty are balanced. Neither dimension is the binding constraint — both govern equally.'
  }
  if (diff > 0) {
    return `Complexity exceeds sovereignty by ${diff.toFixed(1)} points. The binding constraint is the military and political stack, not the industrial base.`
  }
  return `Sovereignty exceeds complexity by ${Math.abs(diff).toFixed(1)} points. The binding constraint is the economy, not the military.`
}

export default function DetailView({ country: c, onBack, onPrev, onNext, prevName, nextName, cohortLabels }) {
  const compPct = Math.min(100, (c.complexity.total / 10) * 100)
  const sovPct  = Math.min(100, (c.sovereignty.total / 10) * 100)
  const bcPct   = Math.min(100, (c.binding_constraint / 10) * 100)

  return (
    <div>
      <div className="detail-nav">
        <button className="btn-back" onClick={onBack}>← Grid</button>
        <div className="detail-nav-spacer" />
        {onPrev && <button className="btn-nav" onClick={onPrev}>← {prevName}</button>}
        {onNext && <button className="btn-nav" onClick={onNext}>{nextName} →</button>}
      </div>

      <div className="detail-header">
        <h2 className="detail-title">{c.name}</h2>
        <TierBadge tier={c.tier} />
        {c.cohort !== 'original' && (
          <span className="cohort-badge">{cohortLabels[c.cohort] || c.cohort}</span>
        )}
        <span className={`alignment-tag ${ALIGNMENT_CLASSES[c.alignment] || 'alignment-contested'}`}>
          {c.alignment}
        </span>
      </div>

      <div className="score-blocks">
        <div className="score-block">
          <div className="score-block-label">Complexity</div>
          <div className="score-block-value complexity">{c.complexity.total}</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Sovereignty</div>
          <div className="score-block-value sovereignty">{c.sovereignty.total}</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Binding Constraint</div>
          <div className="score-block-value binding">{c.binding_constraint}</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Gap</div>
          <div className="score-block-value" style={{ color: 'var(--text)' }}>{c.gap}</div>
        </div>
      </div>

      <div className="gap-callout">{gapCallout(c)}</div>

      <div className="detail-chart-section">
        <h3>Score comparison</h3>
        <div className="score-comparison-bars">
          <div className="score-comp-row">
            <span className="score-comp-label">Complexity</span>
            <div className="score-comp-bar-wrap">
              <div className="score-comp-track">
                <div className="score-comp-fill" style={{ width: `${compPct}%`, background: 'var(--complexity)' }} />
              </div>
              <span className="score-comp-value" style={{ color: 'var(--complexity)' }}>{c.complexity.total}</span>
            </div>
          </div>
          <div className="score-comp-row">
            <span className="score-comp-label">Sovereignty</span>
            <div className="score-comp-bar-wrap">
              <div className="score-comp-track">
                <div className="score-comp-fill" style={{ width: `${sovPct}%`, background: 'var(--sovereignty)' }} />
              </div>
              <span className="score-comp-value" style={{ color: 'var(--sovereignty)' }}>{c.sovereignty.total}</span>
            </div>
          </div>
          <div className="score-comp-row">
            <span className="score-comp-label">Binding Constraint</span>
            <div className="score-comp-bar-wrap">
              <div className="score-comp-track">
                <div className="score-comp-fill" style={{ width: `${bcPct}%`, background: 'var(--binding)' }} />
              </div>
              <span className="score-comp-value" style={{ color: 'var(--binding)' }}>{c.binding_constraint}</span>
            </div>
          </div>
        </div>
        <p className="bc-marker-line">
          <strong>Binding constraint = {c.binding_constraint}</strong> — the lower of complexity ({c.complexity.total}) and sovereignty ({c.sovereignty.total}).
          {' '}Gap of {c.gap} {c.gap === 0 ? 'indicates balanced dimensions.' : 'indicates structural imbalance between the two dimensions.'}
        </p>
      </div>

      <div className="detail-notes">
        <div className="notes-block">
          <div className="notes-block-label complexity">Complexity</div>
          <p>{c.complexity.notes}</p>
        </div>
        <div className="notes-block">
          <div className="notes-block-label sovereignty">Sovereignty</div>
          <p>{c.sovereignty.notes}</p>
        </div>
      </div>

      <div className="key-signal-section">
        <h3>Key Signal</h3>
        <p className="key-signal-text">{c.key_signal}</p>
      </div>
    </div>
  )
}
