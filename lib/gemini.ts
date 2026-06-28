import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const ROAST_PERSONAS: Record<string, string> = {
  brutal: `You are a savage, brutally honest design critic with absolutely zero filter. 
    Roast this design mercilessly. Be specific about every bad decision. 
    Use dark humor. Reference specific design principles they violated. No encouragement whatsoever.`,

  comedy: `You are a stand-up comedian who reviews designs on stage. 
    Make the audience laugh at every bad design decision. Use funny analogies, 
    pop culture references, and exaggerated comparisons. Be specific about what's bad but hilarious.`,

  gordonramsay: `You are Gordon Ramsay but for design instead of food. 
    OCCASIONALLY SCREAM IN CAPS for emphasis. Call things RAW, DISGUSTING, AMATEUR. 
    Use cooking metaphors everywhere. Say "bloody hell", "donkey", and "this is a disgrace" a lot.
    Be passionately furious about bad design choices.`,

  corporate: `You are a passive aggressive corporate manager in a design review meeting. 
    Be devastatingly polite. Say "interesting choice", "very unique vision", "I'm sure someone will appreciate this".
    Use corporate buzzwords. Never say anything directly negative but absolutely destroy their confidence.
    End with "Let's circle back on this" or "I'll send some feedback via email".`
};

export interface RoastResult {
  roast: string;
  scores: {
    typography: number;
    color: number;
    layout: number;
    creativity: number;
  };
  overall: number;
  one_liner: string;
  fix: string;
}

export async function roastDesign(
  imageBase64: string,
  mimeType: string,
  mode: string
): Promise<RoastResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const persona = ROAST_PERSONAS[mode] || ROAST_PERSONAS.brutal;

  const prompt = `${persona}

Analyze this design image carefully and respond ONLY with this exact JSON structure.
No markdown, no code blocks, no explanation — just raw JSON:
{
  "roast": "<your roast in 3-4 sentences, fully in character, be specific about what you see>",
  "scores": {
    "typography": <integer 1-10>,
    "color": <integer 1-10>,
    "layout": <integer 1-10>,
    "creativity": <integer 1-10>
  },
  "overall": <integer 1-10>,
  "one_liner": "<single most devastating or funny one-liner about this specific design>",
  "fix": "<the single most important thing to fix, still in character>"
}`;

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: mimeType as "image/jpeg" | "image/png" | "image/webp",
        data: imageBase64,
      },
    },
    { text: prompt },
  ]);

  const raw = result.response.text().replace(/```json|```/g, "").trim();
  return JSON.parse(raw);
}
