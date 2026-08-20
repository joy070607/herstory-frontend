"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { Toggle } from "@/components/ui/Toggle";
import { useAuthStore } from "@/store/authStore";
import { useMemberPassport, useUpdatePassport } from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { ROUTES } from "@/constants/routes";
import { ChevronRightIcon, PassportIcon, SparklesIcon, UserPlusIcon } from "@/components/icons";

function InfoRow({
  icon,
  title,
  subtitle,
  right,
  href,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  right: ReactNode;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="mt-0.5 text-xs text-neutral-400">{subtitle}</p>
      </div>
      {right}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5 transition-transform active:scale-[0.98]"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5">{content}</div>;
}

export function MyPagePassportInfoPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data: passport, isLoading, isError, refetch } = useMemberPassport(memberId);
  const updatePassportMutation = useUpdatePassport(memberId);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">여권 · 탑승객 정보</h1>
        </div>

        <p className="text-sm text-neutral-400">면세 구매와 항공편 등록에 사용되는 정보입니다.</p>

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {passport && (
          <div className="flex flex-col gap-3">
            <InfoRow
              icon={<PassportIcon className="h-5 w-4" />}
              title={passport.name}
              subtitle={passport.formattedDetail}
              right={<ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />}
              href={ROUTES.myPagePassportEdit}
            />
            <InfoRow
              icon={<UserPlusIcon className="h-6 w-6" />}
              title="탑승객 추가"
              subtitle="가족 · 동반자 정보 등록"
              right={<ChevronRightIcon className="h-3 w-2 shrink-0 text-neutral-300" />}
              href={ROUTES.myPagePassportCompanion}
            />
            <InfoRow
              icon={<SparklesIcon className="h-6 w-6" />}
              title="자동 입력 사용"
              subtitle="면세 결제 시 여권 정보 자동 채움"
              right={
                <Toggle
                  checked={passport.autoFill}
                  onChange={(value) => {
                    updatePassportMutation.mutate({
                      passportNumber: passport.passportNumber,
                      expiryDate: passport.expiryDate,
                      autoFill: value,
                    });
                  }}
                  label="자동 입력 사용"
                />
              }
            />
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
