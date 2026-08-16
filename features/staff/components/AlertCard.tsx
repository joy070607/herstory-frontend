import type { CheckInResponse } from "@/types/api.types";

export function AlertCard({ checkIn }: { checkIn: CheckInResponse }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-neutral-200 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {checkIn.memberName} · {checkIn.vipTier}
        </span>
        <span className="font-mono text-xs text-neutral-400">
          {new Date(checkIn.visitedAt).toLocaleTimeString("ko-KR")}
        </span>
      </div>
      <p className="text-sm text-neutral-600">{checkIn.welcomeCouponMessage}</p>
      {checkIn.choiceFitRequested && (
        <span className="w-fit rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">
          피팅 신청
        </span>
      )}
      <span className="text-xs text-neutral-400">
        {checkIn.checkInType} · {checkIn.checkInStatus}
      </span>
    </div>
  );
}
