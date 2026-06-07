"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getAuthRedirectUrl,
  isSupabaseConfigured,
  supabase
} from "@/lib/supabaseClient";

type AuthFormProps = {
  role: "customer" | "admin";
};

export function AuthForm({ role }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsLoading(false);
    setMessage(error ? error.message : "Signed in successfully.");
  }

  async function handleSignUp() {
    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          account_type: role
        },
        emailRedirectTo: getAuthRedirectUrl("/login/")
      }
    });

    setIsLoading(false);
    setMessage(
      error
        ? error.message
        : "Check your email to confirm your account, then come back to sign in."
    );
  }

  return (
    <div className="mt-7 grid gap-4">
      {!isSupabaseConfigured ? (
        <div className="rounded-[1.25rem] bg-rose-50 p-4 text-sm leading-6 text-rose-900">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
          enable live authentication.
        </div>
      ) : null}
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Email
        <input
          className="min-h-12 rounded-full bg-slate-50 px-5 text-sm outline-none ring-1 ring-slate-200 transition focus:ring-slate-400"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Password
        <input
          className="min-h-12 rounded-full bg-slate-50 px-5 text-sm outline-none ring-1 ring-slate-200 transition focus:ring-slate-400"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          type="password"
          value={password}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button disabled={isLoading || !email || !password} onClick={handleSignIn} type="button">
          Sign in
        </Button>
        <Button
          disabled={isLoading || !email || !password}
          onClick={handleSignUp}
          type="button"
          variant="secondary"
        >
          Create account
        </Button>
      </div>
      {message ? (
        <p className="rounded-[1.25rem] bg-slate-50 p-4 text-sm font-semibold text-slate-600">
          {message}
        </p>
      ) : null}
    </div>
  );
}
