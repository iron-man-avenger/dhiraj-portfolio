// Zero-dependency Web Audio API sound synthesizer
class SoundManager {
  private ctx: AudioContext | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check saved preference
    const saved = localStorage.getItem('dk_portfolio_sound_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && !this.compressor) {
      try {
        const comp = this.ctx.createDynamicsCompressor();
        comp.threshold.setValueAtTime(-12, this.ctx.currentTime);
        comp.knee.setValueAtTime(30, this.ctx.currentTime);
        comp.ratio.setValueAtTime(12, this.ctx.currentTime);
        comp.attack.setValueAtTime(0.003, this.ctx.currentTime);
        comp.release.setValueAtTime(0.25, this.ctx.currentTime);
        comp.connect(this.ctx.destination);
        this.compressor = comp;
      } catch {}
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('dk_portfolio_sound_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.playTap();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft tactile click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext might be blocked until user interaction
    }
  }

  // Light tap
  public playTap() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  // Success chime (arpeggio for verification / score)
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = now + idx * 0.07;
        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {}
  }

  // Laser zap for mini-game
  public playLaser() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {}
  }

  // Token collection ding
  public playTokenCollect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  // Game over boom
  public playExplosion() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch {}
  }

  // Interstellar Theme Synthesizer (Hans Zimmer Cosmic Piano & Organ Harmonics)
  public playInterstellarTone(index: number): string {
    if (this.isMuted) return '';
    try {
      this.initCtx();
      if (!this.ctx) return '';

      const target = INTERSTELLAR_NODES[Math.max(0, Math.min(index, INTERSTELLAR_NODES.length - 1))];
      const now = this.ctx.currentTime;
      const destination = this.compressor || this.ctx.destination;

      // 1. Fundamental Felt Piano Oscillator (Sine)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(target.freq, now);

      // 2. Shimmering Cathedral Organ Harmonic (Detuned Triangle +3.5 cents)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(target.freq * 1.0022, now);

      // 3. Sub-bass Organ Pedal (for notes under 450Hz for authentic Hans Zimmer chest resonance)
      let subOsc: OscillatorNode | null = null;
      let subGain: GainNode | null = null;
      if (target.freq <= 450) {
        subOsc = this.ctx.createOscillator();
        subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(target.freq * 0.5, now);
        subGain.gain.setValueAtTime(0.0001, now);
        subGain.gain.linearRampToValueAtTime(0.035, now + 0.04);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        subOsc.connect(subGain);
        subGain.connect(destination);
        subOsc.start(now);
        subOsc.stop(now + 1.3);
      }

      // Warm acoustic Lowpass filter (filters harsh digital harmonics, replicates room acoustic)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(target.freq * 3.6, 2200), now);
      filter.Q.setValueAtTime(1.1, now);

      // Master Note Amplitude Envelope
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      // Hans Zimmer signature felt-piano attack: 35ms soft rise
      gain.gain.linearRampToValueAtTime(0.085, now + 0.035);
      // Lingering space reverb tail: exponential decay over 1.4 seconds
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.45);
      osc2.stop(now + 1.45);

      return target.note;
    } catch {
      return '';
    }
  }

  // Auto-play the iconic Hans Zimmer Interstellar motif across the 12 bars
  public playInterstellarTheme(
    onNoteTrigger?: (index: number) => void,
    onComplete?: () => void
  ): () => void {
    if (this.isMuted) {
      if (onComplete) onComplete();
      return () => {};
    }

    // Iconic "Day One / Stay / First Step" Interstellar melodic sequence
    const motif = [2, 3, 4, 5, 4, 3, 7, 8, 9, 10, 11, 0, 1, 2];
    const delays = [0, 320, 640, 980, 1380, 1750, 2120, 2500, 2880, 3260, 3640, 4020, 4400, 4800];

    const timeouts: (ReturnType<typeof setTimeout>)[] = [];

    motif.forEach((barIdx, i) => {
      const t = setTimeout(() => {
        this.playInterstellarTone(barIdx);
        if (onNoteTrigger) onNoteTrigger(barIdx);
      }, delays[i]);
      timeouts.push(t);
    });

    const endTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5400);
    timeouts.push(endTimeout);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      if (onComplete) onComplete();
    };
  }
}

export interface InterstellarNode {
  barIndex: number;
  note: string;
  name: string;
  freq: number;
  title: string;
  description: string;
}

export const INTERSTELLAR_NODES: InterstellarNode[] = [
  { barIndex: 0, note: 'A3', name: 'A3 • 220Hz', freq: 220.00, title: 'Earth Ground', description: 'Deep acoustic fundamental' },
  { barIndex: 1, note: 'C4', name: 'C4 • 261Hz', freq: 261.63, title: 'Atmosphere Launch', description: 'Ascending minor 3rd' },
  { barIndex: 2, note: 'E4', name: 'E4 • 330Hz', freq: 329.63, title: 'Amber Horizon (Peak)', description: 'Hans Zimmer fifth harmonic' },
  { barIndex: 3, note: 'A4', name: 'A4 • 440Hz', freq: 440.00, title: 'Endurance Orbit', description: 'Octave resonance' },
  { barIndex: 4, note: 'B4', name: 'B4 • 494Hz', freq: 493.88, title: 'Wormhole Drift', description: 'Suspense modal step' },
  { barIndex: 5, note: 'C5', name: 'C5 • 523Hz', freq: 523.25, title: 'Gargantua Singularity', description: 'Climax emotional peak' },
  { barIndex: 6, note: 'B4', name: 'B4 • 494Hz', freq: 493.88, title: 'Relativity Descent', description: 'Gravitational dilation' },
  { barIndex: 7, note: 'A4', name: 'A4 • 440Hz', freq: 440.00, title: 'Stay Motif', description: 'The tesseract message' },
  { barIndex: 8, note: 'G4', name: 'G4 • 392Hz', freq: 392.00, title: 'Time Invariant', description: 'Descending cadential step' },
  { barIndex: 9, note: 'E4', name: 'E4 • 330Hz', freq: 329.63, title: 'Quantum Data', description: 'Watch second-hand pulse' },
  { barIndex: 10, note: 'D4', name: 'D4 • 294Hz', freq: 293.66, title: 'Murph Resolution', description: 'Penultimate resolution' },
  { barIndex: 11, note: 'C4', name: 'C4 • 261Hz', freq: 261.63, title: 'Home Base', description: 'Harmonic return' },
];

export const sounds = new SoundManager();
