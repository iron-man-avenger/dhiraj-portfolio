import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ArrowRight, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { personalInfo, headlineMetrics, signatureChartData } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  onOpenArcade: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArcade }) => {
  const [activeBar, setActiveBar] = useState<number | null>(2); // Default to the amber bar

  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-[400px] h-[400px] bg-[#E8DFC9]/40 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Accolade Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-[#E5DDCF] shadow-sm mb-6"
        >
          <div className="p-1 rounded-full bg-amber/20 text-charcoal">
            <Award className="w-3.5 h-3.5 text-amber-dark" />
          </div>
          <span className="text-xs font-semibold text-charcoal tracking-wide">
            Winner, "Overall Azure OpenAI" — Microsoft Agentic AI Hackathon
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-ping" />
        </motion.div>

        {/* Two Column Layout: Hero Copy + Interactive Signature Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-charcoal-muted font-bold">
                    Portfolio & System Architecture
                  </span>
                  <div className="h-[1px] w-12 bg-amber" />
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-charcoal tracking-tight leading-[1.08] font-sans">
                  Building <span className="relative inline-block text-charcoal">
                    Self-Correcting
                    <svg className="absolute -bottom-1 left-0 w-full h-3 text-amber opacity-80" viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </span>
                  <br />
                  Multi-Agent Systems & Vision AI.
                </h1>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-base sm:text-lg text-charcoal-muted font-normal leading-relaxed max-w-2xl"
            >
              Hi, I’m <span className="font-semibold text-charcoal">{personalInfo.name}</span>, an AI Engineer based in {personalInfo.location}. I architect production-hardened multi-agent pipelines with <span className="font-semibold text-charcoal underline decoration-amber decoration-2">3-tier deterministic verification</span>, intelligent document processing that cuts runtime by 60%, and zero-shot computer vision platforms.
            </motion.p>

            {/* Quick Tech Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {['Azure OpenAI', 'Multi-Agent MCP', 'FastAPI', 'PyTorch / OWLv2', 'Cosmos DB & RLS', 'AKS'].map((badge) => (
                <span 
                  key={badge}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#EFE7DC] text-charcoal border border-[#E0D5C3]"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <a
                href="#simulator"
                onClick={() => sounds.playClick()}
                className="px-6 py-3.5 rounded-xl bg-charcoal text-white font-semibold text-sm flex items-center gap-2 hover:bg-charcoal-deep transition-all shadow-md group"
              >
                <span>Test Live Multi-Agent Simulator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber" />
              </a>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenArcade();
                }}
                className="px-5 py-3.5 rounded-xl bg-white border border-[#E5DDCF] text-charcoal font-semibold text-sm flex items-center gap-2.5 hover:border-amber hover:shadow-subtle transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                <span>Launch Arcade Mini-Game</span>
              </button>

              <a
                href="#projects"
                onClick={() => sounds.playTap()}
                className="px-4 py-3.5 text-xs font-bold text-charcoal-muted hover:text-charcoal underline underline-offset-4 transition-colors flex items-center gap-1"
              >
                <span>View Case Studies</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: The Signature Interactive Bar Chart (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-[#F4EFE6] border border-[#E3DACD] shadow-elevated"
            >
              {/* Reference-echoed handwritten note */}
              <div className="absolute -top-6 right-6 sm:-top-8 sm:right-10 flex items-center gap-2 z-20">
                <span className="handwriting text-3xl sm:text-4xl text-charcoal font-bold transform -rotate-6 select-none">
                  Over 12K+ Verified
                </span>
                <svg className="w-8 h-8 text-amber transform rotate-12 -translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Chart Header */}
              <div className="flex items-center justify-between border-b border-[#E5DDCF] pb-4 mb-6">
                <div>
                  <h3 className="font-bold text-charcoal text-sm font-sans flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-dark" />
                    Agentic Pipeline Invariant Density
                  </h3>
                  <p className="text-[11px] font-mono text-charcoal-muted mt-0.5">
                    Benchmark telemetries & verification scores
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber/20 text-charcoal">
                    99.8% ACC
                  </span>
                </div>
              </div>

              {/* The Visual Bar Chart (Directly inspired by user reference image) */}
              <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-1.5 sm:gap-2 px-2 pb-2 pt-6 bg-[#FAF7F2]/80 rounded-2xl border border-[#E8DFC9] relative">
                
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
                      {/* Active tooltip popover on hover */}
                      {isHovered && (
                        <div className="absolute -top-12 z-30 px-2.5 py-1 rounded-md bg-charcoal text-white text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none flex flex-col items-center">
                          <span>{bar.label}</span>
                          <span className="text-amber font-bold">{bar.value}% Score</span>
                          <div className="w-2 h-1 bg-charcoal rotate-45 -mb-0.5 mt-0.5" />
                        </div>
                      )}

                      {/* Bar Pillar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.height }}
                        transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isAmber 
                            ? 'bg-[#D4A066] shadow-glow-amber ring-2 ring-amber/50' 
                            : 'bg-[#2E332E] hover:bg-[#3E453E]'
                        } ${isHovered ? 'scale-y-[1.03] brightness-110' : ''}`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Legend / Inspection Card */}
              <div className="mt-4 p-3 rounded-xl bg-white/70 border border-[#E5DDCF] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${activeBar === 2 ? 'bg-amber' : 'bg-charcoal'}`} />
                  <span className="font-semibold text-charcoal">
                    {activeBar !== null ? signatureChartData[activeBar].label : 'Select a pipeline node'}
                  </span>
                </div>
                <div className="font-mono text-charcoal-muted text-[11px]">
                  {activeBar === 2 ? (
                    <span className="text-amber-dark font-bold">★ 79% Silent Drift Eliminated</span>
                  ) : (
                    <span>Status: Deterministic Proof Passed</span>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Defensible Headline Numbers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {headlineMetrics.map((metric, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                metric.highlight 
                  ? 'bg-amber/10 border-2 border-amber/40 shadow-sm' 
                  : 'glass-card border border-[#E5DDCF] hover:border-charcoal/20'
              }`}
            >
              <div className="font-sans text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
                {metric.number}
              </div>
              <div className="text-xs font-bold text-charcoal mt-1 tracking-tight">
                {metric.label}
              </div>
              <div className="text-[11px] text-charcoal-muted leading-snug mt-1 font-normal">
                {metric.description}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
