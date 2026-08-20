import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "ink" | "ghost" | "cognac";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  ink: "bg-neutral-900 text-white hover:bg-neutral-800",
  ghost: "bg-transparent text-neutral-900 border border-neutral-300 hover:bg-neutral-100",
  cognac: "bg-[#8a5a3b] text-white hover:bg-[#7a4d31]",
};

export function Button({
  variant = "ink",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`h-12 rounded-full px-6 text-sm font-medium transition-all active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
