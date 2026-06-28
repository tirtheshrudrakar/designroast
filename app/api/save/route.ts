import { roastDesign } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const BADGES: Record<number, string> = {
  1: "💀 Design Criminal",
  2: "💀 Design Criminal",
  3: "💀 Design Criminal",
  4: "😬 Needs Therapy",
  5: "😬 Needs Therapy",
  6: "😐 Almost Human",
  7: "😐 Almost Human",
  8: "🎉 Accidentally Good",
  9: "🎉 Accidentally Good",
  10: "🏆 AI Made This?",
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const mode = formData.get("mode") as string;

    if (!image || !mode) {
      return NextResponse.json({ error: "Image and mode are required" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type;

    const result = await roastDesign(base64, mimeType, mode);
    const badge = BADGES[result.overall] || "😬 Needs Therapy";

    let imageUrl = "";
    let roastId = "";

    try {
      const filename = `roasts/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
      const { data: uploadData } = await supabase.storage
        .from("designs")
        .upload(filename, image, { contentType: mimeType });

      if (uploadData) {
        const { data: urlData } = supabase.storage.from("designs").getPublicUrl(filename);
        imageUrl = urlData.publicUrl;
      }

      const { data: saved } = await supabase
        .from("roasts")
        .insert({
          image_url: imageUrl,
          mode,
          roast_text: result.roast,
          one_liner: result.one_liner,
          fix_tip: result.fix,
          scores: result.scores,
          overall_score: result.overall,
          badge,
        })
        .select()
        .single();

      if (saved) roastId = saved.id;
    } catch {
      // Supabase optional — continue without saving
    }

    return NextResponse.json({
      ...result,
      badge,
      id: roastId,
      image_url: imageUrl,
    });
  } catch (error) {
    console.error("Roast error:", error);
    return NextResponse.json({ error: "Failed to roast design" }, { status: 500 });
  }
}
