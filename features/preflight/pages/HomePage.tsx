"use client";

import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useJourney } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ROUTES } from "@/constants/routes";
import { formatFlightTime } from "@/utils/format";
import type { FlightStatus } from "@/types/api.types";
import {
  BagIcon,
  ClockIcon,
  LoungeIcon,
  PassportIcon,
  PlaneIcon,
  ShirtIcon,
  TicketIcon,
  WeatherIcon,
} from "@/components/icons";

const FLIGHT_STATUS_STYLE: Record<FlightStatus, { label: string; className: string; dotClassName: string }> = {
  SCHEDULED: {
    label: "탑승 예정",
    className: "border border-[#7DD3FC4D] bg-[#0EA5E94D] text-[#7DD3FC]",
    dotClassName: "bg-[#7DD3FC]",
  },
  BOARDING: {
    label: "게이트 이동 중",
    className: "border border-[#FACC154D] bg-[#AC91004D] text-[#FDE047]",
    dotClassName: "bg-[#FACC15]",
  },
  COMPLETED: {
    label: "탑승 완료",
    className: "border border-[#4ADE804D] bg-[#16653440] text-[#86EFAC]",
    dotClassName: "bg-[#4ADE80]",
  },
  CANCELLED: {
    label: "결항",
    className: "border border-[#F871714D] bg-[#7F1D1D40] text-[#FCA5A5]",
    dotClassName: "bg-[#F87171]",
  },
};

export function HomePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: journey, isLoading } = useJourney(journeyId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col pb-6 pt-5">
        <h1 className="mb-4 px-6 text-2xl font-bold text-neutral-900">환영합니다,</h1>

        {journeyId && (isLoading || !journey) && (
          <div className="mx-6 mb-4 h-[292px] animate-pulse rounded-[20px] bg-neutral-100" />
        )}

        {journeyId && journey && (
          <Link
            href={ROUTES.liveCard}
            className="mx-6 mb-4 block rounded-[20px] bg-[#121111] px-4 py-5"
          >
            <div className="mb-6 flex items-center gap-2.5">
              <span className="rounded-full bg-[#F8FDFF4D] px-3.5 py-1 text-xs text-[#E6F7FF]">
                실시간 상태
              </span>
              <span
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs ${FLIGHT_STATUS_STYLE[journey.flightStatus].className}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${FLIGHT_STATUS_STYLE[journey.flightStatus].dotClassName}`} />
                {FLIGHT_STATUS_STYLE[journey.flightStatus].label}
              </span>
            </div>
            <p className="mb-5 font-mono text-2xl font-bold text-[#E6F7FF]">{journey.pnr}</p>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-lg text-[#E6F7FF]">{journey.origin}</span>
              <PlaneIcon className="shrink-0 rotate-90 text-[#E6F7FF]" />
              <span className="text-lg text-[#E6F7FF]">{journey.destination}</span>
            </div>
            <div className="flex items-center rounded-[20px] bg-[#E6F7FF4D] px-4 py-3">
              <div className="flex flex-1 items-center gap-2.5">
                <ClockIcon className="h-4 w-4 shrink-0 text-white" />
                <div>
                  <p className="text-[11px] text-white">출발 시간</p>
                  <p className="text-base font-bold text-white">
                    {formatFlightTime(journey.departureDateTime)}
                  </p>
                </div>
              </div>
              <div className="h-7 w-px bg-white/30" />
              <div className="flex flex-1 items-center justify-center gap-2.5">
                <TicketIcon className="h-4 w-4 shrink-0 text-white" />
                <div className="text-center">
                  <p className="text-[11px] text-white">PNR</p>
                  <p className="text-base font-bold text-white">{journey.pnr}</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {!journeyId && (
          <Link
            href={ROUTES.boardingPass}
            className="mx-6 mb-4 flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center"
          >
            <TicketIcon className="mb-1 text-neutral-400" />
            <p className="text-base font-semibold text-neutral-700">아직 등록된 여정이 없어요</p>
            <p className="text-sm text-neutral-400">탑승권을 스캔하면 실시간 항공편 정보를 볼 수 있어요</p>
            <span className="mt-3 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-sky-50">
              탑승권 스캔하기
            </span>
          </Link>
        )}

        <div className="mb-8 flex items-center gap-2 px-6">
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#D9D9D94D] py-5"
          >
            <TicketIcon className="text-neutral-900" />
            <span className="text-sm text-neutral-900">보딩패스</span>
          </Link>
          <Link
            href={ROUTES.styleEngine}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#0099E51A] py-5"
          >
            <ShirtIcon className="text-sky-500" />
            <span className="text-sm text-sky-500">스타일</span>
          </Link>
          <Link
            href={ROUTES.popupSpot}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#D9D9D94D] py-5"
          >
            <BagIcon className="text-neutral-900" />
            <span className="text-sm text-neutral-900">공항팝업</span>
          </Link>
        </div>

        <h2 className="mb-3.5 px-6 text-sm font-medium text-neutral-900">오늘의 날씨</h2>
        <Link
          href={ROUTES.climateGuide}
          className="mx-6 mb-4 flex items-center gap-3 rounded-[20px] bg-sky-500 px-6 py-5"
        >
          <div className="flex items-center gap-3">
            <WeatherIcon className="h-7 w-8 shrink-0 text-sky-50" />
            <div>
              <p className="mb-1 text-lg text-sky-50">18°</p>
              <p className="text-xs text-sky-50">흐림</p>
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-2 text-xs text-sky-50">비소식이 예상됩니다.</p>
            <p className="text-base text-sky-50">방수 트렌치 코트 추천</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 px-6">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-3.5 rounded-[20px] border border-sky-500 py-4 text-sky-500"
          >
            <PassportIcon className="h-4 w-4" />
            <span className="text-sm">내 패스포트</span>
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-[20px] border border-neutral-400 py-4 text-neutral-900"
          >
            <LoungeIcon className="h-4 w-4" />
            <span className="text-sm">라운지 정보</span>
          </button>
        </div>
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
