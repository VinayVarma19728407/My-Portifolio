import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/projects';
import { TerminalIcon } from './Icons';
import { TypewriterProjectCard } from './TypewriterBox';

type FilterCategory = 'All' | 'AI & Machine Learning' | 'Software Engineering' | 'Systems & Web';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handleNextCard = (index: number) => {
    setCurrentActiveIndex((prev) => Math.max(prev, index + 1));
  };

  return (
    <section id="projects" className="section-container" aria-labelledby="projects-heading">
      {/* Category Filter Tabs */}
      <div className="filter-tabs" role="tablist" aria-label="Project categories">
        {(['All', 'AI & Machine Learning', 'Software Engineering', 'Systems & Web'] as FilterCategory[]).map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentActiveIndex(0);
              setIsFastForward(false);
            }}
          >
            {cat} {cat === 'All' ? `(${PROJECTS.length})` : ''}
          </button>
        ))}
      </div>

      {/* Creation telemetry bar */}
      <div className="creation-telemetry-bar">
        <div className="telemetry-status">
          <TerminalIcon size={14} />
          <span>
            BOX-TO-TYPEWRITER SYNTHESIS: {Math.min(currentActiveIndex + 1, filteredProjects.length)} OF {filteredProjects.length} ACTIVE
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

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project: Project, index: number) => (
          <TypewriterProjectCard
            key={project.id}
            project={project}
            isActiveToCreate={index <= currentActiveIndex}
            isFastForward={isFastForward}
            onFinish={() => handleNextCard(index)}
          />
        ))}
      </div>
    </section>
  );
};
