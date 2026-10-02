import React from 'react';
import { skillCategories } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-[#FAF7F2] border-t border-[#E3DACD]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark block mb-2">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
            Production Skills & Architectural Domains
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
            Technologies and engineering disciplines proven in production systems across multi-agent orchestration, document AI, and cloud backends.
          </p>
        </div>

        {/* Clean, Editorial Skills Directory (No Box Clutter) */}
        <div className="divide-y divide-[#E3DACD]/70 border-y border-[#E3DACD]/70">
          {skillCategories.map((category) => (
            <div 
              key={category.title}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-black/[0.01]"
            >
              {/* Category Name & Scope (4 cols) */}
              <div className="lg:col-span-4">
                <h3 className="text-base font-bold text-charcoal font-sans">
                  {category.title}
                </h3>
                <p className="text-xs text-charcoal-muted font-mono mt-1">
                  {category.description}
                </p>
              </div>

              {/* Skills List with Inline Highlights (8 cols) */}
              <div className="lg:col-span-8 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E3DACD] text-xs font-mono text-charcoal hover:border-amber transition-colors shadow-2xs group"
                  >
                    <span className="font-semibold">{skill.name}</span>
                    {skill.level === 'Expert' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                    )}
                    {skill.highlight && (
                      <span className="text-[10px] text-charcoal-muted group-hover:text-charcoal transition-colors">
                        — {skill.highlight}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
