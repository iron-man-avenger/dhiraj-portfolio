import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Music,
  Play,
  Square
} from 'lucide-react';
import { personalInfo, headlineMetrics, signatureChartData } from '../data/portfolioData';
import { sounds, INTERSTELLAR_NODES, INTERSTELLAR_PATTERNS } from '../utils/soundEffects';

interface HeroProps {
  onOpenArcade: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArcade }) => {
  const [activeBar, setActiveBar] = useState<number | null>(2);
  const [activePattern, setActivePattern] = useState<number | null>(1);
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
      setActivePattern(node.patternIndex);
      sounds.playOrganPipe(node);
    }
  };

  const handlePlayPattern = (patternId: number) => {
    if (cancelThemeRef.current) {
      cancelThemeRef.current();
      cancelThemeRef.current = null;
    }
    setActivePattern(patternId);
    setIsPlayingTheme(true);
    const cancel = sounds.playInterstellarPattern(
      patternId,
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
        const node = INTERSTELLAR_NODES[bIdx];
        if (node) setActivePattern(node.patternIndex);
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

  const currentNode = activeBar !== null ? INTERSTELLAR_NODES[activeBar] : null;

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

          {/* Right Column (5 cols): Interactive Interstellar Pipe Organ & Telemetry */}
          <div className="lg:col-span-5 relative w-full pt-1">
            <div className="p-5 sm:p-6 rounded-3xl bg-[#F4EFE6]/90 border border-[#E3DACD] shadow-sm">
              
              {/* Header: Telemetry Title & Interstellar Play Button */}
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#E3DACD]/70 gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-dark font-bold block">
                      System Telemetry
                    </span>
                    <span className="text-[10px] text-charcoal-muted">•</span>
                    <span className="text-[10px] font-mono text-charcoal-muted flex items-center gap-1">
                      <Music className="w-2.5 h-2.5 text-amber" />
                      <span>Hans Zimmer Pipe Organ</span>
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-charcoal font-sans mt-0.5">
                    Pipeline Invariant Verification
                  </h3>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden sm:block handwriting text-xl text-charcoal font-bold transform -rotate-3 select-none">
                    Over 12K+ Verified
                  </div>
                  <button
                    onClick={handlePlayFullSuite}
                    className={`px-3 py-1.5 rounded-full border text-[11px] font-mono font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                      isPlayingTheme
                        ? 'bg-amber text-charcoal border-amber shadow-glow-amber animate-pulse'
                        : 'bg-white/90 border-[#E0D5C3] text-charcoal hover:border-amber hover:text-amber-dark hover:bg-white'
                    }`}
                    title={isPlayingTheme ? "Stop Interstellar Theme" : "Play Full Hans Zimmer Interstellar Suite"}
                  >
                    {isPlayingTheme ? (
                      <Square className="w-2.5 h-2.5 fill-current" />
                    ) : (
                      <Play className="w-2.5 h-2.5 fill-current text-amber-dark" />
                    )}
                    <span>{isPlayingTheme ? 'Playing...' : 'Play Suite'}</span>
                  </button>
                </div>
              </div>

              {/* GUIDE ABOVE GRAPH: Authentic Interstellar Letters & Bass Chord Guide */}
              <div className="mb-3 p-3 rounded-2xl bg-white/80 border border-[#E8DFC9] shadow-inner">
                {/* Guide Title & Current Bass Pedal Indicator */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFE7D8] text-[10px] font-mono">
                  <span className="font-bold text-charcoal flex items-center gap-1">
                    <span>🎹</span>
                    <span>Interstellar Motif Guide:</span>
                    <span className="font-normal text-charcoal-muted hidden sm:inline">Alternate to E with deep bass</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber/20 text-amber-dark font-extrabold border border-amber/40">
                    {currentNode?.bassName ? currentNode.bassName : 'Am (A Minor)'}
                  </span>
                </div>

                {/* Mobile-Friendly Full-Width Tap to Play Button (Visible on mobile/tablet) */}
                <button
                  onClick={handlePlayFullSuite}
                  className={`sm:hidden w-full mb-2.5 py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                    isPlayingTheme
                      ? 'bg-amber text-charcoal border-amber shadow-glow-amber animate-pulse'
                      : 'bg-charcoal text-white border-charcoal hover:bg-charcoal-deep active:scale-[0.98]'
                  }`}
                >
                  {isPlayingTheme ? (
                    <Square className="w-3 h-3 fill-current" />
                  ) : (
                    <Play className="w-3 h-3 fill-current text-amber" />
                  )}
                  <span>{isPlayingTheme ? 'Playing Interstellar Theme...' : '▶ Tap to Play Interstellar Theme'}</span>
                </button>

                {/* 5 Pattern Interactive Cards (A-E, B-E, C-E, D-E, Return B-E) */}
                <div className="grid grid-cols-5 gap-1 text-center font-mono">
                  {INTERSTELLAR_PATTERNS.map((p) => {
                    const isCur = activePattern === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handlePlayPattern(p.id)}
                        className={`p-1 sm:p-1.5 rounded-lg border text-left transition-all active:scale-95 touch-manipulation ${
                          isCur
                            ? 'bg-charcoal text-white border-charcoal shadow-sm'
                            : 'bg-[#FAF7F2] text-charcoal border-[#EADFCB] hover:border-amber hover:bg-white'
                        }`}
                        title={p.description}
                      >
                        <div className="flex items-center justify-between text-[8px] sm:text-[9px] leading-tight">
                          <span className={isCur ? 'text-amber' : 'text-charcoal-muted'}>{p.name.replace('Pattern ', 'P')}</span>
                          <span className="font-bold text-[8px] sm:text-[9px]">{p.bassChord}</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold tracking-tight mt-0.5 truncate">
                          {p.noteSequenceText}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* 12-Letter Piano Ribbon directly above the 12 bars */}
                <div className="mt-2.5 pt-2 border-t border-[#EFE7D8]">
                  <div className="flex items-center justify-between gap-0.5 sm:gap-1 text-[10px] font-mono text-center">
                    {INTERSTELLAR_NODES.map((node, idx) => {
                      const isHovered = activeBar === idx;
                      return (
                        <button
                          key={idx}
                          onTouchStart={(e) => {
                            e.preventDefault();
                            handleBarTrigger(idx);
                          }}
                          onClick={() => handleBarTrigger(idx)}
                          className={`flex-1 py-1.5 sm:py-1 rounded transition-all font-bold touch-manipulation active:scale-95 ${
                            isHovered
                              ? 'bg-amber text-charcoal ring-1 ring-amber-dark shadow-sm scale-105'
                              : node.note === 'E'
                                ? 'bg-[#F2ECE0] text-charcoal-muted hover:bg-amber/20 hover:text-charcoal'
                                : 'bg-charcoal text-white hover:bg-charcoal-muted'
                          }`}
                          title={`Bar ${idx + 1}: Note ${node.note} (${node.octaveNote}) ${node.bassChord ? `• ${node.bassChord} Bass` : ''}`}
                        >
                          {node.note}
                        </button>
                      );
                    })}
                  </div>
                  {/* Subtle Bass Chord Bracket Line */}
                  <div className="mt-1 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-charcoal-muted px-1">
                    <span className="w-4/12 text-left font-semibold text-amber-dark">├─ Am Bass ─┤</span>
                    <span className="w-4/12 text-center font-semibold text-amber-dark">├─ G Bass ─┤</span>
                    <span className="w-4/12 text-right font-semibold text-amber-dark">├─ F Bass ─┤</span>
                  </div>
                </div>
              </div>

              {/* The 12-Bar Interactive Musical Keyboard & Telemetry Graph */}
              <div 
                onTouchStart={handleTouchMove}
                onTouchMove={handleTouchMove}
                className="h-48 sm:h-52 w-full flex items-end justify-between gap-1 sm:gap-1.5 px-2 pb-2 pt-6 bg-white/70 rounded-2xl border border-[#E8DFC9] relative select-none touch-pan-y"
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
