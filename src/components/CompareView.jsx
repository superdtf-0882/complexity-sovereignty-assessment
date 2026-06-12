import { useState } from 'react'
import TierBadge from './TierBadge'
import { CompareRadar } from './CountryRadar'

function generateComparison(a, b) {
  const cDiff = a.complexity.total - b.complexity.total
  const sDiff = a.sovereignty.total - b.sovereignty.total
  const bcDiff = Math.abs(a.binding_constraint - b.binding_constraint)

  const parts = []

  if (Math.abs(cDiff) >= 0.5) {
    const winner = cDiff > 0 ? a.name : b.name
    const loser = cDiff > 0 ? b.name : a.name
    parts.push(`${winner} outperforms ${loser} on complexity by ${Math.abs(cDiff).toFixed(1)} points.`)
  }

  if (Math.abs(sDiff) >= 0.5) {
    const winner = sDiff > 0 ? a.name : b.name
    const loser = sDiff > 0 ? b.name : a.name
    parts.push(`${winner} outperforms ${loser} on sovereignty by ${Math.abs(sDiff).toFixed(1)} points.`)
  }

  if (bcDiff > 0) {
    parts.push(`Their binding constraints differ by ${bcDiff.toFixed(1)}.`)
  } else {
    parts.push(`Their binding constraints are identical at ${a.binding_constraint}.`)
  }

  return parts.join(' ')
}

export default function CompareView({ countries }) {
  const [idA, setIdA] = useState('germany')
  const [idB, setIdB] = useState('russia')

  const countryA = countries.find(c => c.id === idA)
  const countryB = countries.find(c => c.id === idB)

  return (
    <div>
      <div className="compare-selectors">
        <div className="compare-selector-group">
          <label>Country A</label>
          <select value={idA} onChange={e => setIdA(e.target.value)}>
            {countries.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="compare-selector-group">
          <label>Country B</label>
          <select value={idB} onChange={e => setIdB(e.target.value)}>
            {countries.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-columns">
        {[countryA, countryB].map((country, idx) => (
          <div className="compare-column" key={country.id}>
            <h2>
              {country.name}
              <TierBadge tier={country.tier} />
            </h2>
            <div className="compare-score-blocks">
              <div className="compare-score-row">
                <span className="compare-score-row-label">Complexity</span>
                <span className="compare-score-row-value" style={{ color: 'var(--complexity)' }}>
                  {country.complexity.total}
                </span>
              </div>
              <div className="compare-score-row">
                <span className="compare-score-row-label">Sovereignty</span>
                <span className="compare-score-row-value" style={{ color: 'var(--sovereignty)' }}>
                  {country.sovereignty.total}
                </span>
              </div>
              <div className="compare-score-row">
                <span className="compare-score-row-label">Binding Constraint</span>
                <span className="compare-score-row-value" style={{ color: 'var(--binding)' }}>
                  {country.binding_constraint}
                </span>
              </div>
              <div className="compare-score-row">
                <span className="compare-score-row-label">Gap</span>
                <span className="compare-score-row-value">{country.gap}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="compare-radar-section">
        <h3>Radar comparison — all 15 dimensions</h3>
        <CompareRadar countryA={countryA} countryB={countryB} />
        <div className="compare-radar-legend">
          <div className="compare-radar-legend-item">
            <div className="legend-dot" style={{ background: '#185FA5' }} />
            {countryA.name}
          </div>
          <div className="compare-radar-legend-item">
            <div className="legend-dot" style={{ background: '#3B6D11' }} />
            {countryB.name}
          </div>
        </div>
      </div>

      <div className="compare-signals">
        <div className="compare-signal-block">
          <h4>{countryA.name} — Key Signal</h4>
          <p>{countryA.key_signal}</p>
        </div>
        <div className="compare-signal-block">
          <h4>{countryB.name} — Key Signal</h4>
          <p>{countryB.key_signal}</p>
        </div>
      </div>

      <div className="compare-summary">
        <h3>Comparison</h3>
        <p>{generateComparison(countryA, countryB)}</p>
      </div>
    </div>
  )
}
