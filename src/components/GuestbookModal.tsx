import React from 'react';
import { X, Heart, MessageSquare } from 'lucide-react';
import { RsvpEntry } from '../types/wedding';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: RsvpEntry[];
}

export const GuestbookModal: React.FC<GuestbookModalProps> = ({
  isOpen,
  onClose,
  rsvps,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#faf6f2] border-2 border-[#A24F61]/35 rounded-3xl p-6 shadow-2xl overflow-hidden font-description max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#faeff2] text-[#A24F61] flex items-center justify-center">
              <Heart className="w-4 h-4 fill-[#A24F61]" />
            </div>
            <div>
              <h3 className="font-script text-3xl sm:text-4xl text-[#A24F61]">
                Guest Wishes &amp; Blessings
              </h3>
              <p className="font-description text-[11px] text-[#7d3d4b]">
                Warmest thoughts shared for Janaki &amp; Divyesh
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#faeff2] hover:bg-[#f3dbe1] text-[#A24F61] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishes List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {rsvps.length === 0 ? (
            <div className="py-8 text-center text-[#7d3d4b]">
              <MessageSquare className="w-8 h-8 mx-auto opacity-40 mb-2" />
              <p className="text-xs">No blessings yet. Be the first to RSVP and send your love!</p>
            </div>
          ) : (
            rsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="bg-white rounded-2xl p-4 border border-[#ebdcd2] shadow-xs text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-primary font-bold text-xs text-[#2d1219]">
                    {rsvp.fullName}
                  </h4>
                  <span className="text-[10px] font-primary font-medium text-[#7d3d4b] bg-[#faeff2] px-2 py-0.5 rounded-full">
                    {rsvp.submittedAt}
                  </span>
                </div>
                <p className="font-description text-xs text-[#5c2432] leading-relaxed italic">
                  "{rsvp.message}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#ebdcd2] text-center">
          <p className="font-description text-xs text-[#8c4959]">
            Janaki &amp; Divyesh's Wedding Celebration · 16 December 2026
          </p>
        </div>
      </div>
    </div>
  );
};
