"use client";

import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useLiveCard } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ROUTES } from "@/constants/routes";
import { FLIGHT_STATUS_STYLE } from "@/constants/flightStatus";
import { formatFlightTime, formatMinutesKorean } from "@/utils/format";
import type { FlightStatus, LiveCardResponse } from "@/types/api.types";
import { ClockIcon, GateIcon, LoungeIcon, PlaneIcon, TicketIcon } from "@/components/icons";

const STAGES = ["체크인", "보안검색", "탑승", "도착"] as const;

const STAGE_KEYWORDS: [RegExp, number][] = [
  [/체크인|CHECK.?IN/i, 0],
  [/보안|SECURITY/i, 1],
  [/탑승|게이트|BOARD|GATE/i, 2],
  [/도착|ARRIV|COMPLETE/i, 3],
];

const FALLBACK_STAGE_INDEX: Record<FlightStatus, number> = {
  SCHEDULED: 1,
  DELAYED: 1,
  BOARDING: 2,
  COMPLETED: 3,
  CANCELLED: 0,
};

function resolveStageIndex(liveCard: LiveCardResponse): number {
  const haystack = `${liveCard.currentStep} ${liveCard.currentStepLabel}`;
  for (const [pattern, index] of STAGE_KEYWORDS) {
    if (pattern.test(haystack)) return index;
  }
  return FALLBACK_STAGE_INDEX[liveCard.flightStatus] ?? 0;
}

export function LiveCardPage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: liveCard, isLoading } = useLiveCard(journeyId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-2 px-6 py-5">
        {journeyId && (isLoading || !liveCard) && (
          <div className="h-[320px] animate-pulse rounded-[20px] bg-neutral-100" />
        )}

        {!journeyId && (
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center"
          >
            <TicketIcon className="mb-1 text-neutral-400" />
            <p className="text-base font-semibold text-neutral-700">아직 등록된 여정이 없어요</p>
            <p className="text-sm text-neutral-400">탑승권을 스캔하면 실시간 항공편 정보를 볼 수 있어요</p>
            <span className="mt-3 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-sky-50">
              탑승권 스캔하기
            </span>
          </Link>
        )}

        {journeyId && liveCard && (
          <>
            <div className="rounded-[20px] bg-[#121111] px-4 py-5">
              <div className="mb-6 flex items-center gap-2.5">
                <span className="rounded-full bg-[#F8FDFF4D] px-3.5 py-1 text-xs text-[#E6F7FF]">
                  실시간 상태
                </span>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs ${FLIGHT_STATUS_STYLE[liveCard.flightStatus].className}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${FLIGHT_STATUS_STYLE[liveCard.flightStatus].dotClassName}`} />
                  {FLIGHT_STATUS_STYLE[liveCard.flightStatus].label}
                </span>
              </div>

              <p className="mb-6 font-mono text-2xl font-bold text-[#E6F7FF]">
                {liveCard.flightNumber || liveCard.pnr}
              </p>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-lg text-[#E6F7FF]">{liveCard.origin}</span>
                <PlaneIcon className="h-4 w-4 shrink-0 text-[#E6F7FF]" />
                <span className="text-lg text-[#E6F7FF]">{liveCard.destination}</span>
              </div>

              {liveCard.remainingMinutesToDeparture > 0 && (
                <p className="mb-1.5 text-center text-[11px] text-[#F3A5A5]">
                  예상 소요시간
                  <br />
                  {formatMinutesKorean(liveCard.remainingMinutesToDeparture)}
                </p>
              )}

              <div className="mb-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all"
                  style={{
                    width: `${((resolveStageIndex(liveCard) + 1) / STAGES.length) * 100}%`,
                  }}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                {STAGES.map((stage, index) => (
                  <span
                    key={stage}
                    className={`text-[11px] ${
                      index <= resolveStageIndex(liveCard) ? "font-medium text-white" : "text-white/40"
                    }`}
                  >
                    {stage}
                  </span>
                ))}
              </div>

              <div className="flex items-center rounded-[20px] bg-[#E6F7FF4D] px-4 py-3">
                <div className="flex flex-1 items-center gap-2.5">
                  <GateIcon className="h-4 w-4 shrink-0 text-white" />
                  <div>
                    <p className="text-[11px] text-white">게이트</p>
                    <p className="text-base font-bold text-white">{liveCard.gate || "-"}</p>
                  </div>
                </div>
                <div className="h-7 w-px bg-white/30" />
                <div className="flex flex-1 items-center justify-center gap-2.5">
                  <ClockIcon className="h-4 w-4 shrink-0 text-white" />
                  <div className="text-center">
                    <p className="text-[11px] text-white">출발 시간</p>
                    <p className="text-base font-bold text-white">
                      {formatFlightTime(liveCard.departureDateTime)}
                    </p>
                  </div>
                </div>
              </div>

              {liveCard.liveGuideMessage && (
                <p className="mt-4 text-center text-xs text-[#E6F7FF]/80">
                  {liveCard.liveGuideMessage}
                </p>
              )}
            </div>

            {liveCard.loungeLocation && (
              <div className="rounded-[20px] bg-[#E7F6FD] px-4 pb-5 pt-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <LoungeIcon className="h-5 w-5" />
                </div>
                <p className="mb-1.5 text-base text-neutral-900">{liveCard.loungeLocation}</p>
                {liveCard.loungeGateLocation && (
                  <p className="mb-3 text-sm text-neutral-500">{liveCard.loungeGateLocation}</p>
                )}
                {liveCard.loungeWalkingMinutes > 0 && (
                  <div className="flex items-center gap-1.5 text-sky-700">
                    <ClockIcon className="h-3 w-3" />
                    <span className="text-xs">도보 {liveCard.loungeWalkingMinutes}분</span>
                  </div>
                )}
              </div>
            )}

            {(liveCard.loungeWaitTime || liveCard.loungeWaitMinutes > 0) && (
              <div className="flex items-center gap-3 rounded-[20px] border border-sky-700 px-4 py-3.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACC15]" />
                <span className="text-sm text-neutral-900">
                  라운지 대기시간 {liveCard.loungeWaitTime || formatMinutesKorean(liveCard.loungeWaitMinutes)}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
