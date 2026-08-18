"use client";

import { useEffect, useState } from "react";

const BEACON_TIMEOUT_MS = 3_000;

type DetectMode = "beacon" | "qr-fallback";

export function useBeaconDetect() {
  const [mode, setMode] = useState<DetectMode>("beacon");
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMode("qr-fallback");
      setDetecting(false);
    }, BEACON_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  return { mode, detecting };
}
