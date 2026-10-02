import React from 'react';
import { workExperience, awards, certifications } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-24 bg-[#FAF7F2] border-t border-[#E3DACD]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2B302C] flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
            <span>Career & Honors</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B302C] tracking-tight font-sans">
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-extrabold text-[#2B302C] font-sans">
                        {exp.role}
                      </h3>
                      {exp.period.includes('Present') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber/10 text-amber-dark border border-amber/25">
                          Present
                        </span>
                      )}
                    </div>
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

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-mono font-bold text-charcoal mr-1">Stack:</span>
                  {exp.skills.map((s) => (
                    <span 
                      key={s} 
                      className="px-2 py-0.5 rounded-md bg-white/90 border border-[#E3DACD] text-[10px] font-mono text-charcoal hover:border-amber/50 hover:text-amber-dark transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Honors, Certifications & Education (4 cols) */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Awards */}
            <div>
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#2B302C] flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
                <span>Recognitions</span>
              </span>
              <div className="space-y-4">
                {awards.map((award, idx) => {
                  const isTopAward = idx === 0;
                  return (
                    <div 
                      key={idx} 
                      className={`pb-3.5 border-b border-[#E3DACD]/70 transition-all ${
                        isTopAward 
                          ? 'p-5 rounded-2xl bg-[#2B302C] text-white border border-[#39403B] shadow-elevated' 
                          : ''
                      }`}
                    >
                      <span className={`text-[10px] font-mono flex items-center justify-between ${
                        isTopAward ? 'text-white/70' : 'text-charcoal-muted'
                      }`}>
                        <span>{award.year} • {award.organization}</span>
                        {isTopAward && (
                          <span className="bg-amber text-[#2B302C] font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                            Top Honor
                          </span>
                        )}
                      </span>
                      <h4 className={`text-sm font-bold font-sans mt-1.5 ${
                        isTopAward ? 'text-white' : 'text-charcoal'
                      }`}>
                        {award.title}
                      </h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${
                        isTopAward ? 'text-white/80' : 'text-charcoal-muted'
                      }`}>
                        {award.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#2B302C] flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
                <span>Certifications</span>
              </span>
              <div className="space-y-2 text-xs font-mono">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-[#E3DACD]/50">
                    <span className="font-medium text-charcoal">{cert.name}</span>
                    <span className="text-[10px] text-amber-dark bg-amber/10 border border-amber/25 px-2 py-0.5 rounded font-mono font-bold">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#2B302C] flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
                <span>Education</span>
              </span>
              <div className="text-xs">
                <h4 className="font-bold text-charcoal font-sans flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  <span>Master's in Computer Application (MCA)</span>
                </h4>
                <p className="font-mono text-charcoal-muted text-[11px] mt-0.5 pl-3.5">
                  Charotar University of Science & Tech • 2021–2023
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
