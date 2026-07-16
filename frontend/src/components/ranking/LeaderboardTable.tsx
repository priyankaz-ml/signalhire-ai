import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { RankedCandidate } from "../../types/resume";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { SkillChip } from "../ui/SkillChip";

interface LeaderboardTableProps {
  candidates: RankedCandidate[];
}

type SortKey = "rank" | "score";

function compactSkills(skills: RankedCandidate["matchingSkills"], variant: "matching" | "missing") {
  const visible = skills.slice(0, 3);
  const overflow = skills.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((skill) => (
        <SkillChip key={skill.name} label={skill.name} variant={variant} compact />
      ))}
      {overflow > 0 ? (
        <span className="inline-flex items-center rounded-full border border-coffee-200 bg-white px-2 py-0.5 text-[11px] font-medium text-coffee-800">
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

export function LeaderboardTable({ candidates }: LeaderboardTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const pageSize = 5;

  useEffect(() => {
    setPage(1);
    setExpandedId(null);
  }, [candidates]);

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) =>
      sortKey === "rank" ? a.rank - b.rank : b.matchScore - a.matchScore,
    );
  }, [candidates, sortKey]);

  const pageCount = Math.max(1, Math.ceil(sortedCandidates.length / pageSize));
  const visibleCandidates = sortedCandidates.slice((page - 1) * pageSize, page * pageSize);

  function updateSort(nextSort: SortKey) {
    setSortKey(nextSort);
    setPage(1);
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-coffee-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-coffee-900">Recruiter shortlist</h2>
          <p className="mt-1 text-sm text-[#6f5847]">{candidates.length} profiles reviewed</p>
        </div>
        <div className="flex gap-2">
          <Button variant={sortKey === "rank" ? "secondary" : "ghost"} onClick={() => updateSort("rank")}>
            Rank
          </Button>
          <Button
            variant={sortKey === "score" ? "secondary" : "ghost"}
            onClick={() => updateSort("score")}
            icon={<ChevronsUpDown className="h-4 w-4" />}
          >
            Score
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-left">
          <thead className="bg-cream/70 text-xs uppercase tracking-wide text-accent-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Candidate</th>
              <th className="px-4 py-3 font-semibold">Fit score</th>
              <th className="px-4 py-3 font-semibold">Strengths</th>
              <th className="px-4 py-3 font-semibold">Gaps</th>
              <th className="px-4 py-3 font-semibold">Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-coffee-200">
            {visibleCandidates.map((candidate) => {
              const expanded = expandedId === candidate.id;
              return (
                <tr key={candidate.id} className="align-top">
                  <td className="px-4 py-4 text-sm font-bold text-coffee-900">#{candidate.rank}</td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-coffee-900">{candidate.candidateName}</p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-[#6f5847]">
                      {candidate.recommendation}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-accent-100">
                        <div
                          className="h-full rounded-full bg-accent-600"
                          style={{ width: `${candidate.matchScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-coffee-900">
                        {candidate.matchScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{compactSkills(candidate.matchingSkills, "matching")}</td>
                  <td className="px-4 py-4">{compactSkills(candidate.missingSkills, "missing")}</td>
                  <td className="px-4 py-4">
                    <Button
                      variant="ghost"
                      className="h-9 px-3"
                      onClick={() => setExpandedId(expanded ? null : candidate.id)}
                      icon={expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    >
                      {expanded ? "Close" : "Inspect"}
                    </Button>
                    {expanded ? (
                      <div className="mt-3 w-72 rounded-md border border-coffee-200 bg-cream/70 p-3 text-sm leading-6 text-[#6f5847]">
                        {candidate.analysisDetail}
                      </div>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-coffee-200 px-4 py-3">
        <p className="text-sm text-[#6f5847]">
          Page {page} of {pageCount}
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            disabled={page === pageCount}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
