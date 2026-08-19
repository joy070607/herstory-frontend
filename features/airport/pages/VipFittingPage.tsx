"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCart } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ROUTES } from "@/constants/routes";
import { ShirtIcon, TicketIcon, UserIcon } from "@/components/icons";

export function VipFittingPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data: cart, isLoading } = useCart(memberId);

  const items = cart?.items ?? [];

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-5 py-6">
        <div className="rounded-[20px] bg-[#E7F6FD] px-6 py-6">
          <div className="mb-5 flex flex-col items-center gap-5">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[24px] bg-sky-500">
              <ShirtIcon className="h-[35px] w-[35px] text-white" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-lg font-bold text-sky-800">Room 03 · 준비 중</p>
              <p className="text-xs leading-relaxed text-sky-800">
                선택하신 의상을 비치하고 있습니다.
                <br />
                준비가 완료되면 즉시 알려드립니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex-1 rounded-[30px] bg-sky-500 py-3.5 text-center text-sm text-white"
            >
              피팅룸 위치 보기
            </button>
            <Link
              href={ROUTES.smartCart}
              className="flex-1 rounded-[30px] border-2 border-sky-500 py-3.5 text-center text-sm text-sky-500"
            >
              상품 추가
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[20px] bg-neutral-50 px-6 py-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <p className="text-sm font-bold text-neutral-900">엘레나 R.</p>
              <p className="text-xs text-neutral-400">신뢰 판매원</p>
            </div>
            <button
              type="button"
              className="self-start rounded-full border-2 border-[#BEC7D4] px-4 py-1 text-xs text-neutral-900"
            >
              메시지 보내기
            </button>
          </div>
        </div>

        <div>
          <h2 className="mb-3.5 text-base font-bold text-neutral-900">
            담당 대기목록 ({items.length}개 상품)
          </h2>

          {!memberId && (
            <p className="text-sm text-neutral-400">로그인 후 확인할 수 있어요</p>
          )}

          {memberId && isLoading && (
            <div className="h-40 animate-pulse rounded-[20px] bg-neutral-100" />
          )}

          {memberId && cart && items.length === 0 && (
            <Link
              href={ROUTES.boardingPass}
              className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-8 text-center"
            >
              <TicketIcon className="mb-1 text-neutral-400" />
              <p className="text-sm text-neutral-500">아직 준비된 상품이 없어요</p>
            </Link>
          )}

          {memberId && items.length > 0 && (
            <div className="flex flex-col">
              {items.map((item, index) => (
                <div key={item.cartItemId}>
                  <div className="flex items-center gap-4 py-3.5">
                    <div className="relative h-[51px] w-12 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base text-neutral-900">{item.productName}</span>
                      <span className="text-sm text-neutral-400">
                        {item.brand}
                        {item.quantity > 1 ? ` · 수량 ${item.quantity}개` : ""}
                      </span>
                    </div>
                  </div>
                  {index < items.length - 1 && <div className="h-px bg-neutral-200" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
