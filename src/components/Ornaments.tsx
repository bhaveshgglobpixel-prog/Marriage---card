import React from 'react';

/**
 * Diamond filigree divider with horizontal hairline wings
 */
export const DiamondDivider: React.FC<{
  className?: string;
  color?: string;
  lineColor?: string;
}> = ({
  className = 'my-4',
  color = '#c59b27',
  lineColor,
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-[200px] mx-auto ${className}`}>
      <span
        className="h-[1px] flex-1"
        style={{
          background: lineColor || 'linear-gradient(to right, transparent, rgba(197, 155, 39, 0.4), #c59b27)',
        }}
      />
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ color }}
        className="shrink-0"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      <span
        className="h-[1px] flex-1"
        style={{
          background: lineColor || 'linear-gradient(to left, transparent, rgba(197, 155, 39, 0.4), #c59b27)',
        }}
      />
    </div>
  );
};

/**
 * Heart accent used under couple names & sections (support deep crimson or emerald)
 */
export const HeartAccent: React.FC<{ className?: string; color?: string }> = ({
  className = 'my-2',
  color = '#ba2626',
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={color}
        className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

/**
 * Botanical corner leaf outline motifs (supports green botanical tint)
 */
export const CornerLeafOrnament: React.FC<{
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
  color?: string;
}> = ({ position, className = '', color = '#55826c' }) => {
  const isLeft = position.includes('left');
  const isTop = position.includes('top');

  return (
    <div
      className={`absolute pointer-events-none select-none opacity-40 ${
        isTop ? 'top-3.5' : 'bottom-3.5'
      } ${isLeft ? 'left-3.5' : 'right-3.5'} ${className}`}
      style={{
        color,
        transform: `${isLeft ? '' : 'scaleX(-1)'} ${isTop ? 'scaleY(-1)' : ''}`,
      }}
    >
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d="M6 58C6 58 14 36 34 26C48 19 56 8 58 6C58 6 54 22 42 34C32 44 18 54 6 58Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 48C28 42 34 38 42 34"
          strokeLinecap="round"
        />
        <path
          d="M32 38C38 32 44 26 50 18"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

/**
 * Royal top header heraldic crest / emblem
 */
export const TopRoyalCrest: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#c59b27',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center gap-2">
        <span
          className="w-8 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, ${color})`,
          }}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={color}
          className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
        >
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
        </svg>
        <span
          className="w-8 h-[1px]"
          style={{
            background: `linear-gradient(to left, transparent, ${color})`,
          }}
        />
      </div>
    </div>
  );
};
