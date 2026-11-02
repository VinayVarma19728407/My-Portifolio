import React from 'react';
import { CERTIFICATIONS } from '../data/certifications';
import { AwardIcon, ExternalLinkIcon, CheckIcon } from './Icons';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="section-container" aria-labelledby="certifications-heading">
      <div className="section-header">
        <div className="section-eyebrow">Verified Credentials</div>
        <h2 id="certifications-heading" className="section-title">
          Certifications & Industrial Badges
        </h2>
        <p className="section-description">
          Formal credentials in Generative AI architectures, prompt engineering, and industrial database management systems.
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
              
              {cert.verificationUrl ? (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-link"
                  aria-label={`Verify ${cert.title} certificate on IBM Career Education Portal`}
                >
                  <span>Verify Credential</span>
                  <ExternalLinkIcon size={14} />
                </a>
              ) : (
                cert.credentialId && (
                  <span className="cert-id-label">ID: {cert.credentialId}</span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
