import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">{title}</h1>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 text-center">
          <p className="text-sm font-medium text-neutral-500">준비 중인 화면이에요</p>
          <p className="text-xs text-neutral-400">곧 만나보실 수 있어요.</p>
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
