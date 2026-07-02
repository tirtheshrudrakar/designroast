"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import WelcomeModal from "@/components/WelcomeModal";
import RoastButton from "@/components/RoastButton";
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <WelcomeModal />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="text-center px-4 pt-12 sm:pt-20 pb-12 sm:pb-16 max-w-4xl mx-auto">
        <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-6 sm:mb-8">
          AI-powered design critique that actually hurts 
        </div>

       <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
          <img className="block mx-auto mb-4 w-8 h-8 sm:w-10 sm:h-10 object-contain invert" src="/wink.png" alt="wink" />

          Your designer friends
          <br />
          <span className="text-orange-500">lied to you.</span>
          <br />
          We won't.
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Upload your UI, poster, logo, or any design. Pick your roast mode.
          Get brutally honest AI feedback that actually makes you better.
        </p>

        <RoastButton className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-black text-base sm:text-lg md:text-xl px-6 sm:px-10 py-3.5 sm:py-5 rounded-2xl transition transform hover:scale-105 w-full sm:w-auto">
          Roast My Design Free
        </RoastButton>

        <p className="text-zinc-600 text-xs sm:text-sm mt-4">Login and get roasted. Just pain.</p>
      </section>

      {/* Modes section */}
      <section className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
        <h2 className="text-center text-2xl sm:text-3xl font-black mb-8 sm:mb-10">Choose your torture</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { emoji: "🔥", label: "Brutal", desc: "Zero mercy" },
            { emoji: "😂", label: "Comedy", desc: "Laugh through the pain" },
            { emoji: "👨‍🍳", label: "Gordon Ramsay", desc: "IT'S RAW!" },
            { emoji: "💼", label: "Corporate", desc: "Passive aggressive" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 text-center hover:border-orange-500/50 transition"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{m.emoji}</div>
              <div className="font-bold text-white text-sm sm:text-base">{m.label}</div>
              <div className="text-zinc-500 text-xs sm:text-sm mt-1">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-4xl mx-auto px-4 py-6 sm:py-8 text-center">
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          {[
            { num: "4 modes", label: "Of brutal honesty" },
            { num: "100%", label: "Free forever" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-black text-orange-500">{s.num}</div>
              <div className="text-zinc-400 text-xs sm:text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-14 sm:py-20 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">Ready to face the truth?</h2>
        <p className="text-zinc-400 text-sm sm:text-base mb-8">Join thousands of designers who chose pain over mediocrity.</p>
        <Link
          href="/login"
          className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-black text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition w-full sm:w-auto"
        >
          Get Roasted Now →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-6 sm:py-8 text-center text-zinc-600 text-xs sm:text-sm px-4">
        <p> DesignRoast — Brutally honest AI design critique</p>
        <Link href="/leaderboard" className="text-zinc-500 hover:text-zinc-300 mt-2 inline-block transition">
          Hall of Shame →
        </Link>
      </footer>
    </main>
  );
}