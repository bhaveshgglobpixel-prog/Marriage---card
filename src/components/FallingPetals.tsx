import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: 'petal' | 'gold_fleck' | 'blush_leaf';
  color: string;
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const petalsRef = useRef<Petal[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Realistic Indian Wedding Rose Petal Colors & Gold Foil
    const petalColors = [
      '#c43c5d', // Royal Red Rose
      '#d95374', // Fresh Pink Rose
      '#e8738f', // Soft Blush Petal
      '#a24f61', // Theme Maroon Rose
      '#f4a6b8', // Delicate Rosebud
    ];

    const goldColors = [
      '#e5b869', // Royal Indian Gold
      '#f5dfa8', // Champagne Gold
      '#d4a34b', // Rich Marigold Gold
    ];

    // Generate balanced petal particles
    const count = window.innerWidth < 640 ? 22 : 36;
    const petals: Petal[] = [];

    for (let i = 0; i < count; i++) {
      const isGold = Math.random() < 0.28;
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isGold ? Math.random() * 3 + 2 : Math.random() * 10 + 9,
        speedY: isGold ? Math.random() * 0.8 + 0.4 : Math.random() * 1.1 + 0.6,
        speedX: Math.random() * 1.0 - 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: isGold ? Math.random() * 0.7 + 0.3 : Math.random() * 0.6 + 0.35,
        type: isGold ? 'gold_fleck' : 'petal',
        color: isGold
          ? goldColors[Math.floor(Math.random() * goldColors.length)]
          : petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }
    petalsRef.current = petals;

    let tick = 0;
    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((p) => {
        // Natural gentle swaying motion like real falling flower petals
        p.y += p.speedY;
        p.x += Math.sin(tick + p.size) * 0.7 + p.speedX;
        p.rotation += p.rotSpeed;

        // Reset when falling past screen bottom
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'gold_fleck') {
          // Floating golden shimmer dust
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Organic curved rose petal shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.7, p.size * 0.8, p.size * 0.4, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.4, -p.size * 0.75, -p.size * 0.7, 0, -p.size);
          ctx.closePath();
          ctx.fill();

          // Subtle center vein shadow for depth
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.7);
          ctx.lineTo(0, p.size * 0.7);
          ctx.stroke();
        }

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      style={{ willChange: 'transform' }}
    />
  );
};
