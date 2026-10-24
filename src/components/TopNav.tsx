import React from 'react';
import { Sparkles, Edit3, Share2, BookOpen } from 'lucide-react';
import { ColorTheme } from '../types/wedding';

interface TopNavProps {
  groomName: string;
  brideName: string;
  theme: ColorTheme;
  onOpenCustomizer: () => void;
  onOpenShare: () => void;
  onOpenGuestbook: () => void;
  onShowerBlessings: () => void;
  rsvpCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  groomName,
  brideName,
  theme,
  onOpenCustomizer,
  onOpenShare,
  onOpenGuestbook,
  onShowerBlessings,
  rsvpCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d1a14]/95 backdrop-blur-md border-b border-[#1d4432] text-[#e3ece7] px-4 sm:px-8 py-3 transition-all no-print">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tight font-serif-display text-[#f5df9e] whitespace-nowrap shrink-0 hover:text-white transition-colors"
        >
          {groomName} &amp; {brideName}
        </a>

        {/* Zone 2: 4–5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#a7c5b6]">
          <button
            type="button"
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Customize Card</span>
          </button>

          <button
            type="button"
            onClick={onOpenGuestbook}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Guestbook ({rsvpCount})</span>
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Share2 className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Share / Print</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onShowerBlessings}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#0f241a] bg-gradient-to-r from-[#d8ad47] via-[#c59b27] to-[#aa811a] hover:from-[#e5bd57] hover:to-[#bf922e] shadow-[0_2px_12px_rgba(197,155,39,0.35)] transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0f241a]" />
            <span>Shower Blessings</span>
          </button>
        </div>

      </div>
    </header>
  );
};
