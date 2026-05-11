import { useState, useEffect } from 'react';
import {
  MessageSquare,
  FileText,
  MessageCircle,
  Download,
  CheckCircle,
  Lightbulb,
  Target,
  Sparkles,
  CalendarDays,
} from 'lucide-react';
import { 
  PulseIcon, 
  CompassIcon, 
  StudioIcon, 
  AskIcon,
  IngestionIcon,
  ReasoningIcon,
  RecommendIcon,
  ValidationIcon
} from '../../components/common/HomeIcons';
import TopBar from '../../components/layout/TopBar';
import StatCard from '../../components/cards/StatCard';
import SummaryCard from '../../components/cards/SummaryCard';
import { fetchHomeData } from '../../services/api';
import {
  userProfile,
  suggestedAction,
  boardMeeting,
} from '../../data/homeData';
import './Home.css';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
}

const agentIcons = {
  ingestion_docs: IngestionIcon,
  validation_pass_pct: ValidationIcon,
  reasoning_insights: ReasoningIcon,
  recommendation_updates: RecommendIcon,
};

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const homeData = await fetchHomeData();
        setData(homeData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="home home--loading">
        <div className="home__loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home home--error">
        <div className="home__error-message">{error}</div>
      </div>
    );
  }

  const { kpis, pulse, compass, studio, ask, agent_activity } = data;

  // Map KPIs to StatCard format
  const stats = [
    { id: 'active_signals', label: 'Active signals', value: kpis.active_signals.formatted, trend: { value: `${kpis.active_signals.delta_pct}%`, direction: kpis.active_signals.delta_direction, label: kpis.active_signals.comparison_label } },
    { id: 'budget_review', label: 'Budget under review', value: kpis.budget_under_review.formatted, trend: { value: `${kpis.budget_under_review.delta_pct}%`, direction: kpis.budget_under_review.delta_direction, label: kpis.budget_under_review.comparison_label } },
    { id: 'lives_projected', label: 'Lives projected', value: kpis.lives_projected.formatted, trend: { value: `${kpis.lives_projected.delta_pct}%`, direction: kpis.lives_projected.delta_direction, label: kpis.lives_projected.comparison_label } },
    { id: 'sources_monitored', label: 'Sources monitored', value: kpis.sources_monitored.formatted, trend: { value: `${kpis.sources_monitored.delta_pct}%`, direction: kpis.sources_monitored.delta_direction, label: kpis.sources_monitored.comparison_label } },
  ];

  // Map Agent Activity
  const agents = [
    { id: 'ingestion_docs', label: 'Ingestion docs', value: agent_activity.ingestion_docs.value, iconKey: 'ingestion_docs' },
    { id: 'validation_pass_pct', label: 'Validation pass', value: `${agent_activity.validation_pass_pct.value}%`, iconKey: 'validation_pass_pct' },
    { id: 'reasoning_insights', label: 'Reasoning insights', value: agent_activity.reasoning_insights.value, iconKey: 'reasoning_insights' },
    { id: 'recommendation_updates', label: 'Rec. updates', value: agent_activity.recommendation_updates.value, iconKey: 'recommendation_updates' },
  ];

  // Top Recommendation for Compass Card
  const topRecommendation = compass[0] || {};

  return (
    <div className="home">
      {/* Header with Search */}
      <div className="home__header">
        <div className="home__greeting">
          <span className="home__date">{getFormattedDate()}</span>
          <h1 className="home__title">{getGreeting()}, {userProfile.name}</h1>
          <p className="home__subtitle">
            {kpis.active_signals.value} critical signals from your focus markets need attention
          </p>
        </div>
        <TopBar />
      </div>

      {/* Stats Row */}
      <div className="home__stats">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Summary Cards Grid */}
      <div className="home__cards">
        {/* Pulse Card */}
        <SummaryCard
          icon={<PulseIcon />}
          iconVariant="none"
          title="Pulse"
          subtitle="Live signal feed"
        >
          <div className="summary-card__list">
            {pulse.map((signal) => (
              <div key={signal.signal_id} className="summary-card__list-item">
                <span className={`summary-card__list-dot summary-card__list-dot--${signal.severity}`} />
                <span className="summary-card__list-text">{signal.headline}</span>
                <span className="summary-card__list-meta">{signal.time_ago}</span>
              </div>
            ))}
          </div>
        </SummaryCard>

        {/* Compass Card */}
        <SummaryCard
          icon={<CompassIcon />}
          iconVariant="none"
          title="Compass"
          subtitle="Top recommendation"
        >
          <div className="summary-card__compass-content">
            <div className="summary-card__compass-header">
              <span className="summary-card__compass-region">
                {topRecommendation.region_label}
              </span>
              <span className="summary-card__compass-allocation">
                ${(topRecommendation.suggested_investment_usd / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="summary-card__compass-progress">
              <div
                className="summary-card__compass-progress-bar"
                style={{ width: `${topRecommendation.score}%` }}
              />
            </div>
            <div className="summary-card__compass-stats">
              <span>Score {topRecommendation.score}</span>
              <span>{topRecommendation.lives_per_million_usd.toLocaleString()} lives/$M</span>
              <span>{topRecommendation.sources_count} sources</span>
            </div>
          </div>
        </SummaryCard>

        {/* Studio Card */}
        <SummaryCard
          icon={<StudioIcon />}
          iconVariant="none"
          title="Studio"
          subtitle="Active scenarios"
        >
          <div className="summary-card__list">
            {studio.map((scenario) => (
              <div key={scenario.id} className="summary-card__list-item">
                <FileText size={16} className="summary-card__list-icon" />
                <span className="summary-card__list-text">{scenario.name}</span>
                <span className={`summary-card__list-change summary-card__list-change--${scenario.direction}`}>
                  {scenario.projected_score_delta_pct > 0 ? '+' : ''}
                  {(scenario.projected_score_delta_pct * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </SummaryCard>

        {/* Ask Card */}
        <SummaryCard
          icon={<AskIcon />}
          iconVariant="none"
          title="Ask"
          subtitle="Recent conversations"
        >
          <div className="summary-card__list">
            {ask.map((conv, idx) => (
              <div key={idx} className="summary-card__list-item">
                <MessageCircle size={16} className="summary-card__list-icon" />
                <span className="summary-card__list-text">{conv.prompt}</span>
                <span className="summary-card__list-meta">{conv.category}</span>
              </div>
            ))}
          </div>
        </SummaryCard>
      </div>

      {/* Agent Activity */}
      <div className="home__agent-activity">
        <div className="home__agent-header">
          <span className="home__agent-title">Agent activity</span>
          <span className="home__agent-period">Last 24 hours</span>
        </div>
        <div className="home__agent-grid">
          {agents.map((agent) => {
            const Icon = agentIcons[agent.iconKey] || Target;
            return (
              <div key={agent.id} className="home__agent-item">
                <div className="home__agent-icon-wrapper">
                  <Icon />
                </div>
                <div className="home__agent-info">
                  <span className="home__agent-label">{agent.label}</span>
                  <span className="home__agent-value">{agent.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Banners (Commented out by user) */}
      {/* <div className="home__banners">
        ...
      </div> */}
    </div>
  );
}
