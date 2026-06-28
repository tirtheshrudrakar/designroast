"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PRANK_MESSAGES = [
  "lol nice try bestie ",
  "Error 404: Talent not found",
  "Your cursor isn't even centered on the button ",
  "This button is for professionals only.",
  "Our AI detected zero design skills. Access denied.",
  "Please submit a portfolio first. Just kidding. Still no.",
  "This button filed a restraining order against your designs.",
];

const TYPING_ROASTS = [
  "typing your email already? bold move for someone with your color palette...",
  "we can already tell by your typing speed this will be rough...",
  "the caps lock key called. it wants nothing to do with your designs.",
  "at least your keyboard works. unlike your sense of hierarchy.",
];

export default function LoginPage() {
  const [prankMsg, setPrankMsg] = useState("");
  const [shakeBtn, setShakeBtn] = useState("");
  const [typingRoast, setTypingRoast] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkedBox, setCheckedBox] = useState(false);
  const [checkboxMsg, setCheckboxMsg] = useState("");
  const [floatingEmoji, setFloatingEmoji] = useState<{id: number, emoji: string, x: number}[]>([]);
  const [emojiId, setEmojiId] = useState(0);

  const triggerPrank = (btnId: string) => {
    const msg = PRANK_MESSAGES[Math.floor(Math.random() * PRANK_MESSAGES.length)];
    setPrankMsg(msg);
    setShakeBtn(btnId);
    setTimeout(() => setShakeBtn(""), 600);
    setTimeout(() => setPrankMsg(""), 3000);

    const emojis = ["💀", "😭", "🔥", "💅", "😬"];
    const newEmoji = {
      id: emojiId,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 80 + 10,
    };
    setEmojiId(e => e + 1);
    setFloatingEmoji(prev => [...prev, newEmoji]);
    setTimeout(() => setFloatingEmoji(prev => prev.filter(e => e.id !== newEmoji.id)), 1500);
  };

  const handleTyping = () => {
    if (!hasTyped) {
      setHasTyped(true);
      const roast = TYPING_ROASTS[Math.floor(Math.random() * TYPING_ROASTS.length)];
      setTypingRoast(roast);
      setTimeout(() => setTypingRoast(""), 4000);
    }
  };

  const handleCheckbox = () => {
    if (!checkedBox) {
      setCheckedBox(true);
      setCheckboxMsg("bold of you to admit that ");
    } else {
      setCheckedBox(false);
      setCheckboxMsg("running from the truth? classic designer move.");
      setTimeout(() => setCheckboxMsg(""), 2000);
    }
  };

  const handleGoogleLogin = async () => {
    if (!checkedBox) {
      setPrankMsg("You must accept your embarrassment first ");
      setTimeout(() => setPrankMsg(""), 2000);
      return;
    }
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/welcome`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 relative overflow-hidden">

      {floatingEmoji.map(e => (
        <div
          key={e.id}
          className="fixed text-3xl pointer-none z-50 animate-bounce"
          style={{
            left: `${e.x}%`,
            top: "40%",
            animation: "floatUp 1.5s ease-out forwards",
          }}
        >
          {e.emoji}
        </div>
      ))}

      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="w-full max-w-md relative z-10">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔥</div>
          <h1 className="text-4xl font-black mb-2">DesignRoast</h1>
          <p className="text-zinc-400 text-sm">
            Enter if you're brave enough to face the truth.
          </p>
        </div>

        {prankMsg && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-4 text-sm text-center font-medium animate-pulse">
            {prankMsg}
          </div>
        )}

        {typingRoast && (
          <div className="bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-xl px-4 py-3 mb-4 text-xs text-center italic">
            💭 {typingRoast}
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">

          <div className="space-y-2">
            <p className="text-zinc-500 text-xs text-center mb-3">choose your entry method:</p>

            <button
              onClick={() => triggerPrank("talent")}
              className={`w-full py-3 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 transition
                ${shakeBtn === "talent" ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
            >
               Login with Talent
            </button>

            <button
              onClick={() => triggerPrank("pro")}
              className={`w-full py-3 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 transition
                ${shakeBtn === "pro" ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
            >
               Login as Professional Designer
            </button>

            <button
              onClick={() => triggerPrank("skip")}
              className={`w-full py-3 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 transition
                ${shakeBtn === "skip" ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
            >
               Skip (my designs are already great)
            </button>
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs">or face reality</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <button
            onClick={handleCheckbox}
            className="w-full flex items-start gap-3 text-left p-3 rounded-xl hover:bg-zinc-800 transition"
          >
            <div className={`w-5 h-5 rounded shrink-0 mt-0.5 border-2 flex items-center justify-center transition-all
              ${checkedBox ? "bg-orange-500 border-orange-500" : "border-zinc-600"}`}>
              {checkedBox && <span className="text-black text-xs font-black">✓</span>}
            </div>
            <span className="text-zinc-400 text-sm leading-relaxed">
              I admit my designs need help and I am emotionally prepared to be roasted by an AI
            </span>
          </button>

          {checkboxMsg && (
            <p className="text-orange-400 text-xs text-center italic -mt-2">{checkboxMsg}</p>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-black text-base transition-all
              ${checkedBox
                ? "bg-orange-500 hover:bg-orange-400 text-black"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🔥</span> Verifying your courage...
              </span>
            ) : checkedBox ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google (the real button)
              </span>
            ) : (
              " Check the box first"
            )}
          </button>

          <p className="text-zinc-700 text-xs text-center">
            By continuing, you agree that your feelings may get hurt.
          </p>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Already have an account? That means you survived last time. Impressive. 
        </p>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120px) scale(1.5); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
