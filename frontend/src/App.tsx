import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { NavBar } from "./components/layout/NavBar";
import { CandidateAnalysisPage } from "./pages/CandidateAnalysisPage";
import { HomePage } from "./pages/HomePage";
import { RecruiterRankingPage } from "./pages/RecruiterRankingPage";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-ink">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/candidate-analysis" element={<CandidateAnalysisPage />} />
          <Route path="/recruiter-ranking" element={<RecruiterRankingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
