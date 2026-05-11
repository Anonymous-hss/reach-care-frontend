import './SignalBadge.css';

const badgeLabels = {
  critical: 'CRITICAL',
  emerging: 'EMERGING',
  opportunity: 'OPPORTUNITY',
  update: 'UPDATE',
};

export default function SignalBadge({ status }) {
  const normalizedStatus = status?.toLowerCase();
  return (
    <span className={`signal-badge signal-badge--${normalizedStatus}`}>
      {badgeLabels[normalizedStatus] || status}
    </span>
  );
}
