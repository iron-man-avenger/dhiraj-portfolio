import React, { useEffect, useRef } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EXPO_OUT, POWER3_IN_OUT, VIEWPORT } from './tokens';

const maskRise = (delay = 0): Variants => ({
  hidden: { y: '104%' },
  shown: { y: '0%', transition: { duration: 1.05, ease: EXPO_OUT, delay } },
});

interface RiseTextProps {
  children: React.ReactNode;
  className?: string;
  /** Classes for the moving inner element (put text styles here when they must not clip). */
  innerClassName?: string;
  delay?: number;
  as?: 'div' | 'span' | 'p';
}

/**
 * One block of text climbing out of an overflow mask.
 * The viewport trigger sits on the mask itself: the inner element starts fully clipped,
 * so it could never report itself as in view.
 */
export const RiseText: React.FC<RiseTextProps> = ({ children, className = '', innerClassName = '', delay = 0, as = 'div' }) => {
  const Outer = motion[as];
  return (
    <Outer initial="hidden" whileInView="shown" viewport={VIEWPORT} className={`overflow-hidden ${className}`}>
      <motion.span variants={maskRise(delay)} className={`block ${innerClassName}`}>
        {children}
      </motion.span>
    </Outer>
  );
};

interface MaskedWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

/** A heading that rises word by word, like the hero headline. */
export const MaskedWords: React.FC<MaskedWordsProps> = ({ text, className = '', delay = 0.08, stagger = 0.035, as = 'h2' }) => {
  const Tag = motion[as];
  return (
    <Tag initial="hidden" whileInView="shown" viewport={VIEWPORT} className={className}>
      {text.split(' ').map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
            <motion.span variants={maskRise(delay + i * stagger)} className="inline-block">
              {word}
            </motion.span>
          </span>{' '}
        </React.Fragment>
      ))}
    </Tag>
  );
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Rise distance in px */
  distance?: number;
}

/** A card or block rising into place. Not for bare text: text uses RiseText or MaskedWords. */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, distance = 28 }) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.9, ease: EXPO_OUT, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Container that staggers its StaggerItem children in when it scrolls into view. */
export const Stagger: React.FC<{ children: React.ReactNode; className?: string; gap?: number; delay?: number }> = ({
  children,
  className,
  gap = 0.07,
  delay = 0,
}) => (
  <motion.div
    initial="hidden"
    whileInView="shown"
    viewport={VIEWPORT}
    variants={{ hidden: {}, shown: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    className={className}
  >
    {children}
  </motion.div>
);

/** The hairline at the top of a section, drawn left to right as the section arrives. */
export const SectionRule: React.FC<{ className?: string }> = ({ className = 'bg-[#E3DACD]/60' }) => (
  <motion.div
    aria-hidden="true"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: POWER3_IN_OUT }}
    className={`absolute top-0 left-0 right-0 h-px origin-left ${className}`}
  />
);

interface TypeTextProps {
  text: string;
  className?: string;
  /** Milliseconds per character, capped so long text still finishes in about 1.4s */
  speed?: number;
}

/** Text that types itself out with a caret, once per text value. */
export const TypeText: React.FC<TypeTextProps> = (props) => <TypeSpan key={props.text} {...props} />;

const TypeSpan: React.FC<TypeTextProps> = ({ text, className, speed = 18 }) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = React.useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    const step = Math.min(speed, 1400 / Math.max(text.length, 1));
    const timer = setInterval(() => {
      setShown((n) => {
        if (n >= text.length) clearInterval(timer);
        return Math.min(n + 1, text.length);
      });
    }, step);
    return () => clearInterval(timer);
  }, [text, speed, reduce]);

  return (
    <span className={className}>
      {text.slice(0, shown)}
      {shown < text.length && <span className="inline-block w-[0.5ch] h-[1em] -mb-[0.15em] ml-px bg-amber animate-pulse" />}
    </span>
  );
};

const NUMBER = /\d[\d,]*(?:\.\d+)?/g;

const formatLike = (value: number, sample: string) => {
  const decimals = sample.includes('.') ? sample.split('.')[1].length : 0;
  const fixed = value.toFixed(decimals);
  if (!sample.includes(',')) return fixed;
  const [whole, frac] = fixed.split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${grouped}.${frac}` : grouped;
};

const renderAt = (text: string, p: number) =>
  text.replace(NUMBER, (token) => formatLike(parseFloat(token.replace(/,/g, '')) * p, token));

interface CountUpTextProps {
  text: string;
  className?: string;
  duration?: number;
}

/** Text whose numbers count up from zero when it scrolls into view; everything else stays put. */
// Keyed by text: the count writes straight to the DOM, so new text needs a fresh node and observer.
export const CountUpText: React.FC<CountUpTextProps> = (props) => <CountUpSpan key={props.text} {...props} />;

const CountUpSpan: React.FC<CountUpTextProps> = ({ text, className, duration = 1.6 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();
  const animates = !reduce && /\d/.test(text);

  useEffect(() => {
    if (!inView || !animates) return;
    const controls = animate(0, 1, {
      duration,
      ease: EXPO_OUT,
      onUpdate: (p) => {
        if (ref.current) ref.current.textContent = renderAt(text, p);
      },
    });
    return () => controls.stop();
  }, [inView, animates, text, duration]);

  return (
    <span ref={ref} className={className}>
      {animates && !inView ? renderAt(text, 0) : text}
    </span>
  );
};
