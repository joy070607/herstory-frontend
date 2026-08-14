"use client";

import { useAuthStore } from "@/store/authStore";
import { useNomadMiles } from "@/hooks/queries";
import { Stat } from "@/components/ui/Stat";
import { StampGrid } from "@/features/postflight/components/StampGrid";
import { BottomNav } from "@/components/layout/BottomNav";

export function NomadMilesPage() {
  const member = useAuthStore((state) => state.member);
  const { data } = useNomadMiles(member?.id ?? null);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 px-6 py-8">
        <h1 className="text-lg font-semibold">Nomad Miles</h1>
        <Stat value={member?.nomadMiles ?? 0} label="Total Miles" />
        <StampGrid earned={data?.stamps ?? []} totalSlots={9} />
      </div>
      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
