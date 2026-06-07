"use client";

import { useState } from "react";
import { Apple, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAuthRedirectUrl,
  isSupabaseConfigured,
  supabase
} from "@/lib/supabaseClient";

type AuthFormProps = {
  role: "customer" | "admin";
};

type AuthMode = "signin" | "signup";
type OAuthProvider = "google" | "apple";

export function AuthForm({ role }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleOAuth(provider: OAuthProvider) {
    if (!supabase) {
      setMessage("Sign-in is temporarily unavailable. Please try again shortly.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getAuthRedirectUrl("/login/")
      }
    });

    if (error) {
      setIsLoading(false);
      setMessage(error.message);
    }
  }

  async function handleSignIn() {
    if (!supabase) {
      setMessage("Sign-in is temporarily unavailable. Please try again shortly.");
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
      setMessage("Sign-in is temporarily unavailable. Please try again shortly.");
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

  async function handlePasswordReset() {
    if (!supabase) {
      setMessage("Sign-in is temporarily unavailable. Please try again shortly.");
      return;
    }

    if (!email) {
      setMessage("Enter your email first, then choose forgot password.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getAuthRedirectUrl("/login/")
    });

    setIsLoading(false);
    setMessage(error ? error.message : "Password reset link sent to your email.");
  }

  async function handleEmailSubmit() {
    if (mode === "signin") {
      await handleSignIn();
      return;
    }

    await handleSignUp();
  }

  return (
    <div className="mt-7 grid gap-4">
      {!isSupabaseConfigured ? (
        <div className="rounded-[1.25rem] bg-rose-50 p-4 text-sm leading-6 text-rose-900">
          Sign-in is temporarily unavailable. Please try again shortly.
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          aria-label="Continue with Google"
          className="bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-slate-50"
          disabled={isLoading}
          onClick={() => handleOAuth("google")}
          type="button"
          variant="secondary"
        >
          <span aria-hidden="true" className="mr-2 grid size-5 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
            G
          </span>
          Continue with Google
        </Button>
        <Button
          aria-label="Continue with Apple"
          className="bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-slate-50"
          disabled={isLoading}
          onClick={() => handleOAuth("apple")}
          type="button"
          variant="secondary"
        >
          <Apple className="mr-2 size-4" />
          Continue with Apple
        </Button>
      </div>

      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-normal text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        or use email
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid rounded-full bg-slate-100 p-1 sm:grid-cols-2">
        {[
          { label: "Sign in", value: "signin" as const },
          { label: "Create account", value: "signup" as const }
        ].map((item) => (
          <button
            className={`min-h-11 rounded-full px-4 text-sm font-black transition ${
              mode === item.value
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-950"
            }`}
            key={item.value}
            onClick={() => {
              setMode(item.value);
              setMessage("");
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

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
      <div className="grid gap-3">
        <Button
          disabled={isLoading || !email || !password}
          onClick={handleEmailSubmit}
          type="button"
        >
          <Mail className="mr-2 size-4" />
          {mode === "signin" ? "Sign in with email" : "Create account with email"}
        </Button>
        {mode === "signin" ? (
          <button
            className="text-sm font-bold text-slate-500 transition hover:text-slate-950"
            disabled={isLoading}
            onClick={handlePasswordReset}
            type="button"
          >
            Forgot password?
          </button>
        ) : (
          <p className="text-center text-xs font-semibold leading-5 text-slate-400">
            By creating an account, readers can save posts, follow interests, and build boards.
          </p>
        )}
      </div>
      {message ? (
        <p className="rounded-[1.25rem] bg-slate-50 p-4 text-sm font-semibold text-slate-600">
          {message}
        </p>
      ) : null}
    </div>
  );
}
