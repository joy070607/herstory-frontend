"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/icons";

export function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="뒤로가기"
      className={`flex h-8 w-8 shrink-0 items-center justify-center text-neutral-900 ${className}`}
    >
      <ChevronLeftIcon />
    </button>
  );
}
