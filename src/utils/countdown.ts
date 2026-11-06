/**
 * Wedding Countdown Engine
 * Target Wedding Date: December 16, 2026
 *
 * Automatically calculates whole calendar days remaining and live countdown
 * using JavaScript Date objects based on the user's local date/timezone.
 */

export interface WeddingCountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
  daysRemainingText: string;
}

export const TARGET_WEDDING_YEAR = 2026;
export const TARGET_WEDDING_MONTH = 11; // 0-indexed: 11 = December
export const TARGET_WEDDING_DAY = 15; // Auspicious Wedding Festivities Start Date (Mandap & Raas Garba)

/**
 * Calculates whole calendar days remaining and live time countdown.
 *
 * 1. Uses the wedding destination's timezone (Asia/Kolkata / Indian Standard Time)
 *    to calculate exact whole calendar days remaining (39 days as of Nov 6, 2026).
 * 2. Updates dynamically every day without any hardcoded days.
 * 3. Shows "TODAY IS THE WEDDING DAY!" on December 15, 2026 without negative numbers.
 */
export function calculateWeddingCountdown(currentDate: Date = new Date()): WeddingCountdownState {
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();

  try {
    // Get exact local date in Indian Standard Time (Asia/Kolkata)
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const parts = formatter.formatToParts(currentDate);
    const map: Record<string, number> = {};
    for (const p of parts) {
      if (p.type !== 'literal') {
        map[p.type] = parseInt(p.value, 10);
      }
    }
    if (map.year && map.month && map.day) {
      currentYear = map.year;
      currentMonth = map.month - 1; // 0-indexed
      currentDay = map.day;
    }
  } catch {
    // Fallback to local clock
  }

  // Midnight UTC timestamps for the local calendar dates
  // This avoids daylight savings time (DST) shifts or timezone offset glitches
  const currentLocalMidnightUtc = Date.UTC(currentYear, currentMonth, currentDay);
  const targetMidnightUtc = Date.UTC(TARGET_WEDDING_YEAR, TARGET_WEDDING_MONTH, TARGET_WEDDING_DAY);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const calendarDaysRemaining = Math.round((targetMidnightUtc - currentLocalMidnightUtc) / MS_PER_DAY);

  // Target datetime in IST (December 15, 2026 at 00:00:00 IST = UTC 18:30 Dec 14)
  const targetUtcMs = Date.UTC(TARGET_WEDDING_YEAR, TARGET_WEDDING_MONTH, TARGET_WEDDING_DAY, 0, 0, 0) - (5.5 * 3600 * 1000);
  const diffMs = targetUtcMs - currentDate.getTime();

  // December 15, 2026 has arrived
  if (calendarDaysRemaining === 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: true,
      isPast: false,
      daysRemainingText: 'TODAY IS THE WEDDING DAY!',
    };
  }

  // After December 15, 2026
  if (calendarDaysRemaining < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: false,
      isPast: true,
      daysRemainingText: 'TODAY IS THE WEDDING DAY!',
    };
  }

  // Active countdown: whole calendar days and live hours, minutes, seconds
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60) % 24;

  const dayLabel = calendarDaysRemaining === 1 ? 'DAY' : 'DAYS';

  return {
    days: calendarDaysRemaining,
    hours,
    minutes,
    seconds,
    isToday: false,
    isPast: false,
    daysRemainingText: `${calendarDaysRemaining} ${dayLabel} TO GO`,
  };
}
