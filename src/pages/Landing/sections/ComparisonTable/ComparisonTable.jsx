import React from 'react';
import './ComparisonTable.css';

const rows = [
  {
    parameter: 'Data Model',
    traditional: 'Fragmented & Siloed',
    careCompass: 'Unified & Integrated',
  },
  {
    parameter: 'Methodology',
    traditional: 'Manual Assessment',
    careCompass: 'AI-Driven Engine',
  },
  {
    parameter: 'Response Type',
    traditional: 'Reactive / Crisis-led',
    careCompass: 'Predictive / Preventive',
  },
  {
    parameter: 'Scalability',
    traditional: 'Limited by Personnel',
    careCompass: 'Infinite via Cloud',
  },
];

export default function ComparisonTable() {
  return (
    <section className="ct-section">
      <div className="ct-container">

        {/* ── Heading ── */}
        <h2 className="ct-heading">A Fundamental Shift</h2>

        {/* ── Table card ── */}
        <div className="ct-card">

          {/* Header row */}
          <div className="ct-row ct-row--header">
            <span className="ct-cell ct-cell--label ct-col-param">PARAMETER</span>
            <span className="ct-cell ct-col-trad">TRADITIONAL APPROACH</span>
            <span className="ct-cell ct-col-care">CARE COMPASS</span>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div className="ct-row ct-row--data" key={i}>
              <span className="ct-cell ct-col-param ct-param-text">{row.parameter}</span>
              <span className="ct-cell ct-col-trad ct-trad-text">{row.traditional}</span>
              <span className="ct-cell ct-col-care ct-care-text">{row.careCompass}</span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}