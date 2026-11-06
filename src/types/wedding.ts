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
  googleMapsUrl: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  primaryBg: string;
  surfaceBg: string;
  cardBg: string;
  accentGold: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  borderColor: string;
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
  targetDateTimeIso: string;
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
  theme: ColorTheme;
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  email: string;
  guestCount: string;
  attendance: string;
  message: string;
  submittedAt: string;
}
