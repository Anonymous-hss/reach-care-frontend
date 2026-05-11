import React from 'react';
import './CallToAction.css';

export default function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-container">

        <h2 className="cta-heading">
          Start making data-driven<br />healthcare decisions
        </h2>

        <p className="cta-subtext">
          Join the global coalition of NGOs, governments, and healthcare providers
          using Care Compass to bridge the gap in clinical care.
        </p>

        <div className="cta-actions">
          <a href="/signup" className="cta-btn cta-btn--primary">Get Started Now</a>
          <a href="/demo"   className="cta-btn cta-btn--outline">Request Demo</a>
        </div>

      </div>
    </section>
  );
}