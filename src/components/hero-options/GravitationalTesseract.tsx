import React, { useRef, useEffect, useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const GravitationalTesseract: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dilationRate, setDilationRate] = useState<'normal' | 'singularity'>('normal');
  const shockwavesRef = useRef<{ x: number; y: number; r: number; alpha: number }[]>([]);

  // 4D Tesseract vertices (16 vertices: [-1, 1]^4)
  const vertices4D = useRef<number[][]>([]);
  if (vertices4D.current.length === 0) {
    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          for (let w = -1; w <= 1; w += 2) {
            vertices4D.current.push([x, y, z, w]);
          }
        }
      }
    }
  }

  // 32 edges of hypercube
  const edges = useRef<[number, number][]>([]);
  if (edges.current.length === 0) {
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices4D.current[i][k] !== vertices4D.current[j][k]) diff++;
        }
        if (diff === 1) {
          edges.current.push([i, j]);
        }
      }
    }
  }

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({ x: 0, y: 0, isInside: false });
  const rotRef = useRef<{ xy: number; zw: number; xw: number }>({ xy: 0, zw: 0, xw: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = Math.max(260, rect.height || 260);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Initialize 160 accretion particles
      if (particlesRef.current.length === 0) {
        const colors = ['#D4A066', '#E2B784', '#FFFFFF', '#FAF8F5'];
        for (let i = 0; i < 160; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 30 + Math.random() * (width / 2.2);
          particlesRef.current.push({
            x: width / 2 + Math.cos(angle) * dist,
            y: height / 2 + Math.sin(angle) * dist,
            vx: -Math.sin(angle) * (1.2 + Math.random() * 0.8),
            vy: Math.cos(angle) * (1.2 + Math.random() * 0.8),
            radius: 0.8 + Math.random() * 1.5,
            alpha: 0.4 + Math.random() * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Update 4D rotation angles
      const rotSpeed = dilationRate === 'singularity' ? 0.018 : 0.008;
      rotRef.current.xy += rotSpeed;
      rotRef.current.zw += rotSpeed * 0.8;
      rotRef.current.xw += rotSpeed * 0.5;

      const { xy, zw, xw } = rotRef.current;

      // Gravity center target
      const targetGravX = mouseRef.current.isInside ? mouseRef.current.x : cx;
      const targetGravY = mouseRef.current.isInside ? mouseRef.current.y : cy;
      const G = dilationRate === 'singularity' ? 55 : 30;

      // Update & Draw Particles (Accretion Disk)
      particlesRef.current.forEach((p) => {
        const dx = targetGravX - p.x;
        const dy = targetGravY - p.y;
        const distSq = Math.max(400, dx * dx + dy * dy);
        const dist = Math.sqrt(distSq);

        // Gravitational pull + tangential orbit boost
        const force = G / distSq;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;

        // Tangential orbital spin
        p.vx += (-dy / dist) * 0.025;
        p.vy += (dx / dist) * 0.025;

        // Velocity damping to prevent escape
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;

      // 4D -> 3D -> 2D Projection for Tesseract
      const projected2D: [number, number][] = [];
      const scale4D = 58;

      vertices4D.current.forEach(([vx, vy, vz, vw]) => {
        // Rotate in 4D (XY, ZW, XW planes)
        let x = vx * Math.cos(xy) - vy * Math.sin(xy);
        let y = vx * Math.sin(xy) + vy * Math.cos(xy);
        let z = vz * Math.cos(zw) - vw * Math.sin(zw);
        let w = vz * Math.sin(zw) + vw * Math.cos(zw);

        const x2 = x * Math.cos(xw) - w * Math.sin(xw);
        const w2 = x * Math.sin(xw) + w * Math.cos(xw);
        x = x2;
        w = w2;

        // Perspective 4D -> 3D
        const d4 = 2.4;
        const p4 = 1 / (d4 - w);
        const x3 = x * p4;
        const y3 = y * p4;
        const z3 = z * p4;

        // Perspective 3D -> 2D
        const d3 = 2.5;
        const p3 = 1 / (d3 - z3);
        const x2D = cx + x3 * p3 * scale4D * 3.5;
        const y2D = cy + y3 * p3 * scale4D * 3.5;

        projected2D.push([x2D, y2D]);
      });

      // Draw Tesseract Edges
      edges.current.forEach(([i, j]) => {
        const p1 = projected2D[i];
        const p2 = projected2D[j];
        if (!p1 || !p2) return;

        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.strokeStyle = 'rgba(212, 160, 102, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw Tesseract Vertices
      projected2D.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2B302C';
        ctx.fill();
        ctx.strokeStyle = '#D4A066';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Render Gravity Shockwaves
      for (let sIdx = shockwavesRef.current.length - 1; sIdx >= 0; sIdx--) {
        const s = shockwavesRef.current[sIdx];
        s.r += 3.2;
        s.alpha -= 0.025;
        if (s.alpha <= 0) {
          shockwavesRef.current.splice(sIdx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 160, 102, ${s.alpha * 0.7})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [dilationRate]);

  // Pointer interactions
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isInside: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.isInside = false;
  };

  const handleClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sounds.playTap();
    shockwavesRef.current.push({ x, y, r: 8, alpha: 1 });

    // Gravitational pulse push
    particlesRef.current.forEach((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      const d = Math.hypot(dx, dy) || 1;
      p.vx += (dx / d) * 6;
      p.vy += (dy / d) * 6;
    });
  };

  const toggleDilation = () => {
    sounds.playPillSelect();
    setDilationRate((prev) => (prev === 'normal' ? 'singularity' : 'normal'));
  };

  return (
    <div ref={containerRef} className="relative w-full h-[280px] flex flex-col justify-between select-none">
      
      {/* 4D Canvas */}
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handleClick}
        className="w-full h-full cursor-crosshair touch-none rounded-2xl"
      />

      {/* Floating Center Badge */}
      <div className="absolute top-2 left-2 z-10 pointer-events-none px-2 py-0.5 rounded-full bg-[#2B302C]/80 backdrop-blur-md text-[9px] font-mono text-amber border border-amber/20 flex items-center gap-1.5">
        <Sparkles className="w-2.5 h-2.5" />
        <span>Gargantua Singularity • 4D Projection</span>
      </div>

      {/* HUD Bottom Controls */}
      <div className="pt-2 px-1 border-t border-[#E3DACD]/70 flex items-center justify-between text-xs font-mono text-charcoal-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span className="text-[11px] text-charcoal font-semibold">1 hr = 7 yrs</span>
          <span className="text-charcoal-muted/60">•</span>
          <span className="text-[10px] text-charcoal-muted">Gravity Well Active</span>
        </div>

        <button
          onClick={toggleDilation}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-all flex items-center gap-1.5 shadow-2xs border ${
            dilationRate === 'singularity'
              ? 'bg-amber text-[#2B302C] border-amber shadow-glow-amber'
              : 'bg-white border-[#E3DACD] text-charcoal hover:border-amber hover:text-amber-dark'
          }`}
          title="Toggle Relativistic Frame Dragging"
        >
          <Compass className="w-3 h-3" />
          <span>{dilationRate === 'singularity' ? 'Singularity Mode' : 'Orbit Mode'}</span>
        </button>
      </div>

    </div>
  );
};
