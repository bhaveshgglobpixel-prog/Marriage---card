import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Hand } from 'lucide-react';

interface ScratchHeartCardProps {
  weddingDateText?: string;
  dayText?: string;
  subText?: string;
}

export const ScratchHeartCard: React.FC<ScratchHeartCardProps> = ({
  weddingDateText = '15 & 16 December 2026',
  dayText = 'Monday & Tuesday',
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
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#A24F61', '#d4a34b', '#f9df88', '#ffffff', '#e59b2c', '#c43c5d'],
      });

      // Follow-up sparkle burst
      setTimeout(() => {
        try {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0.2, y: 0.65 },
            colors: ['#A24F61', '#f9df88', '#d4a44d'],
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 0.8, y: 0.65 },
            colors: ['#A24F61', '#f9df88', '#d4a44d'],
          });
        } catch {
          // safe fallback
        }
      }, 250);
    } catch {
      // safe fallback
    }
  }, []);

  // Natural classic symmetrical heart path helper
  const drawHeartPath = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.beginPath();
    const topY = h * 0.32;
    ctx.moveTo(w / 2, topY);
    // Left lobe
    ctx.bezierCurveTo(w / 2, 0.08 * h, 0.06 * w, 0.08 * h, 0.06 * w, topY);
    // Left side down to bottom tip
    ctx.bezierCurveTo(0.06 * w, 0.58 * h, 0.32 * w, 0.82 * h, w / 2, 0.98 * h);
    // Right side up from bottom tip
    ctx.bezierCurveTo(0.68 * w, 0.82 * h, 0.94 * w, 0.58 * h, 0.94 * w, topY);
    // Right lobe
    ctx.bezierCurveTo(0.94 * w, 0.08 * h, w / 2, 0.08 * h, w / 2, topY);
    ctx.closePath();
  };

  // Render authentic realistic metallic gold scratch-off latex foil
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx.save();

    // 1. Clip exactly to classic heart shape
    drawHeartPath(ctx, WIDTH, HEIGHT);
    ctx.clip();

    // 2. Realistic Luxury Brushed Metallic Gold & Rose Gold Foil Base
    const foilGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    foilGrad.addColorStop(0, '#e8be72');
    foilGrad.addColorStop(0.25, '#d4a44d');
    foilGrad.addColorStop(0.5, '#f5dfa2'); // metallic specular highlight
    foilGrad.addColorStop(0.75, '#c9963f');
    foilGrad.addColorStop(1, '#b57f2e');
    ctx.fillStyle = foilGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 3. Realistic Fine Brushed Metallic Sheen (Horizontal microscopic lines like real foil stamp)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let y = 0; y < HEIGHT; y += 2) {
      if (y % 4 === 0) {
        ctx.fillRect(0, y, WIDTH, 1);
      }
    }

    // 4. Subtle Diagonal Specular Reflection (Authentic metallic luster)
    const shine = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    shine.addColorStop(0, 'rgba(255, 255, 255, 0)');
    shine.addColorStop(0.42, 'rgba(255, 255, 255, 0.12)');
    shine.addColorStop(0.5, 'rgba(255, 255, 255, 0.38)');
    shine.addColorStop(0.58, 'rgba(255, 255, 255, 0.12)');
    shine.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 5. Embossed Inner Filigree Border on the foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.8;
    ctx.save();
    ctx.scale(0.92, 0.92);
    ctx.translate(WIDTH * 0.043, HEIGHT * 0.043);
    drawHeartPath(ctx, WIDTH, HEIGHT);
    ctx.stroke();
    ctx.restore();

    // 6. Realistic Embossed Text on Foil: Royal Serif & Positioned Lower
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Embossed shadow
    ctx.fillStyle = 'rgba(110, 70, 18, 0.6)';
    ctx.font = 'bold 11px "Cinzel", "DM Sans", serif';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', WIDTH / 2, HEIGHT * 0.54 + 1);

    // Embossed highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', WIDTH / 2, HEIGHT * 0.54);

    // Subtext on foil
    ctx.font = '600 9.5px "Inter", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(92, 56, 12, 0.8)';
    ctx.fillText('Touch & rub to reveal date', WIDTH / 2, HEIGHT * 0.64);

    ctx.restore();

    ctx.restore();
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Track scratched area percentage
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Sample a grid in the center heart region
      const sampleW = 100;
      const sampleH = 80;
      const startX = Math.floor((WIDTH - sampleW) / 2);
      const startY = Math.floor(HEIGHT * 0.35);

      const imgData = ctx.getImageData(startX, startY, sampleW, sampleH);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 40) {
          transparentCount++;
        }
      }

      const ratio = transparentCount / totalPixels;
      setScratchedPct(Math.round(ratio * 100));

      // Once 35% of the central region is scratched, smoothly complete reveal
      if (ratio > 0.35) {
        triggerCelebration();
      }
    } catch {
      // safe fallback
    }
  }, [triggerCelebration]);

  // Scratch action
  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealedRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      const y = (clientY - rect.top) * (canvas.height / rect.height);

      if (!hasStartedScratching) setHasStartedScratching(true);

      ctx.save();
      // 'destination-out' erases the foil cleanly like a real coin scratching latex
      ctx.globalCompositeOperation = 'destination-out';

      // Realistic soft scratch brush
      const brushRadius = 24;
      const grad = ctx.createRadialGradient(x, y, brushRadius * 0.4, x, y, brushRadius);
      grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.95)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();

      // Add a couple of scratch texture scratches
      for (let s = 0; s < 2; s++) {
        const ox = (Math.random() - 0.5) * 16;
        const oy = (Math.random() - 0.5) * 16;
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, brushRadius * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      checkScratchPercentage();
    },
    [checkScratchPercentage, hasStartedScratching]
  );



  // Automatic scratch detection:
  // Strictly triggers ONLY when scrolling brings the heart card to the top of the viewport
  // ("scroling me top pe pahuche tab auto ho jana chahea, baki mannual ok")
  // In the middle or bottom of the screen, it stays completely manual!
  useEffect(() => {
    if (isRevealed) return;
    const cardEl = cardWrapperRef.current;
    if (!cardEl) return;

    const checkTopPosition = () => {
      if (triggeredRef.current || isRevealedRef.current) return;
      const card = cardWrapperRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();

      // STRICTLY TOP OF SCREEN:
      // Only trigger when the top of the heart card reaches the very top of the viewport (rect.top <= 50px).
      // Center or middle of screen (rect.top > 50px) will NEVER trigger automatically.
      if (rect.top <= 50 && rect.bottom >= 100) {
        triggeredRef.current = true;
        triggerCelebration();
      }
    };

    // Check initially in case page loaded scrolled right at the top of the card
    checkTopPosition();

    // Listen on window and document scroll/touchmove
    window.addEventListener('scroll', checkTopPosition, { passive: true });
    window.addEventListener('touchmove', checkTopPosition, { passive: true });
    window.addEventListener('resize', checkTopPosition, { passive: true });
    document.addEventListener('scroll', checkTopPosition, { passive: true });

    // IntersectionObserver strictly targeting the top 10% of viewport
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              checkTopPosition();
            }
          });
        },
        {
          rootMargin: '0px 0px -90% 0px',
          threshold: [0, 0.5, 1],
        }
      );
      observer.observe(cardEl);
    }

    return () => {
      window.removeEventListener('scroll', checkTopPosition);
      window.removeEventListener('touchmove', checkTopPosition);
      window.removeEventListener('resize', checkTopPosition);
      document.removeEventListener('scroll', checkTopPosition);
      if (observer) {
        observer.disconnect();
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isRevealed, triggerCelebration]);

  // Global touch/mouse up release listener to prevent stuck scratching
  useEffect(() => {
    const handleGlobalEnd = () => setIsScratching(false);
    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchend', handleGlobalEnd);
    return () => {
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, []);

  // Cancel any auto-scratch on user interaction
  const cancelAutoScratchOnUserTouch = () => {
    hasStartedScratchingRef.current = true;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsAutoScratching(false);
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    cancelAutoScratchOnUserTouch();
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsScratching(false);

  // Touch Handlers for Mobile Phones & Tablets
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    cancelAutoScratchOnUserTouch();
    setIsScratching(true);
    if (e.touches[0]) {
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching || !e.touches[0]) return;
    scratchAt(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => setIsScratching(false);

  return (
    <div ref={containerRef} className="py-9 text-center select-none">
      {/* Kicker */}
      <span className="text-[10px] tracking-[0.25em] font-primary uppercase text-[#A24F61] font-bold block">
        AUSPICIOUS DATE REVEAL
      </span>

      {/* Main Cursive Title */}
      <h3 className="font-script text-5xl sm:text-6xl text-[#A24F61] font-normal my-1 tracking-wide">
        Scratch to Reveal
      </h3>

      {/* Heart divider */}
      <div className="flex items-center justify-center gap-2.5 my-2">
        <span className="w-12 h-[1px] bg-[#ebd0d6]" />
        <Heart className="w-3.5 h-3.5 fill-[#A24F61] text-[#A24F61]" />
        <span className="w-12 h-[1px] bg-[#ebd0d6]" />
      </div>

      <p className="font-description text-xs text-[#6e3745] mb-5">
        Rub and scratch the royal heart with your finger to uncover the wedding date
      </p>

      {/* ================= PHYSICAL SCRATCH-OFF CARD CONTAINER ================= */}
      <div ref={cardWrapperRef} className="relative mx-auto w-[260px] h-[240px] flex items-center justify-center select-none group">
        
        {/* UNDERNEATH LAYER: Only the Wedding Date (15 & 16 December 2026) positioned lower with refined royal typography */}
        <div
          className="absolute inset-0 bg-[#fffdfa] flex flex-col items-center justify-start pt-[82px] pb-3 px-3 text-center shadow-md border-2 border-[#e8ccd3] transition-all select-none"
          style={{
            clipPath:
              'path("M130 76.8 C130 19.2 15.6 19.2 15.6 76.8 C15.6 139.2 83.2 196.8 130 235.2 C176.8 196.8 244.4 139.2 244.4 76.8 C244.4 19.2 130 19.2 130 76.8 Z")',
          }}
        >
          {/* Exquisite Royal Typography for the Auspicious Date */}
          <div className="flex flex-col items-center justify-center z-10 max-w-[200px] mx-auto">
            {/* Shubh Vivah with golden decorative accents */}
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-3 h-[1px] bg-gradient-to-r from-transparent to-[#c48e35]" />
              <span className="text-[10px] tracking-[0.28em] font-cinzel uppercase font-bold text-[#b57d2a]">
                SHUBH VIVAH
              </span>
              <span className="w-3 h-[1px] bg-gradient-to-l from-transparent to-[#c48e35]" />
            </div>

            {/* Date Numbers with Elegant Italic Ampersand */}
            <div className="flex items-baseline justify-center font-cinzel font-bold text-[#A24F61] leading-none drop-shadow-[0_1px_1px_rgba(162,79,97,0.18)] my-0.5">
              <span className="text-[38px] sm:text-[42px] tracking-tight">15</span>
              <span className="font-serif italic font-normal text-2xl sm:text-3xl text-[#c48e35] mx-1.5 opacity-90">&amp;</span>
              <span className="text-[38px] sm:text-[42px] tracking-tight">16</span>
            </div>

            {/* Month with Regal Letter Spacing */}
            <span className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.38em] text-[#2d1219] mt-1 block">
              DECEMBER
            </span>

            {/* Year with Gold Hairline Flares */}
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="w-3.5 h-[1px] bg-[#c48e35]/70" />
              <span className="font-cinzel text-xs sm:text-[13px] font-bold text-[#b57d2a] tracking-[0.28em]">
                2026
              </span>
              <span className="w-3.5 h-[1px] bg-[#c48e35]/70" />
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

        {/* Gentle Pulsing Hand Touch Hint / Auto Status */}
        {!hasStartedScratching && !isRevealed && !isAutoScratching && (
          <div className="absolute -bottom-3 z-30 pointer-events-none animate-bounce flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#A24F61] text-white text-[10px] font-primary font-bold shadow-lg border border-white">
            <Hand className="w-3 h-3 text-[#fde68a]" />
            <span>Rub to scratch · Auto-reveals at top</span>
          </div>
        )}

        {isAutoScratching && !isRevealed && (
          <div className="absolute -bottom-3 z-30 pointer-events-none flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-[#A24F61] text-white text-[10px] font-primary font-bold shadow-lg border border-white animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#fde68a] animate-spin" />
            <span>✨ Auto-scratching &amp; revealing... ✨</span>
          </div>
        )}
      </div>

      {/* Action / Reveal status */}
      <div className="mt-5">
        {isRevealed ? (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#A24F61] text-white text-xs font-primary font-bold shadow-md animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-[#fde68a]" />
            <span>Date Revealed: 15 &amp; 16 December 2026!</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={triggerCelebration}
            className="text-xs text-[#A24F61] hover:text-[#782c40] underline underline-offset-4 font-description transition-colors cursor-pointer font-medium"
          >
            Reveal date directly
          </button>
        )}
      </div>
    </div>
  );
};
