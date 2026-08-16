"use client";

import { useCallback, useEffect, useState } from "react";
import { storeApi } from "@/api/endpoints";
import type { CheckInResponse } from "@/types/api.types";
import { playDingDong } from "@/features/staff/utils/chime";

export function useNotificationStream() {
  const [alerts, setAlerts] = useState<CheckInResponse[]>([]);
  const [popupAlert, setPopupAlert] = useState<CheckInResponse | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const source = new EventSource(storeApi.notificationStreamUrl());

    source.addEventListener("INIT", () => setIsConnected(true));
    source.addEventListener("VIP_CHECKIN_EVENT", (event) => {
      const checkIn = JSON.parse((event as MessageEvent<string>).data) as CheckInResponse;
      setAlerts((prev) => [checkIn, ...prev]);
      setPopupAlert(checkIn);
      playDingDong();
    });
    source.onerror = () => setIsConnected(false);

    return () => source.close();
  }, []);

  const dismissPopup = useCallback(() => setPopupAlert(null), []);

  return { alerts, isConnected, popupAlert, dismissPopup };
}
