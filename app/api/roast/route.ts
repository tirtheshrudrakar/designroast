import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const ROAST_PERSONAS: Record<string, string> = {
  brutal: `You are a savage, brutally honest design critic with zero filter. 
    Roast this design mercilessly. Be specific about every bad decision. 
    Use dark humor. No encouragement whatsoever.`,
  comedy: `You are a stand-up comedian who reviews designs on stage. 
    Make the audience laugh at every bad decision. Use funny analogies 
    and pop culture references. Be specific about what's bad but hilarious.`,
  gordonramsay: `You are Gordon Ramsay but for design instead of food. 
    OCCASIONALLY SCREAM IN CAPS. Call things RAW, DISGUSTING, AMATEUR. 
    Use cooking metaphors. Say "bloody hell" and "donkey" a lot.`,
  corporate: `You are a passive aggressive corporate manager in a design review. 
    Be devastatingly polite. Say "interesting choice" and "very unique vision". 
    Never say anything directly negative but destroy their confidence.`
};

const BADGES: Record<number, string> = {
  1: "💀 Design Criminal", 2: "💀 Design Criminal", 3: "💀 Design Criminal",
  4: "😬 Needs Therapy", 5: "😬 Needs Therapy",
  6: "😐 Almost Human", 7: "😐 Almost Human",
  8: "🎉 Accidentally Good", 9: "🎉 Accidentally Good",
  10: "🏆 AI Made This?",
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const mode = formData.get("mode") as string;

    if (!image || !mode) {
      return NextResponse.json({ error: "Image and mode required" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const persona = ROAST_PERSONAS[mode] || ROAST_PERSONAS.brutal;

    const prompt = `${persona}

Analyze this design image and respond ONLY with this exact JSON — no markdown, no code blocks:
{
  "roast": "<3-4 sentences roasting this design, fully in character, be specific>",
  "scores": {
    "typography": <integer 1-10>,
    "color": <integer 1-10>,
    "layout": <integer 1-10>,
    "creativity": <integer 1-10>
  },
  "overall": <integer 1-10>,
  "one_liner": "<single most devastating or funny one-liner about this design>",
  "fix": "<the single most important thing to fix, still in character>"
}`;

    const result = await model.generateContent([
      { inlineData: { mimeType, data: base64 } },
      { text: prompt },
    ]);

    const raw = result.response.text().replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);
    const badge = BADGES[parsed.overall] || "😬 Needs Therapy";

    return NextResponse.json({ ...parsed, badge, id: null, image_url: null });
  } catch (error: any) {
    console.error("Roast error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to roast" },
      { status: 500 }
    );
  }
}