"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";   // ← use the SAME shared client everywhere

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
      router.push("/roast1");
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