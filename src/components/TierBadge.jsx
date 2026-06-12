const LABELS = { 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 3', 4: 'Tier 4' }

export default function TierBadge({ tier }) {
  return <span className={`tier-badge tier-${tier}`}>{LABELS[tier]}</span>
}
