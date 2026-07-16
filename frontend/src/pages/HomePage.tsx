import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  FileSearch,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hiring-desk-hero.jpg";

const workflows = [
  {
    to: "/candidate-analysis",
    label: "For Candidates",
    title: "Candidate Studio",
    description:
      "Analyze one resume against a target role and receive structured insights into fit, strengths, and gaps.",
    cta: "Analyze a resume",
    icon: FileSearch,
  },
  {
    to: "/recruiter-ranking",
    label: "For Recruiters",
    title: "Recruiter Workspace",
    description:
      "Compare multiple candidates against one role and identify the strongest matches faster.",
    cta: "Rank candidates",
    icon: BriefcaseBusiness,
  },
];

const steps = [
  {
    title: "Add a role brief",
    description: "Paste the job description or hiring criteria.",
    icon: ClipboardList,
  },
  {
    title: "Upload resume files",
    description: "Submit one profile or a full candidate pipeline.",
    icon: UploadCloud,
  },
  {
    title: "Review match insights",
    description: "See scores, strengths, gaps, and recommendations.",
    icon: Sparkles,
  },
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <section className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-white/75 px-3 py-1 text-sm font-semibold text-accent-700 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            LLM-powered resume screening
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-normal text-coffee-900 sm:text-5xl">
            Smarter resume screening. Clearer hiring decisions.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#6f5847] sm:text-lg">
            SignalHire helps candidates understand job fit and helps recruiters identify stronger applicants with structured, intelligent resume analysis.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-coffee-200 bg-white p-2 shadow-lift">
          <img
            src={heroImage}
            alt="Warm recruiter desk with resumes, coffee, and a hiring dashboard"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </div>
      </section>

      <section className="py-8" aria-labelledby="workflow-heading">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-700">
            Product workflows
          </p>
          <h2 id="workflow-heading" className="mt-2 text-2xl font-bold text-coffee-900">
            Choose your workspace
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => {
            const Icon = workflow.icon;
            return (
              <Link
                key={workflow.to}
                to={workflow.to}
                className="group rounded-lg border border-coffee-200 bg-white/82 p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent-200 hover:bg-white hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-50 text-accent-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-coffee-200 bg-cream px-2.5 py-1 text-xs font-semibold text-coffee-800">
                    {workflow.label}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-coffee-900">{workflow.title}</h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-6 text-[#6f5847]">
                  {workflow.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-700">
                  {workflow.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pb-10 pt-4" aria-labelledby="how-heading">
        <div className="rounded-lg border border-coffee-200 bg-white/72 p-5 shadow-soft">
          <h2 id="how-heading" className="text-base font-bold text-coffee-900">
            How SignalHire works
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-50 text-accent-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-coffee-900">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#6f5847]">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
