import { create } from "zustand";
import { persist } from "zustand/middleware";

// 마이페이지/약관 화면에서 공유하는 알림·동의 설정입니다 (api연동 전 하드코딩).
interface SettingsState {
  milesAlert: boolean;
  journeyAlert: boolean;
  marketingOptIn: boolean;
  thirdPartySharingAgreed: boolean;
  setMilesAlert: (value: boolean) => void;
  setJourneyAlert: (value: boolean) => void;
  setMarketingOptIn: (value: boolean) => void;
  setThirdPartySharingAgreed: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      milesAlert: true,
      journeyAlert: true,
      marketingOptIn: true,
      thirdPartySharingAgreed: true,
      setMilesAlert: (milesAlert) => set({ milesAlert }),
      setJourneyAlert: (journeyAlert) => set({ journeyAlert }),
      setMarketingOptIn: (marketingOptIn) => set({ marketingOptIn }),
      setThirdPartySharingAgreed: (thirdPartySharingAgreed) => set({ thirdPartySharingAgreed }),
    }),
    { name: "herstory-settings", skipHydration: true }
  )
);
