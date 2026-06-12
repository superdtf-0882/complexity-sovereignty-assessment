import ScoreBar from './ScoreBar'
import TierBadge from './TierBadge'

const COHORT_LABELS = {
  original: 'Original',
  nato: 'NATO+',
  asia: 'Asia-Pac',
  contested: 'Contested',
  extended: 'Extended',
}

const ALIGNMENT_CLASSES = {
  'NATO': 'alignment-NATO',
  'China-aligned': 'alignment-China',
  'non-aligned': 'alignment-non-aligned',
  'contested': 'alignment-contested',
}

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
      {label}<span className={`sort-arrow${active ? ' active' : ''}`}>{arrow}</span>
    </th>
  )
}

export default function GridView({
  countries, total, sortKey, sortDir,
  tierFilter, cohortFilter, alignmentFilter,
  onSort, onTierFilter, onCohortFilter, onAlignmentFilter, onSelect,
}) {
  return (
    <div>
      <div className="grid-controls">
        <label>
          Sort by
          <select value={sortKey} onChange={e => onSort(e.target.value)}>
            <option value="binding_constraint">Binding Constraint</option>
            <option value="complexity">Complexity</option>
            <option value="sovereignty">Sovereignty</option>
            <option value="gap">Gap</option>
            <option value="name">Country Name</option>
          </select>
        </label>

        <label>
          Tier
          <select value={tierFilter} onChange={e => onTierFilter(Number(e.target.value))}>
            <option value={0}>All tiers</option>
            <option value={1}>Tier 1</option>
            <option value={2}>Tier 2</option>
            <option value={3}>Tier 3</option>
            <option value={4}>Tier 4</option>
          </select>
        </label>

        <label>
          Cohort
          <select value={cohortFilter} onChange={e => onCohortFilter(e.target.value)}>
            <option value="">All cohorts</option>
            <option value="original">Original 14</option>
            <option value="nato">NATO additions</option>
            <option value="asia">Asia-Pacific</option>
            <option value="contested">Contested</option>
            <option value="extended">Extended</option>
          </select>
        </label>

        <label>
          Alignment
          <select value={alignmentFilter} onChange={e => onAlignmentFilter(e.target.value)}>
            <option value="">All</option>
            <option value="NATO">NATO</option>
            <option value="China-aligned">China-aligned</option>
            <option value="non-aligned">Non-aligned</option>
            <option value="contested">Contested</option>
          </select>
        </label>

        <span className="grid-count">Showing {countries.length} of {total}</span>
      </div>

      <div className="grid-table-wrap">
        <table className="grid-table">
          <thead>
            <tr>
              <SortTh label="Country" sortKey="name" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="Complexity" sortKey="complexity" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="Sovereignty" sortKey="sovereignty" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="BC" sortKey="binding_constraint" current={sortKey} dir={sortDir} onSort={onSort} />
              <SortTh label="Gap" sortKey="gap" current={sortKey} dir={sortDir} onSort={onSort} />
              <th>Tier</th>
              <th>Key Signal</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(c => (
              <tr key={c.id} className="clickable" onClick={() => onSelect(c.id)}>
                <td className="country-name-cell">
                  {c.name}
                  <div className="country-badges">
                    {c.cohort !== 'original' && (
                      <span className="cohort-badge">{COHORT_LABELS[c.cohort] || c.cohort}</span>
                    )}
                    <span className={`alignment-tag ${ALIGNMENT_CLASSES[c.alignment] || 'alignment-contested'}`}>
                      {c.alignment}
                    </span>
                  </div>
                </td>
                <td style={{ minWidth: 110 }}>
                  <ScoreBar value={c.complexity.total} color="var(--complexity)" />
                </td>
                <td style={{ minWidth: 110 }}>
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
