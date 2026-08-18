export const ROUTES = {
  login: "/login",
  signup: "/signup",

  home: "/home",
  liveCard: "/live-card",
  boardingPass: "/boarding-pass",
  journeyTimeline: "/journey",
  climateGuide: "/climate",
  styleEngine: "/style",
  popupSpot: "/popup",
  smartCart: "/cart",

  autoCheckIn: "/check-in",
  vipFitting: "/fitting",
  fastCheckout: "/checkout",
  reEntry: "/re-entry",

  leatherCare: "/care",
  visetosMap: "/map",
  nomadMiles: "/miles",

  staffTablet: "/staff",
  choiceFitPreview: "/staff/choice-fit",
} as const;

export type RouteKey = keyof typeof ROUTES;
