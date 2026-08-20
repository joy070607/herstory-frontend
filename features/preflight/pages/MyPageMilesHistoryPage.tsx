"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useMilesHistory } from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import {
  AlertTriangleIcon,
  BagIcon,
  LoungeIcon,
  PlaneDepartureIcon,
  RefreshIcon,
} from "@/components/icons";
import type { MilesHistoryItem, MilesHistoryType } from "@/types/api.types";

const TYPE_ICON: Record<MilesHistoryType, React.ReactNode> = {
  EARNED_PURCHASE: <BagIcon className="h-5 w-5" />,
  EARNED_FLIGHT: <PlaneDepartureIcon className="h-5 w-5" />,
  USED_BENEFIT: <LoungeIcon className="h-5 w-5" />,
  TRANSFERRED_OUT: <RefreshIcon className="h-5 w-5" />,
  TRANSFERRED_IN: <RefreshIcon className="h-5 w-5" />,
};

function HistoryRow({ item }: { item: MilesHistoryItem }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
        {TYPE_ICON[item.type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900">{item.title}</p>
        <p className="mt-0.5 text-xs text-neutral-400">
          {item.formattedDate} · {item.amount >= 0 ? "적립" : "사용"}
        </p>
      </div>
      <span
        className={`shrink-0 text-sm font-semibold ${item.amount >= 0 ? "text-sky-600" : "text-neutral-400"}`}
      >
        {item.amount >= 0 ? "+" : ""}
        {item.amount.toLocaleString()}
      </span>
    </div>
  );
}

export function MyPageMilesHistoryPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data, isLoading, isError, refetch } = useMilesHistory(memberId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">마일리지 상세 내역</h1>
        </div>
        <p className="-mt-4 text-sm text-neutral-400">
          최근 12개월 내역입니다. 소멸 예정 마일리지는 매월 1일 갱신됩니다.
        </p>

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {data && data.items.length === 0 && data.expiringMiles <= 0 && (
          <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-center">
            <p className="text-sm font-medium text-neutral-500">아직 내역이 없어요</p>
          </div>
        )}

        {data && (data.items.length > 0 || data.expiringMiles > 0) && (
          <div className="flex flex-col gap-3">
            {data.items.map((item) => (
              <HistoryRow key={item.historyId} item={item} />
            ))}
            {data.expiringMiles > 0 && (
              <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                  <AlertTriangleIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">소멸 예정</p>
                  <p className="mt-0.5 text-xs text-amber-600">
                    {data.expiringDate} · {data.expiringMiles.toLocaleString()} 마일
                  </p>
                </div>
              </div>
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
