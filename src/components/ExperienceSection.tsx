import React, { useState } from 'react';
import { EXPERIENCES } from '../data/experience';
import { TerminalIcon } from './Icons';
import { TypewriterExperienceCard } from './TypewriterExperienceCard';

export const ExperienceSection: React.FC = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);

  const handleNextCard = (index: number) => {
    setCurrentActiveIndex((prev) => Math.max(prev, index + 1));
  };

  return (
    <section
      id="experience"
      className="section-container"
      aria-labelledby="experience-heading"
      onClick={() => setIsFastForward(true)}
    >

      <div className="timeline-container">
        {EXPERIENCES.map((item, index) => (
          <TypewriterExperienceCard
            key={item.id}
            item={item}
            isActiveToCreate={index <= currentActiveIndex}
            isFastForward={isFastForward}
            onFinish={() => handleNextCard(index)}
          />
        ))}
      </div>
    </section>
  );
};
