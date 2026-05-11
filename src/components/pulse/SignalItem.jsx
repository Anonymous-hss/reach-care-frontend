import { ArrowRight } from 'lucide-react';
import SignalBadge from './SignalBadge';
import './SignalItem.css';

export default function SignalItem({ signal, onAction }) {
  return (
    <article className="signal-item">
      <div className="signal-item__body">
        <div className="signal-item__meta-row">
          <div className="signal-item__meta">
            <SignalBadge status={signal.status} />
            <span>{signal.topic}</span>
            <span aria-hidden="true">-</span>
            <span>{signal.region}</span>
            <span aria-hidden="true">-</span>
            <span>{signal.timeAgo}</span>
          </div>
          <span className="signal-item__relevance">Relevance {signal.relevance}</span>
        </div>

        <h2 className="signal-item__title">{signal.title}</h2>
        <p className="signal-item__summary">{signal.summary}</p>

        <div className="signal-item__footer">
          <div className="signal-item__sources" aria-label="Sources">
            {signal.sources.map((source) => (
              <span key={source} className="signal-item__source">
                {source}
              </span>
            ))}
          </div>

          {signal.action && (
            <button
              type="button"
              className="signal-item__action"
              onClick={() => onAction(signal)}
            >
              {signal.action.label}
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
