"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useCareGoogleMapsSpots } from "@/hooks/queries";
import { AIRPORT_DESTINATION, isNearAirport } from "@/utils/airport";
import type { CareGoogleMapsSpot } from "@/types/api.types";

function mapEmbedUrl(spots: CareGoogleMapsSpot[]) {
  const lat = spots.reduce((sum, spot) => sum + spot.latitude, 0) / spots.length;
  const lng = spots.reduce((sum, spot) => sum + spot.longitude, 0) / spots.length;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}

function AirportLocationMapPage({ title }: { title: string }) {
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
          <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
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
          title={title}
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

export function FittingRoomMapPage() {
  return <AirportLocationMapPage title="피팅룸 위치" />;
}

export function TerminalMapPage() {
  return <AirportLocationMapPage title="터미널 위치" />;
}
