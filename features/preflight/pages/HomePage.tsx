"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useJourney, useJourneyAnalysis, useLiveCard } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { RainOverlay } from "@/features/preflight/components/RainOverlay";
import { ROUTES } from "@/constants/routes";
import { formatFlightTime, stripAiTagPrefix } from "@/utils/format";
import { parseWeatherInfo } from "@/utils/weather";
import { FLIGHT_STATUS_STYLE } from "@/constants/flightStatus";
import {
  BagIcon,
  BoardingPassIcon,
  ClockIcon,
  GateIcon,
  LoungeIcon,
  PassportIcon,
  PlaneIcon,
  ShirtIcon,
  TicketIcon,
  WeatherIcon,
} from "@/components/icons";

export function HomePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: journey, isLoading } = useJourney(journeyId);
  const { data: liveCard } = useLiveCard(journeyId);
  const { data: analysis } = useJourneyAnalysis(journeyId);
  const weather = analysis ? parseWeatherInfo(analysis.weatherInfo) : null;
  const topProduct = analysis?.recommendedProducts[0];
  const [showRain, setShowRain] = useState(true);

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
            <p className="mb-5 font-mono text-3xl font-bold text-[#E6F7FF]">{journey.pnr}</p>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-2xl text-[#E6F7FF]">{journey.origin}</span>
              <PlaneIcon className="h-6 w-6 shrink-0" />
              <span className="text-2xl text-[#E6F7FF]">{journey.destination}</span>
            </div>
            <div className="flex items-center rounded-[20px] bg-[#E6F7FF4D] px-4 py-3">
              <div className="flex flex-1 items-center justify-center gap-2.5">
                <GateIcon className="h-4 w-4 shrink-0 text-white" />
                <div className="text-center">
                  <p className="text-[11px] text-white">게이트</p>
                  <p className="text-base font-bold text-white">{liveCard?.gate || "-"}</p>
                </div>
              </div>
              <div className="h-7 w-px bg-white/30" />
              <div className="flex flex-1 items-center justify-center gap-2.5">
                <ClockIcon className="h-4 w-4 shrink-0 text-white" />
                <div className="text-center">
                  <p className="text-[11px] text-white">탑승 시간</p>
                  <p className="text-base font-bold text-white">
                    {formatFlightTime(journey.departureDateTime)}
                  </p>
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
            <BoardingPassIcon />
            <span className="text-sm text-neutral-900">보딩패스</span>
          </Link>
          <Link
            href={ROUTES.smartCart}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#0099E51A] py-5"
          >
            <ShirtIcon className="text-sky-500" />
            <span className="text-sm text-sky-500">스타일</span>
          </Link>
          <Link
            href={ROUTES.popupSpot}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#D9D9D94D] py-5"
          >
            <BagIcon />
            <span className="text-sm text-neutral-900">공항팝업</span>
          </Link>
        </div>

        {journeyId && analysis && (
          <>
            <h2 className="mb-3.5 px-6 text-sm font-medium text-neutral-900">오늘의 날씨</h2>
            <div className="mx-6 mb-4 overflow-hidden rounded-[20px]">
              <button
                type="button"
                onClick={() => setShowRain((prev) => !prev)}
                className="relative w-full bg-sky-600 px-6 py-5 text-left"
              >
                {showRain && <RainOverlay />}
                <div className="relative z-10 flex items-center gap-3">
                  <WeatherIcon className="h-9 w-10 shrink-0" />
                  <div>
                    <p className="text-3xl font-bold leading-none text-white">
                      {weather?.temp != null ? `${weather.temp}°` : "-"}
                    </p>
                    <p className="mt-1.5 text-base font-medium text-white">
                      {weather?.condition ?? analysis.weatherInfo}
                    </p>
                  </div>
                </div>
                <div className="relative z-10 mt-4 rounded-[14px] bg-black/15 px-4 py-3.5">
                  <p className="text-sm font-semibold text-white">
                    비소식 {analysis.rainProbability} 예상됩니다.
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-white">
                    {stripAiTagPrefix(analysis.recommendationReason)}
                  </p>
                </div>
              </button>

              {topProduct && (
                <PeekRevealCard>
                  <Link
                    href={ROUTES.styleEngine}
                    className="flex items-center gap-3 px-4 pb-3.5 pt-1"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white">
                      <Image
                        src={topProduct.imageUrl}
                        alt={topProduct.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-medium text-sky-600">오늘의 추천 아이템</p>
                      <p className="text-sm font-bold text-neutral-900">{topProduct.name}</p>
                    </div>
                    <span className="shrink-0 text-lg text-sky-400">›</span>
                  </Link>
                </PeekRevealCard>
              )}
            </div>
          </>
        )}

        <div className="flex items-center gap-4 px-6">
          <Link
            href={ROUTES.myPagePassportInfo}
            className="flex flex-1 items-center justify-center gap-3.5 rounded-[20px] border border-sky-500 py-4 text-sky-500"
          >
            <PassportIcon className="h-4 w-4" />
            <span className="text-sm">내 패스포트</span>
          </Link>
          <Link
            href={ROUTES.liveCard}
            className="flex flex-1 items-center justify-center gap-2 rounded-[20px] border border-neutral-400 py-4 text-neutral-900"
          >
            <LoungeIcon className="h-4 w-4" />
            <span className="text-sm">라운지 정보</span>
          </Link>
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}

const PEEK_HEIGHT = 34;
const POP_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

// 날씨 카드 밑에 살짝 삐져나와 있다가, 아래로 드래그하면 팝 하고 튀어나오는 카드입니다.
function PeekRevealCard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState(PEEK_HEIGHT);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{ startY: number; startHeight: number } | null>(null);
  const wasDraggedRef = useRef(false);

  useEffect(() => {
    if (contentRef.current) {
      setFullHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const settledHeight = open ? fullHeight : PEEK_HEIGHT;
  const displayHeight = dragHeight ?? settledHeight;

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStateRef.current = { startY: event.clientY, startHeight: settledHeight };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current) return;
    const delta = event.clientY - dragStateRef.current.startY;
    const next = Math.min(
      Math.max(dragStateRef.current.startHeight + delta, PEEK_HEIGHT),
      fullHeight
    );
    setDragHeight(next);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current) return;
    const draggedDistance = Math.abs(event.clientY - dragStateRef.current.startY);
    if (draggedDistance > 4) {
      wasDraggedRef.current = true;
      const openThreshold = PEEK_HEIGHT + (fullHeight - PEEK_HEIGHT) * 0.35;
      setOpen((dragHeight ?? settledHeight) > openThreshold);
    }
    dragStateRef.current = null;
    setDragHeight(null);
  };

  const handleClick = () => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        height: displayHeight,
        transition: dragHeight != null ? "none" : `height 0.45s ${POP_EASING}`,
      }}
      className="overflow-hidden bg-sky-100"
    >
      <div ref={contentRef}>
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClick={handleClick}
          className="flex touch-none cursor-grab items-center justify-center gap-1.5 py-2.5 active:cursor-grabbing"
        >
          <span className="h-1 w-8 rounded-full bg-sky-300" />
        </div>
        {children}
      </div>
    </div>
  );
}
