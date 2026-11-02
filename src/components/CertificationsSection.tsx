import React, { useState, useEffect } from 'react';
import { CERTIFICATIONS } from '../data/certifications';
import { AwardIcon, ExternalLinkIcon, CheckIcon, TerminalIcon } from './Icons';

export const CertificationsSection: React.FC = () => {
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [fastForward, setFastForward] = useState<boolean>(false);

  useEffect(() => {
    if (fastForward) {
      setCreatedCount(CERTIFICATIONS.length);
      return;
    }

    setCreatedCount(0);
    // Progressively create cards on the spot
    const timer1 = setTimeout(() => setCreatedCount(1), 300);
    const timer2 = setTimeout(() => setCreatedCount(2), 1200);
    const timer3 = setTimeout(() => setCreatedCount(3), 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [fastForward]);

  return (
    <section id="certifications" className="section-container" aria-labelledby="certifications-heading">
      {/* On-the-spot creation telemetry bar */}
      <div className="creation-telemetry-bar">
        <div className="telemetry-status">
          <TerminalIcon size={14} />
          <span>SYNTHESIZING CERTIFICATE MODULES: {Math.min(createdCount, CERTIFICATIONS.length)} OF {CERTIFICATIONS.length} COMPLETED</span>
        </div>
        {createdCount < CERTIFICATIONS.length && (
          <button
            type="button"
            className="fast-forward-btn"
            onClick={() => setFastForward(true)}
          >
            ⏩ Fast-Forward Creation
          </button>
        )}
      </div>

      <div className="certs-grid">
        {CERTIFICATIONS.map((cert, index) => {
          const isCreated = createdCount > index;
          const isCurrentlyGenerating = createdCount === index;

          if (!isCreated && !isCurrentlyGenerating) {
            return (
              <div key={cert.id} className="cert-card-placeholder">
                <span className="placeholder-text">[WAITING FOR SYNTHESIS ENGINE: BLOCK {index + 1}...]</span>
              </div>
            );
          }

          return (
            <div
              key={cert.id}
              className={`cert-card ${isCreated ? 'card-materialized' : 'card-generating'}`}
            >
              {/* Animated Laser Construction Beam */}
              {!isCreated && isCurrentlyGenerating && (
                <div className="construction-laser-beam" aria-hidden="true"></div>
              )}

              <div className="cert-card-top">
                <div className="cert-icon-wrapper">
                  <AwardIcon size={24} />
                </div>
                <div className="cert-badge-group">
                  <span className="cert-badge">{cert.badgeText}</span>
                  <span className={`block-status-pill ${isCreated ? 'online' : 'generating'}`}>
                    {isCreated ? '✓ CREATED' : '⚡ BUILDING...'}
                  </span>
                </div>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer">{cert.issuer}</div>
              <div className="cert-program">{cert.program}</div>

              <p className="cert-desc">{cert.description}</p>

              <div className="cert-skills-list">
                {cert.skillsLearned.map((skill, sIdx) => (
                  <span
                    key={skill}
                    className="cert-skill-tag"
                    style={{ animationDelay: `${sIdx * 0.1}s` }}
                  >
                    <CheckIcon size={12} />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>

              <div className="cert-footer">
                <span className="cert-date">Issued: {cert.issueDate}</span>

                <div className="cert-action-links">
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-link"
                      aria-label={`Verify ${cert.title} certificate online`}
                    >
                      <span>Verify</span>
                      <ExternalLinkIcon size={13} />
                    </a>
                  )}
                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-link"
                      aria-label={`View ${cert.title} PDF certificate`}
                    >
                      <span>View PDF</span>
                      <ExternalLinkIcon size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
