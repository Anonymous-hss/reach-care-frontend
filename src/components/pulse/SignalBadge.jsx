import './SignalBadge.css';

const badgeLabels = {
  critical: 'CRITICAL',
  emerging: 'EMERGING',
  opportunity: 'OPPORTUNITY',
  update: 'UPDATE',
};

export default function SignalBadge({ status }) {
  return (
    <span className={`signal-badge signal-badge--${status}`}>
      {badgeLabels[status] || status}
    </span>
  );
}
