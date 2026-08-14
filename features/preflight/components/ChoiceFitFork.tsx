"use client";

import { Button } from "@/components/ui/Button";
import { useSubmitChoiceFit } from "@/hooks/queries";

interface ChoiceFitForkProps {
  journeyId: string;
  onDecided?: (choiceFit: boolean) => void;
}

export function ChoiceFitFork({ journeyId, onDecided }: ChoiceFitForkProps) {
  const submitChoiceFit = useSubmitChoiceFit(journeyId);

  const decide = (choiceFit: boolean) => {
    submitChoiceFit.mutate(choiceFit, {
      onSuccess: () => onDecided?.(choiceFit),
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-neutral-600">피팅 서비스를 신청하시겠어요?</p>
      <div className="flex gap-3">
        <Button
          variant="cognac"
          className="flex-1"
          disabled={submitChoiceFit.isPending}
          onClick={() => decide(true)}
        >
          신청할게요
        </Button>
        <Button
          variant="ghost"
          className="flex-1"
          disabled={submitChoiceFit.isPending}
          onClick={() => decide(false)}
        >
          괜찮아요
        </Button>
      </div>
    </div>
  );
}
