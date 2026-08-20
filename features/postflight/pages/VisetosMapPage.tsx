"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useAuthStore } from "@/store/authStore";
import { useJourneyStore } from "@/store/journeyStore";
import { useCareGoogleMapsSpots, useCityStampCheckIn, useJourney } from "@/hooks/queries";
import { CheckCircleIcon, LockOutlineIcon } from "@/components/icons";
import type { CareGoogleMapsSpot, StampCheckInResponse } from "@/types/api.types";

// Google Places 실시간 검색이라 실제 브랜드를 못 알아본 곳은 brand가 "LUXURY BRAND"로
// 디자인을 명시합니다. 이 경우 브랜드명 대신 매장 이름을 보여줍니다.
const GENERIC_BRAND = "LUXURY BRAND";

function spotLabel(spot: CareGoogleMapsSpot) {
  return spot.brand === GENERIC_BRAND ? spot.spotName : spot.brand;
}

function directionsUrl(spot: CareGoogleMapsSpot) {
  return `https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`;
}

function mapEmbedUrl(spots: CareGoogleMapsSpot[]) {
  const lat = spots.reduce((sum, spot) => sum + spot.latitude, 0) / spots.length;
  const lng = spots.reduce((sum, spot) => sum + spot.longitude, 0) / spots.length;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed`;
}

function SpotStampTile({
  spot,
  isStamped,
  isCheckingIn,
  onRequestStamp,
}: {
  spot: CareGoogleMapsSpot;
  isStamped: boolean;
  isCheckingIn: boolean;
  onRequestStamp: () => void;
}) {
  const handleClick = () => {
    if (isStamped) {
      window.open(directionsUrl(spot), "_blank", "noopener,noreferrer");
      return;
    }
    onRequestStamp();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isCheckingIn}
      className={`flex flex-col items-center gap-2 rounded-2xl px-2 py-5 text-center transition-colors disabled:opacity-60 ${
        isStamped ? "bg-sky-500" : "bg-white/10"
      }`}
    >
      {isStamped ? (
        <span className="relative flex h-9 w-9 shrink-0 -rotate-6 items-center justify-center rounded-full border-2 border-white text-white">
          <span className="absolute inset-0.5 rounded-full border border-dashed border-white/50" />
          <CheckCircleIcon className="h-4 w-4" />
        </span>
      ) : (
        <LockOutlineIcon className="h-6 w-6 text-white/40" />
      )}
      <span
        className={`break-keep text-sm font-medium ${isStamped ? "text-white" : "text-white/50"}`}
      >
        {isCheckingIn ? "확인 중..." : spotLabel(spot)}
      </span>
    </button>
  );
}

export function VisetosMapPage() {
  const member = useAuthStore((state) => state.member);
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: journey } = useJourney(journeyId);
  const destination = journey?.destination ?? "Bangkok";
  const { data: spots, isLoading, isError, refetch } = useCareGoogleMapsSpots(destination);

  const [stampedSpots, setStampedSpots] = useState<Set<string>>(new Set());
  const [confirmingSpotName, setConfirmingSpotName] = useState<string | null>(null);
  const [pendingSpotName, setPendingSpotName] = useState<string | null>(null);
  const [lastStamp, setLastStamp] = useState<StampCheckInResponse | null>(null);
  const stampCheckIn = useCityStampCheckIn();

  const confirmingSpot = spots?.find((spot) => spot.spotName === confirmingSpotName) ?? null;

  const handleCheckIn = (spotName: string) => {
    if (!member) return;
    setConfirmingSpotName(null);
    setPendingSpotName(spotName);
    stampCheckIn.mutate(
      { memberId: Number(member.id), spotName },
      {
        onSuccess: (data) => {
          setStampedSpots((prev) => new Set(prev).add(spotName));
          setLastStamp(data);
        },
        onSettled: () => setPendingSpotName(null),
      }
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="relative flex flex-1 flex-col">
        <BackButton className="absolute left-4 top-4 z-10 h-10 w-10 rounded-full bg-white shadow-md" />

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {spots && (
          <div className="flex flex-1 flex-col">
            <iframe
              title="비세토스 스팟 지도"
              src={mapEmbedUrl(spots)}
              className="h-[300px] w-full border-0"
              loading="lazy"
            />

            <div className="-mt-6 flex flex-1 flex-col gap-4 rounded-t-[28px] bg-[#0A0A0A] px-6 pb-[76px] pt-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-white">비세토스 스팟</h1>
                <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
                  {destination}
                </span>
              </div>
              <p className="text-sm text-neutral-300">
                MCM의 특별한 장소를 발견하고 디지털 패스포트 스탬프를 모아 리워드를 잠금 해제하세요.
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-base font-semibold text-white">시티 패스포트</span>
                <span className="text-sm font-medium text-sky-400">
                  {stampedSpots.size}/{spots.length} 수집됨
                </span>
              </div>

              {confirmingSpot && (
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <p className="min-w-0 flex-1 break-keep text-sm text-white">
                    {spotLabel(confirmingSpot)}에 스탬프를 찍을까요?
                  </p>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => setConfirmingSpotName(null)}
                      className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-medium text-white/70"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCheckIn(confirmingSpot.spotName)}
                      className="rounded-full bg-sky-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                {spots.map((spot) => (
                  <SpotStampTile
                    key={`${spot.spotName}-${spot.latitude}-${spot.longitude}`}
                    spot={spot}
                    isStamped={stampedSpots.has(spot.spotName)}
                    isCheckingIn={pendingSpotName === spot.spotName}
                    onRequestStamp={() => setConfirmingSpotName(spot.spotName)}
                  />
                ))}
              </div>

              {lastStamp && (
                <p className="text-xs text-sky-400">
                  {lastStamp.message} (누적 {lastStamp.totalMiles.toLocaleString()} Miles)
                </p>
              )}
              {stampCheckIn.isError && (
                <p className="text-xs text-red-400">스탬프 적립에 실패했습니다. 다시 시도해주세요.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
