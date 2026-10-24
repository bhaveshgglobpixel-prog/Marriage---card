import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Mail, Sparkles } from 'lucide-react';
import { RsvpEntry } from '../types/wedding';

interface OliveRsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRsvpSubmitted: (rsvp: RsvpEntry) => void;
  onOpenGuestbook: () => void;
}

export const OliveRsvpModal: React.FC<OliveRsvpModalProps> = ({
  isOpen,
  onClose,
  onRsvpSubmitted,
  onOpenGuestbook,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState<'1' | '2' | '3+'>('1');
  const [attendance, setAttendance] = useState<'joyfully_accept' | 'regretfully_decline'>('joyfully_accept');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSubmitting(true);
    const newRsvp: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim() || 'guest@example.com',
      guestCount: `${guestCount} Guest(s)`,
      attendance,
      message: message.trim(),
      submittedAt: 'Just now',
    };

    setTimeout(() => {
      onRsvpSubmitted(newRsvp);
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A24F61', '#c46a7f', '#ffffff', '#e5b869'],
        });
      } catch {
        // safe fallback
      }
    }, 500);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setGuestCount('1');
    setAttendance('joyfully_accept');
    setSubmitted(false);
  };

  const firstName = fullName.trim().split(' ')[0] || 'Friend';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#faf6f2] border-2 border-[#A24F61]/35 rounded-3xl p-6 shadow-2xl overflow-hidden text-center">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#faeff2] hover:bg-[#f6dfe4] text-[#A24F61] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#A24F61]/15 text-[#A24F61] flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-script text-4xl text-[#A24F61]">Thank You!</h3>
            <p className="font-description text-xs text-[#6e3745] max-w-[280px] mx-auto leading-relaxed">
              {attendance === 'joyfully_accept'
                ? `Your RSVP has been joyfully received, ${firstName}. We eagerly look forward to celebrating with you on December 15 & 16, 2026!`
                : `Thank you for letting us know, ${firstName}. You will be dearly missed on our special day.`}
            </p>

            <div className="mt-5 flex gap-2 justify-center">
              <button
                type="button"
                onClick={onOpenGuestbook}
                className="py-2 px-4 rounded-full bg-[#A24F61] text-white text-xs font-primary font-bold shadow-xs hover:bg-[#8e3f51] cursor-pointer"
              >
                View Guest Wishes
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-2 px-4 rounded-full border border-[#A24F61] text-[#A24F61] text-xs font-primary font-medium hover:bg-[#faeff2] cursor-pointer"
              >
                Submit Another RSVP
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-4 pt-2">
            <div className="text-center pb-2 border-b border-[#ebdcd2]">
              <div className="w-8 h-8 mx-auto text-[#A24F61] flex items-center justify-center mb-1">
                <Mail className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-script text-3xl text-[#A24F61]">RSVP Confirmation</h3>
              <p className="font-description text-[11px] text-[#8c4959] mt-0.5">
                Wedding of Divyesh &amp; Janki · 15 &amp; 16 December 2026
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="text-[11px] font-primary font-semibold text-[#5c2432] block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white border border-[#e8ccd3] rounded-xl px-3.5 py-2.5 text-xs text-[#2d1219] font-description outline-none focus:border-[#A24F61]"
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="text-[11px] font-primary font-semibold text-[#5c2432] block mb-1.5">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttendance('joyfully_accept')}
                  className={`py-2 px-3 rounded-xl text-xs font-primary transition-all cursor-pointer ${
                    attendance === 'joyfully_accept'
                      ? 'bg-[#A24F61] text-white font-bold shadow-xs'
                      : 'bg-white border border-[#e8ccd3] text-[#A24F61] hover:bg-[#faeff2]'
                  }`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('regretfully_decline')}
                  className={`py-2 px-3 rounded-xl text-xs font-primary transition-all cursor-pointer ${
                    attendance === 'regretfully_decline'
                      ? 'bg-[#873a4b] text-white font-bold shadow-xs'
                      : 'bg-white border border-[#e8ccd3] text-[#873a4b] hover:bg-[#faeff2]'
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className="text-[11px] font-primary font-semibold text-[#5c2432] block mb-1">
                Number of Guests
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1', '2', '3+'] as const).map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setGuestCount(cnt)}
                    className={`py-1.5 rounded-xl text-xs font-primary transition-all cursor-pointer ${
                      guestCount === cnt
                        ? 'bg-[#A24F61] text-white font-bold shadow-xs'
                        : 'bg-white border border-[#e8ccd3] text-[#A24F61] hover:bg-[#faeff2]'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message / Wishes */}
            <div>
              <label className="text-[11px] font-primary font-semibold text-[#5c2432] block mb-1">
                Heartfelt Wishes for the Couple (Optional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave your blessings and heartfelt message..."
                className="w-full bg-white border border-[#e8ccd3] rounded-xl px-3.5 py-2 text-xs text-[#2d1219] font-description outline-none focus:border-[#A24F61] resize-none"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#A24F61] hover:bg-[#8e3f51] text-white font-primary font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Sending Confirmation...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Send RSVP</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
