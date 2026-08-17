"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useJourneyStore } from "@/store/journeyStore";
import { useScanJourney } from "@/hooks/queries";
import { Field } from "@/components/ui/Field";

// 카메라/OCR 파이프라인이 실제로 붙기 전까지, 촬영 버튼은 명세 예시와 동일한 모의 OCR 텍스트로 스캔을 시뮬레이션합니다.
const MOCK_OCR_TEXT = "BOARDING PASS PNR MCM999 ICN BKK";

export function BoardingPassScanForm() {
  const member = useAuthStore((state) => state.member);
  const setJourneyId = useJourneyStore((state) => state.setJourneyId);
  const scanJourney = useScanJourney();

  const [manualMode, setManualMode] = useState(false);
  const [pnr, setPnr] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleCameraScan = () => {
    if (!member) return;
    scanJourney.mutate(
      { memberId: Number(member.id), rawOcrText: MOCK_OCR_TEXT },
      { onSuccess: (res) => setJourneyId(String(res.journeyId)) }
    );
  };

  const handleManualSubmit = () => {
    if (!member || !pnr.trim()) return;
    scanJourney.mutate(
      {
        memberId: Number(member.id),
        pnr: pnr.trim().toUpperCase(),
        origin: origin.trim().toUpperCase() || undefined,
        destination: destination.trim().toUpperCase() || undefined,
      },
      { onSuccess: (res) => setJourneyId(String(res.journeyId)) }
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-4 ml-6 mt-6 text-[28px] font-bold text-[#1E1E1E]">
        탑승권을 스캔해주세요
      </h1>

      <div className="mx-6 mb-4 rounded-[20px] bg-[#D9D9D980] px-4 py-2 text-center">
        <p className="text-[15px] text-[#0A0A0A]">OCR로 인쇄 탑승권도 인식됩니다.</p>
      </div>

      <button
        type="button"
        onClick={handleCameraScan}
        disabled={!member || scanJourney.isPending}
        className="mx-6 mb-3 flex flex-col items-center justify-center rounded-[20px] border-[3px] border-[#0EA5E9] bg-[#E7F6FD]/30 py-36 disabled:opacity-60"
      >
        <span className="w-28 text-center text-2xl leading-tight text-[#0A0A0A]">
          {scanJourney.isPending ? (
            "스캔 중..."
          ) : (
            <>
              QR <br /> 카메라 스캔
            </>
          )}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setManualMode((prev) => !prev)}
        className="mx-6 mb-3 rounded-[20px] bg-[#E7F6FD] py-3 text-2xl text-[#868686]"
      >
        PNR 수동 입력
      </button>

      {manualMode && (
        <div className="mx-6 mb-3 flex flex-col gap-3 rounded-[20px] border border-[#E7F6FD] p-4">
          <Field
            id="pnr"
            label="PNR"
            value={pnr}
            onChange={(e) => setPnr(e.target.value.toUpperCase())}
            placeholder="MCM999"
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              id="origin"
              label="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              placeholder="ICN"
              maxLength={3}
            />
            <Field
              id="destination"
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              placeholder="BKK"
              maxLength={3}
            />
          </div>
          {scanJourney.isError && (
            <p className="text-xs text-red-600">여정 등록에 실패했습니다.</p>
          )}
          <button
            type="button"
            onClick={handleManualSubmit}
            disabled={!member || !pnr.trim() || scanJourney.isPending}
            className="rounded-[20px] bg-[#0A0A0A] py-3 text-center text-sm font-medium text-white disabled:opacity-40"
          >
            여정 등록하기
          </button>
        </div>
      )}

      <button
        type="button"
        disabled
        title="준비 중입니다"
        className="mx-6 mb-[60px] rounded-[20px] bg-[#0A0A0A] py-3 text-2xl text-[#E6F7FF] opacity-60"
      >
        Apple Wallet 연동
      </button>

      <div className="h-[60px] bg-[#E7F6FC]" aria-hidden />
    </div>
  );
}
