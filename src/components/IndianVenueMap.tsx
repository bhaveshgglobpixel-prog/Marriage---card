import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface IndianVenueMapProps {
  venueName: string;
  address: string;
  city: string;
  mapsUrl: string;
}

export const IndianVenueMap: React.FC<IndianVenueMapProps> = ({
  venueName,
  address,
  city,
  mapsUrl,
}) => {
  return (
    <div className="py-10 px-4 sm:px-6 bg-[#fbf7f4] text-center border-t border-[#e8dcd0]">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faeff2] text-[#A24F61] text-[10px] tracking-[0.25em] font-primary uppercase font-bold mb-2 shadow-xs">
        <MapPin className="w-3 h-3 text-[#A24F61]" />
        <span>Location &amp; Directions</span>
      </div>

      <h3 className="font-script text-5xl sm:text-6xl text-[#A24F61] font-normal my-2 tracking-wide">
        The Wedding Venue
      </h3>

      <div className="max-w-[400px] mx-auto mt-4 bg-white rounded-3xl p-6 shadow-[0_6px_25px_rgba(162,79,97,0.08)] border border-[#eed5db]">
        <h4 className="font-serif-display text-lg sm:text-xl font-bold text-[#2d1219]">
          {venueName}
        </h4>
        <p className="font-description text-xs sm:text-sm text-[#6e3745] mt-1 leading-relaxed">
          {address}, {city}
        </p>

        {/* Embedded map iframe */}
        <div className="mt-4 rounded-2xl overflow-hidden aspect-[16/10] border border-[#f0d8de] relative shadow-inner bg-[#f7f0eb]">
          <iframe
            title="Venue Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.5398288593587!2d72.91605177589998!3d21.21392308048216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04569fa306223%3A0x11723511c5607f10!2sBapa%20Sitaram%20Palace%20Party%20Plot!5e0!3m2!1sen!2sin!4v1729835841234!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Action Button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-[#A24F61] hover:bg-[#8e3f51] text-white text-xs font-primary font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>
      </div>
    </div>
  );
};
