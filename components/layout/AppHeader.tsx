"use client";

import { Logo } from "@/components/Logo";
import { MenuIcon } from "@/components/icons";

interface AppHeaderProps {
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export function AppHeader({ showMenu = true, onMenuClick }: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-100 bg-[#EEF9FD] px-4">
      <Logo variant="wordmark" priority />
      {showMenu && (
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="메뉴 열기"
          className="flex h-8 w-8 items-center justify-center text-neutral-400"
        >
          <MenuIcon />
        </button>
      )}
    </header>
  );
}
