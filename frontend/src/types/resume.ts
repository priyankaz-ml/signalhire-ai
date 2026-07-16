export type FileKind = "pdf" | "docx";

export type EligibilityStatus = "Eligible" | "Borderline" | "Not Eligible";

export interface SkillTag {
  name: string;
}

export interface CandidateAnalysisResult {
  matchScore: number;
  eligibilityStatus: EligibilityStatus;
  matchingSkills: SkillTag[];
  missingSkills: SkillTag[];
  resumeImprovements: string[];
  recommendation: string;
}

export interface RankedCandidate {
  id: string;
  rank: number;
  candidateName: string;
  matchScore: number;
  matchingSkills: SkillTag[];
  missingSkills: SkillTag[];
  recommendation: string;
  analysisDetail: string;
}

export interface UploadedResumeFile {
  id: string;
  name: string;
  size: number;
  type: string;
  kind: FileKind;
}
