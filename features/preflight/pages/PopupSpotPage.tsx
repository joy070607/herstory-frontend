"use client";

import { AirportMiniMap } from "@/features/preflight/components/AirportMiniMap";

const POPUP_SPOTS = [
  { id: "gate-12", label: "Gate 12 Popup", x: 30, y: 40 },
  { id: "duty-free", label: "Duty Free", x: 65, y: 55 },
];

export function PopupSpotPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8">
      <h1 className="text-lg font-semibold">Popup Spot</h1>
      <AirportMiniMap spots={POPUP_SPOTS} />
    </div>
  );
}
