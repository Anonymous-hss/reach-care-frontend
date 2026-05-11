import { Construction } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import './PlaceholderPage.css';

export default function PlaceholderPage({ icon: Icon, title, subtitle }) {
  return (
    <div className="placeholder-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="placeholder-page__header">
          <div className="placeholder-page__icon">
            <Icon size={20} />
          </div>
          <div>
            <h1 className="placeholder-page__title">{title}</h1>
            {subtitle && <p className="placeholder-page__subtitle">{subtitle}</p>}
          </div>
        </div>
        <TopBar />
      </div>
      <div className="placeholder-page__card">
        <div className="placeholder-page__card-icon">
          <Construction size={24} />
        </div>
        <p className="placeholder-page__card-text">
          This page is coming soon. It will be built following the Figma design specifications.
        </p>
      </div>
    </div>
  );
}
