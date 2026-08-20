"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useMyJourneys } from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { PlaneIcon } from "@/components/icons";
import type { FlightStatus, JourneySummaryItem } from "@/types/api.types";

const STATUS_LABEL: Record<FlightStatus, { label: string; className: string }> = {
  SCHEDULED: { label: "탑승 예정", className: "bg-sky-100 text-sky-700" },
  BOARDING: { label: "탑승 중", className: "bg-amber-100 text-amber-700" },
  DELAYED: { label: "지연", className: "bg-orange-100 text-orange-700" },
  COMPLETED: { label: "완료", className: "bg-neutral-100 text-neutral-500" },
  CANCELLED: { label: "결항", className: "bg-red-100 text-red-600" },
};

function formatDeparture(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function JourneyCard({ journey }: { journey: JourneySummaryItem }) {
  const status = STATUS_LABEL[journey.flightStatus];
  return (
    <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">{journey.pnr}</span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${status.className}`}>
          {status.label}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-neutral-900">{journey.origin}</span>
        <PlaneIcon className="h-4 w-4 shrink-0 text-sky-500" />
        <span className="text-lg font-bold text-neutral-900">{journey.destination}</span>
      </div>
      <p className="mt-1.5 text-xs text-neutral-400">{formatDeparture(journey.departureDateTime)}</p>
      {journey.destinationWeather && (
        <p className="mt-2 rounded-xl bg-sky-50 px-3 py-2 text-xs text-sky-700">
          {journey.destinationWeather}
        </p>
      )}
    </div>
  );
}

export function JourneyHistoryPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data, isLoading } = useMyJourneys(memberId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">여정</h1>
        </div>
        <p className="-mt-3 text-sm text-neutral-400">
          {data ? `총 ${data.totalJourneys}건의 여정이에요.` : "지금까지의 비행 여정을 모아봤어요."}
        </p>

        {isLoading && <WakingScreen />}

        {data && data.journeys.length === 0 && (
          <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-center">
            <p className="text-sm font-medium text-neutral-500">아직 여정 기록이 없어요</p>
            <p className="text-xs text-neutral-400">탑승권을 스캔하면 여정이 여기에 쌓여요.</p>
          </div>
        )}

        {data && data.journeys.length > 0 && (
          <div className="flex flex-col gap-3">
            {data.journeys.map((journey) => (
              <JourneyCard key={journey.journeyId} journey={journey} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
