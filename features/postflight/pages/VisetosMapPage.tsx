"use client";

import { SpotMap } from "@/features/postflight/components/SpotMap";

const VISETOS_SPOTS = [
  { id: "flagship", label: "Flagship Store", x: 40, y: 30 },
  { id: "atelier", label: "Atelier", x: 70, y: 60 },
];

export function VisetosMapPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8">
      <h1 className="text-lg font-semibold">Visetos Map</h1>
      <SpotMap spots={VISETOS_SPOTS} />
    </div>
  );
}
