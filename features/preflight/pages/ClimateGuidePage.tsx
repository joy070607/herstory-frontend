"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { ClimateGauge } from "@/features/preflight/components/ClimateGauge";

export function ClimateGuidePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8">
      <h1 className="text-lg font-semibold">Climate Guide</h1>
      <p className="text-xs text-neutral-400">Journey: {journeyId ?? "-"}</p>
      <ClimateGauge temperatureC={18} minC={-5} maxC={35} />
    </div>
  );
}
