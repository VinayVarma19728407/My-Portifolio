import React, { useState } from 'react';
import { MailIcon, PhoneIcon, GithubIcon, LinkedinIcon, LeetcodeIcon, CopyIcon, CheckIcon, ExternalLinkIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    });
  };

  const email = "gvkvarma99999@gmail.com";
  const phone = "+91 7799555335";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Connecting with Ganapathiraju Vinay Kumar Varma")}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent("Connecting with Ganapathiraju Vinay Kumar Varma")}`;

  return (
    <section id="contact" className="section-container" aria-labelledby="contact-heading">
      <div className="contact-box">
        <div className="section-eyebrow">Connect & Collaborate</div>
        <h2 id="contact-heading" className="contact-title">
          Let's Build Something Exceptional
        </h2>
        <p className="contact-intro">
          Whether you want to discuss software engineering roles, machine learning research, 
          reinforcement learning schedulers, or open-source collaboration — my inbox is always open.
        </p>

        {/* Primary Contact Channels */}
        <div className="contact-methods-grid">
          
          {/* Email Card */}
          <div className="contact-method-card">
            <div className="contact-method-icon">
              <MailIcon size={22} />
            </div>
            <div className="contact-method-details">
              <span className="method-label">Direct Email</span>
              <a 
                href={gmailComposeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="method-value"
                title="Compose email in Gmail"
              >
                {email}
              </a>
            </div>
            <button
              type="button"
              className="copy-btn"
              onClick={() => copyToClipboard(email, 'email')}
              aria-label="Copy email address to clipboard"
            >
              {copiedField === 'email' ? (
                <>
                  <CheckIcon size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Phone Card */}
          <div className="contact-method-card">
            <div className="contact-method-icon">
              <PhoneIcon size={22} />
            </div>
            <div className="contact-method-details">
              <span className="method-label">Phone & WhatsApp</span>
              <a href="tel:+917799555335" className="method-value">
                {phone}
              </a>
            </div>
            <button
              type="button"
              className="copy-btn"
              onClick={() => copyToClipboard('+917799555335', 'phone')}
              aria-label="Copy phone number to clipboard"
            >
              {copiedField === 'phone' ? (
                <>
                  <CheckIcon size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Profiles Grid */}
        <div className="contact-profiles-row">
          <a
            href="https://github.com/VinayVarma19728407"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-profile-card"
            aria-label="GitHub Profile (opens in new tab)"
          >
            <GithubIcon size={20} />
            <div>
              <div className="profile-name">GitHub</div>
              <div className="profile-handle">@VinayVarma19728407</div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-profile-card"
            aria-label="LinkedIn Feed / Profile (opens in new tab)"
          >
            <LinkedinIcon size={20} />
            <div>
              <div className="profile-name">LinkedIn</div>
              <div className="profile-handle">Professional Profile</div>
            </div>
          </a>

          <a
            href="https://leetcode.com/u/Vinay_Kumar_Varma/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-profile-card"
            aria-label="LeetCode Profile (opens in new tab)"
          >
            <LeetcodeIcon size={20} />
            <div>
              <div className="profile-name">LeetCode</div>
              <div className="profile-handle">@Vinay_Kumar_Varma</div>
            </div>
          </a>
        </div>

        {/* Action Button: Guaranteed dual action with Gmail + mailto */}
        <div className="contact-cta-wrapper" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-primary"
            id="email-button"
            aria-label="Send an email via Gmail"
          >
            <MailIcon size={18} />
            <span>Open in Gmail</span>
            <ExternalLinkIcon size={15} />
          </a>
          <a
            href={mailtoUrl}
            className="btn btn-lg btn-secondary"
            aria-label="Send an email using default email client"
          >
            <span>Open Default Mail App</span>
          </a>
        </div>
      </div>
    </section>
  );
};
