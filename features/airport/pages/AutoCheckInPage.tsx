"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCheckIn } from "@/hooks/queries";
import { useBeaconDetect } from "@/features/airport/hooks/useBeaconDetect";
import { ScanReticle } from "@/features/airport/components/ScanReticle";
import { ROUTES } from "@/constants/routes";

export function AutoCheckInPage() {
  const router = useRouter();
  const member = useAuthStore((state) => state.member);
  const { detecting, mode } = useBeaconDetect();
  const checkIn = useCheckIn();

  const handleCheckIn = () => {
    if (!member) return;
    checkIn.mutate(
      { memberId: Number(member.id), checkInType: "QR", qrCode: `MEMBER-${member.id}` },
      {
        onSuccess: (res) =>
          router.push(res.choiceFitRequested ? ROUTES.vipFitting : ROUTES.home),
      }
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8">
      <h1 className="text-lg font-semibold">Auto Check-In</h1>
      <ScanReticle detecting={detecting} />
      {mode === "qr-fallback" && (
        <button
          className="text-sm text-neutral-500 underline disabled:opacity-40"
          disabled={checkIn.isPending || !member}
          onClick={handleCheckIn}
        >
          QR로 체크인하기
        </button>
      )}
      {checkIn.isError && (
        <p className="text-xs text-red-600">체크인에 실패했습니다.</p>
      )}
    </div>
  );
}
