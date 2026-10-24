import React, { useState, useEffect } from 'react';
import { DiamondDivider, HeartAccent } from './Ornaments';

interface CountdownTimerProps {
  targetDateIso: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateIso }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeLeft(targetDateIso));

  function calculateTimeLeft(target: string): TimeRemaining {
    const targetTime = new Date(target).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateIso));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="py-6 sm:py-8 text-center">
      <DiamondDivider className="mb-4" />
      <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2a1c12] tracking-normal">
        Counting Down to Forever
      </h3>
      <HeartAccent className="my-2.5" />

      <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-5 max-w-[380px] mx-auto px-1">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-white/90 border border-[#e8dcc7] rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-[0_4px_16px_rgba(180,140,80,0.1)] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_6px_20px_rgba(180,140,80,0.18)] hover:-translate-y-0.5"
          >
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2d1e13] tabular-nums tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-[#937b60] font-sans font-semibold mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {timeLeft.isPast && (
        <p className="mt-3 text-xs sm:text-sm font-classic italic text-[#8c6d3d]">
          The celebrations have commenced! Wishing Aryan & Eva eternal love.
        </p>
      )}
    </div>
  );
};
