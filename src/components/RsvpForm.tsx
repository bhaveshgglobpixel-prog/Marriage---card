import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HeartAccent } from './Ornaments';
import { RsvpEntry } from '../types/wedding';
import { Heart, Sparkles, CheckCircle, MessageSquare } from 'lucide-react';

interface RsvpFormProps {
  deadlineText?: string;
  onRsvpSubmitted: (rsvp: RsvpEntry) => void;
  onOpenGuestbook: () => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({
  deadlineText = 'MARCH 1ST, 2025',
  onRsvpSubmitted,
  onOpenGuestbook,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState<'1 – 2' | '3 or more'>('1 – 2');
  const [attendance, setAttendance] = useState<'joyfully_accept' | 'regretfully_decline'>('joyfully_accept');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const newRsvp: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      guestCount,
      attendance,
      message: message.trim(),
      submittedAt: 'Just now',
    };

    setTimeout(() => {
      onRsvpSubmitted(newRsvp);
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory golden and crimson confetti explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#ba8c3e', '#e4c27a', '#ba2626', '#ffffff', '#ffd700'],
        });
      } catch {
        // Fallback gracefully
      }
    }, 600);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="py-6 sm:py-8">
      <div className="text-center mb-5">
        <span className="text-[10px] sm:text-xs tracking-[0.22em] text-[#9a7e58] font-royal uppercase font-medium">
          KINDLY REPLY BY {deadlineText}
        </span>
        <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2a1c12] tracking-wider mt-1.5">
          RSVP
        </h3>
        <HeartAccent className="my-2" />
        <p className="text-xs sm:text-sm text-[#6c543c] font-sans max-w-[340px] mx-auto mt-2 leading-relaxed">
          We would be delighted to celebrate with you. Please let us know if you will be joining us.
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#fcf8f0] border border-[#d8be94] rounded-2xl p-6 text-center shadow-md animate-fadeIn">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#ba8c3e]/15 text-[#ba8c3e] flex items-center justify-center mb-3">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2a1c12]">
            Thank You, {fullName.split(' ')[0]}!
          </h4>
          <p className="text-xs sm:text-sm text-[#6c543c] mt-2 font-sans">
            {attendance === 'joyfully_accept'
              ? 'Your RSVP has been joyfully received. We eagerly look forward to celebrating with you!'
              : 'Thank you for letting us know. You will be dearly missed on our special day.'}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-2.5 justify-center">
            <button
              type="button"
              onClick={onOpenGuestbook}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#ba8c3e] to-[#a8762b] shadow-sm hover:opacity-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>View Wishes Guestbook</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium text-[#7c5625] bg-[#faedd6] border border-[#d9bf92] hover:bg-[#f6e4c5]"
            >
              Submit Another RSVP
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1 text-left">
            <label className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#7a6045] block">
              Full Name
            </label>
            <div className="gold-input-box rounded-xl px-3.5 py-2.5 transition-all">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#2d1e13] placeholder-[#aa9378] font-sans"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1 text-left">
            <label className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#7a6045] block">
              Email Address
            </label>
            <div className="gold-input-box rounded-xl px-3.5 py-2.5 transition-all">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#2d1e13] placeholder-[#aa9378] font-sans"
              />
            </div>
          </div>

          {/* Number of Guests */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#7a6045] block">
              Number of Guests
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setGuestCount('1 – 2')}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  guestCount === '1 – 2'
                    ? 'bg-[#faedd6] border border-[#ba8c3e] text-[#2a1c12] shadow-sm font-semibold'
                    : 'bg-[#f6ecdc]/50 border border-[#e8d7bb] text-[#8c7457] hover:bg-[#f6ecdc]'
                }`}
              >
                1 – 2
              </button>
              <button
                type="button"
                onClick={() => setGuestCount('3 or more')}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  guestCount === '3 or more'
                    ? 'bg-[#faedd6] border border-[#ba8c3e] text-[#2a1c12] shadow-sm font-semibold'
                    : 'bg-[#f6ecdc]/50 border border-[#e8d7bb] text-[#8c7457] hover:bg-[#f6ecdc]'
                }`}
              >
                3 or more
              </button>
            </div>
          </div>

          {/* Will You Attend? */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#7a6045] block">
              Will You Attend?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAttendance('joyfully_accept')}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  attendance === 'joyfully_accept'
                    ? 'bg-gradient-to-r from-[#e4c27a] via-[#d8ad5a] to-[#c4943f] text-[#2a1c12] shadow-sm font-bold border border-[#b68936]'
                    : 'bg-[#f6ecdc]/50 border border-[#e8d7bb] text-[#8c7457] hover:bg-[#f6ecdc]'
                }`}
              >
                Joyfully Accept
              </button>
              <button
                type="button"
                onClick={() => setAttendance('regretfully_decline')}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  attendance === 'regretfully_decline'
                    ? 'bg-[#edd9c0] border border-[#b89569] text-[#2a1c12] shadow-sm font-bold'
                    : 'bg-[#f6ecdc]/50 border border-[#e8d7bb] text-[#8c7457] hover:bg-[#f6ecdc]'
                }`}
              >
                Regretfully Decline
              </button>
            </div>
          </div>

          {/* Wishes for the Couple */}
          <div className="space-y-1 text-left">
            <label className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#7a6045] block">
              Wishes for the Couple
            </label>
            <div className="gold-input-box rounded-xl p-3 transition-all">
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave your heartfelt message..."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#2d1e13] placeholder-[#aa9378] font-sans resize-none"
              />
            </div>
          </div>

          {/* Royal Emerald CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl font-sans font-semibold text-white text-sm sm:text-base tracking-wide bg-gradient-to-r from-[#1b4332] via-[#245b44] to-[#123326] hover:from-[#245b44] hover:to-[#1b4332] active:scale-[0.99] shadow-[0_4px_16px_rgba(27,67,50,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 border border-[#3b755c]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-[#e4c27a]" />
                Sending RSVP...
              </span>
            ) : (
              <span>Send RSVP</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
