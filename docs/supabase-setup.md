# Supabase Setup

1. In Supabase, open **Project Settings > API**.
2. Copy the **Project URL** and **anon public key**.
3. For local development, create `.env.local` from `.env.example`.
4. For GitHub Pages deploys, add repository secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. In Supabase, open **SQL Editor** and run `supabase/schema.sql`.
6. In **Authentication > URL Configuration**, set:
   - Site URL: `https://mastilearn.com`
   - Redirect URLs: `https://mastilearn.com/login/`

Admin accounts are controlled by `profiles.account_type = 'admin'`.
