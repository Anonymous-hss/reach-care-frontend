import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  ExternalLink,
  FileText,
  Info,
  Pin,
  RotateCcw,
  Share2,
  SlidersHorizontal,
  MessageSquare,
} from 'lucide-react';
import SignalBadge from '../../components/pulse/SignalBadge';
import { fetchSignalDetail, fetchSignalReport } from '../../services/api';
import './PulseActionPage.css';

// --- Utility Functions ---

function downloadBase64Pdf(base64, filename) {
  const link = document.createElement('a');
  link.href = `data:application/pdf;base64,${base64}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

// --- Components ---

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

function TrendChart({ chart, category }) {
  if (!chart || !chart.points || chart.points.length === 0) return null;

  const values = chart.points.map(p => p.value);
  const minVal = Math.min(...values) * 0.9;
  const maxVal = Math.max(...values) * 1.1;
  const range = maxVal - minVal || 1;

  const coordinates = chart.points.map((p, index) => {
    const x = 70 + index * 100;
    const y = 210 - ((p.value - minVal) / range) * 150;
    return `${x},${y}`;
  });

  const chartColorClass = `chart-line--${category.toLowerCase()}`;

  return (
    <div className="pulse-detail-card pulse-detail-card--chart">
      <span className="pulse-section-label">{chart.title}</span>
      <svg className="pulse-trend-chart" viewBox="0 0 520 260" role="img" aria-label={chart.title}>
        <line x1="56" y1="34" x2="56" y2="218" className="chart-axis" />
        <line x1="56" y1="218" x2="488" y2="218" className="chart-axis" />
        <polyline points={coordinates.join(' ')} className={`chart-line ${chartColorClass}`} />
        {coordinates.map((point, index) => {
          const [x, y] = point.split(',');
          return <circle key={index} cx={x} cy={y} r="5" className={`chart-point ${chartColorClass}`} />;
        })}
        {chart.points.map((p, index) => (
          <text key={index} x={70 + index * 100} y="242" className="chart-label chart-label--x">
            {p.period}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DriverCard({ drivers }) {
  if (!drivers) return null;
  return (
    <div className="pulse-detail-card">
      <span className="pulse-section-label">Driver attribution</span>
      <div className="driver-list">
        {drivers.map((driver, idx) => (
          <div key={idx} className="driver-item">
            <div className="driver-item__top">
              <span>{driver.factor}</span>
              <span>{driver.pct}%</span>
            </div>
            <div className="driver-item__track">
              <span
                className="driver-item__bar"
                style={{ 
                  width: `${driver.pct}%`, 
                  backgroundColor: idx === 0 ? 'var(--color-signal-critical)' : 'var(--color-accent-blue)' 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationPanel({ recommendations }) {
  return (
    <section className="pulse-recommendation">
      <Info size={18} />
      <div>
        <h2>What the evidence suggests</h2>
        <ol>
          {recommendations.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function EvidenceList({ evidence }) {
  return (
    <section className="pulse-detail-section">
      <span className="pulse-section-label">Evidence trail - {evidence.length} sources supporting this signal</span>
      <div className="evidence-list">
        {evidence.map((item) => (
          <div key={item.id} className="evidence-item">
            <FileText size={16} />
            <div>
              <span className="evidence-item__title">{item.display_tag}</span>
              <span>{item.name}</span>
            </div>
            <span className={`quality-chip quality-chip--${item.quality === 'high' ? 'positive' : 'neutral'}`}>
              Quality {item.quality}
            </span>
            <ExternalLink size={14} />
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedSignals({ signals }) {
  return (
    <section className="pulse-detail-section">
      <span className="pulse-section-label">Related signals</span>
      <div className="related-grid">
        {signals.map((item) => (
          <div key={item.signal_id} className="related-card">
            <span>{item.country} • {item.time_ago}</span>
            <span className="related-card__title">{item.headline}</span>
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

// --- Page Layouts ---

function TakeActionPage({ signalData }) {
  const navigate = useNavigate();
  const stats = signalData.kpis.map(k => ({
    label: k.label,
    value: k.formatted,
    tone: k.delta_direction === 'up' ? 'critical' : 'neutral'
  }));

  const nextActions = [
    'Re-run Compass with this signal',
    'Model responses in Studio',
    'Investigate further in Ask',
    'Export committee brief',
  ];

  const handleExportBrief = async () => {
    try {
      const report = await fetchSignalReport(signalData.signal_id);
      downloadBase64Pdf(report.content_base64, report.filename);
    } catch (error) {
      console.error('Failed to export brief:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  return (
    <div className="pulse-detail-page">
      <section className="pulse-detail-hero">
        <div>
          <div className="pulse-detail-hero__meta">
            <SignalBadge status={signalData.category} />
            <span className="pulse-detail-hero__topic">{signalData.program_type}</span>
            <span>-</span>
            <span>{signalData.state}, {signalData.country}</span>
            <span>-</span>
            <span>Detected {signalData.time_ago}</span>
            <span>-</span>
            <span>Relevance {signalData.relevance_score}%</span>
          </div>
          <h1>{signalData.headline}</h1>
          <p>{signalData.description}</p>
        </div>
        <div className="pulse-detail-hero__actions">
          <ActionButton icon={Pin}>Pin signal</ActionButton>
          <ActionButton icon={Share2}>Share</ActionButton>
          <ActionButton tone="primary" icon={Download} onClick={handleExportBrief}>Export brief</ActionButton>
        </div>
      </section>

      <section className="pulse-detail-stats">
        {stats.map((stat, idx) => <DetailStat key={idx} stat={stat} />)}
      </section>

      <section className="pulse-detail-grid">
        <TrendChart 
          category={signalData.category}
          chart={{ 
            title: `Trend - ${signalData.yearly_trend.metric.replace(/_/g, ' ')}`,
            points: signalData.yearly_trend.points 
          }} 
        />
        <DriverCard drivers={signalData.driver_attribution} />
      </section>

      <RecommendationPanel recommendations={signalData.what_evidence_suggests} />
      <EvidenceList evidence={signalData.evidence_trail} />
      <RelatedSignals signals={signalData.related_signals} />
      <NextActions actions={nextActions} />
    </div>
  );
}

// --- Main Component ---

export default function PulseActionPage() {
  const { signalId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        setLoading(true);
        const result = await fetchSignalDetail(signalId);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load signal details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [signalId]);

  if (loading) return <div className="pulse-detail-page">Loading details...</div>;
  if (error) return <div className="pulse-detail-page">{error}</div>;
  if (!data) return <Navigate to="/pulse" replace />;

  return <TakeActionPage signalData={data} />;
}
