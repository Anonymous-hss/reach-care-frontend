import { ArrowUpRight } from 'lucide-react';
import './SummaryCard.css';

export default function SummaryCard({
  icon,
  iconVariant = 'pulse',
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <div className={`summary-card ${className}`}>
      <div className="summary-card__header">
        <div className="summary-card__header-left">
          {iconVariant === 'none' ? (
            icon
          ) : (
            <div className={`summary-card__icon summary-card__icon--${iconVariant}`}>
              {icon}
            </div>
          )}
          <div className="summary-card__title-group">
            <span className="summary-card__title">{title}</span>
            <span className="summary-card__subtitle">{subtitle}</span>
          </div>
        </div>
        <ArrowUpRight size={18} className="summary-card__link-icon" />
      </div>
      <div className="summary-card__divider" />
      {children}
    </div>
  );
}
