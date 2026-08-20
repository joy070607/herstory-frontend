"use client";

import { MrzBand } from "@/components/signature/MrzBand";
import { Perforation } from "@/components/signature/Perforation";
import { useDownloadAppleWalletPass } from "@/hooks/queries";
import { useJourneyStore } from "@/store/journeyStore";
import type { Journey } from "@/types/api.types";

export function BoardingPassCard({ journey }: { journey: Journey }) {
  const downloadPass = useDownloadAppleWalletPass();
  const setJourneyId = useJourneyStore((state) => state.setJourneyId);

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
          className="w-full rounded-[20px] bg-[#0A0A0A] py-3 text-center text-sm font-medium text-white transition-transform active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
        >
          {downloadPass.isPending ? "다운로드 중..." : "Apple Wallet에 추가"}
        </button>
        {downloadPass.isError && (
          <p className="mt-2 text-xs text-red-600">패스 다운로드에 실패했습니다.</p>
        )}
        <button
          type="button"
          onClick={() => {
            if (window.confirm("여정 등록을 취소하시겠습니까?")) {
              setJourneyId(null);
            }
          }}
          className="mt-2 w-full rounded-[20px] border border-neutral-300 py-3 text-center text-sm font-medium text-neutral-600 transition-transform active:scale-[0.98]"
        >
          여정 등록 취소
        </button>
      </div>
    </div>
  );
}
