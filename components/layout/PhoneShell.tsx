import type { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white">
      <div className="flex h-11 items-center justify-between px-4 font-mono text-xs text-neutral-900">
        <span>{new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</span>
        <span>HERSTORY</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
