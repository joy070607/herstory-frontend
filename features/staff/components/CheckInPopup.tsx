"use client";

import { useEffect } from "react";
import type { CheckInResponse } from "@/types/api.types";

const AUTO_DISMISS_MS = 6000;

export function CheckInPopup({
  checkIn,
  onDismiss,
}: {
  checkIn: CheckInResponse;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [checkIn.visitId, onDismiss]);

  return (
    <div
      role="alert"
      className="animate-popup-in fixed right-6 top-6 z-50 w-80 rounded-xl border border-neutral-200 bg-white p-4 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔔</span>
          <span className="text-sm font-semibold">고객 체크인</span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-xs text-neutral-400 hover:text-neutral-600"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
      <p className="mt-2 text-base font-medium">
        {checkIn.memberName} · {checkIn.vipTier}
      </p>
      <p className="mt-1 text-sm text-neutral-600">{checkIn.welcomeCouponMessage}</p>
    </div>
  );
}
