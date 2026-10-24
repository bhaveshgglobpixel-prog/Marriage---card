import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

interface DirectVideoIntroProps {
  onComplete: () => void;
}

export const DirectVideoIntro: React.FC<DirectVideoIntroProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video
        .play()
        .catch((err) => {
          console.log('Autoplay attempt:', err);
        });
    }

    // Safety fallback: if video doesn't end or errors within 6s, proceed to card
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#201518] overflow-hidden select-none">
      {/* Background ambient shade matching the royal monogram theme */}
      <div className="absolute inset-0 bg-radial from-[#381c25] via-[#201217] to-[#0f080b]" />

      {/* Video Container centered with luxury rounded border */}
      <div className="relative w-full max-w-[420px] aspect-[9/19.5] sm:max-h-[92vh] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#8a223e]/40 bg-black">
        <video
          ref={videoRef}
          src="/assets/aistudio/Dolce_Vita_Opening_Clean.mp4"
          autoPlay
          muted
          playsInline
          onEnded={onComplete}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />

        {/* Progress Bar at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-[#d4a34b] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Control Overlay */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white/90 flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Skip Button */}
          <button
            type="button"
            onClick={onComplete}
            className="flex items-center gap-1 py-1.5 px-3 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs hover:bg-black/60 transition-colors font-primary font-semibold cursor-pointer"
          >
            <span>Skip</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle Bottom Caption */}
        <div className="absolute bottom-5 left-0 right-0 text-center z-20 pointer-events-none">
          <span className="font-primary text-xs tracking-wider text-white/85 drop-shadow-sm uppercase">
            Opening Wedding Invitation...
          </span>
        </div>
      </div>
    </div>
  );
};
