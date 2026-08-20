import type { CareGoogleMapsSpot } from "@/types/api.types";

export const AIRPORT_DESTINATION = "ICN";

// 인천공항(제1여객터미널) 좌표. "ICN" 검색 결과에 인천 시내 매장이 섞여 나올 때가 있어서
// (예: 미추홀구 롯데백화점) 이 좌표에서 너무 멀면 지도 중심 계산에서 제외합니다.
export const AIRPORT_COORDS = { lat: 37.4602, lng: 126.4407 };
export const MAX_DEGREES_FROM_AIRPORT = 0.1; // 약 10km 이내만 "공항 스팟"으로 인정

export function isNearAirport(spot: CareGoogleMapsSpot) {
  return (
    Math.abs(spot.latitude - AIRPORT_COORDS.lat) < MAX_DEGREES_FROM_AIRPORT &&
    Math.abs(spot.longitude - AIRPORT_COORDS.lng) < MAX_DEGREES_FROM_AIRPORT
  );
}
