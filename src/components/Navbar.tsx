import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { key: 'about', label: 'About' },
    { key: 'projects', label: 'Projects' },
    { key: 'experience', label: 'Experience' },
    { key: 'skills', label: 'Skills' },
    { key: 'certifications', label: 'Certifications' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <button
          type="button"
          className="navbar-brand"
          onClick={() => handleNavClick('about')}
          aria-label="Home - About Ganapathiraju Vinay Kumar Varma"
        >
          <span className="brand-dot" aria-hidden="true"></span>
          <span className="brand-text">Ganapathiraju Vinay Kumar Varma</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  className={`nav-btn-link ${activeSection === item.key ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.key)}
                >
                  {item.label}
                  {activeSection === item.key && (
                    <span className="nav-active-pill" aria-hidden="true"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-cta-group">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => {
              if (activeSection !== 'about') {
                onSelectSection('about');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Contact
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  className={`mobile-nav-btn ${activeSection === item.key ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="mobile-cta-link"
                onClick={() => {
                  handleNavClick('about');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
              >
                Get in Touch →
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
