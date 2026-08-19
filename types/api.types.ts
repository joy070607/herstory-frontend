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
  flightNumber: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  remainingMinutesToDeparture: number;
  gate: string;
  flightStatus: FlightStatus;
  currentStep: string;
  currentStepLabel: string;
  estimatedSecurityMinutes: number;
  loungeLocation: string;
  loungeGateLocation: string;
  loungeWalkingMinutes: number;
  loungeWaitMinutes: number;
  loungeWaitTime: string;
  liveGuideMessage: string;
}

export interface Product {
  id: string;
  name: string;
  thumbnailUrl: string;
  priceKrw: number;
}

export interface HealthCheckResponse {
  status: "ok" | "waking" | "down";
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
