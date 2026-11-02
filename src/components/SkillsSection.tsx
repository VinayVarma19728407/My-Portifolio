import React, { useState, useEffect } from 'react';
import { SKILL_CATEGORIES } from '../data/skills';
import { TerminalIcon } from './Icons';

export const SkillsSection: React.FC = () => {
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [fastForward, setFastForward] = useState<boolean>(false);

  useEffect(() => {
    if (fastForward) {
      setCreatedCount(SKILL_CATEGORIES.length);
      return;
    }

    setCreatedCount(0);
    const intervals: ReturnType<typeof setTimeout>[] = [];
    SKILL_CATEGORIES.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setCreatedCount((prev) => Math.max(prev, idx + 1));
      }, 250 + idx * 600);
      intervals.push(timer);
    });

    return () => {
      intervals.forEach((t) => clearTimeout(t));
    };
  }, [fastForward]);

  return (
    <section id="skills" className="section-container" aria-labelledby="skills-heading">
      {/* Telemetry bar */}
      <div className="creation-telemetry-bar">
        <div className="telemetry-status">
          <TerminalIcon size={14} />
          <span>SYNTHESIZING SKILL REGISTRIES: {Math.min(createdCount, SKILL_CATEGORIES.length)} OF {SKILL_CATEGORIES.length} COMPILED</span>
        </div>
        {createdCount < SKILL_CATEGORIES.length && (
          <button
            type="button"
            className="fast-forward-btn"
            onClick={() => setFastForward(true)}
          >
            ⏩ Fast-Forward Blocks
          </button>
        )}
      </div>

      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat, index) => {
          const isCreated = createdCount > index;
          const isCurrentlyGenerating = createdCount === index;

          if (!isCreated && !isCurrentlyGenerating) {
            return (
              <div key={index} className="skill-card-placeholder">
                <span className="placeholder-text">[COMPILING SKILL MATRIX {index + 1}...]</span>
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`skill-category-card ${isCreated ? 'card-materialized' : 'card-generating'}`}
            >
              {!isCreated && isCurrentlyGenerating && (
                <div className="construction-laser-beam" aria-hidden="true"></div>
              )}

              <div className="skill-card-header">
                <h3 className="skill-cat-title">{cat.category}</h3>
                <span className={`block-status-pill ${isCreated ? 'online' : 'generating'}`}>
                  {isCreated ? '✓ COMPILED' : '⚡ LINKING...'}
                </span>
              </div>

              <p className="skill-cat-desc">{cat.description}</p>

              <div className="skill-pills-wrap">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="skill-badge-item"
                    style={{ animationDelay: `${sIdx * 0.08}s` }}
                  >
                    <span className="skill-name">{skill.name}</span>
                    {skill.tag && <span className="skill-subtag">{skill.tag}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
