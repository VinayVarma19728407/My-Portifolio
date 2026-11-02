import React, { useState } from 'react';
import { MailIcon, PhoneIcon, GithubIcon, LinkedinIcon, LeetcodeIcon, CopyIcon, CheckIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    });
  };

  return (
    <section id="contact" className="section-container" aria-labelledby="contact-heading">
      <div className="contact-box">
        <div className="section-eyebrow">Connect & Collaborate</div>
        <h2 id="contact-heading" className="contact-title">
          Let's Build Something Exceptional
        </h2>
        <p className="contact-intro">
          Whether you want to discuss full-stack engineering roles, machine learning research, 
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
              <a href="mailto:gvkvarma99999@gmail.com" className="method-value">
                gvkvarma99999@gmail.com
              </a>
            </div>
            <button
              type="button"
              className="copy-btn"
              onClick={() => copyToClipboard('gvkvarma99999@gmail.com', 'email')}
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
                +91 7799555335
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
            href="https://github.com/VinayVarma"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-profile-card"
          >
            <GithubIcon size={20} />
            <div>
              <div className="profile-name">GitHub</div>
              <div className="profile-handle">@VinayVarma</div>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/VinayVarma"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-profile-card"
          >
            <LinkedinIcon size={20} />
            <div>
              <div className="profile-name">LinkedIn</div>
              <div className="profile-handle">in/VinayVarma</div>
            </div>
          </a>

          <a
            href="https://leetcode.com/u/VinayVarma"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-profile-card"
          >
            <LeetcodeIcon size={20} />
            <div>
              <div className="profile-name">LeetCode</div>
              <div className="profile-handle">Problem Solving</div>
            </div>
          </a>
        </div>

        {/* Action Button */}
        <div className="contact-cta-wrapper">
          <a
            href="mailto:gvkvarma99999@gmail.com?subject=Opportunity%20Discussion%20-%20Vinay%20Kumar%20Varma"
            className="btn btn-lg btn-primary"
          >
            Send an Email Directly
          </a>
        </div>
      </div>
    </section>
  );
};
