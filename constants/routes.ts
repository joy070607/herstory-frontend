export const ROUTES = {
  install: "/install",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",

  home: "/home",
  liveCard: "/live-card",
  boardingPass: "/boarding-pass",
  journeyTimeline: "/journey",
  styleEngine: "/style",
  popupSpot: "/popup",
  smartCart: "/cart",
  terminalMap: "/terminal-map",

  autoCheckIn: "/check-in",
  vipFitting: "/fitting",
  fastCheckout: "/checkout",
  airportMap: "/airport-map",

  leatherCare: "/care",
  visetosMap: "/map",
  nomadMiles: "/miles",

  myPage: "/mypage",
  myPageEditProfile: "/mypage/edit-profile",
  myPagePasswordReset: "/mypage/password-reset",
  myPagePaymentMethods: "/mypage/payment-methods",
  myPagePassportInfo: "/mypage/passport-info",
  myPagePassportEdit: "/mypage/passport-info/edit",
  myPagePassportCompanion: "/mypage/passport-info/companion",
  myPageCoupons: "/mypage/coupons",
  myPageJourneyHistory: "/mypage/journey-history",
  myPageMilesHistory: "/mypage/miles-history",
  myPagePickupSchedule: "/mypage/pickup-schedule",
  myPageInquiry: "/mypage/inquiry",
  myPageTerms: "/mypage/terms",
  myPageFaq: "/mypage/faq",
} as const;

export type RouteKey = keyof typeof ROUTES;
