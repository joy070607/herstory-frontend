"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useMilesHistory, useRedeemBenefit, useTransferMiles, useUseMiles } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { MILES_BENEFITS } from "@/constants/milesBenefits";
import type { MilesHistoryItem } from "@/types/api.types";

type Panel = "use" | "transfer" | "benefits" | null;

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-4 w-1 rounded-full bg-sky-500" />
      <h2 className="text-base font-bold text-neutral-900">{title}</h2>
    </div>
  );
}

function HistoryRow({ item }: { item: MilesHistoryItem }) {
  const isPositive = item.amount > 0;
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div>
        <p className="text-sm text-neutral-900">{item.title}</p>
        <p className="mt-0.5 text-xs text-neutral-400">{item.formattedDate}</p>
      </div>
      <span className={`shrink-0 text-base font-semibold ${isPositive ? "text-[#44C67C]" : "text-red-500"}`}>
        {isPositive ? "+" : ""}
        {item.amount.toLocaleString()}
      </span>
    </div>
  );
}

export function NomadMilesPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data, isLoading, isError, refetch } = useMilesHistory(memberId);

  const [panel, setPanel] = useState<Panel>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [useAmount, setUseAmount] = useState("");
  const [useTitle, setUseTitle] = useState("");
  const [useDescription, setUseDescription] = useState("");
  const useMiles = useUseMiles(memberId);

  const [toEmail, setToEmail] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const transferMiles = useTransferMiles(memberId);

  const redeemBenefit = useRedeemBenefit(memberId);

  const togglePanel = (next: Exclude<Panel, null>) => {
    setMessage(null);
    setPanel((current) => (current === next ? null : next));
  };

  const handleUseSubmit = () => {
    if (!memberId || !useAmount || !useTitle.trim()) return;
    useMiles.mutate(
      {
        memberId,
        amount: Number(useAmount),
        title: useTitle.trim(),
        description: useDescription.trim() || undefined,
      },
      {
        onSuccess: (res) => {
          setMessage(res.message);
          setUseAmount("");
          setUseTitle("");
          setUseDescription("");
          setPanel(null);
        },
      }
    );
  };

  const handleTransferSubmit = () => {
    if (!memberId || !toEmail.trim() || !transferAmount) return;
    transferMiles.mutate(
      { fromMemberId: memberId, toEmail: toEmail.trim(), amount: Number(transferAmount) },
      {
        onSuccess: (res) => {
          setMessage(res.message);
          setToEmail("");
          setTransferAmount("");
          setPanel(null);
        },
      }
    );
  };

  const handleRedeem = (benefitCode: (typeof MILES_BENEFITS)[number]["code"]) => {
    if (!memberId) return;
    redeemBenefit.mutate(
      { memberId, benefitCode },
      {
        onSuccess: (res) => {
          setMessage(res.message);
          setPanel(null);
        },
      }
    );
  };

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
          <>
            {message && (
              <div className="rounded-[16px] bg-sky-50 px-4 py-3 text-xs leading-relaxed text-sky-800">
                {message}
              </div>
            )}

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
              <div className="mb-1 flex items-end gap-2">
                <span className="text-[32px] font-bold leading-none text-[#E6F7FF]">
                  {data.totalMiles.toLocaleString()}
                </span>
                <span className="pb-1 text-sm text-[#E6F7FF]">마일리지</span>
              </div>
              {data.expiringMiles > 0 && (
                <p className="mb-5 text-xs text-[#0EA5E9]">
                  {data.expiringMiles.toLocaleString()}M {data.expiringDate}
                </p>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => togglePanel("use")}
                  className="rounded-[20px] bg-[#0EA5E9] px-5 py-3 text-[13px] font-bold text-[#E6F7FF]"
                >
                  마일리지 사용
                </button>
                <button
                  type="button"
                  onClick={() => togglePanel("transfer")}
                  className="rounded-[20px] border border-[#E6F7FF80] px-11 py-3 text-[13px] font-bold text-[#E6F7FF]"
                >
                  양도
                </button>
              </div>
            </div>

            {panel === "use" && (
              <div className="flex flex-col gap-3 rounded-[20px] border border-neutral-100 bg-neutral-50 p-4">
                <Field
                  id="use-amount"
                  label="사용 마일리지"
                  type="number"
                  min={1}
                  value={useAmount}
                  onChange={(e) => setUseAmount(e.target.value)}
                  placeholder="2000"
                />
                <Field
                  id="use-title"
                  label="사용처"
                  value={useTitle}
                  onChange={(e) => setUseTitle(e.target.value)}
                  placeholder="프리미엄 의전 패스트트랙"
                />
                <Field
                  id="use-description"
                  label="설명 (선택)"
                  value={useDescription}
                  onChange={(e) => setUseDescription(e.target.value)}
                  placeholder="인천공항 T1 전용 통로"
                />
                {useMiles.isError && (
                  <p className="text-xs text-red-600">마일리지 사용에 실패했습니다.</p>
                )}
                <Button
                  onClick={handleUseSubmit}
                  disabled={!useAmount || !useTitle.trim() || useMiles.isPending}
                >
                  {useMiles.isPending ? "처리 중..." : "사용하기"}
                </Button>
              </div>
            )}

            {panel === "transfer" && (
              <div className="flex flex-col gap-3 rounded-[20px] border border-neutral-100 bg-neutral-50 p-4">
                <Field
                  id="transfer-email"
                  label="받는 사람 이메일"
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  placeholder="gold@herstory.com"
                />
                <Field
                  id="transfer-amount"
                  label="양도 마일리지"
                  type="number"
                  min={1}
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="1500"
                />
                {transferMiles.isError && (
                  <p className="text-xs text-red-600">마일리지 양도에 실패했습니다.</p>
                )}
                <Button
                  onClick={handleTransferSubmit}
                  disabled={!toEmail.trim() || !transferAmount || transferMiles.isPending}
                >
                  {transferMiles.isPending ? "처리 중..." : "양도하기"}
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3.5 rounded-[20px] bg-[#E6F7FF] px-5 py-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#0369A1]">VIP 혜택</p>
                <button
                  type="button"
                  onClick={() => togglePanel("benefits")}
                  className="rounded-[20px] bg-[#0EA5E9] px-4 py-1.5 text-xs font-medium text-[#E6F7FF]"
                >
                  {panel === "benefits" ? "닫기" : "+ 혜택 적용"}
                </button>
              </div>
              {panel === "benefits" && (
                <div className="flex flex-col gap-2">
                  {MILES_BENEFITS.map((benefit) => (
                    <button
                      key={benefit.code}
                      type="button"
                      onClick={() => handleRedeem(benefit.code)}
                      disabled={redeemBenefit.isPending || data.totalMiles < benefit.cost}
                      className="flex items-center justify-between rounded-[16px] bg-white px-4 py-3 text-left disabled:opacity-40"
                    >
                      <span className="text-sm text-neutral-900">{benefit.label}</span>
                      <span className="shrink-0 text-xs font-semibold text-sky-700">
                        {benefit.cost.toLocaleString()}M
                      </span>
                    </button>
                  ))}
                  {redeemBenefit.isError && (
                    <p className="text-xs text-red-600">혜택 적용에 실패했습니다.</p>
                  )}
                </div>
              )}
            </div>

            <SectionHeader title="최근 활동" />
            <div className="flex flex-col divide-y divide-neutral-100">
              {data.items.length === 0 && (
                <p className="py-4 text-sm text-neutral-400">아직 활동 내역이 없어요.</p>
              )}
              {data.items.map((item) => (
                <HistoryRow key={item.historyId} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
