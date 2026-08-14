"use client";

import { useNotificationStream } from "@/features/staff/hooks/useNotificationStream";
import { AlertCard } from "@/features/staff/components/AlertCard";

export function StaffTabletPage() {
  const { alerts, isConnected } = useNotificationStream();

  return (
    <div className="flex flex-1 flex-col gap-4 px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Staff Tablet</h1>
        <span
          className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-neutral-300"}`}
          title={isConnected ? "실시간 연결됨" : "연결 대기 중"}
        />
      </div>
      {alerts.length === 0 && (
        <p className="text-sm text-neutral-400">고객 체크인을 기다리는 중입니다.</p>
      )}
      <div className="flex flex-col gap-3">
        {alerts.map((checkIn) => (
          <AlertCard key={checkIn.visitId} checkIn={checkIn} />
        ))}
      </div>
    </div>
  );
}
