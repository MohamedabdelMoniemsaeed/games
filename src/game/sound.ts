// Web Audio API synthesized sound effects
let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  try {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended' && !document.hidden) {
      audioCtx.resume();
    }
  } catch (_) {}
  return audioCtx;
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend().catch(() => {});
    } else if (!document.hidden && audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  });
}

export type SoundEffect =
  | 'plant'
  | 'water'
  | 'harvest'
  | 'coin'
  | 'error'
  | 'levelup'
  | 'feed'
  | 'collect'
  | 'moo'
  | 'cluck'
  | 'baa'
  | 'birds'
  | 'rain_ambient';

export function playSound(
  name: SoundEffect,
  soundOn: boolean = true
) {
  if (!soundOn) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    switch (name) {
      case 'plant': {
        // Soft thump: low pitch dropping rapidly
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }

      case 'water': {
        // Water splash: filtered noise burst
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(400, now + 0.2);
        filter.Q.value = 3.0;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.2);
        break;
      }

      case 'harvest': {
        // Rising arpeggio: C5 (523), E5 (659), G5 (784), C6 (1046)
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.12, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.15);
        });
        break;
      }

      case 'coin': {
        // Two bright notes: B5 (987.77) -> E6 (1318.51)
        [
          { freq: 987.77, delay: 0 },
          { freq: 1318.51, delay: 0.08 },
        ].forEach(({ freq, delay }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + delay);
          gain.gain.setValueAtTime(0.15, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.2);
        });
        break;
      }

      case 'error': {
        // Low beep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        break;
      }

      case 'levelup': {
        // Celebratory arpeggio: C4, E4, G4, C5, E5, G5, C6
        const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.15, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.25);
        });
        break;
      }

      case 'feed': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }

      case 'collect': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      case 'moo': {
        // Realistic cow moo: dual-formant resonant low-frequency tone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(130, now);
        osc1.frequency.exponentialRampToValueAtTime(105, now + 0.65);
        osc2.frequency.setValueAtTime(132, now);
        osc2.frequency.exponentialRampToValueAtTime(102, now + 0.65);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, now);
        filter.frequency.linearRampToValueAtTime(260, now + 0.65);
        filter.Q.value = 4.0;

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.22, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.7);
        osc2.stop(now + 0.7);
        break;
      }

      case 'cluck': {
        // Realistic double cluck for chickens
        [0, 0.11].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(420, now + delay);
          osc.frequency.exponentialRampToValueAtTime(240, now + delay + 0.08);
          gain.gain.setValueAtTime(0.18, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        });
        break;
      }

      case 'baa': {
        // Realistic sheep baa with gentle vibrato (LFO)
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(230, now);
        osc.frequency.exponentialRampToValueAtTime(195, now + 0.45);

        // 12Hz tremolo/vibrato
        lfo.frequency.setValueAtTime(12, now);
        lfoGain.gain.setValueAtTime(18, now);
        lfo.connect(osc.frequency);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.16, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 0.5);
        osc.stop(now + 0.5);
        break;
      }

      case 'birds': {
        // Morning songbird chirps
        [0, 0.08, 0.22, 0.3].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const baseFreq = idx % 2 === 0 ? 3200 : 3800;
          osc.frequency.setValueAtTime(baseFreq, now + delay);
          osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + delay + 0.05);
          gain.gain.setValueAtTime(0.07, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.005, now + delay + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.05);
        });
        break;
      }

      case 'rain_ambient': {
        // Soothing gentle rain drop flurry
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.4);
        break;
      }
    }
  } catch (_) {}
}
