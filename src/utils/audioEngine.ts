/**
 * Web Audio API Sound Synthesizer & Audio Engine
 * Generates rich fairytale sound effects and romantic ambient synth music.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private soundEnabled: boolean = true;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private currentNoteIndex: number = 0;

  constructor() {
    // Lazy init audio context on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.soundEnabled = !muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
  }

  public isMuted(): boolean {
    return !this.soundEnabled;
  }

  // Sound Effect: Button Click / Soft Bubble
  public playClick() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Sound Effect: Magic Wand / Star Collect
  public playStarCollect() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    
    freqs.forEach((f, index) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + index * 0.04);

      gain.gain.setValueAtTime(0.2, now + index * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.04 + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + index * 0.04);
      osc.stop(now + index * 0.04 + 0.2);
    });
  }

  // Sound Effect: Key Unlock / Victory Chime
  public playKeyUnlocked() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98]; // C, E, G, B, C, E, G

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.25, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.4);
    });
  }

  // Sound Effect: Gift Box Pop & Celebration
  public playGiftOpen() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Pop / Woosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(now + 0.3);

    // Followed by glitter harp sweep
    setTimeout(() => {
      this.playKeyUnlocked();
    }, 150);
  }

  // Sound Effect: Firework Launch & Boom
  public playFirework() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Whistle up
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.3);

    // Boom after whistle
    setTimeout(() => {
      if (!this.ctx || !this.masterGain || !this.soundEnabled) return;
      const bNow = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, bNow);
      filter.frequency.exponentialRampToValueAtTime(40, bNow + 0.5);

      const bGain = this.ctx.createGain();
      bGain.gain.setValueAtTime(0.4, bNow);
      bGain.gain.exponentialRampToValueAtTime(0.001, bNow + 0.5);

      noise.connect(filter);
      filter.connect(bGain);
      bGain.connect(this.masterGain);

      noise.start(bNow);
      noise.stop(bNow + 0.5);
    }, 280);
  }

  // Sound Effect: Blow Candles (Puff sound)
  public playCandleBlow() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.6);
  }

  // Ambient Romantic Music Synthesizer (Generates endless fairytale lullaby chords)
  public startSynthBgm() {
    if (this.isBgmPlaying) return;
    this.initCtx();
    this.isBgmPlaying = true;

    // Dreamy pentatonic/fairytale scale chords (C Major 7, A Minor 7, F Major 7, G Major 7)
    const melodyNotes = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G7
    ];

    const arpeggio = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];

    this.currentNoteIndex = 0;

    this.bgmInterval = window.setInterval(() => {
      if (!this.soundEnabled || !this.ctx || !this.bgmGain) return;

      const now = this.ctx.currentTime;
      const chordIdx = Math.floor(this.currentNoteIndex / 8) % melodyNotes.length;
      const chord = melodyNotes[chordIdx];
      
      // Play soft pad chord on beat 0
      if (this.currentNoteIndex % 8 === 0) {
        chord.forEach((freq) => {
          if (!this.ctx || !this.bgmGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.05, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

          osc.connect(gain);
          gain.connect(this.bgmGain);

          osc.start(now);
          osc.stop(now + 2.2);
        });
      }

      // Play soft bell arpeggio note
      const arpFreq = arpeggio[this.currentNoteIndex % arpeggio.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(arpFreq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + 0.6);

      this.currentNoteIndex++;
    }, 320);
  }

  public stopSynthBgm() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isBgmPlaying = false;
  }
}

export const audioEngine = new AudioEngine();
