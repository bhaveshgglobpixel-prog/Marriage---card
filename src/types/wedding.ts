export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isHighlighted?: boolean;
}

export interface VenueInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  imageUrl?: string;
  googleMapsUrl?: string;
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  email: string;
  guestCount: string;
  attendance: 'joyfully_accept' | 'regretfully_decline';
  message: string;
  submittedAt: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  primary: string; // e.g. #1b4332 (Royal Emerald)
  primaryDark: string; // e.g. #0d281e
  primaryLight: string; // e.g. #2d6a4f
  accentGold: string; // e.g. #c59b27
  accentGoldLight: string; // e.g. #e4c27a
  bgLight: string; // e.g. #f4f8f5 (Sage Ivory)
  bgCard: string; // e.g. #fbfdfb
  textDark: string; // e.g. #10261c
  textMuted: string; // e.g. #456354
  borderColor: string; // e.g. #b7d1c2
  badgeGradient: string;
}

export interface WeddingData {
  groomName: string;
  brideName: string;
  invitationKicker: string;
  invitationBody: string;
  eventDayOfWeek: string;
  eventDayNumber: string;
  eventMonthYear: string;
  eventTimeDescription: string;
  targetDateTimeIso: string; // ISO string for countdown calculation
  blessingsKicker: string;
  groomParents: string;
  groomParentsRole: string;
  brideParents: string;
  brideParentsRole: string;
  welcomeQuote: string;
  eventsSectionKicker: string;
  eventsSectionTitle: string;
  events: WeddingEvent[];
  venueSectionKicker: string;
  venueSectionTitle: string;
  venue: VenueInfo;
  rsvpKicker: string;
  rsvpDeadline: string;
  rsvpTitle: string;
  rsvpSubtext: string;
  footerEnquiryEmail: string;
  footerEnquiryPhone: string;
  theme?: ColorTheme;
}

