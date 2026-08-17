"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const NAV_ITEMS = [
  { label: "Home", href: ROUTES.home },
  { label: "Journey", href: ROUTES.journeyTimeline },
  { label: "Cart", href: ROUTES.smartCart },
  { label: "Miles", href: ROUTES.nomadMiles },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-16 items-center justify-around border-t border-neutral-200 bg-white">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs font-medium ${isActive ? "text-neutral-900" : "text-neutral-400"}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
