import { cx } from "../../utils/styles";

interface SkillChipProps {
  label: string;
  variant: "matching" | "missing";
  compact?: boolean;
}

export function SkillChip({ label, variant, compact = false }: SkillChipProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border font-medium",
        compact ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        variant === "matching"
          ? "border-accent-200 bg-accent-50 text-accent-700"
          : "border-zinc-200 bg-zinc-100 text-zinc-700",
      )}
    >
      {label}
    </span>
  );
}
