import React, { useState } from 'react';
import { TerminalIcon, ExternalLinkIcon } from './Icons';

interface IntroPortalProps {
  onEnter: () => void;
}

export const IntroPortal: React.FC<IntroPortalProps> = ({ onEnter }) => {
  const [isDiving, setIsDiving] = useState(false);

  const handleStartDive = () => {
    setIsDiving(true);
    // Deep tech dive animation plays, then triggers onEnter
    setTimeout(() => {
      onEnter();
    }, 1400);
  };

  return (
    <div className={`portal-overlay ${isDiving ? 'portal-diving' : ''}`}>
      {/* Warp Tunnel Effect Canvas / Rings */}
      <div className="warp-tunnel">
        <div className="warp-ring ring-1"></div>
        <div className="warp-ring ring-2"></div>
        <div className="warp-ring ring-3"></div>
        <div className="warp-ring ring-4"></div>
        <div className="warp-lines"></div>
      </div>

      <div className="portal-container">
        {/* Top Telemetry Tag */}
        <div className="portal-telemetry">
          <span className="telemetry-item">
            <span className="pulse-cyan" aria-hidden="true"></span>
            SYS_ONLINE // V.2026
          </span>
          <span className="telemetry-item">LOC: CHENNAI • VIZAG</span>
          <span className="telemetry-item">GPA: 8.88 / 10.00</span>
        </div>

        {/* Central HUD Card */}
        <div className="portal-hud">
          <div className="hud-corner top-left"></div>
          <div className="hud-corner top-right"></div>
          <div className="hud-corner bottom-left"></div>
          <div className="hud-corner bottom-right"></div>

          <div className="portal-badge">
            <TerminalIcon size={14} />
            <span>PORTFOLIO_SYSTEM // INITIALIZED</span>
          </div>

          <h1 className="portal-title">
            <span className="portal-first">GANAPATHIRAJU</span>
            <span className="portal-name-gradient">VINAY KUMAR VARMA</span>
          </h1>

          <p className="portal-role">
            Software & Machine Learning Engineer • B.Tech CSE (AIML) @ VIT Chennai
          </p>

          <p className="portal-description">
            Scalable 3-Tier Platforms • Reinforcement Learning (PPO) CPU Schedulers • Explainable AI Systems
          </p>

          {/* Dive Trigger Button */}
          <div className="portal-actions">
            <button
              type="button"
              className={`dive-btn ${isDiving ? 'btn-active' : ''}`}
              onClick={handleStartDive}
              disabled={isDiving}
              aria-label="Enter deep tech dive portfolio"
            >
              <span className="dive-glow"></span>
              <span className="dive-btn-content">
                {isDiving ? (
                  <>
                    <span className="dive-spinner"></span>
                    <span>WARPING INTO SYSTEM CORE...</span>
                  </>
                ) : (
                  <>
                    <span>ENTER DEEP TECH DIVE</span>
                    <ExternalLinkIcon size={16} />
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="portal-hint">
            Click to activate interactive terminal view with live typewriter streaming
          </div>
        </div>
      </div>
    </div>
  );
};
