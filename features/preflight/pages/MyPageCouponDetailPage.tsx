"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useMyCoupons } from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { BagIcon, CareIcon, DiscountIcon, LoungeIcon, ShirtIcon } from "@/components/icons";
import type { CouponCategory, CouponStatus } from "@/types/api.types";

const CATEGORY_LABEL: Record<CouponCategory, string> = {
  DISCOUNT: "할인",
  LOUNGE: "라운지",
  VIP_FITTING: "VIP 피팅",
  LEATHER_CARE: "가죽 케어",
  AIRPORT_PICKUP: "공항 픽업",
};

const CATEGORY_ICON: Record<CouponCategory, ReactNode> = {
  DISCOUNT: <DiscountIcon className="h-7 w-7" />,
  LOUNGE: <LoungeIcon className="h-7 w-7" />,
  VIP_FITTING: <ShirtIcon className="h-7 w-7" />,
  LEATHER_CARE: <CareIcon className="h-7 w-7" />,
  AIRPORT_PICKUP: <BagIcon className="h-7 w-7" />,
};

const STATUS_STYLE: Record<CouponStatus, { label: string; className: string }> = {
  AVAILABLE: { label: "사용 가능", className: "bg-sky-100 text-sky-700" },
  USED: { label: "사용 완료", className: "bg-neutral-100 text-neutral-500" },
  EXPIRED: { label: "기간 만료", className: "bg-neutral-100 text-neutral-400" },
};

function formatValidUntil(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    .format(date)
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
}

export function MyPageCouponDetailPage({ couponId }: { couponId: string }) {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data, isLoading, isError, refetch } = useMyCoupons(memberId);
  const [copied, setCopied] = useState(false);

  const coupon = data?.items.find((item) => String(item.couponId) === couponId);

  if (data && !coupon) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">쿠폰 상세</h1>
        </div>

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {coupon && (
          <>
            <div className="rounded-2xl bg-[#E8F6FD] px-5 py-5">
              <div className="mb-1.5 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLE[coupon.status].className}`}
                >
                  {STATUS_STYLE[coupon.status].label}
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-sky-600">
                  {CATEGORY_LABEL[coupon.category]}
                </span>
                {coupon.urgent && coupon.status === "AVAILABLE" && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                    만료 임박
                  </span>
                )}
              </div>
              <p className="mt-2 text-xl font-bold text-neutral-900">{coupon.title}</p>
              <p className="mt-1 text-sm text-neutral-500">{coupon.subtitle}</p>
              {coupon.discountRate != null && coupon.discountRate > 0 && (
                <p className="mt-3 text-3xl font-bold text-sky-600">{coupon.discountRate}% 할인</p>
              )}
            </div>

            <div className="relative flex overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-2 bg-sky-50 py-7 text-sky-500">
                {CATEGORY_ICON[coupon.category]}
                <span className="text-[11px] font-medium text-sky-600">
                  {CATEGORY_LABEL[coupon.category]}
                </span>
              </div>

              <div className="min-w-0 flex-1 border-l-2 border-dashed border-neutral-200 px-5 py-5">
                <p className="text-xs text-neutral-400">쿠폰 코드</p>
                <p className="mt-1.5 break-all font-mono text-base font-bold tracking-wide text-neutral-900">
                  {coupon.couponCode}
                </p>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(coupon.couponCode).catch(() => {});
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="rounded-full border border-sky-500 px-3 py-1.5 text-xs font-medium text-sky-600"
                  >
                    {copied ? "복사됨" : "코드 복사"}
                  </button>
                </div>
                <div className="mt-4 border-t border-neutral-100 pt-3">
                  <p className="text-xs text-neutral-400">유효기간</p>
                  <p className="mt-1 text-sm text-neutral-900">
                    {formatValidUntil(coupon.validUntil)}까지
                  </p>
                </div>
              </div>

              {/* 좌우 펀칭 노치 */}
              <span className="absolute left-0 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              <span className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white" />
            </div>

            <p className="text-center text-xs leading-relaxed text-neutral-400">
              매장 또는 결제 화면에서 위 코드를 제시해주세요.
              <br />
              사용 완료 또는 유효기간이 지난 쿠폰은 자동으로 만료돼요.
            </p>
          </>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
