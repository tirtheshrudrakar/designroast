"use client";
import { useEffect, useState } from "react";

const SESSION_KEY = "designroast_welcome_seen";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (!alreadySeen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl animate-[fadeIn_0.2s_ease-out]">
       <img className="block mx-auto mb-4 w-12 h-12 object-contain" src="/kitty.png" alt="Kitty" />

        
        <h2 id="welcome-modal-title" className="text-2xl font-black mb-3">
          Before we begin
        </h2>

        <p className="text-zinc-300 text-base leading-relaxed mb-2">
          We're about to roast your <span className="text-white font-bold">Design</span>.
          Not you.
        </p>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          You're clearly someone who cares enough to ask for feedback —
          that already puts you ahead of most people shipping bad UIs.
          Take the heat, keep the lesson, ignore the rest. You've got this.
        </p>
       <h1 className="text-xl font-bold mask-origin-padding" style={{ paddingBottom: "20px" }}> So Please Don't Take It Personally</h1>

       <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 mb-6 text-left space-y-2.5">
          <p className="text-zinc-300 text-xs font-bold uppercase tracking-wide mb-1">
            Important:
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
             <span className="text-zinc-300">It's just for fun</span> — the goal is to get you
            comfortable taking critique without flinching.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
             <span className="text-zinc-300">It's still useful</span> — every roast points to
            exactly where your design falls short.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
             <span className="text-zinc-300">It comes with fixes</span> — you'll walk away with
            real ideas to make it better.
          </p>
        </div>
        
        

        <button
          onClick={handleClose}
          autoFocus
          className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black text-lg py-3.5 rounded-xl transition"
        >
          Bring on the heat →
        </button>
      </div>
    </div>
  );
}
