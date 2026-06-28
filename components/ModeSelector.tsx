"use client";

const MODES = [
  {
    id: "brutal",
    emoji: "🔥",
    label: "Brutal",
    desc: "Zero mercy. Pure savage.",
    color: "hover:border-red-500 hover:bg-red-500/10",
    active: "border-red-500 bg-red-500/10",
  },
  {
    id: "comedy",
    emoji: "😂",
    label: "Comedy",
    desc: "Roasted with jokes.",
    color: "hover:border-yellow-500 hover:bg-yellow-500/10",
    active: "border-yellow-500 bg-yellow-500/10",
  },
  {
    id: "gordonramsay",
    emoji: "👨‍🍳",
    label: "Gordon Ramsay",
    desc: "IT'S RAW AND DISGUSTING.",
    color: "hover:border-orange-500 hover:bg-orange-500/10",
    active: "border-orange-500 bg-orange-500/10",
  },
  {
    id: "corporate",
    emoji: "💼",
    label: "Corporate",
    desc: "Passive aggressive boss.",
    color: "hover:border-blue-500 hover:bg-blue-500/10",
    active: "border-blue-500 bg-blue-500/10",
  },
];

interface Props {
  selected: string;
  onSelect: (mode: string) => void;
}

export default function ModeSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelect(m.id)}
          className={`p-4 rounded-xl border-2 text-left transition-all duration-200
            ${selected === m.id ? m.active + " border-2" : "border-zinc-800 " + m.color}`}
        >
          <div className="text-2xl mb-1">{m.emoji}</div>
          <div className="font-bold text-white text-sm">{m.label}</div>
          <div className="text-zinc-400 text-xs mt-0.5">{m.desc}</div>
        </button>
      ))}
    </div>
  );
}
