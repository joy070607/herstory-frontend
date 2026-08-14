import { MrzBand } from "@/components/signature/MrzBand";
import { Perforation } from "@/components/signature/Perforation";
import type { Journey } from "@/types/api.types";

export function BoardingPassCard({ journey }: { journey: Journey }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200">
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-neutral-500">Journey</span>
        <span className="font-mono text-sm">{journey.journeyId}</span>
      </div>
      <Perforation />
      <MrzBand
        lines={[
          `JOURNEY<<${journey.journeyId.toUpperCase()}`,
          `STATUS<${journey.purchaseStatus}<LANG<${journey.lang.toUpperCase()}`,
        ]}
      />
    </div>
  );
}
