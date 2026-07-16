interface ScoreRingProps {
  score: number;
  size?: "sm" | "lg";
}

export function ScoreRing({ score, size = "lg" }: ScoreRingProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const dimensions = size === "lg" ? "h-32 w-32" : "h-16 w-16";
  const textSize = size === "lg" ? "text-3xl" : "text-sm";

  return (
    <div className={`relative ${dimensions}`}>
      <svg className="-rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#efe1d2"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#704522"
          strokeLinecap="round"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${textSize} font-bold text-coffee-900`}>{score}</span>
        {size === "lg" ? <span className="text-xs font-medium text-accent-700">fit score</span> : null}
      </div>
    </div>
  );
}
