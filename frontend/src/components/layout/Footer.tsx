import { Github, Mail, ScanSearch } from "lucide-react";
import footerImage from "../../assets/footer-resume-mark.jpg";

export function Footer() {
  return (
    <footer className="border-t border-coffee-200 bg-[#efe1d2]/55">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <img
            src={footerImage}
            alt="Minimal resume review illustration"
            className="h-20 w-20 rounded-lg border border-coffee-200 object-cover shadow-sm"
          />
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-700 text-white">
                <ScanSearch className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-coffee-900">SignalHire</p>
                <p className="text-sm text-[#6f5847]">Built by Priyanka Sharma.</p>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#6f5847]">
              Feel free to contribute, suggest improvements, or connect for collaboration.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm font-semibold text-coffee-900 sm:flex-row sm:items-center">
          <a
            href="https://github.com/priyankaz-ml/llm-resume-screening-system"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-coffee-200 bg-white/70 px-3 py-2 transition hover:border-accent-200 hover:bg-white hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Contribute on GitHub
          </a>
          <a
            href="mailto:0509priyankasharma@gmail.com"
            className="inline-flex items-center gap-2 rounded-md border border-coffee-200 bg-white/70 px-3 py-2 transition hover:border-accent-200 hover:bg-white hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
