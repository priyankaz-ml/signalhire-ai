import type { CandidateAnalysisResult, EligibilityStatus } from "../../types/resume";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { SkillChip } from "../ui/SkillChip";
import { ScoreRing } from "./ScoreRing";

function statusTone(status: EligibilityStatus) {
  if (status === "Eligible") return "success";
  if (status === "Borderline") return "warning";
  return "danger";
}

interface CandidateResultCardProps {
  result: CandidateAnalysisResult;
}

export function CandidateResultCard({ result }: CandidateResultCardProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-700">
              Candidate verdict
            </p>
            <h2 className="mt-2 text-xl font-bold text-coffee-900">Role alignment</h2>
          </div>
          <Badge tone={statusTone(result.eligibilityStatus)}>
            {result.eligibilityStatus}
          </Badge>
        </div>
        <div className="mt-7 flex justify-center">
          <ScoreRing score={result.matchScore} />
        </div>
        <div className="mt-7 rounded-md border border-coffee-200 bg-cream/70 p-4">
          <p className="text-sm font-semibold text-coffee-900">Hiring signal</p>
          <p className="mt-2 text-sm leading-6 text-[#6f5847]">{result.recommendation}</p>
        </div>
      </Card>

      <div className="grid gap-5">
        <Card className="p-6">
          <h3 className="text-base font-semibold text-coffee-900">Capability alignment</h3>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-coffee-800">Confirmed strengths</p>
              <div className="flex flex-wrap gap-2">
                {result.matchingSkills.map((skill) => (
                  <SkillChip key={skill.name} label={skill.name} variant="matching" />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-coffee-800">Signals to strengthen</p>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill) => (
                  <SkillChip key={skill.name} label={skill.name} variant="missing" />
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-semibold text-coffee-900">Resume refinement plan</h3>
          <ul className="mt-4 space-y-3">
            {result.resumeImprovements.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-[#6f5847]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
