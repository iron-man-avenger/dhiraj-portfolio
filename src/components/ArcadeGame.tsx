import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Play, RotateCcw, Pause, Trophy, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { DhirajLogo } from './DhirajLogo';
import { CountUpText, MaskedWords } from './motion/primitives';
import { BACK_OUT, EXPO_IN_OUT, EXPO_OUT } from './motion/tokens';
import { COLORS, Engine, H, W, drawEntity } from './arcade/engine';

const MAX_FIELD_H = 1100;
import type { EntityKind, Input, Stats } from './arcade/engine';

interface ArcadeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

type Phase = 'ready' | 'countdown' | 'playing' | 'paused' | 'gameover';

const HIGH_SCORE_KEY = 'dk_arcade_high_score';
const LAYER_NAMES = ['Ingestion', 'Grounding', 'Routing', 'Verification', 'Production'];

const readHighScore = () => {
  try {
    return parseInt(localStorage.getItem(HIGH_SCORE_KEY) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
};

const LEGEND: { kind: EntityKind; name: string; note: string }[] = [
  { kind: 'token', name: 'Data token', note: 'Catch · +100' },
  { kind: 'mcp', name: 'MCP shield', note: 'Catch · 6s shield' },
  { kind: 'bug', name: 'Bug', note: 'Zap · +150' },
  { kind: 'hallucination', name: 'Hallucination', note: 'Zap · it drifts' },
];

/** A legend icon drawn by the same code that draws the game, so they always match. */
const SpriteIcon: React.FC<{ kind: EntityKind }> = ({ kind }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 56 * dpr;
    canvas.height = 44 * dpr;
    ctx.scale(dpr, dpr);
    drawEntity(ctx, kind, 28, 22, kind === 'mcp' ? 28 : 32, 'SQL', 0, 0.3);
  }, [kind]);
  return <canvas ref={ref} className="w-11 h-9 sm:w-14 sm:h-11 shrink-0" aria-hidden="true" />;
};

/** Mounted only while open, so every visit starts from a fresh start screen. */
export const ArcadeGame: React.FC<ArcadeGameProps> = ({ isOpen, onClose }) => (
  <AnimatePresence>{isOpen && <ArcadePanel key="arcade" onClose={onClose} />}</AnimatePresence>
);

const ArcadePanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);
  const [engine] = useState(() => new Engine());
  // Phones open straight into full screen; larger screens open windowed with an expand button
  const [expanded, setExpanded] = useState(() => window.matchMedia('(max-width: 639px)').matches);
  const inputRef = useRef<Input>({ left: false, right: false, targetX: null, fire: false });
  const phaseRef = useRef<Phase>('ready');

  const [phase, setPhaseState] = useState<Phase>('ready');
  const [hud, setHud] = useState<Stats | null>(null);
  const [highScore, setHighScore] = useState(readHighScore);
  const [newBest, setNewBest] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [banner, setBanner] = useState<number | null>(null);

  const setPhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);


  const startGame = useCallback(() => {
    sounds.playTap();
    engine.reset();
    setHud({ ...engine.stats });
    setNewBest(false);
    setBanner(null);
    setCountdown(3);
    setPhase('countdown');
  }, [engine, setPhase]);

  const close = useCallback(() => {
    sounds.playTap();
    onClose();
  }, [onClose]);

  const toggleExpanded = () => {
    sounds.playTap();
    setExpanded((v) => !v);
  };

  // The page behind stays put while the arcade is open
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  // Size the canvas to the screen box: width stays W, the playfield grows taller in a tall full screen
  useEffect(() => {
    const screen = screenRef.current;
    const canvas = canvasRef.current;
    if (!screen || !canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fit = () => {
      // Layout size, not getBoundingClientRect: the expand animation scales the box mid-flight
      engine.resize(screen.clientWidth, screen.clientHeight);
      canvas.width = W * dpr;
      canvas.height = engine.height * dpr;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(screen);
    return () => observer.disconnect();
  }, [engine]);

  // 3-2-1 before play
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdown === 0) {
      const go = setTimeout(() => setPhase('playing'), 450);
      return () => clearTimeout(go);
    }
    const tick = setTimeout(() => {
      sounds.playTap();
      setCountdown((c) => c - 1);
    }, 650);
    return () => clearTimeout(tick);
  }, [phase, countdown, setPhase]);

  // Layer banner hides itself
  useEffect(() => {
    if (banner === null) return;
    const hide = setTimeout(() => setBanner(null), 1600);
    return () => clearTimeout(hide);
  }, [banner]);

  // Keyboard
  useEffect(() => {
    const key = (down: boolean) => (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'arrowleft' || k === 'a') inputRef.current.left = down;
      if (k === 'arrowright' || k === 'd') inputRef.current.right = down;
      if (k === ' ' || k === 'arrowup' || k === 'w') {
        e.preventDefault();
        inputRef.current.fire = down;
      }
      if (!down) return;
      if (k === 'escape') close();
      if (k === 'p') {
        if (phaseRef.current === 'playing') setPhase('paused');
        else if (phaseRef.current === 'paused') setPhase('playing');
      }
      if (k === 'enter' && (phaseRef.current === 'ready' || phaseRef.current === 'gameover')) startGame();
    };
    const onDown = key(true);
    const onUp = key(false);
    // Leaving the tab pauses the run
    const onHide = () => document.hidden && phaseRef.current === 'playing' && setPhase('paused');
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    document.addEventListener('visibilitychange', onHide);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, [close, startGame, setPhase]);

  // One loop for as long as the arcade is open: the world simulates while playing, and keeps drifting otherwise
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frame = 0;
    let last = performance.now();
    let lastHud = '';

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      if (phaseRef.current === 'playing') {
        const events = engine.update(dt, inputRef.current);
        for (const event of events) {
          if (event.type === 'fire') sounds.playLaser();
          if (event.type === 'collect') sounds.playTokenCollect();
          if (event.type === 'shield') sounds.playSuccess();
          if (event.type === 'zap' || event.type === 'hit') sounds.playExplosion();
          if (event.type === 'layer') setBanner(event.layer);
          if (event.type === 'gameover') {
            const final = engine.stats.score;
            const best = readHighScore();
            if (final > best) {
              setHighScore(final);
              setNewBest(true);
              try {
                localStorage.setItem(HIGH_SCORE_KEY, String(final));
              } catch { /* storage blocked */ }
              sounds.playTesseractVictory();
              try {
                confetti({ particleCount: 90, spread: 75, origin: { y: 0.55 }, colors: [COLORS.amber, COLORS.ecru, COLORS.amberLight] });
              } catch { /* no canvas */ }
            }
            setPhase('gameover');
          }
        }
      } else {
        engine.ambient(dt);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      engine.draw(ctx, !!reduce);

      // Only touch React state when the HUD actually changes
      const s = engine.stats;
      const key = `${s.score}|${s.lives}|${Math.ceil(s.shield * 10)}|${s.combo}|${s.layer}`;
      if (key !== lastHud) {
        lastHud = key;
        setHud({ ...s });
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [engine, setPhase, reduce]);

  // Pointer steering: drag or hover moves; holding down on touch also fires
  const toField = (clientX: number) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * W;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (phaseRef.current !== 'playing') return;
    inputRef.current.targetX = toField(e.clientX);
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (phaseRef.current !== 'playing') return;
    inputRef.current.targetX = toField(e.clientX);
    inputRef.current.fire = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    inputRef.current.fire = false;
    if (e.pointerType !== 'mouse') inputRef.current.targetX = null;
  };
  const onPointerLeave = () => {
    inputRef.current.targetX = null;
    inputRef.current.fire = false;
  };

  const hold = (field: 'left' | 'right' | 'fire') => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      inputRef.current.targetX = null;
      inputRef.current[field] = true;
    },
    onPointerUp: () => (inputRef.current[field] = false),
    onPointerLeave: () => (inputRef.current[field] = false),
  });

  const multiplier = hud ? Math.min(4, 1 + Math.floor(hud.combo / 8)) : 1;
  const showHud = phase === 'playing' || phase === 'paused' || phase === 'countdown';

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
          onClick={(e) => e.target === e.currentTarget && close()}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 backdrop-blur-md ${expanded ? 'p-0' : 'p-3 sm:p-6'}`}
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.6, ease: EXPO_IN_OUT, layout: { duration: 0.5, ease: EXPO_IN_OUT } }}
            style={{ borderRadius: expanded ? 0 : 24 }}
            className={`relative w-full bg-[#F7F2EB] shadow-2xl ${
              expanded
                ? 'h-[100dvh] flex flex-col p-3 sm:p-5 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
                : 'max-w-[600px] max-h-[96vh] overflow-y-auto border border-[#E3DACD] p-4 sm:p-6'
            }`}
          >
            {/* Header */}
            <motion.div layout="position" className={`flex items-center justify-between gap-3 border-b border-[#E3DACD] shrink-0 ${expanded ? 'pb-3 mb-3' : 'pb-4 mb-4'}`}>
              <div className="flex items-center gap-3 min-w-0">
                <DhirajLogo variant="light" className="w-9 h-9 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-base sm:text-lg text-charcoal tracking-tight leading-tight truncate">Agentic Token Defender</h3>
                  <p className={`text-[11px] font-mono text-charcoal-muted truncate ${expanded ? 'hidden sm:block' : ''}`}>Keep the pipeline clean. Catch data, zap bugs.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber/15 border border-amber/30 text-[11px] font-mono font-bold text-charcoal">
                  <Trophy className="w-3.5 h-3.5 text-amber-dark" />
                  <span>BEST {highScore.toLocaleString()}</span>
                </div>
                <button
                  onClick={toggleExpanded}
                  className="p-2 rounded-full border border-[#E3DACD] text-charcoal-muted hover:text-charcoal hover:border-charcoal transition-colors"
                  aria-label={expanded ? 'Exit full screen' : 'Full screen'}
                  title={expanded ? 'Exit full screen' : 'Full screen'}
                >
                  {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={close}
                  className="p-2 rounded-full border border-[#E3DACD] text-charcoal-muted hover:text-charcoal hover:border-charcoal transition-colors"
                  aria-label="Close game"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* The screen. Full screen: as large as fits, never wider than 520:460 or taller than 520:1100 */}
            <div className={expanded ? 'flex-1 min-h-0 flex items-center justify-center [container-type:size]' : ''}>
            <div
              ref={screenRef}
              style={
                expanded
                  ? {
                      width: `min(100cqw, calc(100cqh * ${W} / ${H}))`,
                      height: `min(100cqh, calc(min(100cqw, 100cqh * ${W} / ${H}) * ${MAX_FIELD_H} / ${W}))`,
                    }
                  : undefined
              }
              className={`relative rounded-2xl overflow-hidden bg-[#1C201D] border border-charcoal-border select-none touch-none ${expanded ? '' : 'w-full aspect-[26/23]'}`}
            >
              <canvas
                ref={canvasRef}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerLeave}
                className="absolute inset-0 w-full h-full cursor-crosshair"
              />

              {/* HUD */}
              <AnimatePresence>
                {showHud && hud && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EXPO_OUT }}
                    className="absolute top-0 inset-x-0 p-3 sm:p-4 flex items-start justify-between pointer-events-none font-mono"
                  >
                    <div>
                      <span className="block text-[10px] tracking-widest text-[#F7F2EB]/50">SCORE</span>
                      <motion.span
                        key={hud.score}
                        initial={{ scale: 1.25 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, ease: BACK_OUT }}
                        className="block origin-left text-lg sm:text-xl font-bold text-[#F7F2EB] tabular-nums"
                      >
                        {hud.score.toLocaleString()}
                      </motion.span>
                      <AnimatePresence>
                        {multiplier > 1 && (
                          <motion.span
                            key={multiplier}
                            initial={{ scale: 0, rotate: -12 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: BACK_OUT }}
                            className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber text-charcoal-deep text-[11px] font-extrabold"
                          >
                            COMBO ×{multiplier}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[10px] tracking-widest text-[#F7F2EB]/50">
                        LAYER {String(hud.layer).padStart(2, '0')}
                      </span>
                      {/* Lives are amber balls; a lost one drops away */}
                      <div className="flex gap-1.5" aria-label={`${hud.lives} lives`}>
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={i < hud.lives ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.5, opacity: 0.25, y: 4 }}
                            transition={{ duration: 0.45, ease: BACK_OUT }}
                            className="w-3 h-3 rounded-full bg-amber"
                          />
                        ))}
                      </div>
                      <AnimatePresence>
                        {hud.shield > 0 && (
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0 }}
                            className="origin-right flex items-center gap-1.5 text-[10px] font-bold text-amber"
                          >
                            <span>MCP SHIELD</span>
                            <span className="w-14 h-1 rounded-full bg-[#F7F2EB]/15 overflow-hidden">
                              <span className="block h-full bg-amber origin-left" style={{ transform: `scaleX(${hud.shield / 6})` }} />
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pause button while playing */}
              {phase === 'playing' && (
                <button
                  onClick={() => {
                    sounds.playTap();
                    setPhase('paused');
                  }}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-[#F7F2EB]/10 border border-[#F7F2EB]/15 text-[#F7F2EB]/70 hover:text-[#F7F2EB] transition-colors"
                  aria-label="Pause"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Layer banner */}
              <AnimatePresence>
                {banner !== null && (
                  <motion.div
                    key={banner}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    className="absolute inset-x-0 top-[38%] flex flex-col items-center pointer-events-none"
                  >
                    <div className="overflow-hidden">
                      <motion.p
                        initial={{ y: '104%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.8, ease: EXPO_OUT }}
                        className="font-mono text-[11px] tracking-[0.3em] text-amber"
                      >
                        LAYER {String(banner).padStart(2, '0')}
                      </motion.p>
                    </div>
                    <div className="overflow-hidden">
                      <motion.p
                        initial={{ y: '104%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.8, ease: EXPO_OUT, delay: 0.08 }}
                        className="text-2xl sm:text-3xl font-extrabold text-[#F7F2EB] tracking-tight"
                      >
                        {LAYER_NAMES[Math.min(banner, LAYER_NAMES.length) - 1]}
                      </motion.p>
                    </div>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.9, ease: EXPO_IN_OUT, delay: 0.15 }}
                      className="mt-2 w-24 h-px bg-amber/70"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Countdown */}
              <AnimatePresence mode="wait">
                {phase === 'countdown' && (
                  <motion.div
                    key={countdown}
                    initial={{ scale: 1.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.45, ease: BACK_OUT }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className={`font-extrabold tracking-tight ${countdown === 0 ? 'text-amber text-5xl sm:text-6xl' : 'text-[#F7F2EB] text-6xl sm:text-7xl'}`}>
                      {countdown === 0 ? 'GO' : countdown}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Start, pause and game-over screens */}
              <AnimatePresence mode="wait">
                {phase === 'ready' && (
                  <Overlay key="ready">
                    <p className="hidden sm:block font-mono text-[10px] tracking-[0.3em] text-amber mb-2">MINI-GAME</p>
                    <MaskedWords as="h4" text="Defend the pipeline" className="text-xl sm:text-3xl font-extrabold text-[#F7F2EB] tracking-tight mb-3 sm:mb-4" />
                    {/* Phones: a row of four icons; larger screens: a 2×2 legend with notes */}
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-1.5 sm:gap-3 w-full max-w-sm mb-4 sm:mb-5">
                      {LEGEND.map((item, i) => (
                        <motion.div
                          key={item.kind}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.25 + i * 0.07 }}
                          className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-[#F7F2EB]/[0.06] border border-[#F7F2EB]/10 text-center sm:text-left"
                        >
                          <SpriteIcon kind={item.kind} />
                          <div className="min-w-0">
                            <span className="block text-[10px] sm:text-xs font-bold text-[#F7F2EB] leading-tight">{item.name}</span>
                            <span className="hidden sm:block text-[10px] font-mono text-[#F7F2EB]/55 truncate">{item.note}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <PrimaryButton onClick={startGame} icon={<Play className="w-4 h-4 fill-charcoal-deep" />} label="Start game" />
                    <p className="mt-3 sm:mt-4 text-[10px] font-mono text-[#F7F2EB]/45 leading-relaxed">
                      <span className="hidden sm:inline">← → or A D to move · Space to fire · P to pause</span>
                      <span className="sm:hidden">Drag to steer · hold to fire</span>
                    </p>
                  </Overlay>
                )}

                {phase === 'paused' && (
                  <Overlay key="paused">
                    <MaskedWords as="h4" text="Paused" className="text-3xl font-extrabold text-[#F7F2EB] tracking-tight mb-5" />
                    <div className="flex gap-3">
                      <PrimaryButton
                        onClick={() => {
                          sounds.playTap();
                          setPhase('playing');
                        }}
                        icon={<Play className="w-4 h-4 fill-charcoal-deep" />}
                        label="Resume"
                      />
                      <GhostButton onClick={startGame} label="Restart" />
                    </div>
                  </Overlay>
                )}

                {phase === 'gameover' && hud && (
                  <Overlay key="gameover">
                    <p className="font-mono text-[10px] tracking-[0.3em] text-amber mb-1 sm:mb-2">PIPELINE HALTED</p>
                    <MaskedWords as="h4" text="Run complete" className="text-xl sm:text-3xl font-extrabold text-[#F7F2EB] tracking-tight mb-2 sm:mb-3" />
                    <div className="relative mb-3 sm:mb-4">
                      <CountUpText text={hud.score.toLocaleString('en-US')} className="block text-4xl sm:text-6xl font-extrabold text-amber tracking-tight tabular-nums" />
                      <AnimatePresence>
                        {newBest && (
                          <motion.span
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: -6 }}
                            transition={{ duration: 0.55, ease: BACK_OUT, delay: 1.2 }}
                            className="absolute -top-3 -right-10 sm:-right-14 px-2 py-0.5 rounded-full bg-[#F7F2EB] text-charcoal-deep text-[10px] font-extrabold font-mono"
                          >
                            NEW BEST
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-sm mb-4 sm:mb-6">
                      {[
                        ['Tokens', hud.tokens],
                        ['Bugs', hud.zapped],
                        ['Combo', hud.bestCombo],
                        ['Layer', hud.layer],
                      ].map(([label, value], i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.4 + i * 0.07 }}
                          className="p-2 rounded-xl bg-[#F7F2EB]/[0.06] border border-[#F7F2EB]/10"
                        >
                          <span className="block text-[9px] font-mono tracking-wider text-[#F7F2EB]/50 uppercase">{label}</span>
                          <span className="block text-sm font-bold font-mono text-[#F7F2EB]">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <PrimaryButton onClick={startGame} icon={<RotateCcw className="w-4 h-4" />} label="Play again" />
                      <GhostButton onClick={close} label="Close" />
                    </div>
                  </Overlay>
                )}
              </AnimatePresence>
            </div>
            </div>

            {/* Touch controls while playing */}
            {phase === 'playing' && (
              <div className="mt-3 flex items-center gap-2 sm:hidden shrink-0">
                <TouchKey label="◀" ariaLabel="Move left" {...hold('left')} />
                <TouchKey label="▶" ariaLabel="Move right" {...hold('right')} />
                <button
                  {...hold('fire')}
                  className="flex-1 h-12 rounded-xl bg-amber text-charcoal-deep font-bold text-xs tracking-wider active:scale-95 transition-transform select-none touch-none"
                >
                  HOLD TO FIRE
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
  );
};

const Overlay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.25 } }}
    transition={{ duration: 0.35 }}
    className="absolute inset-0 bg-[#1C201D]/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 sm:p-5 text-center overflow-y-auto"
  >
    {children}
  </motion.div>
);

const PrimaryButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-3 rounded-full bg-amber text-charcoal-deep font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-amber"
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);

const GhostButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.95 }}
    className="px-5 py-3 rounded-full border border-[#F7F2EB]/25 text-[#F7F2EB] font-semibold text-xs sm:text-sm hover:bg-[#F7F2EB]/10 transition-colors"
  >
    {label}
  </motion.button>
);

const TouchKey: React.FC<{ label: string; ariaLabel: string } & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ label, ariaLabel, ...rest }) => (
  <button
    {...rest}
    aria-label={ariaLabel}
    className="w-14 h-12 rounded-xl bg-charcoal text-[#F7F2EB] font-bold active:bg-charcoal-deep active:scale-95 transition-transform select-none touch-none"
  >
    {label}
  </button>
);
