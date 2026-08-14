import Link from "next/link";
import type { CheckInResponse } from "@/types/api.types";
import { ROUTES } from "@/constants/routes";

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
      <span className="text-xs text-neutral-400">
        {checkIn.checkInType} · {checkIn.checkInStatus}
      </span>
      {checkIn.choiceFitRequested && (
        <Link
          href={`${ROUTES.choiceFitPreview}?memberId=${checkIn.memberId}`}
          className="mt-2 self-start rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-medium text-white"
        >
          피팅 상품 준비하기
        </Link>
      )}
    </div>
  );
}
