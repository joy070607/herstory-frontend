"use client";

import { useEffect, useState } from "react";
import { storeApi } from "@/api/endpoints";
import type { CheckInResponse } from "@/types/api.types";

export function useNotificationStream() {
  const [alerts, setAlerts] = useState<CheckInResponse[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const source = new EventSource(storeApi.notificationStreamUrl());

    source.addEventListener("INIT", () => setIsConnected(true));
    source.addEventListener("VIP_CHECKIN_EVENT", (event) => {
      const checkIn = JSON.parse((event as MessageEvent<string>).data) as CheckInResponse;
      setAlerts((prev) => [checkIn, ...prev]);
    });
    source.onerror = () => setIsConnected(false);

    return () => source.close();
  }, []);

  return { alerts, isConnected };
}
