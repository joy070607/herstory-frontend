import { apiClient } from "./client";
import type {
  CheckInRequest,
  CheckInResponse,
  HealthCheckResponse,
  Journey,
  LoginResponseDto,
  Member,
  Product,
  ReEntryResponse,
} from "@/types/api.types";

export const healthApi = {
  check: () => apiClient.get<HealthCheckResponse>("/health"),
};

export const authApi = {
  // 이메일 + 이름으로 로그인하며, 신규 이메일이면 자동으로 회원 등록됩니다.
  login: (payload: { email: string; name: string }) =>
    apiClient.post<LoginResponseDto>("/auth/login", payload).then(
      (res): Member => ({
        id: String(res.data.memberId),
        name: res.data.name,
        email: res.data.email,
        vipTier: res.data.vipTier,
        nomadMiles: res.data.nomadMiles,
      })
    ),
};

export const preflightApi = {
  getHub: () => apiClient.get("/preflight/hub"),
  getLiveCard: () => apiClient.get("/preflight/live-card"),
  getClimateGuide: (journeyId: string) =>
    apiClient.get(`/preflight/${journeyId}/climate`),
};

export const journeyApi = {
  get: (journeyId: string) => apiClient.get<Journey>(`/journeys/${journeyId}`),
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

// VIP 피팅 / 결제는 아직 실제 엔드포인트로 맞추지 않은 자리표시자입니다.
export const airportApi = {
  startFitting: (journeyId: string) =>
    apiClient.post(`/airport/${journeyId}/fitting`),
  checkout: (journeyId: string) =>
    apiClient.post(`/airport/${journeyId}/checkout`),
};

export const postflightApi = {
  getLeatherCareGuide: (lang: string) =>
    apiClient.get(`/postflight/leather-care?lang=${lang}`),
  getVisetosSpots: () => apiClient.get("/postflight/visetos-map"),
  getNomadMiles: (memberId: string) =>
    apiClient.get(`/postflight/miles/${memberId}`),
};
