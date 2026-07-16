import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  description: string;
  onRetry: () => void;
}

export function ErrorState({
  title = "Review could not be completed",
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-red-700" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-semibold text-red-900">{title}</h2>
            <p className="mt-1 text-sm text-red-700">{description}</p>
          </div>
        </div>
        <Button variant="destructive" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </div>
  );
}
