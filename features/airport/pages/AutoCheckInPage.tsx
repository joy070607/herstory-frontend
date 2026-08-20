"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCheckIn } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ROUTES } from "@/constants/routes";
import {
  BluetoothIcon,
  CheckCircleIcon,
  NfcWaveIcon,
  ShoppingBagIcon,
  SignalWavesIcon,
  TicketStubIcon,
} from "@/components/icons";

function splitWelcomeMessage(message: string) {
  const exclaimIndex = message.indexOf("!");
  if (exclaimIndex === -1) return { headline: message, detail: "" };
  return {
    headline: message.slice(0, exclaimIndex),
    detail: message.slice(exclaimIndex + 1).trim(),
  };
}

export function AutoCheckInPage() {
  const member = useAuthStore((state) => state.member);
  const checkIn = useCheckIn();

  useEffect(() => {
    if (!member || checkIn.data || checkIn.isPending) return;
    checkIn.mutate({
      memberId: Number(member.id),
      checkInType: "BLE",
      qrCode: `QR_HST_${member.id}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  const welcome = checkIn.data ? splitWelcomeMessage(checkIn.data.welcomeCouponMessage) : null;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-8">
        <BackButton />

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-sky-200 opacity-75 [animation-duration:2.8s]" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-sky-200 bg-sky-50">
              <SignalWavesIcon className="h-9 w-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">근접 감지됨</h1>
          <p className="text-base leading-relaxed text-neutral-600">
            NFC 및 블루투스 활성화됨.
            <br />
            <span className="animate-soft-pulse inline-flex items-center">
              근처 MCM 부티크 검색중
              <span className="inline-flex">
                <span className="animate-dot-blink [animation-delay:0s]">.</span>
                <span className="animate-dot-blink [animation-delay:0.2s]">.</span>
                <span className="animate-dot-blink [animation-delay:0.4s]">.</span>
              </span>
            </span>
          </p>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-700">
              <BluetoothIcon className="h-3 w-2" />
              BLE 활성
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-700">
              <NfcWaveIcon className="h-3 w-3" />
              NFC 준비됨
            </span>
          </div>
        </div>

        {!member && (
          <p className="text-center text-sm text-neutral-400">로그인 후 이용할 수 있어요</p>
        )}

        {checkIn.isPending && (
          <div className="h-[220px] animate-pulse rounded-[20px] bg-neutral-100" />
        )}

        {checkIn.isError && (
          <p className="text-center text-xs text-red-600">체크인에 실패했습니다.</p>
        )}

        {checkIn.data && welcome && (
          <div className="flex flex-col gap-6 animate-slide-up-in">
            <div className="rounded-[20px] bg-sky-500 px-6 py-6">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-sky-100">
                면세 구역
              </p>
              <p className="text-2xl font-bold leading-snug text-sky-50">{welcome.headline}</p>
              {welcome.detail && (
                <p className="mt-2.5 text-base leading-relaxed text-sky-50/90">{welcome.detail}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.boardingPass}
                className="flex flex-1 flex-col items-center gap-2.5 rounded-[20px] bg-neutral-100 py-6"
              >
                <TicketStubIcon />
                <span className="text-base font-semibold text-neutral-900">탑승권 보기</span>
              </Link>
              <Link
                href={ROUTES.vipFitting}
                className="flex flex-1 flex-col items-center gap-2.5 rounded-[20px] bg-neutral-100 py-6"
              >
                <ShoppingBagIcon />
                <span className="text-base font-semibold text-neutral-900">예약 주문 확인</span>
              </Link>
            </div>

            <div className="rounded-[20px] bg-neutral-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-bold text-neutral-900">체크인 절차</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  보안됨
                </span>
              </div>
              <div className="flex flex-col gap-3.5">
                <ChecklistItem label="근접 연결" done index={0} />
                <ChecklistItem label="프로필 동기화" done index={1} />
                <ChecklistItem
                  label="디지털 컨시어지 준비 중"
                  done={checkIn.data.assistantNotified}
                  index={2}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}

function ChecklistItem({ label, done, index }: { label: string; done: boolean; index: number }) {
  const ringDelay = 0.3 + index * 0.15;

  return (
    <div className="flex items-center gap-3">
      {done ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0 text-emerald-500"
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={50.27}
            transform="rotate(-90 10 10)"
            className="animate-circle-draw"
            style={{ animationDelay: `${ringDelay}s` }}
          />
          <path
            d="M6.5 10.2L8.7 12.4L13.5 7.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={10}
            className="animate-check-draw"
            style={{ animationDelay: `${ringDelay + 0.6}s` }}
          />
        </svg>
      ) : (
        <CheckCircleIcon className="h-5 w-5 shrink-0 text-neutral-300" />
      )}
      <span className={`text-base ${done ? "font-medium text-neutral-900" : "text-neutral-400"}`}>
        {label}
      </span>
    </div>
  );
}
