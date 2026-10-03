/**
 * Contact Service Abstraction Layer
 * Centralizes all form transmission, anti-spam validation, and direct email dispatch.
 * 
 * Direct Email Integration:
 * Form submissions are transmitted directly to abhishekku389@gmail.com
 * via FormSubmit.co ajax endpoint.
 * 
 * Future Delivery Architecture:
 * React -> contactService.sendMessage(payload) -> POST /api/contact -> Node.js/Express -> SMTP / MongoDB
 * 
 * Security:
 * - NO API secrets, SMTP passwords, or tokens exposed in frontend code.
 * - Honeypot anti-spam check.
 * - Direct delivery to verified recipient: abhishekku389@gmail.com
 * - Sender's email configured as Reply-To for seamless 1-click replies from Gmail.
 */

import { contactData } from '../data/contact.js';

const USE_API = import.meta.env.VITE_USE_API === 'true';
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';
const DIRECT_EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${contactData.email}`;

export const contactService = {
  /**
   * Submit contact inquiry directly to Abhishek's email
   * @param {Object} payload
   * @param {string} payload.name - Sender's full name
   * @param {string} payload.email - Sender's email address
   * @param {string} [payload.phone] - Sender's phone number
   * @param {string} [payload.subject] - Inquiry subject
   * @param {string} payload.message - Message body
   * @param {string} payload.profileType - Current profile mode ('all' | 'tech' | 'bpo')
   * @param {string} [payload._honeypot] - Hidden bot trap field
   * @returns {Promise<{success: boolean, message: string, referenceId?: string, mode?: string}>}
   */
  async sendMessage(payload) {
    // 1. Client-side honeypot verification
    if (payload._honeypot && payload._honeypot.trim().length > 0) {
      // Silently reject bots
      return {
        success: false,
        message: 'Submission could not be processed at this time.',
      };
    }

    // 2. Client-side payload sanitization and validation
    const sanitizedData = {
      name: payload.name?.trim().slice(0, 100) || '',
      email: payload.email?.trim().slice(0, 254) || '',
      phone: payload.phone?.trim().slice(0, 25) || '',
      subject: payload.subject?.trim().slice(0, 200) || '',
      message: payload.message?.trim().slice(0, 5000) || '',
      profileType: payload.profileType || 'all',
      submittedAt: new Date().toISOString(),
    };

    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      throw new Error('Please fill in all required fields (Name, Email, Message).');
    }

    // 3. If connected to a custom backend API
    if (USE_API) {
      try {
        const response = await fetch(CONTACT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(sanitizedData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || 'The server could not process your message. Please try again or email directly.'
          );
        }

        const data = await response.json();
        return {
          success: true,
          mode: 'production',
          message: data.message || `Your message has been sent to Abhishek (${contactData.email}). He will respond within 24 hours.`,
          referenceId: data.referenceId || `AK-${Date.now().toString().slice(-6)}`,
        };
      } catch (err) {
        throw new Error(
          err.message || `Failed to connect to messaging server. Please contact Abhishek directly at ${contactData.email}.`
        );
      }
    }

    // 4. Direct Email Delivery to abhishekku389@gmail.com
    try {
      const emailPayload = {
        name: sanitizedData.name,
        email: sanitizedData.email,
        _replyto: sanitizedData.email,
        phone: sanitizedData.phone || 'Not provided',
        subject: sanitizedData.subject || 'Portfolio Inquiry',
        _subject: `[Portfolio Inquiry] ${sanitizedData.subject || 'New Message'} from ${sanitizedData.name}`,
        message: sanitizedData.message,
        careerTrack: sanitizedData.profileType?.toUpperCase() || 'GENERAL',
        _template: 'table',
        _captcha: 'false',
      };

      const response = await fetch(DIRECT_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      const data = await response.json().catch(() => ({}));

      // Check if FormSubmit requires 1-time activation by Abhishek in his Gmail
      if (data?.message && typeof data.message === 'string' && data.message.includes('Activation')) {
        return {
          success: true,
          mode: 'activation_sent',
          message: `Inquiry registered! Abhishek, an activation email has been sent to ${contactData.email}. Please open Gmail and click 'Activate Form' once so all future messages land directly in your inbox!`,
          referenceId: `AK-${Date.now().toString().slice(-6)}`,
          timestamp: sanitizedData.submittedAt,
        };
      }

      if (data?.success === 'true' || data?.success === true || response.ok) {
        return {
          success: true,
          mode: 'delivered',
          message: `Thank you, ${sanitizedData.name}! Your message has been sent directly to Abhishek (${contactData.email}). He will review it and reply within 24 hours.`,
          referenceId: `AK-${Date.now().toString().slice(-6)}`,
          timestamp: sanitizedData.submittedAt,
        };
      }

      throw new Error(
        data?.message || `Unable to deliver message automatically. Please contact Abhishek directly at ${contactData.email}`
      );
    } catch (deliveryErr) {
      // If network fails, provide clean feedback with mailto fallback
      throw new Error(
        deliveryErr.message || `Unable to deliver email. Please contact Abhishek directly at ${contactData.email}.`
      );
    }
  },
};

export default contactService;
