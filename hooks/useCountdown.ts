"use client";

import { useEffect, useState } from "react";

export function useCountdown(targetIso: string | null) {
  const [remainingMs, setRemainingMs] = useState(() =>
    targetIso ? new Date(targetIso).getTime() - Date.now() : 0
  );

  useEffect(() => {
    if (!targetIso) return;

    const target = new Date(targetIso).getTime();
    const tick = () => setRemainingMs(Math.max(target - Date.now(), 0));

    tick();
    const intervalId = setInterval(tick, 1_000);
    return () => clearInterval(intervalId);
  }, [targetIso]);

  const totalSeconds = Math.max(Math.floor(remainingMs / 1_000), 0);

  return {
    remainingMs,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
