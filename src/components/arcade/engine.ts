import { LOGO_DARK } from '../../data/logoPaths';

// Logical playfield size; the canvas is scaled to fit and to the screen's pixel density
export const W = 520;
export const H = 460;

export type EntityKind = 'token' | 'mcp' | 'bug' | 'hallucination';

// Game palette: the site's charcoal, ecru and amber, plus one danger colour used only in the arcade
export const COLORS = {
  bg: '#1C201D',
  grid: 'rgba(247, 242, 235, 0.07)',
  ecru: '#F7F2EB',
  charcoal: '#2B302C',
  amber: '#D4A066',
  amberLight: '#E2B784',
  danger: '#C2573E',
};

interface Entity {
  kind: EntityKind;
  x: number;
  y: number;
  vy: number;
  size: number;
  label: string;
  phase: number;
  spin: number;
}

interface Shot {
  x: number;
  y: number;
  trail: { x: number; y: number }[];
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
}

interface Popup {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
}

export interface Stats {
  score: number;
  lives: number;
  /** Seconds of MCP shield left */
  shield: number;
  combo: number;
  bestCombo: number;
  tokens: number;
  zapped: number;
  layer: number;
}

export type GameEvent =
  | { type: 'collect' }
  | { type: 'zap' }
  | { type: 'shield' }
  | { type: 'hit' }
  | { type: 'fire' }
  | { type: 'layer'; layer: number }
  | { type: 'gameover' };

export interface Input {
  left: boolean;
  right: boolean;
  /** Pointer x in playfield units, when steering by mouse or touch */
  targetX: number | null;
  fire: boolean;
}

const TOKEN_LABELS = ['EMBED', 'SQL', 'VEC', 'CTX', 'JSON'];
const FIRE_COOLDOWN = 0.2;
const SHIELD_TIME = 6;
const LAYER_SECONDS = 25;
const PLAYER_SIZE = 50;
const PLAYER_Y = H - 52;

const parseMatrix = (m: string) => m.replace(/[^\d.,-]/g, '').split(',').map(Number) as [number, number, number, number, number, number];

// The logo as canvas paths, so the player can be the brand mark itself
const LOGO = (['pot', 'bat', 'ball'] as const).map((part) => ({
  part,
  path: new Path2D(LOGO_DARK[part].d),
  matrix: parseMatrix(LOGO_DARK[part].transform),
}));

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export class Engine {
  stats: Stats = this.freshStats();
  private player = { x: W / 2, vx: 0, invulnerable: 0, cooldown: 0 };
  private entities: Entity[] = [];
  private shots: Shot[] = [];
  private sparks: Spark[] = [];
  private popups: Popup[] = [];
  private spawnTimer = 0.6;
  private scroll = 0;
  private shake = 0;
  private flash = 0;
  private hitStop = 0;
  private clock = 0;
  /** Seconds survived this run; layers advance on time, not score, so combos can't skip them */
  private elapsed = 0;

  private freshStats(): Stats {
    return { score: 0, lives: 3, shield: 0, combo: 0, bestCombo: 0, tokens: 0, zapped: 0, layer: 1 };
  }

  reset() {
    this.stats = this.freshStats();
    this.player = { x: W / 2, vx: 0, invulnerable: 0, cooldown: 0 };
    this.entities = [];
    this.shots = [];
    this.sparks = [];
    this.popups = [];
    this.spawnTimer = 0.6;
    this.shake = 0;
    this.flash = 0;
    this.hitStop = 0;
    this.elapsed = 0;
  }

  get multiplier() {
    return Math.min(4, 1 + Math.floor(this.stats.combo / 8));
  }

  /** Advance the world by dt seconds. Only call while playing. */
  update(dt: number, input: Input): GameEvent[] {
    const events: GameEvent[] = [];
    this.clock += dt;
    this.ambient(dt);

    // A beat of hit-stop sells the impact
    if (this.hitStop > 0) {
      this.hitStop -= dt;
      return events;
    }

    const s = this.stats;
    const p = this.player;
    this.elapsed += dt;
    const speedUp = 1 + (s.layer - 1) * 0.12;

    // Player: keys push, the pointer pulls; velocity is kept for the tilt
    const prevX = p.x;
    if (input.targetX !== null) {
      p.x += (input.targetX - p.x) * Math.min(1, dt * 14);
    } else {
      const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
      p.x += dir * 420 * dt;
    }
    p.x = Math.max(PLAYER_SIZE / 2 + 6, Math.min(W - PLAYER_SIZE / 2 - 6, p.x));
    p.vx = (p.x - prevX) / Math.max(dt, 0.001);
    p.invulnerable = Math.max(0, p.invulnerable - dt);
    p.cooldown = Math.max(0, p.cooldown - dt);
    s.shield = Math.max(0, s.shield - dt);

    // Fire: the logo's ball launches, and reappears as the cooldown refills
    if (input.fire && p.cooldown === 0) {
      p.cooldown = FIRE_COOLDOWN;
      this.shots.push({ x: p.x, y: PLAYER_Y - PLAYER_SIZE * 0.2, trail: [] });
      events.push({ type: 'fire' });
    }

    // Spawn, faster on each layer
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = Math.max(0.36, 0.85 - (s.layer - 1) * 0.07) * rand(0.8, 1.2);
      const roll = Math.random();
      const kind: EntityKind = roll < 0.44 ? 'token' : roll < 0.54 ? 'mcp' : roll < 0.84 ? 'bug' : 'hallucination';
      this.entities.push({
        kind,
        x: rand(34, W - 34),
        y: -30,
        vy: rand(95, 175) * speedUp,
        size: kind === 'mcp' ? 30 : 36,
        label: kind === 'token' ? TOKEN_LABELS[Math.floor(Math.random() * TOKEN_LABELS.length)] : '',
        phase: rand(0, Math.PI * 2),
        spin: rand(-1.2, 1.2),
      });
    }

    for (const shot of this.shots) {
      shot.trail.unshift({ x: shot.x, y: shot.y });
      shot.trail.length = Math.min(shot.trail.length, 7);
      shot.y -= 640 * dt;
    }
    this.shots = this.shots.filter((shot) => shot.y > -20);

    for (let i = this.entities.length - 1; i >= 0; i--) {
      const e = this.entities[i];
      e.y += e.vy * dt;
      e.phase += dt * 3;
      // Hallucinations drift sideways: they never quite go where you expect
      if (e.kind === 'hallucination') e.x += Math.sin(e.phase) * 70 * dt;

      const hitBy = this.shots.findIndex((shot) => Math.hypot(shot.x - e.x, shot.y - e.y) < e.size / 2 + 6);
      if (hitBy >= 0) {
        this.shots.splice(hitBy, 1);
        this.entities.splice(i, 1);
        if (e.kind === 'bug' || e.kind === 'hallucination') {
          s.combo += 1;
          s.zapped += 1;
          this.award(150, e.x, e.y);
          this.burst(e.x, e.y, COLORS.danger, 18);
          events.push({ type: 'zap' });
        } else {
          // Shooting useful data wastes it and breaks the streak, so spraying fire doesn't pay
          s.combo = 0;
          this.burst(e.x, e.y, COLORS.ecru, 8);
          this.popups.push({ x: e.x, y: e.y, text: 'WASTED', life: 0.8, color: COLORS.danger });
        }
        continue;
      }

      const touching = Math.abs(e.x - p.x) < (e.size + PLAYER_SIZE) / 2 - 8 && Math.abs(e.y - PLAYER_Y) < (e.size + PLAYER_SIZE) / 2 - 10;
      if (touching) {
        this.entities.splice(i, 1);
        if (e.kind === 'token') {
          s.combo += 1;
          s.tokens += 1;
          this.award(100, e.x, e.y);
          this.burst(e.x, e.y, COLORS.ecru, 12);
          events.push({ type: 'collect' });
        } else if (e.kind === 'mcp') {
          s.combo += 1;
          s.shield = SHIELD_TIME;
          this.award(250, e.x, e.y);
          this.burst(e.x, e.y, COLORS.amber, 22);
          events.push({ type: 'shield' });
        } else if (s.shield > 0) {
          this.award(50, e.x, e.y);
          this.burst(e.x, e.y, COLORS.amber, 14);
          events.push({ type: 'zap' });
        } else if (p.invulnerable === 0) {
          s.lives -= 1;
          s.combo = 0;
          p.invulnerable = 1.4;
          this.burst(p.x, PLAYER_Y, COLORS.danger, 26);
          this.shake = 12;
          this.flash = 1;
          this.hitStop = 0.09;
          events.push({ type: 'hit' });
          if (s.lives <= 0) {
            events.push({ type: 'gameover' });
            return events;
          }
        }
        continue;
      }

      if (e.y > H + 40) {
        this.entities.splice(i, 1);
        // Letting good data through breaks the streak
        if (e.kind === 'token') s.combo = 0;
      }
    }

    s.bestCombo = Math.max(s.bestCombo, s.combo);
    const layer = 1 + Math.floor(this.elapsed / LAYER_SECONDS);
    if (layer > s.layer) {
      s.layer = layer;
      events.push({ type: 'layer', layer });
    }
    return events;
  }

  /** Background, sparks and popups keep moving on every screen, not only while playing. */
  ambient(dt: number) {
    this.scroll = (this.scroll + dt * 40 * (1 + (this.stats.layer - 1) * 0.15)) % 32;
    this.shake = Math.max(0, this.shake - dt * 40);
    this.flash = Math.max(0, this.flash - dt * 3);
    for (const sp of this.sparks) {
      sp.x += sp.vx * dt;
      sp.y += sp.vy * dt;
      sp.vy += 420 * dt;
      sp.life -= dt;
    }
    this.sparks = this.sparks.filter((sp) => sp.life > 0);
    for (const pop of this.popups) {
      pop.y -= 46 * dt;
      pop.life -= dt;
    }
    this.popups = this.popups.filter((pop) => pop.life > 0);
  }

  private award(base: number, x: number, y: number) {
    const points = base * this.multiplier;
    this.stats.score += points;
    this.popups.push({
      x,
      y,
      text: this.multiplier > 1 ? `+${points} ×${this.multiplier}` : `+${points}`,
      life: 0.9,
      color: this.multiplier > 1 ? COLORS.amber : COLORS.ecru,
    });
  }

  private burst(x: number, y: number, color: string, count: number) {
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(60, 260);
      const life = rand(0.35, 0.8);
      this.sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 80, life, max: life, color, size: rand(1.5, 3.5) });
    }
  }

  /** calm: no camera shake or damage flash, for visitors who prefer less motion */
  draw(ctx: CanvasRenderingContext2D, calm = false) {
    ctx.save();
    if (this.shake > 0 && !calm) ctx.translate(rand(-this.shake, this.shake) * 0.5, rand(-this.shake, this.shake) * 0.5);

    // Data-stream backdrop: a dot grid drifting down, faster on deeper layers
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(-20, -20, W + 40, H + 40);
    ctx.fillStyle = COLORS.grid;
    for (let y = -32 + this.scroll; y < H + 32; y += 32) {
      for (let x = 16; x < W; x += 32) ctx.fillRect(x - 1, y - 1, 2, 2);
    }

    for (const e of this.entities) drawEntity(ctx, e.kind, e.x, e.y, e.size, e.label, e.phase, e.spin * this.clock);

    for (const shot of this.shots) {
      shot.trail.forEach((t, i) => {
        ctx.globalAlpha = 0.35 * (1 - i / shot.trail.length);
        ctx.fillStyle = COLORS.amber;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 5 - i * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowColor = COLORS.amber;
      ctx.shadowBlur = 12;
      ctx.fillStyle = COLORS.amberLight;
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    this.drawPlayer(ctx);

    for (const sp of this.sparks) {
      ctx.globalAlpha = Math.max(0, sp.life / sp.max);
      ctx.fillStyle = sp.color;
      ctx.fillRect(sp.x - sp.size / 2, sp.y - sp.size / 2, sp.size, sp.size);
    }
    ctx.globalAlpha = 1;

    ctx.textAlign = 'center';
    ctx.font = '700 13px "JetBrains Mono", monospace';
    for (const pop of this.popups) {
      ctx.globalAlpha = Math.min(1, pop.life / 0.4);
      ctx.fillStyle = pop.color;
      ctx.fillText(pop.text, pop.x, pop.y);
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Damage: a danger-coloured vignette that fades out
    if (this.flash > 0 && !calm) {
      const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.8);
      g.addColorStop(0, 'rgba(194, 87, 62, 0)');
      g.addColorStop(1, `rgba(194, 87, 62, ${0.45 * this.flash})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
  }

  private drawPlayer(ctx: CanvasRenderingContext2D) {
    const p = this.player;
    const s = this.stats;

    // Blink while recovering from a hit
    if (p.invulnerable > 0 && Math.floor(p.invulnerable * 12) % 2 === 0) return;

    ctx.save();
    ctx.translate(p.x, PLAYER_Y);
    ctx.rotate(Math.max(-0.35, Math.min(0.35, p.vx * 0.0007)));

    if (s.shield > 0) {
      // Rotating dashed ring with a draining arc for the time left
      ctx.save();
      ctx.rotate(this.clock * 1.6);
      ctx.strokeStyle = 'rgba(212, 160, 102, 0.55)';
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);
      ctx.strokeStyle = COLORS.amber;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 44, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * s.shield) / SHIELD_TIME);
      ctx.stroke();
    }

    const scale = PLAYER_SIZE / 750;
    ctx.translate(-PLAYER_SIZE / 2, -PLAYER_SIZE / 2);
    ctx.scale(scale, scale);
    for (const { part, path, matrix } of LOGO) {
      ctx.save();
      ctx.transform(...matrix);
      if (part === 'ball') {
        // The ball is the ammunition: it refills as the cooldown runs out
        const ready = 1 - p.cooldown / FIRE_COOLDOWN;
        // The ball's centre in its own path units (logo centre 368, 382 run back through its matrix)
        const cx = 24.65;
        const cy = 16.97;
        ctx.translate(cx, cy);
        ctx.scale(ready, ready);
        ctx.translate(-cx, -cy);
        ctx.fillStyle = COLORS.amber;
      } else {
        ctx.fillStyle = COLORS.ecru;
      }
      ctx.fill(path);
      ctx.restore();
    }
    ctx.restore();
  }
}

/** Draw one falling entity; shared with the legend on the start screen. */
export function drawEntity(ctx: CanvasRenderingContext2D, kind: EntityKind, x: number, y: number, size: number, label: string, phase: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (kind === 'token') {
    // A verified data token: an ecru chip with a mono label
    ctx.rotate(Math.sin(phase) * 0.08);
    const w = size + 8;
    const h = size * 0.72;
    ctx.fillStyle = COLORS.ecru;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 6);
    ctx.fill();
    ctx.fillStyle = COLORS.charcoal;
    ctx.font = '700 9px "JetBrains Mono", monospace';
    ctx.fillText(label || 'EMBED', 0, 1);
  } else if (kind === 'mcp') {
    // The MCP shield: the brand's amber ball, pulsing
    const r = size / 2 + Math.sin(phase * 2) * 1.5;
    ctx.shadowColor = COLORS.amber;
    ctx.shadowBlur = 16;
    ctx.fillStyle = COLORS.amber;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = COLORS.charcoal;
    ctx.font = '800 9px "JetBrains Mono", monospace';
    ctx.fillText('MCP', 0, 1);
  } else if (kind === 'bug') {
    // A bug: a spinning, spiked shape in the danger colour
    ctx.rotate(angle);
    ctx.fillStyle = COLORS.danger;
    ctx.beginPath();
    const spikes = 8;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? size / 2 : size / 2 - 7;
      const a = (i / (spikes * 2)) * Math.PI * 2;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.rotate(-angle);
    ctx.fillStyle = COLORS.ecru;
    ctx.font = '800 9px "JetBrains Mono", monospace';
    ctx.fillText('BUG', 0, 1);
  } else {
    // A hallucination: a flickering dashed ghost of a token
    ctx.globalAlpha = 0.55 + Math.sin(phase * 3) * 0.3;
    ctx.strokeStyle = COLORS.danger;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = COLORS.danger;
    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.fillText('?', 0, 1);
  }
  ctx.restore();
}
