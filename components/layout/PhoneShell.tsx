"use client";

import { useEffect, useState, type ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white">
      <div className="flex h-11 items-center justify-between px-4 font-mono text-xs text-neutral-900">
        <span suppressHydrationWarning>{time ?? ""}</span>
        <span>HERSTORY</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
