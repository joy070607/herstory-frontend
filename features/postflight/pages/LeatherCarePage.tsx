"use client";

import Image from "next/image";
import { useJourneyStore } from "@/store/journeyStore";
import { useAiCareTip, useJourney } from "@/hooks/queries";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";

// 알림 카드에 표시할 대상 제품 — 실제 개인 컬렉션 API가 아직 없어 데모에 쓰인 제품명을 그대로 질의합니다.
const FEATURED_PRODUCT = "비세토스 스타크 백팩";

export function LeatherCarePage() {
  const journeyId = useJourneyStore((state) => state.journeyId);
  const lang = useJourneyStore((state) => state.lang);
  const { data: journey } = useJourney(journeyId);

  const {
    data: careTip,
    isLoading,
    isError,
    refetch,
  } = useAiCareTip({
    productName: FEATURED_PRODUCT,
    weather: journey?.destinationWeather,
    lang,
  });

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col pb-[60px] pt-5">
        <div className="mb-3 px-6">
          <BackButton />
        </div>

        <div className="mx-6 mb-5 rounded-[30px] bg-[#0EA5E9] px-[23px] pb-[18px] pt-5">
          <p className="mb-3.5 text-[15px] text-[#E6F7FF]">현재 환경</p>
          <p className="mb-6 ml-px text-[22px] font-bold text-[#E6F7FF]">
            {journey?.destination ?? "여정 정보 없음"}
          </p>
          {journey?.destinationWeather && (
            <div className="flex items-center justify-between px-0.5 pt-5">
              <p className="pr-4 text-sm text-[#E6F7FF]">{journey.destinationWeather}</p>
              <Image
                src="/icons/humidity.png"
                alt=""
                width={21}
                height={21}
                className="h-[21px] w-[21px] shrink-0"
              />
            </div>
          )}
        </div>

        <div className="mx-6 mb-7 rounded-[30px] bg-[#E6F7FF] py-4 pl-[15px] pr-[34px]">
          <div className="mb-3.5 flex items-center gap-1.5">
            <Image
              src="/icons/care-alert.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="text-[15px] text-[#0369A1]">긴급 케어 알림</span>
          </div>
          <p className="mb-6 ml-[3px] text-[22px] font-bold text-[#0A0A0A]">{FEATURED_PRODUCT}</p>
          {isLoading && <WakingScreen />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {careTip && <p className="ml-0.5 text-xs leading-relaxed text-[#0A0A0A]">{careTip}</p>}
        </div>

        <div className="mb-4 flex items-center justify-between px-[26px]">
          <span className="text-[22px] font-bold text-[#0A0A0A]">나의 컬렉션 상태</span>
          <span className="text-[13px] text-[#0369A1]">전체 보기</span>
        </div>

        <div className="mx-6 mb-[15px] flex items-center rounded-[20px] bg-[#D9D9D966] px-2 py-2.5">
          <Image
            src="/care/bag-tote.png"
            alt="비세토스 뮌헨 토트"
            width={65}
            height={65}
            className="mr-[22px] h-[65px] w-[65px] rounded-xl object-cover"
          />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="mb-3 text-lg text-[#0A0A0A]">비세토스 뮌헨 토트</p>
              <p className="text-[13px] text-[#0A0A0A]">최근 관리일: 12일 전</p>
            </div>
            <span className="rounded-[20px] bg-[#D3F0DF] px-[11px] py-1 text-[13px] text-[#44C67C]">
              최적
            </span>
          </div>
        </div>

        <div className="mx-6 flex items-center rounded-[20px] bg-[#D9D9D966] px-2 py-2.5">
          <Image
            src="/care/bag-crossbody.png"
            alt="아렌 크로스바디"
            width={65}
            height={65}
            className="mr-[22px] h-[65px] w-[65px] rounded-xl object-cover"
          />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="mb-2 text-lg text-[#0A0A0A]">아렌 크로스바디</p>
              <p className="text-[13px] text-[#0A0A0A]">최근 관리일: 84일 전</p>
            </div>
            <span className="rounded-[20px] bg-[#F0D3D3] px-1 py-[5px] text-[13px] text-[#C64F44]">
              컨디셔닝 필요
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
