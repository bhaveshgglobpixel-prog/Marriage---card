import React from 'react';

interface PetalShowerProps {
  active: boolean;
}

export const PetalShower: React.FC<PetalShowerProps> = ({ active }) => {
  if (!active) return null;

  // 14 floating petal particles with staggered animations
  const petals = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${(i * 7.5 + (i % 3) * 4) % 96}%`,
    duration: `${8 + (i % 5) * 2}s`,
    delay: `${(i * 0.7) % 6}s`,
    size: 16 + (i % 4) * 6,
    isGolden: i % 3 === 0,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30 select-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={
            {
              left: petal.left,
              top: '-30px',
              '--duration': petal.duration,
              '--delay': petal.delay,
            } as React.CSSProperties
          }
        >
          {petal.isGolden ? (
            /* Golden foil particle */
            <svg
              width={petal.size * 0.8}
              height={petal.size * 0.8}
              viewBox="0 0 24 24"
              fill="#d4af37"
              className="opacity-75 drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)]"
            >
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
            </svg>
          ) : (
            /* Delicate Rose Petal */
            <svg
              width={petal.size}
              height={petal.size * 1.3}
              viewBox="0 0 30 40"
              fill="none"
              className="opacity-65 drop-shadow-[0_2px_3px_rgba(186,38,38,0.2)]"
            >
              <path
                d="M15 0C25 10 30 25 22 35C15 42 5 36 2 28C-2 18 5 5 15 0Z"
                fill="url(#roseGradient)"
              />
              <defs>
                <linearGradient id="roseGradient" x1="0" y1="0" x2="30" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e15b64" />
                  <stop offset="0.6" stopColor="#c7253e" />
                  <stop offset="1" stopColor="#800020" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
