"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Designer";
  const avatar = user?.user_metadata?.avatar_url;

  return (
    <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
      <Link href="/" className="inline-flex items-center gap-3 text-xl font-black hover:text-orange-500 transition">
         <img className="w-20 h-20 object-contain" src="/logo.png" alt="logo" />
         <span>DesignR🔥ast</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/leaderboard" className="text-zinc-400 hover:text-white text-sm transition hidden sm:block">
          Hall of Shame
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl transition"
            >
              {avatar ? (
                <img src={avatar} className="w-6 h-6 rounded-full" alt="" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-black text-xs font-black">
                  {firstName[0]}
                </div>
              )}
              <span className="text-sm font-medium text-white hidden sm:block">{firstName}</span>
              <span className="text-zinc-400 text-xs">▾</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden w-48 z-50">
                <div className="px-4 py-3 border-b border-zinc-700">
                  <p className="text-white text-sm font-medium">{firstName}</p>
                  <p className="text-zinc-400 text-xs truncate">{user.email}</p>
                </div>
               
                <Link
                  href="/leaderboard"
                  className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                  onClick={() => setShowMenu(false)}
                >
                   Hall of Shame 
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-zinc-700 transition border-t border-zinc-700"
                >
                   Logout (escape the roast)
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-orange-500 hover:bg-orange-400 text-black font-bold px-4 py-2 rounded-xl text-sm transition"
          >
            Login to get roasted
          </Link>
        )}
      </div>
    </nav>
  );
}
