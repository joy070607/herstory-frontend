"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { useAuthStore } from "@/store/authStore";
import { DutyFreeLimitBar } from "@/features/airport/components/DutyFreeLimitBar";
import { useCart, useCheckout } from "@/hooks/queries";
import { formatKRW, formatMiles } from "@/utils/format";
import { Button } from "@/components/ui/Button";

export function FastCheckoutPage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const setPurchaseStatus = useJourneyStore((state) => state.setPurchaseStatus);
  const member = useAuthStore((state) => state.member);
  const { data: items } = useCart(journeyId);
  const spentKrw = Array.isArray(items)
    ? items.reduce((sum: number, item: { priceKrw: number }) => sum + item.priceKrw, 0)
    : 0;

  const checkout = useCheckout(journeyId ?? "");

  const handleCheckout = () => {
    if (!member || !journeyId) return;
    checkout.mutate(
      { memberId: Number(member.id), journeyId: Number(journeyId) },
      { onSuccess: () => setPurchaseStatus("PURCHASED") }
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8">
      <h1 className="text-lg font-semibold">Fast Checkout</h1>
      <DutyFreeLimitBar spentKrw={spentKrw} />
      <p className="text-sm text-neutral-600">결제 예정 금액: {formatKRW(spentKrw)}</p>
      {checkout.isSuccess && checkout.data && (
        <div className="flex flex-col gap-1 rounded-lg bg-neutral-50 p-4 text-sm text-neutral-700">
          <p>면세 할인 {formatKRW(checkout.data.dutyFreeDiscount)}</p>
          <p>최종 결제 금액 {formatKRW(checkout.data.finalAmount)}</p>
          <p>적립 마일리지 {formatMiles(checkout.data.earnedMiles)}</p>
        </div>
      )}
      {checkout.isError && (
        <p className="text-sm text-red-500">결제에 실패했습니다. 다시 시도해 주세요.</p>
      )}
      <Button variant="ink" onClick={handleCheckout} disabled={!member || !journeyId || checkout.isPending}>
        {checkout.isPending ? "결제 처리 중..." : "결제하기"}
      </Button>
    </div>
  );
}
