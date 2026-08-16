"use client";

import { useEffect, useState, type ReactNode } from "react";

function formatClock(date: Date) {
  return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

export function PhoneShell({ children }: { children: ReactNode }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatClock(new Date()));
    Promise.resolve().then(tick);
    const intervalId = setInterval(tick, 30_000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white">
      <div className="flex h-11 items-center justify-between px-4 font-mono text-xs text-neutral-900">
        <span suppressHydrationWarning>{time}</span>
        <span>HERSTORY</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
