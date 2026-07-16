import { ArrowLeft, ListOrdered } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FileDropzone } from "../components/files/FileDropzone";
import { FileListItem } from "../components/files/FileListItem";
import { LeaderboardTable } from "../components/ranking/LeaderboardTable";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { JobDescriptionInput } from "../components/ui/JobDescriptionInput";
import { LoadingState } from "../components/ui/LoadingState";
import { useBatchProgress } from "../hooks/useBatchProgress";
import { rankCandidateResumes } from "../services/recruiterService";
import type { RankedCandidate } from "../types/resume";

type RequestState = "empty" | "loading" | "error" | "success";

export function RecruiterRankingPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [requestState, setRequestState] = useState<RequestState>("empty");
  const [candidates, setCandidates] = useState<RankedCandidate[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const requestVersionRef = useRef(0);
  const activeRequestRef = useRef<AbortController | null>(null);
  const [fileInputResetToken, setFileInputResetToken] = useState(0);
  const progress = useBatchProgress(requestState === "loading");

  const canRank = files.length > 0 && jobDescription.trim().length > 0;
  const hasProfiles = files.length > 0;
  const hasHiringBrief = jobDescription.trim().length > 0;

  function clearRecruiterResults() {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    requestVersionRef.current += 1;
    setCandidates([]);
    setErrorMessage("");
    setRequestState("empty");
  }

  function handleFilesChange(nextFiles: File[]) {
    setFiles(nextFiles);
    clearRecruiterResults();
  }

  function clearPipeline() {
    setFiles([]);
    setFileInputResetToken((token) => token + 1);
    clearRecruiterResults();
  }

  function handleJobDescriptionChange(nextJobDescription: string) {
    setJobDescription(nextJobDescription);
    if (requestState !== "empty" || candidates.length > 0 || errorMessage) {
      clearRecruiterResults();
    }
  }

  async function runRanking() {
    if (!canRank) return;

    // Invalidate and clear the previous response before starting a fresh request.
    activeRequestRef.current?.abort();
    const requestVersion = requestVersionRef.current + 1;
    requestVersionRef.current = requestVersion;
    const controller = new AbortController();
    activeRequestRef.current = controller;
    setCandidates([]);
    setRequestState("loading");
    setErrorMessage("");
    try {
      const ranked = await rankCandidateResumes(files, jobDescription, controller.signal);
      if (controller.signal.aborted || requestVersionRef.current !== requestVersion) return;
      setCandidates(ranked);
      setRequestState("success");
    } catch (error) {
      if (controller.signal.aborted || requestVersionRef.current !== requestVersion) return;
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not complete the shortlist review. Please try again.",
      );
      setRequestState("error");
    } finally {
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
      }
    }
  }

  function removeFile(fileToRemove: File) {
    const nextFiles = files.filter(
      (file) =>
        file.name !== fileToRemove.name ||
        file.size !== fileToRemove.size ||
        file.lastModified !== fileToRemove.lastModified,
    );
    setFiles(nextFiles);
    clearRecruiterResults();
  }

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
      requestVersionRef.current += 1;
    };
  }, []);

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
          Recruiter Workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold text-coffee-900">Shortlist intelligence desk</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6f5847]">
          Compare applicant profiles against one role brief and turn a busy pipeline into a confident interview shortlist.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
        <section className="space-y-5 rounded-lg border border-coffee-200 bg-white/85 p-5 shadow-soft backdrop-blur">
          <FileDropzone
            files={files}
            onFilesChange={handleFilesChange}
            multiple
            maxFiles={200}
            title="Build candidate pipeline"
            description="Add applicant resumes in PDF or DOCX format for a structured shortlist review."
            actionLabel="Select candidate profiles"
            resetToken={fileInputResetToken}
          />
          {files.length > 0 ? (
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-coffee-900">{files.length} candidate profiles selected</p>
                <Button variant="ghost" onClick={clearPipeline}>
                  Clear pipeline
                </Button>
              </div>
              <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {files.map((file) => (
                  <FileListItem
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    file={file}
                    onRemove={() => removeFile(file)}
                  />
                ))}
              </div>
            </div>
          ) : null}
          <JobDescriptionInput
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            label="Hiring brief"
            placeholder="Paste the job description, must-have capabilities, preferred background, and screening priorities."
          />
          {canRank ? (
            <Button className="w-full" disabled={requestState === "loading"} onClick={runRanking}>
              Analyze Candidate Pipeline
            </Button>
          ) : (
            <div className="rounded-md border border-coffee-200 bg-cream/70 px-4 py-3 text-sm font-medium text-[#6f5847]">
              {hasProfiles && !hasHiringBrief
                ? "Paste the hiring brief to unlock pipeline analysis."
                : hasHiringBrief && !hasProfiles
                  ? "Add candidate profiles to unlock pipeline analysis."
                  : "Add candidate profiles and a hiring brief to begin."}
            </div>
          )}
        </section>

        <section>
          {requestState === "empty" ? (
            <EmptyState
              icon={<ListOrdered className="h-8 w-8" />}
              title="Shape a stronger shortlist"
              description="Add candidate profiles and a hiring brief to compare fit, strengths, gaps, and interview priority."
            />
          ) : null}
          {requestState === "loading" ? (
            <LoadingState
              title={progress.label}
              description="Reviewing the candidate set against your hiring priorities."
              progress={progress.progress}
            />
          ) : null}
          {requestState === "error" ? (
            <ErrorState
              description={
                errorMessage ||
                "We could not complete the shortlist review. Please check the selected profiles and hiring brief, then try again."
              }
              onRetry={runRanking}
            />
          ) : null}
          {requestState === "success" ? <LeaderboardTable candidates={candidates} /> : null}
        </section>
      </div>
    </div>
  );
}
