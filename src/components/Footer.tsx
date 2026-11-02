import React from 'react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">Ganapathiraju Vinay Kumar Varma</span>
            <p className="footer-tagline">
              Software & Machine Learning Engineer • B.Tech CSE (AIML), VIT Chennai.
            </p>
          </div>

          <div className="footer-links-group">
            <a
              href="https://github.com/VinayVarma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="footer-social-icon"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/VinayVarma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="footer-social-icon"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://leetcode.com/u/VinayVarma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="footer-social-icon"
            >
              <LeetcodeIcon size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} Ganapathiraju Vinay Kumar Varma. Static architecture built for Vercel.
          </p>
          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
