"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useCareGoogleMapsSpots } from "@/hooks/queries";
import type { CareGoogleMapsSpot } from "@/types/api.types";

function directionsUrl(spot: CareGoogleMapsSpot) {
  return `https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`;
}

function mapEmbedUrl(spots: CareGoogleMapsSpot[]) {
  const lat = spots.reduce((sum, spot) => sum + spot.latitude, 0) / spots.length;
  const lng = spots.reduce((sum, spot) => sum + spot.longitude, 0) / spots.length;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed`;
}

function SpotCard({ spot }: { spot: CareGoogleMapsSpot }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-white">{spot.spotName}</span>
          <span className="text-xs text-neutral-400">{spot.locationType}</span>
        </div>
        <span className="shrink-0 rounded-full bg-[#0EA5E9]/20 px-2 py-0.5 text-[10px] font-medium text-[#7DD3FC]">
          {spot.brand}
        </span>
      </div>
      <p className="text-xs text-neutral-400">{spot.address}</p>
      {spot.walkingMinutes != null && (
        <p className="text-xs text-neutral-400">도보 {spot.walkingMinutes}분</p>
      )}
      <p className="text-xs text-neutral-300">{spot.careServiceAvailable.split(", Google Maps")[0]}</p>
      <a
        href={directionsUrl(spot)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex h-9 items-center justify-center rounded-full bg-[#0EA5E9] px-4 text-xs font-medium text-white transition-colors hover:bg-[#0284C7]"
      >
        Google Maps 길찾기
      </a>
    </div>
  );
}

export function VisetosMapPage() {
  const destination = "Bangkok";
  const { data: spots, isLoading, isError, refetch } = useCareGoogleMapsSpots(destination);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      {isLoading && <WakingScreen />}
      {isError && <ErrorState onRetry={() => refetch()} />}

      {spots && (
        <div className="flex flex-1 flex-col">
          <iframe
            title="부티크 & Care Desk 지도"
            src={mapEmbedUrl(spots)}
            className="h-[300px] w-full border-0"
            loading="lazy"
          />

          <div className="-mt-6 flex flex-1 flex-col gap-4 rounded-t-[28px] bg-[#0A0A0A] px-6 pb-[76px] pt-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-white">글로벌 럭셔리 부티크</h1>
              <span className="rounded-full bg-[#0EA5E9] px-3 py-1 text-xs font-semibold text-white">
                {destination}
              </span>
            </div>
            <p className="text-sm text-neutral-300">
              MCM VIP 여정 중 방문 가능한 현지 럭셔리 부티크와 Care Desk를 Google Maps 실시간
              좌표로 안내합니다.
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-base font-semibold text-white">매장 리스트</span>
              <span className="text-xs font-medium text-[#7DD3FC]">{spots.length}곳</span>
            </div>

            <div className="flex flex-col gap-3">
              {spots.map((spot) => (
                <SpotCard key={`${spot.spotName}-${spot.latitude}-${spot.longitude}`} spot={spot} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
