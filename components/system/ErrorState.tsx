import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "문제가 발생했습니다.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm text-neutral-500">{message}</p>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}
