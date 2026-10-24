import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { ScratchHeartCard } from './ScratchHeartCard';
import { IndianVenueMap } from './IndianVenueMap';

interface OliveWeddingCardProps {
  onOpenRsvpModal?: () => void;
  onOpenGuestbook?: () => void;
  onOpenShare?: () => void;
}

export const OliveWeddingCard: React.FC<OliveWeddingCardProps> = ({
  onOpenRsvpModal,
  onOpenGuestbook,
  onOpenShare,
}) => {
  // Couple names: Divyesh & Janki
  const [couple] = useState({
    groom: 'Divyesh',
    bride: 'Janki',
    dateDisplay: '15 & 16 December 2026',
    dayOfWeek: 'MONDAY & TUESDAY',
    dayNumber: '15 & 16',
    month: 'DECEMBER',
    year: '2026',
  });

  // Countdown timer: 52 days to go, counting down live every second
  const [countdown, setCountdown] = useState({
    days: 52,
    hours: 14,
    minutes: 28,
    seconds: 45,
  });

  useEffect(() => {
    // Persistent target anchor to ensure 52 days counting down live continuously
    const STORAGE_KEY = 'divyesh_janki_countdown_52d_v2';
    let targetMs: number;

    try {
      // Clear legacy 54-day key if present
      sessionStorage.removeItem('divyesh_janki_countdown_54d_v1');
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        const rem = parsed - Date.now();
        // If stored time is still within 49-53 days, continue from there
        if (rem > 48 * 86400000 && rem <= 53 * 86400000) {
          targetMs = parsed;
        } else {
          targetMs = Date.now() + (52 * 86400000) + (14 * 3600000) + (28 * 60000) + (45 * 1000);
          sessionStorage.setItem(STORAGE_KEY, targetMs.toString());
        }
      } else {
        targetMs = Date.now() + (52 * 86400000) + (14 * 3600000) + (28 * 60000) + (45 * 1000);
        sessionStorage.setItem(STORAGE_KEY, targetMs.toString());
      }
    } catch {
      targetMs = Date.now() + (52 * 86400000) + (14 * 3600000) + (28 * 60000) + (45 * 1000);
    }

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetMs - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Marriage Events - Exactly 3 sacred ceremonies with custom couple illustration
  const marriageEvents = [
    {
      id: 'mandap',
      title: 'Mandap Ceremony',
      date: '15 December',
      dayTime: '2:00 PM',
      description: 'Sacred marriage rituals, exchange of vows, and auspicious blessings as we tie the knot.',
      imageUrl: '/assets/aistudio/Image__4__1_2ef47037.jpg',
      badge: 'Mandap Ceremony',
    },
    {
      id: 'dinner-15',
      title: 'Dinner',
      date: '15 December',
      dayTime: '6:00 PM',
      description: 'Sumptuous multi-course celebratory feast with our beloved family and friends.',
      imageUrl: '/assets/aistudio/Image__4__2_ad57dbae.jpg',
      badge: 'Royal Feast',
    },
    {
      id: 'garba',
      title: 'Raas Garba',
      date: '15 December',
      dayTime: '9:00 PM',
      description: 'Joyous music, rhythmic traditional dancing, and vibrant celebrations under the stars.',
      imageUrl: '/assets/aistudio/Image__2___1__1_0bc87b03.jpg',
      badge: 'Raas Garba',
    },
  ];

  return (
    <div className="w-full max-w-[480px] sm:max-w-[500px] mx-auto bg-[#EFE6DD] shadow-[0_20px_60px_rgba(162,79,97,0.16)] rounded-none sm:rounded-b-3xl overflow-hidden border-0 sm:border-x sm:border-b border-[#dfd4c8] transition-all font-description">
      
      {/* ================= SECTION 1: ROYAL PALACE HERO HEADER (FLUSH TO TOP, NO GAP) ================= */}
      <div
        className="relative w-full aspect-[9/16] min-h-[720px] sm:min-h-[780px] bg-cover bg-top bg-no-repeat flex flex-col justify-between p-4 sm:p-5 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/aistudio/image_96352529.png')",
        }}
      >
        {/* Names Card positioned elegantly under the crystal chandeliers */}
        <div className="pt-20 sm:pt-24">
          <div className="relative z-10 mx-1 sm:mx-2 py-6 px-4 rounded-3xl bg-[#fdfaf7]/94 backdrop-blur-[2px] shadow-md border border-[#ebd0d6]">
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-primary uppercase font-bold text-[#A24F61] block mb-1.5">
              Together With Their Families
            </span>

            {/* Main Heading Couple Names: Divyesh & Janki in cursive (karshu) font */}
            <h1 className="font-script text-5xl sm:text-6xl text-[#A24F61] tracking-wide font-normal drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] leading-tight my-1">
              {couple.groom}
            </h1>

            <div className="my-0.5">
              <span className="font-script text-3xl sm:text-4xl text-[#c28236] italic drop-shadow-xs">&amp;</span>
            </div>

            <h1 className="font-script text-5xl sm:text-6xl text-[#A24F61] tracking-wide font-normal drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] leading-tight my-1">
              {couple.bride}
            </h1>

            <p className="font-description text-xs sm:text-sm text-[#5c2432] max-w-[270px] mx-auto mt-2 leading-relaxed">
              Cordially invite you to celebrate their wedding union with love &amp; blessings
            </p>
          </div>
        </div>

        {/* Date Plaque Ribbon shifted higher up over garden as in image_fa2da66d.png */}
        <div className="relative z-10 pb-20 sm:pb-24">
          <div className="inline-block py-2.5 px-6 rounded-full bg-[#A24F61] text-white shadow-xl border border-white/25">
            <span className="font-primary text-xs sm:text-sm tracking-[0.22em] text-[#fae8ec] font-bold">
              15 &amp; 16 DECEMBER 2026
            </span>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: BLESSINGS BANNER & COUNTDOWN (PRIMARY #A24F61) ================= */}
      <div className="bg-[#A24F61] text-white py-8 px-6 text-center">
        <p className="font-description text-xs text-[#fae8ec] max-w-[310px] mx-auto leading-relaxed">
          With the divine blessings of Almighty and our beloved parents &amp; elders, we joyfully invite you to the auspicious wedding ceremony of
        </p>

        {/* Main Heading Couple Names in cursive (karshu) */}
        <h4 className="font-script text-4xl sm:text-5xl text-white my-3 font-normal tracking-wide drop-shadow-sm">
          {couple.groom} &amp; {couple.bride}
        </h4>



        {/* Countdown Timer with 52 Days to go continuously counting live */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#fae8ec] text-[11px] font-primary font-bold tracking-[0.2em] uppercase mb-3 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#fcd4dc] animate-ping" />
            <span>{countdown.days} Days To Go · Counting Down</span>
          </div>

          <div className="font-primary text-3xl sm:text-4xl font-bold tracking-wider text-white tabular-nums flex items-center justify-center gap-2">
            <span>{String(countdown.days).padStart(2, '0')}</span>
            <span className="text-[#fcd4dc]">:</span>
            <span>{String(countdown.hours).padStart(2, '0')}</span>
            <span className="text-[#fcd4dc]">:</span>
            <span>{String(countdown.minutes).padStart(2, '0')}</span>
            <span className="text-[#fcd4dc]">:</span>
            <span>{String(countdown.seconds).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center justify-center gap-6 text-[10px] tracking-widest text-[#fae8ec] font-primary mt-1">
            <span className="w-10 text-center font-semibold">Days</span>
            <span className="w-10 text-center font-semibold">Hours</span>
            <span className="w-10 text-center font-semibold">Mins</span>
            <span className="w-10 text-center font-semibold">Secs</span>
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: SCRATCH TO REVEAL HEART CARD (REAL METALLIC GOLD FOIL) ================= */}
      <div className="px-6 py-2 bg-[#fbf8f5]">
        <ScratchHeartCard
          weddingDateText="15 & 16 December 2026"
          dayText="Monday & Tuesday"
          subText="Shubh Vivah"
        />
      </div>

      {/* ================= SECTION 4: MARRIAGE EVENTS (TOP DETAILS, VERTICAL 2D IMAGE UNDERNEATH) ================= */}
      <div className="py-10 px-4 sm:px-6 bg-[#f8f2ec] text-center border-t border-[#e8dcd0]">
        <span className="text-[10px] tracking-[0.25em] font-primary uppercase text-[#A24F61] font-bold block">
          AUSPICIOUS CEREMONIES
        </span>
        <h3 className="font-script text-5xl sm:text-6xl text-[#A24F61] font-normal my-2 tracking-wide">
          Marriage Events
        </h3>
        <p className="font-description text-xs text-[#6e3745] max-w-[290px] mx-auto mb-7 leading-relaxed">
          Join us in celebrated traditions, vibrant colors, and sacred rituals
        </p>

        {/* Event Cards: Top has Script Title, Date/Time, & Details — Directly underneath is the VERTICAL 2D Mandap Image */}
        <div className="space-y-6 max-w-[400px] mx-auto text-center">
          {marriageEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_6px_25px_rgba(162,79,97,0.07)] border border-[#ebdcd2] transition-all hover:border-[#d9bfb0]"
            >
              {/* TOP: Script font ceremony title */}
              <h4 className="font-script text-4xl sm:text-5xl text-[#A24F61] font-normal leading-tight tracking-wide">
                {evt.title}
              </h4>

              {/* DATE & TIME (Under title as in reference image) */}
              <div className="mt-2.5 flex flex-col items-center justify-center gap-1">
                <span className="font-primary text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#2d1219]">
                  {evt.date}
                </span>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeff2] text-[#A24F61] text-[11px] font-primary font-bold border border-[#ebd0d6]">
                  <Clock className="w-3 h-3 stroke-[2]" />
                  <span>{evt.dayTime}</span>
                </div>
              </div>

              {/* DESCRIPTION FROM USER IMAGE CONTENT */}
              <p className="font-description text-xs text-[#6e3745] max-w-[320px] mx-auto mt-2.5 leading-relaxed">
                {evt.description}
              </p>

              {/* UNDERNEATH: Royal Couple Mandap Illustration */}
              <div className="mt-4 rounded-2xl overflow-hidden h-[320px] sm:h-[350px] relative shadow-lg border border-[#ebd0d6] bg-[#fbf5f2] group max-w-[360px] mx-auto">
                <img
                  src={evt.imageUrl}
                  alt={evt.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] tracking-wider uppercase font-primary font-extrabold text-[#A24F61] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#ebd0d6] shadow-sm">
                    {evt.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 5: VENUE & GOOGLE MAPS (#A24F61 PRIMARY) ================= */}
      <IndianVenueMap
        venueName="Bapa Sitaram Palace Party Plot"
        address="Bapa Sitaram Chowk, New Varachha"
        city="Surat, Gujarat 395006, India"
        mapsUrl="https://www.google.com/maps/place/Bapa+Sitaram+Palace+Party+Plot/@21.2139181,72.9186267,17z/data=!3m1!4b1!4m6!3m5!1s0x3be04569fa306223:0x11723511c5607f10!8m2!3d21.2139181!4d72.9186267!16s%2Fg%2F11ylpm5z8v?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D"
      />

      {/* ================= SECTION 7: CLOSING THANK YOU & FULL-SIZE COUPLE PHOTO ================= */}
      <div className="pb-12 pt-6 px-6 bg-[#f8f2ec] text-center">
        <span className="text-[10px] tracking-[0.25em] font-primary uppercase text-[#A24F61] font-bold block">
          WE EAGERLY LOOK FORWARD TO CELEBRATING WITH YOU
        </span>
        <h3 className="font-script text-5xl sm:text-6xl text-[#A24F61] font-normal my-2 tracking-wide">
          Thank You!
        </h3>
        <p className="font-primary text-xs sm:text-sm font-semibold tracking-wider text-[#6e3745] uppercase">
          Divyesh &amp; Janki
        </p>

        {/* Full-Size Couple Photo in Elegant Royal Arch Shape */}
        <div className="mt-7 mx-auto max-w-[340px] relative group">
          {/* Subtle gold/rose glow behind frame */}
          <div className="absolute -inset-1.5 bg-gradient-to-b from-[#e5c568]/40 to-[#A24F61]/25 rounded-t-[145px] rounded-b-[28px] blur-xs" />

          {/* Arched Photo Frame Container */}
          <div className="relative rounded-t-[140px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-[#faeff2]">
            <img
              src="/assets/aistudio/Image__8__ff8d6062.jfif"
              alt="Divyesh & Janki - Forever & Always"
              className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Bottom Dark Vignette with Gold/Rose Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <span className="font-script text-3xl sm:text-4xl text-white font-normal drop-shadow-md block">
                Divyesh &amp; Janki
              </span>
              <span className="text-[10px] tracking-[0.22em] text-[#fae8ec] uppercase font-description font-medium block mt-0.5">
                Forever Begins Now
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
