"use client";

import { useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { Toggle } from "@/components/ui/Toggle";
import { useAuthStore } from "@/store/authStore";
import { useMemberPassport, useUpdatePassport } from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { Lock2Icon } from "@/components/icons";

function LockedField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-sm text-neutral-900">{label}</p>
      <div className="flex items-center justify-between rounded-2xl border border-sky-700/30 bg-[#E8F6FD] p-4">
        <span className="text-lg text-neutral-900">{value}</span>
        <Lock2Icon className="h-4 w-3.5 shrink-0" />
      </div>
    </div>
  );
}

export function MyPagePassportEditPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data: passport, isLoading, isError, refetch } = useMemberPassport(memberId);
  const updatePassportMutation = useUpdatePassport(memberId);

  const hasSyncedForm = useRef(false);
  const [passportNumber, setPassportNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [autoFill, setAutoFill] = useState(true);

  useEffect(() => {
    if (passport && !hasSyncedForm.current) {
      setPassportNumber(passport.passportNumber);
      setExpiryDate(passport.expiryDate);
      setAutoFill(passport.autoFill);
      hasSyncedForm.current = true;
    }
  }, [passport]);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">여권 정보</h1>
        </div>
        <p className="-mt-4 text-sm text-neutral-400">
          면세 구매 및 항공편 등록 시 자동 입력되는 여권 정보입니다.
        </p>

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {passport && (
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              updatePassportMutation.mutate({ passportNumber, expiryDate, autoFill });
            }}
          >
            <LockedField label="이름 (영문)" value={passport.englishName} />

            <div>
              <p className="mb-2 text-sm text-neutral-900">여권 번호</p>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => {
                  setPassportNumber(e.target.value);
                  updatePassportMutation.reset();
                }}
                className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none"
              />
              <p className="mt-1.5 text-[13px] text-neutral-400">
                현재 등록: {passport.maskedPassportNumber}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-neutral-900">여권 만료일</p>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  setExpiryDate(e.target.value);
                  updatePassportMutation.reset();
                }}
                placeholder="YYYY.MM"
                className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none placeholder:text-neutral-300"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">면세 결제 시 자동 입력</p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  동승 {passport.companionCount}명 · 결제 화면에서 여권 정보를 자동으로 채워드려요.
                </p>
              </div>
              <Toggle
                checked={autoFill}
                onChange={(value) => {
                  setAutoFill(value);
                  updatePassportMutation.reset();
                }}
                label="면세 결제 시 자동 입력"
              />
            </div>

            {updatePassportMutation.isSuccess && (
              <p className="text-center text-sm font-medium text-sky-600">
                변경사항이 저장되었습니다.
              </p>
            )}
            {updatePassportMutation.isError && (
              <p className="text-center text-sm font-medium text-red-600">
                저장에 실패했습니다. 다시 시도해 주세요.
              </p>
            )}

            <button
              type="submit"
              disabled={updatePassportMutation.isPending}
              className="rounded-[25px] bg-sky-500 py-3.5 text-center text-lg font-bold text-[#E6F7FF] disabled:opacity-40"
            >
              {updatePassportMutation.isPending ? "저장 중..." : "변경사항 저장"}
            </button>
          </form>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
