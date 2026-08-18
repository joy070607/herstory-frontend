import { MrzBand } from "@/components/signature/MrzBand";
import { Perforation } from "@/components/signature/Perforation";
import type { Journey } from "@/types/api.types";

export function BoardingPassCard({ journey }: { journey: Journey }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200">
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-neutral-500">
          {journey.origin} → {journey.destination}
        </span>
        <span className="font-mono text-sm">{journey.pnr}</span>
      </div>
      <Perforation />
      <MrzBand
        lines={[
          `PNR<<${journey.pnr.toUpperCase()}`,
          `${journey.origin}<${journey.destination}<STATUS<${journey.flightStatus}`,
        ]}
      />
    </div>
  );
}
