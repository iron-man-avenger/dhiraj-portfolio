import React, { useEffect, useRef } from 'react';
import { displacementFilter } from '../utils/liquidGlass';

interface LiquidGlassLayerProps {
  /** Corner radius in px; must match the element it sits in */
  radius: number;
  /** How far in from the edge the refraction reaches, in px */
  depth?: number;
  /** How far pixels bend at the rim */
  strength?: number;
  /** Colour fringe at the rim; kept near zero to stay on the one-accent palette */
  chromaticAberration?: number;
  /** Frost in px, enough to keep text on top readable */
  blur?: number;
  className?: string;
}

/**
 * The glass itself: a layer behind its parent's content that refracts whatever scrolls underneath.
 * Render it only when supportsLiquidGlass is true; the parent must be `relative isolate`, and must not
 * set its own backdrop-filter, filter or opacity (any of those would hide the page from this layer).
 */
export const LiquidGlassLayer: React.FC<LiquidGlassLayerProps> = ({
  radius,
  depth = 10,
  strength = 46,
  chromaticAberration = 0.6,
  blur = 2,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // The filter is drawn for an exact size, so rebuild it whenever the layer resizes
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const draw = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (!width || !height) return;
      const filter = displacementFilter({ width, height, radius, depth, strength, chromaticAberration });
      el.style.backdropFilter = `blur(${blur / 2}px) url("${filter}") blur(${blur}px) brightness(1.04) saturate(1.25)`;
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(el);
    return () => observer.disconnect();
  }, [radius, depth, strength, chromaticAberration, blur]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      style={{ borderRadius: radius }}
    />
  );
};
