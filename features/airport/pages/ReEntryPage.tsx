"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useReEntryOptions } from "@/hooks/queries";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export function ReEntryPage() {
  const member = useAuthStore((state) => state.member);
  const { data: reEntry } = useReEntryOptions(member ? Number(member.id) : null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-lg font-semibold">
        {member ? `다시 오셨네요, ${member.name}님` : "재방문을 환영합니다"}
      </h1>
      {reEntry && (
        <p className="text-sm text-neutral-500">
          {reEntry.recommendedAction}
          {reEntry.hasPendingCart && ` · 담아둔 상품 ${reEntry.pendingCartItemCount}개`}
        </p>
      )}
      <div className="flex flex-col gap-2">
        {(reEntry?.availableOptions ?? ["여정 이어가기"]).map((option) => (
          <Link key={option} href={ROUTES.hub}>
            <Button variant="cognac">{option}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
