"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useAiCareTip, useJourney, useJourneyAnalysis } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { RainOverlay } from "@/features/preflight/components/RainOverlay";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { ROUTES } from "@/constants/routes";
import { ChevronRightIcon, SpotIcon, WeatherIcon } from "@/components/icons";
import { parseWeatherInfo } from "@/utils/weather";

// 강수 확률이 이 값 이상이면 파란색, 아니면서 기온이 HOT_TEMP_C 이상이면 빨간색 카드로 표시합니다.
const RAINY_PROBABILITY_PERCENT = 50;
const HOT_TEMP_C = 28;

// 알림 카드에 표시할 대상 제품 — 실제 개인 컬렉션 API가 아직 없어 데모에 쓰인 제품명을 그대로 질의합니다.
const FEATURED_PRODUCT = "비세토스 스타크 백팩";

// 컬렉션 API가 아직 없어서 "전체 보기"로 펼쳐지는 나머지 항목도 데모용으로 고정된 값이에요.
const MORE_COLLECTION_ITEMS = [
  {
    image: "/care/bag-tote.png",
    name: "노마드 시티 백팩",
    lastCareLabel: "최근 관리일: 3일 전",
    status: "최적" as const,
  },
  {
    image: "/care/bag-crossbody.png",
    name: "아렌 웍스 파우치",
    lastCareLabel: "최근 관리일: 41일 전",
    status: "컨디셔닝 필요" as const,
  },
];

export function LeatherCarePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const lang = useJourneyStore((state) => state.lang);
  const { data: journey } = useJourney(journeyId);
  const { data: analysis } = useJourneyAnalysis(journeyId);
  const [showAllCollection, setShowAllCollection] = useState(false);
  const [showRain, setShowRain] = useState(true);

  const {
    data: careTip,
    isLoading,
    isError,
    refetch,
  } = useAiCareTip({
    productName: FEATURED_PRODUCT,
    weather: journey?.destinationWeather,
    lang,
  });

  const weather = analysis ? parseWeatherInfo(analysis.weatherInfo) : null;
  const rainProbabilityPercent = analysis ? Number(analysis.rainProbability.replace("%", "")) : 0;
  const isRainy = rainProbabilityPercent >= RAINY_PROBABILITY_PERCENT;
  const isHot = weather?.temp != null && weather.temp >= HOT_TEMP_C;
  const cardColorClass = !isRainy && isHot ? "bg-red-500" : "bg-sky-600";

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col pb-[60px] pt-5">
        <div className="mb-3 px-6">
          <BackButton />
        </div>

        <h2 className="mb-3.5 px-6 text-sm font-medium text-neutral-900">현재 환경</h2>
        <div className="mx-6 mb-5 overflow-hidden rounded-[20px]">
          <button
            type="button"
            onClick={() => setShowRain((prev) => !prev)}
            className={`relative w-full px-6 py-5 text-left transition-colors ${cardColorClass}`}
          >
            {showRain && <RainOverlay />}
            <div className="relative z-10 flex items-center gap-3">
              <WeatherIcon className="h-9 w-10 shrink-0" />
              <div>
                <p className="text-3xl font-bold leading-none text-white">
                  {weather?.temp != null ? `${weather.temp}°` : "-"}
                </p>
                <p className="mt-1.5 text-base font-medium text-white">
                  {weather?.condition ?? "날씨 정보 없음"}
                </p>
              </div>
            </div>
            <div className="relative z-10 mt-4 rounded-[14px] bg-black/15 px-4 py-3.5">
              <p className="text-sm font-semibold text-white">
                {journey?.destination ?? "여정 정보 없음"}
              </p>
              {journey?.destinationWeather && (
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-white">
                  {journey.destinationWeather}
                </p>
              )}
            </div>
          </button>
        </div>

        <div className="mx-6 mb-7 rounded-[20px] bg-sky-50 py-4 pl-[15px] pr-[18px]">
          <div className="mb-3.5 flex items-center gap-1.5">
            <Image
              src="/icons/care-alert.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="text-sm font-semibold text-sky-700">긴급 케어 알림</span>
          </div>
          <p className="mb-4 ml-[3px] text-xl font-bold text-neutral-900">{FEATURED_PRODUCT}</p>
          {isLoading && <WakingScreen />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {careTip && (
            <p className="ml-0.5 text-sm leading-relaxed text-neutral-800">{careTip}</p>
          )}
        </div>

        <Link
          href={ROUTES.visetosMap}
          className="mx-6 mb-7 flex items-center gap-3 rounded-[20px] bg-neutral-900 px-5 py-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400">
            <SpotIcon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">MCM 스페셜 스팟 발견하기</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400">
              근처 부티크를 방문하고 시티 패스포트 스탬프를 모아 리워드를 잠금 해제하세요
            </p>
          </div>
          <ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-400" />
        </Link>

        <div className="mb-4 flex items-center justify-between px-6">
          <span className="text-xl font-bold text-neutral-900">나의 컬렉션 상태</span>
          <button
            type="button"
            onClick={() => setShowAllCollection((prev) => !prev)}
            className="text-sm font-medium text-sky-700"
          >
            {showAllCollection ? "접기" : "전체 보기"}
          </button>
        </div>

        <div className="mx-6 flex flex-col gap-3">
          <CollectionRow
            image="/care/bag-tote.png"
            name="비세토스 뮌헨 토트"
            lastCareLabel="최근 관리일: 12일 전"
            status="최적"
          />
          <CollectionRow
            image="/care/bag-crossbody.png"
            name="아렌 크로스바디"
            lastCareLabel="최근 관리일: 84일 전"
            status="컨디셔닝 필요"
          />
          {showAllCollection &&
            MORE_COLLECTION_ITEMS.map((item) => <CollectionRow key={item.name} {...item} />)}
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}

const STATUS_STYLE = {
  최적: "bg-emerald-50 text-emerald-700",
  "컨디셔닝 필요": "bg-red-50 text-red-700",
} as const;

function CollectionRow({
  image,
  name,
  lastCareLabel,
  status,
}: {
  image: string;
  name: string;
  lastCareLabel: string;
  status: keyof typeof STATUS_STYLE;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[20px] bg-neutral-100 px-3 py-3">
      <Image
        src={image}
        alt={name}
        width={65}
        height={65}
        className="h-[65px] w-[65px] shrink-0 rounded-xl object-cover"
      />
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="break-keep text-base font-semibold text-neutral-900">{name}</p>
          <p className="mt-1.5 break-keep text-sm text-neutral-500">{lastCareLabel}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${STATUS_STYLE[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
