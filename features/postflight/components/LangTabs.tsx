"use client";

import { useJourneyStore } from "@/store/journeyStore";

const LANGS = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
  { code: "zh", label: "ZH" },
] as const;

export function LangTabs() {
  const lang = useJourneyStore((state) => state.lang);
  const setLang = useJourneyStore((state) => state.setLang);

  return (
    <div className="flex gap-2">
      {LANGS.map((item) => (
        <button
          key={item.code}
          onClick={() => setLang(item.code)}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            lang === item.code ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
