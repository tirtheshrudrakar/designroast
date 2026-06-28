import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface RoastRecord {
  id: string;
  image_url: string;
  mode: string;
  roast_text: string;
  one_liner: string;
  fix_tip: string;
  scores: {
    typography: number;
    color: number;
    layout: number;
    creativity: number;
  };
  overall_score: number;
  badge: string;
  share_count: number;
  created_at: string;
}
