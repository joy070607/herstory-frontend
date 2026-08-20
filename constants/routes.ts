export const ROUTES = {
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

  autoCheckIn: "/check-in",
  vipFitting: "/fitting",
  fastCheckout: "/checkout",
  reEntry: "/re-entry",
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
  myPageInquiry: "/mypage/inquiry",
  myPageTerms: "/mypage/terms",
  myPageFaq: "/mypage/faq",

  staffTablet: "/staff",
  choiceFitPreview: "/staff/choice-fit",
} as const;

export type RouteKey = keyof typeof ROUTES;
