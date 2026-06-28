"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface RoastButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function RoastButton({ className, children }: RoastButtonProps) {
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setChecking(true);
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      router.push("/roast");
    } else {
      router.push("/login");
    }
    setChecking(false);
  };

  return (
    <button onClick={handleClick} disabled={checking} className={className}>
      {checking ? "Checking..." : children}
    </button>
  );
}
