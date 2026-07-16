import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { FileUp, UploadCloud } from "lucide-react";
import { cx } from "../../utils/styles";
import { isAllowedResumeFile } from "../../utils/files";
import { Button } from "../ui/Button";

interface FileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  title?: string;
  description?: string;
  actionLabel?: string;
  resetToken?: number;
}

export function FileDropzone({
  files,
  onFilesChange,
  multiple = false,
  maxFiles = multiple ? 200 : 1,
  title,
  description,
  actionLabel,
  resetToken,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = "";
    setError("");
  }, [resetToken]);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function acceptFiles(nextFiles: File[]) {
    const invalid = nextFiles.filter((file) => !isAllowedResumeFile(file));
    if (invalid.length > 0) {
      setError("Only PDF and DOCX files are supported.");
      return;
    }

    const merged = multiple ? [...files, ...nextFiles] : nextFiles.slice(0, 1);
    const deduped = merged.filter(
      (file, index, list) =>
        list.findIndex(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified,
        ) === index,
    );

    if (deduped.length > maxFiles) {
      setError(`Select no more than ${maxFiles} files for one batch.`);
      onFilesChange(deduped.slice(0, maxFiles));
      return;
    }

    setError("");
    onFilesChange(deduped);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    acceptFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    acceptFiles(Array.from(event.dataTransfer.files));
  }

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={openFilePicker}
        className={cx(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition",
          isDragging
            ? "border-accent-600 bg-accent-50"
            : "border-coffee-300 bg-cream/70 hover:border-accent-500 hover:bg-white",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple={multiple}
          className="sr-only"
          onChange={handleInputChange}
        />
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-accent-700 shadow-sm">
          <UploadCloud className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm font-semibold text-coffee-900">
          {title ?? (multiple ? "Add candidate profiles" : "Add your resume")}
        </p>
        <p className="mt-1 max-w-md text-sm text-[#6f5847]">
          {description ?? "PDF or DOCX format is supported."}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          icon={<FileUp className="h-4 w-4" />}
          onClick={(event) => {
            event.stopPropagation();
            openFilePicker();
          }}
        >
          {actionLabel ?? (multiple ? "Select profiles" : "Select resume")}
        </Button>
      </div>
      {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
    </div>
  );
}
