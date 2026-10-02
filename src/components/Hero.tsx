import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight
} from 'lucide-react';
import { personalInfo, headlineMetrics, signatureChartData } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  onOpenArcade: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArcade }) => {
  const [activeBar, setActiveBar] = useState<number | null>(2);

  return (
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 cols): Clean, Spacious Typography */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Minimalist Accolade Tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="font-semibold text-charcoal">Microsoft Agentic AI Hackathon Winner</span>
              <span>•</span>
              <span>Azure OpenAI Category</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-charcoal tracking-tight leading-[1.08] font-sans">
              Building self-correcting multi-agent systems & vision AI.
            </h1>

            {/* Subtitle / Intro */}
            <p className="text-base sm:text-lg text-charcoal-muted font-normal leading-relaxed max-w-xl">
              I’m <span className="font-semibold text-charcoal">{personalInfo.name}</span>, an AI Engineer based in {personalInfo.location}. I build production agentic pipelines with 3-tier deterministic verification, intelligent document extraction, and zero-shot computer vision.
            </p>

            {/* Clean Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="px-6 py-3 rounded-full bg-charcoal text-white font-semibold text-xs flex items-center gap-2 hover:bg-charcoal-deep transition-all shadow-sm group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber" />
              </a>

              <a
                href="#simulator"
                onClick={() => sounds.playTap()}
                className="px-5 py-3 rounded-full bg-white/80 border border-[#E3DACD] text-charcoal font-semibold text-xs hover:border-charcoal hover:bg-white transition-all shadow-sm"
              >
                <span>Agent Simulator</span>
              </a>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenArcade();
                }}
                className="px-4 py-3 text-xs font-bold text-charcoal-muted hover:text-charcoal transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span>Play Mini-Game</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Clean, Uncluttered Signature Chart */}
          <div className="lg:col-span-5 relative w-full pt-1">
            <div className="p-6 rounded-3xl bg-[#F4EFE6]/90 border border-[#E3DACD] shadow-sm">
              
              {/* Handwritten Note (Echoing the reference image) */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E3DACD]/70">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-dark font-bold block">
                    System Telemetry
                  </span>
                  <h3 className="text-xs font-bold text-charcoal font-sans mt-0.5">
                    Pipeline Invariant Verification
                  </h3>
                </div>

                <div className="handwriting text-2xl text-charcoal font-bold transform -rotate-3 select-none">
                  Over 12K+ Verified
                </div>
              </div>

              {/* The 12-Bar Minimalist Visual Chart */}
              <div className="h-56 w-full flex items-end justify-between gap-1.5 px-2 pb-2 pt-6 bg-white/70 rounded-2xl border border-[#E8DFC9] relative">
                {signatureChartData.map((bar, idx) => {
                  const isAmber = bar.isAccent;
                  const isHovered = activeBar === idx;

                  return (
                    <div 
                      key={bar.label}
                      onMouseEnter={() => {
                        sounds.playTap();
                        setActiveBar(idx);
                      }}
                      className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer"
                    >
                      {isHovered && (
                        <div className="absolute -top-10 z-30 px-2.5 py-1 rounded-md bg-charcoal text-white text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none">
                          <span>{bar.label}</span>: <strong className="text-amber">{bar.value}%</strong>
                        </div>
                      )}

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.height }}
                        transition={{ duration: 0.7, delay: idx * 0.03, ease: "easeOut" }}
                        className={`w-full rounded-t-md transition-all duration-200 ${
                          isAmber 
                            ? 'bg-amber shadow-glow-amber' 
                            : 'bg-charcoal hover:bg-charcoal-muted'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Bottom Inspection Ticker */}
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-charcoal-muted">
                <span className="text-charcoal font-semibold">
                  {activeBar !== null ? signatureChartData[activeBar].label : 'Hover to inspect'}
                </span>
                <span className="text-[11px]">
                  {activeBar === 2 ? (
                    <strong className="text-amber-dark">12,087 Mappings Verified</strong>
                  ) : (
                    'Verified Invariant Pass'
                  )}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Minimalist Stats Row (Clean horizontal line, no heavy boxed cards) */}
        <div className="mt-16 pt-8 border-t border-[#E3DACD]/80 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {headlineMetrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-charcoal font-sans tracking-tight">
                {metric.number}
              </span>
              <span className="text-xs font-bold text-charcoal mt-1">
                {metric.label}
              </span>
              <span className="text-[11px] text-charcoal-muted font-mono leading-tight mt-0.5">
                {metric.description}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
