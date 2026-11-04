import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAnimate, useMotionValue, useMotionValueEvent, stagger } from 'framer-motion';
import type { AnimationPlaybackControls } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { LOGO_LIGHT, LOGO_VIEWBOX } from '../data/logoPaths';

// Easing from MOTION.md
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const EXPO_IN_OUT = [0.87, 0, 0.13, 1] as const;
const POWER3_IN_OUT = [0.65, 0, 0.35, 1] as const;
const POWER2_OUT = [0.33, 1, 0.68, 1] as const;
const POWER3_IN = [0.32, 0, 0.67, 0] as const;
const GRAVITY_IN = [0.5, 0, 0.9, 0.6] as const;
const TOSS_OUT = [0.2, 0.6, 0.4, 1] as const;

const SEEN_KEY = 'dk.intro.seen';

// Where the bat meets the ball, relative to the ball's resting place (logo units)
const CONTACT = { x: -170, y: 130 };

interface Flip {
  /** The lockup slot the logo finally sits in (viewport px) */
  slot: DOMRect;
  /** Offset and scale that put the slot logo big at the centre for the splash */
  x: number;
  y: number;
  scale: number;
}

interface IntroLoaderProps {
  /** Fired as the panel starts leaving, so the hero can rise underneath it. */
  onReveal: () => void;
  /** Fired once the overlay is gone and the navbar logo should take over. */
  onDone: () => void;
}

/**
 * Page-load intro, in four scenes:
 * 1. The logo draws itself big at the centre (pot, then bat), then fills.
 * 2. The cricket shot: the bat cocks, the ball is bowled in, struck, and drops into the pot.
 * 3. The logo shrinks in place, then slides left as "Dhiraj Kumar" and the designation reveal.
 * 4. The panel lifts and the logo flies into the navbar logo's place.
 * Any input fast-forwards it; reduced-motion visitors never see it.
 */
export const IntroLoader: React.FC<IntroLoaderProps> = ({ onReveal, onDone }) => {
  const [scope, animate] = useAnimate();
  const slotRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [flip, setFlip] = useState<Flip | null>(null);

  const progress = useMotionValue(0);
  useMotionValueEvent(progress, 'change', (p) => {
    if (counterRef.current) counterRef.current.textContent = String(Math.round(p * 100)).padStart(3, '0');
  });

  // Measure the lockup slot once fonts settle; the splash logo is that slot, scaled up to the centre.
  useLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      if (cancelled || !slotRef.current) return;
      const slot = slotRef.current.getBoundingClientRect();
      const big = Math.min(innerWidth * 0.72, innerHeight * 0.58, 560);
      setFlip({
        slot,
        x: innerWidth / 2 - (slot.left + slot.width / 2),
        y: innerHeight * 0.46 - (slot.top + slot.height / 2),
        scale: big / slot.width,
      });
    };
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(measure);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!flip) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch { /* storage blocked */ }
    // Played slower than written on a first visit, so every scene has room to breathe
    const baseSpeed = seen ? 1.5 : 0.8;

    let current: AnimationPlaybackControls | null = null;
    let cancelled = false;
    const fastForward = () => {
      if (current) current.speed = 5;
    };
    const inputs = ['wheel', 'pointerdown', 'keydown', 'touchstart'] as const;
    inputs.forEach((e) => window.addEventListener(e, fastForward, { passive: true }));
    const run = (controls: AnimationPlaybackControls) => {
      controls.speed = current && current.speed === 5 ? 5 : baseSpeed;
      current = controls;
      return controls;
    };

    (async () => {
      await run(
        animate([
          // Splash position: the slot logo, scaled up to the centre
          ['[data-logo]', { x: flip.x, y: flip.y, scale: flip.scale, opacity: 1 }, { duration: 0, at: 0 }],
          ['[data-bat]', { originX: 0.08, originY: 0.96 }, { duration: 0, at: 0 }],
          ['[data-label]', { y: ['104%', '0%'] }, { duration: 0.8, ease: EXPO_OUT, delay: stagger(0.08), at: 0.05 }],

          // Scene 1: draw the pot, then the bat, then flood the fills
          ['[data-stroke="pot"]', { strokeDashoffset: [1, 0] }, { duration: 1.3, ease: POWER3_IN_OUT, at: 0.2 }],
          ['[data-stroke="bat"]', { strokeDashoffset: [1, 0] }, { duration: 1.15, ease: POWER3_IN_OUT, at: 0.45 }],
          ['[data-fill="pot"]', { opacity: [0, 1] }, { duration: 0.5, ease: 'easeOut', at: 1.35 }],
          ['[data-fill="bat"]', { opacity: [0, 1] }, { duration: 0.5, ease: 'easeOut', at: 1.5 }],
          ['[data-stroke]', { opacity: 0 }, { duration: 0.3, at: 1.95 }],

          // Loading counter, in uneven steps like real loading
          [progress, 0.18, { duration: 0.4, ease: POWER3_IN_OUT, at: 0.3 }],
          [progress, 0.46, { duration: 0.4, ease: POWER3_IN_OUT, at: 0.8 }],
          [progress, 0.71, { duration: 0.4, ease: POWER3_IN_OUT, at: 1.4 }],
          [progress, 0.9, { duration: 0.4, ease: POWER3_IN_OUT, at: 2.0 }],
          [progress, 1, { duration: 0.3, ease: EXPO_OUT, at: 2.85 }],

          // Scene 2: the shot. Bat cocks, ball is bowled in, struck, arcs up and drops into the pot.
          ['[data-bat]', { rotate: [0, -22] }, { duration: 0.4, ease: POWER2_OUT, at: 1.8 }],
          ['[data-ball]', { x: [-1700, CONTACT.x], y: [120, CONTACT.y], opacity: [1, 1] }, { duration: 0.55, ease: [0.2, 0.7, 0.4, 1], at: 1.89 }],
          ['[data-bat]', { rotate: 8 }, { duration: 0.14, ease: POWER3_IN, at: 2.3 }],
          ['[data-bat]', { rotate: 0 }, { duration: 0.45, ease: EXPO_OUT, at: 2.44 }],
          ['[data-ball]', { x: -40, y: -270 }, { duration: 0.32, ease: TOSS_OUT, at: 2.44 }],
          ['[data-ball]', { x: 0, y: 0 }, { duration: 0.3, ease: GRAVITY_IN, at: 2.76 }],
          ['[data-ball]', { scaleX: 1.18, scaleY: 0.82 }, { duration: 0.08, at: 3.06 }],
          ['[data-ball]', { y: -34, scaleX: 0.95, scaleY: 1.06 }, { duration: 0.18, ease: 'easeOut', at: 3.14 }],
          ['[data-ball]', { y: 0, scaleX: 1, scaleY: 1 }, { duration: 0.3, ease: EXPO_OUT, at: 3.32 }],

          // Scene 3: shrink in place, then slide into the lockup as the name reveals left to right
          ['[data-counter]', { y: '-104%' }, { duration: 0.6, ease: EXPO_IN_OUT, at: 3.4 }],
          ['[data-logo]', { scale: 1.32 }, { duration: 0.8, ease: EXPO_IN_OUT, at: 3.55 }],
          ['[data-logo]', { x: 0, y: 0, scale: 1 }, { duration: 0.95, ease: EXPO_IN_OUT, at: 4.4 }],
          ['[data-char]', { y: ['104%', '0%'] }, { duration: 1.05, ease: EXPO_OUT, delay: stagger(0.045), at: 4.8 }],
          ['[data-role]', { y: ['104%', '0%'] }, { duration: 0.9, ease: EXPO_OUT, delay: stagger(0.1), at: 5.25 }],
          ['[data-rule]', { scaleX: [0, 1] }, { duration: 0.9, ease: POWER3_IN_OUT, at: 5.35 }],

          // Hold the finished lockup
          ['[data-panel]', { opacity: 1 }, { duration: 0.01, at: 7.4 }],
        ]),
      );
      if (cancelled) return;

      onReveal();
      const { slot } = flip;
      const nav = document.getElementById('nav-logo')?.getBoundingClientRect();
      const toNav = nav
        ? {
            x: nav.left + nav.width / 2 - (slot.left + slot.width / 2),
            y: nav.top + nav.height / 2 - (slot.top + slot.height / 2),
            scale: nav.width / slot.width,
          }
        : { scale: 0 };

      // Scene 4: text lifts away, the panel follows, the logo flies home to the navbar
      await run(
        animate([
          ['[data-char], [data-role], [data-label]', { y: '-104%' }, { duration: 0.6, ease: EXPO_IN_OUT, delay: stagger(0.015), at: 0 }],
          ['[data-rule]', { scaleX: 0, originX: 1 }, { duration: 0.5, ease: EXPO_IN_OUT, at: 0 }],
          ['[data-panel]', { y: '-100%' }, { duration: 0.9, ease: EXPO_IN_OUT, at: 0.2 }],
          ['[data-logo]', toNav, { duration: 1.0, ease: EXPO_IN_OUT, at: 0.1 }],
        ]),
      );
      if (cancelled) return;

      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch { /* storage blocked */ }
      onDone();
    })();

    return () => {
      cancelled = true;
      current?.stop();
      inputs.forEach((e) => window.removeEventListener(e, fastForward));
      root.style.overflow = prevOverflow;
    };
  }, [flip, animate, progress, onReveal, onDone]);

  const hidden = { transform: 'translateY(104%)' };
  const name = personalInfo.name;

  return (
    <div ref={scope} aria-hidden="true" className="fixed inset-0 z-[200] select-none">
      <div data-panel className="absolute inset-0 bg-[#F7F2EB] bg-grid-pattern overflow-hidden">
        <div className="absolute top-5 sm:top-8 left-4 sm:left-8 lg:left-12 font-mono text-[11px] sm:text-xs leading-relaxed text-charcoal-muted">
          <span className="block overflow-hidden">
            <span data-label className="block" style={hidden}>
              <span className="font-semibold text-charcoal">Portfolio</span> — {name}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-label className="block" style={hidden}>{personalInfo.location}</span>
          </span>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 lg:right-12 font-mono text-[11px] sm:text-xs text-charcoal-faded tabular-nums overflow-hidden">
          <span data-counter className="block">
            <span data-label className="block" style={hidden}>
              Loading <span ref={counterRef} className="text-charcoal font-semibold">000</span>%
            </span>
          </span>
        </div>

        {/* Final lockup: logo slot + name + designation. Row on desktop, stacked on phones. */}
        <div className="absolute inset-0 flex items-center justify-start sm:justify-center px-4 sm:px-8">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-[0.3em] sm:gap-[0.32em] [--fs:14.5vw] sm:[--fs:clamp(3.5rem,11vw,12rem)]"
            style={{ fontSize: 'var(--fs)' }}
          >
            <div ref={slotRef} className="w-[1.9em] h-[1.9em] sm:w-[1.55em] sm:h-[1.55em] shrink-0" />
            <div>
              <p className="font-sans font-extrabold text-charcoal leading-none tracking-[-0.045em] whitespace-nowrap">
                {name.split('').map((ch, i) =>
                  ch === ' ' ? (
                    <span key={i} className="inline-block w-[0.24em]" />
                  ) : (
                    <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.16em] -mb-[0.16em] pr-[0.02em]">
                      <span data-char className="inline-block" style={hidden}>{ch}</span>
                    </span>
                  ),
                )}
              </p>
              <div className="mt-[0.28em] text-[0.26em] sm:text-[0.22em] font-semibold tracking-[-0.01em] text-charcoal leading-tight">
                <span className="inline-block overflow-hidden align-bottom">
                  <span data-role className="inline-block" style={hidden}>{personalInfo.role}</span>
                </span>{' '}
                <span className="inline-block overflow-hidden align-bottom">
                  <span data-role className="inline-block font-medium text-charcoal-muted" style={hidden}>
                    — {personalInfo.titleSuffix}
                  </span>
                </span>
              </div>
              <div data-rule className="mt-[0.18em] h-px bg-charcoal/25 origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* The logo lives outside the panel so it can fly to the navbar as the panel lifts */}
      {flip && <LogoLayer slot={flip.slot} />}
    </div>
  );
};

const LogoLayer: React.FC<{ slot: DOMRect }> = ({ slot }) => {
  const { pot, bat, ball } = LOGO_LIGHT;
  const draw = { strokeDasharray: 1, strokeDashoffset: 1 };
  return (
    <svg
      data-logo
      viewBox={LOGO_VIEWBOX}
      className="absolute overflow-visible"
      style={{ left: slot.left, top: slot.top, width: slot.width, height: slot.height, opacity: 0, filter: 'drop-shadow(0 6px 10px rgba(43, 48, 44, 0.16))' }}
    >
      <defs>
        {/* Top-lit charcoal so the pot and bat sit in the same light as the ball */}
        <linearGradient id="intro-body-shade" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#555B55" />
          <stop offset="0.55" stopColor={pot.fill} />
          <stop offset="1" stopColor="#2A2E2A" />
        </linearGradient>
      </defs>
      <path data-fill="pot" d={pot.d} transform={pot.transform} fill="url(#intro-body-shade)" style={{ opacity: 0 }} />
      <path data-stroke="pot" d={pot.d} transform={pot.transform} pathLength={1} fill="none" stroke={pot.fill} strokeWidth={1.5} vectorEffect="non-scaling-stroke" style={draw} />
      <g data-bat style={{ transformBox: 'fill-box', transformOrigin: '8% 96%' }}>
        <path data-fill="bat" d={bat.d} transform={bat.transform} fill="url(#intro-body-shade)" style={{ opacity: 0 }} />
        <path data-stroke="bat" d={bat.d} transform={bat.transform} pathLength={1} fill="none" stroke={bat.fill} strokeWidth={1.5} vectorEffect="non-scaling-stroke" style={draw} />
      </g>
      <g data-ball style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', opacity: 0 }}>
        <path d={ball.d} transform={ball.transform} fill={ball.fill} stroke={ball.fill} strokeWidth={ball.strokeWidth} />
      </g>
    </svg>
  );
};
