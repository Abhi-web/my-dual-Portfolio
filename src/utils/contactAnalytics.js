/**
 * Contact Analytics Dispatcher
 * Provides clean, lightweight tracking hooks for recruiter communication events:
 * - contact_form_started
 * - contact_form_submitted
 * - contact_email_clicked
 * - contact_email_copied
 * - contact_linkedin_clicked
 * - contact_phone_clicked
 * - contact_resume_clicked
 */

export function trackContactAction(actionType, details = {}) {
  const eventPayload = {
    action: actionType,
    profileMode: details.profileMode || 'all',
    subject: details.subject || '',
    channel: details.channel || '',
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    // 1. Dispatch custom DOM event
    try {
      const customEvent = new CustomEvent('contact_interaction', {
        detail: eventPayload,
        bubbles: true,
      });
      window.dispatchEvent(customEvent);
    } catch (_err) {
      // Safe fallback
    }

    // 2. Forward to Google Analytics 4 if available
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', actionType, {
          event_category: 'Contact',
          event_label: details.channel || details.subject || actionType,
          profile_mode: eventPayload.profileMode,
        });
      }
    } catch (_err) {
      // Ignore forwarding errors
    }

    // 3. Log interaction in development mode
    if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.log(`[Contact Analytics] ${actionType}:`, eventPayload);
    }
  }

  return eventPayload;
}

export default trackContactAction;
