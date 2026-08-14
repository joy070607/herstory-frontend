import type { VipTier } from "@/types/api.types";
import { formatMiles } from "@/utils/format";

interface TierBadgeProps {
  tier: VipTier;
  miles: number;
}

export function TierBadge({ tier, miles }: TierBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
      <span aria-hidden>◆</span>
      <span>{tier}</span>
      <span className="text-neutral-400">·</span>
      <span className="font-mono">{formatMiles(miles)}</span>
    </div>
  );
}
