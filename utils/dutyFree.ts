export const DUTY_FREE_LIMIT_KRW = 800_000;

export interface DutyFreeStatus {
  limitKrw: number;
  spentKrw: number;
  remainingKrw: number;
  isOverLimit: boolean;
}

export function getDutyFreeStatus(
  spentKrw: number,
  limitKrw: number = DUTY_FREE_LIMIT_KRW
): DutyFreeStatus {
  const remainingKrw = Math.max(limitKrw - spentKrw, 0);
  return {
    limitKrw,
    spentKrw,
    remainingKrw,
    isOverLimit: spentKrw > limitKrw,
  };
}
