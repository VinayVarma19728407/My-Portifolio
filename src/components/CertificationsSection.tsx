import React from 'react';
import { CERTIFICATIONS } from '../data/certifications';
import { AwardIcon, ExternalLinkIcon, CheckIcon } from './Icons';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="section-container" aria-labelledby="certifications-heading">
      <div className="section-header">
        <div className="section-eyebrow">Verified Credentials</div>
        <h2 id="certifications-heading" className="section-title">
          Certifications & Industrial Credentials
        </h2>
        <p className="section-description">
          Formal credentials in Artificial Intelligence foundations, Generative AI engineering, and industrial database systems.
        </p>
      </div>

      <div className="certs-grid">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert.id} className="cert-card">
            <div className="cert-card-top">
              <div className="cert-icon-wrapper">
                <AwardIcon size={24} />
              </div>
              <span className="cert-badge">{cert.badgeText}</span>
            </div>

            <h3 className="cert-title">{cert.title}</h3>
            <div className="cert-issuer">{cert.issuer}</div>
            <div className="cert-program">{cert.program}</div>

            <p className="cert-desc">{cert.description}</p>

            <div className="cert-skills-list">
              {cert.skillsLearned.map((skill) => (
                <span key={skill} className="cert-skill-tag">
                  <CheckIcon size={12} />
                  <span>{skill}</span>
                </span>
              ))}
            </div>

            <div className="cert-footer">
              <span className="cert-date">Issued: {cert.issueDate}</span>
              
              <div className="cert-action-links">
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                    aria-label={`Verify ${cert.title} certificate online`}
                  >
                    <span>Verify</span>
                    <ExternalLinkIcon size={13} />
                  </a>
                )}
                {cert.pdfUrl && (
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                    aria-label={`View ${cert.title} PDF certificate`}
                  >
                    <span>View PDF</span>
                    <ExternalLinkIcon size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
