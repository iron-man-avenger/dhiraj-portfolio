import React, { useEffect, useRef } from 'react';
import { SegmentedControl } from 'glisse';
import type { SegmentedControlItem } from 'glisse';

interface BrandSegmentedProps {
  items: SegmentedControlItem[];
  value: string;
  onValueChange: (value: string) => void;
  /** Width of every segment in px (glisse segments are equal width, as on iOS); fit the longest label */
  segmentWidth: number;
  'aria-label': string;
  className?: string;
}

/**
 * glisse's iOS 26 segmented control in the site's palette: ecru labels and an amber thumb on a charcoal track.
 * Press-and-hold or drag the thumb and it lifts into a clear glass lens with a bright rim that refracts the
 * labels, in every browser (glisse bends the content itself, not the backdrop). The dark track is what makes
 * the lens visible: on a pale track it vanished. Pinned to glisse's dark theme so the OS setting can't change it.
 */
export const BrandSegmented: React.FC<BrandSegmentedProps> = ({ items, value, onValueChange, segmentWidth, className = '', ...rest }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // On a narrow screen the row scrolls; bring a newly chosen segment fully into view
  useEffect(() => {
    const selected = scrollerRef.current?.querySelector<HTMLElement>('.lg-tab[data-selected]');
    selected?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [value]);

  return (
    // Scrolls sideways when the row is wider than the screen, with no scrollbar; the padding keeps the lifted lens unclipped
    <div ref={scrollerRef} className={`brand-segmented-scroller max-w-full overflow-x-auto -mx-4 px-4 -my-3 py-3 ${className}`}>
      <div
        data-theme="dark"
        className="brand-segmented inline-block"
        style={{ '--brand-segment-width': `${segmentWidth}px` } as React.CSSProperties}
      >
        <SegmentedControl items={items} value={value} onValueChange={onValueChange} aria-label={rest['aria-label']} />
      </div>
    </div>
  );
};
