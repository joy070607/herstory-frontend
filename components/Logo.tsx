import Image from "next/image";

type LogoVariant = "wordmark" | "full";

const LOGO_SOURCES: Record<
  LogoVariant,
  { src: string; width: number; height: number }
> = {
  wordmark: { src: "/logo/logo-wordmark.png", width: 167, height: 42 },
  full: { src: "/logo/logo-full.png", width: 235, height: 210 },
};

interface LogoProps {
  variant?: LogoVariant;
  priority?: boolean;
  className?: string;
}

export function Logo({ variant = "wordmark", priority, className = "" }: LogoProps) {
  const { src, width, height } = LOGO_SOURCES[variant];

  return (
    <Image
      src={src}
      alt="HER-STORY"
      width={width}
      height={height}
      priority={priority ?? variant === "full"}
      className={`h-auto w-auto ${className}`}
    />
  );
}
