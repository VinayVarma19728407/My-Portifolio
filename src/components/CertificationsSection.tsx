import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data/certifications';
import { TerminalIcon, CheckIcon } from './Icons';
import { TypewriterCertCard } from './TypewriterCertCard';

export const CertificationsSection: React.FC = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [isFastForward] = useState<boolean>(false);
  const [isAllComplete, setIsAllComplete] = useState<boolean>(false);

  const handleNextCard = (index: number) => {
    if (index >= CERTIFICATIONS.length - 1) {
      setIsAllComplete(true);
    } else {
      setCurrentActiveIndex((prev) => Math.max(prev, index + 1));
    }
  };

  

  return (
    <section id="certifications" className="section-container" aria-labelledby="certifications-heading">
      <div className="creation-telemetry-bar">
        <div className="telemetry-status">
          {isAllComplete ? (
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckIcon size={14} />
              <span>SYNTHESIS COMPLETE // ALL {CERTIFICATIONS.length} CERTIFICATES VERIFIED</span>
            </span>
          ) : (
            <>
              <TerminalIcon size={14} />
              <span>
                BOX CREATION & TYPEWRITER SYNTHESIS: {Math.min(currentActiveIndex + 1, CERTIFICATIONS.length)} OF {CERTIFICATIONS.length}
              </span>
            </>
          )}
        </div>

        {/* Present while typing, completely removed after content is fully written */}
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
