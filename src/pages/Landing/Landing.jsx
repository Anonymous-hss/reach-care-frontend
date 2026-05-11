import React from 'react';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing__hero">
        <h1 className="landing__title">ReachCare</h1>
        <p className="landing__subtitle">Health strategy decision platform for real-time signals and strategic investments.</p>
        <div className="landing__actions">
          <a href="/dashboard" className="landing__btn">Enter Platform</a>
        </div>
      </div>
    </div>
  );
}
