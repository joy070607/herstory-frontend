"use client";

import { useJourneyStore } from "@/store/journeyStore";
import { LangTabs } from "@/features/postflight/components/LangTabs";
import { BottomNav } from "@/components/layout/BottomNav";

export function LeatherCarePage() {
  const lang = useJourneyStore((state) => state.lang);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 px-6 py-8">
        <h1 className="text-lg font-semibold">Leather Care Guide</h1>
        <LangTabs />
        <p className="text-sm text-neutral-600">
          {lang === "ko" && "가죽 제품은 직사광선을 피해 보관하세요."}
          {lang === "en" && "Store leather goods away from direct sunlight."}
          {lang === "ja" && "革製品は直射日光を避けて保管してください。"}
          {lang === "zh" && "请将皮具存放在避免阳光直射的地方。"}
        </p>
      </div>
      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
