interface PassportStampProps {
  label: string;
  date: string;
}

export function PassportStamp({ label, date }: PassportStampProps) {
  return (
    <div className="flex h-20 w-20 -rotate-6 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-[#8a5a3b] text-[#8a5a3b]">
      <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
      <span className="font-mono text-[9px]">{date}</span>
    </div>
  );
}
