import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Play,
  Square
} from 'lucide-react';
import { personalInfo, headlineMetrics, signatureChartData } from '../data/portfolioData';
import { sounds, INTERSTELLAR_NODES } from '../utils/soundEffects';

interface HeroProps {
  onOpenArcade: () => void;
}

const TARGET_MOTIF = ['A', 'E', 'B', 'E', 'C', 'E', 'D', 'E'];

export const Hero: React.FC<HeroProps> = ({ onOpenArcade }) => {
  const [activeBar, setActiveBar] = useState<number | null>(2);
  const [matchedCount, setMatchedCount] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);
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

  const handleBarTrigger = (idx: number) => {
    if (cancelThemeRef.current) {
      cancelThemeRef.current();
      cancelThemeRef.current = null;
      setIsPlayingTheme(false);
    }
    setActiveBar(idx);
    const node = INTERSTELLAR_NODES[idx];
    if (node) {
      sounds.playOrganPipe(node);

      // Interactive tune matching game
      if (!hasWon) {
        const expectedNote = TARGET_MOTIF[matchedCount];
        if (node.note === expectedNote) {
          const nextCount = matchedCount + 1;
          setMatchedCount(nextCount);
          if (nextCount === TARGET_MOTIF.length) {
            setHasWon(true);
            sounds.playTesseractVictory();
          }
        } else {
          // If they hit 'A', start at 1, else reset
          if (node.note === TARGET_MOTIF[0]) {
            setMatchedCount(1);
          } else {
            setMatchedCount(0);
          }
        }
      }
    }
  };

  const handleResetGame = () => {
    setMatchedCount(0);
    setHasWon(false);
    sounds.playTap();
  };

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
      (bIdx) => {
        setActiveBar(bIdx);
      },
      () => {
        setIsPlayingTheme(false);
        cancelThemeRef.current = null;
      }
    );
    cancelThemeRef.current = cancel;
  };

  // Support sweeping touch on mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const barElem = element?.closest('[data-bar-index]');
      if (barElem) {
        const idx = Number(barElem.getAttribute('data-bar-index'));
        if (!isNaN(idx) && idx !== activeBar) {
          handleBarTrigger(idx);
        }
      }
    }
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

          {/* Right Column (5 cols): Interactive Interstellar Pipe Organ & Telemetry */}
          <div className="lg:col-span-5 relative w-full pt-1">
            <div className="p-5 sm:p-6 rounded-3xl bg-[#F4EFE6]/90 border border-[#E3DACD] shadow-sm">
              
              {/* Header: Telemetry Title & Handwriting Note */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3DACD]/70 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-dark font-bold block">
                    System Telemetry
                  </span>
                  <h3 className="text-xs font-bold text-charcoal font-sans mt-0.5">
                    Pipeline Invariant Verification
                  </h3>
                </div>

                <div className="handwriting text-xl text-charcoal font-bold transform -rotate-3 select-none">
                  Over 12K+ Verified
                </div>
              </div>

              {/* Minimalist Interstellar Challenge & Theme Play Ribbon (Zero Clutter) */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3DACD]/70 text-xs font-mono gap-2">
                {/* Challenge Progress / Victory Announcement */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-amber text-sm select-none">🎹</span>
                  {hasWon ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-amber-dark flex items-center gap-1 text-[11px] sm:text-xs">
                        <span className="animate-spin text-amber">✦</span>
                        <span>Tesseract Resonance Unlocked! (100% Match)</span>
                      </span>
                      <button
                        onClick={handleResetGame}
                        className="text-[10px] text-charcoal underline hover:text-amber-dark ml-1"
                      >
                        Play Again
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal">Play Tune:</span>
                      <div className="flex items-center gap-1">
                        {TARGET_MOTIF.map((letter, i) => {
                          const isDone = matchedCount > i;
                          const isNext = matchedCount === i;
                          return (
                            <span
                              key={i}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                                isDone
                                  ? 'bg-amber text-charcoal shadow-sm'
                                  : isNext
                                    ? 'bg-charcoal text-white ring-1 ring-amber animate-pulse'
                                    : 'bg-black/5 text-charcoal-muted'
                              }`}
                              title={`Step ${i + 1}: ${letter}`}
                            >
                              {letter}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actual Theme Play Button */}
                <button
                  onClick={handlePlayFullSuite}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-mono font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-sm ${
                    isPlayingTheme
                      ? 'bg-amber text-charcoal border-amber shadow-glow-amber animate-pulse'
                      : 'bg-white/90 border-[#E0D5C3] text-charcoal hover:border-amber hover:text-amber-dark hover:bg-white'
                  }`}
                  title={isPlayingTheme ? "Stop Interstellar Theme" : "Play Actual Hans Zimmer Interstellar Theme"}
                >
                  {isPlayingTheme ? (
                    <Square className="w-2.5 h-2.5 fill-current" />
                  ) : (
                    <Play className="w-2.5 h-2.5 fill-current text-amber-dark" />
                  )}
                  <span>{isPlayingTheme ? 'Playing...' : 'Play Theme'}</span>
                </button>
              </div>

              {/* The 12-Bar Interactive Musical Keyboard & Telemetry Graph */}
              <div 
                onTouchStart={handleTouchMove}
                onTouchMove={handleTouchMove}
                className="h-52 sm:h-56 w-full flex items-end justify-between gap-1 sm:gap-1.5 px-2 pb-2 pt-6 bg-white/70 rounded-2xl border border-[#E8DFC9] relative select-none touch-pan-y"
              >
                {signatureChartData.map((bar, idx) => {
                  const isAmber = bar.isAccent;
                  const isHovered = activeBar === idx;
                  const nodeMeta = INTERSTELLAR_NODES[idx];

                  return (
                    <div 
                      key={bar.label}
                      data-bar-index={idx}
                      onMouseEnter={() => handleBarTrigger(idx)}
                      onClick={() => handleBarTrigger(idx)}
                      className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer"
                    >
                      {/* Floating Note & Metric Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 z-30 px-2.5 py-1 rounded-md bg-charcoal text-white text-[10px] font-mono whitespace-nowrap shadow-xl border border-charcoal-muted/30 pointer-events-none flex flex-col items-center">
                          <div className="flex items-center gap-1.5">
                            <span className="text-amber font-bold">🎵 {nodeMeta?.note} ({nodeMeta?.octaveNote})</span>
                            {nodeMeta?.bassChord && (
                              <>
                                <span className="text-white/40">•</span>
                                <span className="text-amber-light font-semibold">{nodeMeta.bassChord} Bass</span>
                              </>
                            )}
                          </div>
                          <span className="text-white/80 text-[9px]">{bar.label}: <strong className="text-amber">{bar.value}%</strong></span>
                        </div>
                      )}

                      {/* Musical Bar Pillar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.height }}
                        transition={{ duration: 0.7, delay: idx * 0.02, ease: "easeOut" }}
                        className={`w-full rounded-t-md transition-all duration-150 ${
                          isAmber 
                            ? 'bg-amber shadow-glow-amber ring-1 ring-amber/50' 
                            : isHovered
                              ? 'bg-charcoal ring-2 ring-amber/80 shadow-md -translate-y-1'
                              : 'bg-charcoal hover:bg-charcoal-muted'
                        }`}
                      />

                      {/* Piano Note Subtitle Under Each Bar */}
                      <span className={`text-[9px] font-mono mt-1 transition-colors leading-none font-bold ${
                        isHovered ? 'text-amber-dark' : 'text-charcoal-muted/70 group-hover:text-charcoal'
                      }`}>
                        {nodeMeta?.note}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Inspection Ticker */}
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-charcoal-muted">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse shrink-0" />
                  <span className="text-charcoal font-semibold truncate">
                    {activeBar !== null 
                      ? `${INTERSTELLAR_NODES[activeBar]?.note} (${INTERSTELLAR_NODES[activeBar]?.octaveNote}) • ${signatureChartData[activeBar].label}`
                      : 'Hover or sweep nodes'
                    }
                  </span>
                </div>
                <span className="text-[11px] shrink-0 ml-2">
                  {activeBar !== null ? (
                    <span className="text-amber-dark font-medium">
                      {INTERSTELLAR_NODES[activeBar]?.bassChord 
                        ? `${INTERSTELLAR_NODES[activeBar]?.bassChord} Pedal • 100% Invariant` 
                        : 'E5 Alternating Pedal'}
                    </span>
                  ) : (
                    'Temple Church Pipe Organ'
                  )}
                </span>
              </div>

              {/* Minimalist Interaction Prompt */}
              <p className="text-[10px] font-mono text-charcoal-muted/80 mt-1.5 text-center sm:text-left">
                Sweep left-to-right across the nodes to hear the iconic Hans Zimmer Interstellar organ progression.
              </p>

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
