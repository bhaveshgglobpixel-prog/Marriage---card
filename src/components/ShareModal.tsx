import React, { useState } from 'react';
import { X, Copy, Check, Share2, Printer, MessageCircle } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareMessage = `🌸 You are warmly invited to the Wedding Celebration of ${data.groomName} & ${data.brideName} on ${data.eventMonthYear} in ${data.venue.city}! View the digital invitation here: ${currentUrl}`;
  const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

  const copyTextToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback
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

  const handleCopyLink = async () => {
    await copyTextToClipboard(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#faf6f2] border-2 border-[#A24F61]/35 rounded-3xl p-6 shadow-2xl overflow-hidden font-description">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#A24F61]/20">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-primary uppercase text-[#A24F61] font-bold">
              Share Celebration
            </span>
            <h3 className="font-script text-3xl sm:text-4xl text-[#A24F61]">
              Send Invitation
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

        {/* Share Options */}
        <div className="py-4 space-y-3">
          {/* WhatsApp Direct Share */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 text-[#0f6830] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-sm">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#1f2937] font-primary">Share via WhatsApp</div>
                <div className="text-xs text-[#4b5563] font-description">Send directly to family &amp; friends</div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#16a34a] font-primary">Send &rarr;</span>
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#faeff2] border border-[#ebdcd2] text-[#2d1219] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A24F61]/15 text-[#A24F61] flex items-center justify-center">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#1f2937] font-primary">
                  {copied ? 'Link Copied!' : 'Copy Invitation Link'}
                </div>
                <div className="text-xs text-[#6b7280] font-description">Paste in messages, bio, or emails</div>
              </div>
            </div>
            <span className="text-xs text-[#A24F61] font-bold font-primary">
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>

          {/* Print Card */}
          <button
            type="button"
            onClick={handlePrint}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#faeff2] border border-[#ebdcd2] text-[#2d1219] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A24F61]/15 text-[#A24F61] flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#1f2937] font-primary">Print / Save as PDF</div>
                <div className="text-xs text-[#6b7280] font-description">High-resolution physical keepsake</div>
              </div>
            </div>
            <Share2 className="w-4 h-4 text-[#A24F61]" />
          </button>
        </div>

        {/* Preview message preview box */}
        <div className="p-3 bg-[#faeff2] rounded-xl border border-[#ebd0d6] text-[11px] text-[#6e3745] leading-relaxed font-description text-left">
          <p className="font-semibold text-[#2d1219] mb-1 font-primary">Preview WhatsApp Message:</p>
          "{shareMessage}"
        </div>
      </div>
    </div>
  );
};
