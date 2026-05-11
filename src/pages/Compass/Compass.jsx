import { Compass as CompassIcon } from 'lucide-react';
import PlaceholderPage from '../PlaceholderPage';
import './Compass.css';

export default function Compass() {
  return (
    <div className="compass-page">
      <PlaceholderPage
        icon={CompassIcon}
        title="Compass"
        subtitle="Strategic investment recommendations"
      />
    </div>
  );
}
