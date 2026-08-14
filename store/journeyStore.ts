import { create } from "zustand";
import type { PurchaseStatus } from "@/types/api.types";

interface JourneyState {
  journeyId: string | null;
  choiceFit: boolean;
  purchaseStatus: PurchaseStatus | null;
  lang: "ko" | "en" | "ja" | "zh";
  setJourneyId: (journeyId: string | null) => void;
  setChoiceFit: (choiceFit: boolean) => void;
  setPurchaseStatus: (purchaseStatus: PurchaseStatus | null) => void;
  setLang: (lang: JourneyState["lang"]) => void;
  reset: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  journeyId: null,
  choiceFit: false,
  purchaseStatus: null,
  lang: "ko",
  setJourneyId: (journeyId) => set({ journeyId }),
  setChoiceFit: (choiceFit) => set({ choiceFit }),
  setPurchaseStatus: (purchaseStatus) => set({ purchaseStatus }),
  setLang: (lang) => set({ lang }),
  reset: () =>
    set({ journeyId: null, choiceFit: false, purchaseStatus: null, lang: "ko" }),
}));
