import React, { useState, useEffect } from 'react';
import { GithubIcon, ExternalLinkIcon } from './Icons';
import { Project } from '../data/projects';

interface TypewriterProjectCardProps {
  project: Project;
  isActiveToCreate: boolean;
  isFastForward: boolean;
  onFinish: () => void;
}

export const TypewriterProjectCard: React.FC<TypewriterProjectCardProps> = ({
  project,
  isActiveToCreate,
  isFastForward,
  onFinish,
}) => {
  const [boxCreated, setBoxCreated] = useState<boolean>(false);
  const [typingStarted, setTypingStarted] = useState<boolean>(false);
  const [typedTitle, setTypedTitle] = useState<string>('');
  const [typedSummary, setTypedSummary] = useState<string>('');
  const [typedHighlights, setTypedHighlights] = useState<string[]>([]);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number>(0);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (isFastForward) {
      setBoxCreated(true);
      setTypingStarted(true);
      setTypedTitle(project.title);
      setTypedSummary(project.summary);
      setTypedHighlights(project.highlights);
      setTypingComplete(true);
      onFinish();
      return;
    }

    if (!isActiveToCreate) return;

    // STEP 1: First create the empty box
    setBoxCreated(true);

    // STEP 2: Wait 100ms before starting to type content inside the box
    const waitTimer = setTimeout(() => {
      setTypingStarted(true);

      // STEP 3: Type the title character by character
      let charIdx = 0;
      const titleTimer = setInterval(() => {
        if (charIdx < project.title.length) {
          setTypedTitle(project.title.substring(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(titleTimer);

          // Now type summary characters
          let sumIdx = 0;
          const sumTimer = setInterval(() => {
            if (sumIdx < project.summary.length) {
              setTypedSummary(project.summary.substring(0, sumIdx + 4));
              sumIdx += 4;
            } else {
              clearInterval(sumTimer);
              setTypedSummary(project.summary);

              // Now progressively type each Architectural Highlight bullet!
              let currentHl = 0;
              let currentHlChar = 0;
              const hlList = project.highlights;
              const accumulated: string[] = [];

              const hlTimer = setInterval(() => {
                if (currentHl < hlList.length) {
                  const targetHlText = hlList[currentHl];
                  if (currentHlChar < targetHlText.length) {
                    const partialText = targetHlText.substring(0, currentHlChar + 3);
                    currentHlChar += 3;
                    const nextAccumulated = [...accumulated];
                    nextAccumulated[currentHl] = partialText;
                    setTypedHighlights(nextAccumulated);
                    setActiveHighlightIndex(currentHl);
                  } else {
                    accumulated[currentHl] = targetHlText;
                    setTypedHighlights([...accumulated]);
                    currentHl++;
                    currentHlChar = 0;
                  }
                } else {
                  clearInterval(hlTimer);
                  setTypedHighlights(project.highlights);
                  setTypingComplete(true);
                  // Notify parent that this card finished so next card can create its box
                  onFinish();
                }
              }, 18);
            }
          }, 14);
        }
      }, 20);
    }, 100);

    return () => {
      clearTimeout(waitTimer);
    };
  }, [isActiveToCreate, isFastForward, project.title, project.summary, project.highlights]);

  if (!boxCreated && !isFastForward) {
    return (
      <div className="card-box-waiting">
        <span className="box-waiting-pulse">[QUEUED FOR CONSTRUCTION...]</span>
      </div>
    );
  }

  return (
    <article
      className={`project-card ${boxCreated ? 'card-box-active' : ''} ${
        typingComplete ? 'card-box-finished' : 'card-box-typing'
      }`}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Laser outline tracing beam during active construction */}
      {!typingComplete && (
        <div className="box-laser-tracer" aria-hidden="true"></div>
      )}

      {/* Top Header of the Box */}
      <div className="project-card-header">
        <div className="project-badge-group">
          <span className="status-badge completed">
            {project.status}
          </span>
          <span className="category-badge">{project.category}</span>
          <span className={`block-status-pill ${typingComplete ? 'online' : 'generating'}`}>
            {typingComplete ? '✓ COMPILED' : '⚡ TYPING CONTENT...'}
          </span>
        </div>

        {typingStarted && (
          <div className="project-links">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-link"
              aria-label={`View ${project.title} on GitHub`}
              title="View on GitHub"
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
              <ExternalLinkIcon size={14} />
            </a>
          </div>
        )}
      </div>

      {/* Content being typed inside the created box */}
      {typingStarted ? (
        <>
          <h3 id={`project-title-${project.id}`} className="project-title">
            {typedTitle}
            {!typingComplete && <span className="blinking-cursor">█</span>}
          </h3>

          <p className="project-tagline">{project.tagline}</p>
          <p className="project-summary">{typedSummary}</p>

          {/* Metrics inside box */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="project-metrics" aria-label="Key Project Metrics">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="metric-box">
                  <span className="metric-val">{m.value}</span>
                  <span className="metric-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Architectural Highlights being typed live */}
          <div className="project-highlights-block">
            <span className="highlights-title">Key Architectural Highlights:</span>
            <ul className="project-highlights-list">
              {typedHighlights.map((highlight, idx) => (
                <li key={idx}>
                  {highlight}
                  {!typingComplete && activeHighlightIndex === idx && (
                    <span className="blinking-cursor">█</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack tags */}
          <div className="project-footer">
            <div className="tech-tags-list" aria-label="Technologies Used">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Empty Box State (Waiting for 100ms before typing begins) */
        <div className="empty-box-placeholder">
          <span className="empty-box-text">
            BOX CREATED // WAITING 100ms // INITIALIZING TYPEWRITER STREAM...
          </span>
        </div>
      )}
    </article>
  );
};
