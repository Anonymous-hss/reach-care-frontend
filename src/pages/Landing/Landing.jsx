import {
  BarChart3,
  Bot,
  Database,
  Globe2,
  LineChart,
  PackageCheck,
} from "lucide-react";
import "./Landing.css";
import Footer from "../../components/common/Footer";
import heroBackground from "../../assets/2. Hero Section.png";
import intelligencePreview from "../../assets/Background+Border.png";
import ComparisonTable from "./sections/ComparisonTable";
import HowItWorks from "./sections/HowItWorks";
import CaseStudy from "./sections/CaseStudy";
import CallToAction from "./sections/CallToAction";

const metrics = [
  { value: "4.5B", label: "Underserved Population" },
  { value: "127+", label: "Active Programs", accent: true },
  { value: "38", label: "Countries Scaled" },
  { value: "2.3M", label: "Lives Impacted" },
];

const intelligenceFeatures = [
  {
    icon: Database,
    title: "Unified Data Infrastructure",
    description:
      "Aggregates siloed health data into a single, high-fidelity clinical truth.",
  },
  {
    icon: Bot,
    title: "AI Recommendations",
    description:
      "Predictive models identify at-risk populations before crises occur.",
  },
  {
    icon: LineChart,
    title: "Real-time Insights",
    description:
      "Dynamic dashboards reflect current on-ground conditions across borders.",
  },
];

const capabilities = [
  {
    icon: Globe2,
    title: "Global Health Mapping",
    description:
      "Geospatial analysis identifying healthcare deserts and facility accessibility at a granular level.",
  },
  {
    icon: Bot,
    title: "AI Decision Engine",
    description:
      "Proprietary algorithms that rank clinical interventions based on potential impact and ROI.",
  },
  {
    icon: PackageCheck,
    title: "Resource Optimization",
    description:
      "Automated supply chain recommendations to prevent stockouts of critical medicine.",
  },
  {
    icon: BarChart3,
    title: "Program Tracking",
    description:
      "Audit-ready reporting on program efficacy and donor capital deployment.",
  },
];

export default function Landing() {
  return (
    <main className="landing">
      <nav className="landing__nav" aria-label="Primary">
        <a className="landing__brand" href="/" aria-label="Reach Care home">
          <span>Reach Care</span>
          <small>Clinical Curator</small>
        </a>
        <a className="landing__nav-button" href="/signup">
          Get Started
        </a>
      </nav>

      <section
        className="landing__hero"
        style={{ backgroundImage: `url("${heroBackground}")` }}
      >
        <div className="landing__hero-content">
          <h1>AI-powered decisions for global healthcare impact</h1>
          <p>
            Precision health allocation at scale. Identifying clinical gaps and
            optimizing resources where they matter most, powered by real-time
            intelligence.
          </p>
          <div className="landing__hero-actions">
            <a className="landing__primary-button" href="/home">
              Start Platform
            </a>
            <a className="landing__text-button" href="#methodology">
              View Methodology
            </a>
          </div>
        </div>
      </section>

      <section
        className="landing__metrics"
        aria-label="Reach Care impact metrics"
      >
        {metrics.map((metric) => (
          <div className="landing__metric" key={metric.label}>
            <strong
              className={metric.accent ? "landing__metric-value--accent" : ""}
            >
              {metric.value}
            </strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="landing__intelligence" id="methodology">
        <div className="landing__intelligence-copy">
          <span className="landing__eyebrow">The Framework</span>
          <h2>Unified Intelligence for Global Health</h2>
          <p>
            Traditional healthcare allocation is often fragmented and reactive.
            Care Compass provides a centralized operating system for clinical
            decision-making, turning raw data into actionable life-saving
            interventions.
          </p>

          <ul className="landing__feature-list">
            {intelligenceFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title}>
                  <Icon size={18} aria-hidden="true" />
                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.description}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="landing__preview-wrap">
          <img
            src={intelligencePreview}
            alt="ReachCare intelligence dashboard preview"
          />
        </div>
      </section>

      <section className="landing__capabilities">
        <div className="landing__capabilities-inner">
          <h2>Core Capabilities</h2>
          <div className="landing__capability-grid">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article
                  className="landing__capability-card"
                  key={capability.title}
                >
                  <Icon size={30} aria-hidden="true" />
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ComparisonTable />
      <HowItWorks />
      <CaseStudy />
      <CallToAction />

      <Footer />
    </main>
  );
}
