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
  const shareMessage = `🌸 You are warmly invited to the Wedding Celebration of ${data.brideName} & ${data.groomName} on ${data.eventMonthYear} in ${data.venue.city}! View the digital invitation here: ${currentUrl}`;
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
            className="w-9 h-9 rounded-full bg-[#faeff2] hover:bg-[#f3dbe1] text-[#A24F61] flex items-center justify-center transition-colors cursor-pointer"
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
              <div className="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-primary font-bold text-xs text-[#0f6830] block">
                  Share via WhatsApp
                </span>
                <span className="text-[11px] text-[#4d785a] block">
                  Send directly to family &amp; friends
                </span>
              </div>
            </div>
            <Share2 className="w-4 h-4 text-[#25d366]" />
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#faeff2] border border-[#eed5db] text-[#A24F61] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#faeff2] text-[#A24F61] flex items-center justify-center">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <span className="font-primary font-bold text-xs text-[#2d1219] block">
                  {copied ? 'Link Copied to Clipboard!' : 'Copy Invitation Link'}
                </span>
                <span className="text-[11px] text-[#7d3d4b] block">
                  {currentUrl ? currentUrl.slice(0, 32) + '...' : 'Copy web link to share anywhere'}
                </span>
              </div>
            </div>
          </button>

          {/* Print / Save PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#faeff2] border border-[#eed5db] text-[#A24F61] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#faeff2] text-[#A24F61] flex items-center justify-center">
                <Printer className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-primary font-bold text-xs text-[#2d1219] block">
                  Print or Save as PDF
                </span>
                <span className="text-[11px] text-[#7d3d4b] block">
                  Download a printable keepsake version
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
