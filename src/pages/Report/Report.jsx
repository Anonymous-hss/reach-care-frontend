import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Search,
  // Upload,
} from 'lucide-react';
import './Report.css';

const sourceReports = [
  {
    title: 'India HIV Estimation 2025 - Technical Report',
    meta: 'NACO + ICMR-NIRDHDS, Ministry of Health & Family Welfare, Government of India - 193 pages - Published Dec 2025',
    quality: '0.96',
  },
  {
    title: 'Tracking Universal Health Coverage - 2025 Global Monitoring Report',
    meta: 'WHO + World Bank - 108 pages - ISBN 978-92-4-011780-8 - Published 2025',
    quality: '0.94',
  },
];

const indicatorGroups = [
  {
    title: 'From NACO 2025',
    rows: [
      ['Adult HIV prevalence (national)', '0.20%'],
      ['Total PLHIV', '25.61 lakh'],
      ['Decline in new infections 2010-24', '-48.7%', 'positive'],
      ['Decline in AIDS deaths 2010-24', '-81.4%', 'positive'],
      ['Vertical transmission rate', '10.25%'],
      ['High-priority districts', '193'],
      ['Mizoram incidence per 1,000', '0.90', 'negative'],
      ['Mothers needing EVTH services', '18,473'],
    ],
  },
  {
    title: 'From WHO UHC 2025',
    rows: [
      ['Global UHC service coverage index', '71 (2023)'],
      ['Population without essential services', '4.6 billion', 'negative'],
      ['Population facing financial hardship', '2.1 billion', 'negative'],
      ['SCI annualized progress 2015-23', '0.5 pp'],
      ['SEAR Gini coefficient (UHC)', '0.11 (2023)'],
      ['Top driver of SCI gains globally', 'Sanitation + ITNs'],
      ['Countries with SCI < 40 (2023)', '8 (was 55 in 2000)'],
      ['Health workforce in top 3 drivers', 'Yes (2015-23)', 'positive'],
    ],
  },
];

const generatedBriefs = [
  {
    title: 'Northeast IDU corridor - investment case',
    meta: '4-page committee brief - Generated from current Compass allocation - Includes evidence trail from NACO 2025',
  },
  {
    title: 'EVTH push - five-state programme brief',
    meta: '6-page brief - UP / Maharashtra / AP / Bihar / Karnataka / Telangana - Workforce + cost modeling',
  },
  {
    title: 'India HIV vs global benchmarks - board briefing',
    meta: '3-page brief - NACO 2025 + WHO UHC 2025 comparative analysis - India outperforming on decline, lagging on UHC SCI',
  },
];

function escapePdfText(value) {
  return String(value)
    .replace(/[^\x20-\x7E]/g, '-')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function createReportPdf(title) {
  const lines = [
    'ReachCare - Generated decision brief',
    title,
    '',
    'Source reports: NACO 2025 and WHO UHC 2025',
    'This local export is ready for review and committee circulation.',
  ];
  const commands = ['BT', '/F1 12 Tf', '48 770 Td'];

  lines.forEach((line, index) => {
    if (index > 0) commands.push('0 -22 Td');
    commands.push(`(${escapePdfText(line)}) Tj`);
  });

  commands.push('ET');
  const stream = commands.join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [4 0 R] /Count 1 >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents 5 0 R >>`,
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  return pdf;
}

function downloadReportBrief(title) {
  const blob = new Blob([createReportPdf(title)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function SourceCard({ report }) {
  return (
    <article className="report-source-card">
      <div className="report-source-card__icon">
        <FileText size={18} />
      </div>
      <div className="report-source-card__content">
        <h2>{report.title}</h2>
        <p>{report.meta}</p>
      </div>
      <span className="report-quality">Quality {report.quality}</span>
      <button className="report-icon-button" type="button" aria-label={`Download ${report.title}`}>
        <ArrowDown size={16} />
      </button>
      <button className="report-icon-button" type="button" aria-label={`Open ${report.title}`}>
        <ArrowUpRight size={16} />
      </button>
    </article>
  );
}

function IndicatorPanel({ group }) {
  return (
    <section className="report-indicator-panel">
      <h2>{group.title}</h2>
      <dl>
        {group.rows.map(([label, value, tone]) => (
          <div key={label} className="report-indicator-row">
            <dt>{label}</dt>
            <dd className={tone ? `report-value report-value--${tone}` : 'report-value'}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function BriefRow({ brief }) {
  return (
    <article className="report-brief-row">
      <div className="report-brief-row__icon">
        <FileText size={18} />
      </div>
      <div className="report-brief-row__content">
        <h2>{brief.title}</h2>
        <p>{brief.meta}</p>
      </div>
      <button className="report-download-button" type="button" onClick={() => downloadReportBrief(brief.title)}>
        <ArrowDown size={14} />
        Download
      </button>
    </article>
  );
}

export default function Report() {
  return (
    <main className="report-page">
      <section className="report-shell" aria-label="Source reports">
        <header className="report-hero">
          <div>
            <h1>Source reports</h1>
            <p>Primary documents ingested by the platform - Every Compass and Pulse claim traces here</p>
          </div>
          <div className="report-hero__actions">
            <button type="button">
              <Search size={13} />
              Search
            </button>
            {/* <button type="button">
              <Upload size={13} />
              Upload
            </button> */}
          </div>
        </header>

        <section className="report-section">
          <div className="report-section__header">
            <h2>Primary sources powering current recommendations</h2>
            <span>2 of 187 indexed sources</span>
          </div>
          <div className="report-source-list">
            {sourceReports.map((report) => <SourceCard key={report.title} report={report} />)}
          </div>
        </section>

        <section className="report-section">
          <div className="report-section__header">
            <h2>Key extracted indicators</h2>
            <span>Live values</span>
          </div>
          <div className="report-indicator-grid">
            {indicatorGroups.map((group) => <IndicatorPanel key={group.title} group={group} />)}
          </div>
        </section>

        <section className="report-section">
          <div className="report-section__header">
            <h2>Generated decision briefs</h2>
            <span>Export-ready</span>
          </div>
          <div className="report-brief-list">
            {generatedBriefs.map((brief) => <BriefRow key={brief.title} brief={brief} />)}
          </div>
        </section>
      </section>
    </main>
  );
}
