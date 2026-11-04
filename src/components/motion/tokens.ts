import type { Variants } from 'framer-motion';

// Easing and timing from MOTION.md
export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
export const EXPO_IN_OUT = [0.87, 0, 0.13, 1] as const;
export const POWER3_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const BACK_OUT = [0.34, 1.8, 0.64, 1] as const;

/** Reveal once, a little before the element is fully on screen. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EXPO_OUT } },
};

export const popItem: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  shown: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: BACK_OUT } },
};
