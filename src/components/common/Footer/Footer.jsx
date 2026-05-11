import './Footer.css';

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Impact Reports', href: '#reports' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Compliance', href: '#compliance' },
  ],
  connect: [
    { label: 'Contact', href: '#contact' },
    { label: 'Support', href: '#support' },
    { label: 'Documentation', href: '#docs' },
  ],
};

const offices = ['London', 'Nairobi', 'New York'];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Brand column */}
        <div className="footer__brand-col">
          <a className="footer__brand" href="/" aria-label="Reach Care home">
            <span>CARE COMPASS</span>
            <small>Clinical Curator</small>
          </a>
          <p className="footer__tagline">
            Pioneering algorithmic healthcare allocation to ensure no life is
            lost due to data invisibility.
          </p>
        </div>

        {/* Link columns */}
        <nav className="footer__links" aria-label="Footer navigation">
          <div className="footer__col">
            <h6 className="footer__col-heading">Company</h6>
            <ul>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h6 className="footer__col-heading">Legal</h6>
            <ul>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h6 className="footer__col-heading">Connect</h6>
            <ul>
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Care Compass. Precision in health
          allocation.
        </p>
        <ul className="footer__offices" aria-label="Office locations">
          {offices.map((city) => (
            <li key={city} className="footer__office">
              {city}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}