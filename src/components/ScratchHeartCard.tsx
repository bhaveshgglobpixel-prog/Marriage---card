import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Hand } from 'lucide-react';

interface ScratchHeartCardProps {
  weddingDateText?: string;
  dayText?: string;
  subText?: string;
}

export const ScratchHeartCard: React.FC<ScratchHeartCardProps> = ({
  weddingDateText = '16 December 2026',
  dayText = 'Wednesday',
  subText = 'Shubh Vivah',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [isAutoScratching, setIsAutoScratching] = useState(false);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const [scratchedPct, setScratchedPct] = useState(0);
  const isRevealedRef = useRef(false);
  const hasStartedScratchingRef = useRef(false);
  const triggeredRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Standard classic heart dimensions
  const WIDTH = 260;
  const HEIGHT = 240;

  // Trigger celebration confetti
  const triggerCelebration = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setIsAutoScratching(false);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } catch {
          // safe fallback
        }
      }
    }

    try {
      // Grand celebratory explosion
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#A24F61', '#c48e35', '#f3dfa2', '#ffffff', '#e5c568'],
      });
    } catch {
      // safe fallback
    }
  }, []);

  // Auto-reveal ONLY when the card actually reaches the top of the screen (rect.top <= 70)
  // Until it reaches the top, the user can manually scratch it freely with their finger
  useEffect(() => {
    if (isRevealed) return;
    const element = containerRef.current;
    if (!element) return;

    const checkTopAndReveal = () => {
      if (isRevealedRef.current || triggeredRef.current) return;
      const rect = element.getBoundingClientRect();
      // Only when the card scrolls all the way up to the top of the viewport
      if (rect.top <= 70 && rect.bottom >= 80) {
        triggeredRef.current = true;
        triggerCelebration();
      }
    };

    window.addEventListener('scroll', checkTopAndReveal, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkTopAndReveal);
    };
  }, [isRevealed, triggerCelebration]);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Heart Path
    const drawHeartPath = () => {
      ctx.beginPath();
      // SVG path coordinates scaled to 260x240:
      // M130 76.8 C130 19.2 15.6 19.2 15.6 76.8 C15.6 139.2 83.2 196.8 130 235.2 C176.8 196.8 244.4 139.2 244.4 76.8 C244.4 19.2 130 19.2 130 76.8 Z
      ctx.moveTo(130, 76.8);
      ctx.bezierCurveTo(130, 19.2, 15.6, 19.2, 15.6, 76.8);
      ctx.bezierCurveTo(15.6, 139.2, 83.2, 196.8, 130, 235.2);
      ctx.bezierCurveTo(176.8, 196.8, 244.4, 139.2, 244.4, 76.8);
      ctx.bezierCurveTo(244.4, 19.2, 130, 19.2, 130, 76.8);
      ctx.closePath();
    };

    ctx.save();
    drawHeartPath();
    ctx.clip();

    // Metallic Gold Foil Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    goldGrad.addColorStop(0, '#e8be66');
    goldGrad.addColorStop(0.25, '#fff2b2');
    goldGrad.addColorStop(0.5, '#c99335');
    goldGrad.addColorStop(0.75, '#fae19c');
    goldGrad.addColorStop(1, '#ab7722');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Text on foil
    ctx.fillStyle = '#6b450c';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE ✨', WIDTH / 2, HEIGHT / 2 + 10);
    ctx.font = 'italic 11px "Cormorant Garamond", serif';
    ctx.fillText('Tap or rub to reveal the date', WIDTH / 2, HEIGHT / 2 + 28);

    ctx.restore();
  }, []);

  // Scratch handler
  const scratch = (clientX: number, clientY: number) => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    if (!hasStartedScratchingRef.current) {
      hasStartedScratchingRef.current = true;
      setHasStartedScratching(true);
    }

    setScratchedPct((prev) => {
      const next = prev + 12;
      if (next >= 40 && !triggeredRef.current) {
        triggeredRef.current = true;
        triggerCelebration();
      }
      return next;
    });
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleTouchStart = () => setIsScratching(true);
  const handleTouchEnd = () => setIsScratching(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div ref={containerRef} className="py-4 text-center font-description">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faeff2] text-[#A24F61] text-[10px] tracking-[0.25em] font-primary uppercase font-bold mb-3 shadow-xs">
        <Heart className="w-3 h-3 fill-[#A24F61] text-[#A24F61]" />
        <span>Save The Date</span>
      </div>

      <h3 className="font-script text-4xl sm:text-5xl text-[#A24F61] font-normal my-1">
        Scratch to Reveal
      </h3>

      <p className="font-description text-xs text-[#7d3d4b] max-w-[320px] mx-auto mb-4 leading-relaxed">
        Rub the royal gold heart or tap below to unveil<br />the wedding date
      </p>

      {/* ================= PHYSICAL SCRATCH-OFF CARD CONTAINER ================= */}
      <div ref={cardWrapperRef} className="relative mx-auto w-[260px] h-[240px] flex items-center justify-center select-none group">
        
        {/* UNDERNEATH LAYER: Only the Wedding Date (16 December 2026) perfectly centered within the heart cavity */}
        <div
          className="absolute inset-0 bg-[#fffdfa] shadow-md border-2 border-[#e8ccd3] transition-all select-none"
          style={{
            clipPath:
              'path("M130 76.8 C130 19.2 15.6 19.2 15.6 76.8 C15.6 139.2 83.2 196.8 130 235.2 C176.8 196.8 244.4 139.2 244.4 76.8 C244.4 19.2 130 19.2 130 76.8 Z")',
          }}
        >
          {/* Inner Golden Area: Lifted slightly higher into the wide portion of the heart cavity so text never touches the converging border lines */}
          <div className="absolute inset-x-0 top-[58px] bottom-[34px] flex flex-col items-center justify-center text-center px-4">
            {/* Shubh Vivah with golden decorative accents */}
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-3 h-[1px] bg-[#c48e35]" />
              <span className="text-[9.5px] sm:text-[10px] tracking-[0.24em] font-cinzel uppercase font-bold text-[#b57d2a]">
                SHUBH VIVAH
              </span>
              <span className="w-3 h-[1px] bg-[#c48e35]" />
            </div>

            {/* Date Number: 16 (Auspicious Wedding Day) */}
            <div className="flex items-baseline justify-center font-cinzel font-bold text-[#A24F61] leading-none drop-shadow-[0_1px_1px_rgba(162,79,97,0.18)] my-0.5">
              <span className="text-[42px] sm:text-[45px] tracking-tight">16</span>
            </div>

            {/* Month with Regal Letter Spacing - Safe within stitch borders */}
            <span className="font-cinzel text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#1e293b] mt-0.5 block">
              DECEMBER
            </span>

            {/* Auspicious Year: Only 2026 */}
            <div className="flex items-center justify-center mt-0.5">
              <span className="font-cinzel text-[10px] sm:text-[10.5px] font-bold text-[#b57d2a] tracking-[0.22em]">
                2026
              </span>
            </div>
          </div>
        </div>

        {/* TOP LAYER: Real Gold Metallic Foil Scratch Canvas */}
        <canvas
          ref={canvasRef}
          onClick={triggerCelebration}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-[260px] h-[240px] cursor-grab active:cursor-grabbing transition-opacity duration-700 z-10 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ touchAction: 'pan-y' }}
        />

        {/* PROPER CRISP DIE-CUT METALLIC BORDER FRAMING THE HEART PERMANENTLY */}
        <svg
          viewBox="0 0 260 240"
          className="absolute inset-0 w-[260px] h-[240px] pointer-events-none z-20 overflow-visible"
        >
          <defs>
            <filter id="realHeartShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#70122b" floodOpacity="0.22" />
            </filter>
            <linearGradient id="realGoldBorder" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5dfa8" />
              <stop offset="30%" stopColor="#d4a34b" />
              <stop offset="70%" stopColor="#A24F61" />
              <stop offset="100%" stopColor="#f9df88" />
            </linearGradient>
          </defs>

          {/* Primary Crisp Outer Border */}
          <path
            d="M130 76.8 C130 19.2 15.6 19.2 15.6 76.8 C15.6 139.2 83.2 196.8 130 235.2 C176.8 196.8 244.4 139.2 244.4 76.8 C244.4 19.2 130 19.2 130 76.8 Z"
            fill="none"
            stroke="url(#realGoldBorder)"
            strokeWidth="3.2"
            strokeLinejoin="round"
            filter="url(#realHeartShadow)"
          />

          {/* Inner Golden Hairline Stitch */}
          <path
            d="M130 80.8 C130 25.2 21.6 25.2 21.6 76.8 C21.6 135.2 85.2 190.8 130 228.2 C174.8 190.8 238.4 135.2 238.4 76.8 C238.4 25.2 130 25.2 130 80.8 Z"
            fill="none"
            stroke="#fde68a"
            strokeWidth="1.2"
            strokeDasharray="4 2.5"
            opacity="0.85"
          />
        </svg>

        {/* Gentle Pulsing Hand Touch Hint */}
        {!hasStartedScratching && !isRevealed && !isAutoScratching && (
          <div className="absolute -bottom-3 z-30 pointer-events-none animate-bounce flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#A24F61] text-white text-[10px] font-primary font-bold shadow-lg border border-white">
            <Hand className="w-3 h-3 text-[#fde68a]" />
            <span>Rub or tap to scratch &amp; reveal</span>
          </div>
        )}
      </div>

      {/* Action / Reveal status */}
      <div className="mt-5">
        {isRevealed ? (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#A24F61] text-white text-xs font-primary font-bold shadow-md animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-[#fde68a]" />
            <span>Date Revealed: 16 December 2026!</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={triggerCelebration}
            className="text-xs text-[#A24F61] hover:text-[#803546] underline underline-offset-4 font-description transition-colors cursor-pointer font-medium"
          >
            Reveal date directly
          </button>
        )}
      </div>
    </div>
  );
};
