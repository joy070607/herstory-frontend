"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useJourneyAnalysis } from "@/hooks/queries";
import { useInView } from "@/hooks/useInView";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { WakingScreen } from "@/components/system/WakingScreen";
import { RainOverlay } from "@/features/preflight/components/RainOverlay";
import { ROUTES } from "@/constants/routes";
import { WeatherIcon, TicketIcon } from "@/components/icons";
import { parseWeatherInfo } from "@/utils/weather";
import { stripAiTagPrefix } from "@/utils/format";
import type { Product, ProductCategory } from "@/types/api.types";

const CATEGORY_RECOMMEND_LABEL: Record<ProductCategory, string> = {
  WATERPROOF: "방수 아이템을 추천해요",
  BACKPACK: "백팩 아이템을 추천해요",
  TRAVEL_BAG: "여행 가방을 추천해요",
  ACCESSORY: "액세서리를 추천해요",
  LEATHER_CARE: "가죽 케어 아이템을 추천해요",
  READY_TO_WEAR: "레디투웨어를 추천해요",
  LIMITED_EDITION: "한정판 아이템을 추천해요",
};

export function StyleEnginePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: analysis, isLoading } = useJourneyAnalysis(journeyId);
  const [showRain, setShowRain] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const weather = analysis ? parseWeatherInfo(analysis.weatherInfo) : null;
  const selectedProduct =
    analysis?.recommendedProducts.find((product) => product.id === selectedId) ??
    analysis?.recommendedProducts[0];
  const recommendLabel = selectedProduct
    ? CATEGORY_RECOMMEND_LABEL[selectedProduct.category]
    : analysis && stripAiTagPrefix(analysis.recommendationReason);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col px-6 py-5">
        {!journeyId && (
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center"
          >
            <TicketIcon className="mb-1 text-neutral-400" />
            <p className="text-base font-semibold text-neutral-700">아직 등록된 여정이 없어요</p>
            <p className="text-sm text-neutral-400">탑승권을 스캔하면 스타일 추천을 볼 수 있어요</p>
            <span className="mt-3 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-sky-50">
              탑승권 스캔하기
            </span>
          </Link>
        )}

        {journeyId && isLoading && (
          <WakingScreen message="AI가 여정에 맞는 스타일을 분석하고 있어요." />
        )}

        {journeyId && analysis && (
          <>
            <button
              type="button"
              onClick={() => setShowRain((prev) => !prev)}
              className="relative mb-10 flex w-full flex-col gap-4 overflow-hidden rounded-[20px] bg-sky-600 px-6 pb-6 pt-7 text-left"
            >
              {showRain && <RainOverlay />}
              <div className="relative z-10 flex items-center gap-3">
                <WeatherIcon className="h-[34px] w-[39px] shrink-0" />
                <div>
                  <p className="text-2xl font-bold leading-none text-sky-50">
                    {weather?.temp != null ? `${weather.temp}°` : "-"}
                  </p>
                  <p className="mt-1 text-sm text-sky-50/90">
                    {weather?.condition ?? analysis.weatherInfo}
                  </p>
                </div>
              </div>
              <div className="relative z-10 rounded-[14px] bg-black/15 px-4 py-4">
                <p className="text-sm font-semibold text-white">
                  비소식 {analysis.rainProbability} 예상됩니다.
                </p>
                <p className="mt-1.5 text-xl font-bold leading-snug text-white">{recommendLabel}</p>
              </div>
            </button>

            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#D97639]" />
              <p className="text-lg font-bold text-[#D97639]">
                {selectedProduct ? `${selectedProduct.brand} 패키지 룩북` : "패키지 룩북"}
              </p>
            </div>

            {selectedProduct && (
              <div className="relative mb-9 h-[322px] w-full overflow-hidden rounded-[20px] bg-neutral-100">
                <Image
                  key={selectedProduct.id}
                  src={selectedProduct.imageUrl}
                  alt={`${selectedProduct.brand} 패키지 룩북`}
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="mb-6 flex flex-col gap-3">
              {analysis.recommendedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  selected={selectedProduct?.id === product.id}
                  onSelect={() => setSelectedId(product.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}

function ProductCard({
  product,
  index,
  selected,
  onSelect,
}: {
  product: Product;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const { ref, inView } = useInView<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      className={`flex items-start gap-4 rounded-[20px] border-2 p-4 text-left transition-all duration-700 ease-out ${
        selected ? "border-sky-500 bg-sky-50" : "border-transparent bg-neutral-50"
      } ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
        <Image src={product.imageUrl} alt={product.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-base font-bold text-neutral-900">{product.name}</p>
        <p className="text-sm leading-relaxed text-neutral-600">{product.description}</p>
      </div>
    </button>
  );
}
