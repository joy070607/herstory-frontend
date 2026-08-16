// OAS 스키마 그대로 옮겨오는 타입 정의 위치

export interface Member {
  id: string;
  name: string;
  email: string;
  vipTier: VipTier;
  nomadMiles: number;
}

export type VipTier = "SILVER" | "GOLD" | "PLATINUM" | "VIP";

// 실제 API 응답 그대로 (POST /api/v1/auth/login)
export interface LoginResponseDto {
  memberId: number;
  email: string;
  name: string;
  vipTier: VipTier;
  nomadMiles: number;
  message?: string;
}

export interface Journey {
  journeyId: string;
  memberId: string;
  choiceFit: boolean;
  purchaseStatus: PurchaseStatus;
  departureAt: string;
  lang: "ko" | "en" | "ja" | "zh";
}

export type PurchaseStatus = "PURCHASED" | "PENDING_REENTRY" | "ABANDONED";

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
