interface ClimateGaugeProps {
  temperatureC: number;
  minC: number;
  maxC: number;
}

export function ClimateGauge({ temperatureC, minC, maxC }: ClimateGaugeProps) {
  const percent = Math.min(
    Math.max(((temperatureC - minC) / (maxC - minC)) * 100, 0),
    100
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="h-2 w-full rounded-full bg-neutral-100">
        <div
          className="h-2 rounded-full bg-[#8a5a3b]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-neutral-500">
        <span>{minC}°C</span>
        <span className="font-mono font-medium text-neutral-900">{temperatureC}°C</span>
        <span>{maxC}°C</span>
      </div>
    </div>
  );
}
