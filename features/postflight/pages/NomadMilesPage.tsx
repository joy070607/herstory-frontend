"use client";

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useNomadMiles } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { formatMiles } from "@/utils/format";

export function NomadMilesPage() {
  const member = useAuthStore((state) => state.member);
  const { data, isLoading, isError, refetch } = useNomadMiles(member?.id ?? null);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-8">
        {!member && (
          <p className="text-sm text-neutral-500">로그인 후 마일리지를 확인할 수 있어요.</p>
        )}
        {member && isLoading && <WakingScreen />}
        {member && isError && <ErrorState onRetry={() => refetch()} />}

        {data && (
          <div className="rounded-[20px] bg-[#0A0A0A] px-[22px] py-[17px]">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[13px] text-[#E6F7FF]">보유 마일리지</span>
              <div className="flex items-center gap-1 rounded-full bg-[#E6F7FF] px-2.5 py-1">
                <Image
                  src="/icons/verified-badge.png"
                  alt=""
                  width={12}
                  height={12}
                  className="h-3 w-3"
                />
                <span className="text-[8px] text-[#0369A1]">{data.vipTier}</span>
              </div>
            </div>
            <p className="mb-1 text-[13px] text-[#E6F7FF]">{data.memberName}</p>
            <p className="text-[32px] font-bold text-[#E6F7FF]">{formatMiles(data.nomadMiles)}</p>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
