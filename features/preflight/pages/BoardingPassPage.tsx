"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { useJourney } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { BoardingPassCard } from "@/features/preflight/components/BoardingPassCard";
import { BoardingPassScanForm } from "@/features/preflight/components/BoardingPassScanForm";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";

export function BoardingPassPage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: journey, isLoading, isError, refetch } = useJourney(journeyId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />
      {!journeyId && <BoardingPassScanForm />}
      {journeyId && (
        <div className="flex flex-1 flex-col gap-6 px-6 py-8">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1 className="text-lg font-semibold">Boarding Pass</h1>
          </div>
          {isLoading && <WakingScreen />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {journey && <BoardingPassCard journey={journey} />}
        </div>
      )}

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
