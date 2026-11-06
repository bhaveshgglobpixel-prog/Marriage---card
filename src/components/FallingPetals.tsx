import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const items: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 12,
      duration: Math.random() * 7 + 8,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setPetals(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute opacity-65"
          style={{
            left: `${p.left}%`,
            top: '-40px',
            animation: `fallPetal ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            style={{ transform: `rotate(${p.rotation}deg)` }}
          >
            <path
              d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z"
              fill="#d98295"
              fillOpacity="0.75"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes fallPetal {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
