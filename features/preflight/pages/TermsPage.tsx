"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { Toggle } from "@/components/ui/Toggle";
import { useAuthStore } from "@/store/authStore";
import { useMemberSummary, useUpdateSettings } from "@/hooks/queries";
import { ROUTES } from "@/constants/routes";
import { POLICIES } from "@/constants/policies";
import { ChevronRightIcon, DocumentIcon } from "@/components/icons";

export function TermsPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data: summary } = useMemberSummary(memberId);
  const updateSettings = useUpdateSettings(memberId);

  const settings = summary?.settings;
  const marketingOptIn = settings?.marketingOptIn ?? false;
  const setMarketingOptIn = (value: boolean) => {
    if (!settings) return;
    updateSettings.mutate({ ...settings, marketingOptIn: value });
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">약관 및 정책</h1>
        </div>
        <p className="-mt-3 text-sm text-neutral-400">2026년 3월 1일 개정본이 적용되고 있습니다.</p>

        <div className="rounded-[20px] bg-white px-4 shadow-sm">
          <div className="flex flex-col divide-y divide-neutral-100">
            {POLICIES.map((policy) => (
              <Link
                key={policy.slug}
                href={`${ROUTES.myPageTerms}/${policy.slug}`}
                className="flex items-center gap-3 py-4 transition-transform active:scale-[0.98]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
                  <DocumentIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-neutral-900">{policy.title}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        policy.badge === "필수"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {policy.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-400">{policy.listSubtitle}</p>
                </div>
                <ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-4 shadow-sm">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-900">마케팅 정보 수신</p>
            <p className="mt-0.5 text-xs text-neutral-400">
              동의 철회 시에도 여정 · 마일리지 알림은 계속 발송됩니다.
            </p>
          </div>
          <Toggle checked={marketingOptIn} onChange={setMarketingOptIn} label="마케팅 정보 수신" />
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
