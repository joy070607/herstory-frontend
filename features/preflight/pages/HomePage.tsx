"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ROUTES } from "@/constants/routes";
import {
  BagIcon,
  ClockIcon,
  GateIcon,
  LoungeIcon,
  PassportIcon,
  PlaneIcon,
  ShirtIcon,
  TicketIcon,
  WeatherIcon,
} from "@/components/icons";

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col pb-6 pt-5">
        <h1 className="mb-4 px-6 text-[28px] font-bold text-neutral-900">환영합니다,</h1>

        <Link
          href={ROUTES.liveCard}
          className="mx-6 mb-4 block rounded-[20px] bg-[#121111] px-4 py-5"
        >
          <div className="mb-6 flex items-center gap-2.5">
            <span className="rounded-full bg-[#F8FDFF4D] px-3.5 py-1 text-xs text-[#E6F7FF]">
              실시간 상태
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[#FACC154D] bg-[#AC91004D] px-3.5 py-1 text-xs text-[#FDE047]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              게이트 이동 중
            </span>
          </div>
          <p className="mb-6 text-4xl font-bold text-[#E6F7FF]">JL92</p>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-2xl text-[#E6F7FF]">ICN</span>
            <PlaneIcon className="text-[#E6F7FF]" />
            <span className="text-2xl text-[#E6F7FF]">HND</span>
          </div>
          <div className="flex items-center rounded-[20px] bg-[#E6F7FF4D] px-4 py-3.5">
            <div className="flex flex-1 items-center gap-3">
              <GateIcon className="shrink-0 text-white" />
              <div>
                <p className="text-xs text-white">게이트</p>
                <p className="text-xl font-bold text-white">G-12</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/30" />
            <div className="flex flex-1 items-center justify-center gap-3">
              <ClockIcon className="shrink-0 text-white" />
              <div className="text-center">
                <p className="text-xs text-white">탑승 시간</p>
                <p className="text-xl font-bold text-white">14:20</p>
              </div>
            </div>
          </div>
        </Link>

        <div className="mb-8 flex items-center gap-2 px-6">
          <Link
            href={ROUTES.boardingPass}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#D9D9D94D] py-5"
          >
            <TicketIcon className="text-neutral-900" />
            <span className="text-lg text-neutral-900">보딩패스</span>
          </Link>
          <Link
            href={ROUTES.styleEngine}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#0099E51A] py-5"
          >
            <ShirtIcon className="text-sky-500" />
            <span className="text-lg text-sky-500">스타일</span>
          </Link>
          <Link
            href={ROUTES.popupSpot}
            className="flex flex-1 flex-col items-center gap-3 rounded-[20px] bg-[#D9D9D94D] py-5"
          >
            <BagIcon className="text-neutral-900" />
            <span className="text-lg text-neutral-900">공항팝업</span>
          </Link>
        </div>

        <h2 className="mb-3.5 px-6 text-base text-neutral-900">오늘의 날씨</h2>
        <Link
          href={ROUTES.climateGuide}
          className="mx-6 mb-4 flex items-center gap-3 rounded-[20px] bg-sky-500 px-6 py-5"
        >
          <div className="flex items-center gap-3">
            <WeatherIcon className="shrink-0 text-sky-50" />
            <div>
              <p className="mb-1 text-xl text-sky-50">18°</p>
              <p className="text-sm text-sky-50">흐림</p>
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-3 text-sm text-sky-50">비소식이 예상됩니다.</p>
            <p className="text-xl text-sky-50">방수 트렌치 코트 추천</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 px-6">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-3.5 rounded-[20px] border border-sky-500 py-4 text-sky-500"
          >
            <PassportIcon />
            <span className="text-base">내 패스포트</span>
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-[20px] border border-neutral-400 py-4 text-neutral-900"
          >
            <LoungeIcon />
            <span className="text-base">라운지 정보</span>
          </button>
        </div>
      </div>

      <div className="mt-auto">
        <BottomNav />
      </div>
    </div>
  );
}
