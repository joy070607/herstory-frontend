"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CartResponse } from "@/types/cart.types";
import { formatKRW } from "@/utils/format";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

function ChoiceFitPresetView() {
  const searchParams = useSearchParams();
  const initialMemberId = searchParams.get("memberId") ?? "";

  const [memberIdInput, setMemberIdInput] = useState(initialMemberId);
  const [memberId, setMemberId] = useState<number | null>(
    initialMemberId ? Number(initialMemberId) : null
  );
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memberId == null) return;

    const controller = new AbortController();

    Promise.resolve()
      .then(() => {
        setIsLoading(true);
        setError(null);
        setCart(null);
        return fetch(`${API_BASE}/api/v1/cart/my?memberId=${memberId}`, {
          signal: controller.signal,
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error(`조회에 실패했습니다 (${res.status})`);
        return res.json() as Promise<CartResponse>;
      })
      .then((data) => setCart(data))
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [memberId]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-6 py-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">VIP 피팅 사전 세팅 조회</h1>
        <p className="text-sm text-neutral-500">
          고객의 ChoiceFit 장바구니 품목을 미리 확인하고 매장에 세팅하세요.
        </p>
      </div>

      {memberId == null ? (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = Number(memberIdInput);
            setMemberId(memberIdInput !== "" && Number.isFinite(parsed) ? parsed : null);
          }}
        >
          <input
            type="number"
            inputMode="numeric"
            placeholder="Member ID"
            value={memberIdInput}
            onChange={(e) => setMemberIdInput(e.target.value)}
            className="h-11 flex-1 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
          />
          <button
            type="submit"
            className="h-11 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white"
          >
            조회
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between text-sm">
          <span className="font-mono text-neutral-500">Member #{memberId}</span>
          <button
            type="button"
            className="text-xs text-neutral-500 underline"
            onClick={() => {
              setMemberId(null);
              setMemberIdInput("");
              setCart(null);
              setError(null);
            }}
          >
            다른 회원 조회
          </button>
        </div>
      )}

      {isLoading && <p className="text-sm text-neutral-400">불러오는 중...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {cart && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>ChoiceFit {cart.choiceFit ? "신청됨" : "미신청"}</span>
            <span>{cart.status}</span>
          </div>

          {cart.items.length === 0 && (
            <p className="text-sm text-neutral-400">담긴 상품이 없습니다.</p>
          )}

          <div className="flex flex-col divide-y divide-neutral-100">
            {cart.items.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- 외부 도메인 이미지, next/image 원격 패턴 미설정 */}
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="h-14 w-14 shrink-0 rounded-md bg-neutral-100 object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{item.productName}</span>
                  <span className="text-xs text-neutral-500">{item.category}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm">{formatKRW(item.price)}</span>
                  <span className="text-xs text-neutral-400">x{item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-sm font-medium">
            <span>합계</span>
            <span className="font-mono">{formatKRW(cart.totalPrice)}</span>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ChoiceFitPresetView />
    </Suspense>
  );
}
