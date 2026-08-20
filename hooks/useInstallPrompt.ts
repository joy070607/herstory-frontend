import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const SEEN_KEY = "herstory-install-prompt-seen";
const WAIT_MS = 1500;

type InstallPromptStatus = "pending" | "available" | "unavailable";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // 서버 렌더링 시점엔 localStorage/matchMedia를 알 수 없어 항상 "pending"으로
  // 시작합니다(하이드레이션 불일치 방지). 실제 판정은 마운트 후 아래 effect에서 합니다.
  const [status, setStatus] = useState<InstallPromptStatus>("pending");

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(SEEN_KEY)) {
      // 마운트 직후 클라이언트에서만 알 수 있는 값으로 상태를 확정하는 것이라
      // 렌더링 중에는 계산할 수 없습니다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("unavailable");
      return;
    }

    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setStatus("available");
    };
    window.addEventListener("beforeinstallprompt", handlePrompt);

    // 브라우저의 beforeinstallprompt 이벤트는 페이지 로드 직후 곧바로 오거나
    // 아예 오지 않을 수 있어(설치 불가 환경 등), 잠깐만 기다렸다가 안 오면
    // 설치가 불가능한 상황으로 간주합니다.
    const timer = setTimeout(() => setStatus("unavailable"), WAIT_MS);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(SEEN_KEY, "1");
    setStatus("unavailable");
  };

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    localStorage.setItem(SEEN_KEY, "1");
    setStatus("unavailable");
  };

  return { status, install, dismiss };
}
