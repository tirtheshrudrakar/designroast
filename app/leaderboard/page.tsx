"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <WelcomeModal />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="text-center px-4 pt-20 pb-16 max-w-4xl mx-auto">
        <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm px-4 py-1.5 rounded-full mb-8">
          AI-powered design critique that actually hurts 
        </div>

        <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
          <img className="block mx-auto mb-4 w-10 h-10 object-contain invert" src="/wink.png" alt="wink" />

          Your designer friends
          <br />
          <span className="text-orange-500">lied to you.</span>
          <br />
          We won't.
        </h1>

        <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your UI, poster, logo, or any design. Pick your roast mode.
          Get brutally honest AI feedback that actually makes you better.
        </p>

        <Link
          href="/login"
          className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-black text-xl px-10 py-5 rounded-2xl transition transform hover:scale-105"
        >
           Roast My Design 
        </Link>

        <p className="text-zinc-600 text-sm mt-4">Login and get roasted. Just pain.</p>
      </section>

      {/* Modes section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-center text-3xl font-black mb-10">Choose your torture</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "🔥", label: "Brutal", desc: "Zero mercy" },
            { emoji: "😂", label: "Comedy", desc: "Laugh through the pain" },
            { emoji: "👨‍🍳", label: "Gordon Ramsay", desc: "IT'S RAW!" },
            { emoji: "💼", label: "Corporate", desc: "Passive aggressive" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center hover:border-orange-500/50 transition"
            >
              <div className="text-4xl mb-3">{m.emoji}</div>
              <div className="font-bold text-white">{m.label}</div>
              <div className="text-zinc-500 text-sm mt-1">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="grid grid-cols-2 gap-8">
          {[
            { num: "4 modes", label: "Of brutal honesty" },
            { num: "100%", label: "Free forever" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black text-orange-500">{s.num}</div>
              <div className="text-zinc-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-4">
        <h2 className="text-4xl font-black mb-4">Ready to face the truth?</h2>
        <p className="text-zinc-400 mb-8">Join thousands of designers who chose pain over mediocrity.</p>
        <Link
          href="/login"
          className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-black text-lg px-8 py-4 rounded-2xl transition"
        >
          Get Roasted Now →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-600 text-sm">
        <p> DesignRoast — Brutally honest AI design critique</p>
        <Link href="/leaderboard" className="text-zinc-500 hover:text-zinc-300 mt-2 inline-block transition">
          Hall of Shame →
        </Link>
      </footer>
    </main>
  );
}
