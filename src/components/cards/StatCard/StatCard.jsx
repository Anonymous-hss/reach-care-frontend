import { ArrowUp, ArrowDown } from 'lucide-react';
import './StatCard.css';

export default function StatCard({ label, value, trend, className = '' }) {
  return (
    <div className={`stat-card ${className}`}>
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">{value}</span>
      {trend && (
        <div className="stat-card__trend">
          <span className={`stat-card__trend-icon stat-card__trend-icon--${trend.direction}`}>
            {trend.direction === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          </span>
          <span className="stat-card__trend-value">{trend.value}</span>
          <span className="stat-card__trend-label">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
