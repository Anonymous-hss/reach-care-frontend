import React, { useState } from 'react';
import './HowItWorks.css';

const steps = [
  {
    number: 1,
    label: 'Input Focus',
    desc: 'Define geography and primary health metrics.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M9 12h6M15 12l-3-3m3 3l-3 3"/>
      </svg>
    ),
  },
  {
    number: 2,
    label: 'AI Analyzes',
    desc: 'Cross-referencing global datasets and local needs.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2"/>
        <path d="M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M16.3 7.7l-1.4 1.4M7.7 16.3l-1.4 1.4"/>
      </svg>
    ),
    active: true,
  },
  {
    number: 3,
    label: 'Get Insights',
    desc: 'Impact-ranked recommendations delivered instantly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="4"/>
        <path d="M12 14v3M9 20h6"/>
      </svg>
    ),
  },
  {
    number: 4,
    label: 'Deploy',
    desc: 'Allocate resources via integrated logistics partners.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
  {
    number: 5,
    label: 'Track',
    desc: 'Continuous monitoring and impact validation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(2); // 2 = "AI Analyzes" (1-indexed)

  return (
    <section className="hiw-section">
      <div className="hiw-container">

        {/* ── Header ── */}
        <div className="hiw-header">
          <span className="hiw-eyebrow">IMPLEMENTATION</span>
          <h2 className="hiw-heading">The Precision Workflow</h2>
        </div>

        {/* ── Steps ── */}
        <div className="hiw-steps">
          {steps.map((step, i) => {
            const isActive = step.number === activeStep;
            return (
              <div
                key={i}
                className={`hiw-step ${isActive ? 'hiw-step--active' : ''}`}
                onClick={() => setActiveStep(step.number)}
              >
                {/* Icon box */}
                <div className="hiw-icon-box">
                  {step.icon}
                </div>

                {/* Connector line (between steps) */}
                {i < steps.length - 1 && (
                  <div className="hiw-connector" />
                )}

                {/* Label + desc */}
                <p className="hiw-step-label">
                  <span className="hiw-step-num">{step.number}.</span> {step.label}
                </p>
                <p className="hiw-step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}