import React from 'react';
import { TerminalIcon, ExternalLinkIcon } from './Icons';

interface IntroPortalProps {
  isDiving: boolean;
  isBlank: boolean;
  onStartDive: () => void;
}

export const IntroPortal: React.FC<IntroPortalProps> = ({ isDiving, isBlank, onStartDive }) => {
  // If blank or diving, hide portal completely so screen is 100% black / space dive
  if (isBlank || isDiving) {
    return null;
  }

  return (
    <div className="portal-overlay">
      <div className="portal-container">
        {/* Top Cosmic Telemetry Tag */}
        <div className="portal-telemetry">
          <span className="telemetry-item">
            <span className="pulse-gold" aria-hidden="true"></span>
            COSMIC_EXPEDITION // 2026
          </span>
          <span className="telemetry-item">COORDINATES: VIT CHENNAI • VIZAG</span>
          <span className="telemetry-item">STATUS: WARP READY</span>
        </div>

        {/* Central Space HUD Card */}
        <div className="portal-hud">
          <div className="hud-corner top-left"></div>
          <div className="hud-corner top-right"></div>
          <div className="hud-corner bottom-left"></div>
          <div className="hud-corner bottom-right"></div>

          <div className="portal-badge">
            <TerminalIcon size={14} />
            <span>INTERACTIVE PORTFOLIO SYSTEM</span>
          </div>

          <h1 className="portal-title">
            <span className="portal-first">GANAPATHIRAJU</span>
            <span className="portal-name-gradient">VINAY KUMAR VARMA</span>
          </h1>

          <p className="portal-role">
            Software & Machine Learning Engineer • B.Tech CSE (AIML) @ VIT Chennai
          </p>

          <p className="portal-description">
            Scalable full-stack systems, reinforcement learning CPU scheduling, and explainable AI applications.
          </p>

          {/* Space Dive Trigger Button */}
          <div className="portal-actions">
            <button
              type="button"
              className="dive-btn"
              onClick={onStartDive}
              aria-label="Enter Space Dive"
            >
              <span className="dive-glow"></span>
              <span className="dive-btn-content">
                <span>INITIALIZE SPACE DIVE</span>
                <ExternalLinkIcon size={16} />
              </span>
            </button>
          </div>

          <div className="portal-hint">
            Click to plunge through strings of golden & purple lights into colliding galaxies
          </div>
        </div>
      </div>
    </div>
  );
};
