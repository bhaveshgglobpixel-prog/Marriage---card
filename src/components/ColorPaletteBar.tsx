import React, { useState } from 'react';
import { ColorTheme } from '../types/wedding';
import { colorThemes } from '../data/weddingData';
import { Palette, Copy, Check, MailOpen } from 'lucide-react';

interface ColorPaletteBarProps {
  currentTheme: ColorTheme;
  onSelectTheme: (theme: ColorTheme) => void;
  onReplayEnvelope: () => void;
}

export const ColorPaletteBar: React.FC<ColorPaletteBarProps> = ({
  currentTheme,
  onSelectTheme,
  onReplayEnvelope,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const keyColorCodes = [
    { label: 'Emerald Primary', code: currentTheme.primary },
    { label: 'Metallic Gold', code: currentTheme.accentGold },
    { label: 'Sage Canvas', code: currentTheme.bgLight },
    { label: 'Deep Forest', code: currentTheme.textDark },
  ];

  return (
    <div className="w-full py-2.5 px-3 sm:px-6 bg-[#0f2319] border-b border-[#234b38] text-[#e3ece7] no-print">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Preset Palette Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[#a1c4b2] font-medium shrink-0">
            <Palette className="w-3.5 h-3.5 text-[#c59b27]" />
            <span className="hidden sm:inline">Green Palette:</span>
          </div>

          <div className="flex items-center gap-1 bg-[#153325] p-1 rounded-xl border border-[#2d5c45]">
            {colorThemes.map((theme) => {
              const isSelected = theme.id === currentTheme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onSelectTheme(theme)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#1b4332] text-white shadow-xs border border-[#458064]'
                      : 'text-[#9ab7a7] hover:text-white hover:bg-[#1a3d2c]'
                  }`}
                  title={theme.name}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/30"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span className="truncate max-w-[110px] sm:max-w-none">
                    {theme.name.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visible Color Codes Display */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden lg:flex items-center gap-2 bg-[#153325] px-2.5 py-1 rounded-xl border border-[#2d5c45]">
            {keyColorCodes.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleCopy(item.code)}
                className="flex items-center gap-1 text-[11px] hover:text-white transition-colors group"
                title={`Click to copy ${item.label} (${item.code})`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-xs border border-white/20"
                  style={{ backgroundColor: item.code }}
                />
                <span className="font-mono text-[#d1e4da]">{item.code}</span>
                {copiedCode === item.code ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
                )}
              </button>
            ))}
          </div>

          {/* Re-open / Replay Envelope Opening Button */}
          <button
            type="button"
            onClick={onReplayEnvelope}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#10291e] bg-gradient-to-r from-[#d8ad47] to-[#b28525] hover:from-[#e5bd57] hover:to-[#bf922e] transition-all shadow-xs"
          >
            <MailOpen className="w-3.5 h-3.5" />
            <span>Replay Envelope</span>
          </button>
        </div>

      </div>
    </div>
  );
};
