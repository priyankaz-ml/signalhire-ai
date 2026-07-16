import { Skeleton } from "./Skeleton";

interface LoadingStateProps {
  title: string;
  description?: string;
  progress?: number;
}

export function LoadingState({ title, description, progress }: LoadingStateProps) {
  return (
    <div className="rounded-lg border border-coffee-200 bg-white/90 p-6 shadow-soft">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-coffee-900">{title}</p>
          {description ? (
            <p className="mt-1 text-sm text-[#6f5847]">{description}</p>
          ) : null}
        </div>
        {typeof progress === "number" ? (
          <div className="h-2 overflow-hidden rounded-full bg-accent-100">
            <div
              className="h-full rounded-full bg-accent-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
        <div className="grid gap-3 md:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    </div>
  );
}
