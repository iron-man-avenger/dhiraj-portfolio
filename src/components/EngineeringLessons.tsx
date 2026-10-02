import React from 'react';
import { engineeringPrinciples } from '../data/portfolioData';

export const EngineeringLessons: React.FC = () => {
  return (
    <section id="principles" className="py-24 bg-[#F7F2EB] border-t border-[#E3DACD]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2B302C] flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
              <span>Engineering Mindset</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B302C] tracking-tight font-sans">
              Production Principles & Architectural Discipline
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
              Anyone can query an LLM. The differentiator is designing deterministic layers that catch failures, eliminate silent corruption, and guarantee reliability.
            </p>
          </div>

          <div className="handwriting text-2xl sm:text-3xl text-charcoal font-bold transform -rotate-3 select-none">
            "Code decides, models only observe"
          </div>
        </div>

        {/* Clean Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (5 cols): Case Autopsy Note with #2B302C Box Background */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#2B302C] text-white border border-[#39403B] shadow-elevated transition-all duration-300 relative overflow-hidden group">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber font-bold block mb-2">
              Production Autopsy
            </span>
            <h3 className="text-xl font-bold text-white font-sans leading-snug mb-3">
              The 79% Silent Taxonomy Drift Defect (12,087 Mappings)
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal mb-5">
              When an ERP taxonomy expanded from 31 to 70 categories without re-keying stored artifacts, every automated validator passed because stale codes fell inside the valid range. Every prediction emitted a code that contradicted its own label.
            </p>
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/90">
              <strong className="text-amber font-bold">The Fix:</strong> Derived vocabulary strictly from the live database catalog, making taxonomic drift structurally impossible to recur.
            </div>
          </div>

          {/* Right Column (7 cols): The Principles List */}
          <div className="lg:col-span-7 divide-y divide-[#E3DACD]/70 border-y border-[#E3DACD]/70">
            {engineeringPrinciples.map((item, idx) => (
              <div key={item.title} className="py-6 flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-amber-dark">0{idx + 1}</span>
                  <h4 className="text-base font-bold text-charcoal font-sans">{item.title}</h4>
                </div>
                <p className="text-xs font-serif italic text-charcoal font-medium pl-6">
                  "{item.quote}"
                </p>
                <p className="text-xs text-charcoal-muted font-sans leading-relaxed pl-6 mt-1">
                  {item.application}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
