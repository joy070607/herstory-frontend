import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartApi,
  careApi,
  flightApi,
  healthApi,
  journeyApi,
  milesApi,
  orderApi,
  storeApi,
  styleApi,
} from "@/api/endpoints";
import { saveBlobResponse } from "@/utils/download";
import { useAuthStore } from "@/store/authStore";
import { useJourneyStore } from "@/store/journeyStore";
import type {
  CheckInRequest,
  CheckoutRequest,
  JourneyScanRequest,
  RedeemBenefitRequest,
  StampCheckInRequest,
  TransferMilesRequest,
  UseMilesRequest,
} from "@/types/api.types";

export const queryKeys = {
  health: ["health"] as const,
  journey: (journeyId: string) => ["journey", journeyId] as const,
  journeyAnalysis: (journeyId: string) => ["journey", "analysis", journeyId] as const,
  liveCard: (journeyId: string) => ["journey", "live-card", journeyId] as const,
  appleWalletPass: (journeyId: string) => ["journey", "apple-wallet-pass", journeyId] as const,
  flightLookup: (flightNumber: string) => ["flight", "lookup", flightNumber] as const,
  careGoogleMaps: (destination: string, brand: string) =>
    ["care", "google-maps", destination, brand] as const,
  aiCareTip: (productName: string, weather: string, lang: string) =>
    ["care", "ai-care-tip", productName, weather, lang] as const,
  styleRecommendations: (journeyId: string) =>
    ["style", "recommendations", journeyId] as const,
  cart: (memberId: number) => ["cart", memberId] as const,
  reEntryOptions: (memberId: number) => ["store", "re-entry-options", memberId] as const,
  milesHistory: (memberId: number) => ["miles", "history", memberId] as const,
};

// 백엔드 테스트 데이터가 리셋되면 로컬에 저장해둔 journeyId가 더 이상 존재하지 않는
// 여정을 가리키게 되어, 관련 조회가 계속 실패합니다. 이 상태를 방치하면 화면이 빈
// 로딩 스켈레톤에 멈춘 것처럼 보이므로, 조회가 실패하면 journeyId를 비워 "여정 스캔"
// 안내 화면으로 자연스럽게 돌아가게 합니다.
function useClearStaleJourney(journeyId: string | null, isError: boolean) {
  const setJourneyId = useJourneyStore((state) => state.setJourneyId);
  useEffect(() => {
    if (isError && journeyId) {
      setJourneyId(null);
    }
  }, [isError, journeyId, setJourneyId]);
}

export function useHealthCheck() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => healthApi.check().then((res) => res.data),
    retry: false,
  });
}

export function useJourney(journeyId: string | null) {
  const query = useQuery({
    queryKey: queryKeys.journey(journeyId ?? ""),
    queryFn: () => journeyApi.get(journeyId as string).then((res) => res.data),
    enabled: Boolean(journeyId),
  });
  useClearStaleJourney(journeyId, query.isError);
  return query;
}

export function useJourneyAnalysis(journeyId: string | null) {
  const query = useQuery({
    queryKey: queryKeys.journeyAnalysis(journeyId ?? ""),
    queryFn: () => journeyApi.getAnalysis(journeyId as string),
    enabled: Boolean(journeyId),
  });
  useClearStaleJourney(journeyId, query.isError);
  return query;
}

export function useLiveCard(journeyId: string | null) {
  const query = useQuery({
    queryKey: queryKeys.liveCard(journeyId ?? ""),
    queryFn: () => journeyApi.getLiveCard(journeyId as string),
    enabled: Boolean(journeyId),
    refetchInterval: 30_000,
  });
  useClearStaleJourney(journeyId, query.isError);
  return query;
}

export function useFlightLookup(flightNumber: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.flightLookup(flightNumber ?? ""),
    queryFn: () => flightApi.lookup(flightNumber as string),
    enabled: Boolean(flightNumber),
    refetchInterval: 60_000,
  });
}

export function useCareGoogleMapsSpots(destination?: string, brand?: string) {
  const resolvedDestination = destination ?? "Bangkok";
  const resolvedBrand = brand ?? "ALL";
  return useQuery({
    queryKey: queryKeys.careGoogleMaps(resolvedDestination, resolvedBrand),
    queryFn: () =>
      careApi.getGoogleMapsSpots({ destination: resolvedDestination, brand: resolvedBrand }),
  });
}

export function useAiCareTip(params: { productName?: string; weather?: string; lang?: string }) {
  const productName = params.productName ?? "럭셔리 레더 백팩";
  const weather = params.weather ?? "습도 88% 열대성 스콜";
  const lang = params.lang ?? "ko";
  return useQuery({
    queryKey: queryKeys.aiCareTip(productName, weather, lang),
    queryFn: () => careApi.getAiCareTip({ productName, weather, lang }),
  });
}

export function useCityStampCheckIn() {
  const setNomadMiles = useAuthStore((state) => state.setNomadMiles);
  return useMutation({
    mutationFn: (payload: StampCheckInRequest) => careApi.checkInCityStamp(payload),
    onSuccess: (data) => setNomadMiles(data.totalMiles),
  });
}

export function useScanJourney() {
  return useMutation({
    mutationFn: (payload: JourneyScanRequest) =>
      journeyApi.scan(payload).then((res) => res.data),
  });
}

export function useAppleWalletPass(journeyId: string | null) {
  return useQuery({
    queryKey: queryKeys.appleWalletPass(journeyId ?? ""),
    queryFn: () => journeyApi.getAppleWalletPass(journeyId as string),
    enabled: Boolean(journeyId),
  });
}

export function useDownloadAppleWalletPass() {
  return useMutation({
    mutationFn: async (journeyId: string) => {
      const res = await journeyApi.downloadAppleWalletPassFile(journeyId);
      saveBlobResponse(res, `herstory-pass-${journeyId}.pkpass`);
    },
  });
}

export function useSubmitChoiceFit(journeyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (choiceFit: boolean) =>
      journeyApi.submitChoiceFit(journeyId, choiceFit),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.journey(journeyId) }),
  });
}

export function useStyleRecommendations(journeyId: string | null) {
  return useQuery({
    queryKey: queryKeys.styleRecommendations(journeyId ?? ""),
    queryFn: () => styleApi.getRecommendations(journeyId as string),
    enabled: Boolean(journeyId),
  });
}

export function useCart(memberId: number | null) {
  return useQuery({
    queryKey: queryKeys.cart(memberId ?? 0),
    queryFn: () => cartApi.get(memberId as number),
    enabled: memberId != null,
  });
}

export function useAddToCart(memberId: number | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { productId: number; quantity?: number }) =>
      cartApi.addItem({
        memberId: memberId as number,
        productId: payload.productId,
        quantity: payload.quantity ?? 1,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.cart(memberId ?? 0) }),
  });
}

export function useCheckIn() {
  return useMutation({
    mutationFn: (payload: CheckInRequest) => storeApi.checkIn(payload),
  });
}

export function useReEntryOptions(memberId: number | null) {
  return useQuery({
    queryKey: queryKeys.reEntryOptions(memberId ?? 0),
    queryFn: () => storeApi.getReEntryOptions(memberId as number),
    enabled: memberId != null,
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CheckoutRequest) => orderApi.checkout(payload),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.cart(variables.memberId) }),
  });
}

export function useMilesHistory(memberId: number | null) {
  return useQuery({
    queryKey: queryKeys.milesHistory(memberId ?? 0),
    queryFn: () => milesApi.getHistory(memberId as number),
    enabled: memberId != null,
  });
}

export function useUseMiles(memberId: number | null) {
  const queryClient = useQueryClient();
  const setNomadMiles = useAuthStore((state) => state.setNomadMiles);
  return useMutation({
    mutationFn: (payload: UseMilesRequest) => milesApi.use(payload),
    onSuccess: (data) => {
      setNomadMiles(data.remainingMiles);
      if (memberId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.milesHistory(memberId) });
      }
    },
  });
}

export function useTransferMiles(memberId: number | null) {
  const queryClient = useQueryClient();
  const setNomadMiles = useAuthStore((state) => state.setNomadMiles);
  return useMutation({
    mutationFn: (payload: TransferMilesRequest) => milesApi.transfer(payload),
    onSuccess: (data) => {
      setNomadMiles(data.remainingMiles);
      if (memberId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.milesHistory(memberId) });
      }
    },
  });
}

export function useRedeemBenefit(memberId: number | null) {
  const queryClient = useQueryClient();
  const setNomadMiles = useAuthStore((state) => state.setNomadMiles);
  return useMutation({
    mutationFn: (payload: RedeemBenefitRequest) => milesApi.redeem(payload),
    onSuccess: (data) => {
      setNomadMiles(data.remainingMiles);
      if (memberId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.milesHistory(memberId) });
      }
    },
  });
}
