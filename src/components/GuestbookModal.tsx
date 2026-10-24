import React from 'react';
import { RsvpEntry } from '../types/wedding';
import { X, Heart, MessageSquare } from 'lucide-react';

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

  const attendingCount = rsvps.filter((r) => r.attendance === 'joyfully_accept').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#faf6f2] border-2 border-[#A24F61]/35 rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden font-description">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#A24F61]/20">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-primary uppercase text-[#A24F61] font-bold">
              Guestbook &amp; RSVPs
            </span>
            <h3 className="font-script text-3xl sm:text-4xl text-[#A24F61]">
              Heartfelt Wishes ({rsvps.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#faeff2] hover:bg-[#f6dfe4] text-[#A24F61] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick attendance stats */}
        <div className="flex items-center gap-4 py-3 text-xs text-[#6e3745] font-description">
          <span className="flex items-center gap-1.5 font-semibold text-[#2d1219] font-primary">
            <Heart className="w-4 h-4 text-[#A24F61] fill-[#A24F61]" />
            {attendingCount} Joyfully Attending
          </span>
          <span className="text-[#d8a3b0]">·</span>
          <span>{rsvps.length - attendingCount} Sending Regrets</span>
        </div>

        {/* Scrollable Guest Messages */}
        <div className="overflow-y-auto space-y-3.5 pr-1 flex-1 py-2">
          {rsvps.length === 0 ? (
            <div className="text-center py-12 text-[#8c4959]">
              <MessageSquare className="w-10 h-10 mx-auto opacity-40 mb-2" />
              <p className="font-primary text-base font-semibold">No wishes yet</p>
              <p className="text-xs font-description mt-1">Be the first guest to send your blessings via RSVP!</p>
            </div>
          ) : (
            rsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="bg-white border border-[#ebdcd2] rounded-2xl p-4 shadow-2xs space-y-2 hover:border-[#cfb6a5] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-primary text-sm font-bold text-[#2d1219]">{rsvp.fullName}</h5>
                    <span className="text-[11px] font-description text-[#8c4959]">{rsvp.guestCount}</span>
                  </div>
                  <span
                    className={`text-[10px] font-primary font-bold px-2.5 py-0.5 rounded-full border ${
                      rsvp.attendance === 'joyfully_accept'
                        ? 'bg-[#faeff2] text-[#A24F61] border-[#ebd0d6]'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    {rsvp.attendance === 'joyfully_accept' ? 'Attending' : 'Regretfully Declined'}
                  </span>
                </div>

                {rsvp.message && (
                  <p className="font-description text-xs text-[#5c2432] italic leading-relaxed pt-1 border-t border-[#f2e6dc]">
                    "{rsvp.message}"
                  </p>
                )}

                <div className="text-[10px] text-[#a87481] font-description text-right">
                  {rsvp.submittedAt}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#A24F61]/20 text-center">
          <p className="font-description text-xs text-[#8c4959]">
            Divyesh &amp; Janki's Wedding Celebration · 15 &amp; 16 December 2026
          </p>
        </div>
      </div>
    </div>
  );
};
