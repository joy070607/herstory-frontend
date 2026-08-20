"use client";

import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ChevronRightIcon, DiscountIcon, LoungeIcon, ShirtIcon } from "@/components/icons";

// api연동 전 하드코딩 목업 데이터입니다.
const COUPONS = [
  {
    icon: DiscountIcon,
    title: "면세점 10% 할인",
    subtitle: "12월 31일까지 · 인천 T1/T2",
    urgent: false,
  },
  {
    icon: LoungeIcon,
    title: "라운지 1회 무료",
    subtitle: "3월 15일까지",
    urgent: false,
  },
  {
    icon: ShirtIcon,
    title: "VIP 피팅 우선 예약",
    subtitle: "만료 임박 · 8월 31일까지",
    urgent: true,
  },
];

function CouponRow({
  icon,
  title,
  subtitle,
  urgent,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  urgent: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5 py-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D1EDFB] text-sky-500">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-neutral-900">{title}</p>
        <p className={`mt-1 text-[13px] ${urgent ? "text-amber-600" : "text-[#BEC7D4]"}`}>{subtitle}</p>
      </div>
      <ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />
    </div>
  );
}

export function MyPageCouponsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">쿠폰 · 혜택</h1>
        </div>

        <p className="text-sm text-neutral-400">면세 결제 또는 여정 등록 시 자동 적용됩니다.</p>

        <div className="flex flex-col divide-y divide-sky-900/10 rounded-[20px] bg-[#E8F6FD] px-5 py-2">
          {COUPONS.map((coupon) => (
            <CouponRow
              key={coupon.title}
              icon={<coupon.icon className="h-6 w-6" />}
              title={coupon.title}
              subtitle={coupon.subtitle}
              urgent={coupon.urgent}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
