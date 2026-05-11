import { ArrowRight } from 'lucide-react';
import SignalBadge from './SignalBadge';
import './SignalItem.css';

const actionConfig = {
  critical: { label: 'Take action', className: 'signal-item__action--critical' },
  emerging: { label: 'Add to evidence', className: 'signal-item__action--emerging' },
  opportunity: { label: 'Re-run Compass', className: 'signal-item__action--opportunity' },
  update: { label: 'View update', className: 'signal-item__action--update' },
};

export default function SignalItem({ signal, onAction }) {
  const normalizedStatus = signal.status?.toLowerCase();
  const config = actionConfig[normalizedStatus] || { label: 'Take action', className: '' };

  return (
    <article className="signal-item">
      <div className="signal-item__body">
        <div className="signal-item__meta-row">
          <div className="signal-item__meta">
            <SignalBadge status={signal.status} />
            <span className="signal-item__topic">{signal.topic}</span>
            <span aria-hidden="true" className="signal-item__separator">•</span>
            <span className="signal-item__region">{signal.region}</span>
            <span aria-hidden="true" className="signal-item__separator">•</span>
            <span className="signal-item__time">{signal.timeAgo}</span>
          </div>
          <span className="signal-item__relevance">Relevance {signal.relevance}</span>
        </div>

        <h2 className="signal-item__title">{signal.title}</h2>
        <p className="signal-item__summary">{signal.summary}</p>

        <div className="signal-item__footer">
          <div className="signal-item__sources" aria-label="Sources">
            {signal.sources.map((source, idx) => (
              <span key={idx} className="signal-item__source">
                {source}
              </span>
            ))}
          </div>

          <button
            type="button"
            className={`signal-item__action ${config.className}`}
            onClick={() => onAction(signal)}
          >
            {config.label}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
