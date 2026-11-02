import React from 'react';
import { TerminalIcon, ExternalLinkIcon } from './Icons';

interface IntroPortalProps {
  isDiving: boolean;
  onStartDive: () => void;
}

export const IntroPortal: React.FC<IntroPortalProps> = ({ isDiving, onStartDive }) => {
  return (
    <div className={`portal-overlay ${isDiving ? 'portal-diving' : ''}`}>
      <div className="portal-container">
        {/* Top Cosmic Telemetry Tag */}
        <div className="portal-telemetry">
          <span className="telemetry-item">
            <span className="pulse-gold" aria-hidden="true"></span>
            COSMIC_CORE // V.2026
          </span>
          <span className="telemetry-item">COORDINATES: VIT CHENNAI • VIZAG</span>
          <span className="telemetry-item">STATUS: READY FOR WARP</span>
        </div>

        {/* Central Space HUD Card */}
        <div className="portal-hud">
          <div className="hud-corner top-left"></div>
          <div className="hud-corner top-right"></div>
          <div className="hud-corner bottom-left"></div>
          <div className="hud-corner bottom-right"></div>

          <div className="portal-badge">
            <TerminalIcon size={14} />
            <span>DEEP TECH SPACE DIVE // READY</span>
          </div>

          <h1 className="portal-title">
            <span className="portal-first">GANAPATHIRAJU</span>
            <span className="portal-name-gradient">VINAY KUMAR VARMA</span>
          </h1>

          <p className="portal-role">
            Software & Machine Learning Engineer • B.Tech CSE (AIML) @ VIT Chennai
          </p>

          <p className="portal-description">
            Interactive system architecture, reinforcement learning CPU optimization, and explainable AI systems.
          </p>

          {/* Space Dive Trigger Button */}
          <div className="portal-actions">
            <button
              type="button"
              className={`dive-btn ${isDiving ? 'btn-active' : ''}`}
              onClick={onStartDive}
              disabled={isDiving}
              aria-label="Enter Space Dive"
            >
              <span className="dive-glow"></span>
              <span className="dive-btn-content">
                {isDiving ? (
                  <>
                    <span className="dive-spinner"></span>
                    <span>WARPING INTO DEEP SPACE...</span>
                  </>
                ) : (
                  <>
                    <span>INITIALIZE SPACE DIVE</span>
                    <ExternalLinkIcon size={16} />
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="portal-hint">
            Step through strings of golden & purple lights to unlock live-streamed portfolio
          </div>
        </div>
      </div>
    </div>
  );
};
