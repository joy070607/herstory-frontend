"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useAuthStore } from "@/store/authStore";
import { useAddToCart, useCart, useStyleRecommendations } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { ROUTES } from "@/constants/routes";
import type { Product, ProductCategory } from "@/types/api.types";
import { ShirtIcon, SpotIcon, TicketIcon } from "@/components/icons";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  WATERPROOF: "방수",
  BACKPACK: "백팩",
  TRAVEL_BAG: "여행가방",
  ACCESSORY: "액세서리",
  LEATHER_CARE: "가죽 케어",
  READY_TO_WEAR: "레디투웨어",
  LIMITED_EDITION: "리미티드 에디션",
};

const CATEGORY_FILTERS: { label: string; categories: ProductCategory[] | null }[] = [
  { label: "전체 큐레이션", categories: null },
  {
    label: "가죽 제품",
    categories: ["WATERPROOF", "LEATHER_CARE", "TRAVEL_BAG", "BACKPACK", "ACCESSORY"],
  },
  { label: "레디투웨어", categories: ["READY_TO_WEAR", "LIMITED_EDITION"] },
];

export function SmartCartPage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;

  const { data: products, isLoading } = useStyleRecommendations(journeyId);
  const { data: cart } = useCart(memberId);
  const addToCart = useAddToCart(memberId);

  const [activeFilter, setActiveFilter] = useState(0);
  const [pendingProductId, setPendingProductId] = useState<number | null>(null);

  const handleAdd = (productId: number) => {
    setPendingProductId(productId);
    addToCart.mutate(
      { productId },
      { onSettled: () => setPendingProductId(null) }
    );
  };

  const hero = products?.[0];
  const restProducts = products?.slice(1) ?? [];
  const activeCategories = CATEGORY_FILTERS[activeFilter].categories;
  const filteredProducts = activeCategories
    ? restProducts.filter((product) => activeCategories.includes(product.category))
    : restProducts;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col px-6 py-5">
        {!journeyId && (
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center"
          >
            <TicketIcon className="mb-1 text-neutral-400" />
            <p className="text-base font-semibold text-neutral-700">아직 등록된 여정이 없어요</p>
            <p className="text-sm text-neutral-400">
              탑승권을 스캔하면 맞춤 스타일 추천을 볼 수 있어요
            </p>
            <span className="mt-3 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-sky-50">
              탑승권 스캔하기
            </span>
          </Link>
        )}

        {journeyId && isLoading && (
          <div className="h-[420px] animate-pulse rounded-[20px] bg-neutral-100" />
        )}

        {journeyId && products && (
          <>
            <div className="mb-5 flex items-center gap-2">
              <span className="flex flex-1 items-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-sm font-medium text-sky-50">
                <ShirtIcon className="h-4 w-4 shrink-0" />
                피팅 {cart?.items.length ?? 0}개 준비 완료
              </span>
              <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-900">
                <SpotIcon className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                터미널 1
              </span>
            </div>

            {hero && (
              <div className="mb-5 rounded-[20px] bg-neutral-100 p-3.5">
                <div className="relative mb-3 h-[180px] overflow-hidden rounded-[16px] bg-neutral-200">
                  <Image
                    src={hero.imageUrl}
                    alt={hero.name}
                    fill
                    sizes="360px"
                    className="object-contain"
                  />
                </div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  공항 한정
                </p>
                <p className="mb-1.5 text-lg font-bold text-neutral-900">{hero.name}</p>
                <p className="mb-4 text-sm leading-relaxed text-neutral-500">{hero.description}</p>
                <button
                  type="button"
                  onClick={() => handleAdd(hero.id)}
                  disabled={!memberId || pendingProductId === hero.id}
                  className="w-full rounded-[20px] bg-sky-500 py-3 text-sm font-semibold text-sky-50 disabled:opacity-40"
                >
                  스마트 피팅 담기
                </button>
              </div>
            )}

            <div className="mb-5 flex items-center gap-2">
              {CATEGORY_FILTERS.map((filter, index) => (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => setActiveFilter(index)}
                  className={`flex-1 rounded-[20px] py-3 text-sm font-medium transition-colors ${
                    activeFilter === index
                      ? "bg-neutral-900 text-neutral-100"
                      : "bg-neutral-100 text-neutral-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <p className="py-8 text-center text-sm text-neutral-400">
                이 카테고리에는 추천 상품이 아직 없어요
              </p>
            ) : (
              <div className="mb-4 flex flex-col gap-3.5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    disabled={!memberId || pendingProductId === product.id}
                    onAdd={() => handleAdd(product.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}

function ProductCard({
  product,
  disabled,
  onAdd,
}: {
  product: Product;
  disabled: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="flex gap-3 rounded-[20px] bg-neutral-100/60 p-3.5">
      <div className="relative h-[75px] w-[75px] shrink-0 overflow-hidden rounded-2xl bg-neutral-200">
        <Image src={product.imageUrl} alt={product.name} fill sizes="75px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            {CATEGORY_LABELS[product.category]}
          </p>
          <p className="text-sm font-semibold text-neutral-900">{product.name}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{product.description}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="mt-2 self-end rounded-[20px] border border-sky-500 bg-sky-50 px-3.5 py-1 text-sm font-medium text-sky-500 disabled:opacity-40"
        >
          + 담기
        </button>
      </div>
    </div>
  );
}
