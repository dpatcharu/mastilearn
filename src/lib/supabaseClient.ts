import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublicKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabasePublicKey as string)
  : null;

export function getAuthRedirectUrl(path = "/login/") {
  const baseUrl =
    configuredSiteUrl ||
    (typeof window === "undefined" ? undefined : window.location.origin);

  if (baseUrl) {
    return new URL(path, baseUrl).toString();
  }

  if (typeof window === "undefined") {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}
