"use client";

import Image from "next/image";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useAuthStore } from "@/store/authStore";
import { useCareGoogleMapsSpots, usePopupSpots } from "@/hooks/queries";
import type { CareGoogleMapsSpot, Product } from "@/types/api.types";

// 인천공항 실제 매장/면세점 좌표 — Bangkok 등 여정 목적지 도시 스팟이 아니라
// 공항 현지 스팟만 보여주기 위해 destination을 "ICN"으로 고정해서 조회합니다.
const AIRPORT_DESTINATION = "ICN";

// 이 API는 "ICN 럭셔리" 실시간 Google Places 검색이라 호텔·라운지·캡슐호텔 체인까지
// 같이 섞여 나와요(호텔 체인명엔 "호텔"이라는 단어가 없는 경우도 많아 이름만으론 못 거릅니다).
// POP-UP STORE 화면에는 실제 매장(면세점·브랜드 부티크)만 남기기 위해,
// 알려진 실제 브랜드거나 이름에 매장 관련 단어가 있는 경우만 통과시키고,
// 숙박 관련 단어가 있으면 무조건 제외합니다.
const LODGING_KEYWORDS = [
  "hotel", "lounge", "capsule", "suites", "inn", "resort", "hostel",
  "hyatt", "ibis", "sheraton", "marriott", "novotel", "airrelax",
];
const SHOPPING_KEYWORDS = ["duty free", "boutique", "store", "outlet", "shop", "flagship"];
const GENERIC_BRAND = "LUXURY BRAND";

// 인천공항(제1여객터미널) 좌표. "ICN" 검색 결과에 인천 시내 매장이 섞여 나올 때가 있어서
// (예: 미추홀구 롯데백화점) 이 좌표에서 너무 멀면 지도 중심 계산에서 제외합니다.
const AIRPORT_COORDS = { lat: 37.4602, lng: 126.4407 };
const MAX_DEGREES_FROM_AIRPORT = 0.1; // 약 10km 이내만 "공항 스팟"으로 인정

function isShoppingSpot(spot: CareGoogleMapsSpot) {
  const name = spot.spotName.toLowerCase();
  if (LODGING_KEYWORDS.some((keyword) => name.includes(keyword))) return false;
  if (spot.brand !== GENERIC_BRAND) return true;
  return SHOPPING_KEYWORDS.some((keyword) => name.includes(keyword));
}

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

export function PopupSpotPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;

  const {
    data: rawSpots,
    isLoading: isSpotsLoading,
    isError: isSpotsError,
    refetch: refetchSpots,
  } = useCareGoogleMapsSpots(AIRPORT_DESTINATION);
  const spots = rawSpots?.filter((spot) => isShoppingSpot(spot) && isNearAirport(spot));
  const {
    data: popupData,
    isLoading: isItemsLoading,
    isError: isItemsError,
    refetch: refetchItems,
  } = usePopupSpots(memberId);

  const isLoading = isSpotsLoading || isItemsLoading;
  const isError = isSpotsError || isItemsError;
  const refetch = () => {
    refetchSpots();
    refetchItems();
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="px-6 pt-6">
        <div className="mb-5 flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-neutral-900">POP-UP STORE</h1>
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
          title="공항 팝업 스팟 지도"
          src={mapEmbedUrl(spots)}
          className="h-[260px] w-full border-0"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        {popupData && popupData.recommendedItems.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold text-neutral-900">공항에서만 만날 수 있어요!</p>
            {popupData.recommendedItems.map((item) => (
              <LimitedItemRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}

function LimitedItemRow({ item }: { item: Product }) {
  return (
    <div className="flex gap-3 rounded-[20px] bg-neutral-100 p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
        <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
        <p className="text-xs leading-relaxed text-neutral-500">{item.description}</p>
      </div>
    </div>
  );
}
