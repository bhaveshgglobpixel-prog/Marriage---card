// Royal Shehnai & Sitar Traditional Indian Wedding Audio Synth & Background Audio
class WeddingAudioController {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private melodyTimeout: any = null;

  play() {
    if (this.isPlaying) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.audioCtx || this.audioCtx.state === 'closed') {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isPlaying = true;
      this.playGentleRagaTheme();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      try {
        this.audioCtx.suspend();
      } catch {
        // safe fallback
      }
    }
  }

  // Plays a soft, celebratory classical Indian flute/sitar pentatonic drone
  private playGentleRagaTheme() {
    if (!this.isPlaying || !this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      // Traditional Yaman / Bilawal notes in Hz: Sa, Ga, Pa, Dha, Ni, Sa'
      const notes = [261.63, 329.63, 392.00, 440.00, 493.88, 523.25];
      const note = notes[Math.floor(Math.random() * notes.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.3);

      this.melodyTimeout = setTimeout(() => {
        this.playGentleRagaTheme();
      }, 1600 + Math.random() * 800);
    } catch {
      // safe fallback
    }
  }
}

export const weddingAudio = new WeddingAudioController();
