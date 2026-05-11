import { Layers } from 'lucide-react';
import PlaceholderPage from '../PlaceholderPage';
import './Studio.css';

export default function Studio() {
  return (
    <div className="studio-page">
      <PlaceholderPage
        icon={Layers}
        title="Studio"
        subtitle="Scenario modeling and simulation"
      />
    </div>
  );
}
