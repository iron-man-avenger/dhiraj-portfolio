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
    <section id="overview" className="relative pt-16 sm:pt-20 md:pt-24 pb-16 md:pb-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative">
        
        {/* Right Watermark Logo: Large-Scale & Light-Shade, Displayed in Full & Flowing into Next Section */}
        <div className="absolute right-[-4%] sm:right-[-2%] md:right-0 lg:right-2 xl:right-4 top-1/2 -translate-y-1/2 w-[360px] sm:w-[480px] md:w-[580px] lg:w-[680px] xl:w-[760px] aspect-square pointer-events-none select-none z-0 opacity-25 sm:opacity-30 transition-all duration-500">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber/[0.15] via-[#FAF7F2]/40 to-transparent blur-3xl" />
          
          <DhirajLogo 
            variant="light" 
            className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(43,48,44,0.12)] drop-shadow-[0_8px_16px_rgba(43,48,44,0.06)]"
            title="Dhiraj Kumar Monogram"
          />
        </div>

        {/* Foreground Content: Shifted Above to Utilize Space */}
        <div className="relative z-10 max-w-2xl sm:max-w-3xl lg:max-w-4xl flex flex-col gap-5 sm:gap-6">
          
          {/* Minimalist Accolade Tag */}
          <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <span className="font-semibold text-charcoal">Microsoft Agentic AI Hackathon Winner</span>
            <span>•</span>
            <span>Azure OpenAI Category</span>
          </div>

          {/* Headline - Shifted Up, Impactful & Spacious */}
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold text-charcoal tracking-tight leading-[1.08] font-sans">
            Engineering intelligent agents that think, verify, and endure.
          </h1>

          {/* Subtitle / Intro - Style 2: Human & Craft-Driven */}
          <p className="text-base sm:text-lg text-charcoal-muted font-normal leading-relaxed max-w-xl sm:max-w-2xl">
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

      </div>
    </section>
  );
};
