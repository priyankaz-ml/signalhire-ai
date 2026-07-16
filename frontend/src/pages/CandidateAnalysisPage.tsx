import { ArrowLeft, FileSearch } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileDropzone } from "../components/files/FileDropzone";
import { FileListItem } from "../components/files/FileListItem";
import { CandidateResultCard } from "../components/results/CandidateResultCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { JobDescriptionInput } from "../components/ui/JobDescriptionInput";
import { LoadingState } from "../components/ui/LoadingState";
import { analyzeCandidateResume } from "../services/candidateService";
import type { CandidateAnalysisResult } from "../types/resume";

type RequestState = "empty" | "loading" | "error" | "success";

export function CandidateAnalysisPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [requestState, setRequestState] = useState<RequestState>("empty");
  const [result, setResult] = useState<CandidateAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const canAnalyze = files.length === 1 && jobDescription.trim().length > 0;
  const hasResume = files.length === 1;
  const hasRoleBrief = jobDescription.trim().length > 0;

  async function runAnalysis() {
    if (!canAnalyze) return;
    setRequestState("loading");
    setErrorMessage("");
    try {
      const analysis = await analyzeCandidateResume(files[0], jobDescription);
      setResult(analysis);
      setRequestState("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not complete the candidate review. Please try again.",
      );
      setRequestState("error");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-7">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-700 transition hover:text-accent-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-700">
          Candidate Studio
        </p>
        <h1 className="mt-2 text-3xl font-bold text-coffee-900">Personal role-fit review</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6f5847]">
          Understand how a resume reads against a target role, then leave with sharper positioning and clearer next steps.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <section className="space-y-5 rounded-lg border border-coffee-200 bg-white/85 p-5 shadow-soft backdrop-blur">
          <FileDropzone
            files={files}
            onFilesChange={setFiles}
            title="Submit candidate profile"
            description="Use a polished PDF or DOCX resume for an executive-style readiness review."
            actionLabel="Select candidate resume"
          />
          {files.map((file) => (
            <FileListItem key={`${file.name}-${file.lastModified}`} file={file} onRemove={() => setFiles([])} />
          ))}
          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
            label="Target role brief"
            placeholder="Paste the role description, required experience, preferred skills, and hiring priorities."
          />
          {canAnalyze ? (
            <Button className="w-full" disabled={requestState === "loading"} onClick={runAnalysis}>
              Analyze Candidate Fit
            </Button>
          ) : (
            <div className="rounded-md border border-coffee-200 bg-cream/70 px-4 py-3 text-sm font-medium text-[#6f5847]">
              {hasResume && !hasRoleBrief
                ? "Paste the target role brief to unlock the review."
                : hasRoleBrief && !hasResume
                  ? "Add a candidate resume to unlock the review."
                  : "Add a candidate resume and target role brief to begin."}
            </div>
          )}
        </section>

        <section>
          {requestState === "empty" ? (
            <EmptyState
              icon={<FileSearch className="h-8 w-8" />}
              title="Prepare a focused candidate review"
              description="Add the candidate profile and target role brief to see fit score, aligned strengths, missing signals, and practical resume guidance."
            />
          ) : null}
          {requestState === "loading" ? (
            <LoadingState
              title="Reviewing candidate alignment"
              description="Assessing fit score, skill evidence, gaps, and recommendation quality."
              progress={68}
            />
          ) : null}
          {requestState === "error" ? (
            <ErrorState
              description={
                errorMessage ||
                "We could not complete the candidate review. Please confirm the file and role brief, then try again."
              }
              onRetry={runAnalysis}
            />
          ) : null}
          {requestState === "success" && result ? <CandidateResultCard result={result} /> : null}
        </section>
      </div>
    </div>
  );
}
