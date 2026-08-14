export const ROUTES = {
  login: "/login",

  hub: "/hub",
  liveCard: "/live-card",
  boardingPass: "/boarding-pass",
  journeyTimeline: "/journey",
  climateGuide: "/climate",
  styleEngine: "/style",
  popupSpot: "/popup",
  smartCart: "/cart",

  autoCheckIn: "/airport/check-in",
  vipFitting: "/airport/fitting",
  fastCheckout: "/airport/checkout",
  reEntry: "/airport/re-entry",

  leatherCare: "/care",
  visetosMap: "/map",
  nomadMiles: "/miles",

  staffTablet: "/staff",
} as const;

export type RouteKey = keyof typeof ROUTES;
