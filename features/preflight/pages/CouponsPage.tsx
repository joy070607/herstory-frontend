"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useMyCoupons } from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { CouponIcon } from "@/components/icons";
import type { CouponCategory, CouponItem, CouponStatus } from "@/types/api.types";

const CATEGORY_LABEL: Record<CouponCategory, string> = {
  DISCOUNT: "할인",
  LOUNGE: "라운지",
  VIP_FITTING: "VIP 피팅",
  LEATHER_CARE: "가죽 케어",
  AIRPORT_PICKUP: "공항 픽업",
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

function CouponCard({ coupon }: { coupon: CouponItem }) {
  const status = STATUS_STYLE[coupon.status];
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
        <CouponIcon className="h-4 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-neutral-900">{coupon.title}</p>
          {coupon.urgent && coupon.status === "AVAILABLE" && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
              만료 임박
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-neutral-400">{coupon.subtitle}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${status.className}`}>
            {status.label}
          </span>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500">
            {CATEGORY_LABEL[coupon.category]}
          </span>
          {coupon.discountRate != null && coupon.discountRate > 0 && (
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500">
              {coupon.discountRate}% 할인
            </span>
          )}
        </div>
        <p className="mt-2 text-[11px] text-neutral-400">
          유효기간 {formatValidUntil(coupon.validUntil)}까지
        </p>
      </div>
    </div>
  );
}

export function CouponsPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data, isLoading } = useMyCoupons(memberId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">쿠폰 · 혜택</h1>
        </div>
        <p className="-mt-3 text-sm text-neutral-400">
          {data ? `보유 쿠폰 ${data.totalCoupons}장` : "면세 할인, 라운지 이용권 등 보유 쿠폰이에요."}
        </p>

        {isLoading && <WakingScreen />}

        {data && data.items.length === 0 && (
          <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-center">
            <p className="text-sm font-medium text-neutral-500">보유한 쿠폰이 없어요</p>
            <p className="text-xs text-neutral-400">면세 구매나 이벤트 참여로 쿠폰을 받아보세요.</p>
          </div>
        )}

        {data && data.items.length > 0 && (
          <div className="flex flex-col gap-3">
            {data.items.map((coupon) => (
              <CouponCard key={coupon.couponId} coupon={coupon} />
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
