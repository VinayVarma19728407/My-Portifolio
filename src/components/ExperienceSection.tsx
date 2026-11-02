import React, { useState, useEffect } from 'react';
import { EXPERIENCES } from '../data/experience';
import { BriefcaseIcon, MapPinIcon, TerminalIcon } from './Icons';

export const ExperienceSection: React.FC = () => {
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [fastForward, setFastForward] = useState<boolean>(false);

  useEffect(() => {
    if (fastForward) {
      setCreatedCount(EXPERIENCES.length);
      return;
    }

    setCreatedCount(0);
    const timer1 = setTimeout(() => setCreatedCount(1), 300);
    const timer2 = setTimeout(() => setCreatedCount(2), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [fastForward]);

  return (
    <section id="experience" className="section-container" aria-labelledby="experience-heading">
      {/* Telemetry bar */}
      <div className="creation-telemetry-bar">
        <div className="telemetry-status">
          <TerminalIcon size={14} />
          <span>SYNTHESIZING CAREER & ACADEMIC MODULES: {Math.min(createdCount, EXPERIENCES.length)} OF {EXPERIENCES.length} LOADED</span>
        </div>
        {createdCount < EXPERIENCES.length && (
          <button
            type="button"
            className="fast-forward-btn"
            onClick={() => setFastForward(true)}
          >
            ⏩ Fast-Forward Blocks
          </button>
        )}
      </div>

      <div className="timeline-container">
        {EXPERIENCES.map((item, index) => {
          const isCreated = createdCount > index;
          const isCurrentlyGenerating = createdCount === index;

          if (!isCreated && !isCurrentlyGenerating) {
            return (
              <div key={item.id} className="timeline-card-placeholder">
                <span className="placeholder-text">[BUFFERING EXPERIENCE RECORD: BLOCK {index + 1}...]</span>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`timeline-card ${isCreated ? 'card-materialized' : 'card-generating'}`}
            >
              {!isCreated && isCurrentlyGenerating && (
                <div className="construction-laser-beam" aria-hidden="true"></div>
              )}

              <div className="timeline-aside">
                <div className="timeline-marker">
                  <BriefcaseIcon size={18} />
                </div>
                <span className="timeline-type-pill">{item.type}</span>
                <time className="timeline-period">{item.period}</time>
                <span className={`block-status-pill ${isCreated ? 'online' : 'generating'}`}>
                  {isCreated ? '✓ RECORD VERIFIED' : '⚡ PARSING...'}
                </span>
              </div>

              <div className="timeline-body">
                <div className="timeline-headline">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <div className="timeline-org">
                      <strong>{item.organization}</strong>
                      {item.department && <span className="timeline-dept"> • {item.department}</span>}
                    </div>
                  </div>
                  <div className="timeline-location">
                    <MapPinIcon size={14} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="timeline-summary">{item.summary}</p>

                <div className="timeline-achievements">
                  <span className="achievements-label">Key Responsibilities & Outcomes:</span>
                  <ul>
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="timeline-skills">
                  {item.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
