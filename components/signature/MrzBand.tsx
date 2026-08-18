interface MrzBandProps {
  lines: [string, string];
}

export function MrzBand({ lines }: MrzBandProps) {
  return (
    <div className="bg-neutral-900 px-4 py-3 font-mono text-[11px] leading-relaxed tracking-[0.15em] text-white">
      {lines.map((line, i) => (
        <p key={i} className="whitespace-nowrap overflow-hidden text-ellipsis">
          {line}
        </p>
      ))}
    </div>
  );
}
