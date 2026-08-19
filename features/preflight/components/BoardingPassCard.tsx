"use client";

import { MrzBand } from "@/components/signature/MrzBand";
import { Perforation } from "@/components/signature/Perforation";
import { useDownloadAppleWalletPass } from "@/hooks/queries";
import type { Journey } from "@/types/api.types";

export function BoardingPassCard({ journey }: { journey: Journey }) {
  const downloadPass = useDownloadAppleWalletPass();

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
      <div className="p-4">
        <button
          type="button"
          onClick={() => downloadPass.mutate(String(journey.journeyId))}
          disabled={downloadPass.isPending}
          className="w-full rounded-[20px] bg-[#0A0A0A] py-3 text-center text-sm font-medium text-white disabled:opacity-40"
        >
          {downloadPass.isPending ? "다운로드 중..." : "Apple Wallet에 추가"}
        </button>
        {downloadPass.isError && (
          <p className="mt-2 text-xs text-red-600">패스 다운로드에 실패했습니다.</p>
        )}
      </div>
    </div>
  );
}
