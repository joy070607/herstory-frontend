import { create } from "zustand";
import { persist } from "zustand/middleware";

// 제3자 정보 제공 동의는 대응하는 백엔드 필드가 없어 로컬에만 저장합니다.
// (마일리지·여정 알림, 마케팅 수신 동의는 실제 /members/settings API로 옮겨졌습니다.)
interface SettingsState {
  thirdPartySharingAgreed: boolean;
  setThirdPartySharingAgreed: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      thirdPartySharingAgreed: true,
      setThirdPartySharingAgreed: (thirdPartySharingAgreed) => set({ thirdPartySharingAgreed }),
    }),
    { name: "herstory-settings", skipHydration: true }
  )
);
