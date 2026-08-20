"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { useJourneyStore } from "@/store/journeyStore";
import { usePickupSchedule } from "@/hooks/queries";
import { ROUTES } from "@/constants/routes";
import { BagIcon, SparklesIcon, SpotIcon, TicketIcon } from "@/components/icons";

function ScheduleOptionRow({
  label,
  options,
  selected,
}: {
  label: string;
  options: string[];
  selected: string;
}) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <span
              key={option}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                isSelected
                  ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {option}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function MyPagePickupSchedulePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: schedule, isLoading, isError, refetch } = usePickupSchedule(journeyId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">픽업 일정</h1>
        </div>

        {!journeyId && (
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center"
          >
            <TicketIcon className="mb-1 text-neutral-400" />
            <p className="text-base font-semibold text-neutral-700">아직 등록된 여정이 없어요</p>
            <p className="text-sm text-neutral-400">탑승권을 스캔하면 픽업 일정을 확인할 수 있어요</p>
          </Link>
        )}

        {journeyId && isLoading && <WakingScreen />}
        {journeyId && isError && <ErrorState onRetry={() => refetch()} />}

        {schedule && (
          <>
            <div className="rounded-[20px] bg-neutral-950 px-5 py-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500">
                  <BagIcon className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs text-white/50">
                    {schedule.airportName} · {schedule.terminal}
                  </p>
                  <p className="text-lg font-bold text-white">{schedule.pnr}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3.5">
                <p className="text-xs text-white/50">출국 예정</p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  {schedule.departureDate} · {schedule.departureTime}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                  <SpotIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-neutral-400">픽업 데스크</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-neutral-800">
                    {schedule.pickupDeskLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-sky-50 px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600">
                  <SparklesIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-sky-600">추천 안내</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-sky-800">
                    {schedule.recommendedNotice}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-[20px] bg-neutral-50 p-5">
              <ScheduleOptionRow label="월" options={schedule.months} selected={schedule.defaultMonth} />
              <ScheduleOptionRow label="일" options={schedule.days} selected={schedule.defaultDay} />
              <ScheduleOptionRow
                label="시간"
                options={schedule.times}
                selected={schedule.defaultTime}
              />
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
