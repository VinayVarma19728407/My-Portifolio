import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data/certifications';
import { TerminalIcon } from './Icons';
import { TypewriterCertCard } from './TypewriterCertCard';

export const CertificationsSection: React.FC = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);

  const handleNextCard = (index: number) => {
    setCurrentActiveIndex((prev) => Math.max(prev, index + 1));
  };

  return (
    <section id="certifications" className="section-container" aria-labelledby="certifications-heading">
      <div className="creation-telemetry-bar">
        <div className="telemetry-status">
          <TerminalIcon size={14} />
          <span>
            BOX CREATION & TYPEWRITER SYNTHESIS: {Math.min(currentActiveIndex + 1, CERTIFICATIONS.length)} OF {CERTIFICATIONS.length}
          </span>
        </div>
        {!isFastForward && (
          <button
            type="button"
            className="fast-forward-btn"
            onClick={() => setIsFastForward(true)}
          >
            ⏩ Reveal All Boxes Immediately
          </button>
        )}
      </div>

      <div className="certs-grid">
        {CERTIFICATIONS.map((cert, index) => (
          <TypewriterCertCard
            key={cert.id}
            cert={cert}
            isActiveToCreate={index <= currentActiveIndex}
            isFastForward={isFastForward}
            onFinish={() => handleNextCard(index)}
          />
        ))}
      </div>
    </section>
  );
};
