import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { ScratchHeartCard } from './ScratchHeartCard';
import { IndianVenueMap } from './IndianVenueMap';
import { ScrollReveal } from './ScrollReveal';
import { calculateWeddingCountdown } from '../utils/countdown';

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
  // Couple names: Janki & Divyesh (Bride first)
  const [couple] = useState({
    groom: 'Divyesh',
    bride: 'Janki',
    dateDisplay: '16 December 2026',
    dayOfWeek: 'WEDNESDAY',
    dayNumber: '16',
    month: 'DECEMBER',
    year: '2026',
  });

  // Dynamic countdown timer targeting December 16, 2026 using user's local date/time
  const [countdown, setCountdown] = useState(() => calculateWeddingCountdown(new Date()));

  useEffect(() => {
    // Clean up any legacy mock countdown storage keys
    try {
      sessionStorage.removeItem('divyesh_janki_countdown_52d_v2');
      sessionStorage.removeItem('divyesh_janki_countdown_54d_v1');
    } catch {
      // Safe fallback
    }

    // Immediately calculate against current date
    setCountdown(calculateWeddingCountdown(new Date()));

    // Live update every second
    const interval = setInterval(() => {
      setCountdown(calculateWeddingCountdown(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Marriage Events - Exactly 3 sacred ceremonies with custom couple illustration & location line
  const marriageEvents = [
    {
      id: 'mandap',
      title: 'Mandap Ceremony',
      date: '15 December, Tuesday',
      dayTime: '1:00 PM',
      location: 'Bapa Sitaram Palace Party Plot',
      description: 'Join us for sacred rituals, heartfelt vows, and divine blessings as we begin our journey together.',
      imageUrl: '/assets/aistudio/Image__4__2_ad57dbae.jpg',
      badge: 'Mandap Ceremony',
    },
    {
      id: 'garba',
      title: 'Raas Garba',
      subtitle: 'A Special Dinner Invitation',
      date: '15 December, Tuesday',
      dayTime: '6:00 PM Onwards',
      location: 'Together as a Couple',
      description: 'A Heartfelt Invitation to Join Us.',
      imageUrl: '/assets/aistudio/Image__8__1_49dbf85c.jpg',
      badge: 'Raas Garba',
    },
    {
      id: 'wedding',
      title: 'Wedding',
      date: '16 December, Wednesday',
      dayTime: '10:00 PM',
      location: 'Bapa Sitaram Palace Party Plot',
      description: 'Sacred pheras around the holy agni, auspicious Hast Melap, and eternal vows of togetherness.',
      imageUrl: '/assets/aistudio/Image__4__1_81978a19.jpg',
      badge: 'Shubh Vivah',
    },
  ];

  return (
    <div className="w-full max-w-[480px] sm:max-w-[500px] mx-auto bg-[#EFE6DD] shadow-[0_20px_60px_rgba(162,79,97,0.16)] rounded-none sm:rounded-b-3xl overflow-hidden border-0 sm:border-x sm:border-b border-[#dfd4c8] transition-all font-description">
      
      {/* ================= SECTION 1: ROYAL PALACE HERO HEADER (FLUSH TO TOP, NO GAP) ================= */}
      <div
        className="relative w-full aspect-[9/16] min-h-[780px] sm:min-h-[840px] bg-cover bg-top bg-no-repeat flex flex-col justify-between p-4 sm:p-5 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/aistudio/image_96352529.png')",
        }}
      >
        {/* Names & Family details placed directly over the palace garden parchment without any rectangle box */}
        <div className="pt-20 sm:pt-24 z-10 px-2 sm:px-4 text-center">
          {/* BRIDE SECTION: Big cursive Janki with parents directly on background */}
          <div className="my-1 anim-fast-text" style={{ animationDelay: '100ms' }}>
            <h1 className="font-script text-6xl sm:text-7xl text-[#A24F61] tracking-wide font-normal drop-shadow-[0_2px_4px_rgba(255,255,255,0.95)] leading-tight">
              {couple.bride}
            </h1>
            <div className="mt-1 text-center font-description anim-fast-text" style={{ animationDelay: '200ms' }}>
              <span className="text-xs sm:text-[13px] text-[#7d3d4b] italic block drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                The Beloved Daughter of
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#2d1219] block mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                Mrs. Ansuyaben &amp; Mr. Dineshbhai Bavchandbhai Savsaviya
              </span>
              <span className="text-[11px] sm:text-xs text-[#6e3745] font-semibold italic block mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                Originally from Punjapader | Currently Residing in Surat
              </span>
            </div>
          </div>

          {/* Ornamental Ampersand */}
          <div className="my-1.5 flex items-center justify-center gap-2 anim-fast-pop" style={{ animationDelay: '300ms' }}>
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#c28236]/70" />
            <span className="font-script text-4xl sm:text-5xl text-[#c28236] italic drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">&amp;</span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#c28236]/70" />
          </div>

          {/* GROOM SECTION: Big cursive Divyesh with parents & residence */}
          <div className="my-1 anim-fast-text" style={{ animationDelay: '420ms' }}>
            <h1 className="font-script text-6xl sm:text-7xl text-[#A24F61] tracking-wide font-normal drop-shadow-[0_2px_4px_rgba(255,255,255,0.95)] leading-tight">
              {couple.groom}
            </h1>
            <div className="mt-1 text-center font-description anim-fast-text" style={{ animationDelay: '520ms' }}>
              <span className="text-xs sm:text-[13px] text-[#7d3d4b] italic block drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                The Beloved Son of
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#2d1219] block mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                Mrs. Manishaben &amp; Mr. Mansukhbhai maganbhai Kotadia
              </span>
              <span className="text-[11px] sm:text-xs text-[#6e3745] font-semibold italic block mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                Originally from Tori(Rampur) | Currently Residing in Surat
              </span>
            </div>
          </div>

          <p className="font-description text-xs sm:text-sm text-[#5c2432] font-medium max-w-[320px] mx-auto mt-3 leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] anim-fast-text" style={{ animationDelay: '640ms' }}>
            With the blessings of their families, they joyfully invite you to celebrate their beautiful union.
          </p>
        </div>

        {/* Date Plaque Ribbon shifted higher up over garden with pop entrance */}
        <div className="relative z-10 pb-36 sm:pb-48 -mt-4 anim-fast-pop" style={{ animationDelay: '760ms' }}>
          <div className="inline-block py-2.5 px-6 rounded-full bg-[#A24F61] text-white shadow-xl border border-white/25">
            <span className="font-primary text-xs sm:text-sm tracking-[0.22em] text-[#fae8ec] font-bold">
              16 DECEMBER 2026
            </span>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: CELEBRATION BANNER & COUNTDOWN (PRIMARY ROYAL ROSE PATTI) ================= */}
      <ScrollReveal direction="up">
        <div className="bg-[#A24F61] text-white py-8 px-6 text-center shadow-inner border-y border-[#8e3f51]">
          <p className="font-description text-xs text-[#fae8ec] max-w-[320px] mx-auto leading-relaxed">
            With the divine blessings of the Almighty and the blessings of our beloved parents and elders, we joyfully invite you to celebrate our wedding.
          </p>

          {/* Main Heading Couple Names in simple, readable cursive (karshu) */}
          <h4 className="font-script text-5xl sm:text-6xl text-white my-3 font-semibold tracking-wide drop-shadow-sm">
            {couple.bride} &amp; {couple.groom}
          </h4>

          {/* Countdown Timer with dynamic days and live time counting down */}
          <div className="mt-8">
            {countdown.isToday || countdown.isPast ? (
              <div className="py-2 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#A24F61] text-xs sm:text-sm font-primary font-bold tracking-[0.2em] uppercase shadow-md border border-white/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A24F61] animate-ping" />
                  <span>TODAY IS THE WEDDING DAY!</span>
                </div>
                <p className="font-description text-xs text-[#fae8ec] mt-3 leading-relaxed max-w-[280px] mx-auto">
                  Heartfelt congratulations &amp; auspicious blessings to Janki &amp; Divyesh on their sacred union!
                </p>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#fdf0f3] text-[11px] font-primary font-bold tracking-[0.2em] uppercase mb-3 border border-white/20 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#f8b4c4] animate-ping" />
                  <span>{countdown.daysRemainingText} · COUNTING DOWN</span>
                </div>

                <div className="font-primary text-3xl sm:text-4xl font-bold tracking-wider text-white tabular-nums flex items-center justify-center gap-2">
                  <span>{String(countdown.days).padStart(2, '0')}</span>
                  <span className="text-[#f8b4c4]">:</span>
                  <span>{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="text-[#f8b4c4]">:</span>
                  <span>{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="text-[#f8b4c4]">:</span>
                  <span>{String(countdown.seconds).padStart(2, '0')}</span>
                </div>

                <div className="flex items-center justify-center gap-6 text-[10px] tracking-widest text-[#fae8ec] font-primary mt-1">
                  <span className="w-10 text-center font-semibold">Days</span>
                  <span className="w-10 text-center font-semibold">Hours</span>
                  <span className="w-10 text-center font-semibold">Mins</span>
                  <span className="w-10 text-center font-semibold">Secs</span>
                </div>
              </>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* ================= SECTION 3: SCRATCH TO REVEAL HEART CARD (REAL METALLIC GOLD FOIL) ================= */}
      <ScrollReveal direction="up" delay={50}>
        <div className="px-6 py-2 bg-[#fbf8f5]">
          <ScratchHeartCard
            weddingDateText="16 December 2026"
            dayText="Wednesday"
            subText="Shubh Vivah"
          />
        </div>
      </ScrollReveal>

      {/* ================= SECTION 4: MARRIAGE EVENTS (TOP DETAILS, VERTICAL 2D IMAGE UNDERNEATH) ================= */}
      <div className="py-10 px-4 sm:px-6 bg-[#f8f2ec] text-center border-t border-[#e8dcd0]">
        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A24F61] text-[#faeff2] text-[10px] tracking-[0.25em] font-primary uppercase font-bold mb-2 shadow-xs">
            THE CELEBRATIONS
          </div>
          <h3 className="font-script text-5xl sm:text-6xl text-[#A24F61] font-normal my-2 tracking-wide">
            Marriage Events
          </h3>
          <p className="font-description text-xs text-[#7d3d4b] max-w-[290px] mx-auto mb-7 leading-relaxed">
            Join us in celebrated traditions, vibrant colors, and sacred rituals
          </p>
        </ScrollReveal>

        {/* Event Cards: Slid in from alternating sides (left / right) when scrolled to */}
        <div className="space-y-6 max-w-[400px] mx-auto text-center">
          {marriageEvents.map((evt, idx) => {
            const side = idx % 2 === 0 ? 'left' : 'right';
            return (
              <ScrollReveal key={evt.id} direction={side} delay={idx * 60}>
                <div
                  className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_6px_25px_rgba(162,79,97,0.08)] border border-[#eed5db] transition-all hover:border-[#dfb9c3]"
                >
                  {/* TOP: Script font ceremony title - Simple, clean & readable */}
                  <h4 className="font-script text-4xl sm:text-5xl text-[#A24F61] font-normal leading-tight tracking-wide">
                    {evt.title}
                  </h4>

                  {/* Subtitle when present (e.g. A Special Dinner Invitation) */}
                  {'subtitle' in evt && evt.subtitle && (
                    <div className="mt-1">
                      <span className="font-primary text-[11px] sm:text-xs font-bold text-[#b57d2a] tracking-[0.18em] uppercase">
                        {evt.subtitle}
                      </span>
                    </div>
                  )}

                  {/* DATE & TIME (Under title as in reference image) */}
                  <div className="mt-2.5 flex flex-col items-center justify-center gap-1">
                    <span className="font-primary text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#2d1219]">
                      {evt.date}
                    </span>

                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeff2] text-[#A24F61] text-[11px] font-primary font-bold border border-[#f0d8de]">
                      <Clock className="w-3 h-3 stroke-[2]" />
                      <span>{evt.dayTime}</span>
                    </div>

                    {/* Location Line */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-description text-[#7d3d4b] mt-1">
                      <MapPin className="w-3 h-3 text-[#A24F61] shrink-0" />
                      <span className="font-medium">{evt.location}</span>
                    </div>
                  </div>

                  {/* DESCRIPTION FROM CEREMONY DETAILS */}
                  <p className="font-description text-xs text-[#6e3745] max-w-[320px] mx-auto mt-2.5 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* UNDERNEATH: Royal Couple Mandap Illustration */}
                  <div className="mt-4 rounded-2xl overflow-hidden h-[320px] sm:h-[350px] relative shadow-lg border border-[#eed5db] bg-[#fbf5f2] group max-w-[360px] mx-auto">
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* ================= SECTION 5: VENUE & GOOGLE MAPS ================= */}
      <ScrollReveal direction="right">
        <IndianVenueMap
          venueName="Bapa Sitaram Palace Party Plot"
          address="Anthem Circle, Canal Road, opp. Annapurna Hotel"
          city="Surat, Gujarat 395013"
          mapsUrl="https://www.google.com/maps/place/Bapa+Sitaram+Palace+Party+Plot/@21.2139181,72.9186267,17z/data=!3m1!4b1!4m6!3m5!1s0x3be04569fa306223:0x11723511c5607f10!8m2!3d21.2139181!4d72.9186267!16s%2Fg%2F11ylpm5z8v?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D"
        />
      </ScrollReveal>

      {/* ================= SECTION 7: CLOSING THANK YOU & FULL-SIZE COUPLE PHOTO ================= */}
      <ScrollReveal direction="up">
        <div className="pb-12 pt-6 px-6 bg-[#f8f2ec] text-center">
          <span className="text-[10px] tracking-[0.25em] font-primary uppercase text-[#A24F61] font-bold block">
            WE EAGERLY LOOK FORWARD TO CELEBRATING WITH YOU
          </span>
          <h3 className="font-script text-5xl sm:text-6xl text-[#A24F61] font-normal my-2 tracking-wide">
            Thank You!
          </h3>

          {/* Full-Size Couple Photo in Elegant Royal Arch Shape */}
          <div className="mt-7 mx-auto max-w-[340px] relative group">
            {/* Subtle gold/rose glow behind frame */}
            <div className="absolute -inset-1.5 bg-gradient-to-b from-[#e5c568]/40 to-[#A24F61]/25 rounded-t-[145px] rounded-b-[28px] blur-xs" />

            {/* Arched Photo Frame Container */}
            <div className="relative rounded-t-[140px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-[#faeff2]">
              <img
                src="/assets/aistudio/Image__8__ff8d6062.jfif"
                alt="Janki & Divyesh - Forever & Always"
                className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Bottom Dark Vignette with Gold/Rose Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="font-script text-3xl sm:text-4xl text-white font-normal drop-shadow-md block">
                  Janki &amp; Divyesh
                </span>
                <span className="text-[10px] tracking-[0.22em] text-[#fae8ec] uppercase font-description font-medium block mt-0.5">
                  Forever Begins Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};
