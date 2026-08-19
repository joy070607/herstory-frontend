"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { Toggle } from "@/components/ui/Toggle";
import { ChevronRightIcon, PassportIcon, SparklesIcon, UserPlusIcon } from "@/components/icons";

// api연동 전 하드코딩 목업 데이터입니다.
const PASSPORT = {
  name: "김노마드 / KIM NOMAD",
  detail: "여권 M1234567 · 2031.04 만료",
};

function InfoRow({
  icon,
  title,
  subtitle,
  right,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  right: ReactNode;
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
      {right}
    </div>
  );
}

export function MyPagePassportInfoPage() {
  const [autoFill, setAutoFill] = useState(true);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">여권 · 탑승객 정보</h1>
        </div>

        <p className="text-sm text-neutral-400">면세 구매와 항공편 등록에 사용되는 정보입니다.</p>

        <div className="flex flex-col divide-y divide-sky-900/10 rounded-[20px] bg-[#E8F6FD] px-5 py-2">
          <InfoRow
            icon={<PassportIcon className="h-5 w-4" />}
            title={PASSPORT.name}
            subtitle={PASSPORT.detail}
            right={<ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />}
          />
          <InfoRow
            icon={<UserPlusIcon className="h-6 w-6" />}
            title="탑승객 추가"
            subtitle="가족 · 동반자 정보 등록"
            right={<ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />}
          />
          <InfoRow
            icon={<SparklesIcon className="h-6 w-6" />}
            title="자동 입력 사용"
            subtitle="면세 결제 시 여권 정보 자동 채움"
            right={<Toggle checked={autoFill} onChange={setAutoFill} label="자동 입력 사용" />}
          />
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
