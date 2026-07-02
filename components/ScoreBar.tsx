"use client";

interface Props {
  label: string;
  score: number;
  delay?: number;
}

const getColor = (score: number) => {
  if (score <= 3) return "bg-red-500";
  if (score <= 5) return "bg-orange-500";
  if (score <= 7) return "bg-yellow-500";
  return "bg-green-500";
};

export default function ScoreBar({ label, score, delay = 0 }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-zinc-400 text-xs sm:text-sm capitalize w-20 sm:w-24 shrink-0">{label}</span>
      <div className="flex-1 bg-zinc-800 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${getColor(score)}`}
          style={{
            width: `${score * 10}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span className="text-white font-bold text-sm w-10 text-right">{score}/10</span>
    </div>
  );
}
