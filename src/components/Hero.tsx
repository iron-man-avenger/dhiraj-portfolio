import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight,
  Play,
  Square
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { AgentSwarmCanvas } from './hero-options/AgentSwarmCanvas';
import { GravitationalTesseract } from './hero-options/GravitationalTesseract';
import { AgentTerminalSandbox } from './hero-options/AgentTerminalSandbox';

interface HeroProps {
  onOpenArcade: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArcade }) => {
  const [activeHeroTab, setActiveHeroTab] = useState<'swarm' | 'tesseract' | 'terminal'>('swarm');
  const [isPlayingTheme, setIsPlayingTheme] = useState(false);
  const cancelThemeRef = useRef<(() => void) | null>(null);

  // Clean up any running playback on unmount
  useEffect(() => {
    return () => {
      if (cancelThemeRef.current) {
        cancelThemeRef.current();
      }
    };
  }, []);

  const handlePlayFullSuite = () => {
    if (isPlayingTheme) {
      if (cancelThemeRef.current) {
        cancelThemeRef.current();
        cancelThemeRef.current = null;
      }
      setIsPlayingTheme(false);
      return;
    }

    setIsPlayingTheme(true);
    const cancel = sounds.playInterstellarTheme(
      () => {},
      () => {
        setIsPlayingTheme(false);
        cancelThemeRef.current = null;
      }
    );
    cancelThemeRef.current = cancel;
  };


  return (
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
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

            {/* Headline - Style 2: Human & Craft-Driven */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-charcoal tracking-tight leading-[1.08] font-sans">
              Engineering intelligent agents that think, verify, and endure.
            </h1>

            {/* Subtitle / Intro - Style 2: Human & Craft-Driven */}
            <p className="text-base sm:text-lg text-charcoal-muted font-normal leading-relaxed max-w-xl">
              I’m <span className="font-semibold text-charcoal">{personalInfo.name}</span>. I bridge the gap between stochastic AI models and rock-solid deterministic software—building resilient agent swarms and computer vision systems.
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

          {/* Right Column (5 cols): Interactive Hero Showcase (3 Switchable Options) */}
          <div className="lg:col-span-5 relative w-full pt-1">
            <div className="p-5 sm:p-6 rounded-3xl bg-[#F4EFE6]/90 border border-[#E3DACD] shadow-sm">
              
              {/* Header: Option Switcher Tabs + Ambient Theme Audio Toggle */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3DACD]/70 gap-2 flex-wrap">
                {/* 3 Interactive Options Switcher */}
                <div className="flex items-center gap-1 p-1 bg-white/80 rounded-full border border-[#E0D5C3] shadow-2xs">
                  <button
                    onClick={() => { sounds.playPillSelect(); setActiveHeroTab('swarm'); }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      activeHeroTab === 'swarm'
                        ? 'bg-charcoal text-white shadow-sm'
                        : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>🌟 Agent Swarm</span>
                  </button>

                  <button
                    onClick={() => { sounds.playPillSelect(); setActiveHeroTab('tesseract'); }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      activeHeroTab === 'tesseract'
                        ? 'bg-charcoal text-white shadow-sm'
                        : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>🪐 Tesseract</span>
                  </button>

                  <button
                    onClick={() => { sounds.playPillSelect(); setActiveHeroTab('terminal'); }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      activeHeroTab === 'terminal'
                        ? 'bg-charcoal text-white shadow-sm'
                        : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>⚡ Live Terminal</span>
                  </button>
                </div>

                {/* Ambient Interstellar Theme Player (Low-volume atmospheric score) */}
                <button
                  onClick={handlePlayFullSuite}
                  className={`px-3 py-1 rounded-full border text-[11px] font-mono font-semibold transition-all flex items-center gap-1.5 shadow-2xs ${
                    isPlayingTheme
                      ? 'bg-amber text-charcoal border-amber shadow-glow-amber animate-pulse'
                      : 'bg-white/80 border-[#E0D5C3] text-charcoal hover:border-amber hover:text-amber-dark hover:bg-white'
                  }`}
                  title={isPlayingTheme ? "Stop Interstellar Theme" : "Play Hans Zimmer Interstellar Theme (Soft Background Ambience)"}
                >
                  {isPlayingTheme ? (
                    <Square className="w-2.5 h-2.5 fill-current" />
                  ) : (
                    <Play className="w-2.5 h-2.5 fill-current text-amber-dark" />
                  )}
                  <span>{isPlayingTheme ? 'Ambience Playing' : 'Interstellar'}</span>
                </button>
              </div>

              {/* Dynamic View for the Selected Option */}
              <div className="relative w-full">
                {activeHeroTab === 'swarm' && <AgentSwarmCanvas />}
                {activeHeroTab === 'tesseract' && <GravitationalTesseract />}
                {activeHeroTab === 'terminal' && <AgentTerminalSandbox />}
              </div>

              {/* Minimalist Subtext Guide */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-charcoal-muted border-t border-[#E3DACD]/50 pt-2">
                <span className="text-[#2B302C] font-semibold flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                  <span className="truncate">
                    {activeHeroTab === 'swarm' && 'Drag nodes with cursor to test elastic spring physics'}
                    {activeHeroTab === 'tesseract' && 'Move mouse to curve relativistic gravitational space-time'}
                    {activeHeroTab === 'terminal' && 'Run verified scenarios or type custom CLI commands'}
                  </span>
                </span>
                <span className="text-[10px] text-charcoal-muted/70 shrink-0 ml-2">Interactive Showcase</span>
              </div>

            </div>
          </div>
        </div>

        {/* End of Hero Section */}

      </div>
    </section>
  );
};
