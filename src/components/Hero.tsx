import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, MailIcon, MapPinIcon, TerminalIcon } from './Icons';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const fullName = "Ganapathiraju Vinay Kumar Varma";
  const fullSubtitle = "Software & Machine Learning Engineer • B.Tech CSE (AIML) @ VIT Chennai";
  const fullBio = "I specialize in engineering scalable 3-tier platforms, reinforcement learning schedulers, and explainable AI systems. I combine practical industrial data engineering (RINL Vizag Steel Plant) with modern software development and rigorous machine learning research.";

  const [typedName, setTypedName] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [typedBio, setTypedBio] = useState('');

  const [nameDone, setNameDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [bioDone, setBioDone] = useState(false);
  const [photoReady, setPhotoReady] = useState(false);

  useEffect(() => {
    // 1. Type Name character-by-character
    let nameIdx = 0;
    const nameTimer = setInterval(() => {
      if (nameIdx < fullName.length) {
        setTypedName(fullName.substring(0, nameIdx + 1));
        nameIdx++;
      } else {
        clearInterval(nameTimer);
        setNameDone(true);

        // 2. Type Subtitle character-by-character
        let subIdx = 0;
        const subTimer = setInterval(() => {
          if (subIdx < fullSubtitle.length) {
            setTypedSubtitle(fullSubtitle.substring(0, subIdx + 2));
            subIdx += 2;
          } else {
            clearInterval(subTimer);
            setSubtitleDone(true);

            // 3. Type Bio character-by-character
            let bioIdx = 0;
            const bioTimer = setInterval(() => {
              if (bioIdx < fullBio.length) {
                setTypedBio(fullBio.substring(0, bioIdx + 4));
                bioIdx += 4;
              } else {
                clearInterval(bioTimer);
                setTypedBio(fullBio);
                setBioDone(true);

                // 4. Reveal photograph smoothly (without any time text)
                setTimeout(() => {
                  setPhotoReady(true);
                }, 200);
              }
            }, 12);
          }
        }, 16);
      }
    }, 25);

    return () => {
      clearInterval(nameTimer);
    };
  }, []);

  return (
    <section id="about" className="hero-section" aria-labelledby="hero-name">
      <div className="hero-container">
        <div className="hero-grid">
          
          {/* Left Column: Sequential Live Typing Model */}
          <div className="hero-content">
            
            {/* Status Badge */}
            <div className="status-badge-container">
              <span className="live-pulse-dot" aria-hidden="true"></span>
              <span className="status-badge-text">Available for Software & Machine Learning Roles</span>
            </div>

            {/* 1. Name typing model */}
            <h1 id="hero-name" className="hero-title">
              Hi, I'm <span className="text-white-glow">{typedName}</span>
              {!nameDone && <span className="blinking-cursor">█</span>}
            </h1>

            {/* 2. Subtitle typing model */}
            {nameDone && (
              <p className="hero-subtitle">
                {typedSubtitle}
                {!subtitleDone && <span className="blinking-cursor">█</span>}
              </p>
            )}

            {/* 3. Bio typing model */}
            {subtitleDone && (
              <p className="hero-bio">
                {typedBio}
                {!bioDone && <span className="blinking-cursor">█</span>}
              </p>
            )}

            {/* 4. Metadata, Buttons, and Socials when bio typing is complete */}
            {bioDone && (
              <div className="hero-actions-container animate-fade-in">
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

          {/* Right Column: Photograph - Materializes cleanly without any countdown time text */}
          <div className="hero-visual">
            <div className={`photo-card ${photoReady ? 'photo-visible' : 'photo-hidden'}`}>
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
          </div>

        </div>
      </div>
    </section>
  );
};
