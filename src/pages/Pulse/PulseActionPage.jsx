import { Navigate, useParams } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  Download,
  ExternalLink,
  FileText,
  Info,
  MessageSquare,
  RotateCcw,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';
import SignalBadge from '../../components/pulse/SignalBadge';
import { pulseActionPages, pulseData } from '../../data/pulseData';
import './PulseActionPage.css';

function getSignal(signalId) {
  return pulseData.signals.find((signal) => signal.id === signalId);
}

function getActionIcon(action) {
  const label = action.toLowerCase();

  if (label.includes('export')) return Download;
  if (label.includes('studio') || label.includes('variation') || label.includes('model responses')) return SlidersHorizontal;
  if (label.includes('outbreak') || label.includes('re-run') || label.includes('allocation')) return RotateCcw;
  if (label.includes('ask') || label.includes('investigate') || label.includes('question')) return MessageSquare;
  if (label.includes('evidence') || label.includes('review')) return FileText;
  return Info;
}

function ActionButton({ children, tone = 'secondary', icon: Icon, onClick }) {
  return (
    <button type="button" className={`pulse-action-button pulse-action-button--${tone}`} onClick={onClick}>
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}

function DetailStat({ stat }) {
  return (
    <div className="pulse-detail-stat">
      <span className="pulse-detail-stat__label">{stat.label}</span>
      <span className={`pulse-detail-stat__value ${stat.tone ? `pulse-detail-stat__value--${stat.tone}` : ''}`}>
        {stat.value}
        {stat.detail && <span>{stat.detail}</span>}
      </span>
      {stat.note && <span className={`pulse-detail-stat__note ${stat.tone ? `pulse-detail-stat__note--${stat.tone}` : ''}`}>{stat.note}</span>}
    </div>
  );
}

function TrendChart({ chart }) {
  const coordinates = chart.points.map((value, index) => {
    const x = 70 + index * 120;
    const y = 210 - ((value - 400) / 220) * 150;
    return `${x},${y}`;
  });

  return (
    <div className="pulse-detail-card pulse-detail-card--chart">
      <span className="pulse-section-label">{chart.title}</span>
      <svg className="pulse-trend-chart" viewBox="0 0 520 260" role="img" aria-label={chart.title}>
        <line x1="56" y1="34" x2="56" y2="218" className="chart-axis" />
        <line x1="56" y1="218" x2="488" y2="218" className="chart-axis" />
        {[58, 126, 194].map((y, index) => (
          <g key={chart.yAxis[index]}>
            <line x1="56" y1={y} x2="488" y2={y} className="chart-grid" />
            <text x="24" y={y + 4} className="chart-label">{chart.yAxis[index]}</text>
          </g>
        ))}
        <text x="70" y="126" className="chart-note">{chart.annotation}</text>
        <polyline points={coordinates.join(' ')} className="chart-line chart-line--solid" />
        {coordinates.map((point, index) => {
          const [x, y] = point.split(',');
          return <circle key={point} cx={x} cy={y} r="5" className="chart-point" data-index={index} />;
        })}
        <text x="430" y="46" className="chart-final-label">{chart.finalLabel}</text>
        {chart.xAxis.map((label, index) => (
          <text key={label} x={70 + index * 120} y="242" className="chart-label chart-label--x">
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DriverCard({ drivers }) {
  return (
    <div className="pulse-detail-card">
      <span className="pulse-section-label">Driver attribution</span>
      <div className="driver-list">
        {drivers.map((driver) => (
          <div key={driver.label} className="driver-item">
            <div className="driver-item__top">
              <span>{driver.label}</span>
              <span>{driver.value}%</span>
            </div>
            <div className="driver-item__track">
              <span
                className={`driver-item__bar driver-item__bar--${driver.tone}`}
                style={{ width: `${driver.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationPanel({ recommendation }) {
  return (
    <section className="pulse-recommendation">
      <Info size={18} />
      <div>
        <h2>{recommendation.title}</h2>
        <ol>
          {recommendation.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p>{recommendation.footer}</p>
      </div>
    </section>
  );
}

function EvidenceList({ evidence }) {
  const handleViewMore = () => {
    window.dispatchEvent(new CustomEvent('pulse:view-more-sources'));
  };

  return (
    <section className="pulse-detail-section">
      <span className="pulse-section-label">Evidence trail - 7 sources supporting this signal</span>
      <div className="evidence-list">
        {evidence.map((item) => (
          <div key={item.title} className="evidence-item">
            <FileText size={16} />
            <div>
              <span className="evidence-item__title">{item.title}</span>
              <span>{item.meta}</span>
            </div>
            <span className={`quality-chip quality-chip--${item.tone}`}>Quality {item.quality}</span>
            <ExternalLink size={14} />
          </div>
        ))}
      </div>
      <button type="button" className="pulse-text-button" onClick={handleViewMore}>View 4 more sources</button>
    </section>
  );
}

function RelatedSignals({ signals }) {
  return (
    <section className="pulse-detail-section">
      <span className="pulse-section-label">Related signals</span>
      <div className="related-grid">
        {signals.map((item) => (
          <div key={item.title} className="related-card">
            <span>{item.meta}</span>
            <span className="related-card__title">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function NextActions({ actions }) {
  return (
    <section className="pulse-detail-section pulse-detail-section--compact">
      <h2 className="pulse-next-title">Take this further</h2>
      <div className="pulse-next-actions">
        {actions.map((action) => (
          <ActionButton key={action} icon={getActionIcon(action)}>
            {action}
          </ActionButton>
        ))}
      </div>
    </section>
  );
}

function TakeActionPage({ signal, page }) {
  return (
    <div className="pulse-detail-page">
      <section className="pulse-detail-hero">
        <div>
          <div className="pulse-detail-hero__meta">
            <SignalBadge status={signal.status} />
            <span>{signal.topic}</span>
            <span>-</span>
            <span>{signal.region}</span>
            <span>-</span>
            <span>{page.eyebrow}</span>
            <span>-</span>
            <span>{page.meta}</span>
          </div>
          <h1>{signal.title}</h1>
          <p>{page.summary}</p>
        </div>
        <div className="pulse-detail-hero__actions">
          <ActionButton icon={Bookmark}>Pin signal</ActionButton>
          <ActionButton icon={Share2}>Share</ActionButton>
          <ActionButton tone="primary" icon={Download}>Export brief</ActionButton>
        </div>
      </section>

      <section className="pulse-detail-stats">
        {page.stats.map((stat) => <DetailStat key={stat.label} stat={stat} />)}
      </section>

      <section className="pulse-detail-grid">
        <TrendChart chart={page.chart} />
        <DriverCard drivers={page.drivers} />
      </section>

      <span className="pulse-section-label">What the evidence suggests</span>
      <RecommendationPanel recommendation={page.recommendation} />
      <EvidenceList evidence={page.evidence} />
      <RelatedSignals signals={page.relatedSignals} />
      <NextActions actions={page.nextActions} />
    </div>
  );
}

function ExposureItem({ item }) {
  return (
    <div className="exposure-item">
      <span className={`risk-chip risk-chip--${item.risk.toLowerCase()}`}>{item.risk}</span>
      <div>
        <span className="exposure-item__title">{item.title}</span>
        <span>{item.meta}</span>
      </div>
      <div className="exposure-item__impact">
        <span className="exposure-item__amount">{item.amount}</span>
        <span>{item.outcome}</span>
      </div>
    </div>
  );
}

function OutcomeChart({ projection }) {
  return (
    <div className="pulse-detail-card pulse-detail-card--large-chart">
      <span className="pulse-section-label">Outcome projection - with and without mitigation</span>
      <svg viewBox="0 0 980 310" className="outcome-chart" role="img" aria-label="Outcome projection">
        <line x1="54" y1="45" x2="54" y2="260" className="chart-axis" />
        <line x1="54" y1="260" x2="930" y2="260" className="chart-axis" />
        <text x="20" y="50" className="chart-label">10k</text>
        <text x="26" y="150" className="chart-label">5k</text>
        <text x="34" y="260" className="chart-label">0</text>
        <path d="M54 238 C250 190, 430 120, 900 56" className="chart-line chart-line--green" />
        <path d="M54 238 C260 198, 470 150, 900 90" className="chart-line chart-line--blue-dotted" />
        <path d="M54 238 C260 220, 520 190, 900 160" className="chart-line chart-line--red-dashed" />
        <circle cx="900" cy="56" r="6" className="chart-point chart-point--green" />
        <circle cx="900" cy="90" r="6" className="chart-point chart-point--blue" />
        <circle cx="900" cy="160" r="6" className="chart-point" />
        <text x="792" y="48" className="chart-final-label chart-final-label--green">{projection.labels[0]}</text>
        <text x="748" y="116" className="chart-final-label chart-final-label--blue">{projection.labels[1]}</text>
        <text x="786" y="188" className="chart-final-label">{projection.labels[2]}</text>
        {projection.xAxis.map((label, index) => (
          <text key={label} x={54 + index * 210} y="292" className="chart-label chart-label--x">
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function MitigationCard({ item }) {
  const preservedTone = item.preserved.startsWith('2,100') ? 'positive' : 'warning';

  return (
    <div className="mitigation-card">
      {item.badge && <span className="signal-badge signal-badge--opportunity">{item.badge}</span>}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <dl>
        <dt>Additional cost</dt>
        <dd>{item.cost}</dd>
        <dt>Outcomes preserved</dt>
        <dd className={`mitigation-card__value mitigation-card__value--${preservedTone}`}>{item.preserved}</dd>
        <dt>Cost per outcome</dt>
        <dd>{item.unitCost}</dd>
      </dl>
    </div>
  );
}

function ModelImpactPage({ page }) {
  return (
    <div className="pulse-detail-page">
      <section className="pulse-detail-hero">
        <div>
          <div className="pulse-detail-hero__meta">
            <span className="signal-badge signal-badge--critical">{page.eyebrow}</span>
            <span>Modeling impact on your active programs</span>
          </div>
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
        </div>
        <ActionButton tone="dark" icon={Download}>Export model</ActionButton>
      </section>

      <section className="pulse-detail-stats">
        {page.stats.map((stat) => <DetailStat key={stat.label} stat={stat} />)}
      </section>

      <section className="pulse-detail-section">
        <span className="pulse-section-label">Programs in the exposure zone</span>
        <div className="exposure-list">
          {page.exposure.map((item) => <ExposureItem key={item.title} item={item} />)}
        </div>
      </section>

      <OutcomeChart projection={page.projection} />

      <section className="pulse-detail-section">
        <span className="pulse-section-label">Three mitigation paths to consider</span>
        <div className="mitigation-grid">
          {page.mitigations.map((item) => <MitigationCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="pulse-recommendation pulse-recommendation--compact">
        <Info size={18} />
        <p>{page.note}</p>
      </section>

      <section className="pulse-committee">
        <h2>For your decision committee</h2>
        <p>The platform projects scenarios; your committee chooses the path. Export this model to support that conversation.</p>
        <div className="pulse-next-actions">
          {page.nextActions.map((action) => <ActionButton key={action} icon={getActionIcon(action)}>{action}</ActionButton>)}
        </div>
      </section>
    </div>
  );
}

function AllocationCard({ allocation, isNew = false }) {
  return (
    <div className="pulse-detail-card allocation-card">
      <div className="allocation-card__header">
        <span className="pulse-section-label">{allocation.title}</span>
        <span className="allocation-card__total">
          {allocation.total}
          {allocation.totalChange && <span>{allocation.totalChange}</span>}
        </span>
      </div>
      <span className="allocation-card__label">Projected lives impacted</span>
      <div className="allocation-card__rows">
        {allocation.rows.map((row) => (
          <div key={row.label} className="allocation-row">
            <div className="allocation-row__top">
              <span>{row.label}</span>
              <span>
                {row.amount} - {row.share}
                {row.delta && <em className={row.delta.startsWith('+') ? 'positive' : 'negative'}> {row.delta}</em>}
              </span>
            </div>
            <div className="allocation-row__track">
              <span className={`allocation-row__bar ${isNew ? 'allocation-row__bar--new' : ''}`} style={{ width: `${row.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompassRerunPage({ page }) {
  return (
    <div className="pulse-detail-page pulse-detail-page--compact">
      <section className="pulse-detail-hero">
        <div>
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
        </div>
        <div className="pulse-detail-hero__actions">
          <ActionButton icon={RotateCcw}>Allocation history</ActionButton>
          <ActionButton tone="dark" icon={Download}>Export comparison</ActionButton>
        </div>
      </section>

      <section className="pulse-recommendation pulse-recommendation--compact">
        <Info size={18} />
        <p>{page.insight}</p>
      </section>

      <section className="allocation-grid">
        <AllocationCard allocation={page.allocations[0]} />
        <AllocationCard allocation={page.allocations[1]} isNew />
      </section>

      <section className="change-card">
        <span className="pulse-section-label">What changed and why</span>
        {page.changes.map((change, index) => {
          const ChangeIcon = index === 0 ? ArrowUpRight : ArrowDownRight;
          return (
          <div key={change.title} className="change-item">
            <span className={`change-item__icon change-item__icon--${index === 0 ? 'up' : 'down'}`}>
              <ChangeIcon size={16} />
            </span>
            <div>
              <h2>{change.title}</h2>
              <p>{change.body}</p>
            </div>
          </div>
          );
        })}
      </section>

      <section className="pulse-detail-stats pulse-detail-stats--three">
        {page.stats.map((stat) => <DetailStat key={stat.label} stat={stat} />)}
      </section>

      <section className="pulse-committee">
        <h2>For your decision committee</h2>
        <p>This is intelligence, not an instruction. The platform recommends discussing this rebalance with your stakeholders before any external commitments.</p>
        <div className="pulse-next-actions">
          {page.nextActions.map((action) => <ActionButton key={action} icon={getActionIcon(action)}>{action}</ActionButton>)}
        </div>
      </section>
    </div>
  );
}

export default function PulseActionPage({ pageType }) {
  const { signalId } = useParams();
  const signal = getSignal(signalId);
  const page = pulseActionPages[signalId];

  if (!signal || !page || page.type !== pageType) {
    return <Navigate to="/pulse" replace />;
  }

  if (page.type === 'take-action') {
    return <TakeActionPage signal={signal} page={page} />;
  }

  if (page.type === 'model-impact') {
    return <ModelImpactPage page={page} />;
  }

  return <CompassRerunPage page={page} />;
}
