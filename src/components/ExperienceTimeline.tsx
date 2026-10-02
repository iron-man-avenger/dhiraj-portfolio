import React from 'react';
import { workExperience, awards, certifications } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-24 bg-[#FAF7F2] border-t border-[#E3DACD]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark block mb-2">
            Career & Honors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
            Work Journey & Recognized Credentials
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
            Leading engineering efforts from hospitality financial accounting engines to enterprise multilingual copilots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Work Experience Timeline (8 cols): Clean & Typographic */}
          <div className="lg:col-span-8 divide-y divide-[#E3DACD]/70 border-y border-[#E3DACD]/70">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="py-8 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-bold text-charcoal font-sans">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-amber-dark font-semibold">
                      {exp.company} — {exp.location}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-charcoal-muted self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-normal">
                  {exp.description}
                </p>

                <ul className="space-y-1.5 mt-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-charcoal-muted flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono text-charcoal-muted">
                  <span className="font-semibold text-charcoal">Stack:</span>
                  {exp.skills.join(' • ')}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Honors, Certifications & Education (4 cols) */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Awards */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark block mb-3">
                Recognitions
              </span>
              <div className="space-y-4">
                {awards.map((award, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#E3DACD]/70">
                    <span className="text-[10px] font-mono text-charcoal-muted block">{award.year} • {award.organization}</span>
                    <h4 className="text-sm font-bold text-charcoal font-sans mt-0.5">{award.title}</h4>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark block mb-3">
                Certifications
              </span>
              <div className="space-y-2 text-xs font-mono">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-[#E3DACD]/50">
                    <span className="font-medium text-charcoal">{cert.name}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark block mb-2">
                Education
              </span>
              <div className="text-xs">
                <h4 className="font-bold text-charcoal font-sans">Master's in Computer Application (MCA)</h4>
                <p className="font-mono text-charcoal-muted text-[11px] mt-0.5">Charotar University of Science & Tech • 2021–2023</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
