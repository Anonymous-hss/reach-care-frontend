import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './Ask.css';

export const suggestedQuestions = [
  'Why is Mizoram the highest HIV prevalence state?',
  'What\'s driving the rise in Arunachal and Tripura?',
  'India vs global UHC benchmarks',
  'How to get vertical transmission below 5%?',
  'CHW vs nurse for maternal HIV',
  'Which districts are highest priority?',
];

export default function Ask() {
  const [input, setInput] = useState('');

  return (
    <div className="ask-new">
      {/* Top Header */}
      <div className="ask-new__header">
        <div className="ask-new__title-group">
          <h1 className="ask-new__title">Ask</h1>
          <p className="ask-new__subtitle">
            Conversation grounded in NACO 2025 and WHO UHC 2025 reports · 187 sources indexed
          </p>
        </div>
        <div className="ask-new__header-actions">
          <button className="ask-new__btn ask-new__btn--pinned">Pinned</button>
          <button className="ask-new__btn ask-new__btn--share">Share</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ask-new__content">
        <div className="ask-new__welcome">
          <p>Hi Priya — ask me anything about your focus markets. I'll cite NACO India HIV 2025 and WHO UHC 2025 inline.</p>
          <p>Try the suggested questions below or type your own.</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="ask-new__footer">
        <div className="ask-new__input-wrapper">
          <input 
            type="text" 
            className="ask-new__input" 
            placeholder="Ask about HIV epidemiology, EVTH, UHC indicators, workforce strategy.." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="ask-new__send-btn">Ask</button>
        </div>

        {/* Suggested Questions Grid */}
        <div className="ask-new__suggestions">
          <h3 className="ask-new__suggestions-label">Suggested questions</h3>
          <div className="ask-new__suggestions-grid">
            {suggestedQuestions.map((q, i) => (
              <button key={i} className="ask-new__suggestion-pill">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
