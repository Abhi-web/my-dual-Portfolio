/**
 * Resume Analytics Dispatcher
 * Provides clean, lightweight tracking hooks for resume interactions:
 * - resume_view: When a recruiter opens the resume viewer modal
 * - resume_download: When a recruiter downloads a resume PDF
 * - resume_open_tab: When a recruiter opens the PDF in a new browser tab
 * - resume_print: When a recruiter triggers resume printing
 * 
 * Future-proof: Dispatches standard CustomEvent('resume_interaction') on window,
 * forwards to window.gtag if present, and logs during development.
 */

export function trackResumeAction(actionType, resumeData = {}) {
  const eventPayload = {
    action: actionType,
    resumeType: resumeData.type || 'general',
    profileMode: resumeData.profileMode || 'all',
    title: resumeData.title || 'Resume',
    filename: resumeData.downloadName || 'resume.pdf',
    file: resumeData.file || '',
    version: resumeData.version || '2026.1',
    isFallback: Boolean(resumeData.isFallback),
    timestamp: new Date().toISOString(),
  };

  // 1. Dispatch custom DOM event for decoupled application or telemetry listeners
  if (typeof window !== 'undefined') {
    try {
      const customEvent = new CustomEvent('resume_interaction', {
        detail: eventPayload,
        bubbles: true,
      });
      window.dispatchEvent(customEvent);
    } catch (_err) {
      // Safe fallback if CustomEvent is not supported
    }

    // 2. Forward to Google Analytics 4 if available
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', actionType, {
          event_category: 'Resume',
          event_label: eventPayload.title,
          file_name: eventPayload.filename,
          resume_type: eventPayload.resumeType,
          profile_mode: eventPayload.profileMode,
        });
      }
    } catch (_err) {
      // Ignore analytics forwarding errors
    }

    // 3. Log interaction in development mode for easy verification
    if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.log(`[Resume Analytics] ${actionType}:`, eventPayload);
    }
  }

  return eventPayload;
}

export default trackResumeAction;
