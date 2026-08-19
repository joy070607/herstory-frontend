"use client";

import Image from "next/image";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useAuthStore } from "@/store/authStore";
import { usePopupSpots } from "@/hooks/queries";
import { MapPinIcon } from "@/components/icons";
import type { CareGoogleMapsSpot, Product } from "@/types/api.types";

const AIRPORT_POPUP_BRAND = "HERSTORY";

function mapEmbedUrl(spots: CareGoogleMapsSpot[]) {
  const lat = spots.reduce((sum, spot) => sum + spot.latitude, 0) / spots.length;
  const lng = spots.reduce((sum, spot) => sum + spot.longitude, 0) / spots.length;
  // 공항 터미널 내부 지점끼리 붙어있어서 도시 지도(z=13)보다 훨씬 확대해서 보여줍니다.
  return `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
}

export function PopupSpotPage() {
  const member = useAuthStore((state) => state.member);
  const { data, isLoading, isError, refetch } = usePopupSpots(member ? Number(member.id) : null);

  // 이 엔드포인트는 목적지 도시 부티크(샤넬/LV 등)와 공항 팝업 스팟을 한 배열에 같이 내려줘서,
  // 공항 한정 팝업 스팟(HERSTORY 브랜드)만 걸러냅니다.
  const spots = data?.visetosSpots.filter((spot) => spot.brand === AIRPORT_POPUP_BRAND);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-neutral-900">POP-UP STORE</h1>
        </div>

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {spots && spots.length > 0 && (
          <>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-neutral-200">
              <iframe
                title="공항 팝업 스팟 지도"
                src={mapEmbedUrl(spots)}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col divide-y divide-neutral-200">
              {spots.map((spot) => (
                <SpotRow key={spot.spotName} spot={spot} />
              ))}
            </div>
          </>
        )}

        {spots && spots.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center">
            <MapPinIcon className="mb-1 h-9 w-9 text-neutral-400" />
            <p className="text-sm text-neutral-500">현재 안내 가능한 공항 팝업 스팟이 없어요</p>
          </div>
        )}

        {data && data.recommendedItems.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold text-neutral-900">공항에서만 만날 수 있어요!</p>
            {data.recommendedItems.map((item) => (
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

function SpotRow({ spot }: { spot: CareGoogleMapsSpot }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3.5">
      <div>
        <p className="text-base font-semibold text-neutral-900">{spot.spotName}</p>
        <p className="text-sm text-neutral-500">{spot.address}</p>
      </div>
      {spot.walkingMinutes != null && (
        <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
          {spot.walkingMinutes}분
        </span>
      )}
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
