import {
  Activity,
  Compass,
  Layers,
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
import { StudioIcon } from '../../components/common/Icons';
import TopBar from '../../components/layout/TopBar';
import StatCard from '../../components/cards/StatCard';
import SummaryCard from '../../components/cards/SummaryCard';
import {
  userProfile,
  greetingStats,
  trendStats,
  pulseSignals,
  compassRecommendation,
  studioScenarios,
  askConversations,
  agentActivity,
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
  download: Download,
  'check-circle': CheckCircle,
  lightbulb: Lightbulb,
  target: Target,
};

export default function Home() {
  return (
    <div className="home">
      {/* Header with Search */}
      <div className="home__header">
        <div className="home__greeting">
          <span className="home__date">{getFormattedDate()}</span>
          <h1 className="home__title">{getGreeting()}, {userProfile.name}</h1>
          <p className="home__subtitle">
            4 critical signals from your focus markets need attention
          </p>
        </div>
        <TopBar />
      </div>

      {/* Stats Row */}
      <div className="home__stats">
        {greetingStats.map((stat) => {
          const trend = trendStats.find((t) => t.cardId === stat.id);
          return (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              trend={trend}
            />
          );
        })}
      </div>

      {/* Summary Cards Grid */}
      <div className="home__cards">
        {/* Pulse Card */}
        <SummaryCard
          icon={<Activity size={18} />}
          iconVariant="pulse"
          title="Pulse"
          subtitle="Live signal feed"
        >
          <div className="summary-card__list">
            {pulseSignals.map((signal) => (
              <div key={signal.id} className="summary-card__list-item">
                <span className={`summary-card__list-dot summary-card__list-dot--${signal.severity}`} />
                <span className="summary-card__list-text">{signal.text}</span>
                <span className="summary-card__list-meta">{signal.time}</span>
              </div>
            ))}
          </div>
        </SummaryCard>

        {/* Compass Card */}
        <SummaryCard
          icon={<Compass size={18} />}
          iconVariant="compass"
          title="Compass"
          subtitle="Top recommendation"
        >
          <div className="summary-card__compass-content">
            <div className="summary-card__compass-header">
              <span className="summary-card__compass-region">
                {compassRecommendation.region}
              </span>
              <span className="summary-card__compass-allocation">
                {compassRecommendation.allocation}
              </span>
            </div>
            <div className="summary-card__compass-progress">
              <div
                className="summary-card__compass-progress-bar"
                style={{ width: `${compassRecommendation.progressPercent}%` }}
              />
            </div>
            <div className="summary-card__compass-stats">
              <span>Score {compassRecommendation.score}</span>
              <span>{compassRecommendation.lives}</span>
              <span>{compassRecommendation.sources}</span>
            </div>
          </div>
        </SummaryCard>

        {/* Studio Card */}
        <SummaryCard
          icon={<StudioIcon size={18} color="white" />}
          iconVariant="studio"
          title="Studio"
          subtitle="Active scenarios"
        >
          <div className="summary-card__list">
            {studioScenarios.map((scenario) => (
              <div key={scenario.id} className="summary-card__list-item">
                <FileText size={16} className="summary-card__list-icon" />
                <span className="summary-card__list-text">{scenario.name}</span>
                <span className={`summary-card__list-change summary-card__list-change--${scenario.trend}`}>
                  {scenario.change}
                </span>
              </div>
            ))}
          </div>
        </SummaryCard>

        {/* Ask Card */}
        <SummaryCard
          icon={<MessageSquare size={18} />}
          iconVariant="ask"
          title="Ask"
          subtitle="Recent conversations"
        >
          <div className="summary-card__list">
            {askConversations.map((conv) => (
              <div key={conv.id} className="summary-card__list-item">
                <MessageCircle size={16} className="summary-card__list-icon" />
                <span className="summary-card__list-text">{conv.text}</span>
                <span className="summary-card__list-meta">{conv.time}</span>
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
          {agentActivity.map((agent) => {
            const Icon = agentIcons[agent.icon] || Target;
            return (
              <div key={agent.id} className="home__agent-item">
                <div className={`home__agent-icon home__agent-icon--${agent.id}`}>
                  <Icon size={18} />
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

      {/* Bottom Banners */}
      <div className="home__banners">
        <div className="home__action-banner">
          <Sparkles size={18} className="home__action-banner-icon" />
          <p className="home__action-banner-text">
            <strong>Suggested action</strong> — {suggestedAction.text}
          </p>
        </div>
        <div className="home__info-banner">
          <CalendarDays size={18} className="home__info-banner-icon" />
          <div className="home__info-banner-content">
            <span className="home__info-banner-title">{boardMeeting.text}</span>
            <span className="home__info-banner-detail">
              {boardMeeting.detail}{' '}
              <a href="/briefs" className="home__info-banner-link">{boardMeeting.link}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
