import Lenis from 'lenis';

let lenis: Lenis | null = null;

/**
 * Smooth wheel and trackpad scrolling with Lenis, the setup most Awwwards scrolling sites use
 * (MOTION.md §8). Touch scrolling stays native (syncTouch off): a phone's own scrolling is already
 * the smoothest it can be, so on phones smoothness comes from keeping per-frame work light.
 * Returns a cleanup function.
 */
export const startSmoothScroll = () => {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => undefined;

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: true,
    // In-page #links glide too; Lenis honours the sections' scroll-margin-top, so they land below the navbar
    anchors: true,
  });

  // The intro and the arcade lock the page by setting overflow: hidden on <html>; Lenis scrolls by
  // script, which that doesn't stop, so pause it for as long as the lock is on
  const root = document.documentElement;
  const sync = () => (root.style.overflow === 'hidden' ? lenis?.stop() : lenis?.start());
  const observer = new MutationObserver(sync);
  observer.observe(root, { attributes: true, attributeFilter: ['style'] });
  sync();

  return () => {
    observer.disconnect();
    lenis?.destroy();
    lenis = null;
  };
};

/** Back to the top, gliding with Lenis when it's running. */
export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};
