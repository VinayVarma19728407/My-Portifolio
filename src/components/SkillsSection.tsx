import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/skills';
import { TypewriterSkillCard } from './TypewriterSkillCard';

export const SkillsSection: React.FC = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);

  const handleNextCard = (index: number) => {
    setCurrentActiveIndex((prev) => Math.max(prev, index + 1));
  };

  return (
    <section
      id="skills"
      className="section-container"
      aria-labelledby="skills-heading"
      onClick={() => setIsFastForward(true)}
    >

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
