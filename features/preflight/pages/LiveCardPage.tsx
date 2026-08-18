"use client";

import { useAuthStore } from "@/store/authStore";
import { AppHeader } from "@/components/layout/AppHeader";
import { TierBadge } from "@/components/ui/TierBadge";
import { MrzBand } from "@/components/signature/MrzBand";

export function LiveCardPage() {
  const member = useAuthStore((state) => state.member);
  const vipTier = useAuthStore((state) => state.vipTier);
  const nomadMiles = useAuthStore((state) => state.nomadMiles);

  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col gap-6 px-6 py-8">
        <h1 className="text-lg font-semibold">Live Card</h1>
        <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4">
          <span className="text-sm font-medium">{member?.name ?? "-"}</span>
          {vipTier && <TierBadge tier={vipTier} miles={nomadMiles} />}
        </div>
        <MrzBand lines={[`MEMBER<<${member?.id ?? ""}`, `TIER<${vipTier ?? ""}`]} />
      </div>
    </>
  );
}
