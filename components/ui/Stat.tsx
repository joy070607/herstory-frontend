interface StatProps {
  value: string | number;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-2xl tabular-nums">{value}</span>
      <span className="text-xs uppercase tracking-wide text-neutral-500">{label}</span>
    </div>
  );
}
