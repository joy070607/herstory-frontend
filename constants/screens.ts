import { ROUTES } from "./routes";

export const SCREENS = {
  "SCR-001": { name: "LoginPage", route: ROUTES.login },

  "SCR-101": { name: "NomadHubPage", route: ROUTES.hub },
  "SCR-102": { name: "LiveCardPage", route: ROUTES.liveCard },
  "SCR-201": { name: "BoardingPassPage", route: ROUTES.boardingPass },
  "SCR-202": { name: "JourneyTimelinePage", route: ROUTES.journeyTimeline },
  "SCR-203": { name: "ClimateGuidePage", route: ROUTES.climateGuide },
  "SCR-301": { name: "StyleEnginePage", route: ROUTES.styleEngine },
  "SCR-302": { name: "PopupSpotPage", route: ROUTES.popupSpot },
  "SCR-303": { name: "SmartCartPage", route: ROUTES.smartCart },

  "SCR-401": { name: "AutoCheckInPage", route: ROUTES.autoCheckIn },
  "SCR-402": { name: "VipFittingPage", route: ROUTES.vipFitting },
  "SCR-402-STAFF": { name: "StaffTabletPage", route: ROUTES.staffTablet },
  "SCR-403": { name: "FastCheckoutPage", route: ROUTES.fastCheckout },

  "SCR-501": { name: "LeatherCarePage", route: ROUTES.leatherCare },
  "SCR-502": { name: "VisetosMapPage", route: ROUTES.visetosMap },
  "SCR-503": { name: "NomadMilesPage", route: ROUTES.nomadMiles },
} as const;

export type ScreenId = keyof typeof SCREENS;
