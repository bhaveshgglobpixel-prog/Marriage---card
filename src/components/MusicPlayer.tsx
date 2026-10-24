import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Play an ethereal Indian wedding ambient melody (Raga Yaman / Bhupali chordal notes: Sa, Ga, Pa, Dha, Ni)
  const notes = [
    220.0, // A3 (Sa)
    246.94, // B3 (Re)
    277.18, // C#4 (Ga)
    329.63, // E4 (Pa)
    369.99, // F#4 (Dha)
    440.0, // A4 (High Sa)
    493.88, // B4
    554.37, // C#5
  ];

  const playMelodicPluck = (ctx: AudioContext, masterGain: GainNode, freq: number, duration = 3.5) => {
    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Sitar-like warm harmonic
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low pass filter for soft organic acoustics
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.2, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // safe fallback
    }
  };

  const startAmbientMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.22, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Play soft initial chord
      playMelodicPluck(ctx, masterGain, notes[0], 5);
      playMelodicPluck(ctx, masterGain, notes[2], 5);
      playMelodicPluck(ctx, masterGain, notes[3], 5);

      let step = 0;
      const sequence = [0, 2, 3, 4, 3, 2, 5, 4, 2, 0, 3, 5];

      intervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current) return;
        const currentNote = notes[sequence[step % sequence.length]];
        playMelodicPluck(ctx, masterGain, currentNote, 4);

        if (step % 4 === 0) {
          // Play deep resonant drone note (Tanpura Sa)
          playMelodicPluck(ctx, masterGain, notes[0] / 2, 6);
        }

        step++;
      }, 1600);

      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio initialization restricted', err);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startAmbientMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      title={isPlaying ? 'Mute royal wedding melody' : 'Play royal wedding melody'}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#fdf9f0]/95 border border-[#c49a45] shadow-[0_6px_20px_rgba(180,140,70,0.3)] text-[#6c4819] hover:bg-[#faeed6] transition-all duration-300 hover:scale-105 active:scale-95 group backdrop-blur-md"
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isPlaying ? 'bg-[#c49a45] text-white animate-pulse' : 'bg-[#f4e2be] text-[#875d27]'}`}>
        {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      </div>
      <span className="text-xs font-serif font-medium tracking-wide pr-1">
        {isPlaying ? 'Royal Melody' : 'Play Music'}
      </span>
      {isPlaying && (
        <span className="flex items-center gap-0.5">
          <span className="w-1 h-3 bg-[#c49a45] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-4 bg-[#c49a45] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-2 bg-[#c49a45] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      )}
    </button>
  );
};
