import { MessageSquare } from 'lucide-react';
import PlaceholderPage from '../PlaceholderPage';
import './Ask.css';

export default function Ask() {
  return (
    <div className="ask-page">
      <PlaceholderPage
        icon={MessageSquare}
        title="Ask Chatbot"
        subtitle="Conversational insights"
      />
    </div>
  );
}
