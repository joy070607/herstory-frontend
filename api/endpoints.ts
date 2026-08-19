import { apiClient } from "./client";
import type {
  CheckInRequest,
  CheckInResponse,
  CheckoutRequest,
  HealthCheckResponse,
  Journey,
  JourneyAnalysisResponse,
  JourneyScanRequest,
  JourneyScanResponse,
  LiveCardResponse,
  LoginResponseDto,
  Member,
  OrderResponse,
  Product,
  ReEntryResponse,
  SendPhoneCodeRequest,
  SendPhoneCodeResponse,
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
};

export const styleApi = {
  getRecommendations: (journeyId: string) =>
    apiClient.get<Product[]>(`/journeys/${journeyId}/style-engine`),
  getPopupSpots: () => apiClient.get("/style/popup-spots"),
};

export const cartApi = {
  get: (journeyId: string) => apiClient.get(`/journeys/${journeyId}/cart`),
  addItem: (journeyId: string, productId: string) =>
    apiClient.post(`/journeys/${journeyId}/cart/items`, { productId }),
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

// VIP 피팅은 아직 실제 엔드포인트로 맞추지 않은 자리표시자입니다.
export const airportApi = {
  startFitting: (journeyId: string) =>
    apiClient.post(`/airport/${journeyId}/fitting`),
};

// 면세 한도 할인 계산 & Fast Checkout 수령 처리 (현장 즉시 착장 수령 및 결제 처리 시 호출)
export const orderApi = {
  checkout: (payload: CheckoutRequest) =>
    apiClient.post<OrderResponse>("/order/checkout", payload).then((res) => res.data),
};

export const postflightApi = {
  getLeatherCareGuide: (lang: string) =>
    apiClient.get(`/postflight/leather-care?lang=${lang}`),
  getVisetosSpots: () => apiClient.get("/postflight/visetos-map"),
  getNomadMiles: (memberId: string) =>
    apiClient.get(`/postflight/miles/${memberId}`),
};
