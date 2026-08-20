"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useJourneyStore } from "@/store/journeyStore";
import { useCart, useStartFitting } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ROUTES } from "@/constants/routes";
import { HangerIcon, TicketIcon } from "@/components/icons";

export function VipFittingPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const journeyId = useJourneyStore((state) => state.journeyId);
  const { data: cart, isLoading } = useCart(memberId);
  const startFitting = useStartFitting();

  const requestedJourneyId = useRef<string | null>(null);
  useEffect(() => {
    if (journeyId && requestedJourneyId.current !== journeyId) {
      requestedJourneyId.current = journeyId;
      startFitting.mutate(journeyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journeyId]);

  const items = cart?.items ?? [];

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-5 py-6">
        <BackButton />

        {!journeyId && (
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center"
          >
            <TicketIcon className="mb-1 text-neutral-400" />
            <p className="text-base font-semibold text-neutral-700">아직 등록된 여정이 없어요</p>
            <p className="text-sm text-neutral-400">탑승권을 스캔하면 VIP 피팅을 신청할 수 있어요</p>
          </Link>
        )}

        {journeyId && (
          <div className="rounded-[20px] bg-[#E7F6FD] px-6 py-6">
            <div className="mb-5 flex flex-col items-center gap-5">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[24px] bg-sky-500">
                <HangerIcon className="h-[30px] w-[34px] text-[#E6F7FF]" />
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                {startFitting.isSuccess && startFitting.data ? (
                  <p className="text-sm leading-relaxed text-sky-800">{startFitting.data.message}</p>
                ) : startFitting.isError ? (
                  <p className="text-sm leading-relaxed text-red-600">
                    VIP 피팅 신청에 실패했어요. 다시 시도해 주세요.
                  </p>
                ) : (
                  <>
                    <p className="text-lg font-bold text-sky-800">VIP 피팅 신청 중</p>
                    <p className="text-xs leading-relaxed text-sky-800">
                      선택하신 의상을 비치하고 있습니다.
                      <br />
                      준비가 완료되면 즉시 알려드립니다.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={ROUTES.airportMap}
                className="flex-1 rounded-[30px] bg-sky-500 py-3.5 text-center text-sm text-white"
              >
                피팅룸 위치 보기
              </Link>
              <Link
                href={ROUTES.smartCart}
                className="flex-1 rounded-[30px] border-2 border-sky-500 py-3.5 text-center text-sm text-sky-500"
              >
                상품 추가
              </Link>
            </div>
          </div>
        )}

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
              href={ROUTES.smartCart}
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

        {journeyId && (
          <Link
            href={ROUTES.fastCheckout}
            className="rounded-[20px] bg-sky-500 py-3.5 text-center text-base font-bold text-white"
          >
            구매하기
          </Link>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
