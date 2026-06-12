import ScoreBar from './ScoreBar'
import TierBadge from './TierBadge'

function gapClass(gap) {
  if (gap >= 4) return 'gap-high'
  if (gap >= 2) return 'gap-mid'
  return 'gap-low'
}

function SortTh({ label, sortKey, current, dir, onSort }) {
  const active = current === sortKey
  const arrow = active ? (dir === 'asc' ? '↑' : '↓') : '↕'
  return (
    <th className="sortable" onClick={() => onSort(sortKey)}>
      {label}
      <span className={`sort-arrow${active ? ' active' : ''}`}>{arrow}</span>
    </th>
  )
}

export default function GridView({ countries, sortKey, sortDir, tierFilter, onSort, onFilter, onSelect }) {
  return (
    <div>
      <div className="grid-controls">
        <label>
          Sort by{' '}
          <select value={sortKey} onChange={e => onSort(e.target.value)}>
            <option value="binding_constraint">Binding Constraint</option>
            <option value="complexity">Complexity</option>
            <option value="sovereignty">Sovereignty</option>
            <option value="gap">Gap</option>
            <option value="name">Country Name</option>
          </select>
        </label>
        <label>
          Filter by tier{' '}
          <select value={tierFilter} onChange={e => onFilter(Number(e.target.value))}>
            <option value={0}>All tiers</option>
            <option value={1}>Tier 1</option>
            <option value={2}>Tier 2</option>
            <option value={3}>Tier 3</option>
            <option value={4}>Tier 4</option>
          </select>
        </label>
      </div>

      <div className="grid-table-wrap">
        <table className="grid-table">
          <thead>
            <tr>
              <SortTh label="Country" sortKey="name" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="Complexity" sortKey="complexity" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="Sovereignty" sortKey="sovereignty" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="Binding Constraint" sortKey="binding_constraint" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="Gap" sortKey="gap" current={sortKey} dir={sortDir} onSort={onSort} />
              <th>Tier</th>
              <th>Key Signal</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(c => (
              <tr key={c.id} className="clickable" onClick={() => onSelect(c.id)}>
                <td className="country-name-cell">{c.name}</td>
                <td style={{ minWidth: 120 }}>
                  <ScoreBar value={c.complexity.total} color="var(--complexity)" />
                </td>
                <td style={{ minWidth: 120 }}>
                  <ScoreBar value={c.sovereignty.total} color="var(--sovereignty)" />
                </td>
                <td>
                  <span className="bc-score">{c.binding_constraint}</span>
                </td>
                <td>
                  <span className={`gap-value ${gapClass(c.gap)}`}>{c.gap}</span>
                </td>
                <td>
                  <TierBadge tier={c.tier} />
                </td>
                <td className="key-signal-cell">{c.key_signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
