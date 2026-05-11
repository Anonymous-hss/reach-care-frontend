import './MetricTile.css';

export default function MetricTile({ label, value, tone }) {
  return (
    <div className="metric-tile">
      <span className="metric-tile__label">{label}</span>
      <span className={`metric-tile__value ${tone ? `metric-tile__value--${tone}` : ''}`}>
        {value}
      </span>
    </div>
  );
}
