import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

interface IndianVenueMapProps {
  venueName?: string;
  address?: string;
  city?: string;
  mapsUrl?: string;
}

export const IndianVenueMap: React.FC<IndianVenueMapProps> = ({
  venueName = 'Bapa Sitaram Palace Party Plot',
  address = 'Bapa Sitaram Chowk, New Varachha',
  city = 'Surat, Gujarat 395006, India',
  mapsUrl = 'https://www.google.com/maps/place/Bapa+Sitaram+Palace+Party+Plot/@21.2139181,72.9186267,17z/data=!3m1!4b1!4m6!3m5!1s0x3be04569fa306223:0x11723511c5607f10!8m2!3d21.2139181!4d72.9186267!16s%2Fg%2F11ylpm5z8v?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
}) => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback below
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopy = async () => {
    await copyTextToClipboard(`${venueName}, ${address}, ${city}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#A24F61] text-white py-9 px-6 text-center">
      <div className="w-10 h-10 mx-auto text-white flex items-center justify-center mb-1">
        <MapPin className="w-8 h-8 stroke-[1.5]" />
      </div>

      <h3 className="font-script text-5xl sm:text-6xl text-white font-normal tracking-wide my-1">
        Venue &amp; Location
      </h3>

      <p className="font-description text-xs text-[#fae8ec] max-w-[300px] mx-auto mt-2 leading-relaxed">
        We look forward to welcoming you with warmth and love. Find the wedding location below:
      </p>

      {/* Embedded Map Container */}
      <div className="mt-5 rounded-2xl overflow-hidden shadow-lg border-2 border-[#bd677b] bg-[#2d1219] relative group">
        <iframe
          title="Wedding Venue Google Map"
          src="https://maps.google.com/maps?q=Bapa+Sitaram+Palace+Party+Plot+Surat@21.2139181,72.9186267&hl=en&z=17&output=embed"
          width="100%"
          height="220"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-52 object-cover filter contrast-[1.05]"
        />

        {/* Floating location tag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#2d1219]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-left border border-white/20 flex items-center justify-between">
          <div>
            <h5 className="font-primary text-xs font-bold text-white truncate max-w-[200px]">
              {venueName}
            </h5>
            <p className="font-description text-[10px] text-[#fae8ec] truncate max-w-[200px]">
              {city}
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-[#A24F61] text-white hover:bg-[#8e3f51] transition-colors shrink-0"
            title="Open in Google Maps"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex justify-center max-w-[280px] mx-auto">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-6 rounded-full bg-white hover:bg-[#fff5f7] text-[#A24F61] font-primary font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Navigation className="w-4 h-4 fill-[#A24F61]" />
          <span>Get Directions</span>
        </a>
      </div>

      {/* Copy full address */}
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 text-[11px] text-[#fae8ec] hover:text-white underline underline-offset-4 flex items-center justify-center gap-1 mx-auto transition-colors font-description cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-[#fcd4dc]" />
            <span>Address copied to clipboard</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>Copy full venue address</span>
          </>
        )}
      </button>
    </div>
  );
};
