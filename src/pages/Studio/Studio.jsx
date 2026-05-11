import React, { useState } from 'react';
import { 
  studioBudget, 
  regionalAllocations as initialRegions, 
  workforceMix as initialWorkforce,
  projectedOutcomes,
  studioObservation,
  studioSuggestedQuestions
} from '../../data/studioData';
import './Studio.css';

export default function Studio() {
  const [budget, setBudget] = useState(studioBudget.currentValue);
  const [regions, setRegions] = useState(initialRegions);
  const [workforce, setWorkforce] = useState(initialWorkforce.percent);

  // Helper to calculate slider progress gradient
  const getSliderStyle = (value, max = 100) => ({
    background: `linear-gradient(to right, #EB1700 0%, #EB1700 ${(value / max) * 100}%, #EAEAEA ${(value / max) * 100}%, #EAEAEA 100%)`
  });

  const handleRegionChange = (id, newPercent) => {
    setRegions(prev => prev.map(r => 
      r.id === id ? { ...r, percent: newPercent, amount: `$${(budget * (newPercent / 100)).toFixed(1)}M` } : r
    ));
  };

  return (
    <div className="studio">
      {/* Header */}
      <div className="studio__header">
        <div className="studio__title-group">
          <h1 className="studio__title">Studio</h1>
          <p className="studio__subtitle">Test alternative allocations against the Compass baseline · India HIV portfolio 2026</p>
        </div>
        <div className="studio__header-actions">
          <button className="studio__btn">Reset to Compass</button>
          <button className="studio__btn">Save scenario</button>
        </div>
      </div>

      <div className="studio__main">
        {/* Left Column: Modeling Area */}
        <div className="studio__modeling">
          
          {/* Total Budget Card */}
          <div className="studio__card">
            <div className="studio__allocation-info">
              <span className="studio__allocation-label">Total budget</span>
              <span className="studio__allocation-value">${budget.toFixed(1)}M</span>
            </div>
            <input 
              type="range" 
              className="studio__slider"
              min="0"
              max={studioBudget.max}
              step="0.1"
              value={budget}
              style={getSliderStyle(budget, studioBudget.max)}
              onChange={(e) => setBudget(parseFloat(e.target.value))}
            />
          </div>

          {/* Regional Allocation Card */}
          <div className="studio__card">
            <div className="studio__section-header">
              <h2 className="studio__section-title">Regional allocation</h2>
              <span className="studio__drag-hint">Drag to redistribute</span>
            </div>
            <div className="studio__allocation-list">
              {regions.map((reg) => (
                <div key={reg.id} className="studio__allocation-row">
                  <div className="studio__allocation-info">
                    <span className="studio__allocation-label">{reg.label}</span>
                    <span className="studio__allocation-value">{reg.amount} · {reg.percent}%</span>
                  </div>
                  <input 
                    type="range" 
                    className="studio__slider"
                    min="0"
                    max="100"
                    value={reg.percent}
                    style={getSliderStyle(reg.percent)}
                    onChange={(e) => handleRegionChange(reg.id, parseInt(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Workforce Mix Card */}
          <div className="studio__card">
            <h2 className="studio__section-title" style={{ marginBottom: '16px' }}>Workforce mix</h2>
            <div className="studio__allocation-info">
              <span className="studio__allocation-label">Community health workers / ASHA</span>
              <span className="studio__allocation-value">{workforce}%</span>
            </div>
            <input 
              type="range" 
              className="studio__slider"
              min="0"
              max="100"
              value={workforce}
              style={getSliderStyle(workforce)}
              onChange={(e) => setWorkforce(parseInt(e.target.value))}
            />
            <p className="studio__workforce-desc">{initialWorkforce.description}</p>
          </div>

          {/* Projected Outcomes */}
          <div className="studio__outcomes-group">
            <h2 className="studio__section-title" style={{ marginBottom: '16px' }}>Projected outcomes vs Compass baseline</h2>
            <div className="studio__outcomes">
              {projectedOutcomes.map((out) => (
                <div key={out.id} className="studio__outcome-card">
                  <div className="studio__outcome-header">
                    <span>{out.label}</span>
                    <span>—</span>
                  </div>
                  <span className="studio__outcome-value">{out.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Observation Banner */}
          <div className="studio__observation">
            <strong>Studio observation</strong> {studioObservation.text}
          </div>
        </div>

        {/* Right Column: Studio Chat */}
        <aside className="studio__chat">
          <div className="studio__chat-header">
            <h2 className="studio__chat-title">Studio chat</h2>
            <span className="studio__chat-subtitle">Ask about scenarios</span>
          </div>
          
          <div className="studio__chat-content">
            <p className="studio__chat-welcome">
              I watch your sliders as you move them. Ask me what's happening when an outcome changes, or to suggest an alternative weighting based on the data.
            </p>
          </div>

          <div className="studio__chat-suggestions-area">
            <span className="studio__chat-suggestion-label">Try asking</span>
            {studioSuggestedQuestions.map((q, i) => (
              <button key={i} className="studio__chat-suggestion-btn">
                {q}
              </button>
            ))}
          </div>

          <div className="studio__chat-footer">
            <div className="studio__chat-input-wrapper">
              <input type="text" className="studio__chat-input" placeholder="Ask about this scenario..." />
              <button className="studio__chat-send-btn">Ask</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
