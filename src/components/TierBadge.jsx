export default function TierBadge({ tier }) {
  const labels = { 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 3', 4: 'Tier 4' }
  return (
    <span className={`tier-badge tier-${tier}`}>{labels[tier]}</span>
  )
}
