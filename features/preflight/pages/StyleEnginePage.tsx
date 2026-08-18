"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { useStyleRecommendations } from "@/hooks/queries";
import { ProductRow } from "@/components/ui/ProductRow";
import { WakingScreen } from "@/components/system/WakingScreen";

export function StyleEnginePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: products, isLoading } = useStyleRecommendations(journeyId);

  return (
    <div className="flex flex-1 flex-col gap-4 px-6 py-8">
      <h1 className="text-lg font-semibold">Style Engine</h1>
      {isLoading && <WakingScreen />}
      <div className="flex flex-col divide-y divide-neutral-100">
        {products?.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
