import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, MailIcon, MapPinIcon, TerminalIcon } from './Icons';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Sequence stages:
  // stage 1: Only name is visible
  // stage 2: (after 2s) Content below it appears
  // stage 3: (after another 2s) Picture appears
  const [stage, setStage] = useState<number>(1);

  useEffect(() => {
    // Stage 1 -> Stage 2 after 2000ms
    const timer1 = setTimeout(() => {
      setStage(2);

      // Stage 2 -> Stage 3 after another 2000ms
      const timer2 = setTimeout(() => {
        setStage(3);
      }, 2000);

      return () => clearTimeout(timer2);
    }, 2000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <section id="about" className="hero-section" aria-labelledby="hero-name">
      <div className="hero-container">
        <div className="hero-grid">
          
          {/* Left Column: Text & Sequential Content */}
          <div className="hero-content">
            
            {/* STAGE 1: Name appears first */}
            <div className="hero-name-container animate-fade-in">
              <div className="status-badge-container">
                <span className="live-pulse-dot" aria-hidden="true"></span>
                <span className="status-badge-text">Available for Software & Machine Learning Roles</span>
              </div>

              <h1 id="hero-name" className="hero-title">
                Hi, I'm <span className="text-gradient">Ganapathiraju Vinay Kumar Varma</span>
              </h1>
            </div>

            {/* STAGE 2: Content below it appears after 2s delay */}
            {stage >= 2 && (
              <div className="hero-subcontent animate-fade-in">
                <p className="hero-subtitle">
                  Software & Machine Learning Engineer • B.Tech CSE (AIML) @ VIT Chennai
                </p>

                <p className="hero-bio">
                  I specialize in engineering scalable 3-tier platforms, reinforcement learning schedulers, 
                  and explainable AI systems. I combine practical industrial data engineering (RINL Vizag Steel Plant) 
                  with modern software development and rigorous machine learning research.
                </p>

                <div className="hero-meta-row">
                  <div className="meta-item">
                    <MapPinIcon size={16} className="meta-icon" />
                    <span>Chennai & Visakhapatnam, India</span>
                  </div>
                  <div className="meta-item">
                    <TerminalIcon size={16} className="meta-icon" />
                    <span>GPA: <strong>8.88 / 10.00</strong></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="hero-actions">
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="btn btn-primary"
                  >
                    View Projects →
                  </button>
                  <a
                    href="#contact"
                    className="btn btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get In Touch
                  </a>
                </div>

                {/* Social Links Bar */}
                <div className="hero-socials" aria-label="Professional Profiles">
                  <a
                    href="https://github.com/VinayVarma19728407"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    aria-label="GitHub Profile (opens in new tab)"
                  >
                    <GithubIcon size={18} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/feed/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    aria-label="LinkedIn Profile (opens in new tab)"
                  >
                    <LinkedinIcon size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://leetcode.com/u/Vinay_Kumar_Varma/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    aria-label="LeetCode Profile (opens in new tab)"
                  >
                    <LeetcodeIcon size={18} />
                    <span>LeetCode</span>
                  </a>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=gvkvarma99999@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    aria-label="Send email via Gmail"
                  >
                    <MailIcon size={18} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Polished Photo Frame - STAGE 3: Appears after another 2s delay */}
          <div className="hero-visual">
            {stage >= 3 ? (
              <div className="photo-card animate-fade-in">
                <div className="photo-frame">
                  <img
                    src="/assets/avatar.jpg"
                    alt="Ganapathiraju Vinay Kumar Varma"
                    className="photo-img"
                    width="400"
                    height="480"
                    loading="eager"
                  />
                </div>

                {/* Photo Overlay Caption */}
                <div className="photo-badge">
                  <div className="photo-badge-inner">
                    <span className="photo-badge-title">Ganapathiraju Vinay Kumar Varma</span>
                    <span className="photo-badge-sub">VIT Chennai • Expected May 2028</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="photo-card-placeholder">
                <span className="photo-placeholder-text">
                  {stage === 1 ? '[INITIALIZING IDENTITY PROFILE...]' : '[MATERIALIZING VISUAL MATRIX IN 2s...]'}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
