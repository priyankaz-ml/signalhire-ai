import { NavLink } from "react-router-dom";
import { BriefcaseBusiness, FileSearch, ScanSearch } from "lucide-react";
import { cx } from "../../utils/styles";

const navItems = [
  { to: "/candidate-analysis", label: "Candidate Studio", icon: FileSearch },
  { to: "/recruiter-ranking", label: "Recruiter Workspace", icon: BriefcaseBusiness },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-coffee-200/80 bg-[#fff9f1]/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <NavLink to="/" className="flex w-fit items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-700 text-white shadow-soft">
            <ScanSearch className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-bold text-coffee-900">SignalHire</span>
            <span className="block text-xs font-medium text-accent-700">Intelligent hiring review</span>
          </span>
        </NavLink>
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    "inline-flex items-center rounded-md border px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2",
                    isActive
                      ? "border-accent-200 bg-accent-50 text-accent-900 shadow-sm"
                      : "border-transparent text-coffee-800 hover:border-coffee-200 hover:bg-white/70 hover:text-accent-700",
                  )
                }
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
