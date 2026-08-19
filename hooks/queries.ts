import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartApi,
  careApi,
  flightApi,
  healthApi,
  journeyApi,
  orderApi,
  postflightApi,
  storeApi,
  styleApi,
} from "@/api/endpoints";
import { saveBlobResponse } from "@/utils/download";
import { useAuthStore } from "@/store/authStore";
import type {
  CheckInRequest,
  CheckoutRequest,
  JourneyScanRequest,
  StampCheckInRequest,
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
  cart: (journeyId: string) => ["cart", journeyId] as const,
  nomadMiles: (memberId: string) => ["postflight", "miles", memberId] as const,
  reEntryOptions: (memberId: number) => ["store", "re-entry-options", memberId] as const,
};

export function useHealthCheck() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => healthApi.check().then((res) => res.data),
    retry: false,
  });
}

export function useJourney(journeyId: string | null) {
  return useQuery({
    queryKey: queryKeys.journey(journeyId ?? ""),
    queryFn: () => journeyApi.get(journeyId as string).then((res) => res.data),
    enabled: Boolean(journeyId),
  });
}

export function useJourneyAnalysis(journeyId: string | null) {
  return useQuery({
    queryKey: queryKeys.journeyAnalysis(journeyId ?? ""),
    queryFn: () => journeyApi.getAnalysis(journeyId as string),
    enabled: Boolean(journeyId),
  });
}

export function useLiveCard(journeyId: string | null) {
  return useQuery({
    queryKey: queryKeys.liveCard(journeyId ?? ""),
    queryFn: () => journeyApi.getLiveCard(journeyId as string),
    enabled: Boolean(journeyId),
    refetchInterval: 30_000,
  });
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
    queryFn: () =>
      styleApi.getRecommendations(journeyId as string).then((res) => res.data),
    enabled: Boolean(journeyId),
  });
}

export function useCart(journeyId: string | null) {
  return useQuery({
    queryKey: queryKeys.cart(journeyId ?? ""),
    queryFn: () => cartApi.get(journeyId as string).then((res) => res.data),
    enabled: Boolean(journeyId),
  });
}

export function useAddToCart(journeyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => cartApi.addItem(journeyId, productId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.cart(journeyId) }),
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

export function useCheckout(journeyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CheckoutRequest) => orderApi.checkout(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.cart(journeyId) }),
  });
}

export function useNomadMiles(memberId: string | null) {
  return useQuery({
    queryKey: queryKeys.nomadMiles(memberId ?? ""),
    queryFn: () => postflightApi.getNomadMiles(memberId as string),
    enabled: Boolean(memberId),
  });
}
