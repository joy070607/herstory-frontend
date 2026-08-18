"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { useJourney } from "@/hooks/queries";
import { useCountdown } from "@/hooks/useCountdown";
import { Stat } from "@/components/ui/Stat";
import { BottomNav } from "@/components/layout/BottomNav";

export function JourneyTimelinePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: journey } = useJourney(journeyId);
  const { hours, minutes, seconds } = useCountdown(journey?.departureDateTime ?? null);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 px-6 py-8">
        <h1 className="text-lg font-semibold">Journey Timeline</h1>
        <div className="flex gap-8">
          <Stat value={String(hours).padStart(2, "0")} label="Hours" />
          <Stat value={String(minutes).padStart(2, "0")} label="Minutes" />
          <Stat value={String(seconds).padStart(2, "0")} label="Seconds" />
        </div>
      </div>
      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
