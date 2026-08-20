"use client";

import { useState } from "react";
import Image from "next/image";
import { useJourneyStore } from "@/store/journeyStore";
import { useAiCareTip, useJourney } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { WeatherIcon } from "@/components/icons";

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

// destinationWeather는 자유 문장이라 형식이 두 가지로 섞여 있어요:
// "열대성 스콜 (기온 32°C, 습도 85%)" 또는 "...기온 26.5°C... (우천/스콜 예상)".
// 둘 다에서 온도와, 괄호 앞/뒤 중 실제 날씨 요약에 해당하는 쪽을 뽑아냅니다.
function parseDestinationWeather(text: string) {
  const tempMatch = text.match(/기온\s*([\d.]+)\s*°C/);
  const temp = tempMatch ? Math.round(Number(tempMatch[1])) : null;
  const beforeParen = text.split("(")[0].trim();
  const parenMatch = text.match(/\(([^)]+)\)/);
  const condition =
    beforeParen && !beforeParen.includes("기온") ? beforeParen : (parenMatch?.[1] ?? text);
  return { temp, condition };
}

export function LeatherCarePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const lang = useJourneyStore((state) => state.lang);
  const { data: journey } = useJourney(journeyId);
  const [showAllCollection, setShowAllCollection] = useState(false);

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

  const weather = journey?.destinationWeather
    ? parseDestinationWeather(journey.destinationWeather)
    : null;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col pb-[60px] pt-5">
        <div className="mb-3 px-6">
          <BackButton />
        </div>

        <h2 className="mb-3.5 px-6 text-sm font-medium text-neutral-900">현재 환경</h2>
        <div className="mx-6 mb-5 overflow-hidden rounded-[20px] bg-sky-600 px-6 py-5">
          <div className="flex items-center gap-3">
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
          <div className="mt-4 rounded-[14px] bg-black/15 px-4 py-3.5">
            <p className="text-sm font-semibold text-white">
              {journey?.destination ?? "여정 정보 없음"}
            </p>
            {journey?.destinationWeather && (
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-white">
                {journey.destinationWeather}
              </p>
            )}
          </div>
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
