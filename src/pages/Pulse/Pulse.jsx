import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Bell, Search } from 'lucide-react';
import { FilterPill, MetricTile, SignalItem } from '../../components/pulse';
import { pulseData } from '../../data/pulseData';
import './Pulse.css';

function signalMatchesFilter(signal, filter) {
  if (!filter || filter.id === 'all') return true;
  if (filter.status) return signal.status === filter.status;
  if (filter.topic) return signal.topic === filter.topic;
  if (filter.region) return signal.region === filter.region;
  return true;
}

function signalMatchesSearch(signal, searchTerm) {
  const query = searchTerm.trim().toLowerCase();
  if (!query) return true;

  return [
    signal.status,
    signal.topic,
    signal.region,
    signal.title,
    signal.summary,
    ...signal.sources,
  ]
    .join(' ')
    .toLowerCase()
    .includes(query);
}

export default function Pulse() {
  const navigate = useNavigate();
  const [activeFilterId, setActiveFilterId] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activeFilter = pulseData.filters.find((filter) => filter.id === activeFilterId);

  const visibleSignals = useMemo(
    () =>
      pulseData.signals.filter(
        (signal) =>
          signalMatchesFilter(signal, activeFilter) &&
          signalMatchesSearch(signal, searchTerm),
      ),
    [activeFilter, searchTerm],
  );

  const handleSignalAction = (signal) => {
    if (signal.action?.path) {
      navigate(signal.action.path);
      return;
    }

    window.dispatchEvent(
      new CustomEvent('pulse:signal-action', {
        detail: {
          signalId: signal.id,
          actionId: signal.action?.id,
        },
      }),
    );
  };

  return (
    <div className="pulse-page">
      <header className="pulse-page__header">
        <div className="pulse-page__title-group">
          <div className="pulse-page__icon">
            <Activity size={18} />
          </div>
          <div>
            <div className="pulse-page__title-row">
              <h1 className="pulse-page__title">{pulseData.header.title}</h1>
              <span className="pulse-page__agent-status">
                <span className="pulse-page__status-dot" />
                {pulseData.header.agentStatus}
              </span>
            </div>
            <p className="pulse-page__subtitle">{pulseData.header.subtitle}</p>
          </div>
        </div>

        <div className="pulse-page__tools">
          <label className="pulse-page__search">
            <Search size={15} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              aria-label="Search pulse signals"
            />
          </label>
          <button type="button" className="pulse-page__notification" aria-label="Notifications">
            <Bell size={17} />
          </button>
        </div>
      </header>

      <section className="pulse-board" aria-labelledby="pulse-feed-title">
        <div className="pulse-board__filters" aria-label="Signal filters">
          {pulseData.filters.map((filter) => (
            <FilterPill
              key={filter.id}
              label={filter.label}
              isActive={filter.id === activeFilterId}
              onClick={() => setActiveFilterId(filter.id)}
            />
          ))}
        </div>

        <div className="pulse-board__metrics">
          {pulseData.metrics.map((metric) => (
            <MetricTile
              key={metric.id}
              label={metric.label}
              value={metric.value}
              tone={metric.tone}
            />
          ))}
        </div>

        <div className="pulse-board__feed-header">
          <h2 id="pulse-feed-title" className="pulse-board__feed-title">
            {pulseData.feedTitle}
          </h2>
          <span className="pulse-board__sort-label">{pulseData.sortLabel}</span>
        </div>

        <div className="pulse-board__signals">
          {visibleSignals.map((signal) => (
            <SignalItem
              key={signal.id}
              signal={signal}
              onAction={handleSignalAction}
            />
          ))}

          {visibleSignals.length === 0 && (
            <div className="pulse-board__empty">
              No signals match this filter yet.
            </div>
          )}
        </div>

        <footer className="pulse-board__archive">
          <span>{pulseData.archiveSummary}</span>
          <button type="button">{pulseData.archiveAction}</button>
        </footer>
      </section>
    </div>
  );
}
