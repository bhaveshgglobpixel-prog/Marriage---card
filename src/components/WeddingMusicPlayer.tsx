import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Shuffle, SkipBack, SkipForward, Repeat, Music2 } from 'lucide-react';
import { weddingAudio } from '../utils/weddingAudio';

export const WeddingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(32);

  useEffect(() => {
    const unsub = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
      setIsMuted(weddingAudio.getIsMuted());
    });
    return unsub;
  }, []);

  // Subtle progress bar animation while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    weddingAudio.toggle();
  };

  const toggleMute = () => {
    weddingAudio.toggleMute();
  };

  return (
    <div className="py-8 px-6 bg-[#fbf8f5] text-center border-t border-[#ebdcd2] select-none">
      {/* Kicker */}
      <span className="text-[10px] tracking-[0.25em] font-primary uppercase text-[#A24F61] font-bold block mb-1">
        CELEBRATORY MELODIES
      </span>

      {/* Heading matching image_42db3aa2.png */}
      <h3 className="font-script text-4xl sm:text-5xl text-[#A24F61] font-normal my-1 tracking-wide">
        Play Our Wedding Song
      </h3>

      <p className="font-description text-xs text-[#6e3745] max-w-[280px] mx-auto mb-5 leading-relaxed">
        Auspicious Shehnai &amp; Sitar Harmony · Shubh Vivah
      </p>

      {/* Main Music Player Card (Inspired by user's screenshot image_42db3aa2.png) */}
      <div className="max-w-[340px] mx-auto bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-[#e8ccd3] shadow-sm">
        {/* Animated Sound Wave Equalizer Bars */}
        <div className="flex items-center justify-center gap-1.5 h-8 mb-4">
          {[12, 24, 18, 30, 16, 26, 20, 28, 14, 22].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-[#A24F61] animate-pulse' : 'bg-[#e8ccd3]'
              }`}
              style={{
                height: isPlaying ? `${Math.max(8, (h * (progress % 10 + 5)) / 10)}px` : '6px',
                animationDelay: `${i * 120}ms`,
              }}
            />
          ))}
        </div>

        {/* Media Control Buttons (Matching screenshot image_42db3aa2.png) */}
        <div className="flex items-center justify-center gap-5 sm:gap-6 my-2">
          {/* Shuffle */}
          <button
            type="button"
            className="text-[#966370] hover:text-[#A24F61] transition-colors cursor-pointer"
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={() => setProgress(0)}
            className="text-[#966370] hover:text-[#A24F61] transition-colors cursor-pointer"
            title="Previous"
          >
            <SkipBack className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Large Center Play / Pause Button in Theme #A24F61 */}
          <button
            type="button"
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#A24F61] hover:bg-[#8e3f51] text-white flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer group"
            title={isPlaying ? 'Pause Wedding Music' : 'Play Wedding Music'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white stroke-none" />
            ) : (
              <Play className="w-6 h-6 fill-white stroke-none ml-1 group-hover:scale-105 transition-transform" />
            )}
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() => setProgress(0)}
            className="text-[#966370] hover:text-[#A24F61] transition-colors cursor-pointer"
            title="Next"
          >
            <SkipForward className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Repeat */}
          <button
            type="button"
            className="text-[#966370] hover:text-[#A24F61] transition-colors cursor-pointer"
            title="Repeat"
          >
            <Repeat className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>

        {/* Progress Track */}
        <div className="mt-4 px-2">
          <div className="w-full h-1.5 bg-[#faeff2] rounded-full overflow-hidden border border-[#ebd0d6]">
            <div
              className="h-full bg-[#A24F61] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[#8c4959] font-primary mt-1.5 font-medium">
            <span>{isPlaying ? 'Playing Auspicious Vivah Melody' : 'Tap play to listen'}</span>
            <button
              type="button"
              onClick={toggleMute}
              className="hover:text-[#A24F61] flex items-center gap-1 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Muted' : 'Sound'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Quick Music Controller Button (Sticks to top-right/bottom-right for uninterrupted listening)
export const FloatingMusicButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(() => weddingAudio.getIsPlaying());

  useEffect(() => {
    return weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  return (
    <button
      type="button"
      onClick={() => weddingAudio.toggle()}
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#A24F61] hover:bg-[#8e3f51] text-white shadow-xl border-2 border-white/80 transition-all active:scale-95 cursor-pointer backdrop-blur-md no-print"
      title={isPlaying ? 'Pause Wedding Shehnai' : 'Play Wedding Shehnai Music'}
    >
      <div className="relative flex items-center justify-center">
        <Music2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-[#fde68a]' : 'text-white'}`} />
      </div>
      <span className="font-primary text-xs font-bold tracking-wide">
        {isPlaying ? 'Music: Playing 🎵' : 'Play Music 🎶'}
      </span>
      {/* Live Equalizer indicator when playing */}
      {isPlaying && (
        <span className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 bg-[#fde68a] h-3 animate-pulse" />
          <span className="w-0.5 bg-[#fde68a] h-1.5 animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 bg-[#fde68a] h-2.5 animate-pulse" style={{ animationDelay: '300ms' }} />
        </span>
      )}
    </button>
  );
};
