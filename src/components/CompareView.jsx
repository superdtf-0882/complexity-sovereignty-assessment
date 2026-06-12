import { useState } from 'react'
import TierBadge from './TierBadge'

function generateComparison(a, b) {
  const parts = []
  const cDiff = +(a.complexity.total - b.complexity.total).toFixed(1)
  const sDiff = +(a.sovereignty.total - b.sovereignty.total).toFixed(1)
  const bcDiff = +(Math.abs(a.binding_constraint - b.binding_constraint)).toFixed(1)

  if (Math.abs(cDiff) >= 0.5) {
    const [w, l] = cDiff > 0 ? [a.name, b.name] : [b.name, a.name]
    parts.push(`${w} outperforms ${l} on complexity by ${Math.abs(cDiff)} points.`)
  } else {
    parts.push(`${a.name} and ${b.name} are tied on complexity at ${a.complexity.total}.`)
  }

  if (Math.abs(sDiff) >= 0.5) {
    const [w, l] = sDiff > 0 ? [a.name, b.name] : [b.name, a.name]
    parts.push(`${w} outperforms ${l} on sovereignty by ${Math.abs(sDiff)} points.`)
  } else {
    parts.push(`Their sovereignty scores are equal at ${a.sovereignty.total}.`)
  }

  if (bcDiff > 0) {
    parts.push(`Their binding constraints differ by ${bcDiff} — ${a.binding_constraint} vs ${b.binding_constraint}.`)
  } else {
    parts.push(`Their binding constraints are identical at ${a.binding_constraint}.`)
  }

  return parts.join(' ')
}

const METRICS = [
  { key: 'complexity',         label: 'Complexity',         color: 'var(--complexity)',  getValue: c => c.complexity.total },
  { key: 'sovereignty',        label: 'Sovereignty',        color: 'var(--sovereignty)', getValue: c => c.sovereignty.total },
  { key: 'binding_constraint', label: 'Binding Constraint', color: 'var(--binding)',     getValue: c => c.binding_constraint },
  { key: 'gap',                label: 'Gap',                color: 'var(--muted)',       getValue: c => c.gap },
]

const COLORS_A = 'var(--complexity)'
const COLORS_B = 'var(--sovereignty)'

export default function CompareView({ countries, cohortLabels }) {
  const [idA, setIdA] = useState('germany')
  const [idB, setIdB] = useState('russia')

  const a = countries.find(c => c.id === idA)
  const b = countries.find(c => c.id === idB)

  const sorted = [...countries].sort((x, y) => x.name.localeCompare(y.name))

  return (
    <div>
      <div className="compare-selectors">
        {[['Country A', idA, setIdA, COLORS_A], ['Country B', idB, setIdB, COLORS_B]].map(([label, val, setter, color]) => (
          <div className="compare-selector-group" key={label}>
            <label style={{ color }}>{label}</label>
            <select value={val} onChange={e => setter(e.target.value)}>
              {sorted.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="compare-columns">
        {[a, b].map((c, i) => (
          <div className="compare-column" key={c.id}>
            <h2>
              {c.name}
              <TierBadge tier={c.tier} />
            </h2>
            <div className="compare-score-list">
              {METRICS.map(m => (
                <div className="compare-score-row" key={m.key}>
                  <span className="compare-score-row-label">{m.label}</span>
                  <span className="compare-score-row-value" style={{ color: m.color }}>
                    {m.getValue(c)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="compare-chart-section">
        <h3>Score comparison</h3>
        <div className="compare-bar-group">
          {METRICS.map(m => (
            <div className="compare-bar-metric" key={m.key}>
              <div className="compare-bar-metric-label">{m.label}</div>
              {[a, b].map((c, i) => {
                const val = m.getValue(c)
                const pct = Math.min(100, (val / 10) * 100)
                const color = i === 0 ? COLORS_A : COLORS_B
                return (
                  <div className="compare-bar-row" key={c.id}>
                    <span className="compare-bar-name">{c.name}</span>
                    <div className="compare-bar-track">
                      <div className="compare-bar-fill" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <span className="compare-bar-val" style={{ color }}>{val}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="compare-signals">
        {[a, b].map(c => (
          <div className="compare-signal-block" key={c.id}>
            <h4>{c.name} — Key Signal</h4>
            <p>{c.key_signal}</p>
          </div>
        ))}
      </div>

      <div className="compare-summary">
        <h3>Comparison</h3>
        <p>{generateComparison(a, b)}</p>
      </div>
    </div>
  )
}
