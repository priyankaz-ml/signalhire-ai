import { useEffect, useState } from "react";

const steps = [
  { label: "Preparing candidate profiles", progress: 22 },
  { label: "Reading resume evidence", progress: 48 },
  { label: "Comparing hiring priorities", progress: 73 },
  { label: "Building recruiter shortlist", progress: 92 },
];

export function useBatchProgress(active: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => Math.min(current + 1, steps.length - 1));
    }, 650);

    return () => window.clearInterval(interval);
  }, [active]);

  return steps[index];
}
