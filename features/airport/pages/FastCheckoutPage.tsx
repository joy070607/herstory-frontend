"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { DutyFreeLimitBar } from "@/features/airport/components/DutyFreeLimitBar";
import { useCart } from "@/hooks/queries";
import { formatKRW } from "@/utils/format";
import { Button } from "@/components/ui/Button";

export function FastCheckoutPage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: items } = useCart(journeyId);
  const spentKrw = Array.isArray(items)
    ? items.reduce((sum: number, item: { priceKrw: number }) => sum + item.priceKrw, 0)
    : 0;

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8">
      <h1 className="text-lg font-semibold">Fast Checkout</h1>
      <DutyFreeLimitBar spentKrw={spentKrw} />
      <p className="text-sm text-neutral-600">결제 예정 금액: {formatKRW(spentKrw)}</p>
      <Button variant="ink">결제하기</Button>
    </div>
  );
}
