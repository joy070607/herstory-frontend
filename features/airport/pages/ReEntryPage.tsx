"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useReEntryOptions } from "@/hooks/queries";
import { Button } from "@/components/ui/Button";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { ROUTES } from "@/constants/routes";

export function ReEntryPage() {
  const member = useAuthStore((state) => state.member);
  const { data: reEntry, isLoading } = useReEntryOptions(member ? Number(member.id) : null);
  const isPendingReEntry = reEntry?.purchaseStatus === "PENDING_REENTRY";

  let content: ReactNode;

  if (!member || isLoading) {
    content = <p className="text-sm text-neutral-500">확인 중입니다...</p>;
  } else if (!isPendingReEntry) {
    content = (
      <>
        <h1 className="text-lg font-semibold">재방문 대상이 아닙니다</h1>
        <Link href={ROUTES.home}>
          <Button variant="cognac">홈으로 이동</Button>
        </Link>
      </>
    );
  } else {
    content = (
      <>
        <h1 className="text-lg font-semibold">다시 오셨네요, {member.name}님</h1>
        <p className="text-sm text-neutral-500">
          {reEntry.recommendedAction}
          {reEntry.hasPendingCart && ` · 담아둔 상품 ${reEntry.pendingCartItemCount}개`}
        </p>
        <div className="flex flex-col gap-2">
          {reEntry.availableOptions.map((option) => (
            <Link key={option} href={ROUTES.home}>
              <Button variant="cognac">{option}</Button>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        {content}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
