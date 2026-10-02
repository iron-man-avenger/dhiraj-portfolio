import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { DhirajLogo } from './DhirajLogo';

interface HeroProps {
  onOpenArcade: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArcade }) => {
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
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top: Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
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

            {/* Clean Action Buttons & Theme Audio Control */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
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

              {/* Theme Soundtrack Audio Pill */}
              <button
                onClick={handlePlayFullSuite}
                className={`px-4 py-2.5 rounded-full border text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-2 shadow-2xs ${
                  isPlayingTheme
                    ? 'bg-amber text-charcoal border-amber shadow-glow-amber animate-pulse'
                    : 'bg-white/80 border-[#E3DACD] text-charcoal hover:border-amber hover:text-amber-dark hover:bg-white'
                }`}
                title={isPlayingTheme ? "Pause Interstellar Theme" : "Play Hans Zimmer Interstellar Theme"}
              >
                <span className={`w-2 h-2 rounded-full ${isPlayingTheme ? 'bg-charcoal animate-ping' : 'bg-amber'}`} />
                <span>{isPlayingTheme ? 'Playing Theme' : 'Play Theme'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenArcade();
                }}
                className="px-3.5 py-2.5 text-xs font-bold text-charcoal-muted hover:text-charcoal transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span>Play Mini-Game</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Sculptural Brand Logo in Large Scale (Replacing Synthesizer Box) */}
          <div className="lg:col-span-5 flex items-center justify-center relative select-none w-full py-6 lg:py-0">
            {/* Subtle Ambient Radial Lighting */}
            <div className="absolute w-[280px] sm:w-[380px] lg:w-[460px] aspect-square rounded-full bg-gradient-to-tr from-amber/[0.12] via-[#FAF7F2]/50 to-transparent blur-3xl pointer-events-none" />

            {/* Sculptural Vector Logo in Bigger Size */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] aspect-square flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(43,48,44,0.12)] drop-shadow-[0_10px_20px_rgba(43,48,44,0.06)] transition-transform duration-500 hover:scale-[1.03] group">
              <DhirajLogo 
                variant="light" 
                className="w-full h-full object-contain"
                title="Dhiraj Kumar Monogram"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
