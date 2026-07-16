import { cx } from "../../utils/styles";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded-md bg-zinc-200", className)} />;
}
