import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Trophy, Shield, Zap } from 'lucide-react';

import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface ArcadeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'token' | 'mcp' | 'bug' | 'hallucination';
  label: string;
}

interface Bullet {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  life: number;
}

export const ArcadeGame: React.FC<ArcadeGameProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [hasShield, setHasShield] = useState<boolean>(false);

  // References for the game loop
  const playerRef = useRef({
    x: 250,
    y: 420,
    width: 44,
    height: 36,
    speed: 7,
    shieldUntil: 0
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const objectsRef = useRef<GameObject[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('dk_arcade_high_score');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Keyboard handlers
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        fireLaser();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, gameState]);

  // Touch and mouse steering
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const scaleX = canvasRef.current.width / rect.width;
    playerRef.current.x = Math.max(20, Math.min(canvasRef.current.width - 64, clientX * scaleX - 22));
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || !canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches[0].clientX - rect.left;
    const scaleX = canvasRef.current.width / rect.width;
    playerRef.current.x = Math.max(20, Math.min(canvasRef.current.width - 64, clientX * scaleX - 22));
  };

  const fireLaser = () => {
    if (gameState !== 'playing') return;
    sounds.playLaser();
    const p = playerRef.current;
    bulletsRef.current.push({
      x: p.x + p.width / 2,
      y: p.y - 4,
      radius: 4,
      speed: 10
    });
  };

  const startGame = () => {
    sounds.playTap();
    setScore(0);
    setLives(3);
    setHasShield(false);
    objectsRef.current = [];
    bulletsRef.current = [];
    particlesRef.current = [];
    playerRef.current.x = 260;
    playerRef.current.shieldUntil = 0;
    setGameState('playing');
  };

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localScore = score;
    let localLives = 3;

    const gameLoop = (timestamp: number) => {
      // 1. Clear background (Warm ecru / dark arcade canvas)
      ctx.fillStyle = '#1E2320';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint cyber grid
      ctx.strokeStyle = 'rgba(212, 160, 102, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 2. Move player with keys
      const p = playerRef.current;
      if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
        p.x = Math.max(10, p.x - p.speed);
      }
      if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
        p.x = Math.min(canvas.width - p.width - 10, p.x + p.speed);
      }

      const isShieldActive = timestamp < p.shieldUntil;
      setHasShield(isShieldActive);

      // Draw Player Drone
      ctx.save();
      // Shield glow
      if (isShieldActive) {
        ctx.strokeStyle = '#D4A066';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.x + p.width / 2, p.y + p.height / 2, 32, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Drone Body (Charcoal & Amber highlight)
      ctx.fillStyle = '#D4A066';
      ctx.beginPath();
      ctx.moveTo(p.x + p.width / 2, p.y);
      ctx.lineTo(p.x + p.width, p.y + p.height);
      ctx.lineTo(p.x + p.width * 0.7, p.y + p.height * 0.75);
      ctx.lineTo(p.x + p.width * 0.3, p.y + p.height * 0.75);
      ctx.lineTo(p.x, p.y + p.height);
      ctx.closePath();
      ctx.fill();

      // Drone cockpit
      ctx.fillStyle = '#F7F2EB';
      ctx.beginPath();
      ctx.arc(p.x + p.width / 2, p.y + p.height * 0.45, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Spawn falling entities
      if (timestamp - lastSpawnRef.current > 750) {
        lastSpawnRef.current = timestamp;
        const rand = Math.random();
        let type: GameObject['type'] = 'bug';
        let label = 'Taxonomy Drift';

        if (rand < 0.45) {
          type = 'token';
          label = 'Valid Embedding';
        } else if (rand < 0.60) {
          type = 'mcp';
          label = 'MCP Token';
        } else if (rand < 0.85) {
          type = 'bug';
          label = 'Taxonomy Drift';
        } else {
          type = 'hallucination';
          label = 'Hallucination';
        }

        objectsRef.current.push({
          x: Math.random() * (canvas.width - 80) + 20,
          y: -25,
          width: 38,
          height: 30,
          speed: 2.2 + Math.random() * 2,
          type,
          label
        });
      }

      // 4. Update & Draw Bullets
      for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
        const b = bulletsRef.current[i];
        b.y -= b.speed;

        ctx.fillStyle = '#E2B37F';
        ctx.shadowColor = '#D4A066';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (b.y < -10) {
          bulletsRef.current.splice(i, 1);
        }
      }

      // 5. Update & Draw Objects (Tokens & Bugs)
      for (let i = objectsRef.current.length - 1; i >= 0; i--) {
        const obj = objectsRef.current[i];
        obj.y += obj.speed;

        // Draw Object
        ctx.save();
        if (obj.type === 'token') {
          ctx.fillStyle = '#4ade80'; // Emerald Green
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.fillStyle = '#1E2320';
          ctx.font = 'bold 9px monospace';
          ctx.fillText('EMBED', obj.x + 3, obj.y + 18);
        } else if (obj.type === 'mcp') {
          ctx.fillStyle = '#D4A066'; // Amber Gold
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.fillStyle = '#1E2320';
          ctx.font = 'bold 9px monospace';
          ctx.fillText('MCP★', obj.x + 6, obj.y + 18);
        } else {
          ctx.fillStyle = '#f87171'; // Red Bug
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8px monospace';
          ctx.fillText('BUG!', obj.x + 7, obj.y + 18);
        }
        ctx.restore();

        // Bullet vs Object collision
        for (let j = bulletsRef.current.length - 1; j >= 0; j--) {
          const b = bulletsRef.current[j];
          if (
            b.x > obj.x &&
            b.x < obj.x + obj.width &&
            b.y > obj.y &&
            b.y < obj.y + obj.height
          ) {
            // Explode object
            sounds.playExplosion();
            spawnParticles(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.type === 'bug' ? '#f87171' : '#D4A066');
            
            if (obj.type === 'bug' || obj.type === 'hallucination') {
              localScore += 150;
              setScore(localScore);
            }
            objectsRef.current.splice(i, 1);
            bulletsRef.current.splice(j, 1);
            break;
          }
        }

        // Player vs Object collision
        if (
          obj.x < p.x + p.width &&
          obj.x + obj.width > p.x &&
          obj.y < p.y + p.height &&
          obj.y + obj.height > p.y
        ) {
          if (obj.type === 'token') {
            sounds.playTokenCollect();
            localScore += 100;
            setScore(localScore);
            spawnParticles(obj.x + obj.width / 2, obj.y + obj.height / 2, '#4ade80');
          } else if (obj.type === 'mcp') {
            sounds.playSuccess();
            localScore += 250;
            setScore(localScore);
            p.shieldUntil = timestamp + 6000; // 6 seconds shield
            spawnParticles(obj.x + obj.width / 2, obj.y + obj.height / 2, '#D4A066');
          } else {
            // Hit a bug!
            if (!isShieldActive) {
              sounds.playExplosion();
              localLives -= 1;
              setLives(localLives);
              spawnParticles(p.x + p.width / 2, p.y + p.height / 2, '#f87171');
              if (localLives <= 0) {
                endGame(localScore);
                return;
              }
            } else {
              sounds.playLaser();
              localScore += 50;
              setScore(localScore);
            }
          }
          objectsRef.current.splice(i, 1);
          continue;
        }

        // Out of bounds
        if (obj.y > canvas.height + 30) {
          objectsRef.current.splice(i, 1);
        }
      }

      // 6. Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.03;

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (pt.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    const spawnParticles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1.0,
          life: 30
        });
      }
    };

    const endGame = (finalScore: number) => {
      setGameState('gameover');
      sounds.playExplosion();
      if (finalScore > highScore) {
        setHighScore(finalScore);
        localStorage.setItem('dk_arcade_high_score', String(finalScore));
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    };

    animFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [gameState, highScore]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-xl bg-charcoal-deep rounded-3xl border border-charcoal-border shadow-2xl p-6 text-white flex flex-col items-center"
        >
          {/* Modal Header */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-charcoal-border mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber text-charcoal-deep flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 fill-charcoal-deep" />
              </div>
              <div>
                <h3 className="font-bold text-sm font-sans tracking-wide">
                  Agentic Token Defender
                </h3>
                <p className="text-[11px] font-mono text-charcoal-faded">
                  Dhiraj's AI Pipeline Arcade Mini-Game
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber">
                <Trophy className="w-4 h-4" />
                <span>BEST: {highScore}</span>
              </div>
              <button
                onClick={() => {
                  sounds.playTap();
                  onClose();
                }}
                className="p-1.5 rounded-lg border border-charcoal-border text-charcoal-faded hover:text-white hover:bg-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Box */}
          <div className="relative rounded-2xl overflow-hidden border border-charcoal-border bg-[#1E2320] w-full flex justify-center">
            
            {/* Top HUD Overlay */}
            {gameState === 'playing' && (
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono text-xs z-10 pointer-events-none">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold">SCORE: <span className="text-amber">{score}</span></span>
                  {hasShield && (
                    <span className="px-2 py-0.5 rounded bg-amber/20 text-amber font-bold flex items-center gap-1">
                      <Shield className="w-3 h-3" /> MCP SHIELD
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < lives ? 'text-red-400' : 'text-charcoal-border'}`}
                    >
                      ♥
                    </span>
                  ))}
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={520}
              height={460}
              onMouseMove={handleCanvasMouseMove}
              onTouchMove={handleCanvasTouchMove}
              onClick={fireLaser}
              className="cursor-crosshair w-full max-w-[520px] h-[400px] sm:h-[440px] block"
            />

            {/* Ready Screen Overlay */}
            {gameState === 'ready' && (
              <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber/20 border border-amber/40 text-amber flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 fill-amber" />
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  Agentic Token Defender
                </h4>
                <p className="text-xs text-charcoal-faded max-w-sm mb-6 leading-relaxed">
                  Steer your agent drone to collect green <strong className="text-emerald-400">Verified Tokens</strong> (+100) and golden <strong className="text-amber">Shields</strong> (+250). Zap or dodge red <strong className="text-red-400">Bug Obstacles</strong>!
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-[11px] font-mono text-charcoal-faded mb-6 bg-charcoal/70 px-4 py-2.5 rounded-xl border border-charcoal-border">
                  <span className="hidden sm:inline">Desktop: ← / → Move • Spacebar Fire</span>
                  <span>Mobile: Touch & Drag to Move • Tap to Fire</span>
                </div>

                <button
                  onClick={startGame}
                  className="px-7 py-3 rounded-xl bg-amber text-charcoal-deep font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-amber-light transition-all active:scale-95 shadow-glow-amber"
                >
                  <Play className="w-4 h-4 fill-charcoal-deep" />
                  <span>Start Game</span>
                </button>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <div className="text-3xl mb-1">💥</div>
                <h4 className="text-xl font-extrabold text-white mb-1">
                  Pipeline Complete!
                </h4>
                <p className="text-xs text-charcoal-faded mb-4">
                  Bug detected in verification layer. Great run!
                </p>

                <div className="p-4 rounded-xl bg-charcoal border border-charcoal-border mb-6 w-52">
                  <span className="text-[10px] font-mono text-charcoal-faded block">FINAL SCORE</span>
                  <span className="text-2xl font-bold font-mono text-amber">{score}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="px-5 py-2.5 rounded-xl bg-amber text-charcoal-deep font-bold text-xs flex items-center gap-2 hover:bg-amber-light active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-charcoal-border text-white text-xs hover:bg-charcoal active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Tactile Action Bar (Only visible when playing on mobile) */}
          {gameState === 'playing' && (
            <div className="w-full mt-3 flex items-center justify-between gap-2.5 sm:hidden">
              <div className="flex gap-2">
                <button
                  onTouchStart={(e) => { e.preventDefault(); keysRef.current['ArrowLeft'] = true; }}
                  onTouchEnd={(e) => { e.preventDefault(); keysRef.current['ArrowLeft'] = false; }}
                  onMouseDown={() => { keysRef.current['ArrowLeft'] = true; }}
                  onMouseUp={() => { keysRef.current['ArrowLeft'] = false; }}
                  className="w-14 h-12 rounded-xl bg-white/10 active:bg-amber/30 border border-white/20 text-white font-bold flex items-center justify-center select-none text-base"
                  aria-label="Move Left"
                >
                  ◀
                </button>
                <button
                  onTouchStart={(e) => { e.preventDefault(); keysRef.current['ArrowRight'] = true; }}
                  onTouchEnd={(e) => { e.preventDefault(); keysRef.current['ArrowRight'] = false; }}
                  onMouseDown={() => { keysRef.current['ArrowRight'] = true; }}
                  onMouseUp={() => { keysRef.current['ArrowRight'] = false; }}
                  className="w-14 h-12 rounded-xl bg-white/10 active:bg-amber/30 border border-white/20 text-white font-bold flex items-center justify-center select-none text-base"
                  aria-label="Move Right"
                >
                  ▶
                </button>
              </div>
              <button
                onClick={fireLaser}
                onTouchStart={(e) => { e.preventDefault(); fireLaser(); }}
                className="flex-1 h-12 rounded-xl bg-amber text-charcoal font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 select-none"
              >
                <Zap className="w-4 h-4 fill-charcoal" />
                <span>FIRE LASER</span>
              </button>
            </div>
          )}

          {/* Footer Controls Info */}
          <div className="w-full mt-3 flex items-center justify-between text-[11px] font-mono text-charcoal-faded">
            <span className="hidden sm:inline">Desktop: Arrow Keys + Spacebar</span>
            <span>Mobile: Touch buttons or drag on screen to move</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
