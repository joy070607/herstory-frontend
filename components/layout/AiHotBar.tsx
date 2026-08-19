"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import {
  AiLogoIcon,
  AirplaneOutlineIcon,
  DressIcon,
  HomeBadgeIcon,
  MileageIcon,
} from "@/components/icons";

export function AiHotBar() {
  return (
    <div className="flex items-center justify-between bg-[#E7F6FC] px-6 py-[5px]">
      <Link href={ROUTES.styleEngine} aria-label="AI 스타일 엔진">
        <AiLogoIcon className="h-[23px] w-7" />
      </Link>
      <Link href={ROUTES.smartCart} aria-label="스마트 장바구니">
        <DressIcon className="h-8 w-8" />
      </Link>
      <Link href={ROUTES.home} aria-label="홈">
        <HomeBadgeIcon className="h-[50px] w-[50px]" />
      </Link>
      <Link href={ROUTES.journeyTimeline} aria-label="여정 타임라인">
        <AirplaneOutlineIcon className="h-[30px] w-9" />
      </Link>
      <Link href={ROUTES.nomadMiles} aria-label="마일리지">
        <MileageIcon className="h-[31px] w-[31px]" />
      </Link>
    </div>
  );
}
