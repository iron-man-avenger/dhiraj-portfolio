import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  MapPin
} from 'lucide-react';
import { workExperience, awards, certifications } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-24 bg-[#F7F2EB] border-t border-[#E3DACD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 text-charcoal text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-amber-dark" />
            <span>Track Record & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
            Career Journey & Recognized Honors
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-3">
            Leading engineering efforts from hospitality financial accounting engines to enterprise multilingual copilots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Work Experience Timeline (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xl font-extrabold text-charcoal font-sans flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-amber-dark" />
              Professional Experience
            </h3>

            <div className="relative border-l-2 border-[#E0D5C3] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
              {workExperience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-charcoal group-hover:border-amber transition-colors" />

                  <div className="p-6 rounded-3xl bg-white border border-[#E3DACD] shadow-sm group-hover:shadow-elevated transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="text-lg font-bold text-charcoal font-sans">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-ecru-100 text-charcoal border border-[#E5DDCF] self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-charcoal-muted mb-4">
                      <span className="font-semibold text-charcoal">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-dark" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-muted mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-charcoal-muted flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#EAE2D5]">
                      {exp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-ecru-100 text-charcoal-muted border border-[#E5DDCF]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards, Education & Certifications (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Awards Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#E3DACD] shadow-sm">
              <h3 className="text-base font-extrabold text-charcoal font-sans flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-amber-dark" />
                Honors & Hackathons
              </h3>

              <div className="space-y-4">
                {awards.map((award, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC9]">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber text-charcoal-deep">
                        {award.badge}
                      </span>
                      <span className="text-[10px] font-mono text-charcoal-muted">{award.year}</span>
                    </div>
                    <h4 className="text-sm font-bold text-charcoal font-sans mt-1">
                      {award.title}
                    </h4>
                    <span className="text-xs font-mono text-amber-dark block font-semibold mb-1.5">
                      {award.organization}
                    </span>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#E3DACD] shadow-sm">
              <h3 className="text-base font-extrabold text-charcoal font-sans flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-amber-dark" />
                Industry Certifications
              </h3>

              <div className="space-y-2.5">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-ecru-50 border border-[#E5DDCF] flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">{cert.name}</h4>
                      <span className="text-[10px] font-mono text-charcoal-muted">{cert.issuer}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#E3DACD] shadow-sm">
              <h3 className="text-base font-extrabold text-charcoal font-sans flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-amber-dark" />
                Formal Education
              </h3>

              <div className="p-4 rounded-2xl bg-ecru-50 border border-[#E5DDCF]">
                <h4 className="text-sm font-bold text-charcoal">
                  Master's in Computer Application (MCA)
                </h4>
                <p className="text-xs text-charcoal-muted mt-1 font-mono">
                  Charotar University of Science & Technology
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8DFC9] text-[11px] font-mono text-charcoal-muted">
                  <span>Gujarat, India</span>
                  <span>May 2021 – May 2023</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
