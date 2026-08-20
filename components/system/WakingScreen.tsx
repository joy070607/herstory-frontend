export function WakingScreen({
  message = "불러오는 중입니다. 잠시만 기다려 주세요.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      <p className="text-sm text-neutral-500">{message}</p>
    </div>
  );
}
