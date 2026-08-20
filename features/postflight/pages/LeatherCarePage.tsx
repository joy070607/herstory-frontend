"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useJourneyStore } from "@/store/journeyStore";
import { useAiCareTip, useJourney, useJourneyAnalysis, useMyCollection } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { RainOverlay } from "@/features/preflight/components/RainOverlay";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { ROUTES } from "@/constants/routes";
import { ChevronRightIcon, SpotIcon, WeatherIcon } from "@/components/icons";
import { parseWeatherInfo } from "@/utils/weather";
import type { CareCollectionItem } from "@/types/api.types";

const COLLAPSED_ITEM_COUNT = 2;

function CollectionRow({ item }: { item: CareCollectionItem }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
        <Image src={item.imageUrl} alt={item.name} fill sizes="48px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
        <p className="mt-0.5 text-xs text-neutral-400">최근 관리일: {item.lastCaredDaysAgo}일 전</p>
      </div>
      <span
        className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
        style={{ backgroundColor: `${item.careStatusColor}1A`, color: item.careStatusColor }}
      >
        {item.careStatusLabel}
      </span>
    </div>
  );
}

// 강수 확률이 이 값 이상이면 파란색, 아니면서 기온이 HOT_TEMP_C 이상이면 빨간색 카드로 표시합니다.
const RAINY_PROBABILITY_PERCENT = 50;
const HOT_TEMP_C = 28;

// 알림 카드에 표시할 대상 제품 — 실제 개인 컬렉션 API가 아직 없어 데모에 쓰인 제품명을 그대로 질의합니다.
const FEATURED_PRODUCT = "비세토스 스타크 백팩";

export function LeatherCarePage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const journeyId = useJourneyStore((state) => state.journeyId);
  const lang = useJourneyStore((state) => state.lang);
  const { data: journey } = useJourney(journeyId);
  const { data: analysis } = useJourneyAnalysis(journeyId);
  const [showRain, setShowRain] = useState(true);
  const [showAllItems, setShowAllItems] = useState(false);

  const {
    data: collection,
    isLoading: isCollectionLoading,
    isError: isCollectionError,
    refetch: refetchCollection,
  } = useMyCollection(memberId);

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

        <h2 className="mb-3.5 px-6 text-xl font-bold text-neutral-900">현재 환경</h2>
        <div className="mx-6 mb-5 overflow-hidden rounded-[20px]">
          <button
            type="button"
            onClick={() => setShowRain((prev) => !prev)}
            className={`relative w-full px-6 py-5 text-left transition-all active:scale-[0.98] ${cardColorClass}`}
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
          className="mx-6 mb-7 flex items-center gap-3 rounded-[20px] bg-neutral-900 px-5 py-4 transition-transform active:scale-[0.98]"
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

        <div className="mx-6 mb-3.5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900">나의 컬렉션 상태</h2>
          {collection && collection.items.length > COLLAPSED_ITEM_COUNT && (
            <button
              type="button"
              onClick={() => setShowAllItems((prev) => !prev)}
              className="text-xs font-medium text-sky-600 transition-opacity active:opacity-60"
            >
              {showAllItems ? "접기" : "전체 보기"}
            </button>
          )}
        </div>

        {isCollectionLoading && <WakingScreen />}
        {isCollectionError && <ErrorState onRetry={() => refetchCollection()} />}

        {collection && (
          <div
            className={`mx-6 flex flex-col gap-2.5 ${
              showAllItems ? "max-h-80 overflow-y-auto pr-1" : ""
            }`}
          >
            {(showAllItems ? collection.items : collection.items.slice(0, COLLAPSED_ITEM_COUNT)).map(
              (item) => (
                <CollectionRow key={item.itemId} item={item} />
              )
            )}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
