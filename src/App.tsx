import React, { useState } from 'react';
import { CosmicSpaceEngine, CosmicMode } from './components/CosmicSpaceEngine';
import { IntroPortal } from './components/IntroPortal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LiveConsoleStream } from './components/LiveConsoleStream';

export const App: React.FC = () => {
  const [portalEntered, setPortalEntered] = useState<boolean>(false);
  const [cosmicMode, setCosmicMode] = useState<CosmicMode>('idle');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleStartDive = () => {
    // 1. First become completely pitch black / blank for 350ms
    setCosmicMode('blank');

    setTimeout(() => {
      // 2. Space dive for 2 seconds (2000ms) with golden & purple light strings
      setCosmicMode('diving');

      setTimeout(() => {
        // 3. Enter portfolio & switch background to Two Colliding Galaxies
        setPortalEntered(true);
        setCosmicMode('galaxies');
      }, 1500);
    }, 350);
  };

  const handleSectionSwitch = (newSection: string) => {
    if (newSection === activeSection) return;

    // Sleek cybernetic wipe transition (blank out)
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveSection(newSection);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 300);
  };

  return (
    <div className="portfolio-app space-theme">
      {/* 3D Cosmic Space Engine: Blank -> 2s Golden/Purple Warp Dive -> Colliding Galaxies Merger */}
      <CosmicSpaceEngine mode={cosmicMode} />

      {/* Grandeur Entrance Webpage / Space Dive Trigger */}
      {!portalEntered && (
        <IntroPortal
          isDiving={cosmicMode === 'diving'}
          isBlank={cosmicMode === 'blank'}
          onStartDive={handleStartDive}
        />
      )}

      {/* Main Interactive System Workspace */}
      {portalEntered && (
        <>
          {/* WCAG Skip Link */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          {/* Navigation Bar */}
          <Navbar
            activeSection={activeSection}
            onSelectSection={handleSectionSwitch}
          />

          {/* Transition Scan Curtain (Blanks page with cybernetic scan line) */}
          <div className={`transition-curtain ${isTransitioning ? 'active' : ''}`} aria-hidden="true">
            <div className="scan-line"></div>
            <div className="transition-text">INITIALIZING TELEMETRY STREAM...</div>
          </div>

          <main id="main-content" className={`main-stage ${isTransitioning ? 'stage-blanked' : 'stage-active'}`} tabIndex={-1}>
            
            {/* 1. ABOUT VIEW: Live Typewriter Model for Name, Subtitle, and Bio */}
            {activeSection === 'about' && (
              <div className="about-view-container">
                <Hero onNavigate={handleSectionSwitch} />
                <ContactSection />
              </div>
            )}

            {/* 2. PROJECTS VIEW: Live Typewriter Stream + On-the-spot creation */}
            {activeSection === 'projects' && (
              <LiveConsoleStream
                sectionKey="projects"
                sectionTitle="Featured Engineering Projects"
                sectionSubtitle="Scalable 3-tier platforms, reinforcement learning schedulers, and explainable AI systems."
                terminalCommand={`cat /portfolio/projects.json | jq '.[] | select(.status == "Completed")'`}
                onBackToAbout={() => handleSectionSwitch('about')}
              >
                <ProjectsSection />
              </LiveConsoleStream>
            )}

            {/* 3. EXPERIENCE VIEW: Live Typewriter Stream + On-the-spot creation */}
            {activeSection === 'experience' && (
              <LiveConsoleStream
                sectionKey="experience"
                sectionTitle="Experience & Academic Background"
                sectionSubtitle="Industrial data engineering across 80,500 records at RINL Vizag Steel Plant alongside VIT Chennai."
                terminalCommand={`query_experience --dept "IT & ERP" --org "RINL Vizag" --education "VIT Chennai"`}
                onBackToAbout={() => handleSectionSwitch('about')}
              >
                <ExperienceSection />
              </LiveConsoleStream>
            )}

            {/* 4. SKILLS VIEW: Live Typewriter Stream + On-the-spot creation */}
            {activeSection === 'skills' && (
              <LiveConsoleStream
                sectionKey="skills"
                sectionTitle="Skills & Technical Stack"
                sectionSubtitle="Core programming languages, machine learning frameworks, and software engineering foundations."
                terminalCommand={`inspect_stack --runtime python,java,cpp,sql,react,catboost,tensorflow`}
                onBackToAbout={() => handleSectionSwitch('about')}
              >
                <SkillsSection />
              </LiveConsoleStream>
            )}

            {/* 5. CERTIFICATIONS VIEW: Live Typewriter Stream + On-the-spot creation */}
            {activeSection === 'certifications' && (
              <LiveConsoleStream
                sectionKey="certifications"
                sectionTitle="Certifications & Industrial Credentials"
                sectionSubtitle="Verified certifications in Artificial Intelligence foundations, Generative AI, and industrial databases."
                terminalCommand={`verify_credentials --authority "TCS iON, IBM CE, RINL" --status "AUTHENTICATED"`}
                onBackToAbout={() => handleSectionSwitch('about')}
              >
                <CertificationsSection />
              </LiveConsoleStream>
            )}

          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
