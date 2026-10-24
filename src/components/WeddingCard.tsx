import React from 'react';
import { WeddingData, RsvpEntry, ColorTheme } from '../types/wedding';
import {
  DiamondDivider,
  HeartAccent,
  TopRoyalCrest,
  CornerLeafOrnament,
} from './Ornaments';
import { CountdownTimer } from './CountdownTimer';
import { VenueSection } from './VenueSection';
import { RsvpForm } from './RsvpForm';

interface WeddingCardProps {
  data: WeddingData;
  theme: ColorTheme;
  onRsvpSubmitted: (rsvp: RsvpEntry) => void;
  onOpenGuestbook: () => void;
}

export const WeddingCard: React.FC<WeddingCardProps> = ({
  data,
  theme,
  onRsvpSubmitted,
  onOpenGuestbook,
}) => {
  return (
    <div className="relative mx-auto w-full max-w-[460px] sm:max-w-[520px] print-card transition-all duration-300">
      
      {/* Clean Luxury Card Container with Emerald & Gold Parchment */}
      <div
        className="relative rounded-[28px] sm:rounded-[36px] shadow-[0_20px_50px_-10px_rgba(13,40,30,0.18)] p-3 sm:p-4 overflow-hidden border"
        style={{
          backgroundColor: theme.bgLight,
          borderColor: theme.borderColor,
        }}
      >
        {/* Inner Delicate Double Border */}
        <div
          className="relative rounded-[22px] sm:rounded-[28px] p-5 sm:p-8 text-center border"
          style={{
            borderColor: `${theme.accentGold}60`,
            backgroundColor: `${theme.bgCard}f0`,
          }}
        >
          {/* Top Corner Leaf Accents (Botanical Emerald) */}
          <CornerLeafOrnament position="top-left" color={theme.primaryLight} />
          <CornerLeafOrnament position="top-right" color={theme.primaryLight} />

          {/* ================= HEADER SECTION ================= */}
          <div className="pt-2 pb-6">
            <TopRoyalCrest className="mb-4" color={theme.accentGold} />

            <span
              className="text-[10px] sm:text-[11px] tracking-[0.26em] font-royal uppercase font-semibold block mb-4"
              style={{ color: theme.textMuted }}
            >
              {data.invitationKicker}
            </span>

            {/* Couple Names in Royal Emerald Green Typography */}
            <h1
              className="font-serif-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-none"
              style={{ color: theme.primary }}
            >
              {data.groomName}
            </h1>

            <div className="my-1.5 flex items-center justify-center">
              <span
                className="font-classic italic text-2xl sm:text-3xl font-normal"
                style={{ color: theme.accentGold }}
              >
                &amp;
              </span>
            </div>

            <h1
              className="font-serif-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-none"
              style={{ color: theme.primary }}
            >
              {data.brideName}
            </h1>

            <HeartAccent className="my-3" color={theme.accentGold} />

            {/* Invitation Request Copy */}
            <p
              className="font-classic text-sm sm:text-base max-w-[300px] mx-auto leading-relaxed"
              style={{ color: theme.textDark }}
            >
              {data.invitationBody}
            </p>

            {/* Royal Emerald & Gold Metallic Date Plaque Badge */}
            <div
              className="mt-5 mx-auto max-w-[210px] rounded-2xl p-4 sm:p-4.5 text-center shadow-lg transition-transform hover:scale-[1.02] border"
              style={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 50%, ${theme.primaryDark} 100%)`,
                borderColor: `${theme.accentGoldLight}80`,
                boxShadow: `0 8px 24px -4px ${theme.primary}50, inset 0 1px 1px rgba(255,255,255,0.3)`,
              }}
            >
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.24em] font-royal uppercase font-bold block"
                style={{ color: theme.accentGoldLight }}
              >
                {data.eventDayOfWeek}
              </span>
              <span className="font-serif-display text-3xl sm:text-4xl font-extrabold text-white block my-1 tracking-tight">
                {data.eventDayNumber}
              </span>
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.24em] font-royal uppercase font-bold block"
                style={{ color: theme.accentGoldLight }}
              >
                {data.eventMonthYear}
              </span>
            </div>

            {/* Event Time */}
            <p
              className="text-xs sm:text-sm font-classic italic mt-3.5"
              style={{ color: theme.textMuted }}
            >
              {data.eventTimeDescription}
            </p>
          </div>

          {/* ================= BLESSINGS SECTION ================= */}
          <div
            className="py-6 sm:py-8 border-t"
            style={{ borderColor: `${theme.borderColor}80` }}
          >
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.24em] font-royal uppercase font-semibold block mb-3"
              style={{ color: theme.textMuted }}
            >
              {data.blessingsKicker}
            </span>

            <div className="space-y-4">
              <div>
                <h4
                  className="font-serif-display text-base sm:text-lg font-bold"
                  style={{ color: theme.textDark }}
                >
                  {data.groomParents}
                </h4>
                <p
                  className="text-xs font-classic italic mt-0.5"
                  style={{ color: theme.textMuted }}
                >
                  {data.groomParentsRole}
                </p>
              </div>

              <DiamondDivider className="my-2" color={theme.accentGold} />

              <div>
                <h4
                  className="font-serif-display text-base sm:text-lg font-bold"
                  style={{ color: theme.textDark }}
                >
                  {data.brideParents}
                </h4>
                <p
                  className="text-xs font-classic italic mt-0.5"
                  style={{ color: theme.textMuted }}
                >
                  {data.brideParentsRole}
                </p>
              </div>
            </div>

            {/* Welcome Quote Card */}
            <div
              className="mt-6 rounded-2xl p-4 sm:p-5 shadow-xs border"
              style={{
                backgroundColor: `${theme.bgLight}cc`,
                borderColor: theme.borderColor,
              }}
            >
              <p
                className="font-classic text-xs sm:text-sm italic leading-relaxed text-center"
                style={{ color: theme.textDark }}
              >
                {data.welcomeQuote}
              </p>
            </div>
          </div>

          {/* ================= COUNTDOWN SECTION ================= */}
          <div
            className="border-t"
            style={{ borderColor: `${theme.borderColor}80` }}
          >
            <CountdownTimer targetDateIso={data.targetDateTimeIso} />
          </div>

          {/* ================= WEDDING EVENTS SECTION ================= */}
          <div
            className="py-6 sm:py-8 border-t text-left"
            style={{ borderColor: `${theme.borderColor}80` }}
          >
            <div className="text-center mb-5">
              <span
                className="text-[10px] sm:text-xs tracking-[0.25em] font-royal uppercase font-medium"
                style={{ color: theme.textMuted }}
              >
                {data.eventsSectionKicker}
              </span>
              <h3
                className="font-serif-display text-2xl sm:text-3xl font-bold mt-1"
                style={{ color: theme.primary }}
              >
                {data.eventsSectionTitle}
              </h3>
              <DiamondDivider className="mt-3 mb-5" color={theme.accentGold} />
            </div>

            <div className="space-y-3 sm:space-y-3.5">
              {data.events.map((event) => {
                const isHighlight = event.isHighlighted;
                return (
                  <div
                    key={event.id}
                    className={`rounded-2xl p-4 sm:p-4.5 transition-all duration-300 border ${
                      isHighlight
                        ? 'shadow-md transform hover:-translate-y-0.5'
                        : 'shadow-xs hover:shadow-sm'
                    }`}
                    style={
                      isHighlight
                        ? {
                            backgroundColor: `${theme.bgLight}`,
                            borderColor: theme.primary,
                            boxShadow: `0 4px 15px -2px ${theme.primary}25`,
                          }
                        : {
                            backgroundColor: '#ffffff',
                            borderColor: theme.borderColor,
                          }
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="font-serif-display text-base sm:text-lg font-bold tracking-tight"
                        style={{ color: isHighlight ? theme.primary : theme.textDark }}
                      >
                        {event.title}
                      </h4>
                      <span
                        className="text-xs font-classic font-semibold shrink-0 pt-0.5"
                        style={{ color: theme.accentGold }}
                      >
                        {event.date}
                      </span>
                    </div>

                    <p
                      className="text-xs sm:text-sm font-sans font-medium mt-1"
                      style={{ color: theme.textDark }}
                    >
                      {event.time} — {event.location}
                    </p>

                    <p
                      className="text-xs font-sans mt-1.5 leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= VENUE SECTION ================= */}
          <div
            className="border-t"
            style={{ borderColor: `${theme.borderColor}80` }}
          >
            <VenueSection
              venue={data.venue}
              sectionKicker={data.venueSectionKicker}
              sectionTitle={data.venueSectionTitle}
              weddingDateIso={data.targetDateTimeIso}
            />
          </div>

          {/* ================= RSVP SECTION ================= */}
          <div
            className="border-t"
            style={{ borderColor: `${theme.borderColor}80` }}
          >
            <RsvpForm
              deadlineText={data.rsvpDeadline}
              onRsvpSubmitted={onRsvpSubmitted}
              onOpenGuestbook={onOpenGuestbook}
            />
          </div>

          {/* ================= FOOTER SECTION ================= */}
          <div
            className="pt-6 pb-4 border-t text-center relative"
            style={{ borderColor: `${theme.borderColor}80` }}
          >
            <DiamondDivider className="mb-3" color={theme.accentGold} />

            <h4
              className="font-serif-display text-lg sm:text-xl font-bold"
              style={{ color: theme.primary }}
            >
              {data.groomName} &amp; {data.brideName}
            </h4>

            <p
              className="text-xs font-sans mt-1"
              style={{ color: theme.textMuted }}
            >
              March 15, 2025 · Jaipur, India
            </p>

            <p
              className="text-[11px] font-sans mt-1.5"
              style={{ color: theme.textMuted }}
            >
              For enquiries:{' '}
              <a
                href={`mailto:${data.footerEnquiryEmail}`}
                className="underline hover:opacity-80"
              >
                {data.footerEnquiryEmail}
              </a>{' '}
              ·{' '}
              <a
                href={`tel:${data.footerEnquiryPhone}`}
                className="underline hover:opacity-80"
              >
                {data.footerEnquiryPhone}
              </a>
            </p>

            {/* Bottom Corner Leaf Accents */}
            <CornerLeafOrnament position="bottom-left" color={theme.primaryLight} />
            <CornerLeafOrnament position="bottom-right" color={theme.primaryLight} />
          </div>

        </div>
      </div>
    </div>
  );
};
