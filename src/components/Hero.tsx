import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ArrowRight, 
  ExternalLink,
  Activity
} from 'lucide-react';
import { personalInfo, headlineMetrics, signatureChartData } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  onOpenArcade: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArcade }) => {
  const [activeBar, setActiveBar] = useState<number | null>(2); // Default to the amber bar
  const [viewMode, setViewMode] = useState<'chart' | 'network'>('chart');

  const specialistAgents = [
    { name: 'Accounting P&L', role: 'Variance & GL Analysis' },
    { name: 'Sales Agent', role: 'Revenue & Covers' },
    { name: 'Timesheet / Labor', role: 'Staff Hours & Costs' },
    { name: 'KPI / Forecasts', role: 'Predictive Trends' },
    { name: 'Stocktake', role: 'Multi-Tenant Postgres' },
    { name: 'Advisory', role: 'Strategic Q&A' },
  ];

  return (
    <section id="overview" className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-80 right-10 w-[400px] h-[400px] bg-[#E8DFC9]/40 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Layout: Top-Aligned Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Top Accolade Banner (Inside left col to keep right col perfectly aligned) */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-[#E5DDCF] shadow-sm self-start"
            >
              <div className="p-1 rounded-full bg-amber/20 text-charcoal">
                <Award className="w-3.5 h-3.5 text-amber-dark" />
              </div>
              <span className="text-xs font-semibold text-charcoal tracking-wide">
                Winner, "Overall Azure OpenAI" — Microsoft Agentic AI Hackathon
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-ping" />
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-charcoal-muted font-bold">
                    Portfolio & System Architecture
                  </span>
                  <div className="h-[1px] w-12 bg-amber" />
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-charcoal tracking-tight leading-[1.08] font-sans">
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
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-charcoal-muted font-normal leading-relaxed max-w-2xl"
            >
              Hi, I’m <span className="font-semibold text-charcoal">{personalInfo.name}</span>, an AI Engineer based in {personalInfo.location}. I architect production-hardened multi-agent pipelines with <span className="font-semibold text-charcoal underline decoration-amber decoration-2">3-tier deterministic verification</span>, intelligent document processing that cuts runtime by 60%, and zero-shot computer vision platforms.
            </motion.p>

            {/* Quick Tech Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
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
                className="px-3 py-3.5 text-xs font-bold text-charcoal-muted hover:text-charcoal underline underline-offset-4 transition-colors flex items-center gap-1"
              >
                <span>View Case Studies</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Flush Top-Aligned Telemetry Card (5 cols) */}
          <div className="lg:col-span-5 relative w-full pt-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#F4EFE6] border border-[#E3DACD] shadow-elevated"
            >
              {/* Handwritten Note positioned snugly on top corner */}
              <div className="absolute -top-5 right-6 flex items-center gap-1.5 z-20 pointer-events-none">
                <span className="handwriting text-2xl sm:text-3xl text-charcoal font-bold transform -rotate-6 select-none bg-[#F7F2EB] px-2 py-0.5 rounded-lg border border-[#E3DACD]">
                  Over 12K+ Verified
                </span>
                <svg className="w-6 h-6 text-amber transform rotate-12 -translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Card Header with View Switcher */}
              <div className="flex items-center justify-between border-b border-[#E5DDCF] pb-4 mb-5">
                <div>
                  <h3 className="font-bold text-charcoal text-sm font-sans flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-dark" />
                    AI System Telemetry & Architecture
                  </h3>
                  <p className="text-[11px] font-mono text-charcoal-muted mt-0.5">
                    Live verification metrics across Dhiraj's pipelines
                  </p>
                </div>

                {/* View Switcher: Chart vs Agent Topology */}
                <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-[#E5DDCF]">
                  <button
                    onClick={() => {
                      sounds.playTap();
                      setViewMode('chart');
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      viewMode === 'chart' 
                        ? 'bg-charcoal text-white' 
                        : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    Benchmark
                  </button>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      setViewMode('network');
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      viewMode === 'network' 
                        ? 'bg-amber text-charcoal-deep' 
                        : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    Agent Nodes
                  </button>
                </div>
              </div>

              {/* VIEW 1: Benchmark Bar Chart (Directly inspired by reference image) */}
              {viewMode === 'chart' ? (
                <div>
                  <div className="h-60 sm:h-64 w-full flex items-end justify-between gap-1.5 sm:gap-2 px-2 pb-2 pt-6 bg-[#FAF7F2]/90 rounded-2xl border border-[#E8DFC9] relative">
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
                            transition={{ duration: 0.8, delay: idx * 0.04, ease: "easeOut" }}
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
                  <div className="mt-3.5 p-3 rounded-xl bg-white border border-[#E5DDCF] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${activeBar === 2 ? 'bg-amber' : 'bg-charcoal'}`} />
                      <span className="font-semibold text-charcoal">
                        {activeBar !== null ? signatureChartData[activeBar].label : 'Select a pipeline node'}
                      </span>
                    </div>
                    <div className="font-mono text-charcoal-muted text-[11px]">
                      {activeBar === 2 ? (
                        <span className="text-amber-dark font-bold">★ 12,087 Mappings Sanitized</span>
                      ) : (
                        <span>Verified Invariant Pass</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* VIEW 2: Interactive 6-Agent Topology Network */
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFC9] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] font-mono pb-2 border-b border-[#E5DDCF]">
                    <span className="text-charcoal-muted font-bold">MCP ROUTER TOPOLOGY</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">6 SPECIALISTS ACTIVE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {specialistAgents.map((agent, aIdx) => (
                      <div 
                        key={aIdx}
                        className="p-2.5 rounded-xl bg-white border border-[#E5DDCF] hover:border-amber transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber" />
                          <span className="text-xs font-bold text-charcoal truncate">{agent.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-charcoal-muted block mt-0.5">{agent.role}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-charcoal text-white text-[11px] font-mono flex items-center justify-between">
                    <span>Protocol: Model Context Protocol (MCP)</span>
                    <span className="text-amber">JWT Auth ✓</span>
                  </div>
                </div>
              )}

              {/* Explanatory Caption answering "What does this represent?" */}
              <p className="text-[11px] text-charcoal-muted mt-3 font-mono leading-tight flex items-start gap-1.5">
                <span className="text-amber font-bold">ℹ</span>
                <span><strong>What this represents:</strong> Performance benchmarks across Dhiraj's 12 AI subsystems (AST Logic Judge, OWLv2 Vision, and 12,087 verified GL mappings).</span>
              </p>

            </motion.div>
          </div>
        </div>

        {/* Defensible Headline Numbers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
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
