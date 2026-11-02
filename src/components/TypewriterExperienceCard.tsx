import React, { useState, useEffect } from 'react';
import { BriefcaseIcon, MapPinIcon } from './Icons';
import { ExperienceItem } from '../data/experience';

interface TypewriterExperienceCardProps {
  item: ExperienceItem;
  isActiveToCreate: boolean;
  isFastForward: boolean;
  onFinish: () => void;
}

export const TypewriterExperienceCard: React.FC<TypewriterExperienceCardProps> = ({
  item,
  isActiveToCreate,
  isFastForward,
  onFinish,
}) => {
  const [boxCreated, setBoxCreated] = useState<boolean>(false);
  const [typingStarted, setTypingStarted] = useState<boolean>(false);
  const [typedRole, setTypedRole] = useState<string>('');
  const [typedSummary, setTypedSummary] = useState<string>('');
  const [typedAchievements, setTypedAchievements] = useState<string[]>([]);
  const [activeAchIndex, setActiveAchIndex] = useState<number>(0);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (isFastForward) {
      setBoxCreated(true);
      setTypingStarted(true);
      setTypedRole(item.role);
      setTypedSummary(item.summary);
      setTypedAchievements(item.achievements);
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

      // STEP 3: Type role
      let rIdx = 0;
      const roleTimer = setInterval(() => {
        if (rIdx < item.role.length) {
          setTypedRole(item.role.substring(0, rIdx + 1));
          rIdx++;
        } else {
          clearInterval(roleTimer);

          // Type summary
          let sIdx = 0;
          const sumTimer = setInterval(() => {
            if (sIdx < item.summary.length) {
              setTypedSummary(item.summary.substring(0, sIdx + 4));
              sIdx += 4;
            } else {
              clearInterval(sumTimer);
              setTypedSummary(item.summary);

              // Progressively type out achievements
              let curAch = 0;
              let curAchChar = 0;
              const achList = item.achievements;
              const accumulated: string[] = [];

              const achTimer = setInterval(() => {
                if (curAch < achList.length) {
                  const targetText = achList[curAch];
                  if (curAchChar < targetText.length) {
                    const partialText = targetText.substring(0, curAchChar + 4);
                    curAchChar += 4;
                    const nextAcc = [...accumulated];
                    nextAcc[curAch] = partialText;
                    setTypedAchievements(nextAcc);
                    setActiveAchIndex(curAch);
                  } else {
                    accumulated[curAch] = targetText;
                    setTypedAchievements([...accumulated]);
                    curAch++;
                    curAchChar = 0;
                  }
                } else {
                  clearInterval(achTimer);
                  setTypedAchievements(item.achievements);
                  setTypingComplete(true);
                  onFinish();
                }
              }, 16);
            }
          }, 14);
        }
      }, 20);
    }, 100);

    return () => {
      clearTimeout(waitTimer);
    };
  }, [isActiveToCreate, isFastForward, item.role, item.summary, item.achievements]);

  if (!boxCreated && !isFastForward) {
    return (
      <div className="card-box-waiting">
        <span className="box-waiting-pulse">[QUEUED FOR TIMELINE PARSING...]</span>
      </div>
    );
  }

  return (
    <div
      className={`timeline-card ${boxCreated ? 'card-box-active' : ''} ${
        typingComplete ? 'card-box-finished' : 'card-box-typing'
      }`}
    >
      {!typingComplete && (
        <div className="box-laser-tracer" aria-hidden="true"></div>
      )}

      <div className="timeline-aside">
        <div className="timeline-marker">
          <BriefcaseIcon size={18} />
        </div>
        <span className="timeline-type-pill">{item.type}</span>
        <time className="timeline-period">{item.period}</time>
        <span className={`block-status-pill ${typingComplete ? 'online' : 'generating'}`}>
          {typingComplete ? '✓ VERIFIED' : '⚡ TYPING CONTENT...'}
        </span>
      </div>

      <div className="timeline-body">
        {typingStarted ? (
          <>
            <div className="timeline-headline">
              <div>
                <h3 className="timeline-role">
                  {typedRole}
                  {!typingComplete && <span className="blinking-cursor">█</span>}
                </h3>
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

            <p className="timeline-summary">{typedSummary}</p>

            <div className="timeline-achievements">
              <span className="achievements-label">Key Responsibilities & Outcomes:</span>
              <ul>
                {typedAchievements.map((achievement, idx) => (
                  <li key={idx}>
                    {achievement}
                    {!typingComplete && activeAchIndex === idx && (
                      <span className="blinking-cursor">█</span>
                    )}
                  </li>
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
          </>
        ) : (
          <div className="empty-box-placeholder">
            <span className="empty-box-text">
              BOX CREATED // WAITING 100ms // INITIALIZING TYPEWRITER STREAM...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
