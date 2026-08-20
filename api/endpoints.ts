import { apiClient } from "./client";
import type {
  AddCardRequest,
  CartResponse,
  AppleWalletPassResponse,
  CareGoogleMapsSpot,
  ChangePasswordRequest,
  CheckInRequest,
  PopupSpotsResponse,
  CheckInResponse,
  CheckoutRequest,
  CouponListResponse,
  FittingResponse,
  FlightLookupResponse,
  HealthCheckResponse,
  Journey,
  JourneyAnalysisResponse,
  JourneyScanRequest,
  JourneyScanResponse,
  LiveCardResponse,
  LoginResponseDto,
  Member,
  MilesBalanceResponse,
  MilesHistoryResponse,
  MyJourneysResponse,
  OrderResponse,
  PassportResponse,
  PasswordResponse,
  PaymentMethodItem,
  Product,
  ProfileResponse,
  RedeemBenefitRequest,
  RedeemBenefitResponse,
  ReEntryResponse,
  ResetPasswordRequest,
  SendPhoneCodeRequest,
  SendPhoneCodeResponse,
  StampCheckInRequest,
  StampCheckInResponse,
  SummaryResponse,
  TransferMilesRequest,
  TransferMilesResponse,
  UpdatePassportRequest,
  UpdateProfileRequest,
  UpdateSettingsRequest,
  UseMilesRequest,
  UseMilesResponse,
  VerifyPhoneCodeRequest,
  VerifyPhoneCodeResponse,
} from "@/types/api.types";

export const healthApi = {
  check: () => apiClient.get<HealthCheckResponse>("/health"),
};

function toMember(dto: LoginResponseDto): Member {
  return {
    id: String(dto.memberId),
    name: dto.name,
    email: dto.email,
    vipTier: dto.vipTier,
    nomadMiles: dto.nomadMiles,
  };
}

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    apiClient
      .post<LoginResponseDto>("/auth/login", payload)
      .then((res) => toMember(res.data)),
  register: (payload: { email: string; password: string; name: string; phone: string }) =>
    apiClient
      .post<LoginResponseDto>("/auth/register", payload)
      .then((res) => toMember(res.data)),
  sendPhoneCode: (phone: string) =>
    apiClient
      .post<SendPhoneCodeResponse>("/auth/phone/send-code", { phone } satisfies SendPhoneCodeRequest)
      .then((res) => res.data),
  verifyPhoneCode: (payload: VerifyPhoneCodeRequest) =>
    apiClient
      .post<VerifyPhoneCodeResponse>("/auth/phone/verify-code", payload)
      .then((res) => res.data),
  resetPassword: (payload: ResetPasswordRequest) =>
    apiClient.post<PasswordResponse>("/auth/password/reset", payload).then((res) => res.data),
};

export const preflightApi = {
  getHub: () => apiClient.get("/preflight/hub"),
  getLiveCard: () => apiClient.get("/preflight/live-card"),
};

export const journeyApi = {
  get: (journeyId: string) => apiClient.get<Journey>(`/journeys/${journeyId}`),
  scan: (payload: JourneyScanRequest) =>
    apiClient.post<JourneyScanResponse>("/journey/scan", payload),
  getAnalysis: (journeyId: string) =>
    apiClient.get<JourneyAnalysisResponse>(`/journey/analysis/${journeyId}`).then((res) => res.data),
  getLiveCard: (journeyId: string) =>
    apiClient.get<LiveCardResponse>(`/journey/live-card/${journeyId}`).then((res) => res.data),
  createBoardingPass: (journeyId: string) =>
    apiClient.post(`/journeys/${journeyId}/boarding-pass`),
  submitChoiceFit: (journeyId: string, choiceFit: boolean) =>
    apiClient.patch(`/journeys/${journeyId}/choice-fit`, { choiceFit }),
  getAppleWalletPass: (journeyId: string) =>
    apiClient
      .get<AppleWalletPassResponse>(`/journey/apple-wallet-pass/${journeyId}`)
      .then((res) => res.data),
  // Safari 보안 차단 없이 파일 앱으로 바로 받을 수 있는 .pkpass 바이너리 다운로드
  downloadAppleWalletPassFile: (journeyId: string) =>
    apiClient.get(`/journey/apple-wallet-pass/download-file/${journeyId}`, {
      responseType: "blob",
    }),
  getMyJourneys: (memberId: number) =>
    apiClient
      .get<MyJourneysResponse>("/journey/list", { params: { memberId } })
      .then((res) => res.data),
};

// 인천국제공항공사 관제 AODB와 1분 단위로 동기화되는 실시간 항공편 조회
export const flightApi = {
  lookup: (flightNumber: string) =>
    apiClient
      .get<FlightLookupResponse>("/flight/lookup", { params: { flightNumber } })
      .then((res) => res.data),
};

export const styleApi = {
  getRecommendations: (journeyId: string) =>
    apiClient
      .get<Product[]>(`/style/${journeyId}/recommendations`)
      .then((res) => res.data),
  getPopupSpots: (memberId?: number) =>
    apiClient
      .get<PopupSpotsResponse>("/style/popup-spots", { params: { memberId } })
      .then((res) => res.data),
};

export const cartApi = {
  get: (memberId: number) =>
    apiClient.get<CartResponse>("/cart/my", { params: { memberId } }).then((res) => res.data),
  addItem: (payload: { memberId: number; productId: number; quantity: number }) =>
    apiClient.post<CartResponse>("/cart/add", payload).then((res) => res.data),
};

// SCR-401 (고객 체크인) / SCR-402 (직원 태블릿) 이 공유하는 실제 백엔드 "Store API" 도메인
export const storeApi = {
  checkIn: (payload: CheckInRequest) =>
    apiClient.post<CheckInResponse>("/store/check-in", payload).then((res) => res.data),
  getReEntryOptions: (memberId: number) =>
    apiClient
      .get<ReEntryResponse>(`/store/re-entry-options/${memberId}`)
      .then((res) => res.data),
  // EventSource는 axios가 아니라 URL이 필요합니다 (features/staff/hooks/useNotificationStream.ts에서 구독).
  notificationStreamUrl: () => `${apiClient.defaults.baseURL}/store/notifications/stream`,
};

export const airportApi = {
  startFitting: (journeyId: string) =>
    apiClient.post<FittingResponse>(`/airport/${journeyId}/fitting`).then((res) => res.data),
};

// 면세 한도 할인 계산 & Fast Checkout 수령 처리 (현장 즉시 착장 수령 및 결제 처리 시 호출)
export const orderApi = {
  checkout: (payload: CheckoutRequest) =>
    apiClient.post<OrderResponse>("/order/checkout", payload).then((res) => res.data),
};

// 마일리지 잔액/거래내역/사용/양도/혜택교환 (SCR-501 마일리지 화면)
export const milesApi = {
  getBalance: (memberId: number) =>
    apiClient.get<MilesBalanceResponse>(`/miles/${memberId}`).then((res) => res.data),
  getHistory: (memberId: number) =>
    apiClient.get<MilesHistoryResponse>(`/miles/history/${memberId}`).then((res) => res.data),
  use: (payload: UseMilesRequest) =>
    apiClient.post<UseMilesResponse>("/miles/use", payload).then((res) => res.data),
  transfer: (payload: TransferMilesRequest) =>
    apiClient.post<TransferMilesResponse>("/miles/transfer", payload).then((res) => res.data),
  redeem: (payload: RedeemBenefitRequest) =>
    apiClient.post<RedeemBenefitResponse>("/miles/redeem", payload).then((res) => res.data),
};

export const postflightApi = {
  getLeatherCareGuide: (lang: string) =>
    apiClient.get(`/postflight/leather-care?lang=${lang}`),
  getVisetosSpots: () => apiClient.get("/postflight/visetos-map"),
};

// 현지 럭셔리 부티크 & Care Desk 위치 (Google Maps 실시간 좌표/길안내 링크) + 가죽 케어 AI 가이드 (GPT-4o)
export const careApi = {
  getGoogleMapsSpots: (params: { destination?: string; brand?: string }) =>
    apiClient
      .get<CareGoogleMapsSpot[]>("/care/google-maps", { params })
      .then((res) => res.data),
  getAiCareTip: (params: { productName?: string; weather?: string; lang?: string }) =>
    apiClient.get<string>("/care/ai-care-tip", { params }).then((res) => res.data),
  checkInCityStamp: (payload: StampCheckInRequest) =>
    apiClient
      .post<StampCheckInResponse>("/care/stamp-checkin", payload)
      .then((res) => res.data),
};

// 마이페이지 대시보드 요약, 회원 프로필/여권/결제수단/알림설정 (6. MyPage API)
export const membersApi = {
  getSummary: (memberId: number) =>
    apiClient.get<SummaryResponse>(`/members/summary/${memberId}`).then((res) => res.data),
  getProfile: (memberId: number) =>
    apiClient.get<ProfileResponse>(`/members/profile/${memberId}`).then((res) => res.data),
  updateProfile: (memberId: number, payload: UpdateProfileRequest) =>
    apiClient
      .put<ProfileResponse>(`/members/profile/${memberId}`, payload)
      .then((res) => res.data),
  getPassport: (memberId: number) =>
    apiClient.get<PassportResponse>(`/members/passport/${memberId}`).then((res) => res.data),
  updatePassport: (memberId: number, payload: UpdatePassportRequest) =>
    apiClient
      .put<PassportResponse>(`/members/passport/${memberId}`, payload)
      .then((res) => res.data),
  changePassword: (memberId: number, payload: ChangePasswordRequest) =>
    apiClient
      .post<PasswordResponse>(`/members/password/change/${memberId}`, payload)
      .then((res) => res.data),
  getPaymentMethods: (memberId: number) =>
    apiClient
      .get<PaymentMethodItem[]>(`/members/payment-methods/${memberId}`)
      .then((res) => res.data),
  addPaymentMethod: (memberId: number, payload: AddCardRequest) =>
    apiClient
      .post<PaymentMethodItem>(`/members/payment-methods/${memberId}`, payload)
      .then((res) => res.data),
  deletePaymentMethod: (memberId: number, cardId: number) =>
    apiClient.delete(`/members/payment-methods/${memberId}/${cardId}`),
  updateSettings: (memberId: number, payload: UpdateSettingsRequest) =>
    apiClient
      .put<UpdateSettingsRequest>(`/members/settings/${memberId}`, payload)
      .then((res) => res.data),
};

export const couponApi = {
  getMy: (memberId: number) =>
    apiClient
      .get<CouponListResponse>("/coupon/my", { params: { memberId } })
      .then((res) => res.data),
};
