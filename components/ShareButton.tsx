"use client";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

interface Props {
  cardRef: React.RefObject<HTMLDivElement | null>;
  overall: number;
  badge: string;
  oneLiner: string;
  roastId?: string;
}

export default function ShareButton({ cardRef, overall, badge, oneLiner, roastId }: Props) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#18181b",
        scale: 2,
        useCORS: true,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-design-roast.png";
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleTweet = () => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://designroast.vercel.app";
    const shareUrl = roastId ? `${appUrl}/r/${roastId}` : appUrl;
    const text = `I got roasted by AI 😭 My design scored ${overall}/10 ${badge}\n\n"${oneLiner}"\n\nGet your design roasted 👇\n${shareUrl}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleCopyLink = () => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://designroast.vercel.app";
    const shareUrl = roastId ? `${appUrl}/r/${roastId}` : appUrl;
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleTweet}
        className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 rounded-xl transition text-sm"
      >
        𝕏 Share on Twitter
      </button>
      <button
        onClick={handleCopyLink}
        className="flex-1 border border-zinc-700 hover:border-zinc-500 text-white font-bold py-3 rounded-xl transition text-sm"
      >
        🔗 Copy Link
      </button>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex-1 border border-zinc-700 hover:border-zinc-500 text-white font-bold py-3 rounded-xl transition text-sm disabled:opacity-50"
      >
        {downloading ? "Saving..." : "💾 Download"}
      </button>
    </div>
  );
}
