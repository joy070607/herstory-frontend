export function Perforation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-[repeating-linear-gradient(90deg,#d4d4d4_0_6px,transparent_6px_12px)] ${className}`}
      aria-hidden
    />
  );
}
