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

  autoCheckIn: "/check-in",
  vipFitting: "/fitting",
  fastCheckout: "/checkout",
  reEntry: "/re-entry",

  leatherCare: "/care",
  visetosMap: "/map",
  nomadMiles: "/miles",

  staffTablet: "/staff",
} as const;

export type RouteKey = keyof typeof ROUTES;
