import type { HTMLAttributes } from "react";
import { cx } from "../../utils/styles";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "rounded-lg border border-coffee-200 bg-white/90 shadow-soft backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
