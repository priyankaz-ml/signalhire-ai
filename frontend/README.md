# SignalHire AI Resume Screener

A standalone, frontend-only React application for an AI Resume Screener SaaS workflow. It includes a single-resume candidate analysis flow and a bulk recruiter ranking dashboard, both powered by isolated mock services.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- lucide-react icons

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/    Reusable UI, upload, result, ranking, and layout components
  hooks/         Small reusable React hooks
  mocks/         Fixture data used by the mock services
  pages/         Route-level screens
  services/      Thin mock service layer for later API replacement
  types/         Shared TypeScript data contracts
  utils/         Formatting and styling helpers
```

## Mock Data Layer and Flask Integration

The app intentionally contains no backend, API routes, database code, resume parsing, embeddings, or AI/NLP logic. All analysis and ranking behavior is simulated on the client with `Promise` + `setTimeout`.

To integrate a Flask backend later, keep the components unchanged and replace only these service functions:

- `src/services/candidateService.ts`
  - Replace `analyzeCandidateResume(file, jobDescription)` with a `fetch` or `axios` call to your Flask endpoint.
  - Return the same `CandidateAnalysisResult` shape from `src/types/resume.ts`.

- `src/services/recruiterService.ts`
  - Replace `rankCandidateResumes(files, jobDescription)` with a batch upload call to your Flask endpoint.
  - Return the same `RankedCandidate[]` shape from `src/types/resume.ts`.

Fixture data lives in:

- `src/mocks/candidateMock.ts`
- `src/mocks/recruiterMock.ts`

Those files can be removed once the Flask API returns the same response contracts.
