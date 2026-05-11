import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  ExternalLink,
  FileText,
  Info,
  MessageSquare,
  Pin,
  RotateCcw,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';
import SignalBadge from '../../components/pulse/SignalBadge';
import { pulseActionPages, pulseData } from '../../data/pulseData';
import './PulseActionPage.css';

function getSignal(signalId) {
  return pulseData.signals.find((signal) => signal.id === signalId);
}

function getActionIcon(action) {
  const label = action.toLowerCase();

  if (label.includes('export')) return Download;
  if (label.includes('studio') || label.includes('variation') || label.includes('model responses')) return SlidersHorizontal;
  if (label.includes('outbreak') || label.includes('re-run') || label.includes('allocation')) return RotateCcw;
  if (label.includes('ask') || label.includes('investigate') || label.includes('question')) return MessageSquare;
  if (label.includes('evidence') || label.includes('review')) return FileText;
  return Info;
}

/* eslint-disable no-unused-vars -- Legacy text PDF builder kept only for reference while visual export is active. */
function normalizePdfText(value) {
  return String(value ?? '')
    .replace(/[–—]/g, '-')
    .replace(/[·]/g, '-')
    .replace(/[’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[₹]/g, 'Rs.');
}

function escapePdfText(value) {
  return normalizePdfText(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapPdfText(text, maxLength = 88) {
  const words = normalizePdfText(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
      return;
    }
    current = next;
  });

  if (current) lines.push(current);
  return lines;
}

function createPdfTextStream(entries) {
  let y = 770;
  const commands = ['BT'];

  entries.forEach((entry) => {
    if (entry.rule) {
      y -= entry.gap ?? 12;
      commands.push('ET');
      commands.push(`${entry.x ?? 48} ${y} m ${entry.x2 ?? 547} ${y} l S`);
      commands.push('BT');
      y -= 12;
      return;
    }

    y -= entry.gap ?? 0;
    const size = entry.size ?? 10;
    const leading = entry.leading ?? size + 4;
    const font = entry.bold ? 'F2' : 'F1';
    const x = entry.x ?? 48;

    wrapPdfText(entry.text, entry.max).forEach((line) => {
      commands.push(`/${font} ${size} Tf`);
      commands.push(`${x} ${y} Td (${escapePdfText(line)}) Tj`);
      commands.push(`${-x} ${-y} Td`);
      y -= leading;
    });

    y -= entry.after ?? 0;
  });

  commands.push('ET');
  return commands.join('\n');
}

function buildBriefPdfPages(signal, page) {
  const brief = page.exportBrief;
  const metrics = brief.coverMetrics ?? [];
  const options = brief.options ?? [];
  const evidence = brief.evidence ?? [];
  const metricLineOne = `${metrics[0]?.label ?? 'Current MMR'}: ${metrics[0]?.value ?? '594'} ${metrics[0]?.detail ?? '/ 100k'}    ${metrics[1]?.label ?? 'Pregnancies at risk'}: ${metrics[1]?.value ?? '~31,200'}`;
  const metricLineTwo = `${metrics[2]?.label ?? 'Affected population'}: ${metrics[2]?.value ?? '926k'}    ${metrics[3]?.label ?? 'Clinics closed'}: ${metrics[3]?.value ?? '14 / 47'}`;

  return [
    [
      { text: `${brief.brand}    ${brief.confidential}`, size: 9, bold: true, max: 70 },
      { rule: 0.5, gap: 18 },
      { text: 'CRITICAL SIGNAL', size: 8, bold: true },
      { text: `${signal.topic} - ${signal.region} - ${brief.generatedAt}`, size: 8, gap: 2 },
      { text: signal.title, size: 16, bold: true, gap: 12, leading: 20, max: 58 },
      { text: page.summary, size: 10, leading: 14, max: 88 },
      { text: metricLineOne, size: 11, bold: true, gap: 14, max: 76 },
      { text: metricLineTwo, size: 11, bold: true, max: 76 },
      { text: `${brief.decision.label}: ${brief.decision.body}`, size: 10, bold: true, gap: 20, max: 82 },
      { text: `${brief.footer.preparedFor}                                      Page 1 of ${brief.totalPages}`, size: 8, gap: 330, max: 95 },
    ],
    [
      { text: `${brief.brand} - ${brief.shortTitle}                                      Page 2 of ${brief.totalPages}`, size: 9, bold: true, max: 85 },
      { rule: 0.5, gap: 20 },
      { text: brief.situation.title, size: 13, bold: true, gap: 4 },
      { text: brief.situation.body, size: 10, leading: 14, max: 90 },
      { text: '3-YEAR TREND - MATERNAL MORTALITY RATIO', size: 9, gap: 22 },
      { text: `${page.chart.xAxis.join('    ')}: ${page.chart.points.join('    ')}`, size: 12, bold: true, max: 75 },
      { text: page.chart.annotation, size: 10, gap: 4 },
      { text: 'Driver attribution', size: 12, bold: true, gap: 24 },
      ...page.drivers.map((driver) => ({ text: `${driver.label}: ${driver.value}%`, size: 10, max: 80 })),
      { text: `${brief.situation.noteLabel} - ${brief.situation.note}`, size: 10, bold: true, gap: 22, max: 84 },
      { text: `${brief.footer.sourceData}                                      Page 2 of ${brief.totalPages}`, size: 8, gap: 230, max: 95 },
    ],
    [
      { text: `${brief.brand} - ${brief.shortTitle}                                      Page 3 of ${brief.totalPages}`, size: 9, bold: true, max: 85 },
      { rule: 0.5, gap: 20 },
      { text: brief.optionsTitle, size: 13, bold: true },
      { text: brief.optionsIntro, size: 10, leading: 14, gap: 6, max: 90 },
      ...options.flatMap((option) => [
        { text: `${option.label}    ${option.title}    ${option.cost}`, size: 11, bold: true, gap: 14, max: 78 },
        { text: option.body, size: 10, max: 90 },
        { text: option.meta.join('    '), size: 9, bold: true, max: 90 },
      ]),
      { text: brief.optionsNote, size: 10, bold: true, gap: 20, max: 84 },
      { text: `${brief.footer.projections}                                      Page 3 of ${brief.totalPages}`, size: 8, gap: 210, max: 95 },
    ],
    [
      { text: `${brief.brand} - ${brief.shortTitle}                                      Page 4 of ${brief.totalPages}`, size: 9, bold: true, max: 85 },
      { rule: 0.5, gap: 20 },
      { text: brief.evidenceTitle, size: 13, bold: true },
      { text: brief.evidenceIntro, size: 10, leading: 14, gap: 6, max: 92 },
      ...evidence.map((item) => ({ text: `${item.score}    ${item.title} - ${item.meta}`, size: 9, bold: true, gap: 6, max: 90 })),
      { text: brief.methodologyTitle, size: 13, bold: true, gap: 24 },
      { text: brief.methodology, size: 10, leading: 14, max: 92 },
      { text: `${brief.footer.generatedBy}                                      ${brief.footer.url}`, size: 8, gap: 250, max: 95 },
    ],
  ];
}

function buildBriefPdfDocument(signal, page) {
  const pages = buildBriefPdfPages(signal, page);
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [6 0 R 8 0 R 10 0 R 12 0 R] /Count 4 >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ];

  pages.forEach((entries, index) => {
    const stream = createPdfTextStream(entries);
    const contentObjectNumber = 5 + index * 2;
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);
  });

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefPosition = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`;

  return pdf;
}
function getBriefPdfFileName(signal) {
  return `${signal.id}-decision-brief.pdf`;
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function getDocumentCssText() {
  return [...document.styleSheets]
    .map((styleSheet) => {
      try {
        return [...styleSheet.cssRules]
          .map((rule) => rule.cssText)
          .filter((ruleText) => !ruleText.startsWith('@import') && !ruleText.startsWith('@font-face'))
          .join('\n');
      } catch {
        return '';
      }
    })
    .join('\n');
}

function createSvgCdata(value) {
  return `<![CDATA[${String(value).replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function renderBriefSheetToJpeg(sheet, cssText) {
  const rect = sheet.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);
  const scale = 2;
  const clone = sheet.cloneNode(true);
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.minHeight = `${height}px`;
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>${createSvgCdata(cssText)}</style>
          ${serialized}
        </div>
      </foreignObject>
    </svg>
  `;
  const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));

  try {
    const image = await loadImage(svgUrl);
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return {
      width: canvas.width,
      height: canvas.height,
      bytes: Uint8Array.from(atob(canvas.toDataURL('image/jpeg', 0.95).split(',')[1]), (character) => character.charCodeAt(0)),
    };
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

function buildVisualPdfBlob(images) {
  const encoder = new TextEncoder();
  const parts = [];
  const offsets = [0];
  let byteLength = 0;

  const appendText = (text) => {
    const bytes = encoder.encode(text);
    parts.push(bytes);
    byteLength += bytes.length;
  };

  const appendBytes = (bytes) => {
    parts.push(bytes);
    byteLength += bytes.length;
  };

  const beginObject = (objectNumber) => {
    offsets[objectNumber] = byteLength;
    appendText(`${objectNumber} 0 obj\n`);
  };

  appendText('%PDF-1.4\n');
  beginObject(1);
  appendText('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  beginObject(2);
  appendText(`<< /Type /Pages /Kids [${images.map((_, index) => `${3 + index * 3} 0 R`).join(' ')}] /Count ${images.length} >>\nendobj\n`);

  images.forEach((image, index) => {
    const pageObject = 3 + index * 3;
    const contentObject = pageObject + 1;
    const imageObject = pageObject + 2;
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 30;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;
    const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
    const drawWidth = image.width * ratio;
    const drawHeight = image.height * ratio;
    const x = (pageWidth - drawWidth) / 2;
    const y = (pageHeight - drawHeight) / 2;
    const stream = `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im${index + 1} Do\nQ`;

    beginObject(pageObject);
    appendText(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im${index + 1} ${imageObject} 0 R >> >> >> /Contents ${contentObject} 0 R >>\nendobj\n`);
    beginObject(contentObject);
    appendText(`<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream\nendobj\n`);
    beginObject(imageObject);
    appendText(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`);
    appendBytes(image.bytes);
    appendText('\nendstream\nendobj\n');
  });

  const objectCount = 2 + images.length * 3;
  const xrefPosition = byteLength;
  appendText(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`);
  offsets.slice(1).forEach((offset = 0) => {
    appendText(`${String(offset).padStart(10, '0')} 00000 n \n`);
  });
  appendText(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`);

  return new Blob(parts, { type: 'application/pdf' });
}

async function downloadVisualBriefPdf(signal) {
  const sheets = [...document.querySelectorAll('.brief-sheet')];

  if (!sheets.length) {
    throw new Error('Brief preview sheets are not available to export.');
  }

  const cssText = getDocumentCssText();
  const images = [];

  for (const sheet of sheets) {
    images.push(await renderBriefSheetToJpeg(sheet, cssText));
  }

  downloadBlob(buildVisualPdfBlob(images), getBriefPdfFileName(signal));
}
/* eslint-enable no-unused-vars */

async function downloadBriefPdf(page) {
  if (!page.exportBrief) return;

  window.print();
}

function ActionButton({ children, tone = 'secondary', icon: Icon, onClick }) {
  return (
    <button type="button" className={`pulse-action-button pulse-action-button--${tone}`} onClick={onClick}>
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}

function DetailStat({ stat }) {
  return (
    <div className="pulse-detail-stat">
      <span className="pulse-detail-stat__label">{stat.label}</span>
      <span className={`pulse-detail-stat__value ${stat.tone ? `pulse-detail-stat__value--${stat.tone}` : ''}`}>
        {stat.value}
        {stat.detail && <span>{stat.detail}</span>}
      </span>
      {stat.note && <span className={`pulse-detail-stat__note ${stat.tone ? `pulse-detail-stat__note--${stat.tone}` : ''}`}>{stat.note}</span>}
    </div>
  );
}

function TrendChart({ chart }) {
  const coordinates = chart.points.map((value, index) => {
    const x = 70 + index * 120;
    const y = 210 - ((value - 400) / 220) * 150;
    return `${x},${y}`;
  });

  return (
    <div className="pulse-detail-card pulse-detail-card--chart">
      <span className="pulse-section-label">{chart.title}</span>
      <svg className="pulse-trend-chart" viewBox="0 0 520 260" role="img" aria-label={chart.title}>
        <line x1="56" y1="34" x2="56" y2="218" className="chart-axis" />
        <line x1="56" y1="218" x2="488" y2="218" className="chart-axis" />
        {[58, 126, 194].map((y, index) => (
          <g key={chart.yAxis[index]}>
            <line x1="56" y1={y} x2="488" y2={y} className="chart-grid" />
            <text x="24" y={y + 4} className="chart-label">{chart.yAxis[index]}</text>
          </g>
        ))}
        <text x="70" y="126" className="chart-note">{chart.annotation}</text>
        <polyline points={coordinates.join(' ')} className="chart-line chart-line--solid" />
        {coordinates.map((point, index) => {
          const [x, y] = point.split(',');
          return <circle key={point} cx={x} cy={y} r="5" className="chart-point" data-index={index} />;
        })}
        <text x="430" y="46" className="chart-final-label">{chart.finalLabel}</text>
        {chart.xAxis.map((label, index) => (
          <text key={label} x={70 + index * 120} y="242" className="chart-label chart-label--x">
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DriverCard({ drivers }) {
  return (
    <div className="pulse-detail-card">
      <span className="pulse-section-label">Driver attribution</span>
      <div className="driver-list">
        {drivers.map((driver) => (
          <div key={driver.label} className="driver-item">
            <div className="driver-item__top">
              <span>{driver.label}</span>
              <span>{driver.value}%</span>
            </div>
            <div className="driver-item__track">
              <span
                className={`driver-item__bar driver-item__bar--${driver.tone}`}
                style={{ width: `${driver.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationPanel({ recommendation }) {
  return (
    <section className="pulse-recommendation">
      <Info size={18} />
      <div>
        <h2>{recommendation.title}</h2>
        <ol>
          {recommendation.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p>{recommendation.footer}</p>
      </div>
    </section>
  );
}

function EvidenceList({ evidence }) {
  const handleViewMore = () => {
    window.dispatchEvent(new CustomEvent('pulse:view-more-sources'));
  };

  return (
    <section className="pulse-detail-section">
      <span className="pulse-section-label">Evidence trail - 7 sources supporting this signal</span>
      <div className="evidence-list">
        {evidence.map((item) => (
          <div key={item.title} className="evidence-item">
            <FileText size={16} />
            <div>
              <span className="evidence-item__title">{item.title}</span>
              <span>{item.meta}</span>
            </div>
            <span className={`quality-chip quality-chip--${item.tone}`}>Quality {item.quality}</span>
            <ExternalLink size={14} />
          </div>
        ))}
      </div>
      <button type="button" className="pulse-text-button" onClick={handleViewMore}>View 4 more sources</button>
    </section>
  );
}

function RelatedSignals({ signals }) {
  return (
    <section className="pulse-detail-section">
      <span className="pulse-section-label">Related signals</span>
      <div className="related-grid">
        {signals.map((item) => (
          <div key={item.title} className="related-card">
            <span>{item.meta}</span>
            <span className="related-card__title">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function NextActions({ actions }) {
  return (
    <section className="pulse-detail-section pulse-detail-section--compact">
      <h2 className="pulse-next-title">Take this further</h2>
      <div className="pulse-next-actions">
        {actions.map((action) => (
          <ActionButton key={action} icon={getActionIcon(action)}>
            {action}
          </ActionButton>
        ))}
      </div>
    </section>
  );
}

function TakeActionPage({ signal, page }) {
  const navigate = useNavigate();
  const exportBriefPath = `/pulse/signals/${signal.id}/brief`;
  const handleExportBrief = () => {
    navigate(exportBriefPath, { state: { printBrief: true } });
  };

  return (
    <div className="pulse-detail-page">
      <section className="pulse-detail-hero">
        <div>
          <div className="pulse-detail-hero__meta">
            <SignalBadge status={signal.status} />
            <span>{signal.topic}</span>
            <span>-</span>
            <span>{signal.region}</span>
            <span>-</span>
            <span>{page.eyebrow}</span>
            <span>-</span>
            <span>{page.meta}</span>
          </div>
          <h1>{signal.title}</h1>
          <p>{page.summary}</p>
        </div>
        <div className="pulse-detail-hero__actions">
          <ActionButton icon={Pin}>Pin signal</ActionButton>
          <ActionButton icon={Share2}>Share</ActionButton>
          <ActionButton tone="primary" icon={Download} onClick={handleExportBrief}>Export brief</ActionButton>
        </div>
      </section>

      <section className="pulse-detail-stats">
        {page.stats.map((stat) => <DetailStat key={stat.label} stat={stat} />)}
      </section>

      <section className="pulse-detail-grid">
        <TrendChart chart={page.chart} />
        <DriverCard drivers={page.drivers} />
      </section>

      <span className="pulse-section-label">What the evidence suggests</span>
      <RecommendationPanel recommendation={page.recommendation} />
      <EvidenceList evidence={page.evidence} />
      <RelatedSignals signals={page.relatedSignals} />
      <NextActions actions={page.nextActions} />
    </div>
  );
}

function BriefHeader({ title, pageNumber, totalPages, confidential }) {
  return (
    <header className="brief-sheet__header">
      <div className="brief-brand">
        <span className="brief-brand__mark">R</span>
        <span>{title}</span>
      </div>
      <span>{confidential || `Page ${pageNumber} of ${totalPages}`}</span>
    </header>
  );
}

function BriefFooter({ left, right }) {
  return (
    <footer className="brief-sheet__footer">
      <span>{left}</span>
      <span>{right}</span>
    </footer>
  );
}

function BriefMetricGrid({ metrics }) {
  return (
    <div className="brief-metric-grid">
      {metrics.map((metric) => (
        <div key={metric.label} className="brief-metric">
          <span>{metric.label}</span>
          <strong>{metric.value}<em>{metric.detail}</em></strong>
        </div>
      ))}
    </div>
  );
}

function BriefTrendChart({ chart }) {
  return (
    <svg className="brief-trend-chart" viewBox="0 0 460 210" role="img" aria-label={chart.title}>
      <line x1="62" y1="26" x2="62" y2="170" className="brief-chart-axis" />
      <line x1="62" y1="170" x2="430" y2="170" className="brief-chart-axis" />
      <line x1="62" y1="78" x2="430" y2="78" className="brief-chart-grid" />
      <text x="70" y="72" className="brief-chart-note">{chart.annotation}</text>
      <polyline points="98,126 190,122 282,116 405,48" className="brief-chart-line" />
      <circle cx="98" cy="126" r="4" className="brief-chart-point" />
      <circle cx="190" cy="122" r="4" className="brief-chart-point" />
      <circle cx="282" cy="116" r="4" className="brief-chart-point" />
      <circle cx="405" cy="48" r="4" className="brief-chart-point" />
      <text x="395" y="36" className="brief-chart-final">{chart.finalLabel}</text>
      {chart.xAxis.map((label, index) => (
        <text key={label} x={98 + index * 102} y="194" className="brief-chart-label">
          {label}
        </text>
      ))}
    </svg>
  );
}

function BriefDriverBars({ drivers }) {
  return (
    <div className="brief-driver-list">
      {drivers.map((driver) => (
        <div key={driver.label} className="brief-driver">
          <div>
            <span>{driver.label}</span>
            <span>{driver.value}%</span>
          </div>
          <em>
            <i className={`brief-driver__bar brief-driver__bar--${driver.tone}`} style={{ width: `${driver.value}%` }} />
          </em>
        </div>
      ))}
    </div>
  );
}

function BriefSheet({ label, pageNumber, totalPages, children, footerLeft, footerRight }) {
  return (
    <section className="brief-preview__item">
      <span className="brief-preview__label">{label}</span>
      <article className="brief-sheet">
        {children}
        <BriefFooter left={footerLeft} right={footerRight || `Page ${pageNumber} of ${totalPages}`} />
      </article>
    </section>
  );
}

function BriefCoverPage({ brief, signal, page }) {
  return (
    <BriefSheet
      label="Page 1 - Cover & summary"
      pageNumber={1}
      totalPages={brief.totalPages}
      footerLeft={brief.footer.preparedFor}
    >
      <BriefHeader title={brief.brand} confidential={brief.confidential} />
      <main className="brief-sheet__body">
        <span className="brief-critical-chip">Critical signal</span>
        <p className="brief-meta-line">{signal.topic} - {signal.region} - {brief.generatedAt}</p>
        <h2>{signal.title}</h2>
        <p className="brief-summary">{page.summary}</p>
        <BriefMetricGrid metrics={brief.coverMetrics} />
        <div className="brief-callout">
          <span>{brief.decision.label}</span>
          <p>{brief.decision.body}</p>
        </div>
      </main>
    </BriefSheet>
  );
}

function BriefSituationPage({ brief, page }) {
  return (
    <BriefSheet
      label="Page 2 - Situation & drivers"
      pageNumber={2}
      totalPages={brief.totalPages}
      footerLeft={brief.footer.sourceData}
    >
      <BriefHeader title={`${brief.brand} - ${brief.shortTitle}`} pageNumber={2} totalPages={brief.totalPages} />
      <main className="brief-sheet__body">
        <h2>{brief.situation.title}</h2>
        <p className="brief-summary">{brief.situation.body}</p>
        <span className="brief-section-kicker">{page.chart.title}</span>
        <BriefTrendChart chart={page.chart} />
        <h3>Driver attribution</h3>
        <BriefDriverBars drivers={page.drivers} />
        <div className="brief-note">
          <span>{brief.situation.noteLabel}</span>
          <p>{brief.situation.note}</p>
        </div>
      </main>
    </BriefSheet>
  );
}

function BriefOptionsPage({ brief }) {
  return (
    <BriefSheet
      label="Page 3 - Options for committee"
      pageNumber={3}
      totalPages={brief.totalPages}
      footerLeft={brief.footer.projections}
    >
      <BriefHeader title={`${brief.brand} - ${brief.shortTitle}`} pageNumber={3} totalPages={brief.totalPages} />
      <main className="brief-sheet__body">
        <h2>{brief.optionsTitle}</h2>
        <p className="brief-summary">{brief.optionsIntro}</p>
        <div className="brief-option-list">
          {brief.options.map((option) => (
            <section key={option.label} className={`brief-option ${option.recommended ? 'brief-option--recommended' : ''}`}>
              <div>
                <span>{option.label}</span>
                <h3>{option.title}</h3>
                <p>{option.body}</p>
                <div className="brief-option__meta">
                  {option.meta.map((item) => <em key={item}>{item}</em>)}
                </div>
              </div>
              <strong>{option.cost}</strong>
            </section>
          ))}
        </div>
        <div className="brief-callout brief-callout--small">
          <p>{brief.optionsNote}</p>
        </div>
      </main>
    </BriefSheet>
  );
}

function BriefEvidencePage({ brief }) {
  return (
    <BriefSheet
      label="Page 4 - Evidence & methodology"
      pageNumber={4}
      totalPages={brief.totalPages}
      footerLeft={brief.footer.generatedBy}
      footerRight={brief.footer.url}
    >
      <BriefHeader title={`${brief.brand} - ${brief.shortTitle}`} pageNumber={4} totalPages={brief.totalPages} />
      <main className="brief-sheet__body">
        <h2>{brief.evidenceTitle}</h2>
        <p className="brief-summary">{brief.evidenceIntro}</p>
        <div className="brief-evidence-list">
          {brief.evidence.map((item) => (
            <div key={item.title} className="brief-evidence-item">
              <span>{item.score}</span>
              <div>
                <strong>{item.title}</strong>
                <em>{item.meta}</em>
              </div>
            </div>
          ))}
        </div>
        <h2>{brief.methodologyTitle}</h2>
        <p className="brief-summary">{brief.methodology}</p>
      </main>
    </BriefSheet>
  );
}

function ExportBriefPage({ signal, page }) {
  const brief = page.exportBrief;
  const location = useLocation();

  useEffect(() => {
    if (location.state?.printBrief) {
      window.setTimeout(() => window.print(), 150);
    }
  }, [location.state]);

  if (!brief) {
    return <Navigate to={`/pulse/signals/${signal.id}/action`} replace />;
  }

  return (
    <div className="pulse-detail-page pulse-brief-page">
      <section className="pulse-detail-hero">
        <div>
          <div className="pulse-detail-hero__meta">
            <SignalBadge status={signal.status} />
            <span>{signal.topic}</span>
            <span>-</span>
            <span>{signal.region}</span>
            <span>-</span>
            <span>{page.eyebrow}</span>
            <span>-</span>
            <span>{page.meta}</span>
          </div>
          <h1>{signal.title}</h1>
          <p>{page.summary}</p>
        </div>
        <div className="pulse-detail-hero__actions">
          <ActionButton icon={Pin}>Pin signal</ActionButton>
          <ActionButton icon={Share2}>Share</ActionButton>
          <ActionButton tone="primary" icon={Download} onClick={() => downloadBriefPdf(page)}>Export brief</ActionButton>
        </div>
      </section>

      <section className="brief-preview" aria-label="Export brief PDF preview">
        <BriefCoverPage brief={brief} signal={signal} page={page} />
        <BriefSituationPage brief={brief} page={page} />
        <BriefOptionsPage brief={brief} />
        <BriefEvidencePage brief={brief} />
      </section>
    </div>
  );
}

function ExposureItem({ item }) {
  return (
    <div className="exposure-item">
      <span className={`risk-chip risk-chip--${item.risk.toLowerCase()}`}>{item.risk}</span>
      <div>
        <span className="exposure-item__title">{item.title}</span>
        <span>{item.meta}</span>
      </div>
      <div className="exposure-item__impact">
        <span className="exposure-item__amount">{item.amount}</span>
        <span>{item.outcome}</span>
      </div>
    </div>
  );
}

function OutcomeChart({ projection }) {
  return (
    <div className="pulse-detail-card pulse-detail-card--large-chart">
      <span className="pulse-section-label">Outcome projection - with and without mitigation</span>
      <svg viewBox="0 0 980 310" className="outcome-chart" role="img" aria-label="Outcome projection">
        <line x1="54" y1="45" x2="54" y2="260" className="chart-axis" />
        <line x1="54" y1="260" x2="930" y2="260" className="chart-axis" />
        <text x="20" y="50" className="chart-label">10k</text>
        <text x="26" y="150" className="chart-label">5k</text>
        <text x="34" y="260" className="chart-label">0</text>
        <path d="M54 238 C250 190, 430 120, 900 56" className="chart-line chart-line--green" />
        <path d="M54 238 C260 198, 470 150, 900 90" className="chart-line chart-line--blue-dotted" />
        <path d="M54 238 C260 220, 520 190, 900 160" className="chart-line chart-line--red-dashed" />
        <circle cx="900" cy="56" r="6" className="chart-point chart-point--green" />
        <circle cx="900" cy="90" r="6" className="chart-point chart-point--blue" />
        <circle cx="900" cy="160" r="6" className="chart-point" />
        <text x="782" y="42" className="chart-final-label chart-final-label--green">{projection.labels[0]}</text>
        <text x="742" y="106" className="chart-final-label chart-final-label--blue">{projection.labels[1]}</text>
        <text x="786" y="176" className="chart-final-label">{projection.labels[2]}</text>
        {projection.xAxis.map((label, index) => (
          <text key={label} x={54 + index * 210} y="292" className="chart-label chart-label--x">
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function MitigationCard({ item }) {
  const preservedTone = item.preserved.startsWith('2,100') ? 'positive' : 'warning';

  return (
    <div className="mitigation-card">
      {item.badge && <span className="signal-badge signal-badge--opportunity">{item.badge}</span>}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <dl>
        <dt>Additional cost</dt>
        <dd>{item.cost}</dd>
        <dt>Outcomes preserved</dt>
        <dd className={`mitigation-card__value mitigation-card__value--${preservedTone}`}>{item.preserved}</dd>
        <dt>{item.unitCostLabel || 'Cost per outcome'}</dt>
        <dd>{item.unitCost}</dd>
      </dl>
    </div>
  );
}

function ModelImpactPage({ page }) {
  return (
    <div className="pulse-detail-page">
      <section className="pulse-detail-hero">
        <div>
          <div className="pulse-detail-hero__meta">
            <span className="signal-badge signal-badge--critical">{page.eyebrow}</span>
            <span>Modeling impact on your active programs</span>
          </div>
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
        </div>
        <ActionButton tone="dark" icon={Download}>Export model</ActionButton>
      </section>

      <section className="pulse-detail-stats">
        {page.stats.map((stat) => <DetailStat key={stat.label} stat={stat} />)}
      </section>

      <section className="pulse-detail-section">
        <span className="pulse-section-label">Programs in the exposure zone</span>
        <div className="exposure-list">
          {page.exposure.map((item) => <ExposureItem key={item.title} item={item} />)}
        </div>
      </section>

      <OutcomeChart projection={page.projection} />

      <section className="pulse-detail-section">
        <span className="pulse-section-label">Three mitigation paths to consider</span>
        <div className="mitigation-grid">
          {page.mitigations.map((item) => <MitigationCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="pulse-recommendation pulse-recommendation--compact">
        <Info size={18} />
        <p>{page.note}</p>
      </section>

      <section className="pulse-committee">
        <h2>For your decision committee</h2>
        <p>The platform projects scenarios; your committee chooses the path. Export this model to support that conversation.</p>
        <div className="pulse-next-actions">
          {page.nextActions.map((action) => <ActionButton key={action} icon={getActionIcon(action)}>{action}</ActionButton>)}
        </div>
      </section>
    </div>
  );
}

function AllocationCard({ allocation, isNew = false }) {
  return (
    <div className="pulse-detail-card allocation-card">
      <div className="allocation-card__header">
        <span className="pulse-section-label">{allocation.title}</span>
        <span className="allocation-card__total">
          {allocation.total}
          {allocation.totalChange && <span>{allocation.totalChange}</span>}
        </span>
      </div>
      <span className="allocation-card__label">Projected lives impacted</span>
      <div className="allocation-card__rows">
        {allocation.rows.map((row) => (
          <div key={row.label} className="allocation-row">
            <div className="allocation-row__top">
              <span>{row.label}</span>
              <span>
                {row.amount} - {row.share}
                {row.delta && <em className={row.delta.startsWith('+') ? 'positive' : 'negative'}> {row.delta}</em>}
              </span>
            </div>
            <div className="allocation-row__track">
              <span className={`allocation-row__bar ${isNew ? 'allocation-row__bar--new' : ''}`} style={{ width: `${row.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompassRerunPage({ page }) {
  return (
    <div className="pulse-detail-page pulse-detail-page--compact">
      <section className="pulse-detail-hero">
        <div>
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
        </div>
        <div className="pulse-detail-hero__actions">
          <ActionButton icon={RotateCcw}>Allocation history</ActionButton>
          <ActionButton tone="dark" icon={Download}>Export comparison</ActionButton>
        </div>
      </section>

      <section className="pulse-recommendation pulse-recommendation--compact">
        <Info size={18} />
        <p>{page.insight}</p>
      </section>

      <section className="allocation-grid">
        <AllocationCard allocation={page.allocations[0]} />
        <AllocationCard allocation={page.allocations[1]} isNew />
      </section>

      <section className="change-card">
        <span className="pulse-section-label">What changed and why</span>
        {page.changes.map((change, index) => {
          const ChangeIcon = index === 0 ? ArrowUpRight : ArrowDownRight;
          return (
          <div key={change.title} className="change-item">
            <span className={`change-item__icon change-item__icon--${index === 0 ? 'up' : 'down'}`}>
              <ChangeIcon size={16} />
            </span>
            <div>
              <h2>{change.title}</h2>
              <p>{change.body}</p>
            </div>
          </div>
          );
        })}
      </section>

      <section className="pulse-detail-stats pulse-detail-stats--three">
        {page.stats.map((stat) => <DetailStat key={stat.label} stat={stat} />)}
      </section>

      <section className="pulse-committee">
        <h2>For your decision committee</h2>
        <p>This is intelligence, not an instruction. The platform recommends discussing this rebalance with your stakeholders before any external commitments.</p>
        <div className="pulse-next-actions">
          {page.nextActions.map((action) => <ActionButton key={action} icon={getActionIcon(action)}>{action}</ActionButton>)}
        </div>
      </section>
    </div>
  );
}

export default function PulseActionPage({ pageType }) {
  const { signalId } = useParams();
  const signal = getSignal(signalId);
  const page = pulseActionPages[signalId];

  if (!signal || !page || (pageType !== 'export-brief' && page.type !== pageType)) {
    return <Navigate to="/pulse" replace />;
  }

  if (pageType === 'export-brief') {
    return <ExportBriefPage signal={signal} page={page} />;
  }

  if (page.type === 'take-action') {
    return <TakeActionPage signal={signal} page={page} />;
  }

  if (page.type === 'model-impact') {
    return <ModelImpactPage page={page} />;
  }

  return <CompassRerunPage page={page} />;
}
