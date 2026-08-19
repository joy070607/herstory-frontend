import type { FlightStatus } from "@/types/api.types";

export const FLIGHT_STATUS_STYLE: Record<
  FlightStatus,
  { label: string; className: string; dotClassName: string }
> = {
  SCHEDULED: {
    label: "탑승 예정",
    className: "border border-[#7DD3FC4D] bg-[#0EA5E94D] text-[#7DD3FC]",
    dotClassName: "bg-[#7DD3FC]",
  },
  BOARDING: {
    label: "게이트 이동 중",
    className: "border border-[#FACC154D] bg-[#AC91004D] text-[#FDE047]",
    dotClassName: "bg-[#FACC15]",
  },
  DELAYED: {
    label: "지연",
    className: "border border-[#FB923C4D] bg-[#7C2D1240] text-[#FDBA74]",
    dotClassName: "bg-[#FB923C]",
  },
  COMPLETED: {
    label: "탑승 완료",
    className: "border border-[#4ADE804D] bg-[#16653440] text-[#86EFAC]",
    dotClassName: "bg-[#4ADE80]",
  },
  CANCELLED: {
    label: "결항",
    className: "border border-[#F871714D] bg-[#7F1D1D40] text-[#FCA5A5]",
    dotClassName: "bg-[#F87171]",
  },
};
