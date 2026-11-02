import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/skills';
import { TerminalIcon } from './Icons';
import { TypewriterSkillCard } from './TypewriterSkillCard';

export const SkillsSection: React.FC = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);

  const handleNextCard = (index: number) => {
    setCurrentActiveIndex((prev) => Math.max(prev, index + 1));
  };

  return (
    <section id="skills" className="section-container" aria-labelledby="skills-heading">
      <div className="creation-telemetry-bar">
        <div className="telemetry-status">
          <TerminalIcon size={14} />
          <span>
            BOX CREATION & TYPEWRITER SYNTHESIS: {Math.min(currentActiveIndex + 1, SKILL_CATEGORIES.length)} OF {SKILL_CATEGORIES.length}
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

      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat, index) => (
          <TypewriterSkillCard
            key={cat.category}
            cat={cat}
            isActiveToCreate={index <= currentActiveIndex}
            isFastForward={isFastForward}
            onFinish={() => handleNextCard(index)}
          />
        ))}
      </div>
    </section>
  );
};
