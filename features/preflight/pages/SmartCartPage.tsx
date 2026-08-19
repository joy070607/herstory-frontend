"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { useCart } from "@/hooks/queries";
import { ProductRow } from "@/components/ui/ProductRow";
import { AiHotBar } from "@/components/layout/AiHotBar";

export function SmartCartPage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: items } = useCart(journeyId);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 px-6 py-8">
        <h1 className="text-lg font-semibold">Smart Cart</h1>
        <div className="flex flex-col divide-y divide-neutral-100">
          {Array.isArray(items) &&
            items.map((product) => <ProductRow key={product.id} product={product} />)}
        </div>
      </div>
      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
