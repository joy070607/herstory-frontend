"use client";

import { useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { SideMenu } from "@/components/layout/SideMenu";

interface AppHeaderProps {
  showMenuButton?: boolean;
}

export function AppHeader({ showMenuButton = true }: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-100 bg-[#EEF9FD] px-4">
      <Logo variant="wordmark" priority />
      {showMenuButton && (
        <>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴"
            className="p-2"
          >
            <Image src="/icons/menu.svg" alt="" width={22} height={15} />
          </button>
          <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
      )}
    </header>
  );
}
