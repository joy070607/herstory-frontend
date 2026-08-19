"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useJourneyStore } from "@/store/journeyStore";
import { useAuthStore } from "@/store/authStore";
import { useCart, useCheckout } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ROUTES } from "@/constants/routes";
import { formatKRW, formatMiles } from "@/utils/format";
import { getDutyFreeStatus } from "@/utils/dutyFree";
import {
  CheckCircleIcon,
  CreditCardWalletIcon,
  DigitalWalletIcon,
  LockFilledIcon,
  TicketIcon,
} from "@/components/icons";

type PaymentMethod = "card" | "wallet";

// 결제 수단/픽업 일정은 실제 대응 API가 없어서 정적 옵션이에요 (하드코딩이 아니라
// "선택할 수 있는 목록"을 화면에서만 관리하는 거고, 서버로 전송되진 않아요).
const CARD_OPTIONS = [
  { id: "visa-4242", label: "VISA •••• 4242", expiry: "12/25" },
  { id: "mc-8821", label: "Mastercard •••• 8821", expiry: "09/26" },
  { id: "amex-1004", label: "AMEX •••• 1004", expiry: "03/27" },
];

const WALLET_OPTIONS = [
  { id: "apple-pay", label: "Apple Pay" },
  { id: "google-pay", label: "Google Pay" },
  { id: "samsung-pay", label: "Samsung Pay" },
];

const PICKUP_MONTHS = ["11월", "12월", "1월"];
const PICKUP_DAYS = ["19일", "20일", "21일"];
const PICKUP_TIMES = ["11:00 AM", "1:00 PM", "3:00 PM"];

export function FastCheckoutPage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const setPurchaseStatus = useJourneyStore((state) => state.setPurchaseStatus);
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;

  const { data: cart, isLoading } = useCart(memberId);
  const checkout = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedCardId, setSelectedCardId] = useState(CARD_OPTIONS[0].id);
  const [selectedWalletId, setSelectedWalletId] = useState(WALLET_OPTIONS[0].id);
  const [pickupMonth, setPickupMonth] = useState(PICKUP_MONTHS[1]);
  const [pickupDay, setPickupDay] = useState(PICKUP_DAYS[1]);
  const [pickupTime, setPickupTime] = useState(PICKUP_TIMES[1]);

  const spentKrw = cart?.totalPrice ?? 0;
  const { limitKrw, isOverLimit } = getDutyFreeStatus(spentKrw);
  const progressPercent = Math.min((spentKrw / limitKrw) * 100, 100);

  const handleCheckout = () => {
    if (!member || !journeyId) return;
    checkout.mutate(
      { memberId: Number(member.id), journeyId: Number(journeyId) },
      { onSuccess: () => setPurchaseStatus("PURCHASED") }
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
                  <div className="mb-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-[20px] py-3 text-sm font-medium transition-all active:scale-[0.98] ${
                        paymentMethod === "card"
                          ? "bg-sky-500 text-sky-50"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      <CreditCardWalletIcon className="h-4 w-5" />
                      신용카드
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-[20px] py-3 text-sm font-medium transition-all active:scale-[0.98] ${
                        paymentMethod === "wallet"
                          ? "bg-sky-500 text-sky-50"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      <DigitalWalletIcon className="h-4 w-5" />
                      디지털 지갑
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="flex flex-col gap-2.5">
                      {CARD_OPTIONS.map((card) => {
                        const selected = card.id === selectedCardId;
                        return (
                          <button
                            key={card.id}
                            type="button"
                            onClick={() => setSelectedCardId(card.id)}
                            className={`flex items-center gap-3 rounded-[20px] border-2 px-4 py-3.5 text-left transition-all active:scale-[0.99] ${
                              selected
                                ? "border-sky-500 bg-sky-50"
                                : "border-transparent bg-neutral-100"
                            }`}
                          >
                            <CreditCardWalletIcon
                              className={`h-4 w-5 shrink-0 ${selected ? "text-sky-600" : "text-neutral-400"}`}
                            />
                            <span className="flex-1 text-sm text-neutral-900">{card.label}</span>
                            <span className="text-xs text-neutral-400">{card.expiry}</span>
                            {selected && <CheckCircleIcon className="h-4 w-4 shrink-0 text-sky-500" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="flex flex-col gap-2.5">
                      {WALLET_OPTIONS.map((wallet) => {
                        const selected = wallet.id === selectedWalletId;
                        return (
                          <button
                            key={wallet.id}
                            type="button"
                            onClick={() => setSelectedWalletId(wallet.id)}
                            className={`flex items-center gap-3 rounded-[20px] border-2 px-4 py-3.5 text-left transition-all active:scale-[0.99] ${
                              selected
                                ? "border-sky-500 bg-sky-50"
                                : "border-transparent bg-neutral-100"
                            }`}
                          >
                            <DigitalWalletIcon
                              className={`h-4 w-5 shrink-0 ${selected ? "text-sky-600" : "text-neutral-400"}`}
                            />
                            <span className="flex-1 text-sm text-neutral-900">{wallet.label}</span>
                            {selected && <CheckCircleIcon className="h-4 w-4 shrink-0 text-sky-500" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="mb-3.5 text-base font-bold text-neutral-900">픽업 일정</h2>
                  <div className="flex flex-col gap-2">
                    <PickupSlotRow options={PICKUP_MONTHS} value={pickupMonth} onChange={setPickupMonth} />
                    <PickupSlotRow options={PICKUP_DAYS} value={pickupDay} onChange={setPickupDay} />
                    <PickupSlotRow options={PICKUP_TIMES} value={pickupTime} onChange={setPickupTime} />
                  </div>
                </div>

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
  value: string;
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
