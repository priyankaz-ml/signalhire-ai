import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/styles";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-700 text-white shadow-soft hover:bg-accent-900 focus-visible:ring-accent-600",
  secondary:
    "border border-coffee-300 bg-white/85 text-coffee-900 hover:border-accent-200 hover:bg-accent-50 focus-visible:ring-accent-500",
  ghost: "text-coffee-900 hover:bg-accent-50 focus-visible:ring-accent-500",
  destructive:
    "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 focus-visible:ring-red-600",
};

export function Button({
  className,
  variant = "primary",
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
