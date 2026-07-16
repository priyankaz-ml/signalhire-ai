import { postFormData } from "./apiClient";
import type { CandidateAnalysisResult, EligibilityStatus, SkillTag } from "../types/resume";

interface CandidateAnalysisApiResponse {
  analysis: string;
}

const SECTION_LABELS = [
  "match score",
  "eligibility",
  "matching skills",
  "missing skills",
  "improvements",
  "recommendation",
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sectionPattern(label: string) {
  return new RegExp(`^\\s*${escapeRegExp(label)}\\s*:?\\s*$`, "i");
}

function normalizeLines(analysis: string) {
  return analysis
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSections(analysis: string) {
  const sections: Record<string, string[]> = {};
  let currentSection = "";

  for (const line of normalizeLines(analysis)) {
    const inlineLabel = SECTION_LABELS.find((label) =>
      new RegExp(`^${escapeRegExp(label)}\\s*:`, "i").test(line),
    );

    if (inlineLabel) {
      currentSection = inlineLabel;
      const value = line.replace(new RegExp(`^${escapeRegExp(inlineLabel)}\\s*:\\s*`, "i"), "").trim();
      sections[currentSection] = value ? [value] : [];
      continue;
    }

    const standaloneLabel = SECTION_LABELS.find((label) => sectionPattern(label).test(line));
    if (standaloneLabel) {
      currentSection = standaloneLabel;
      sections[currentSection] = [];
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    }
  }

  return sections;
}

function parseMatchScore(analysis: string, sections: Record<string, string[]>) {
  const source = [sections["match score"]?.join(" "), analysis].filter(Boolean).join(" ");
  const match = source.match(/(\d{1,3})(?:\s*\/\s*100|\s*%)?/);
  if (!match) return 0;
  return Math.min(100, Math.max(0, Number(match[1])));
}

function parseEligibility(value: string): EligibilityStatus {
  const normalized = value.toLowerCase();
  if (/(excellent|strong|eligible|good|high)/.test(normalized)) return "Eligible";
  if (/(borderline|partial|moderate|medium|fair)/.test(normalized)) return "Borderline";
  return "Not Eligible";
}

function cleanListItem(value: string) {
  return value.replace(/^[-*\u2022\d.)\s]+/, "").trim();
}

function parseList(lines: string[] | undefined): SkillTag[] {
  if (!lines?.length) return [];

  return lines
    .flatMap((line) => line.split(/,(?=\s*\S)/))
    .map(cleanListItem)
    .filter(Boolean)
    .map((name) => ({ name }));
}

function parseTextList(lines: string[] | undefined) {
  if (!lines?.length) return [];
  return lines.map(cleanListItem).filter(Boolean);
}

function parseRecommendation(lines: string[] | undefined) {
  return lines?.map(cleanListItem).filter(Boolean).join(" ") || "No recommendation returned.";
}

function parseCandidateAnalysis(analysis: string): CandidateAnalysisResult {
  const sections = parseSections(analysis);

  return {
    matchScore: parseMatchScore(analysis, sections),
    eligibilityStatus: parseEligibility(sections.eligibility?.join(" ") ?? ""),
    matchingSkills: parseList(sections["matching skills"]),
    missingSkills: parseList(sections["missing skills"]),
    resumeImprovements: parseTextList(sections.improvements),
    recommendation: parseRecommendation(sections.recommendation),
  };
}

export async function analyzeCandidateResume(
  file: File,
  jobDescription: string,
): Promise<CandidateAnalysisResult> {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job_description", jobDescription);

  const response = await postFormData<CandidateAnalysisApiResponse>("/analyze-resume", formData);

  if (!response.analysis || typeof response.analysis !== "string") {
    throw new Error("The backend response did not include an analysis string.");
  }

  return parseCandidateAnalysis(response.analysis);
}
