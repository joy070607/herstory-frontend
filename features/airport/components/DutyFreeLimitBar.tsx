import { getDutyFreeStatus } from "@/utils/dutyFree";
import { formatKRW } from "@/utils/format";

export function DutyFreeLimitBar({ spentKrw }: { spentKrw: number }) {
  const { limitKrw, remainingKrw, isOverLimit } = getDutyFreeStatus(spentKrw);
  const percent = Math.min((spentKrw / limitKrw) * 100, 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-2 w-full rounded-full bg-neutral-100">
        <div
          className={`h-2 rounded-full ${isOverLimit ? "bg-red-500" : "bg-[#8a5a3b]"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-neutral-500">
        잔여 한도 {formatKRW(remainingKrw)} / {formatKRW(limitKrw)}
      </p>
    </div>
  );
}
