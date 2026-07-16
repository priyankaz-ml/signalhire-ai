import type { RankedCandidate } from "../types/resume";

export const rankedCandidatesMock: RankedCandidate[] = [
  {
    id: "cand-001",
    rank: 1,
    candidateName: "Aarav Mehta",
    matchScore: 94,
    matchingSkills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Design Systems" },
      { name: "Testing Library" },
      { name: "Accessibility" },
    ],
    missingSkills: [{ name: "GraphQL" }],
    recommendation:
      "Highest-confidence match with strong technical breadth and clear senior ownership signals.",
    analysisDetail:
      "Aarav's resume maps closely to the role requirements, especially reusable component architecture, frontend testing, and accessibility. Interview should focus on tradeoff thinking and experience mentoring engineers.",
  },
  {
    id: "cand-002",
    rank: 2,
    candidateName: "Maya Chen",
    matchScore: 88,
    matchingSkills: [
      { name: "React" },
      { name: "Vite" },
      { name: "Performance" },
      { name: "API Integration" },
      { name: "CI" },
    ],
    missingSkills: [{ name: "Tailwind CSS" }, { name: "A11y Audits" }],
    recommendation:
      "Strong match with excellent delivery history. Worth screening for design system depth.",
    analysisDetail:
      "Maya has measurable performance wins and credible frontend infrastructure experience. The resume is lighter on formal accessibility work, but the core implementation skills are strong.",
  },
  {
    id: "cand-003",
    rank: 3,
    candidateName: "Nikhil Rao",
    matchScore: 81,
    matchingSkills: [
      { name: "TypeScript" },
      { name: "React Query" },
      { name: "REST APIs" },
      { name: "Storybook" },
    ],
    missingSkills: [{ name: "Leadership" }, { name: "E2E Testing" }],
    recommendation:
      "Good technical match. Screening should probe scope ownership and stakeholder communication.",
    analysisDetail:
      "Nikhil demonstrates reliable implementation skills and a relevant component workflow. The resume reads more mid-level than senior, so leadership examples need validation.",
  },
  {
    id: "cand-004",
    rank: 4,
    candidateName: "Sofia Alvarez",
    matchScore: 73,
    matchingSkills: [
      { name: "React" },
      { name: "CSS Architecture" },
      { name: "Responsive UI" },
    ],
    missingSkills: [
      { name: "TypeScript" },
      { name: "Testing" },
      { name: "API Contracts" },
    ],
    recommendation:
      "Borderline fit. Strong UI craft, but role-critical TypeScript and testing experience appears limited.",
    analysisDetail:
      "Sofia may be valuable for visual product work, yet the current opening needs heavier typed architecture and integration ownership. Consider only if the team can support ramp-up.",
  },
  {
    id: "cand-005",
    rank: 5,
    candidateName: "Jordan Kim",
    matchScore: 67,
    matchingSkills: [
      { name: "JavaScript" },
      { name: "Component UI" },
      { name: "Agile Delivery" },
    ],
    missingSkills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Design Systems" },
      { name: "Testing" },
    ],
    recommendation:
      "Lower match for this opening. Better suited to a general frontend role with less platform ownership.",
    analysisDetail:
      "Jordan has relevant frontend exposure but lacks several explicit requirements from the job description. Recommend deprioritizing unless the applicant pool is thin.",
  },
  {
    id: "cand-006",
    rank: 6,
    candidateName: "Leah Thompson",
    matchScore: 58,
    matchingSkills: [{ name: "HTML" }, { name: "CSS" }, { name: "UX QA" }],
    missingSkills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "API Integration" },
      { name: "Frontend Testing" },
    ],
    recommendation:
      "Not recommended for this role based on the current requirements alignment.",
    analysisDetail:
      "Leah's profile is stronger in content and UX QA than application frontend engineering. The gap against the senior React requirements is substantial.",
  },
];
