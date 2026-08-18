"use client";

import Link from "next/link";
import Image from "next/image";
import { useJourneyStore } from "@/store/journeyStore";
import { useJourney, useJourneyAnalysis } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ROUTES } from "@/constants/routes";
import { formatKRW } from "@/utils/format";
import {
  BagIcon,
  PlaneArrivalIcon,
  PlaneDepartureIcon,
  PlaneInFlightIcon,
  TicketIcon,
  WeatherIcon,
} from "@/components/icons";

const STAGE_COUNT = 3;

const STEP_ICON: [RegExp, { Icon: typeof PlaneDepartureIcon; circleClassName: string }][] = [
  [/DEPART/i, { Icon: PlaneDepartureIcon, circleClassName: "bg-neutral-100" }],
  [/ARRIV|LAND/i, { Icon: PlaneArrivalIcon, circleClassName: "bg-neutral-100" }],
  [/FLIGHT|CRUISE/i, { Icon: PlaneInFlightIcon, circleClassName: "bg-sky-500" }],
];

function resolveStepIcon(item: { stepType: string; iconType: string }) {
  const haystack = `${item.stepType} ${item.iconType}`;
  for (const [pattern, config] of STEP_ICON) {
    if (pattern.test(haystack)) return config;
  }
  return { Icon: PlaneInFlightIcon, circleClassName: "bg-sky-500" };
}

export function JourneyTimelinePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: journey } = useJourney(journeyId);
  const { data: analysis, isLoading } = useJourneyAnalysis(journeyId);

  const currentStage = journey?.flightStatus === "COMPLETED" ? STAGE_COUNT - 1 : 0;
  const stageLabels = [
    `${journey?.origin ?? "-"} 출발`,
    "환승 대기",
    `${journey?.destination ?? "-"} 도착`,
  ];

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
            <p className="text-sm text-neutral-400">탑승권을 스캔하면 여정 분석과 타임라인을 볼 수 있어요</p>
            <span className="mt-3 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-sky-50">
              탑승권 스캔하기
            </span>
          </Link>
        )}

        {journeyId && isLoading && (
          <div className="h-[320px] animate-pulse rounded-[20px] bg-neutral-100" />
        )}

        {journeyId && journey && analysis && (
          <>
            <h1 className="mb-5 text-2xl font-bold text-neutral-900">여정 분석</h1>

            <div className="mb-6 flex flex-col gap-3.5">
              <div className="relative flex items-center justify-between px-1.5">
                <div className="absolute inset-x-1.5 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-sky-500/20" />
                {stageLabels.map((_, index) => (
                  <span
                    key={index}
                    className={`relative h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                      index <= currentStage ? "bg-sky-500" : "bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                {stageLabels.map((label, index) => (
                  <span
                    key={label}
                    className={`text-[11px] ${
                      index === 0 ? "font-semibold text-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={ROUTES.climateGuide}
              className="mb-8 flex items-center gap-4 rounded-[20px] bg-[#E7F6FD] px-5 py-4"
            >
              <WeatherIcon className="h-9 w-8 shrink-0 text-sky-500" />
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-sky-500">
                  {analysis.destination} 강수확률
                </p>
                <p className="mb-1 text-2xl font-bold leading-none text-sky-700">
                  {analysis.rainProbability}
                </p>
                <p className="text-xs leading-relaxed text-sky-700/80">{analysis.climateSummary}</p>
              </div>
            </Link>

            <div className="mb-4 flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-sky-500" />
              <h2 className="text-lg font-bold text-neutral-900">타임라인</h2>
            </div>
            <div className="mb-8 flex flex-col">
              {analysis.timeline.map((item, index) => {
                const { Icon: StepIcon, circleClassName } = resolveStepIcon(item);
                return (
                <div key={`${item.title}-${index}`} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-sm ${circleClassName}`}>
                      <StepIcon />
                    </span>
                    {index < analysis.timeline.length - 1 && (
                      <span className="w-px flex-1 bg-neutral-200" />
                    )}
                  </div>

                  <div className={`flex flex-1 flex-col gap-2.5 ${index < analysis.timeline.length - 1 ? "pb-6" : ""}`}>
                    <div className="flex items-start justify-between gap-2 pt-1.5">
                      <div>
                        <p className="text-[15px] font-semibold leading-snug text-neutral-900">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                        {item.time}
                      </span>
                    </div>

                    {item.tipMessage && (
                      <div className="flex items-start gap-2.5 rounded-[16px] bg-sky-50 px-4 py-3">
                        <BagIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                        <p className="text-xs leading-relaxed text-sky-800">{item.tipMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>

            {analysis.recommendedProducts.length > 0 && (
              <div className="mb-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-4 w-1 rounded-full bg-sky-500" />
                  <h2 className="text-lg font-bold text-neutral-900">추천 아이템</h2>
                </div>
                {analysis.recommendationReason && (
                  <p className="mb-4 text-xs leading-relaxed text-neutral-500">
                    {analysis.recommendationReason}
                  </p>
                )}
                <div className="flex flex-col gap-3">
                  {analysis.recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3.5 rounded-[20px] bg-[#E7F6FD] p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-neutral-900">{product.name}</p>
                          {product.isVipExclusive && (
                            <span className="rounded-full bg-sky-500 px-1.5 py-0.5 text-[9px] font-bold text-sky-50">
                              VIP
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed text-neutral-500">
                          {product.description}
                        </p>
                        <p className="text-xs font-semibold text-sky-700">
                          {formatKRW(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
