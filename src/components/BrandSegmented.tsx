import React, { useEffect, useRef, useState } from 'react';
import { SegmentedControl } from 'glisse';

export interface BrandSegment {
  value: string;
  label: string;
  /** Shorter label used when the segments have to shrink to fit a narrow screen */
  shortLabel?: string;
}

interface BrandSegmentedProps {
  items: BrandSegment[];
  value: string;
  onValueChange: (value: string) => void;
  /** Widest a segment gets, in px (glisse segments are equal width, as on iOS); fit the longest label */
  segmentWidth: number;
  'aria-label': string;
  className?: string;
}

/**
 * glisse's iOS 26 segmented control in the site's palette: ecru labels and an amber thumb on a charcoal track.
 * Press-and-hold or drag the thumb and it lifts into a clear glass lens with a bright rim that refracts the
 * labels, in every browser (glisse bends the content itself, not the backdrop). The dark track is what makes
 * the lens visible: on a pale track it vanished. Pinned to glisse's dark theme so the OS setting can't change it.
 *
 * It never scrolls: glisse claims horizontal swipes for dragging the lens, so a scrolling row could not be
 * swiped. On a narrow screen the segments shrink to share the available width and switch to short labels.
 */
export const BrandSegmented: React.FC<BrandSegmentedProps> = ({ items, value, onValueChange, segmentWidth, className = '', ...rest }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState<number | null>(null);

  // The room to fit into is the parent's width, so the control never decides its own size
  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;
    const measure = () => {
      const style = getComputedStyle(parent);
      setAvailable(parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  const width = available === null ? segmentWidth : Math.min(segmentWidth, Math.floor(available / items.length));
  const compact = width < segmentWidth;
  const glisseItems = items.map((item) => ({ value: item.value, label: compact && item.shortLabel ? item.shortLabel : item.label }));

  return (
    <div ref={rootRef} className={`max-w-full ${className}`}>
      <div
        data-theme="dark"
        className={`brand-segmented inline-block ${compact ? 'brand-segmented--compact' : ''}`}
        style={{ '--brand-segment-width': `${width}px` } as React.CSSProperties}
      >
        <SegmentedControl items={glisseItems} value={value} onValueChange={onValueChange} aria-label={rest['aria-label']} />
      </div>
    </div>
  );
};
