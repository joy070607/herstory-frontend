import { create } from "zustand";
import type { Member, VipTier } from "@/types/api.types";

interface AuthState {
  member: Member | null;
  vipTier: VipTier | null;
  nomadMiles: number;
  setMember: (member: Member | null) => void;
  setNomadMiles: (nomadMiles: number) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  vipTier: null,
  nomadMiles: 0,
  setMember: (member) =>
    set({
      member,
      vipTier: member?.vipTier ?? null,
      nomadMiles: member?.nomadMiles ?? 0,
    }),
  setNomadMiles: (nomadMiles) => set({ nomadMiles }),
  reset: () => set({ member: null, vipTier: null, nomadMiles: 0 }),
}));
