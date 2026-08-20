"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJourneyStore } from "@/store/journeyStore";
import { useAuthStore } from "@/store/authStore";
import { useCart, useCheckout, usePaymentMethods, usePickupSchedule } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ROUTES } from "@/constants/routes";
import { formatKRW, formatMiles } from "@/utils/format";
import { getDutyFreeStatus } from "@/utils/dutyFree";
import {
  CheckCircleIcon,
  CreditCardWalletIcon,
  LockFilledIcon,
  TicketIcon,
} from "@/components/icons";

export function FastCheckoutPage() {
  const router = useRouter();
  const journeyId = useJourneyStore((state) => state.journeyId);
  const setPurchaseStatus = useJourneyStore((state) => state.setPurchaseStatus);
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;

  const { data: cart, isLoading } = useCart(memberId);
  const { data: cards } = usePaymentMethods(memberId);
  const { data: pickupSchedule } = usePickupSchedule(journeyId);
  const checkout = useCheckout();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [pickupMonth, setPickupMonth] = useState<string | null>(null);
  const [pickupDay, setPickupDay] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);

  const activeCardId = selectedCardId ?? cards?.[0]?.cardId ?? null;
  const activePickupMonth = pickupMonth ?? pickupSchedule?.defaultMonth ?? null;
  const activePickupDay = pickupDay ?? pickupSchedule?.defaultDay ?? null;
  const activePickupTime = pickupTime ?? pickupSchedule?.defaultTime ?? null;

  const spentKrw = cart?.totalPrice ?? 0;
  const { limitKrw, isOverLimit } = getDutyFreeStatus(spentKrw);
  const progressPercent = Math.min((spentKrw / limitKrw) * 100, 100);

  const handleCheckout = () => {
    if (!member || !journeyId) return;
    checkout.mutate(
      {
        memberId: Number(member.id),
        journeyId: Number(journeyId),
        pickupMonth: activePickupMonth ?? undefined,
        pickupDay: activePickupDay ?? undefined,
        pickupTime: activePickupTime ?? undefined,
        pickupLocation: pickupSchedule?.pickupDeskLocation,
      },
      {
        onSuccess: () => {
          setPurchaseStatus("PURCHASED");
          router.push(ROUTES.leatherCare);
        },
      }
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-[28px] font-bold text-neutral-900">빠른 결제</h1>
        </div>

        {(!journeyId || !memberId) && (
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center"
          >
            <TicketIcon className="mb-1 text-neutral-400" />
            <p className="text-base font-semibold text-neutral-700">아직 등록된 여정이 없어요</p>
            <p className="text-sm text-neutral-400">탑승권을 스캔하면 빠른 결제를 이용할 수 있어요</p>
          </Link>
        )}

        {journeyId && memberId && isLoading && (
          <div className="h-[420px] animate-pulse rounded-[20px] bg-neutral-100" />
        )}

        {journeyId && memberId && cart && (
          <div className="flex flex-col gap-6 animate-slide-up-in">
            <div className="rounded-[20px] bg-neutral-950 px-5 py-5">
              <p className="mb-3 text-sm text-sky-500">현재 장바구니 총액</p>
              <p className="mb-3 text-2xl font-bold text-white">{formatKRW(spentKrw)}</p>
              <div className="h-[11px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOverLimit ? "bg-red-500" : "bg-gradient-to-r from-[#D97639] to-[#FFBF1D]"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2.5 text-xs text-white/60">
                면세 한도 {formatKRW(limitKrw)} 중 {progressPercent.toFixed(0)}% 사용
              </p>
            </div>

            {checkout.isSuccess && checkout.data ? (
              <div className="flex flex-col gap-4 rounded-[20px] bg-sky-50 p-5 animate-slide-up-in">
                <p className="text-lg font-bold text-neutral-900">결제가 완료됐어요</p>
                <div className="flex flex-col gap-2 text-sm text-neutral-700">
                  <div className="flex items-center justify-between">
                    <span>주문 금액</span>
                    <span>{formatKRW(checkout.data.totalAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sky-700">
                    <span>면세 할인</span>
                    <span>-{formatKRW(checkout.data.dutyFreeDiscount)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-sky-100 pt-2 text-base font-bold text-neutral-900">
                    <span>최종 결제 금액</span>
                    <span>{formatKRW(checkout.data.finalAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between font-medium text-emerald-600">
                    <span>적립 마일리지</span>
                    <span>+{formatMiles(checkout.data.earnedMiles)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="mb-4 text-base font-bold text-neutral-900">주문 요약</h2>
                  {cart.items.length === 0 ? (
                    <p className="py-6 text-center text-sm text-neutral-400">장바구니가 비어있어요</p>
                  ) : (
                    <div className="flex flex-col divide-y divide-neutral-200">
                      {cart.items.map((item) => (
                        <div key={item.cartItemId} className="flex items-center gap-4 py-3.5">
                          <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              sizes="60px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span className="text-sm text-neutral-900">{item.productName}</span>
                            <span className="text-xs text-neutral-400">
                              {item.brand}
                              {item.quantity > 1 ? ` · 수량 ${item.quantity}개` : ""}
                            </span>
                          </div>
                          <span className="text-base text-neutral-900">
                            {formatKRW(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex flex-col gap-2.5 border-t border-neutral-200 pt-3.5">
                    <div className="flex items-center justify-between text-sm text-neutral-900">
                      <span>소계</span>
                      <span>{formatKRW(spentKrw)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-neutral-900">총액</span>
                      <span className="text-xl font-bold text-sky-700">{formatKRW(spentKrw)}</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      면세 할인(등급별 10~15%)과 마일리지 적립은 결제 완료 시 계산돼요.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-3.5 text-base font-bold text-neutral-900">결제 수단</h2>
                  <div className="flex flex-col gap-2.5">
                    {cards && cards.length > 0 ? (
                      cards.map((card) => {
                        const selected = card.cardId === activeCardId;
                        return (
                          <button
                            key={card.cardId}
                            type="button"
                            onClick={() => setSelectedCardId(card.cardId)}
                            className={`flex items-center gap-3 rounded-[20px] border-2 px-4 py-3.5 text-left transition-all active:scale-[0.99] ${
                              selected
                                ? "border-sky-500 bg-sky-50"
                                : "border-transparent bg-neutral-100"
                            }`}
                          >
                            <CreditCardWalletIcon
                              className={`h-4 w-5 shrink-0 ${selected ? "text-sky-600" : "text-neutral-400"}`}
                            />
                            <span className="flex-1 text-sm text-neutral-900">{card.cardName}</span>
                            <span className="text-xs text-neutral-400">
                              {card.subtitle || card.cardNumberMasked}
                            </span>
                            {selected && <CheckCircleIcon className="h-4 w-4 shrink-0 text-sky-500" />}
                          </button>
                        );
                      })
                    ) : (
                      <Link
                        href={ROUTES.myPagePaymentMethods}
                        className="rounded-[20px] border-2 border-dashed border-neutral-200 px-4 py-3.5 text-center text-sm font-medium text-sky-600"
                      >
                        등록된 카드가 없어요 · 카드 등록하기
                      </Link>
                    )}
                  </div>
                </div>

                {pickupSchedule && (
                  <div>
                    <h2 className="mb-3.5 text-base font-bold text-neutral-900">픽업 일정</h2>
                    <div className="flex flex-col gap-2">
                      <PickupSlotRow
                        options={pickupSchedule.months}
                        value={activePickupMonth}
                        onChange={setPickupMonth}
                      />
                      <PickupSlotRow
                        options={pickupSchedule.days}
                        value={activePickupDay}
                        onChange={setPickupDay}
                      />
                      <PickupSlotRow
                        options={pickupSchedule.times}
                        value={activePickupTime}
                        onChange={setPickupTime}
                      />
                    </div>
                    <p className="mt-3 text-xs text-neutral-400">{pickupSchedule.pickupDeskLocation}</p>
                    <p className="mt-1.5 text-xs text-sky-600">{pickupSchedule.recommendedNotice}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkout.isPending || cart.items.length === 0}
                  className="flex items-center justify-center gap-2 rounded-[20px] bg-sky-500 py-4 text-base font-semibold text-sky-50 transition-transform active:scale-[0.98] disabled:opacity-40"
                >
                  <LockFilledIcon className="h-4 w-3.5" />
                  {checkout.isPending ? "결제 처리 중..." : `${formatKRW(spentKrw)} 결제`}
                </button>
                {checkout.isError && (
                  <p className="text-center text-xs text-red-600">
                    결제에 실패했습니다. 다시 시도해 주세요.
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}

function PickupSlotRow({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex-1 rounded-full border py-2.5 text-center text-sm font-medium transition-all active:scale-[0.97] ${
              selected
                ? "border-sky-700 bg-sky-700 text-sky-50"
                : "border-neutral-200 bg-white text-neutral-500"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
