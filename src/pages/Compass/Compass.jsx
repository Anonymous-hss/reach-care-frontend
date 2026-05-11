import React from 'react';
import { 
  compassQuestion, 
  nationalStats, 
  recommendedAllocations, 
  allocationExplanation,
  compassChatData
} from '../../data/compassData';
import './Compass.css';

export default function Compass() {
  return (
    <div className="compass">
      {/* Header */}
      <div className="compass__header">
        <div className="compass__title-group">
          <h1 className="compass__title">Compass</h1>
          <p className="compass__subtitle">Strategic investment recommendations based on NACO 2025 and WHO UHC 2025 data</p>
        </div>
        <div className="compass__header-actions">
          <button className="compass__btn">History</button>
          <button className="compass__btn">Export brief</button>
        </div>
      </div>

      <div className="compass__main">
        {/* Left Column: Strategic Insights */}
        <div className="compass__content">
          
          {/* Question Card */}
          <div className="compass__question-card">
            <div className="compass__question-label">Question</div>
            <div className="compass__question-text">{compassQuestion}</div>
          </div>

          {/* National Stats Grid */}
          <div className="compass__stats">
            {nationalStats.map((stat) => (
              <div key={stat.id} className="compass__stat-card">
                <div className="compass__stat-label">{stat.label}</div>
                <div className="compass__stat-value">{stat.value}</div>
                <div className="compass__stat-subtext">{stat.subtext}</div>
              </div>
            ))}
          </div>

          {/* Recommended Allocation Section */}
          <div className="compass__allocation-section">
            <div className="compass__allocation-section-header">
              <h2 className="compass__allocation-section-title">Recommended allocation, ranked by impact</h2>
              <span className="compass__allocation-section-formula">Score = burden × cost-effectiveness × programme readiness</span>
            </div>

            <div className="compass__allocation-list">
              {recommendedAllocations.map((item) => (
                <div key={item.id} className="compass__allocation-item">
                  <div className="compass__allocation-top">
                    <div className="compass__allocation-rank">{item.id}</div>
                    <h3 className="compass__allocation-title">{item.title}</h3>
                    <span className="compass__allocation-tag">{item.tag}</span>
                    <span className="compass__allocation-amount">Allocation {item.allocation}</span>
                  </div>

                  <div className="compass__progress-container">
                    <div 
                      className="compass__progress-fill" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                  <div className="compass__allocation-grid">
                    <div className="compass__grid-col">
                      <span className="compass__grid-label">Impact score</span>
                      <span className="compass__grid-value">{item.impactScore}</span>
                    </div>
                    <div className="compass__grid-col">
                      <span className="compass__grid-label">{item.statLabel}</span>
                      <span className="compass__grid-value">{item.statValue}</span>
                    </div>
                    <div className="compass__grid-col">
                      <span className="compass__grid-label">{item.workforceLabel}</span>
                      <span className="compass__grid-value">{item.workforceValue}</span>
                    </div>
                    <div className="compass__grid-col">
                      <span className="compass__grid-label">{item.evidenceLabel}</span>
                      <span className="compass__grid-value compass__grid-value--link">{item.evidenceValue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation Banner */}
          <div className="compass__explanation">
            <span className="compass__explanation-text">
              {allocationExplanation}
            </span>
          </div>

          {/* Footer Actions */}
          <div className="compass__footer">
            <button className="compass__footer-btn">Refine in Studio</button>
            <button className="compass__footer-btn">View source reports</button>
            <button className="compass__footer-btn">Export board brief</button>
          </div>
        </div>

        {/* Right Column: Compass Chat */}
        <aside className="compass__chat">
          <div className="compass__chat-header">
            <h2 className="compass__chat-title">Compass chat</h2>
            <span className="compass__chat-subtitle">Refine this allocation</span>
          </div>
          
          <div className="compass__chat-content">
            <p className="compass__chat-welcome">{compassChatData.welcome}</p>
          </div>

          <div className="compass__chat-suggestions-area">
            <span className="compass__chat-suggestion-label">Try asking</span>
            {compassChatData.suggestedQuestions.map((q, i) => (
              <button key={i} className="compass__chat-suggestion-btn">
                {q}
              </button>
            ))}
          </div>

          <div className="compass__chat-footer">
            <div className="compass__chat-input-wrapper">
              <input type="text" className="compass__chat-input" placeholder="Ask about this allocation..." />
              <button className="compass__chat-send-btn">Ask</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
