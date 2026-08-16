import type { CheckInResponse } from "@/types/api.types";
import { useReEntryOptions } from "@/hooks/queries";

export function AlertCard({ checkIn }: { checkIn: CheckInResponse }) {
  const isPendingReEntry = checkIn.purchaseStatus === "PENDING_REENTRY";
  const { data: reEntry } = useReEntryOptions(isPendingReEntry ? checkIn.memberId : null);

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
      <span className="text-xs text-neutral-400">
        {checkIn.checkInType} · {checkIn.checkInStatus}
      </span>
      {reEntry && (
        <div className="mt-1 flex flex-col gap-1 rounded-md bg-[#8a5a3b]/10 p-3">
          <span className="text-xs font-medium text-[#8a5a3b]">
            담아둔 상품 {reEntry.pendingCartItemCount}개
          </span>
          <p className="text-sm text-neutral-900">{reEntry.recommendedAction}</p>
        </div>
      )}
    </div>
  );
}
