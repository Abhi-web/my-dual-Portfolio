import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Clock,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Linkedin, Github } from '../common/BrandIcons.jsx';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { contactData } from '../../data/contact.js';
import { useProfile } from '../../context/ProfileContext.jsx';
import { contactService } from '../../services/contactService.js';
import { trackContactAction } from '../../utils/contactAnalytics.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

export const Contact = () => {
  const { profileMode } = useProfile();
  const prefersReduced = useReducedMotion();
  const modeContext = contactData.modeContexts[profileMode] || contactData.modeContexts.all;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    _honeypot: '', // Silent anti-bot trap
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const copyTimerRef = useRef(null);

  // Track if recruiter began interacting with the form
  const hasTrackedStartRef = useRef(false);

  // Filter social channels by active profile mode
  const activeSocials = contactData.socials.filter(
    (s) => !s.modes || s.modes.includes(profileMode)
  );

  // Client-side form validation
  const validateForm = () => {
    const errs = {};
    const nameVal = formData.name.trim();
    const emailVal = formData.email.trim();
    const messageVal = formData.message.trim();

    if (!nameVal) {
      errs.name = 'Please enter your full name.';
    } else if (nameVal.length > contactData.limits.nameMax) {
      errs.name = `Name must be under ${contactData.limits.nameMax} characters.`;
    }

    if (!emailVal) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errs.email = 'Please enter a valid email address (e.g. name@company.com).';
    } else if (emailVal.length > contactData.limits.emailMax) {
      errs.email = `Email must be under ${contactData.limits.emailMax} characters.`;
    }

    if (formData.phone && formData.phone.length > contactData.limits.phoneMax) {
      errs.phone = `Phone number must be under ${contactData.limits.phoneMax} digits.`;
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please provide a subject or role title.';
    } else if (formData.subject.trim().length > contactData.limits.subjectMax) {
      errs.subject = `Subject must be under ${contactData.limits.subjectMax} characters.`;
    }

    if (!messageVal) {
      errs.message = 'Please enter your message details.';
    } else if (messageVal.length < contactData.limits.messageMin) {
      errs.message = `Please provide a message with at least ${contactData.limits.messageMin} characters.`;
    } else if (messageVal.length > contactData.limits.messageMax) {
      errs.message = `Message is too long (maximum ${contactData.limits.messageMax} characters).`;
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      trackContactAction('contact_form_started', { profileMode });
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify honeypot anti-spam trap
    if (formData._honeypot) {
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`contact-${firstErrorKey}`);
      el?.focus();
      return;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await contactService.sendMessage({
        ...formData,
        profileType: profileMode,
      });

      if (response.success) {
        setStatus('success');
        setServerMessage(response.message);
        setReferenceId(response.referenceId || '');

        trackContactAction('contact_form_submitted', {
          profileMode,
          subject: formData.subject,
        });

        // Optional celebration effect
        try {
          const confettiModule = await import('canvas-confetti');
          const confetti = confettiModule.default || confettiModule;
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#06b6d4', '#14b8a6', '#3b82f6', '#10b981'],
          });
        } catch {
          // Non-critical visual effect fallback
        }

        // Reset form fields on confirmed success only
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          _honeypot: '',
        });
        hasTrackedStartRef.current = false;
      } else {
        setStatus('error');
        setServerMessage(response.message || 'Something went wrong. Please try again or reach out directly via email.');
      }
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message || 'Something went wrong. Please try again or contact Abhishek directly via email.');
    }
  };

  const handleResetForm = () => {
    setStatus('idle');
    setServerMessage('');
  };

  const handleCopyEmail = async () => {
    trackContactAction('contact_email_copied', { profileMode, channel: 'email' });
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactData.email);
        setCopiedEmail(true);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = contactData.email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedEmail(true);
      }
    } catch {
      // Safe fallback
    }

    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setCopiedEmail(false);
    }, 2200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Section Heading */}
        <SectionHeading
          badge={modeContext.badge}
          title={modeContext.headline}
          titleHighlight={modeContext.headlineHighlight}
          subtitle={modeContext.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Info & Communication Channels */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Real-time Hiring & Availability Indicator */}
            <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 bg-dark-900/80">
              <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{contactData.availability.badge}</span>
              </div>
              <p className="text-sm text-white font-semibold mb-1">
                {modeContext.targetRoles}
              </p>
              <p className="text-xs text-dark-300 leading-relaxed">
                Open to Full-Time, Remote & Relocation opportunities in Kanpur and across India. {contactData.responseTime}.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-3">
              {/* Direct Email Card with Copy Feature */}
              <div className="p-4 rounded-xl glass-card border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="icon-box-brand flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-dark-400">Direct Email</div>
                    <a
                      href={`mailto:${contactData.email}`}
                      onClick={() => trackContactAction('contact_email_clicked', { profileMode, channel: 'email' })}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-brand-300 transition-colors block truncate"
                      title="Send email via mailto"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 border border-white/5 transition-all active:scale-95"
                    title={copiedEmail ? 'Copied to clipboard!' : 'Copy email address'}
                    aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`mailto:${contactData.email}`}
                    onClick={() => trackContactAction('contact_email_clicked', { profileMode, channel: 'email' })}
                    className="p-2 rounded-lg text-brand-300 hover:text-white hover:bg-dark-800 border border-white/5 transition-all"
                    title="Open default email client"
                    aria-label="Send direct email"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Direct Phone & WhatsApp Card */}
              {contactData.phone && (
                <div className="p-4 rounded-xl glass-card border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="icon-box-brand flex-shrink-0">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-dark-400">Phone & WhatsApp</div>
                      <a
                        href={contactData.telUrl}
                        onClick={() => trackContactAction('contact_phone_clicked', { profileMode, channel: 'phone' })}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-brand-300 transition-colors block truncate"
                      >
                        {contactData.displayPhone}
                      </a>
                    </div>
                  </div>

                  <a
                    href={contactData.telUrl}
                    onClick={() => trackContactAction('contact_phone_clicked', { profileMode, channel: 'phone' })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                  >
                    <span>Call</span>
                  </a>
                </div>
              )}

              {/* General Location Card */}
              <div className="p-4 rounded-xl glass-card border border-white/10 flex items-center gap-3.5">
                <div className="icon-box-brand flex-shrink-0">
                  <MapPin className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-dark-400">Location Base</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {contactData.location}
                  </div>
                </div>
              </div>

              {/* Shift Flexibility Card */}
              <div className="p-4 rounded-xl glass-card border border-white/10 flex items-center gap-3.5">
                <div className="icon-box-brand flex-shrink-0">
                  <Clock className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-dark-400">Shift Availability</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {contactData.workingHours}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile-Tailored Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-dark-400 block mb-2.5">
                Verified Professional Profiles
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {activeSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactAction('contact_social_clicked', { profileMode, channel: social.name })}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-pill text-xs font-medium text-dark-200 hover:text-white hover:bg-dark-850 border border-white/10 hover:border-brand-500/40 transition-all active:scale-95"
                    aria-label={social.label}
                  >
                    {social.name === 'LinkedIn' && <Linkedin className="w-4 h-4 text-blue-400" />}
                    {social.name === 'GitHub' && <Github className="w-4 h-4 text-purple-400" />}
                    {social.name === 'Direct Email' && <Mail className="w-4 h-4 text-brand-400" />}
                    {social.name === 'Phone / WhatsApp' && <Phone className="w-4 h-4 text-emerald-400" />}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form / Submission State */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl glass-card border border-white/10 p-6 sm:p-8 bg-dark-950/85 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  /* Confirmed Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="text-center py-8 px-4 space-y-5"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-glow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Inquiry Received Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-dark-200 max-w-md mx-auto leading-relaxed">
                        {serverMessage}
                      </p>
                    </div>

                    {referenceId && (
                      <div className="inline-block px-3.5 py-1.5 rounded-lg bg-dark-900 border border-white/10 text-xs font-mono text-brand-400">
                        Reference ID: {referenceId}
                      </div>
                    )}

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 transition-all shadow-sm active:scale-95"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Interactive Semantic Contact Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Header */}
                    <div className="pb-3 border-b border-white/10">
                      <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-400" />
                        <span>Send Abhishek a Direct Message</span>
                      </h3>
                      <p className="text-xs text-dark-400 mt-0.5">
                        Let’s Discuss an Opportunity.
                      </p>
                    </div>

                    {/* Anti-spam honeypot field (hidden from legitimate humans and screen readers) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="contact-honeypot">Leave this field empty</label>
                      <input
                        id="contact-honeypot"
                        type="text"
                        name="_honeypot"
                        value={formData._honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Server Error Alert with Direct Email Fallback */}
                    {status === 'error' && (
                      <div 
                        className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-1.5"
                        role="alert"
                        aria-live="assertive"
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                          <span>{serverMessage}</span>
                        </div>
                        <div className="pl-6 text-[11px] text-dark-300">
                          Direct email:{' '}
                          <a
                            href={`mailto:${contactData.email}`}
                            className="text-brand-300 underline font-semibold"
                          >
                            {contactData.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Name & Email Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-mono text-dark-300 mb-1.5">
                          Full Name <span aria-hidden="true" className="text-brand-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          autoComplete="name"
                          required
                          maxLength={contactData.limits.nameMax}
                          aria-required="true"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="your full name"
                          className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl glass-input text-base sm:text-sm text-white placeholder-dark-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400/50 ${
                            errors.name ? 'border-red-500/80 focus:border-red-400' : 'border-white/10 hover:border-white/20'
                          }`}
                        />
                        {errors.name && (
                          <span id="contact-name-error" role="alert" className="text-[11px] text-red-400 mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-mono text-dark-300 mb-1.5">
                          Email Address <span aria-hidden="true" className="text-brand-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          required
                          maxLength={contactData.limits.emailMax}
                          aria-required="true"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl glass-input text-base sm:text-sm text-white placeholder-dark-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400/50 ${
                            errors.email ? 'border-red-500/80 focus:border-red-400' : 'border-white/10 hover:border-white/20'
                          }`}
                        />
                        {errors.email && (
                          <span id="contact-email-error" role="alert" className="text-[11px] text-red-400 mt-1 block">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Phone & Subject Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-mono text-dark-300 mb-1.5">
                          Phone Number <span className="text-dark-500 text-[11px]">(Optional)</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          maxLength={contactData.limits.phoneMax}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 81272 00000"
                          className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl glass-input text-base sm:text-sm text-white placeholder-dark-500 border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400/50"
                        />
                        {errors.phone && (
                          <span id="contact-phone-error" role="alert" className="text-[11px] text-red-400 mt-1 block">
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-mono text-dark-300 mb-1.5">
                          Subject / Opportunity <span aria-hidden="true" className="text-brand-400">*</span>
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          name="subject"
                          autoComplete="off"
                          required
                          maxLength={contactData.limits.subjectMax}
                          aria-required="true"
                          aria-invalid={Boolean(errors.subject)}
                          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={modeContext.subjectPlaceholder}
                          className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl glass-input text-base sm:text-sm text-white placeholder-dark-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400/50 ${
                            errors.subject ? 'border-red-500/80 focus:border-red-400' : 'border-white/10 hover:border-white/20'
                          }`}
                        />
                        {errors.subject && (
                          <span id="contact-subject-error" role="alert" className="text-[11px] text-red-400 mt-1 block">
                            {errors.subject}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="contact-message" className="block text-xs font-mono text-dark-300">
                          Message Details <span aria-hidden="true" className="text-brand-400">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-dark-400">
                          {formData.message.length}/{contactData.limits.messageMax}
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        maxLength={contactData.limits.messageMax}
                        aria-required="true"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell Abhishek about your team, project requirements, or discuss role details..."
                        className={`w-full px-3.5 py-2.5 rounded-xl glass-input text-base sm:text-sm text-white placeholder-dark-500 resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400/50 ${
                          errors.message ? 'border-red-500/80 focus:border-red-400' : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                      {errors.message && (
                        <span id="contact-message-error" role="alert" className="text-[11px] text-red-400 mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 shadow-glow-sm hover:shadow-glow-md disabled:opacity-50 transition-all active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                        aria-busy={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
