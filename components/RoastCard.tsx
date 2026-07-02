"use client";
import { forwardRef } from "react";
import ScoreBar from "./ScoreBar";

interface RoastResult {
  roast: string;
  scores: {
    typography: number;
    color: number;
    layout: number;
    creativity: number;
  };
  overall: number;
  one_liner: string;
  fix: string;
  badge: string;
}

interface Props {
  result: RoastResult;
  preview: string;
  mode: string;
}

const MODE_LABELS: Record<string, string> = {
  brutal: "🔥 Brutal Mode",
  comedy: "😂 Comedy Mode",
  gordonramsay: "👨‍🍳 Gordon Ramsay Mode",
  corporate: "💼 Corporate Mode",
};

const RoastCard = forwardRef<HTMLDivElement, Props>(
  ({ result, preview, mode }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-zinc-800 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <span className="text-zinc-400 text-xs sm:text-sm truncate">{MODE_LABELS[mode]}</span>
          <span className="text-lg sm:text-2xl font-black shrink-0">{result.badge}</span>
        </div>

        {/* Design preview */}
        {preview && (
          <div className="px-4 sm:px-6 pt-4 sm:pt-5">
            <img
              src={preview}
              alt="Roasted design"
              className="w-full max-h-40 sm:max-h-48 object-contain rounded-xl bg-zinc-800"
            />
          </div>
        )}

        {/* Roast text */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5">
          <div className="bg-zinc-800 rounded-xl p-3 sm:p-4">
            <p className="text-white leading-relaxed text-xs sm:text-sm">{result.roast}</p>
          </div>
        </div>

        {/* One liner */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
            <p className="text-orange-300 italic text-xs sm:text-sm">"{result.one_liner}"</p>
          </div>
        </div>

        {/* Scores */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 space-y-3">
          <ScoreBar label="Typography" score={result.scores.typography} delay={0} />
          <ScoreBar label="Color" score={result.scores.color} delay={100} />
          <ScoreBar label="Layout" score={result.scores.layout} delay={200} />
          <ScoreBar label="Creativity" score={result.scores.creativity} delay={300} />
          <div className="pt-2 border-t border-zinc-700">
            <ScoreBar label="Overall" score={result.overall} delay={400} />
          </div>
        </div>

        {/* Fix tip */}
        <div className="px-4 sm:px-6 pt-4 pb-5 sm:pb-6">
          <div className="bg-zinc-800 rounded-xl p-3 sm:p-4">
            <p className="text-zinc-400 text-xs mb-1 font-medium uppercase tracking-wide">
              💡 One thing to fix
            </p>
            <p className="text-white text-xs sm:text-sm">{result.fix}</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="px-4 sm:px-6 pb-4 text-center">
          <p className="text-zinc-600 text-xs"> designroast.vercel.app</p>
        </div>
      </div>
    );
  }
);

RoastCard.displayName = "RoastCard";
export default RoastCard;