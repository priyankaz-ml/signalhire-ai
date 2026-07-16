import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-coffee-300 bg-white/65 p-8 text-center shadow-sm">
      {icon ? <div className="mx-auto mb-3 flex justify-center text-accent-700">{icon}</div> : null}
      <h2 className="text-base font-semibold text-coffee-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#6f5847]">{description}</p>
    </div>
  );
}
