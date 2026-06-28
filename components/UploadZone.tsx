"use client";
import { useRef, useState } from "react";

interface Props {
  onImage: (file: File, preview: string) => void;
  preview: string;
}

export default function UploadZone({ onImage, preview }: Props) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onImage(file, url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 min-h-55 flex items-center justify-center
        ${dragging
          ? "border-orange-400 bg-orange-500/10 scale-[1.01]"
          : preview
            ? "border-zinc-700 hover:border-zinc-500"
            : "border-zinc-700 hover:border-orange-500 hover:bg-orange-500/5"
        }`}
    >
      {preview ? (
        <div className="w-full">
          <img
            src={preview}
            alt="Your design"
            className="max-h-64 mx-auto rounded-xl object-contain"
          />
          <p className="text-zinc-500 text-sm mt-3">Click to change image</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-5xl">🖼️</div>
          <p className="text-white font-medium text-lg">Drop your design here</p>
          <p className="text-zinc-500 text-sm">PNG, JPG, WebP — any UI, poster, logo, app screen</p>
          <div className="inline-block bg-zinc-800 text-zinc-300 text-sm px-4 py-2 rounded-lg mt-2">
            Browse files
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </div>
  );
}
