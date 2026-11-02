import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/projects';
import { GithubIcon, ExternalLinkIcon } from './Icons';

type FilterCategory = 'All' | 'Full-Stack' | 'AI & Machine Learning' | 'Systems & Web';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-container" aria-labelledby="projects-heading">
      <div className="section-header">
        <div className="section-eyebrow">Production & Research</div>
        <h2 id="projects-heading" className="section-title">
          Featured Projects
        </h2>
        <p className="section-description">
          Core engineering initiatives spanning distributed machine learning pipelines, full-stack government services,
          and context-aware LLM architectures.
        </p>

        {/* Category Filter Tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Project categories">
          {(['All', 'Full-Stack', 'AI & Machine Learning', 'Systems & Web'] as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} {cat === 'All' ? `(${PROJECTS.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project: Project) => (
          <article
            key={project.id}
            className="project-card"
            aria-labelledby={`project-title-${project.id}`}
          >
            {/* Card Header */}
            <div className="project-card-header">
              <div className="project-badge-group">
                <span className={`status-badge ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
                <span className="category-badge">{project.category}</span>
              </div>

              <div className="project-links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-icon-link"
                  aria-label={`View ${project.title} source code on GitHub`}
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

            {/* Key Metrics Strip if available */}
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
        ))}
      </div>
    </section>
  );
};
