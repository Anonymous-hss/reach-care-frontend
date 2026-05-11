import React from "react";
import "./Signup.css";
import rectangleBg from "../../assets/Rectangle 5.png";

export default function Signup() {
  return (
    <div className="signup">
      {/* ── LEFT PANEL ── */}
      <div className="signup__left">
        <div className="signup__left-inner">
          <h1 className="signup__title">See Your Workspace</h1>
          <p className="signup__subtitle">
            Access the monolith of global health intelligence.
          </p>
          <button className="signup__sso-btn">CONTINUE WITH SSO</button>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="signup__right">
        {/* Replace src with your image path e.g. /assets/health-bg.jpg */}
        <img
          className="signup__bg-img"
          src={rectangleBg}
          alt="Health workers"
        />
        <div className="signup__overlay" />

        <div className="signup__features">
          <div className="signup__feature">
            <div className="signup__feature-icon">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="signup__feature-body">
              <h3 className="signup__feature-title">INSTITUTIONAL TRUST</h3>
              <p className="signup__feature-desc">
                End-to-end encrypted medical data pipelines for governmental and
                NGO entities.
              </p>
            </div>
          </div>

          <div className="signup__feature">
            <div className="signup__feature-icon">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
                <polyline points="3 7 9 1 15 7 21 1" />
              </svg>
            </div>
            <div className="signup__feature-body">
              <h3 className="signup__feature-title">REAL-TIME SYNTHESIS</h3>
              <p className="signup__feature-desc">
                Latency-free reporting across 142 health jurisdictions globally.
              </p>
            </div>
          </div>

          <div className="signup__feature">
            <div className="signup__feature-icon">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <polyline points="9 9 12 6 15 9" />
                <line x1="12" y1="6" x2="12" y2="14" />
              </svg>
            </div>
            <div className="signup__feature-body">
              <h3 className="signup__feature-title">ADAPTIVE FRAMEWORKS</h3>
              <p className="signup__feature-desc">
                AI-driven predictive modeling for resource planning in volatile
                regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
