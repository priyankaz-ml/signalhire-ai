import { postFormData } from "./apiClient";
import type { RankedCandidate } from "../types/resume";

type RecruiterApiResponse =
  | unknown[]
  | {
      candidates?: unknown[];
      rankings?: unknown[];
      results?: unknown[];
    };

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function readString(record: Record<string, unknown>, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return fallback;
}

function readNumber(record: Record<string, unknown>, keys: string[], fallback: number) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }
  return fallback;
}

function readSkills(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === "string") return item.trim();
          const skill = asRecord(item);
          return readString(skill, ["name", "skill", "label"]);
        })
        .filter(Boolean)
        .map((name) => ({ name }));
    }
  }

  return [];
}

function responseItems(payload: RecruiterApiResponse) {
  if (Array.isArray(payload)) return payload;
  return payload.candidates ?? payload.rankings ?? payload.results ?? [];
}

function normalizeRankedCandidate(item: unknown, index: number): RankedCandidate {
  const record = asRecord(item);
  const rank = readNumber(record, ["rank", "priority"], index + 1);
  const matchScore = Math.min(
    100,
    Math.max(0, readNumber(record, ["matchScore", "match_score", "score", "fitScore", "fit_score"], 0)),
  );
  const candidateName = readString(record, [
    "candidate",
    "candidateName",
    "candidate_name",
    "name",
    "fileName",
    "filename",
    "resume",
  ]);

  if (!candidateName) {
    throw new Error("Recruiter response is missing a candidate name.");
  }

  return {
    id: readString(record, ["id", "candidateId", "candidate_id"], `candidate-${index + 1}`),
    rank,
    candidateName,
    matchScore,
    matchingSkills: readSkills(record, ["matchingSkills", "matching_skills", "matchedSkills", "matched_skills"]),
    missingSkills: readSkills(record, ["missingSkills", "missing_skills", "skillGaps", "skill_gaps"]),
    recommendation: readString(record, ["recommendation", "summary"], "No recommendation returned."),
    analysisDetail: readString(
      record,
      ["analysisDetail", "analysis_detail", "detail", "analysis", "reasoning"],
      "No detailed analysis returned.",
    ),
  };
}

function parseRecruiterResponse(payload: RecruiterApiResponse): RankedCandidate[] {
  const items = responseItems(payload);
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error(
      "The recruiter endpoint did not return a candidate ranking list. Please share the /rank-resumes response shape so the frontend adapter can map it correctly.",
    );
  }

  return items.map(normalizeRankedCandidate).sort((a, b) => a.rank - b.rank);
}

export async function rankCandidateResumes(
  files: File[],
  jobDescription: string,
  signal?: AbortSignal,
): Promise<RankedCandidate[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("resumes", file));
  formData.append("job_description", jobDescription);

  const response = await postFormData<RecruiterApiResponse>("/rank-resumes", formData, signal);
  return parseRecruiterResponse(response);
}
