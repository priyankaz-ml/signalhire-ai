import type { FileKind, UploadedResumeFile } from "../types/resume";

export function getFileKind(file: File): FileKind | null {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "pdf";
  if (extension === "docx") return "docx";
  return null;
}

export function isAllowedResumeFile(file: File): boolean {
  return getFileKind(file) !== null;
}

export function formatFileSize(size: number): string {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function toUploadedResumeFile(file: File): UploadedResumeFile {
  const kind = getFileKind(file);
  if (!kind) {
    throw new Error("Unsupported file type");
  }

  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    size: file.size,
    type: file.type,
    kind,
  };
}
