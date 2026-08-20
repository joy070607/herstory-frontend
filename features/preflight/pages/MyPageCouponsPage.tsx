"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useMyCoupons } from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { ROUTES } from "@/constants/routes";
import {
  BagIcon,
  CareIcon,
  ChevronRightIcon,
  DiscountIcon,
  LoungeIcon,
  ShirtIcon,
} from "@/components/icons";
import type { CouponCategory, CouponItem } from "@/types/api.types";

const CATEGORY_ICON: Record<CouponCategory, ReactNode> = {
  DISCOUNT: <DiscountIcon className="h-6 w-6" />,
  LOUNGE: <LoungeIcon className="h-6 w-6" />,
  VIP_FITTING: <ShirtIcon className="h-6 w-6" />,
  LEATHER_CARE: <CareIcon className="h-6 w-6" />,
  AIRPORT_PICKUP: <BagIcon className="h-6 w-6" />,
};

function CouponRow({ coupon }: { coupon: CouponItem }) {
  const expired = coupon.status !== "AVAILABLE";
  return (
    <Link
      href={`${ROUTES.myPageCoupons}/${coupon.couponId}`}
      className={`flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5 ${expired ? "opacity-50" : ""}`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
        {CATEGORY_ICON[coupon.category]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900">{coupon.title}</p>
        <p className={`mt-0.5 text-xs ${coupon.urgent ? "text-amber-600" : "text-neutral-400"}`}>
          {coupon.status === "USED"
            ? "사용 완료"
            : coupon.status === "EXPIRED"
              ? "기간 만료"
              : coupon.subtitle}
        </p>
      </div>
      <ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />
    </Link>
  );
}

export function MyPageCouponsPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data, isLoading, isError, refetch } = useMyCoupons(memberId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">쿠폰 · 혜택</h1>
        </div>

        <p className="text-sm text-neutral-400">면세 결제 또는 여정 등록 시 자동 적용됩니다.</p>

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {data && data.items.length === 0 && (
          <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-center">
            <p className="text-sm font-medium text-neutral-500">보유한 쿠폰이 없어요</p>
          </div>
        )}

        {data && data.items.length > 0 && (
          <div className="flex flex-col gap-3">
            {data.items.map((coupon) => (
              <CouponRow key={coupon.couponId} coupon={coupon} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
