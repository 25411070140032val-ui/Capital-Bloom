// Synthesized Web Audio API sound effects for Duolingo-like tactile feedback

class SoundEffects {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cb_sound_muted');
      this.muted = saved === 'true';
    }
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cb_sound_muted', String(this.muted));
    }
    return this.muted;
  }

  public playTap() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.055);
    } catch {
      // Ignore audio errors
    }
  }

  public playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [587.33, 880]; // D5 -> A5 cheerful Duolingo-like chime
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.12, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.24);
      });
    } catch {
      // Ignore
    }
  }

  public playError() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [311.13, 277.18]; // Eb4 -> C#4 soft low nudge
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.11);
        gain.gain.setValueAtTime(0.1, now + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.11);
        osc.stop(now + idx * 0.11 + 0.2);
      });
    } catch {
      // Ignore
    }
  }

  public playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.13, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  public playCelebration() {
    this.playFanfare();
  }

  public playWarmVoiceChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Soft warm acoustic marimba/harp triad (F4 - A4 - C5 -E5)
      const notes = [349.23, 440.0, 523.25, 659.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.055, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.48);
      });
    } catch {
      // Ignore
    }
  }

  // 100% Original Procedural Web Audio Synth: "Six Seven" Scale Bounce (Libre de Derechos)
  public playSixSevenEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 1. Punchy 808-style warm sub-bass kicks on the "6" and "7" hand drops
      const bassHits = [
        { freq: 110.0, time: 0.0, dur: 0.2 },
        { freq: 130.81, time: 0.24, dur: 0.24 },
        { freq: 110.0, time: 0.62, dur: 0.2 },
        { freq: 146.83, time: 0.86, dur: 0.28 },
      ];
      bassHits.forEach((b) => {
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(b.freq, now + b.time);
        sub.frequency.exponentialRampToValueAtTime(55.0, now + b.time + b.dur);
        subGain.gain.setValueAtTime(0.16, now + b.time);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + b.time + b.dur);
        sub.connect(subGain);
        subGain.connect(ctx.destination);
        sub.start(now + b.time);
        sub.stop(now + b.time + b.dur + 0.02);
      });

      // 2. Crisp vocal-cadence synth lead ("Six... Se-ven! / Six... Se-ven!")
      const steps = [
        { freq: 329.63, slide: 349.23, time: 0.0, dur: 0.17 }, // "Six" (Left palm down)
        { freq: 440.0, slide: 493.88, time: 0.24, dur: 0.15 }, // "Se-" (Right palm down)
        { freq: 392.0, slide: 392.0, time: 0.4, dur: 0.16 }, // "-ven"
        { freq: 329.63, slide: 349.23, time: 0.62, dur: 0.17 }, // "Six" (Left palm down)
        { freq: 523.25, slide: 587.33, time: 0.86, dur: 0.15 }, // "Se-" (Right palm down)
        { freq: 440.0, slide: 440.0, time: 1.02, dur: 0.22 }, // "-ven!"
      ];
      steps.forEach((s) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(s.freq, now + s.time);
        osc.frequency.exponentialRampToValueAtTime(s.slide, now + s.time + s.dur);
        gain.gain.setValueAtTime(0.14, now + s.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + s.time + s.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + s.time);
        osc.stop(now + s.time + s.dur + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // 100% Public-Domain Folk Cadence Synth: "Baile Ruso / Kazachok" (Dominio Público Tradicional)
  public playRussianDanceEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Traditional folk polka / hopak staccato arpeggio (A minor -> E7 -> A minor)
      const folkNotes = [
        { freq: 440.0, t: 0.0, d: 0.13 },
        { freq: 523.25, t: 0.15, d: 0.13 },
        { freq: 659.25, t: 0.3, d: 0.15 },
        { freq: 587.33, t: 0.48, d: 0.13 },
        { freq: 523.25, t: 0.63, d: 0.13 },
        { freq: 493.88, t: 0.78, d: 0.16 },
        { freq: 440.0, t: 0.96, d: 0.25 },
      ];
      folkNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.freq, now + n.t);
        gain.gain.setValueAtTime(0.09, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // 100% Original Procedural Drift Cowbell Synth: "Cara Phonk / Sigma Drift" (Creación Original)
  public playPhonkFaceEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Procedural 808-style synthesized cowbell (two detuned square oscillators at ~540Hz & ~800Hz motif)
      const pattern = [
        { root: 523.25, t: 0.0, d: 0.14 },
        { root: 523.25, t: 0.18, d: 0.14 },
        { root: 622.25, t: 0.36, d: 0.16 },
        { root: 587.33, t: 0.56, d: 0.14 },
        { root: 523.25, t: 0.74, d: 0.18 },
        { root: 466.16, t: 0.96, d: 0.25 },
      ];
      pattern.forEach((p) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'square';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(p.root, now + p.t);
        osc2.frequency.setValueAtTime(p.root * 1.48, now + p.t); // Metallic cowbell harmonic ratio

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(950, now + p.t);
        filter.Q.setValueAtTime(2.5, now + p.t);

        gain.gain.setValueAtTime(0.11, now + p.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + p.t + p.d);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now + p.t);
        osc2.start(now + p.t);
        osc1.stop(now + p.t + p.d + 0.02);
        osc2.stop(now + p.t + p.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // 100% Original Procedural Electro-Funk Synth: "Paso Floss / Swing de Cadera" (Libre de Derechos)
  public playFlossEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Snappy syncopated electro-funk synth groove (swish-swish-snap)
      const groove = [
        { freq: 392.0, t: 0.0, d: 0.12, type: 'triangle' as OscillatorType },
        { freq: 523.25, t: 0.15, d: 0.12, type: 'triangle' as OscillatorType },
        { freq: 659.25, t: 0.3, d: 0.16, type: 'sine' as OscillatorType },
        { freq: 587.33, t: 0.5, d: 0.12, type: 'triangle' as OscillatorType },
        { freq: 493.88, t: 0.65, d: 0.12, type: 'triangle' as OscillatorType },
        { freq: 523.25, t: 0.8, d: 0.22, type: 'sine' as OscillatorType },
      ];
      groove.forEach((g) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = g.type;
        osc.frequency.setValueAtTime(g.freq, now + g.t);
        osc.frequency.exponentialRampToValueAtTime(g.freq * 1.06, now + g.t + g.d);
        gain.gain.setValueAtTime(0.12, now + g.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + g.t + g.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + g.t);
        osc.stop(now + g.t + g.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // 100% Original Procedural Aura Synth: "Zorro Guapo · Batalla de Aura (+999K)" (Creación Original)
  public playHandsomeFoxAuraEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 1. Deep charismatic Aura Bass Impact
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(130.81, now); // C3
      subOsc.frequency.exponentialRampToValueAtTime(65.41, now + 0.65); // C2 sub drop
      subGain.gain.setValueAtTime(0.18, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.72);

      // 2. Shimmering "Handsome Glamour" Maj9 Arpeggio (F4 - A4 - C5 - E5 - G5 - A5)
      const sparkleNotes = [349.23, 440.0, 523.25, 659.25, 783.99, 880.0];
      sparkleNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const t = 0.12 + idx * 0.085;
        osc.frequency.setValueAtTime(freq, now + t);
        gain.gain.setValueAtTime(0.09, now + t);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + t + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.48);
      });
    } catch {
      // Ignore
    }
  }

  // Procedural Carnival Calliope Jig Synth: "Payaso Bailarín · Jig de Carnaval"
  public playClownJigEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 1. Rapid Circus Oom-Pah Tuba/Sub Bass Bounce (148 BPM)
      const bassSteps = [
        { freq: 110.0, t: 0.0, d: 0.11 }, // A2
        { freq: 164.81, t: 0.12, d: 0.09 }, // E3
        { freq: 110.0, t: 0.24, d: 0.11 }, // A2
        { freq: 164.81, t: 0.36, d: 0.09 }, // E3
        { freq: 116.54, t: 0.48, d: 0.11 }, // Bb2
        { freq: 164.81, t: 0.6, d: 0.09 }, // E3
        { freq: 110.0, t: 0.72, d: 0.16 }, // A2
      ];
      bassSteps.forEach((b) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(b.freq, now + b.t);
        gain.gain.setValueAtTime(0.16, now + b.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + b.t + b.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + b.t);
        osc.stop(now + b.t + b.d + 0.02);
      });

      // 2. Frantic Calliope / Accordion Jig Staccato Lead
      const jigNotes = [
        { freq: 440.0, t: 0.0, d: 0.09 }, // A4
        { freq: 523.25, t: 0.1, d: 0.09 }, // C5
        { freq: 659.25, t: 0.2, d: 0.09 }, // E5
        { freq: 622.25, t: 0.3, d: 0.09 }, // D#5
        { freq: 659.25, t: 0.4, d: 0.09 }, // E5
        { freq: 783.99, t: 0.5, d: 0.1 }, // G5
        { freq: 659.25, t: 0.61, d: 0.09 }, // E5
        { freq: 523.25, t: 0.71, d: 0.09 }, // C5
        { freq: 440.0, t: 0.81, d: 0.18 }, // A4
      ];
      jigNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(n.freq, now + n.t);
        gain.gain.setValueAtTime(0.065, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // Procedural Cumbia-Marimba Synth: "Elote Dorado Fiesta"
  public playEloteFiestaEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const tumbaoBass = [
        { freq: 130.81, t: 0.0, d: 0.14 },
        { freq: 164.81, t: 0.18, d: 0.14 },
        { freq: 196.0, t: 0.36, d: 0.16 },
        { freq: 130.81, t: 0.56, d: 0.14 },
        { freq: 196.0, t: 0.74, d: 0.2 },
      ];
      tumbaoBass.forEach((b) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(b.freq, now + b.t);
        gain.gain.setValueAtTime(0.16, now + b.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + b.t + b.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + b.t);
        osc.stop(now + b.t + b.d + 0.02);
      });

      const marimbaLead = [
        { freq: 523.25, t: 0.0, d: 0.12 },
        { freq: 659.25, t: 0.13, d: 0.12 },
        { freq: 783.99, t: 0.26, d: 0.14 },
        { freq: 880.0, t: 0.42, d: 0.14 },
        { freq: 783.99, t: 0.57, d: 0.12 },
        { freq: 659.25, t: 0.7, d: 0.12 },
        { freq: 1046.5, t: 0.84, d: 0.24 },
      ];
      marimbaLead.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, now + n.t);
        gain.gain.setValueAtTime(0.13, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // Procedural Trap Bounce Flute Synth: "Paso Griddy"
  public playGriddyStepEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const bounceNotes = [
        { freq: 587.33, t: 0.0, d: 0.13 },
        { freq: 698.46, t: 0.15, d: 0.13 },
        { freq: 880.0, t: 0.3, d: 0.15 },
        { freq: 783.99, t: 0.48, d: 0.13 },
        { freq: 698.46, t: 0.63, d: 0.13 },
        { freq: 587.33, t: 0.78, d: 0.22 },
      ];
      bounceNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, now + n.t);
        osc.frequency.exponentialRampToValueAtTime(n.freq * 1.03, now + n.t + n.d);
        gain.gain.setValueAtTime(0.13, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // Procedural Mariachi Brass Fanfare Synth: "Zapateado Mariachi Real"
  public playMariachiZapateadoEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const trumpetNotes = [
        { freq: 392.0, t: 0.0, d: 0.11 },
        { freq: 493.88, t: 0.12, d: 0.11 },
        { freq: 587.33, t: 0.24, d: 0.11 },
        { freq: 783.99, t: 0.36, d: 0.2 },
        { freq: 739.99, t: 0.58, d: 0.11 },
        { freq: 783.99, t: 0.71, d: 0.28 },
      ];
      trumpetNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.freq, now + n.t);
        gain.gain.setValueAtTime(0.085, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  // Procedural Retro Synthwave Bassline: "Moonwalk Astral"
  public playMoonwalkGlideEmote() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const glideNotes = [
        { freq: 185.0, t: 0.0, d: 0.14 },
        { freq: 277.18, t: 0.16, d: 0.14 },
        { freq: 329.63, t: 0.32, d: 0.14 },
        { freq: 369.99, t: 0.48, d: 0.14 },
        { freq: 329.63, t: 0.64, d: 0.14 },
        { freq: 277.18, t: 0.8, d: 0.2 },
      ];
      glideNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, now + n.t);
        gain.gain.setValueAtTime(0.15, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundFX = new SoundEffects();


