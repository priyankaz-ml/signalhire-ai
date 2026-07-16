import type { CandidateAnalysisResult } from "../types/resume";

export const candidateAnalysisMock: CandidateAnalysisResult = {
  matchScore: 82,
  eligibilityStatus: "Eligible",
  matchingSkills: [
    { name: "React" },
    { name: "TypeScript" },
    { name: "Tailwind CSS" },
    { name: "REST Integration" },
    { name: "Accessibility" },
  ],
  missingSkills: [{ name: "GraphQL" }, { name: "Design Systems Leadership" }],
  resumeImprovements: [
    "Quantify frontend performance improvements with concrete before-and-after metrics.",
    "Move recent React architecture work higher in the experience section.",
    "Add a short project summary that maps UI delivery to measurable business outcomes.",
    "Clarify ownership of API integration and cross-functional collaboration.",
  ],
  recommendation:
    "Strong fit for a senior frontend role. The candidate demonstrates solid modern React experience and enough product judgment to progress to a technical interview.",
};
