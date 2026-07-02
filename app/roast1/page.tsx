"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import UploadZone from "@/components/UploadZone";
import ModeSelector from "@/components/ModeSelector";
import RoastCard from "@/components/RoastCard";
import ShareButton from "@/components/ShareButton";
import Navbar from "@/components/Navbar";

interface RoastResult {
  roast: string;
  scores: { typography: number; color: number; layout: number; creativity: number };
  overall: number;
  one_liner: string;
  fix: string;
  badge: string;
  
}

const LOADING_MSGS = [
  "Analyzing your design choices...",
  "Consulting the design gods...",
  "Preparing the roast...",
  "Finding words strong enough...",
  "Almost done destroying your confidence...",
];

export default function RoastPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [mode, setMode] = useState("brutal");
  const [loading, setLoading] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [error, setError] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleImage = (file: File, url: string) => {
    setImage(file);
    setPreview(url);
    setResult(null);
    setError("");
  };

  const handleRoast = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    setResult(null);
    setMsgIndex(0);

    intervalRef.current = setInterval(() => {
      setMsgIndex((p) => (p + 1) % LOADING_MSGS.length);
    }, 1800);

    try {
      const form = new FormData();
      form.append("image", image);
      form.append("mode", mode);

      const res = await fetch("/api/roast", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);

      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: any) {
      setError(err.message || "Failed to roast. Try again.");
    } finally {
      setLoading(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6 pb-20">
        <div className="text-center">
          <h1 className="text-3xl font-black mb-2">Upload your design</h1>
          <p className="text-zinc-400 text-sm">
            We'll tell you what everyone else was too scared to say.
          </p>
        </div>

        <UploadZone onImage={handleImage} preview={preview} />

        {image && (
          <div className="space-y-3">
            <p className="text-zinc-400 text-sm font-medium">Choose your roast mode:</p>
            <ModeSelector selected={mode} onSelect={setMode} />
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        {image && (
          <button
            onClick={handleRoast}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-black font-black text-xl py-5 rounded-2xl transition"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="animate-spin">🌝</span>
                {LOADING_MSGS[msgIndex]}
              </span>
            ) : (
              " ROAST MY DESIGN"
            )}
          </button>
        )}

        {result && (
          <div className="space-y-4">
            <RoastCard result={result} preview={preview} mode={mode} ref={cardRef} />
            <ShareButton
              cardRef={cardRef}
              overall={result.overall}
              badge={result.badge}
              oneLiner={result.one_liner}
            />
            <button
              onClick={() => { setResult(null); setPreview(""); setImage(null); }}
              className="w-full border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white py-3 rounded-xl transition text-sm"
            >
              Roast another design
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
