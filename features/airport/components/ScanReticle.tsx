export function ScanReticle({ detecting }: { detecting: boolean }) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-neutral-900">
      <div
        className={`h-40 w-40 rounded-lg border-2 border-white ${
          detecting ? "animate-pulse" : ""
        }`}
      />
      <p className="absolute bottom-6 text-xs text-white">
        {detecting ? "감지 중..." : "QR 코드를 스캔하세요"}
      </p>
    </div>
  );
}
