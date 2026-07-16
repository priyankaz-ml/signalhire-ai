import { FileText, Trash2 } from "lucide-react";
import { formatFileSize } from "../../utils/files";
import { Button } from "../ui/Button";

interface FileListItemProps {
  file: File;
  onRemove: () => void;
}

export function FileListItem({ file, onRemove }: FileListItemProps) {
  const extension = file.name.split(".").pop()?.toUpperCase() ?? "FILE";

  return (
    <div className="flex min-h-14 items-center justify-between gap-3 rounded-md border border-coffee-200 bg-white/90 px-3 py-2">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-50 text-accent-700">
          <FileText className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-coffee-900">{file.name}</p>
          <p className="text-xs text-[#6f5847]">
            {extension} - {formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="h-9 w-9 px-0"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${file.name}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
