import React, { useState } from 'react';
import { DiamondDivider } from './Ornaments';
import { VenueInfo } from '../types/wedding';
import { MapPin, Navigation, Calendar, Check, Copy } from 'lucide-react';

interface VenueSectionProps {
  venue: VenueInfo;
  sectionKicker?: string;
  sectionTitle?: string;
  weddingDateIso?: string;
}

export const VenueSection: React.FC<VenueSectionProps> = ({
  venue,
  sectionKicker = 'FIND US AT',
  sectionTitle = 'Venue & Location',
  weddingDateIso,
}) => {
  const [copied, setCopied] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleCopyAddress = () => {
    const fullAddress = `${venue.name}, ${venue.address}, ${venue.city}, ${venue.state} ${venue.pincode}, ${venue.country}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToCalendar = () => {
    const title = 'Aryan & Eva - Royal Wedding Ceremony';
    const description = `Join Aryan & Eva for their auspicious wedding ceremony at ${venue.name}, ${venue.city}.`;
    const location = `${venue.name}, ${venue.city}, ${venue.country}`;
    
    // Construct Google Calendar Link
    // Default to March 15, 2025 or target date
    const startDate = weddingDateIso ? new Date(weddingDateIso) : new Date(2025, 2, 15, 16, 0);
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours

    const formatGCalTime = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatGCalTime(startDate)}/${formatGCalTime(endDate)}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;

    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  return (
    <div className="py-6 sm:py-8">
      <div className="text-center mb-4">
        <span className="text-[10px] sm:text-xs tracking-[0.25em] text-[#9a7e58] font-royal uppercase font-medium">
          {sectionKicker}
        </span>
        <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2a1c12] mt-1">
          {sectionTitle}
        </h3>
        <DiamondDivider className="mt-3 mb-5" />
      </div>

      {/* Scenic Venue Image Banner with Frosted Pin Tag */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d8be94]/60 shadow-[0_6px_20px_rgba(150,110,60,0.15)] group">
        <div className="aspect-[16/9] w-full bg-[#3d2b1d] relative overflow-hidden">
          {/* Amer Fort panoramic photo or aesthetic sunset fortress view */}
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
            alt="Amer Fort Gardens, Jaipur, Rajasthan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Graceful fallback to rich royal architectural gradient if network is blocked
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />

          {/* Warm Amber Royal Architectural Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />

          {/* Central Frosted Pin Pill as in the design reference */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="backdrop-blur-md bg-black/45 border border-white/20 px-4 py-2.5 rounded-xl flex flex-col items-center gap-1 shadow-lg transform transition-all group-hover:scale-105">
              <div className="w-8 h-8 rounded-full bg-[#d4af37]/80 text-[#2a1c12] flex items-center justify-center shadow-md">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-white text-xs sm:text-sm font-serif font-medium tracking-wide">
                {venue.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Address & Action Buttons Card */}
      <div className="mt-4 bg-[#f8eedc]/70 border border-[#e8d7bb] rounded-2xl p-4 sm:p-5 shadow-sm text-left">
        <h4 className="font-serif-display text-lg sm:text-xl font-bold text-[#2a1c12]">
          {venue.name}
        </h4>
        <p className="text-xs sm:text-sm text-[#6c543c] font-sans mt-1 leading-relaxed">
          {venue.address}, {venue.city}, {venue.state} {venue.pincode}
          <br />
          {venue.country}
        </p>

        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <a
            href={venue.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(`${venue.name} ${venue.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#ba8c3e] to-[#a8762b] hover:from-[#c89848] hover:to-[#b68233] shadow-[0_2px_8px_rgba(186,140,62,0.3)] transition-all active:scale-[0.98]"
          >
            <Navigation className="w-3.5 h-3.5 shrink-0" />
            <span>Get Directions</span>
          </a>

          <button
            type="button"
            onClick={handleSaveToCalendar}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium text-[#7c5625] bg-[#faedd6] border border-[#d9bf92] hover:bg-[#f6e4c5] transition-all active:scale-[0.98]"
          >
            {calendarAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Added!</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Save Location</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopyAddress}
          className="w-full mt-2 text-[11px] text-[#937b60] hover:text-[#5e431f] flex items-center justify-center gap-1.5 transition-colors py-1"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Full address copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Click to copy full postal address</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
