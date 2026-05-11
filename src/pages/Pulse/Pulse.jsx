import { Activity } from 'lucide-react';
import PlaceholderPage from '../PlaceholderPage';
import './Pulse.css';

export default function Pulse() {
  return (
    <div className="pulse-page">
      <PlaceholderPage
        icon={Activity}
        title="Pulse"
        subtitle="Live signals across your focus markets"
      />
    </div>
  );
}
