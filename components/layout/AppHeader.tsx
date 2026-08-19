"use client";

import Image from "next/image";
import { Logo } from "@/components/Logo";

interface AppHeaderProps {
  showMyButton?: boolean;
  onMyClick?: () => void;
}

export function AppHeader({ showMyButton = true, onMyClick }: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-100 bg-[#EEF9FD] px-4">
      <Logo variant="wordmark" priority />
      {showMyButton && (
        <button type="button" onClick={onMyClick} aria-label="마이페이지">
          <Image src="/icons/MY.svg" alt="" width={44} height={28} />
        </button>
      )}
    </header>
  );
}
