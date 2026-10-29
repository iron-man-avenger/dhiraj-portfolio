import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Languages, 
  ExternalLink
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { MaskedWords, Reveal, RiseText, SectionRule } from './motion/primitives';
import { BACK_OUT, EXPO_OUT } from './motion/tokens';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [directPrompt, setDirectPrompt] = useState<{
    subject: string;
    body: string;
    gmailUrl: string;
    mailtoUrl: string;
  } | null>(null);

  const copyEmail = () => {
    sounds.playTap();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyFormattedMessage = (text: string) => {
    sounds.playTap();
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setIsSubmitting(true);
    setErrorMessage('');

    const topic = formData.inquiryType.trim() ? formData.inquiryType.trim() : 'AI Engineering Inquiry';
    const subject = `[Portfolio: ${topic}] from ${formData.name}`;
    const formattedBody = `Hi Dhiraj,\n\n${formData.message}\n\n---\nSender Details:\nName: ${formData.name}\nEmail: ${formData.email}\nTopic: ${topic}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

    const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    // Option 1: Direct Client-Side Email via EmailJS JavaScript Library
    if (emailServiceId && emailTemplateId && emailPublicKey) {
      try {
        const response = await emailjs.send(
          emailServiceId,
          emailTemplateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            reply_to: formData.email,
            subject: subject,
            inquiry_topic: topic,
            message: formData.message,
            to_email: personalInfo.email,
          },
          emailPublicKey
        );

        if (response.status === 200 || response.text === 'OK') {
          sounds.playSuccess();
          setSubmitted(true);
          setDirectPrompt(null);
          setFormData({ name: '', email: '', inquiryType: '', message: '' });
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('EmailJS delivery encounter, falling back to direct mail composer:', err);
      }
    } 
    // Option 2: Web3Forms fallback if configured
    else if (web3formsKey) {
      try {
        const submissionData = new FormData();
        submissionData.append("access_key", web3formsKey);
        submissionData.append("name", formData.name);
        submissionData.append("email", formData.email);
        submissionData.append("subject", subject);
        submissionData.append("inquiry_topic", topic);
        submissionData.append("message", formData.message);
        submissionData.append("from_name", formData.name);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: submissionData
        });
        const data = await response.json();
        if (data.success) {
          sounds.playSuccess();
          setSubmitted(true);
          setDirectPrompt(null);
          setFormData({ name: '', email: '', inquiryType: '', message: '' });
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('Web3Forms delivery encounter, falling back to direct mail composer:', err);
      }
    }

    // Option 3: Universal 100% Reliability Client-Side Delivery (Opens Gmail Web / Mail Client)
    sounds.playTap();
    setDirectPrompt({
      subject,
      body: formattedBody,
      gmailUrl,
      mailtoUrl
    });

    try {
      window.open(gmailUrl, '_blank');
    } catch {
      // Pop-up blockers handled by UI prompt buttons below
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-[#F7F2EB] relative">
      <SectionRule />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Direct Contact & Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            <div>
              <RiseText className="mb-3" innerClassName="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 text-charcoal text-xs font-mono font-bold uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-amber-dark" />
                <span>Let's Build Together</span>
              </RiseText>
              <MaskedWords className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans" text="Initiate a Technical Conversation" />
              <RiseText delay={0.25} className="text-sm text-charcoal-muted mt-3 leading-relaxed">
                Whether you’re architecting an enterprise multi-agent system, evaluating document processing pipelines, or looking for an AI engineer who ensures models never fail silently.
              </RiseText>
            </div>

            {/* Quick Email Copy Card - Responsive Mobile Safe */}
            <Reveal delay={0.1} className="p-4 sm:p-5 rounded-2xl bg-[#F7F2EB] border border-[#E3DACD] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 overflow-hidden">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-amber/15 text-amber-dark flex items-center justify-center font-bold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-xs sm:text-sm font-bold text-charcoal font-mono truncate block hover:text-amber-dark transition-colors"
                    title={personalInfo.email}
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="w-full sm:w-auto justify-center px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#E3DACD] hover:bg-ecru-200 text-charcoal-muted hover:text-charcoal transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0"
                title="Copy Email to Clipboard"
              >
                {/* "Copied!" rises in and back out */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EXPO_OUT }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Reveal>

            {/* Location & Languages */}
            <Reveal delay={0.18} className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#E3DACD]">
                <div className="flex items-center gap-2 text-charcoal-muted mb-1 text-xs">
                  <MapPin className="w-4 h-4 text-amber-dark" />
                  <span>Location</span>
                </div>
                <span className="text-xs font-bold text-charcoal font-sans">
                  {personalInfo.location}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#E3DACD]">
                <div className="flex items-center gap-2 text-charcoal-muted mb-1 text-xs">
                  <Languages className="w-4 h-4 text-amber-dark" />
                  <span>Languages</span>
                </div>
                <span className="text-xs font-bold text-charcoal font-sans">
                  {personalInfo.languages.join(', ')}
                </span>
              </div>
            </Reveal>

            {/* Social Links */}
            <Reveal delay={0.26} className="pt-2">
              <span className="text-xs font-mono font-bold text-charcoal-muted uppercase tracking-wider block mb-3">
                Professional Networks
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playTap()}
                  className="px-4 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#E3DACD] text-charcoal text-xs font-semibold flex items-center gap-2 hover:border-charcoal transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-[#D4A066]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-muted" />
                </a>

                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playTap()}
                  className="px-4 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#E3DACD] text-charcoal text-xs font-semibold flex items-center gap-2 hover:border-charcoal transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-[#D4A066]" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-muted" />
                </a>
              </div>
            </Reveal>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-[#F7F2EB] border border-[#E3DACD] shadow-elevated">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5] mb-6">
                <div>
                  <h3 className="text-lg font-bold text-charcoal font-sans">
                    Send a Direct Note
                  </h3>
                  <p className="text-xs text-charcoal-muted font-mono mt-0.5">
                    Direct dispatch straight to Dhiraj's personal inbox
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  {/* The badge pops, then its check draws itself */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: BACK_OUT }}
                    className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.55, ease: EXPO_OUT, delay: 0.25 }}
                      />
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-bold text-charcoal">
                    Message Sent Directly to Dhiraj!
                  </h4>
                  <p className="text-xs text-charcoal-muted max-w-sm mt-1 mb-6">
                    Your inquiry has been delivered straight into Dhiraj's Gmail inbox (<span className="font-mono text-charcoal font-semibold">{personalInfo.email}</span>). He will review and respond promptly.
                  </p>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      setSubmitted(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-charcoal-deep transition-colors shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : directPrompt ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber/15 text-amber-dark flex items-center justify-center mb-4 border border-amber/30">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-charcoal">
                    Inquiry Prepared for Dhiraj!
                  </h4>
                  <p className="text-xs text-charcoal-muted max-w-md mt-1 mb-6 leading-relaxed">
                    Your message has been pre-formatted for <span className="font-mono text-charcoal font-semibold">{personalInfo.email}</span>. Click below to complete dispatch via Gmail Web or your local email client:
                  </p>

                  <div className="w-full flex flex-col sm:flex-row gap-3 justify-center mb-5">
                    <a
                      href={directPrompt.gmailUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playSuccess()}
                      className="px-5 py-3 rounded-xl bg-amber text-charcoal-deep font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-light shadow-sm transition-all"
                    >
                      <Mail className="w-4 h-4 text-charcoal-deep" />
                      <span>Dispatch via Gmail (Web)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={directPrompt.mailtoUrl}
                      onClick={() => sounds.playTap()}
                      className="px-5 py-3 rounded-xl bg-[#F7F2EB] border border-[#E3DACD] text-charcoal font-semibold text-xs flex items-center justify-center gap-2 hover:border-charcoal shadow-sm transition-all"
                    >
                      <span>Default Email Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-muted" />
                    </a>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <button
                      onClick={() => copyFormattedMessage(directPrompt.body)}
                      className="font-semibold text-charcoal-muted hover:text-charcoal flex items-center gap-1.5 transition-colors"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                    <span className="text-charcoal-muted/30">•</span>
                    <button
                      onClick={() => {
                        sounds.playTap();
                        setDirectPrompt(null);
                      }}
                      className="font-semibold text-charcoal-muted hover:text-charcoal transition-colors"
                    >
                      Edit Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-charcoal block mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E3DACD] bg-[#F7F2EB] text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-charcoal block mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E3DACD] bg-[#F7F2EB] text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1.5">
                      Inquiry Domain / Topic
                    </label>
                    <input
                      type="text"
                      list="domain-suggestions"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      placeholder="e.g. Multi-Agent Systems, Custom RAG, Vision AI, Full-Stack AI, or your project idea..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E3DACD] bg-[#F7F2EB] text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans"
                    />
                    <datalist id="domain-suggestions">
                      <option value="Multi-Agent Systems & Verification" />
                      <option value="Intelligent Document Processing (IDP)" />
                      <option value="Computer Vision & OWLv2" />
                      <option value="Enterprise RAG & Memory Architectures" />
                      <option value="NLP-to-SQL Pipelines" />
                      <option value="Full-Time AI Engineering Role" />
                      <option value="Consulting & Technical Advisory" />
                    </datalist>
                    <span className="text-[10px] font-mono text-charcoal-muted mt-1 block">
                      Type anything you'd like to discuss or collaborate on.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your technical challenge, platform, or project scope..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E3DACD] bg-[#F7F2EB] text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-charcoal hover:bg-charcoal-deep text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-amber border-t-transparent rounded-full animate-spin" />
                        <span>Dispatching Agent...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-amber group-hover:translate-x-1 transition-transform" />
                        <span>Dispatch Message to Dhiraj</span>
                      </>
                    )}
                  </button>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#EAE2D5]/70 text-[11px] font-mono text-charcoal-muted">
                    <span>Direct email client shortcuts:</span>
                    <div className="flex items-center gap-2.5">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-dark font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open Gmail Web</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                      <span>•</span>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-charcoal font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Mail Client</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};
