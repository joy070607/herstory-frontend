interface SpotMapProps {
  spots: { id: string; label: string; x: number; y: number }[];
}

export function SpotMap({ spots }: SpotMapProps) {
  return (
    <div className="relative aspect-[4/3] w-full rounded-lg bg-neutral-100">
      {spots.map((spot) => (
        <div
          key={spot.id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        >
          <span className="h-2 w-2 rounded-full bg-neutral-900" />
          <span className="whitespace-nowrap text-[10px] text-neutral-600">{spot.label}</span>
        </div>
      ))}
    </div>
  );
}
