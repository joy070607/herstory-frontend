const STEPS = ["접수", "측정", "피팅", "완료"] as const;

export function FittingSteps({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-center justify-between">
      {STEPS.map((step, index) => {
        const isDone = index <= currentStep;
        return (
          <li key={step} className="flex flex-1 flex-col items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-mono ${
                isDone ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"
              }`}
            >
              {index + 1}
            </span>
            <span className="text-xs text-neutral-500">{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
