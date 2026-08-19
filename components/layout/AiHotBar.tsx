"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function AiHotBar() {
  return (
    <div className="flex items-center bg-[#E7F6FC] px-[19px] py-[5px]">
      <span className="text-[28px] font-bold text-[#0369A1]">AI</span>
      <div className="flex-1" />
      <Link href={ROUTES.smartCart} className="mr-[38px]" aria-label="스마트 장바구니">
        <Image src="/icons/quickbar-cart.png" alt="" width={38} height={33} />
      </Link>
      <Link
        href={ROUTES.home}
        className="mr-[38px] rounded-[10px] bg-[#0EA5E9] px-[9px] py-2"
        aria-label="홈"
      >
        <Image src="/icons/quickbar-home.png" alt="" width={31} height={34} />
      </Link>
      <Link href={ROUTES.journeyTimeline} aria-label="여정 타임라인">
        <Image src="/icons/quickbar-journey.png" alt="" width={33} height={27} />
      </Link>
      <div className="flex-1" />
      <Link href={ROUTES.leatherCare} aria-label="가죽 케어">
        <Image src="/icons/quickbar-care.png" alt="" width={31} height={31} />
      </Link>
    </div>
  );
}
