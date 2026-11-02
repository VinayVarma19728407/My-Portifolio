import React, { useState, useEffect } from 'react';
import { PROJECTS, Project } from '../data/projects';
import { GithubIcon, ExternalLinkIcon, TerminalIcon } from './Icons';

type FilterCategory = 'All' | 'AI & Machine Learning' | 'Software Engineering' | 'Systems & Web';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [fastForward, setFastForward] = useState<boolean>(false);

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (fastForward) {
      setCreatedCount(filteredProjects.length);
      return;
    }

    setCreatedCount(0);
    const intervals: ReturnType<typeof setTimeout>[] = [];
    filteredProjects.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setCreatedCount((prev) => Math.max(prev, idx + 1));
      }, 250 + idx * 750);
      intervals.push(timer);
    });

    return () => {
      intervals.forEach((t) => clearTimeout(t));
    };
  }, [activeCategory, fastForward, filteredProjects.length]);

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
              setFastForward(false);
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
          <span>SYNTHESIZING PROJECTS ON-THE-SPOT: {Math.min(createdCount, filteredProjects.length)} OF {filteredProjects.length} COMPILED</span>
        </div>
        {createdCount < filteredProjects.length && (
          <button
            type="button"
            className="fast-forward-btn"
            onClick={() => setFastForward(true)}
          >
            ⏩ Fast-Forward Blocks
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project: Project, index: number) => {
          const isCreated = createdCount > index;
          const isCurrentlyGenerating = createdCount === index;

          if (!isCreated && !isCurrentlyGenerating) {
            return (
              <div key={project.id} className="project-card-placeholder">
                <span className="placeholder-text">[WAITING FOR COMPILER: BLOCK {index + 1}...]</span>
              </div>
            );
          }

          return (
            <article
              key={project.id}
              className={`project-card ${isCreated ? 'card-materialized' : 'card-generating'}`}
              aria-labelledby={`project-title-${project.id}`}
            >
              {/* Construction laser scan beam */}
              {!isCreated && isCurrentlyGenerating && (
                <div className="construction-laser-beam" aria-hidden="true"></div>
              )}

              {/* Card Header */}
              <div className="project-card-header">
                <div className="project-badge-group">
                  <span className="status-badge completed">
                    {project.status}
                  </span>
                  <span className="category-badge">{project.category}</span>
                  <span className={`block-status-pill ${isCreated ? 'online' : 'generating'}`}>
                    {isCreated ? '✓ ONLINE' : '⚡ RENDERING...'}
                  </span>
                </div>

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
              </div>

              {/* Title & Tagline */}
              <h3 id={`project-title-${project.id}`} className="project-title">
                {project.title}
              </h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-summary">{project.summary}</p>

              {/* Key Metrics Strip */}
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

              {/* Highlights List */}
              <div className="project-highlights-block">
                <span className="highlights-title">Key Architectural Highlights:</span>
                <ul className="project-highlights-list">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Footer */}
              <div className="project-footer">
                <div className="tech-tags-list" aria-label="Technologies Used">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
