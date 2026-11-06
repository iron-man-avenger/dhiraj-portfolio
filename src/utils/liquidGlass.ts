/*
 * Liquid glass refraction as an SVG displacement filter for `backdrop-filter: url(...)`.
 * Ported from nikdelvin/liquid-glass (src/utils/liquidGlass.ts).
 *
 * MIT License, Copyright (c) Nik Delvin
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions: The above copyright notice and this
 * permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
 */

interface DisplacementOptions {
  width: number;
  height: number;
  radius: number;
  /** How far in from the edge the refraction reaches, in px */
  depth: number;
  /** How far pixels are pushed at the rim */
  strength: number;
  /** Extra push for the red and green channels: a colour fringe at the rim (0 = none) */
  chromaticAberration: number;
}

const svgUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

/**
 * The displacement map: neutral grey in the middle, red and green ramps toward the edges,
 * so pixels near the rim are pulled inward like light through the curved edge of a lens.
 */
const displacementMap = ({ width, height, radius, depth }: Omit<DisplacementOptions, 'strength' | 'chromaticAberration'>) =>
  svgUrl(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>.mix { mix-blend-mode: screen; }</style>
  <defs>
    <linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil((radius / height) * 15)}%" y2="${Math.floor(100 - (radius / height) * 15)}%">
      <stop offset="0%" stop-color="#0F0" /><stop offset="100%" stop-color="#000" />
    </linearGradient>
    <linearGradient id="X" x1="${Math.ceil((radius / width) * 15)}%" x2="${Math.floor(100 - (radius / width) * 15)}%" y1="0" y2="0">
      <stop offset="0%" stop-color="#F00" /><stop offset="100%" stop-color="#000" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
  <g filter="blur(2px)">
    <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
    <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" class="mix" />
    <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" class="mix" />
    <rect x="${depth}" y="${depth}" height="${height - 2 * depth}" width="${width - 2 * depth}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
  </g>
</svg>`);

/** A filter reference for `backdrop-filter: url(...)`: each colour channel displaced by the map. */
export const displacementFilter = (o: DisplacementOptions) => {
  const channel = (scale: number, matrix: string, result: string) => `
    <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="G" />
    <feColorMatrix type="matrix" values="${matrix}" result="${result}" />`;
  return (
    svgUrl(`<svg height="${o.height}" width="${o.width}" viewBox="0 0 ${o.width} ${o.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="displace" color-interpolation-filters="sRGB">
      <feImage x="0" y="0" height="${o.height}" width="${o.width}" href="${displacementMap(o)}" result="map" />
      ${channel(o.strength + o.chromaticAberration * 2, '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0', 'r')}
      ${channel(o.strength + o.chromaticAberration, '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0', 'g')}
      ${channel(o.strength, '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0', 'b')}
      <feBlend in="r" in2="g" mode="screen" />
      <feBlend in2="b" mode="screen" />
    </filter>
  </defs>
</svg>`) + '#displace'
  );
};

/**
 * Only Chromium browsers apply SVG filters in backdrop-filter; Safari (so every iOS browser)
 * and Firefox keep the plain frosted blur. Touch devices keep it too: the refraction is redrawn on
 * every scroll frame, which a phone's 120Hz scroll can't afford (MOTION.md §11).
 */
export const supportsLiquidGlass = (() => {
  if (typeof document === 'undefined') return false;
  const probe = document.createElement('div');
  probe.style.cssText = 'backdrop-filter: url(#probe)';
  const value = probe.style.backdropFilter;
  const parses = value === 'url(#probe)' || value === 'url("#probe")';
  // Firefox parses the value but does not render it; only Chromium draws the refraction
  const chromium = /Chrome\//.test(navigator.userAgent) && !/Firefox\//.test(navigator.userAgent);
  return parses && chromium && window.matchMedia('(pointer: fine)').matches;
})();
