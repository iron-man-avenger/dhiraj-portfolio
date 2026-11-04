import React, { useEffect, useRef, useState } from 'react';

// Self-hosted copy of the ASCII Magic player; `npm run ascii:sync` refreshes it
const PLAYER_SRC = '/ascii-magic-art/runtime/ascii.js';
/** Width of one monospace cell as a fraction of the font size, from the player's canvas.js */
const CELL_W = 0.602;

let playerLoading: Promise<void> | null = null;
const loadPlayer = () =>
  (playerLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = PLAYER_SRC;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  }));

interface AsciiArtProps {
  /** Piece slug, as in ascii-magic.com/ascii/<slug>; must be listed in scripts/sync-ascii.mjs */
  piece: string;
  /** The piece's width in character columns (its meta.cols), used to fit it to the container */
  cols: number;
  /** Largest font size in px, so it never gets loud on wide screens */
  maxSize?: number;
  /** Single solid ink colour from the palette (MOTION.md §10). The player ignores alpha, so fade with opacity on className. */
  ink: string;
  speed?: number;
  className?: string;
}

/**
 * Decorative animated ASCII art, drawn in one palette colour and sized to fill its container's width.
 * The player animates only while on screen and shows a still frame under reduced motion.
 */
export const AsciiArt: React.FC<AsciiArtProps> = ({ piece, cols, maxSize = 10, ink, speed = 1, className = '' }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadPlayer().then(() => !cancelled && setReady(true), () => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  // Changing the size restarts the piece, so only resize in half-pixel steps
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const fit = () => {
      const next = Math.min(maxSize, Math.floor((box.clientWidth / (cols * CELL_W)) * 2) / 2);
      setSize((prev) => (prev === next ? prev : next));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [cols, maxSize]);

  return (
    <div ref={boxRef} aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      {ready && size > 0 && (
        <ascii-art
          piece={piece}
          size={size}
          speed={speed}
          mono=""
          style={{ '--ascii-ink': ink, display: 'block', marginInline: 'auto', width: 'fit-content' } as React.CSSProperties}
        />
      )}
    </div>
  );
};
