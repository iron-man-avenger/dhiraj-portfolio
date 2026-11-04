import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { displacementFilter, supportsLiquidGlass } from '../utils/liquidGlass';

interface GlassPillProps {
  /** Shared by every option in one group, so the pill slides from the old choice to the new one */
  layoutId: string;
  /** Corner classes matching the option buttons, e.g. "rounded-xl md:rounded-full" */
  className?: string;
}

/**
 * The selected-option highlight in a segmented control. In Chromium it is an amber glass lens:
 * as it slides, the labels it passes over bend at its rim, like iOS 26. Elsewhere it stays the
 * solid amber pill. Stacking: other labels sit under it (it is z-[1]); the selected label must sit
 * on top with `relative z-[2]` so it stays crisp.
 */
export const GlassPill: React.FC<GlassPillProps> = ({ layoutId, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  // The filter is drawn for an exact size; layout size (not the animated transform) sets it
  useEffect(() => {
    const el = ref.current;
    if (!supportsLiquidGlass || !el) return;
    const draw = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (!width || !height) return;
      const radius = Math.min(height / 2, parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0);
      // Pills are tiny, so the bend stays gentle: at navbar strength the label underneath turns to noise
      const filter = displacementFilter({ width, height, radius, depth: 4, strength: 9, chromaticAberration: 0.4 });
      el.style.backdropFilter = `url("${filter}") brightness(1.04) saturate(1.3)`;
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.span
      ref={ref}
      layoutId={layoutId}
      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
      className={`absolute inset-0 z-[1] pointer-events-none ${
        supportsLiquidGlass
          ? 'bg-amber/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(43,48,44,0.08),0_1px_4px_rgba(43,48,44,0.12)]'
          : 'bg-amber shadow-sm'
      } ${className}`}
    />
  );
};
