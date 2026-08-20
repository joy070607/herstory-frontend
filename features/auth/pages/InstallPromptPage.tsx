"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Logo } from "@/components/Logo";
import { InstallPromptBanner } from "@/components/system/InstallPromptBanner";

// useInstallPrompt 훅과 동일한 키를 사용해, 여기서 설치/닫기를 선택하면
// /login에서 다시 배너가 뜨지 않도록 합니다.
const SEEN_KEY = "herstory-install-prompt-seen";
const APK_DOWNLOAD_URL = "/downloads/HER-STORY.apk";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

export function InstallPromptPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(SEEN_KEY)) {
      router.replace(ROUTES.login);
      return;
    }
    // 마운트 직후 클라이언트에서만 알 수 있는 값(localStorage/matchMedia)으로
    // 상태를 확정하는 것이라 렌더링 중에는 계산할 수 없습니다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router]);

  const handleInstall = () => {
    const link = document.createElement("a");
    link.href = APK_DOWNLOAD_URL;
    link.download = "HER-STORY.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    localStorage.setItem(SEEN_KEY, "1");
    router.push(ROUTES.login);
  };

  const handleDismiss = () => {
    localStorage.setItem(SEEN_KEY, "1");
    router.push(ROUTES.login);
  };

  if (!ready) {
    return <div className="flex flex-1 flex-col bg-[#EFFAFC]" />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#EFFAFC]">
      <Logo variant="full" className="w-56" />
      <InstallPromptBanner onInstall={handleInstall} onDismiss={handleDismiss} />
    </div>
  );
}
