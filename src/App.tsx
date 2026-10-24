/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DirectVideoIntro } from './components/DirectVideoIntro';
import { OliveWeddingCard } from './components/OliveWeddingCard';
import { OliveRsvpModal } from './components/OliveRsvpModal';
import { GuestbookModal } from './components/GuestbookModal';
import { ShareModal } from './components/ShareModal';
import { initialWeddingData, sampleRsvps } from './data/weddingData';
import { RsvpEntry } from './types/wedding';
import { Film } from 'lucide-react';
import { FallingPetals } from './components/FallingPetals';
import { weddingAudio } from './utils/weddingAudio';

export default function App() {
  // Video plays directly on load without requiring any prior click
  const [isPlayingIntro, setIsPlayingIntro] = useState(true);

  // Music plays by default ("Music Dufulit Chalu he rehna chahea") without CTA button
  useEffect(() => {
    // Attempt playback immediately
    weddingAudio.play();

    // Browser audio policy requires a user gesture (tap, click, scroll) to unblock Web Audio
    const handleGesture = () => {
      weddingAudio.play();
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('scroll', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  // Modals state
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // RSVP state for Divyesh & Janki
  const [rsvps, setRsvps] = useState<RsvpEntry[]>(() => {
    const saved = localStorage.getItem('divyesh_janki_rsvps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return sampleRsvps;
      }
    }
    return [
      {
        id: 'rsvp-1',
        fullName: 'Bhavin & Pooja Patel',
        email: 'bhavin.patel@example.com',
        guestCount: '2 Guest(s)',
        attendance: 'joyfully_accept',
        message: 'Heartiest congratulations Divyesh & Janki! Counting down the days to celebrate in Surat.',
        submittedAt: 'Yesterday',
      },
      {
        id: 'rsvp-2',
        fullName: 'Rahul & Sneha Mehta',
        email: 'rahul.mehta@example.com',
        guestCount: '2 Guest(s)',
        attendance: 'joyfully_accept',
        message: 'Wishing you both eternal happiness, prosperity, and love. See you on the big day!',
        submittedAt: '2 days ago',
      },
    ];
  });

  const handleRsvpSubmitted = (newRsvp: RsvpEntry) => {
    setRsvps((prev) => {
      const updated = [newRsvp, ...prev];
      localStorage.setItem('divyesh_janki_rsvps', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#EFE6DD] text-[#2d161d] relative selection:bg-[#A24F61]/25 selection:text-[#5c1c2b] flex flex-col items-center">
      
      {/* 1. DIRECT VIDEO INTRO ON LOAD (Plays envelope opening immediately without prior click) */}
      {isPlayingIntro && (
        <DirectVideoIntro
          onComplete={() => {
            setIsPlayingIntro(false);
            // Autoplay music upon video complete when user is engaged
            weddingAudio.play();
          }}
        />
      )}

      {/* 2. AMBIENT FALLING ROSE PETALS & GOLD SPARKLES ANIMATION ACROSS FULL PAGE */}
      <FallingPetals />

      {/* Main Wedding Card Viewport (Flush to top, edge-to-edge without gaps on sides or top) */}
      <main className="w-full flex-1 flex flex-col items-center justify-start p-0 m-0 relative z-10">
        <OliveWeddingCard
          onOpenRsvpModal={() => setIsRsvpOpen(true)}
          onOpenGuestbook={() => setIsGuestbookOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* Quiet Replay Video Floating Pill at the very bottom */}
        <div className="mt-8 mb-10 text-center no-print">
          <button
            type="button"
            onClick={() => {
              weddingAudio.pause();
              setIsPlayingIntro(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A24F61] hover:bg-[#8e3f51] text-white text-xs font-primary font-bold border border-[#c4687d] transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Film className="w-3.5 h-3.5 text-[#fce4ea]" />
            <span>Replay Envelope Opening Video</span>
          </button>
        </div>
      </main>

      {/* Interactive Modals */}
      <OliveRsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onRsvpSubmitted={handleRsvpSubmitted}
        onOpenGuestbook={() => {
          setIsRsvpOpen(false);
          setIsGuestbookOpen(true);
        }}
      />

      <GuestbookModal
        isOpen={isGuestbookOpen}
        onClose={() => setIsGuestbookOpen(false)}
        rsvps={rsvps}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        data={{
          ...initialWeddingData,
          groomName: 'Divyesh',
          brideName: 'Janki',
          eventMonthYear: 'December 15 & 16, 2026',
          venue: {
            ...initialWeddingData.venue,
            name: 'Bapa Sitaram Palace Party Plot',
            city: 'Surat, Gujarat, India',
            googleMapsUrl:
              'https://www.google.com/maps/place/Bapa+Sitaram+Palace+Party+Plot/@21.2139181,72.9186267,17z/data=!3m1!4b1!4m6!3m5!1s0x3be04569fa306223:0x11723511c5607f10!8m2!3d21.2139181!4d72.9186267!16s%2Fg%2F11ylpm5z8v?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
          },
        }}
      />
    </div>
  );
}
