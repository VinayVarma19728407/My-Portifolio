import React, { useState, useEffect } from 'react';
import { AwardIcon, ExternalLinkIcon, CheckIcon } from './Icons';
import { Certification } from '../data/certifications';

interface TypewriterCertCardProps {
  cert: Certification;
  isActiveToCreate: boolean;
  isFastForward: boolean;
  onFinish: () => void;
}

export const TypewriterCertCard: React.FC<TypewriterCertCardProps> = ({
  cert,
  isActiveToCreate,
  isFastForward,
  onFinish,
}) => {
  const [boxCreated, setBoxCreated] = useState<boolean>(false);
  const [typingStarted, setTypingStarted] = useState<boolean>(false);
  const [typedTitle, setTypedTitle] = useState<string>('');
  const [typedDesc, setTypedDesc] = useState<string>('');
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (isFastForward) {
      setBoxCreated(true);
      setTypingStarted(true);
      setTypedTitle(cert.title);
      setTypedDesc(cert.description);
      setTypingComplete(true);
      onFinish();
      return;
    }

    if (!isActiveToCreate) return;

    // STEP 1: First create empty box
    setBoxCreated(true);

    // STEP 2: Wait 100ms before starting to type inside
    const waitTimer = setTimeout(() => {
      setTypingStarted(true);

      // STEP 3: Type title
      let titleIdx = 0;
      const titleTimer = setInterval(() => {
        if (titleIdx < cert.title.length) {
          setTypedTitle(cert.title.substring(0, titleIdx + 1));
          titleIdx++;
        } else {
          clearInterval(titleTimer);

          // Now type description
          let descIdx = 0;
          const descTimer = setInterval(() => {
            if (descIdx < cert.description.length) {
              setTypedDesc(cert.description.substring(0, descIdx + 8));
              descIdx += 8;
            } else {
              clearInterval(descTimer);
              setTypedDesc(cert.description);
              setTypingComplete(true);
              onFinish();
            }
          }, 14);
        }
      }, 20);
    }, 100);

    return () => {
      clearTimeout(waitTimer);
    };
  }, [isActiveToCreate, isFastForward, cert.title, cert.description]);

  if (!boxCreated && !isFastForward) {
    return (
      <div className="card-box-waiting">
        <span className="box-waiting-pulse">[QUEUED FOR SYNTHESIS...]</span>
      </div>
    );
  }

  return (
    <div
      className={`cert-card ${boxCreated ? 'card-box-active' : ''} ${
        typingComplete ? 'card-box-finished' : 'card-box-typing'
      }`}
    >
      {!typingComplete && (
        <div className="box-laser-tracer" aria-hidden="true"></div>
      )}

      <div className="cert-card-top">
        <div className="cert-icon-wrapper">
          <AwardIcon size={24} />
        </div>
        <div className="cert-badge-group">
          <span className="cert-badge">{cert.badgeText}</span>
          <span className={`block-status-pill ${typingComplete ? 'online' : 'generating'}`}>
            {typingComplete ? '✓ VERIFIED' : '⚡ TYPING CONTENT...'}
          </span>
        </div>
      </div>

      {typingStarted ? (
        <>
          <h3 className="cert-title">
            {typedTitle}
            {!typingComplete && <span className="blinking-cursor">█</span>}
          </h3>
          <div className="cert-issuer">{cert.issuer}</div>
          <div className="cert-program">{cert.program}</div>

          <p className="cert-desc">{typedDesc}</p>

          <div className="cert-skills-list">
            {cert.skillsLearned.map((skill) => (
              <span key={skill} className="cert-skill-tag">
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
                  aria-label={`Verify ${cert.title} online`}
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
                  aria-label={`View ${cert.title} PDF`}
                >
                  <span>View PDF</span>
                  <ExternalLinkIcon size={13} />
                </a>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="empty-box-placeholder">
          <span className="empty-box-text">
            BOX CREATED // WAITING 100ms // INITIALIZING TYPEWRITER STREAM...
          </span>
        </div>
      )}
    </div>
  );
};
