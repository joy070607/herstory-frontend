import { PassportStamp } from "@/components/signature/PassportStamp";

interface StampGridProps {
  earned: { id: string; label: string; date: string }[];
  totalSlots: number;
}

export function StampGrid({ earned, totalSlots }: StampGridProps) {
  const emptySlots = Math.max(totalSlots - earned.length, 0);

  return (
    <div className="grid grid-cols-3 gap-4">
      {earned.map((stamp) => (
        <PassportStamp key={stamp.id} label={stamp.label} date={stamp.date} />
      ))}
      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-neutral-200"
        />
      ))}
    </div>
  );
}
