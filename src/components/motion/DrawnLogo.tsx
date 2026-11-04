import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { LOGO_DARK, LOGO_LIGHT, LOGO_VIEWBOX } from '../../data/logoPaths';
import { BACK_OUT, POWER3_IN_OUT, VIEWPORT } from './tokens';

interface DrawnLogoProps {
  /** 'dark' is the light-filled logo for dark backgrounds, as in DhirajLogo */
  variant: 'light' | 'dark';
  className?: string;
  title?: string;
}

const draw = (delay: number): Variants => ({
  hidden: { pathLength: 0, opacity: 1 },
  shown: {
    pathLength: 1,
    opacity: [1, 1, 0],
    transition: { pathLength: { duration: 1.3, ease: POWER3_IN_OUT, delay }, opacity: { duration: 2.1, times: [0, 0.85, 1], delay } },
  },
});

const flood = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut', delay } },
});

/**
 * The logo drawing itself when it scrolls into view, the same way the intro opens:
 * the pot's outline, then the bat's, the fills flood in, and the ball pops into the pot.
 */
export const DrawnLogo: React.FC<DrawnLogoProps> = ({ variant, className, title = 'Dhiraj Kumar Logo' }) => {
  const { pot, bat, ball } = variant === 'light' ? LOGO_LIGHT : LOGO_DARK;
  const stroke = { fill: 'none', strokeWidth: 1.5, vectorEffect: 'non-scaling-stroke' as const };

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      aria-label={title}
    >
      <title>{title}</title>
      <motion.path variants={flood(1.1)} d={pot.d} transform={pot.transform} fill={pot.fill} />
      <motion.path variants={draw(0)} d={pot.d} transform={pot.transform} stroke={pot.fill} {...stroke} />
      <motion.path variants={flood(1.3)} d={bat.d} transform={bat.transform} fill={bat.fill} />
      <motion.path variants={draw(0.25)} d={bat.d} transform={bat.transform} stroke={bat.fill} {...stroke} />
      {/* Scale the wrapper, not the path: animating the path would replace its own transform */}
      <motion.g
        variants={{
          hidden: { scale: 0 },
          shown: { scale: 1, transition: { duration: 0.6, ease: BACK_OUT, delay: 1.6 } },
        }}
        style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
      >
        <path d={ball.d} transform={ball.transform} fill={ball.fill} />
      </motion.g>
    </motion.svg>
  );
};
