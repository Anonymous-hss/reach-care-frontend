import React from "react";
import "./CaseStudy.css";
import mapPreview from "../../../../assets/Map Preview Area.png";

export default function CaseStudy() {
  return (
    <section className="cs-section">
      <div className="cs-container">
        {/* ══════════════════════════════════
            LEFT  –  Map image (badge included in image)
        ══════════════════════════════════ */}
        <div className="cs-map">
          {/* Replace src with your actual map image path */}
          <img
            className="cs-map-img"
            src={mapPreview}
            alt="Africa map – Tanzania highlighted"
          />
        </div>

        {/* ══════════════════════════════════
            RIGHT  –  Case study panel
        ══════════════════════════════════ */}
        <div className="cs-panel">
          {/* Eyebrow + title */}
          <div className="cs-panel-header">
            <span className="cs-eyebrow">REGIONAL FOCUS</span>
            <h2 className="cs-title">Tanzania</h2>
          </div>

          {/* Metric 1 – HIV Prevalence */}
          <div className="cs-metric">
            <div className="cs-metric-top">
              <span className="cs-metric-label">HIV PREVALENCE</span>
              <span className="cs-metric-value">4.8%</span>
            </div>
            <div className="cs-metric-bar">
              <div className="cs-metric-fill" style={{ width: "48%" }} />
            </div>
          </div>

          {/* Metric 2 – Maternal Mortality */}
          <div className="cs-metric">
            <div className="cs-metric-top">
              <span className="cs-metric-label">MATERNAL MORTALITY</span>
              <span className="cs-metric-value">556 / 100k</span>
            </div>
            <div className="cs-metric-bar">
              <div className="cs-metric-fill" style={{ width: "72%" }} />
            </div>
          </div>

          {/* AI Recommendation card */}
          <div className="cs-rec-card">
            <div className="cs-rec-header">
              <svg
                className="cs-rec-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="cs-rec-title">AI Recommendation</span>
            </div>
            <p className="cs-rec-desc">
              Primary focus: Mobile maternity clinics in the Dodoma region.
              Predicted impact: 14% reduction in mortality over 18 months.
            </p>
          </div>

          {/* Action buttons */}
          <div className="cs-actions">
            <button className="cs-btn cs-btn--primary">Deploy Resources</button>
            <button className="cs-btn cs-btn--outline">Download Report</button>
          </div>
        </div>
      </div>
    </section>
  );
}
