import type { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
