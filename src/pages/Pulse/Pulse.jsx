import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Bell, Search, ChevronDown } from 'lucide-react';
import { FilterPill, MetricTile, SignalItem } from '../../components/pulse';
import { fetchPulseData } from '../../services/api';
import './Pulse.css';

export default function Pulse() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [pulses, setPulses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  const [activeFilters, setActiveFilters] = useState({
    country: 'all',
    category: 'all',
    severity: 'all'
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const result = await fetchPulseData(LIMIT, 0);
        setData(result);
        setPulses(result.pulses);
        setError(null);
      } catch (err) {
        setError('Failed to load pulse data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const loadMore = async () => {
    if (loadingMore) return;
    try {
      setLoadingMore(true);
      const nextOffset = offset + LIMIT;
      const result = await fetchPulseData(LIMIT, nextOffset);
      setPulses(prev => [...prev, ...result.pulses]);
      setOffset(nextOffset);
    } catch (err) {
      console.error('Failed to load more pulses:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSignalAction = (signal) => {
    // Navigate to action page with signal ID
    navigate(`/pulse/signals/${signal.signal_id}/action`);
  };

  const filteredPulses = useMemo(() => {
    return pulses.filter(p => {
      const matchesSearch = !searchTerm ||
        p.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry = activeFilters.country === 'all' || p.country === activeFilters.country;
      const matchesCategory = activeFilters.category === 'all' || p.category === activeFilters.category;
      const matchesSeverity = activeFilters.severity === 'all' || p.severity === activeFilters.severity;

      return matchesSearch && matchesCountry && matchesCategory && matchesSeverity;
    });
  }, [pulses, searchTerm, activeFilters]);

  if (loading) {
    return <div className="pulse-page pulse-page--loading">Loading pulse feed...</div>;
  }

  if (error) {
    return <div className="pulse-page pulse-page--error">{error}</div>;
  }

  const { kpis, filters_available, pagination } = data;

  const metrics = [
    { id: 'new', label: 'New signals today', value: kpis.new_signals_today.formatted, tone: kpis.new_signals_today.delta_direction === 'up' ? 'positive' : 'neutral' },
    { id: 'critical', label: 'Critical alerts', value: kpis.critical_alerts.formatted, tone: 'critical' },
    { id: 'monitored', label: 'Sources monitored', value: kpis.sources_monitored.formatted, tone: 'neutral' },
    { id: 'ingested', label: 'Auto-ingested', value: kpis.reports_auto_ingested.formatted, tone: 'neutral' },
  ];

  const hasMore = pulses.length < pagination.total;

  return (
    <div className="pulse-page">
      <header className="pulse-page__header">
        <div className="pulse-page__title-group">
          <div className="pulse-page__icon">
            <Activity size={18} />
          </div>
          <div>
            <div className="pulse-page__title-row">
              <h1 className="pulse-page__title">Pulse</h1>
              <span className="pulse-page__agent-status">
                <span className="pulse-page__status-dot" />
                Agents Active
              </span>
            </div>
            <p className="pulse-page__subtitle">Real-time health strategy signals and equity alerts</p>
          </div>
        </div>

        <div className="pulse-page__tools">
          <label className="pulse-page__search">
            <Search size={15} />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search signals..."
            />
          </label>
          {/* <button type="button" className="pulse-page__notification">
            <Bell size={17} />
          </button> */}
        </div>
      </header>

      <section className="pulse-board">
        <div className="pulse-board__filters">
          <FilterPill
            label="All Regions"
            isActive={activeFilters.country === 'all'}
            onClick={() => setActiveFilters(prev => ({ ...prev, country: 'all' }))}
          />
          {filters_available.countries.map(c => (
            <FilterPill
              key={c}
              label={c}
              isActive={activeFilters.country === c}
              onClick={() => setActiveFilters(prev => ({ ...prev, country: c }))}
            />
          ))}
        </div>

        <div className="pulse-board__metrics">
          {metrics.map((metric) => (
            <MetricTile
              key={metric.id}
              label={metric.label}
              value={metric.value}
              tone={metric.tone}
            />
          ))}
        </div>

        <div className="pulse-board__feed-header">
          <h2 className="pulse-board__feed-title">
            Live Signal Feed ({pagination.total})
          </h2>
          <span className="pulse-board__sort-label">Sorted by Recency</span>
        </div>

        <div className="pulse-board__signals">
          {filteredPulses.map((p) => (
            <SignalItem
              key={p.signal_id}
              signal={{
                id: p.signal_id,
                status: p.category,
                topic: p.program_type.replace('_', ' '),
                region: `${p.state}, ${p.country}`,
                timeAgo: p.time_ago,
                relevance: p.severity.toUpperCase(),
                title: p.headline,
                summary: p.description,
                sources: p.source_tags.map(s => s.label),
                action: { label: 'Take Action', id: 'action' }
              }}
              onAction={() => handleSignalAction(p)}
            />
          ))}

          {filteredPulses.length === 0 && (
            <div className="pulse-board__empty">No signals found matching your search.</div>
          )}

          {hasMore && (
            <div className="pulse-board__load-more">
              <button
                className="pulse-board__load-more-btn"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'View more signals'}
                {!loadingMore && <ChevronDown size={16} />}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
