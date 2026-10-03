import { useMemo, useCallback } from 'react';
import { useProfile } from '../context/ProfileContext.jsx';
import { getActiveResume, getAllResumes, getResumeByType } from '../data/resume.js';
import { trackResumeAction } from '../utils/resumeAnalytics.js';

/**
 * useResume Custom Hook
 * Centralizes all resume business logic across the portfolio application.
 * 
 * Ensures Navbar, Hero, Resume Section, and Footer:
 * - Never duplicate mode mapping or fallback logic
 * - Always access the active profile's specialized resume
 * - Seamlessly download with correct filenames
 * - Seamlessly view in modal or new tab
 * - Safely fall back to General Resume if specialized resume is unavailable
 */
export function useResume() {
  const { profileMode, setProfileMode } = useProfile();

  // Compute active resume whenever profileMode changes
  const activeResume = useMemo(() => {
    return getActiveResume(profileMode);
  }, [profileMode]);

  // List of all configured resumes (General, Technical, BPO)
  const allResumes = useMemo(() => {
    return getAllResumes();
  }, []);

  /**
   * View resume in interactive modal or fallback to new tab
   */
  const handleView = useCallback((onOpenModal) => {
    trackResumeAction('resume_view', activeResume);
    if (typeof onOpenModal === 'function') {
      onOpenModal(activeResume);
    } else if (typeof window !== 'undefined' && activeResume.file) {
      window.open(activeResume.file, '_blank', 'noopener,noreferrer');
    }
  }, [activeResume]);

  /**
   * Programmatic or anchor-based resume download with meaningful filename
   */
  const handleDownload = useCallback((_e) => {
    trackResumeAction('resume_download', activeResume);

    // If triggered programmatically without direct anchor navigation:
    if (typeof document !== 'undefined' && activeResume.file) {
      const link = document.createElement('a');
      link.href = activeResume.file;
      link.download = activeResume.downloadName || 'Abhishek-Kushwaha-Resume.pdf';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [activeResume]);

  /**
   * Open the PDF directly in a new browser tab with security best practices
   */
  const handleOpenNewTab = useCallback((_e) => {
    trackResumeAction('resume_open_tab', activeResume);
    if (typeof window !== 'undefined' && activeResume.file) {
      window.open(activeResume.file, '_blank', 'noopener,noreferrer');
    }
  }, [activeResume]);

  /**
   * Print the resume utilizing the clean print media stylesheet
   */
  const handlePrint = useCallback(() => {
    trackResumeAction('resume_print', activeResume);
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, [activeResume]);

  return {
    profileMode,
    setProfileMode,
    activeResume,
    allResumes,
    isFallback: Boolean(activeResume.isFallback),
    fallbackNotice: activeResume.fallbackNotice,
    handleView,
    handleDownload,
    handleOpenNewTab,
    handlePrint,
    getResumeByType,
  };
}

export default useResume;
