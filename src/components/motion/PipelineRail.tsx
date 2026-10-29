import React from 'react';
import { motion } from 'framer-motion';
import { BACK_OUT, EXPO_IN_OUT } from './tokens';

interface PipelineRailProps {
  /** Number of stages; ticks sit over the centre of each equal-width column */
  count: number;
  /** Grid columns the stages sit in, when the row has more columns than stages */
  columns?: number;
  /** Stage the ball is at: -1 before it starts, count - 1 at the last stage */
  position: number;
  /** Every stage passed: the ball lands with a small pop */
  complete?: boolean;
  /** Seconds the ball takes to travel one hop */
  hop?: number;
  className?: string;
}

/**
 * A hairline across a row of stages with the amber ball travelling it, the line filling behind.
 * The brand's one carried shape: the same ball that rides the loader and lands in the logo.
 */
export const PipelineRail: React.FC<PipelineRailProps> = ({ count, columns = count, position, complete = false, hop = 0.55, className = '' }) => {
  const at = Math.max(0, Math.min(position, count - 1));
  const edge = `${50 / columns}%`;
  const right = `${100 - ((count - 0.5) / columns) * 100}%`;
  const fill = count > 1 ? at / (count - 1) : 1;
  const started = position >= 0 || complete;

  return (
    <div aria-hidden="true" className={`relative h-4 ${className}`}>
      <div className="absolute top-1/2 h-px bg-[#E3DACD]" style={{ left: edge, right }} />
      <div className="absolute top-1/2 h-px" style={{ left: edge, right }}>
        <motion.div
          className="h-full bg-charcoal/50 origin-left"
          initial={false}
          animate={{ scaleX: started ? (complete ? 1 : fill) : 0 }}
          transition={{ duration: hop, ease: EXPO_IN_OUT }}
        />
      </div>

      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`absolute top-1/2 w-1.5 h-1.5 -ml-[3px] -mt-[3px] transition-colors duration-300 ${
            started && (complete || i <= at) ? 'bg-charcoal' : 'bg-[#D5C7B3]'
          }`}
          style={{ left: `${((i + 0.5) / columns) * 100}%` }}
        />
      ))}

      <motion.span
        className="absolute top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-amber shadow-glow-amber"
        initial={false}
        animate={{
          left: `${(((complete ? count - 1 : at) + 0.5) / columns) * 100}%`,
          scale: started ? (complete ? [1, 1.6, 1] : 1) : 0,
        }}
        transition={{
          left: { duration: hop, ease: EXPO_IN_OUT },
          scale: { duration: complete ? 0.5 : 0.35, ease: BACK_OUT },
        }}
      />
    </div>
  );
};
