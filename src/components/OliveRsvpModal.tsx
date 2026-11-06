import React, { useState } from 'react';
import { X, Check, Mail } from 'lucide-react';
import { RsvpEntry } from '../types/wedding';

interface OliveRsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRsvpSubmitted: (entry: RsvpEntry) => void;
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
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [attendance, setAttendance] = useState('joyfully_accept');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const newRsvp: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim() || 'guest@example.com',
      guestCount,
      attendance,
      message: message.trim() || 'Heartiest congratulations Janaki & Divyesh!',
      submittedAt: 'Just now',
    };

    onRsvpSubmitted(newRsvp);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setMessage('');
  };

  const firstName = fullName.split(' ')[0] || 'Dear Guest';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#faf6f2] border-2 border-[#A24F61]/35 rounded-3xl p-6 shadow-2xl overflow-hidden font-description max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#faeff2] hover:bg-[#f3dbe1] text-[#A24F61] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#A24F61] text-white flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-script text-4xl text-[#A24F61]">Thank You!</h3>
            <p className="font-description text-xs text-[#6e3745] max-w-[280px] mx-auto leading-relaxed">
              {attendance === 'joyfully_accept'
                ? `Your RSVP has been joyfully received, ${firstName}. We eagerly look forward to celebrating with you on December 16, 2026!`
                : `Thank you for letting us know, ${firstName}. You will be dearly missed on our special day.`}
            </p>

            <div className="mt-5 flex gap-2 justify-center">
              <button
                type="button"
                onClick={onOpenGuestbook}
                className="py-2 px-4 rounded-full bg-[#A24F61] text-white text-xs font-primary font-bold shadow-xs hover:bg-[#873a4b] cursor-pointer"
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
              <p className="font-description text-[11px] text-[#7d3d4b] mt-0.5">
                Wedding of Janaki &amp; Divyesh · 16 December 2026
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
                placeholder="e.g. Bhavin & Pooja Patel"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#e2d0c8] text-xs font-primary text-[#2d1219] focus:outline-none focus:border-[#A24F61]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-primary font-semibold text-[#5c2432] block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. bhavin.patel@example.com"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#e2d0c8] text-xs font-primary text-[#2d1219] focus:outline-none focus:border-[#A24F61]"
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="text-[11px] font-primary font-semibold text-[#5c2432] block mb-1">
                Will you attend?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttendance('joyfully_accept')}
                  className={`py-2 px-3 rounded-xl text-xs font-primary font-semibold border transition-all cursor-pointer ${
                    attendance === 'joyfully_accept'
                      ? 'bg-[#A24F61] text-white border-[#A24F61] shadow-xs'
                      : 'bg-white text-[#6e3745] border-[#e2d0c8] hover:bg-[#faeff2]'
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('regretfully_decline')}
                  className={`py-2 px-3 rounded-xl text-xs font-primary font-semibold border transition-all cursor-pointer ${
                    attendance === 'regretfully_decline'
                      ? 'bg-[#A24F61] text-white border-[#A24F61] shadow-xs'
                      : 'bg-white text-[#6e3745] border-[#e2d0c8] hover:bg-[#faeff2]'
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-[11px] font-primary font-semibold text-[#5c2432] block mb-1">
                Warm Wishes for Janaki &amp; Divyesh
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send your love, blessings, and joyful messages..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#e2d0c8] text-xs font-primary text-[#2d1219] focus:outline-none focus:border-[#A24F61] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#A24F61] hover:bg-[#8e3f51] text-white font-primary font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer mt-2"
            >
              Confirm &amp; Send Wishes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
