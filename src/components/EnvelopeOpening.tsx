import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeOpeningProps {
  onOpened: () => void;
  groomName: string;
  brideName: string;
  primaryGreen?: string;
  accentGold?: string;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  onOpened,
  groomName,
  brideName,
  primaryGreen = '#1b4332',
  accentGold = '#c59b27',
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Golden & emerald sparkle celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.55 },
        colors: [accentGold, '#e5c568', primaryGreen, '#ffffff', '#ffd700'],
      });
    } catch {
      // safe fallback
    }

    // Attempt video playback if available
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => {
          setVideoStarted(true);
        })
        .catch(() => {
          // If video autoplay is restricted or fails, fallback to timer
        });
    }

    // Complete transition after envelope opening animation
    setTimeout(() => {
      onOpened();
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1a14] overflow-hidden select-none">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-radial from-[#1b4332]/30 via-[#0d1a14] to-[#070e0a]" />

      {/* Video layer if browser supports it */}
      <div className="relative w-full max-w-[420px] aspect-[9/19.5] sm:max-h-[88vh] rounded-3xl overflow-hidden shadow-2xl border border-[#2d5a44]/50 bg-[#f7f5f0] flex items-center justify-center">
        
        {/* Actual Dolce Vita Opening Video */}
        <video
          ref={videoRef}
          src="/assets/aistudio/Dolce_Vita___Mobile_envelope_opening_1cb1fab9.mp4"
          playsInline
          muted
          preload="auto"
          onEnded={onOpened}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoStarted ? 'opacity-100 z-20' : 'opacity-0 -z-10'
          }`}
        />

        {/* Interactive Envelope Cover (Shown first: exact replica of video frame 0) */}
        {!videoStarted && (
          <div
            onClick={handleOpen}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-pointer group bg-[#f5f4ef]"
            style={{
              backgroundImage: `radial-gradient(#00000006 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          >
            {/* Envelope Triangular Fold Lines Simulation */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Flap Triangle */}
              <div
                className={`absolute top-0 left-0 right-0 h-[48%] bg-[#f9f8f4] border-b border-[#e2dfd5] shadow-xs origin-top transition-transform duration-1000 ${
                  isOpening ? '-rotate-x-180 opacity-0' : 'rotate-x-0'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />

              {/* Side & Bottom Flap Creases */}
              <div
                className="absolute inset-0 border border-[#e6e2d8]"
                style={{
                  clipPath: 'polygon(0 0, 50% 48%, 100% 0, 100% 100%, 0 100%)',
                }}
              />
            </div>

            {/* Couple Name Tag on Envelope */}
            <div className="absolute top-16 text-center z-10 transition-opacity duration-500">
              <span className="text-[10px] tracking-[0.25em] font-royal uppercase text-[#627a6d] font-semibold">
                Royal Wedding Invitation
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#142e22] mt-1">
                {groomName} &amp; {brideName}
              </h2>
            </div>

            {/* Wax Seal Medallion with Heart Accent */}
            <div className="relative z-20 flex flex-col items-center transform transition-transform duration-300 group-hover:scale-105 active:scale-95">
              <div
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center relative shadow-[0_8px_25px_rgba(197,155,39,0.45)] border border-[#f3dfa2]"
                style={{
                  background:
                    'radial-gradient(circle at 35% 35%, #f6df9d 0%, #d8ad47 50%, #b28525 100%)',
                }}
              >
                {/* Wax seal outer rim texture */}
                <div className="absolute inset-1 rounded-full border-2 border-[#946b14]/30" />

                {/* Embossed Heart */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="#785309"
                  className="filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] opacity-90"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>

                {/* Shimmer pulse effect */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#f4d06f]" />
              </div>

              {/* "Click to open" prompt below seal (matches reference video) */}
              <div className="mt-5 flex flex-col items-center">
                <span className="font-classic text-sm sm:text-base italic text-[#4a7260] tracking-wide group-hover:text-[#1b4332] transition-colors">
                  {isOpening ? 'Opening invitation...' : 'Click to open'}
                </span>
                <span className="w-8 h-[1px] bg-[#4a7260]/40 mt-1.5 group-hover:w-12 transition-all" />
              </div>
            </div>

            {/* Skip directly to card button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpened();
              }}
              className="absolute bottom-6 text-[11px] font-sans text-[#789686] hover:text-[#1b4332] underline underline-offset-4 transition-colors z-20"
            >
              Skip intro &amp; view card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
