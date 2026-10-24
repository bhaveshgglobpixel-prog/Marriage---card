import React, { useState } from 'react';
import { WeddingData } from '../types/wedding';
import { X, Save, RefreshCw, Plus, Trash2 } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: WeddingData;
  onSave: (data: WeddingData) => void;
  onResetToDefault: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  onResetToDefault,
}) => {
  const [formData, setFormData] = useState<WeddingData>({ ...initialData });

  if (!isOpen) return null;

  const handleTextChange = (field: keyof WeddingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVenueChange = (field: keyof WeddingData['venue'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      venue: { ...prev.venue, [field]: value },
    }));
  };

  const handleEventChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedEvents = [...prev.events];
      updatedEvents[index] = { ...updatedEvents[index], [field]: value };
      return { ...prev, events: updatedEvents };
    });
  };

  const handleToggleHighlight = (index: number) => {
    setFormData((prev) => {
      const updatedEvents = prev.events.map((ev, i) => ({
        ...ev,
        isHighlighted: i === index,
      }));
      return { ...prev, events: updatedEvents };
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fcf9f2] border-2 border-[#d6be94] rounded-3xl p-6 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#deb877]/50">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-royal uppercase text-[#8c6f4b] font-semibold">
              Live Customizer
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-[#2a1c12]">
              Edit Wedding Invitation Card
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f4e6ce] hover:bg-[#ebd5b5] text-[#6d4e28] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Fields */}
        <div className="overflow-y-auto space-y-5 py-4 pr-1 flex-1">
          {/* Couple Names */}
          <div>
            <h4 className="text-xs font-royal font-bold text-[#8c6f4b] uppercase tracking-wider mb-2">
              Couple Details
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Groom Name
                </label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => handleTextChange('groomName', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Bride Name
                </label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => handleTextChange('brideName', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Date Badge */}
          <div>
            <h4 className="text-xs font-royal font-bold text-[#8c6f4b] uppercase tracking-wider mb-2">
              Ceremony Date &amp; Time
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Day of Week
                </label>
                <input
                  type="text"
                  value={formData.eventDayOfWeek}
                  onChange={(e) => handleTextChange('eventDayOfWeek', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Day Number
                </label>
                <input
                  type="text"
                  value={formData.eventDayNumber}
                  onChange={(e) => handleTextChange('eventDayNumber', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Month &amp; Year
                </label>
                <input
                  type="text"
                  value={formData.eventMonthYear}
                  onChange={(e) => handleTextChange('eventMonthYear', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
            </div>
            <div className="mt-2.5">
              <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                Time Description
              </label>
              <input
                type="text"
                value={formData.eventTimeDescription}
                onChange={(e) => handleTextChange('eventTimeDescription', e.target.value)}
                className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
              />
            </div>
          </div>

          {/* Parents & Blessings */}
          <div>
            <h4 className="text-xs font-royal font-bold text-[#8c6f4b] uppercase tracking-wider mb-2">
              Family Blessings
            </h4>
            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Groom's Parents
                </label>
                <input
                  type="text"
                  value={formData.groomParents}
                  onChange={(e) => handleTextChange('groomParents', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Bride's Parents
                </label>
                <input
                  type="text"
                  value={formData.brideParents}
                  onChange={(e) => handleTextChange('brideParents', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Welcome Message / Quote
                </label>
                <textarea
                  rows={2}
                  value={formData.welcomeQuote}
                  onChange={(e) => handleTextChange('welcomeQuote', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-xs font-royal font-bold text-[#8c6f4b] uppercase tracking-wider mb-2">
              Wedding Celebrations Schedule
            </h4>
            <div className="space-y-3">
              {formData.events.map((ev, idx) => (
                <div key={ev.id} className="p-3 bg-white border border-[#d6be94] rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#5e411b]">Event #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleHighlight(idx)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                        ev.isHighlighted
                          ? 'bg-[#ba8c3e] text-white font-bold'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {ev.isHighlighted ? 'Highlighted (Gold Card)' : 'Set as Main Ceremony'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Title"
                      value={ev.title}
                      onChange={(e) => handleEventChange(idx, 'title', e.target.value)}
                      className="border border-stone-200 rounded-lg p-1.5 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Date (e.g. March 15)"
                      value={ev.date}
                      onChange={(e) => handleEventChange(idx, 'date', e.target.value)}
                      className="border border-stone-200 rounded-lg p-1.5 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Time (e.g. 4:00 PM)"
                      value={ev.time}
                      onChange={(e) => handleEventChange(idx, 'time', e.target.value)}
                      className="border border-stone-200 rounded-lg p-1.5 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={ev.location}
                      onChange={(e) => handleEventChange(idx, 'location', e.target.value)}
                      className="border border-stone-200 rounded-lg p-1.5 text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Short description"
                    value={ev.description}
                    onChange={(e) => handleEventChange(idx, 'description', e.target.value)}
                    className="w-full border border-stone-200 rounded-lg p-1.5 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Venue & Location */}
          <div>
            <h4 className="text-xs font-royal font-bold text-[#8c6f4b] uppercase tracking-wider mb-2">
              Main Venue Information
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={formData.venue.name}
                  onChange={(e) => handleVenueChange('name', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  City &amp; State
                </label>
                <input
                  type="text"
                  value={`${formData.venue.city}, ${formData.venue.state}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(',');
                    handleVenueChange('city', parts[0]?.trim() || '');
                    if (parts[1]) handleVenueChange('state', parts[1].trim());
                  }}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-royal font-bold text-[#8c6f4b] uppercase tracking-wider mb-2">
              Enquiry Contacts
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Enquiry Email
                </label>
                <input
                  type="email"
                  value={formData.footerEnquiryEmail}
                  onChange={(e) => handleTextChange('footerEnquiryEmail', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#7d6349] block mb-1">
                  Enquiry Phone
                </label>
                <input
                  type="text"
                  value={formData.footerEnquiryPhone}
                  onChange={(e) => handleTextChange('footerEnquiryPhone', e.target.value)}
                  className="w-full bg-white border border-[#d6be94] rounded-xl px-3 py-2 text-xs text-[#2a1c12] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#deb877]/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetToDefault}
            className="flex items-center gap-1.5 text-xs text-[#8c6f4b] hover:text-[#5e411b] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Aryan &amp; Eva</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl text-xs font-medium text-[#7c5625] bg-[#faedd6] border border-[#d9bf92] hover:bg-[#f6e4c5]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 py-2 px-5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#ba8c3e] to-[#a8762b] hover:from-[#c89848] hover:to-[#b68233] shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
