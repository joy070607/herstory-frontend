"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useCareGoogleMapsSpots } from "@/hooks/queries";
import type { CareGoogleMapsSpot } from "@/types/api.types";

const AIRPORT_DESTINATION = "ICN";

// 인천공항(제1여객터미널) 좌표. "ICN" 검색 결과에 인천 시내 매장이 섞여 나올 때가 있어서
// (예: 미추홀구 롯데백화점) 이 좌표에서 너무 멀면 지도 중심 계산에서 제외합니다.
const AIRPORT_COORDS = { lat: 37.4602, lng: 126.4407 };
const MAX_DEGREES_FROM_AIRPORT = 0.1;

function isNearAirport(spot: CareGoogleMapsSpot) {
  return (
    Math.abs(spot.latitude - AIRPORT_COORDS.lat) < MAX_DEGREES_FROM_AIRPORT &&
    Math.abs(spot.longitude - AIRPORT_COORDS.lng) < MAX_DEGREES_FROM_AIRPORT
  );
}

function mapEmbedUrl(spots: CareGoogleMapsSpot[]) {
  const lat = spots.reduce((sum, spot) => sum + spot.latitude, 0) / spots.length;
  const lng = spots.reduce((sum, spot) => sum + spot.longitude, 0) / spots.length;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}

export function AirportMapPage() {
  const {
    data: rawSpots,
    isLoading,
    isError,
    refetch,
  } = useCareGoogleMapsSpots(AIRPORT_DESTINATION);
  const spots = rawSpots?.filter(isNearAirport);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="px-6 pt-6">
        <div className="mb-5 flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-neutral-900">공항 내 위치</h1>
        </div>
      </div>

      {isLoading && (
        <div className="px-6">
          <WakingScreen />
        </div>
      )}
      {isError && (
        <div className="px-6">
          <ErrorState onRetry={() => refetch()} />
        </div>
      )}

      {spots && spots.length > 0 && (
        <iframe
          title="공항 내 위치 지도"
          src={mapEmbedUrl(spots)}
          className="h-[420px] w-full border-0"
          loading="lazy"
        />
      )}

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
