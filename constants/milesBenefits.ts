import type { BenefitCode } from "@/types/api.types";

export const MILES_BENEFITS: { code: BenefitCode; label: string; cost: number }[] = [
  { code: "LOUNGE_PASS", label: "프리미엄 VIP 라운지 1회 이용권", cost: 3000 },
  { code: "VIP_FITTING", label: "VIP 피팅 서비스", cost: 5000 },
  { code: "LEATHER_CARE_KIT", label: "가죽 케어 키트", cost: 4000 },
  { code: "AIRPORT_PICKUP", label: "공항 픽업 서비스", cost: 8000 },
];
