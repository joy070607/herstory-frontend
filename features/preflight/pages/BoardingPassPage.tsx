"use client";

import { useRouter } from "next/navigation";
import { useJourneyStore } from "@/store/journeyStore";
import { useJourney } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BoardingPassCard } from "@/features/preflight/components/BoardingPassCard";
import { BoardingPassScanForm } from "@/features/preflight/components/BoardingPassScanForm";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { ChevronLeftIcon } from "@/components/icons";

export function BoardingPassPage() {
  const router = useRouter();
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: journey, isLoading, isError, refetch } = useJourney(journeyId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />
      {!journeyId && <BoardingPassScanForm />}
      {journeyId && (
        <div className="flex flex-1 flex-col gap-6 px-6 py-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="뒤로가기"
              className="flex h-8 w-8 items-center justify-center text-neutral-900"
            >
              <ChevronLeftIcon />
            </button>
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
