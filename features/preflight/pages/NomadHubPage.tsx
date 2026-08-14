"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { TierBadge } from "@/components/ui/TierBadge";
import { Rule } from "@/components/ui/Rule";
import { BottomNav } from "@/components/layout/BottomNav";
import { ROUTES } from "@/constants/routes";

export function NomadHubPage() {
  const member = useAuthStore((state) => state.member);
  const vipTier = useAuthStore((state) => state.vipTier);
  const nomadMiles = useAuthStore((state) => state.nomadMiles);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 px-6 py-8">
        <h1 className="text-lg font-semibold">{member?.name ?? "Nomad"}</h1>
        {vipTier && <TierBadge tier={vipTier} miles={nomadMiles} />}
        <Rule />
        <nav className="flex flex-col gap-3 text-sm">
          <Link href={ROUTES.liveCard}>Live Card</Link>
          <Link href={ROUTES.boardingPass}>Boarding Pass</Link>
          <Link href={ROUTES.journeyTimeline}>Journey Timeline</Link>
          <Link href={ROUTES.climateGuide}>Climate Guide</Link>
          <Link href={ROUTES.styleEngine}>Style Engine</Link>
          <Link href={ROUTES.popupSpot}>Popup Spot</Link>
          <Link href={ROUTES.smartCart}>Smart Cart</Link>
        </nav>
      </div>
      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
