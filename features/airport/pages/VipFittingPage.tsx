"use client";

import { useState } from "react";
import { FittingSteps } from "@/features/airport/components/FittingSteps";
import { Button } from "@/components/ui/Button";
import { AiHotBar } from "@/components/layout/AiHotBar";

export function VipFittingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-8 px-6 py-8">
        <h1 className="text-lg font-semibold">VIP Fitting</h1>
        <FittingSteps currentStep={currentStep} />
        <Button
          variant="cognac"
          disabled={currentStep >= 3}
          onClick={() => setCurrentStep((step) => Math.min(step + 1, 3))}
        >
          다음 단계
        </Button>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
