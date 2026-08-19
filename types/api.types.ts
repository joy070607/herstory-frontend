// OAS 스키마 그대로 옮겨오는 타입 정의 위치

export interface Member {
  id: string;
  name: string;
  email: string;
  vipTier: VipTier;
  nomadMiles: number;
}

export type VipTier = "SILVER" | "GOLD" | "PLATINUM" | "VIP";

// 실제 API 스키마 그대로 (POST /api/v1/auth/phone/send-code)
export interface SendPhoneCodeRequest {
  phone: string;
}

export interface SendPhoneCodeResponse {
  phone: string;
  verificationCode: string;
  message: string;
  expiresInSeconds: number;
}

// 실제 API 스키마 그대로 (POST /api/v1/auth/phone/verify-code)
export interface VerifyPhoneCodeRequest {
  phone: string;
  verificationCode: string;
}

export interface VerifyPhoneCodeResponse {
  phone: string;
  verified: boolean;
  message: string;
}

// 실제 API 응답 그대로 (POST /api/v1/auth/login)
export interface LoginResponseDto {
  memberId: number;
  email: string;
  name: string;
  vipTier: VipTier;
  nomadMiles: number;
  message?: string;
}

// 실제 API 스키마 그대로 (GET /api/v1/journeys/{journeyId})
export interface Journey {
  journeyId: number;
  memberId: number;
  memberName: string;
  pnr: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  flightStatus: FlightStatus;
  destinationWeather: string;
  recommendationReason: string;
}

export type FlightStatus = "SCHEDULED" | "BOARDING" | "DELAYED" | "COMPLETED" | "CANCELLED";

export type PurchaseStatus = "PURCHASED" | "PENDING_REENTRY" | "ABANDONED";

// 실제 API 스키마 그대로 (POST /api/v1/journey/scan)
// 탑승권 OCR 스캔(rawOcrText) 또는 PNR 직접 입력, 두 경로 중 하나로 여정을 생성합니다.
export interface JourneyScanRequest {
  memberId: number;
  pnr?: string;
  rawOcrText?: string;
  origin?: string;
  destination?: string;
}

export interface JourneyScanResponse {
  journeyId: number;
  pnr: string;
  origin: string;
  destination: string;
  departureDateTime: string;
}

// 실제 API 스키마 그대로 (POST /api/v1/auth/password/reset)
export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface PasswordResponse {
  success: boolean;
  message: string;
}

// 실제 API 스키마 그대로 (GET /api/v1/journey/live-card/{journeyId})
export interface LiveCardResponse {
  journeyId: number;
  pnr: string;
  flightNumber?: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  flightStatus: FlightStatus;
  gate?: string;
  currentStep: string;
  currentStepLabel: string;
  loungeLocation?: string;
  loungeGateLocation?: string;
  loungeWalkingMinutes: number;
  loungeWaitTime?: string;
  loungeWaitMinutes: number;
}

// 실제 API 스키마 그대로 (GET /api/v1/flight/lookup?flightNumber=)
// 인천국제공항공사 관제 AODB와 1분 단위로 동기화되는 실시간 항공편 조회
export interface FlightLookupResponse {
  flightNumber: string;
  airlineName: string;
  originCode: string;
  originName: string;
  originTerminal: string;
  destinationCode: string;
  destinationName: string;
  gate: string;
  flightStatus: FlightStatus;
  scheduledDepartureTime: string;
  estimatedDepartureTime: string;
  scheduledArrivalTime: string;
  scheduledDepartureFormatted: string;
  scheduledArrivalFormatted: string;
  flightDuration: string;
  checkinCounter: string;
  remark: string;
  delayMinutes: number;
  dataSource: string;
}

// 실제 API 스키마 그대로 (GET /api/v1/journey/analysis/{journeyId})
export interface TimelineItem {
  stepType: string;
  title: string;
  time: string;
  description: string;
  tipMessage: string;
  iconType: string;
}

// 실제 API 스키마 그대로 (GET /api/v1/style/{journeyId}/recommendations)
export type ProductCategory =
  | "WATERPROOF"
  | "BACKPACK"
  | "TRAVEL_BAG"
  | "ACCESSORY"
  | "LEATHER_CARE"
  | "READY_TO_WEAR"
  | "LIMITED_EDITION";

export interface JourneyAnalysisResponse {
  journeyId: number;
  destination: string;
  weatherInfo: string;
  rainProbability: string;
  climateSummary: string;
  recommendationReason: string;
  timeline: TimelineItem[];
  recommendedProducts: Product[];
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
  isVipExclusive: boolean;
}

// 실제 API 스키마 그대로 (POST /api/v1/cart/add, GET /api/v1/cart/my)
export type CartStatus = "IN_CART" | "CHECKED_OUT" | "CANCELLED";

export interface CartItemDetail {
  cartItemId: number;
  productId: number;
  productName: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartResponse {
  cartId: number;
  memberId: number;
  choiceFit: boolean;
  status: CartStatus;
  items: CartItemDetail[];
  totalPrice: number;
}

export interface HealthCheckResponse {
  status: "ok" | "waking" | "down";
}

// 실제 API 스키마 그대로 (GET /api/v1/miles/{memberId})
export interface MilesBalanceResponse {
  memberId: number;
  memberName: string;
  vipTier: string;
  totalMiles: number;
  expiringMiles: number;
  expiringDate: string;
}

export type MilesHistoryType =
  | "EARNED_PURCHASE"
  | "EARNED_FLIGHT"
  | "USED_BENEFIT"
  | "TRANSFERRED_OUT"
  | "TRANSFERRED_IN";

export interface MilesHistoryItem {
  historyId: number;
  title: string;
  amount: number;
  type: MilesHistoryType;
  balanceAfter: number;
  formattedDate: string;
  createdAt: string;
}

// 실제 API 스키마 그대로 (GET /api/v1/miles/history/{memberId})
export interface MilesHistoryResponse extends MilesBalanceResponse {
  items: MilesHistoryItem[];
}

// 실제 API 스키마 그대로 (POST /api/v1/miles/use)
export interface UseMilesRequest {
  memberId: number;
  amount: number;
  title: string;
  description?: string;
}

export interface UseMilesResponse {
  memberId: number;
  usedMiles: number;
  remainingMiles: number;
  title: string;
  message: string;
}

// 실제 API 스키마 그대로 (POST /api/v1/miles/transfer)
export interface TransferMilesRequest {
  fromMemberId: number;
  toEmail: string;
  amount: number;
}

export interface TransferMilesResponse {
  fromMemberId: number;
  fromMemberName: string;
  toMemberId: number;
  toMemberName: string;
  transferredMiles: number;
  remainingMiles: number;
  message: string;
}

// 실제 API 스키마 그대로 (POST /api/v1/miles/redeem)
export type BenefitCode = "LOUNGE_PASS" | "VIP_FITTING" | "LEATHER_CARE_KIT" | "AIRPORT_PICKUP";

export interface RedeemBenefitRequest {
  memberId: number;
  benefitCode: BenefitCode;
}

export interface RedeemBenefitResponse {
  memberId: number;
  benefitCode: BenefitCode;
  benefitName: string;
  couponCode: string;
  usedMiles: number;
  remainingMiles: number;
  message: string;
}

// 실제 API 스키마 그대로 (POST /api/v1/care/stamp-checkin)
export interface StampCheckInRequest {
  memberId: number;
  spotName: string;
}

export interface StampCheckInResponse {
  memberId: number;
  spotName: string;
  cityName: string;
  earnedMiles: number;
  totalMiles: number;
  message: string;
}

// 실제 API 스키마 그대로 (GET /api/v1/care/google-maps?destination=&brand=)
export interface CareGoogleMapsSpot {
  spotName: string;
  brand: string;
  address: string;
  locationType: string;
  latitude: number;
  longitude: number;
  walkingMinutes: number | null;
  careServiceAvailable: string;
}

// 실제 API 스키마 그대로 (GET /api/v1/style/popup-spots?memberId=)
export interface PopupSpotsResponse {
  destination: string;
  pushNotificationMessage: string;
  visetosSpots: CareGoogleMapsSpot[];
}

// 실제 API 스키마 그대로 (GET /api/v1/journey/apple-wallet-pass/{journeyId})
export interface AppleWalletPassField {
  key: string;
  label: string;
  value: string;
}

export interface AppleWalletPassResponse {
  passTypeIdentifier: string;
  serialNumber: string;
  teamIdentifier: string;
  organizationName: string;
  description: string;
  logoText: string;
  boardingPassDetails: {
    transitType: string;
    headerFields: AppleWalletPassField;
    primaryFields: AppleWalletPassField;
    secondaryFields: AppleWalletPassField;
    auxiliaryFields: AppleWalletPassField;
  };
  pkpassDownloadUrl: string;
}

// 실제 API 스키마 그대로 (POST /api/v1/store/check-in, SSE VIP_CHECKIN_EVENT 페이로드와 동일)
export type CheckInType = "BLE" | "NFC" | "QR" | "MANUAL";

export interface CheckInRequest {
  memberId: number;
  checkInType: CheckInType;
  qrCode?: string;
}

export interface CheckInResponse {
  visitId: number;
  memberId: number;
  memberName: string;
  vipTier: VipTier;
  checkInType: CheckInType;
  checkInStatus: "COMPLETED" | "PENDING" | "EXPIRED";
  assistantNotified: boolean;
  choiceFitRequested: boolean;
  welcomeCouponMessage: string;
  purchaseStatus: PurchaseStatus;
  visitedAt: string;
}

// 실제 API 스키마 그대로 (POST /api/v1/airport/{journeyId}/fitting)
export interface FittingResponse {
  journeyId: number;
  memberId: number;
  choiceFit: boolean;
  message: string;
}

// GET /api/v1/store/re-entry-options/{memberId}
export interface ReEntryResponse {
  memberId: number;
  memberName: string;
  purchaseStatus: PurchaseStatus;
  hasPendingCart: boolean;
  pendingCartItemCount: number;
  recommendedAction: string;
  availableOptions: string[];
}

// 실제 API 스키마 그대로 (POST /api/v1/order/checkout)
export interface CheckoutRequest {
  memberId: number;
  journeyId: number;
}

export interface OrderItemDetail {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  orderId: number;
  memberId: number;
  journeyId: number;
  totalAmount: number;
  dutyFreeDiscount: number;
  finalAmount: number;
  earnedMiles: number;
  orderStatus: string;
  items: OrderItemDetail[];
  createdAt: string;
}
