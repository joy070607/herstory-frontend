"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useMemberSummary, useUpdateSettings } from "@/hooks/queries";
import { MARKETING_CONSENT_SLUG, getPolicyBySlug } from "@/constants/policies";

export function TermsDetailPage({ slug }: { slug: string }) {
  const policy = getPolicyBySlug(slug);
  const [downloaded, setDownloaded] = useState(false);

  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data: summary } = useMemberSummary(memberId);
  const updateSettings = useUpdateSettings(memberId);

  // 마케팅 수신 동의는 실제 /members/settings API 값입니다. 제3자 정보 제공 동의는
  // 대응하는 백엔드 필드가 없어 로컬 상태로만 관리합니다.
  const thirdPartySharingAgreed = useSettingsStore((state) => state.thirdPartySharingAgreed);
  const setThirdPartySharingAgreed = useSettingsStore((state) => state.setThirdPartySharingAgreed);

  const isMarketingConsent = slug === MARKETING_CONSENT_SLUG;
  const settings = summary?.settings;
  const agreed = isMarketingConsent ? (settings?.marketingOptIn ?? false) : thirdPartySharingAgreed;
  const setAgreed = (value: boolean) => {
    if (isMarketingConsent) {
      if (!settings) return;
      updateSettings.mutate({ ...settings, marketingOptIn: value });
    } else {
      setThirdPartySharingAgreed(value);
    }
  };

  if (!policy) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">{policy.title}</h1>
        </div>

        <div className="-mt-3 flex items-center gap-1.5 text-sm text-neutral-400">
          <span>{policy.metaLabel}</span>
          <span className="text-neutral-300">·</span>
          <span>{policy.metaValue}</span>
        </div>

        {policy.type === "consent" && (
          <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-sm">
            <span className="text-sm font-medium text-neutral-900">동의 상태</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                agreed ? "bg-emerald-100 text-emerald-600" : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {agreed ? "동의함" : "동의 안 함"}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-5 rounded-2xl bg-white px-4 py-5 shadow-sm">
          {policy.sections.map((section) => (
            <div key={section.heading}>
              <p className="mb-1.5 text-sm font-bold text-neutral-900">{section.heading}</p>
              <p className="text-sm leading-relaxed text-neutral-600">{section.body}</p>
            </div>
          ))}
        </div>

        {policy.type === "consent" ? (
          <button
            type="button"
            onClick={() => setAgreed(!agreed)}
            className="rounded-full border border-neutral-300 py-3.5 text-center text-sm font-medium text-neutral-500"
          >
            {agreed ? "동의 철회" : "다시 동의하기"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDownloaded(true)}
            className="rounded-full border border-neutral-300 py-3.5 text-center text-sm font-medium text-neutral-500"
          >
            ↓ 전문 내려받기
          </button>
        )}
        {downloaded && (
          <p className="-mt-3 text-center text-xs text-sky-600">전문을 다운로드했어요.</p>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
