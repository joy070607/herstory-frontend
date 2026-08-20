"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { Toggle } from "@/components/ui/Toggle";
import { useSettingsStore } from "@/store/settingsStore";
import { ROUTES } from "@/constants/routes";
import {
  BellIcon,
  CardIcon,
  ChevronRightIcon,
  CouponIcon,
  LockIcon,
  PassportIcon,
  PencilIcon,
  StarIcon,
  UserIcon,
} from "@/components/icons";

// api연동 전 하드코딩 목업 데이터입니다.
const PROFILE = {
  initial: "김",
  name: "김노마드",
  tier: "GOLD",
  email: "vip@mcmworldwide.com",
  miles: 124500,
  coupons: 3,
  journeys: 14,
  nextTier: "PLATINUM",
  milesToNextTier: 25500,
  tierProgressPercent: 54,
};

function StatButton({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col gap-1 rounded-2xl bg-white/10 px-3 py-2.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#E6F7FF]/70">{label}</span>
        <ChevronRightIcon className="h-3 w-2 text-[#E6F7FF]/70" />
      </div>
      <span className="text-lg font-bold text-[#E6F7FF]">{value}</span>
    </Link>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[20px] bg-[#E8F6FD] px-5 py-5">
      <p className="mb-3 text-xs font-medium text-sky-700">{title}</p>
      <div className="flex flex-col divide-y divide-sky-900/10">{children}</div>
    </div>
  );
}

function MenuRow({
  icon,
  title,
  subtitle,
  badge,
  badgeTone = "neutral",
  href,
  toggle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  badgeTone?: "neutral" | "warning";
  href?: string;
  toggle?: { checked: boolean; onChange: (checked: boolean) => void };
}) {
  const badgeClassName =
    badgeTone === "warning"
      ? "rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-700"
      : "rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-sky-600";

  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="mt-0.5 text-xs text-neutral-400">{subtitle}</p>
      </div>
      {toggle ? (
        <Toggle checked={toggle.checked} onChange={toggle.onChange} label={title} />
      ) : (
        <>
          {badge && <span className={badgeClassName}>{badge}</span>}
          {href && <ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />}
        </>
      )}
    </>
  );

  if (toggle || !href) {
    return <div className="flex items-center gap-3 py-3.5">{content}</div>;
  }

  return (
    <Link href={href} className="flex items-center gap-3 py-3.5">
      {content}
    </Link>
  );
}

export function MyPage() {
  const milesAlert = useSettingsStore((state) => state.milesAlert);
  const setMilesAlert = useSettingsStore((state) => state.setMilesAlert);
  const journeyAlert = useSettingsStore((state) => state.journeyAlert);
  const setJourneyAlert = useSettingsStore((state) => state.setJourneyAlert);
  const marketingOptIn = useSettingsStore((state) => state.marketingOptIn);
  const setMarketingOptIn = useSettingsStore((state) => state.setMarketingOptIn);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="rounded-[20px] bg-black px-5 py-5">
          <div className="mb-5 flex items-start gap-3.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-500">
              <span className="text-xl font-bold text-[#E6F7FF]">{PROFILE.initial}</span>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#E6F7FF]">{PROFILE.name}</span>
                <span className="rounded-full border border-[#E6F7FF]/30 bg-[#4B9ACC] px-3 py-0.5 text-xs text-[#E6F7FF]">
                  {PROFILE.tier}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#E6F7FF]/50">{PROFILE.email}</p>
            </div>
            <Link
              href={ROUTES.myPageEditProfile}
              aria-label="회원정보 수정"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#64A9D8] text-white"
            >
              <PencilIcon className="h-3 w-3" />
            </Link>
          </div>

          <div className="mb-5 flex items-center gap-2.5">
            <StatButton label="마일리지" value={PROFILE.miles.toLocaleString()} href={ROUTES.nomadMiles} />
            <StatButton label="쿠폰" value={String(PROFILE.coupons)} href={ROUTES.myPageCoupons} />
            <StatButton label="여정" value={String(PROFILE.journeys)} href={ROUTES.myPageJourneyHistory} />
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E9E9E9]/[0.37]">
            <div
              className="h-full rounded-full bg-[#8FD3FA]"
              style={{ width: `${PROFILE.tierProgressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#B7D8EE]">
            {PROFILE.nextTier}까지 {PROFILE.milesToNextTier.toLocaleString()} 마일
          </p>
        </div>

        <SectionCard title="마일리지">
          <MenuRow
            icon={<StarIcon className="h-5 w-5" />}
            title="마일리지 상세 내역"
            subtitle="적립 · 사용 · 소멸예정"
            badge="등록됨"
            href={ROUTES.nomadMiles}
          />
          <MenuRow
            icon={<CouponIcon className="h-4 w-5" />}
            title="쿠폰 · 혜택"
            subtitle="사용 가능 3장"
            badge="1장 만료 임박"
            badgeTone="warning"
            href={ROUTES.myPageCoupons}
          />
        </SectionCard>

        <SectionCard title="계정 관리">
          <MenuRow
            icon={<UserIcon className="h-5 w-5" />}
            title="회원정보 수정"
            subtitle="이름 · 연락처 · 이메일"
            href={ROUTES.myPageEditProfile}
          />
          <MenuRow
            icon={<LockIcon className="h-4 w-5" />}
            title="비밀번호 재설정"
            subtitle="마지막 변경 3개월 전"
            href={ROUTES.myPagePasswordReset}
          />
          <MenuRow
            icon={<PassportIcon className="h-4 w-5" />}
            title="여권 · 탑승객 정보"
            subtitle="면세 구매 시 자동 입력"
            badge="등록됨"
            href={ROUTES.myPagePassportInfo}
          />
          <MenuRow
            icon={<CardIcon className="h-5 w-4" />}
            title="결제 수단"
            subtitle="카드 2장 등록"
            badge="···· 4412"
            href={ROUTES.myPagePaymentMethods}
          />
        </SectionCard>

        <SectionCard title="알림 · 설정">
          <MenuRow
            icon={<BellIcon className="h-4 w-4" />}
            title="마일리지 알림"
            subtitle="적립 · 소멸 예정 안내"
            toggle={{ checked: milesAlert, onChange: setMilesAlert }}
          />
          <MenuRow
            icon={<BellIcon className="h-4 w-4" />}
            title="여정 알림"
            subtitle="탑승 · 게이트 변경 안내"
            toggle={{ checked: journeyAlert, onChange: setJourneyAlert }}
          />
          <MenuRow
            icon={<BellIcon className="h-4 w-4" />}
            title="마케팅 · 혜택 수신"
            subtitle="팝업 · 프로모션 소식"
            toggle={{ checked: marketingOptIn, onChange: setMarketingOptIn }}
          />
        </SectionCard>

        <SectionCard title="고객 지원">
          <MenuRow
            icon={<UserIcon className="h-5 w-5" />}
            title="1:1 문의"
            subtitle="답변 1건"
            href={ROUTES.myPageInquiry}
          />
          <MenuRow
            icon={<PassportIcon className="h-4 w-5" />}
            title="약관 및 정책"
            subtitle="이용약관 · 개인정보처리방침"
            href={ROUTES.myPageTerms}
          />
          <MenuRow
            icon={<StarIcon className="h-5 w-5" />}
            title="자주 묻는 질문"
            subtitle="궁금한 점을 빠르게 확인해보세요"
            href={ROUTES.myPageFaq}
          />
          <MenuRow
            icon={<CardIcon className="h-5 w-4" />}
            title="앱 버전"
            subtitle="HER-STORY"
            badge="최신"
          />
        </SectionCard>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
