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

  // Deep 32-foot Cathedral Pipe Organ Bass Pedal Chords (Am, G Major, F Major)
  public playOrganBassChord(chord: 'Am' | 'G' | 'F') {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const destination = this.compressor || this.ctx.destination;

      // Chord fundamental and harmonic frequencies for massive 32ft church organ pipe resonance
      let roots: number[] = [];
      if (chord === 'Am') {
        roots = [55.00, 110.00, 164.81]; // A1 (32ft sub), A2 (16ft principal), E3 (8ft fifth)
      } else if (chord === 'G') {
        roots = [48.99, 97.99, 146.83]; // G1 (32ft sub), G2 (16ft principal), D3 (8ft fifth)
      } else if (chord === 'F') {
        roots = [43.65, 87.31, 130.81]; // F1 (32ft sub), F2 (16ft principal), C3 (8ft fifth)
      }

      const bassFilter = this.ctx.createBiquadFilter();
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(360, now);
      bassFilter.Q.setValueAtTime(1.3, now);

      const bassGain = this.ctx.createGain();
      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.linearRampToValueAtTime(0.09, now + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      roots.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(bassFilter);
        osc.start(now);
        osc.stop(now + 2.25);
      });

      bassFilter.connect(bassGain);
      bassGain.connect(destination);
    } catch {}
  }

  // Authentic Massive Church Pipe Organ Note (Flute + Principal Pipes + Cathedral Voix Céleste)
  public playOrganPipe(node: InterstellarNode): string {
    if (this.isMuted) return '';
    try {
      this.initCtx();
      if (!this.ctx) return '';
      const now = this.ctx.currentTime;
      const destination = this.compressor || this.ctx.destination;

      // Automatically trigger left-hand bass pedal chord on root beats
      if (node.bassChord) {
        this.playOrganBassChord(node.bassChord);
      }

      // 1. 8' Principal Flute pipe (Sine fundamental)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(node.freq, now);

      // 2. 4' Octave pipe (Triangle + subtle cathedral chorus detuning +3 cents)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(node.freq * 1.0022, now);

      // 3. 2-2/3' Nazard Harmonic pipe (Air shimmer of organ pipes)
      const osc3 = this.ctx.createOscillator();
      const osc3Gain = this.ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(node.freq * 2.0, now);
      osc3Gain.gain.setValueAtTime(0.025, now);
      osc3.connect(osc3Gain);

      // Acoustic Lowpass filter (emulating stone sanctuary acoustic damping)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, now);
      filter.Q.setValueAtTime(1.1, now);

      // Master pipe envelope: 40ms air swell attack + 1.5s lingering cathedral decay
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3Gain.connect(filter);
      filter.connect(gain);
      gain.connect(destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + 1.55);
      osc2.stop(now + 1.55);
      osc3.stop(now + 1.55);

      return node.note;
    } catch {
      return '';
    }
  }

  // Play node by index (backwards compatible)
  public playInterstellarTone(index: number): string {
    const target = INTERSTELLAR_NODES[Math.max(0, Math.min(index, INTERSTELLAR_NODES.length - 1))];
    return this.playOrganPipe(target);
  }

  // Play an individual Hans Zimmer pattern (1, 2, 3, 4, or 5)
  public playInterstellarPattern(
    patternId: number,
    onStep?: (barIdx: number) => void,
    onComplete?: () => void
  ): () => void {
    if (this.isMuted) {
      if (onComplete) onComplete();
      return () => {};
    }

    // Determine bars corresponding to the pattern
    let barIndices: number[] = [];
    if (patternId === 1) barIndices = [0, 1, 2, 3]; // A - E - A - E (Am)
    else if (patternId === 2) barIndices = [4, 5, 6, 7]; // B - E - B - E (G)
    else if (patternId === 3) barIndices = [8, 9, 8, 9]; // C - E - C - E (F)
    else if (patternId === 4) barIndices = [10, 11, 10, 11]; // D - E - D - E (F)
    else if (patternId === 5) barIndices = [6, 7, 6, 7]; // B - E - B - E (G Return)

    const timeouts: (ReturnType<typeof setTimeout>)[] = [];
    const stepDuration = 270;

    barIndices.forEach((bIdx, step) => {
      const t = setTimeout(() => {
        this.playOrganPipe(INTERSTELLAR_NODES[bIdx]);
        if (onStep) onStep(bIdx);
      }, step * stepDuration);
      timeouts.push(t);
    });

    const endT = setTimeout(() => {
      if (onComplete) onComplete();
    }, barIndices.length * stepDuration + 250);
    timeouts.push(endT);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      if (onComplete) onComplete();
    };
  }

  // Auto-play the actual Hans Zimmer Interstellar Main Theme (First Step) with authentic cathedral tempo
  public playInterstellarTheme(
    onNoteTrigger?: (index: number) => void,
    onComplete?: () => void
  ): () => void {
    if (this.isMuted) {
      if (onComplete) onComplete();
      return () => {};
    }

    // Actual authentic Hans Zimmer composition sequence:
    // Pattern 1 (A-E-A-E with Am) -> Pattern 2 (B-E-B-E with G) -> Pattern 3 (C-E-C-E with F) ->
    // Pattern 4 (D-E-D-E with F) -> Return Pattern 5 (B-E-B-E with G) -> Final Resolution (A-E-A with deep Am pedal)
    const sequence = [
      0, 1, 2, 3,       // Pattern 1: A - E - A - E (Am Bass)
      4, 5, 6, 7,       // Pattern 2: B - E - B - E (G Maj Bass)
      8, 9, 8, 9,       // Pattern 3: C - E - C - E (F Maj Bass)
      10, 11, 10, 11,   // Pattern 4: D - E - D - E (F Maj Bass)
      6, 7, 6, 7,       // Return:    B - E - B - E (G Maj Bass)
      0, 1, 2           // Finale:    A - E - A (Am Deep Cathedral Sub Pedal)
    ];

    const timeouts: (ReturnType<typeof setTimeout>)[] = [];
    // Actual movie tempo: steady, breathing 460ms per note so the cathedral acoustics expand
    const stepDuration = 460;

    sequence.forEach((barIdx, i) => {
      const t = setTimeout(() => {
        this.playOrganPipe(INTERSTELLAR_NODES[barIdx]);
        if (onNoteTrigger) onNoteTrigger(barIdx);
      }, i * stepDuration);
      timeouts.push(t);
    });

    const endTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, sequence.length * stepDuration + 800);
    timeouts.push(endTimeout);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      if (onComplete) onComplete();
    };
  }

  // Triumphant pipe organ celebration chord when player solves the theme challenge
  public playTesseractVictory() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const dest = this.compressor || this.ctx.destination;

      // Hans Zimmer celebratory minor 9th cathedral pipe organ chord:
      // A2 (110), E3 (164.8), A3 (220), C4 (261.6), E4 (329.6), B4 (493.9)
      const freqs = [110.00, 164.81, 220.00, 261.63, 329.63, 493.88];
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(1.2, now);

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx < 2 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(f, now);
        osc.connect(filter);
        osc.start(now + idx * 0.04);
        osc.stop(now + 2.6);
      });

      filter.connect(masterGain);
      masterGain.connect(dest);
    } catch {}
  }
}

export interface InterstellarNode {
  barIndex: number;
  note: string;         // 'A', 'E', 'B', 'C', 'D'
  octaveNote: string;   // 'A4', 'E5', 'B4', etc.
  freq: number;
  bassChord?: 'Am' | 'G' | 'F';
  bassName?: string;    // 'Am (A Minor)', 'G Major', 'F Major'
  patternIndex: number; // 1, 2, 3, 4
  patternName: string;  // 'Pattern 1', 'Pattern 2', etc.
  title: string;
}

export interface InterstellarPattern {
  id: number;
  name: string;
  notes: string[];
  noteSequenceText: string;
  bassChord: 'Am' | 'G' | 'F';
  bassName: string;
  description: string;
}

export const INTERSTELLAR_PATTERNS: InterstellarPattern[] = [
  {
    id: 1,
    name: 'Pattern 1',
    notes: ['A', 'E', 'A', 'E'],
    noteSequenceText: 'A — E — A — E',
    bassChord: 'Am',
    bassName: 'Am (A Minor)',
    description: 'A-E alternation over deep Am pipe organ pedal'
  },
  {
    id: 2,
    name: 'Pattern 2',
    notes: ['B', 'E', 'B', 'E'],
    noteSequenceText: 'B — E — B — E',
    bassChord: 'G',
    bassName: 'G Major',
    description: 'B-E step upward over G Major bass pedal'
  },
  {
    id: 3,
    name: 'Pattern 3',
    notes: ['C', 'E', 'C', 'E'],
    noteSequenceText: 'C — E — C — E',
    bassChord: 'F',
    bassName: 'F Major',
    description: 'C-E rising harmonic tension over F Major'
  },
  {
    id: 4,
    name: 'Pattern 4',
    notes: ['D', 'E', 'D', 'E'],
    noteSequenceText: 'D — E — D — E',
    bassChord: 'F',
    bassName: 'F Major',
    description: 'D-E emotional peak before the return'
  },
  {
    id: 5,
    name: 'Pattern 5',
    notes: ['B', 'E', 'B', 'E'],
    noteSequenceText: 'B — E — B — E',
    bassChord: 'G',
    bassName: 'G Major',
    description: 'Drop back down to B over G Major'
  }
];

export const INTERSTELLAR_NODES: InterstellarNode[] = [
  // Pattern 1: A — E — A — E (Am Bass)
  { barIndex: 0, note: 'A', octaveNote: 'A4', freq: 440.00, bassChord: 'Am', bassName: 'Am Bass', patternIndex: 1, patternName: 'Pattern 1', title: 'Token Parser' },
  { barIndex: 1, note: 'E', octaveNote: 'E5', freq: 659.25, patternIndex: 1, patternName: 'Pattern 1', title: 'Vector Search' },
  { barIndex: 2, note: 'A', octaveNote: 'A4', freq: 440.00, bassChord: 'Am', bassName: 'Am Bass', patternIndex: 1, patternName: 'Pattern 1', title: 'Multi-Agent Routing' },
  { barIndex: 3, note: 'E', octaveNote: 'E5', freq: 659.25, patternIndex: 1, patternName: 'Pattern 1', title: 'AST Logic Judge' },

  // Pattern 2: B — E — B — E (G Major Bass)
  { barIndex: 4, note: 'B', octaveNote: 'B4', freq: 493.88, bassChord: 'G', bassName: 'G Maj Bass', patternIndex: 2, patternName: 'Pattern 2', title: 'Numeric Invariants' },
  { barIndex: 5, note: 'E', octaveNote: 'E5', freq: 659.25, patternIndex: 2, patternName: 'Pattern 2', title: 'OWLv2 Vision' },
  { barIndex: 6, note: 'B', octaveNote: 'B4', freq: 493.88, bassChord: 'G', bassName: 'G Maj Bass', patternIndex: 2, patternName: 'Pattern 2', title: 'Optical Flow Pose' },
  { barIndex: 7, note: 'E', octaveNote: 'E5', freq: 659.25, patternIndex: 2, patternName: 'Pattern 2', title: 'SSE Streaming' },

  // Pattern 3 & 4: C — E — D — E (F Major Bass)
  { barIndex: 8, note: 'C', octaveNote: 'C5', freq: 523.25, bassChord: 'F', bassName: 'F Maj Bass', patternIndex: 3, patternName: 'Pattern 3', title: 'MCP Protocol' },
  { barIndex: 9, note: 'E', octaveNote: 'E5', freq: 659.25, patternIndex: 3, patternName: 'Pattern 3', title: 'Cost Gating' },
  { barIndex: 10, note: 'D', octaveNote: 'D5', freq: 587.33, bassChord: 'F', bassName: 'F Maj Bass', patternIndex: 4, patternName: 'Pattern 4', title: 'Audit Trails' },
  { barIndex: 11, note: 'E', octaveNote: 'E5', freq: 659.25, patternIndex: 4, patternName: 'Pattern 4', title: 'AKS Cluster' },
];

export const sounds = new SoundManager();
