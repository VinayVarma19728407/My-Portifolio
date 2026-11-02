import React, { useState, useEffect } from 'react';
import { SkillCategory } from '../data/skills';

interface TypewriterSkillCardProps {
  cat: SkillCategory;
  isActiveToCreate: boolean;
  isFastForward: boolean;
  onFinish: () => void;
}

export const TypewriterSkillCard: React.FC<TypewriterSkillCardProps> = ({
  cat,
  isActiveToCreate,
  isFastForward,
  onFinish,
}) => {
  const [boxCreated, setBoxCreated] = useState<boolean>(false);
  const [typingStarted, setTypingStarted] = useState<boolean>(false);
  const [typedTitle, setTypedTitle] = useState<string>('');
  const [typedDesc, setTypedDesc] = useState<string>('');
  const [visibleSkillsCount, setVisibleSkillsCount] = useState<number>(0);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (isFastForward) {
      setBoxCreated(true);
      setTypingStarted(true);
      setTypedTitle(cat.category);
      setTypedDesc(cat.description);
      setVisibleSkillsCount(cat.skills.length);
      setTypingComplete(true);
      onFinish();
      return;
    }

    if (!isActiveToCreate) return;

    // STEP 1: Create empty box
    setBoxCreated(true);

    // STEP 2: Wait 100ms
    const waitTimer = setTimeout(() => {
      setTypingStarted(true);

      // STEP 3: Type title
      let tIdx = 0;
      const titleTimer = setInterval(() => {
        if (tIdx < cat.category.length) {
          setTypedTitle(cat.category.substring(0, tIdx + 1));
          tIdx++;
        } else {
          clearInterval(titleTimer);

          // Type description
          let dIdx = 0;
          const descTimer = setInterval(() => {
            if (dIdx < cat.description.length) {
              setTypedDesc(cat.description.substring(0, dIdx + 4));
              dIdx += 4;
            } else {
              clearInterval(descTimer);
              setTypedDesc(cat.description);

              // Progressively pop in skill pills
              let sCount = 0;
              const pillTimer = setInterval(() => {
                if (sCount < cat.skills.length) {
                  sCount++;
                  setVisibleSkillsCount(sCount);
                } else {
                  clearInterval(pillTimer);
                  setTypingComplete(true);
                  onFinish();
                }
              }, 60);
            }
          }, 14);
        }
      }, 20);
    }, 100);

    return () => {
      clearTimeout(waitTimer);
    };
  }, [isActiveToCreate, isFastForward, cat.category, cat.description, cat.skills.length]);

  if (!boxCreated && !isFastForward) {
    return (
      <div className="card-box-waiting">
        <span className="box-waiting-pulse">[QUEUED FOR MATRIX GENERATION...]</span>
      </div>
    );
  }

  return (
    <div
      className={`skill-category-card ${boxCreated ? 'card-box-active' : ''} ${
        typingComplete ? 'card-box-finished' : 'card-box-typing'
      }`}
    >
      {!typingComplete && (
        <div className="box-laser-tracer" aria-hidden="true"></div>
      )}

      {typingStarted ? (
        <>
          <div className="skill-card-header">
            <h3 className="skill-cat-title">
              {typedTitle}
              {!typingComplete && <span className="blinking-cursor">█</span>}
            </h3>
            <span className={`block-status-pill ${typingComplete ? 'online' : 'generating'}`}>
              {typingComplete ? '✓ COMPILED' : '⚡ ASSEMBLING...'}
            </span>
          </div>

          <p className="skill-cat-desc">{typedDesc}</p>

          <div className="skill-pills-wrap">
            {cat.skills.slice(0, visibleSkillsCount).map((skill, sIdx) => (
              <div key={sIdx} className="skill-badge-item card-snap-pill">
                <span className="skill-name">{skill.name}</span>
                {skill.tag && <span className="skill-subtag">{skill.tag}</span>}
              </div>
            ))}
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
