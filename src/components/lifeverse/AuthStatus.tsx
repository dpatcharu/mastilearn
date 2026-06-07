"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase?.auth.signOut();
    setUser(null);
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-[1.5rem] bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        Supabase environment variables are missing, so this preview is not
        connected to live auth yet.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm font-semibold text-slate-500">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-6 text-slate-600">
        No active session. Sign in from the login page to unlock account features.
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
      <p className="font-black">Signed in as {user.email}</p>
      <Button className="mt-4" onClick={handleSignOut} type="button" variant="secondary">
        Sign out
      </Button>
    </div>
  );
}
