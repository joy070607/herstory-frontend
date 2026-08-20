"use client";

import Image from "next/image";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useAuthStore } from "@/store/authStore";
import { useCareGoogleMapsSpots, usePopupSpots } from "@/hooks/queries";
import { AIRPORT_DESTINATION, isNearAirport } from "@/utils/airport";
import type { CareGoogleMapsSpot, Product } from "@/types/api.types";

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

function isShoppingSpot(spot: CareGoogleMapsSpot) {
  const name = spot.spotName.toLowerCase();
  if (LODGING_KEYWORDS.some((keyword) => name.includes(keyword))) return false;
  if (spot.brand !== GENERIC_BRAND) return true;
  return SHOPPING_KEYWORDS.some((keyword) => name.includes(keyword));
}

function mapEmbedUrl(spots: CareGoogleMapsSpot[]) {
  const lat = spots.reduce((sum, spot) => sum + spot.latitude, 0) / spots.length;
  const lng = spots.reduce((sum, spot) => sum + spot.longitude, 0) / spots.length;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}

export function PopupSpotPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;

  // 여정의 실제 목적지가 아니라 인천공항 현지 팝업 스팟을 보여주는 화면이라 destination을 고정합니다.
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
