import React from 'react';
import { EXPERIENCES } from '../data/experience';
import { BriefcaseIcon, MapPinIcon } from './Icons';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="section-container" aria-labelledby="experience-heading">
      <div className="section-header">
        <div className="section-eyebrow">Industry Experience & Education</div>
        <h2 id="experience-heading" className="section-title">
          Experience & Academic Background
        </h2>
        <p className="section-description">
          Industrial data engineering in heavy manufacturing automation alongside rigorous Computer Science & AI coursework.
        </p>
      </div>

      <div className="timeline-container">
        {EXPERIENCES.map((item) => (
          <div key={item.id} className="timeline-card">
            <div className="timeline-aside">
              <div className="timeline-marker">
                <BriefcaseIcon size={18} />
              </div>
              <span className="timeline-type-pill">{item.type}</span>
              <time className="timeline-period">{item.period}</time>
            </div>

            <div className="timeline-body">
              <div className="timeline-headline">
                <div>
                  <h3 className="timeline-role">{item.role}</h3>
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

              <p className="timeline-summary">{item.summary}</p>

              <div className="timeline-achievements">
                <span className="achievements-label">Key Responsibilities & Outcomes:</span>
                <ul>
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
