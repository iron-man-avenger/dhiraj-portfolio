import React from 'react';
import { skillCategories } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-[#FAF7F2] border-t border-[#E3DACD]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2B302C] flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
            <span>Technical Stack</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B302C] tracking-tight font-sans">
            Production Skills & Architectural Domains
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
            Technologies and engineering disciplines proven in production systems across multi-agent orchestration, document AI, and cloud backends.
          </p>
        </div>

        {/* Clean, Editorial Skills Directory with Primary #2B302C Depth */}
        <div className="divide-y divide-[#E3DACD]/70 border-y border-[#E3DACD]/70">
          {skillCategories.map((category) => (
            <div 
              key={category.title}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-black/[0.01]"
            >
              {/* Category Name & Scope (4 cols) with #2B302C Contrast */}
              <div className="lg:col-span-4">
                <h3 className="text-base font-extrabold text-[#2B302C] font-sans flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
                  <span>{category.title}</span>
                </h3>
                <p className="text-xs text-[#2B302C]/80 font-mono mt-1 pl-3.5 leading-relaxed font-medium">
                  {category.description}
                </p>
              </div>

              {/* Skills List with Primary Accents on Expert Technologies (8 cols) */}
              <div className="lg:col-span-8 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => {
                  const isExpert = skill.level === 'Expert';
                  return (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all shadow-2xs group ${
                        isExpert
                          ? 'bg-amber/[0.08] border border-amber/35 text-charcoal hover:border-amber hover:bg-amber/15'
                          : 'bg-white/80 border border-[#E3DACD] text-charcoal hover:border-amber/50 hover:bg-white hover:text-amber-dark'
                      }`}
                    >
                      <span className={`font-semibold ${isExpert ? 'text-charcoal' : ''}`}>{skill.name}</span>
                      {isExpert && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                      )}
                      {skill.highlight && (
                        <span className={`text-[10px] transition-colors ${
                          isExpert ? 'text-amber-dark font-medium' : 'text-charcoal-muted group-hover:text-charcoal'
                        }`}>
                          — {skill.highlight}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
