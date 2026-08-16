import { useSyncExternalStore, type ReactNode } from "react";

function formatClock(date: Date) {
  return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

function subscribeToClock(callback: () => void) {
  const id = setInterval(callback, 30_000);
  return () => clearInterval(id);
}

// 서버(Node ICU)와 브라우저의 ko-KR 오전/오후 표기가 달라 하이드레이션이 어긋나므로,
// getServerSnapshot은 고정값을 반환해 서버 출력과 첫 클라이언트 렌더를 일치시키고
// 이후 클라이언트에서만 실제 시각으로 동기화한다.
function StatusClock() {
  const label = useSyncExternalStore(
    subscribeToClock,
    () => formatClock(new Date()),
    () => "--:--"
  );

  return <span>{label}</span>;
}

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white">
      <div className="flex h-11 items-center justify-between px-4 font-mono text-xs text-neutral-900">
        <StatusClock />
        <span>HERSTORY</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
