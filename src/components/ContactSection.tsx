import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight,
  Languages
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Multi-Agent Systems',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    sounds.playTap();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sounds.playSuccess();
      // Also open user's default email client
      const subject = encodeURIComponent(`[Portfolio Inquiry: ${formData.inquiryType}] from ${formData.name}`);
      const body = encodeURIComponent(`Hi Dhiraj,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2] border-t border-[#E3DACD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 text-charcoal text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5 text-amber-dark" />
                <span>Let's Build Together</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
                Initiate a Technical Conversation
              </h2>
              <p className="text-sm text-charcoal-muted mt-3 leading-relaxed">
                Whether you’re architecting an enterprise multi-agent system, evaluating document processing pipelines, or looking for an AI engineer who ensures models never fail silently.
              </p>
            </div>

            {/* Quick Email Copy Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber/15 text-amber-dark flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <span className="text-sm font-bold text-charcoal font-mono">
                    {personalInfo.email}
                  </span>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2.5 rounded-xl border border-[#E5DDCF] hover:bg-ecru-100 text-charcoal-muted hover:text-charcoal transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Copy Email to Clipboard"
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
              </button>
            </div>

            {/* Location & Languages */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DDCF]">
                <div className="flex items-center gap-2 text-charcoal-muted mb-1 text-xs">
                  <MapPin className="w-4 h-4 text-amber-dark" />
                  <span>Location</span>
                </div>
                <span className="text-xs font-bold text-charcoal font-sans">
                  {personalInfo.location}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DDCF]">
                <div className="flex items-center gap-2 text-charcoal-muted mb-1 text-xs">
                  <Languages className="w-4 h-4 text-amber-dark" />
                  <span>Languages</span>
                </div>
                <span className="text-xs font-bold text-charcoal font-sans">
                  {personalInfo.languages.join(', ')}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-charcoal-muted uppercase tracking-wider block mb-3">
                Professional Networks
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playTap()}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#E5DDCF] text-charcoal text-xs font-semibold flex items-center gap-2 hover:border-charcoal transition-all shadow-sm"
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
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#E5DDCF] text-charcoal text-xs font-semibold flex items-center gap-2 hover:border-charcoal transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-[#D4A066]" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-muted" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E3DACD] shadow-elevated">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5] mb-6">
                <div>
                  <h3 className="text-lg font-bold text-charcoal font-sans">
                    Send a Direct Note
                  </h3>
                  <p className="text-xs text-charcoal-muted font-mono mt-0.5">
                    Structured query routing to Dhiraj's inbox
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-charcoal">
                    Routing Query Initialized!
                  </h4>
                  <p className="text-xs text-charcoal-muted max-w-sm mt-1 mb-6">
                    Your message draft has been prepared and routed. Dhiraj will review and respond promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-charcoal text-white text-xs font-bold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-ecru-50 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-ecru-50 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1.5">
                      Inquiry Domain
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-ecru-50 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans"
                    >
                      <option value="Multi-Agent Systems & Verification">Multi-Agent Systems & Verification</option>
                      <option value="Document AI & Invoice Processing">Document AI & Invoice Processing</option>
                      <option value="Computer Vision & OWLv2">Computer Vision & OWLv2</option>
                      <option value="Engineering Role / Hiring Inquiry">Engineering Role / Hiring Inquiry</option>
                      <option value="Technical Advisory">Technical Advisory</option>
                    </select>
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
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-ecru-50 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/50 font-sans resize-none"
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
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
