import React from 'react';
import { SKILL_CATEGORIES } from '../data/skills';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="section-container" aria-labelledby="skills-heading">
      <div className="section-header">
        <div className="section-eyebrow">Technical Competencies</div>
        <h2 id="skills-heading" className="section-title">
          Skills & Tech Stack
        </h2>
        <p className="section-description">
          A structured inventory of languages, frameworks, algorithms, and infrastructure I leverage in software design.
        </p>
      </div>

      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="skill-category-card">
            <h3 className="skill-cat-title">{cat.category}</h3>
            <p className="skill-cat-desc">{cat.description}</p>

            <div className="skill-pills-wrap">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-badge-item">
                  <span className="skill-name">{skill.name}</span>
                  {skill.tag && <span className="skill-subtag">{skill.tag}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
