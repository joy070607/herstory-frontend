"use client";

import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useFlightLookup, useLiveCard } from "@/hooks/queries";
import { useCountdown } from "@/hooks/useCountdown";
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
  // 30초마다 오는 서버 값 대신, 남은 시간은 초 단위로 직접 카운트다운합니다.
  const countdown = useCountdown(liveCard?.departureDateTime ?? null);
  // 인천공항 실제 전광판과 1분 단위로 동기화되는 AODB 실시간 조회
  const { data: flightLookup } = useFlightLookup(liveCard?.flightNumber);

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

        {journeyId && liveCard && (() => {
          // 현재 단계 칸(grid-cols-4)의 정중앙 지점 — 진행바 끝과 위 라벨을 여기에 맞춰 정확히 그 단계를 가리키게 합니다.
          const progressPercent = ((resolveStageIndex(liveCard) + 0.5) / STAGES.length) * 100;
          const labelPosition = Math.min(Math.max(progressPercent, 12), 88);
          return (
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
                <PlaneIcon className="h-4 w-4 shrink-0" />
                <span className="text-lg text-[#E6F7FF]">{liveCard.destination}</span>
              </div>

              {countdown.remainingMs > 0 && (
                <div className="relative mb-3 h-[26px]">
                  <p
                    className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-center text-[11px] transition-[left] duration-700 ease-out"
                    style={{ left: `${labelPosition}%` }}
                  >
                    <span className="text-[#A73D3D]">예상 소요시간</span>
                    <br />
                    <span className="text-white">
                      {formatMinutesKorean(countdown.hours * 60 + countdown.minutes)}
                    </span>
                  </p>
                </div>
              )}

              <div className="mb-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="mb-4 grid grid-cols-4">
                {STAGES.map((stage, index) => (
                  <span
                    key={stage}
                    className={`text-center text-[11px] transition-colors duration-500 ${
                      index <= resolveStageIndex(liveCard) ? "font-medium text-white" : "text-white/40"
                    }`}
                  >
                    {stage}
                  </span>
                ))}
              </div>

              <div className="flex items-center rounded-[20px] bg-[#E6F7FF4D] px-4 py-3">
                <div className="flex flex-1 items-center justify-center gap-2.5">
                  <GateIcon className="h-4 w-4 shrink-0 text-white" />
                  <div className="text-center">
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
            </div>

            {flightLookup && (
              <div className="rounded-[20px] border border-neutral-200 bg-white px-4 pb-5 pt-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {flightLookup.airlineName} {flightLookup.flightNumber}
                    </p>
                    <p className="text-[11px] text-neutral-400">{flightLookup.dataSource}</p>
                  </div>
                  {flightLookup.delayMinutes > 0 && (
                    <span className="shrink-0 rounded-full bg-[#FB923C33] px-3 py-1 text-xs font-medium text-[#C2410C]">
                      {flightLookup.remark} {flightLookup.delayMinutes}분 지연
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-3.5">
                  <div>
                    <p className="text-[11px] text-neutral-400">터미널</p>
                    <p className="text-sm font-medium text-neutral-900">
                      {flightLookup.originTerminal}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400">탑승 게이트</p>
                    <p className="text-sm font-medium text-neutral-900">{flightLookup.gate}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400">체크인 카운터</p>
                    <p className="text-sm font-medium text-neutral-900">
                      {flightLookup.checkinCounter}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400">출발 → 도착</p>
                    <p className="text-sm font-medium text-neutral-900">
                      {flightLookup.scheduledDepartureFormatted} → {flightLookup.scheduledArrivalFormatted}
                    </p>
                  </div>
                </div>

                <p className="mt-3.5 text-xs text-neutral-500">
                  {flightLookup.destinationName} · 비행시간 {flightLookup.flightDuration}
                </p>
              </div>
            )}

            {liveCard.loungeLocation && (
              <div className="rounded-[20px] bg-[#E7F6FD] px-4 pb-5 pt-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B9E4F8]">
                    <LoungeIcon className="h-5 w-5 text-[#006397]" />
                  </div>
                  <span className="rounded-full bg-sky-500 px-3.5 py-1.5 text-xs text-sky-50">
                    가장 가까움
                  </span>
                </div>
                <p className="mb-1.5 text-base text-neutral-900">{liveCard.loungeLocation}</p>
                {liveCard.loungeGateLocation && (
                  <p className="mb-3 text-sm text-neutral-500">{liveCard.loungeGateLocation}</p>
                )}
                {liveCard.loungeWalkingMinutes > 0 && (
                  <div className="flex items-center gap-1.5 text-[#006397]">
                    <ClockIcon className="h-3.5 w-3.5" />
                    <span className="text-xs">도보 {liveCard.loungeWalkingMinutes}분</span>
                  </div>
                )}
              </div>
            )}

            {(liveCard.loungeWaitTime || liveCard.loungeWaitMinutes > 0) && (
              <div className="flex items-center gap-3 rounded-[20px] border border-sky-700 px-4 py-3.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACC15]" />
                <span className="text-sm text-neutral-900">
                  {liveCard.loungeWaitTime || `라운지 대기시간 ${formatMinutesKorean(liveCard.loungeWaitMinutes)}`}
                </span>
              </div>
            )}
          </>
          );
        })()}
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
