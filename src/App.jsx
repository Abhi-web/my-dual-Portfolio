import React, { useState } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext.jsx';
import { Navbar } from './components/Navbar/Navbar.jsx';
import { Hero } from './components/Hero/Hero.jsx';
import { About } from './components/About/About.jsx';
import { CareerProfile } from './components/CareerProfile/CareerProfile.jsx';
import { Skills } from './components/Skills/Skills.jsx';
import { Experience } from './components/Experience/Experience.jsx';
import { Projects } from './components/Projects/Projects.jsx';
import { BPOStrengths } from './components/BPOStrengths/BPOStrengths.jsx';
import { Services } from './components/Services/Services.jsx';
import { Resume } from './components/Resume/Resume.jsx';
import { Contact } from './components/Contact/Contact.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { CustomCursor } from './components/common/CustomCursor.jsx';
import { BackgroundEffect } from './components/common/BackgroundEffect.jsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';
import { NotFound } from './components/common/NotFound.jsx';
import { SecretMasterController } from './components/common/SecretMasterController.jsx';

// Lazy-load heavy modal only on demand
const ResumeModal = React.lazy(() => import('./components/Resume/ResumeModal.jsx'));

function PortfolioContent({
  resumeModalOpen,
  selectedResumeForModal,
  handleOpenResume,
  handleCloseResume,
}) {
  const { profileMode } = useProfile();

  return (
    <div className="min-h-screen bg-dark-950 text-dark-100 font-sans selection:bg-brand-500 selection:text-dark-950 relative">
      {/* Accessible Skip to Content Link for Keyboard and Screen Reader Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-500 focus:text-dark-950 focus:font-bold focus:rounded-xl focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Non-interfering Desktop Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Background Effects */}
      <BackgroundEffect />

      {/* Sticky Global Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        {/* 1. Hero Section */}
        <Hero onOpenResume={handleOpenResume} />

        {/* 2. About Candidate Section */}
        <About />

        {/* 3. Dedicated Career Profile (Dual Track: Technical vs Professional) */}
        <CareerProfile />

        {/* 4. Skills & Competencies Architecture */}
        <Skills />

        {/* 5. Professional Experience & Leadership Timeline */}
        <Experience />

        {/* 6. Projects & Flagship Showcase (Omitted in pure BPO mode) */}
        {profileMode !== 'bpo' && <Projects />}

        {/* 7. Dedicated BPO & Customer Support Strengths (Omitted in pure Tech mode) */}
        {profileMode !== 'tech' && <BPOStrengths />}

        {/* 8. Personal Capabilities & Services */}
        <Services />

        {/* 9. Curriculum Vitae & Resume Preview */}
        <Resume onOpenResumeModal={handleOpenResume} />

        {/* 10. Direct Contact & Opportunities */}
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Secret Master Controller Modal (For Abhishek Only) */}
      <SecretMasterController />

      {/* Interactive Resume View/Print Modal - Loaded on Demand */}
      {resumeModalOpen && (
        <React.Suspense fallback={null}>
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={handleCloseResume}
            selectedResume={selectedResumeForModal}
          />
        </React.Suspense>
      )}
    </div>
  );
}

export function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedResumeForModal, setSelectedResumeForModal] = useState(null);

  const handleOpenResume = (resume = null) => {
    setSelectedResumeForModal(resume);
    setResumeModalOpen(true);
  };

  const handleCloseResume = () => {
    setResumeModalOpen(false);
    setSelectedResumeForModal(null);
  };

  const [is404, setIs404] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    return path !== '/' && path !== '' && path !== '/index.html';
  });

  if (is404) {
    return (
      <ErrorBoundary>
        <NotFound
          onReturnHome={() => {
            window.history.pushState({}, '', '/');
            setIs404(false);
          }}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ProfileProvider>
        <PortfolioContent
          resumeModalOpen={resumeModalOpen}
          selectedResumeForModal={selectedResumeForModal}
          handleOpenResume={handleOpenResume}
          handleCloseResume={handleCloseResume}
        />
      </ProfileProvider>
    </ErrorBoundary>
  );
}

export default App;
