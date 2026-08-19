"use client";

import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ChevronRightIcon, CreditCardWalletIcon, PlusIcon } from "@/components/icons";

// api연동 전 하드코딩 목업 데이터입니다.
const CARDS = [
  { title: "HER-STORY 카드", subtitle: "•••• 4412 · 기본 결제" },
  { title: "신한카드", subtitle: "•••• 8890" },
];

function PaymentRow({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3.5 py-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D1EDFB] text-sky-500">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-neutral-900">{title}</p>
        <p className="mt-1 text-[13px] text-[#BEC7D4]">{subtitle}</p>
      </div>
      <ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />
    </div>
  );
}

export function MyPagePaymentMethodsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">결제 수단</h1>
        </div>

        <p className="text-sm text-neutral-400">면세점 결제와 마일리지 전환에 사용됩니다.</p>

        <div className="flex flex-col divide-y divide-sky-900/10 rounded-[20px] bg-[#E8F6FD] px-5 py-2">
          {CARDS.map((card) => (
            <PaymentRow
              key={card.title}
              icon={<CreditCardWalletIcon className="h-5 w-6" />}
              title={card.title}
              subtitle={card.subtitle}
            />
          ))}
          <PaymentRow
            icon={<PlusIcon className="h-5 w-5" />}
            title="결제 수단 추가"
            subtitle="카드 · 간편결제 등록"
          />
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
