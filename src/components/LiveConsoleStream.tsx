import React, { useState, useEffect } from 'react';
import { TerminalIcon, CheckIcon } from './Icons';

interface LiveConsoleStreamProps {
  sectionKey: string;
  sectionTitle: string;
  sectionSubtitle: string;
  terminalCommand: string;
  children: React.ReactNode;
  onBackToAbout: () => void;
}

export const LiveConsoleStream: React.FC<LiveConsoleStreamProps> = ({
  sectionKey,
  sectionTitle,
  sectionSubtitle,
  terminalCommand,
  children,
  onBackToAbout,
}) => {
  const [typedTitle, setTypedTitle] = useState('');
  const [typedCommand, setTypedCommand] = useState('');
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isTypingTitle, setIsTypingTitle] = useState(false);
  const [streamReady, setStreamReady] = useState(false);
  const [fastForward, setFastForward] = useState(false);

  useEffect(() => {
    // Reset state whenever sectionKey changes
    setTypedTitle('');
    setTypedCommand('');
    setIsTypingCommand(true);
    setIsTypingTitle(false);
    setStreamReady(false);

    if (fastForward) {
      setTypedCommand(terminalCommand);
      setTypedTitle(sectionTitle);
      setIsTypingCommand(false);
      setIsTypingTitle(false);
      setStreamReady(true);
      return;
    }

    let cmdIdx = 0;
    const cmdInterval = setInterval(() => {
      if (cmdIdx < terminalCommand.length) {
        setTypedCommand(terminalCommand.substring(0, cmdIdx + 1));
        cmdIdx++;
      } else {
        clearInterval(cmdInterval);
        setIsTypingCommand(false);
        setIsTypingTitle(true);

        // Start typing title
        let titleIdx = 0;
        const titleInterval = setInterval(() => {
          if (titleIdx < sectionTitle.length) {
            setTypedTitle(sectionTitle.substring(0, titleIdx + 1));
            titleIdx++;
          } else {
            clearInterval(titleInterval);
            setIsTypingTitle(false);
            // Delay slightly before streaming contents
            setTimeout(() => setStreamReady(true), 150);
          }
        }, 22);
      }
    }, 18);

    return () => {
      clearInterval(cmdInterval);
    };
  }, [sectionKey, terminalCommand, sectionTitle, fastForward]);

  const handleInstantReveal = () => {
    setFastForward(true);
    setTypedCommand(terminalCommand);
    setTypedTitle(sectionTitle);
    setIsTypingCommand(false);
    setIsTypingTitle(false);
    setStreamReady(true);
  };

  return (
    <div className="console-stream-wrapper">
      {/* Top Interactive Navigation Bar for Stream */}
      <div className="stream-nav-bar">
        <button
          type="button"
          onClick={onBackToAbout}
          className="back-btn"
          aria-label="Return to About Page"
        >
          <span className="back-arrow">←</span>
          <span>Return to About Page</span>
        </button>

        <div className="stream-controls">
          <span className="live-stream-indicator">
            <span className="pulse-dot"></span>
            <span>DATA STREAM ACTIVE</span>
          </span>
          {!streamReady && (
            <button
              type="button"
              onClick={handleInstantReveal}
              className="skip-typing-btn"
              title="Skip typing animation"
            >
              Skip Animation ⏭
            </button>
          )}
        </div>
      </div>

      {/* Cybernetic Terminal Output Bar */}
      <div className="stream-terminal-box">
        <div className="terminal-topbar">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="terminal-title">
            <TerminalIcon size={14} />
            <span>SESSION://GV-VARMA/{sectionKey.toUpperCase()}</span>
          </div>
          <div className="terminal-badge">LIVE_REVEAL</div>
        </div>

        <div className="terminal-body">
          <div className="command-line">
            <span className="terminal-prompt">user@portfolio:~$</span>{' '}
            <span className="terminal-command-text">
              {typedCommand}
              {isTypingCommand && <span className="blinking-cursor">█</span>}
            </span>
          </div>

          {!isTypingCommand && (
            <div className="stream-status-row">
              <span className="status-success">
                <CheckIcon size={14} />
                <span>STREAM LOADED: 100% [READY]</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Live Typed Section Header */}
      <div className="stream-header-area">
        <div className="stream-eyebrow">
          <span>// MODULE: {sectionKey.toUpperCase()}</span>
        </div>
        <h2 className="stream-live-title">
          {typedTitle}
          {isTypingTitle && <span className="blinking-cursor title-cursor">█</span>}
        </h2>
        <p className="stream-live-subtitle">{sectionSubtitle}</p>
      </div>

      {/* Actual Data Payload (revealed smoothly) */}
      <div className={`stream-payload ${streamReady ? 'payload-visible' : 'payload-hidden'}`}>
        {children}
      </div>

      {/* Bottom Return Button */}
      {streamReady && (
        <div className="stream-footer-actions">
          <button
            type="button"
            onClick={onBackToAbout}
            className="btn btn-secondary back-to-about-large"
          >
            <span>← Return to About Overview</span>
          </button>
        </div>
      )}
    </div>
  );
};
