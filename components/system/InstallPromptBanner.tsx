interface InstallPromptBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export function InstallPromptBanner({ onInstall, onDismiss }: InstallPromptBannerProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-neutral-100 bg-white px-5 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <p className="text-sm font-medium text-neutral-900">홈 화면에 HER-STORY를 추가해보세요!</p>
      <div className="flex shrink-0 items-center gap-3">
        <button type="button" onClick={onDismiss} className="text-sm text-neutral-400">
          닫기
        </button>
        <button
          type="button"
          onClick={onInstall}
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-sky-50"
        >
          설치
        </button>
      </div>
    </div>
  );
}
