# Supabase Setup

1. In Supabase, open **Project Settings > API**.
2. Copy the **Project URL** and **anon public key**.
3. For local development, create `.env.local` from `.env.example`.
4. For Vercel deploys, add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL=https://www.mastilearn.com`
5. In Supabase, open **SQL Editor** and run `supabase/schema.sql`.
6. In **Authentication > URL Configuration**, set:
   - Site URL: `https://www.mastilearn.com`
   - Redirect URLs:
     - `https://www.mastilearn.com/account/`
     - `https://www.mastilearn.com/login/`
     - `https://mastilearn.com/account/`
     - `https://mastilearn.com/login/`

Do not use a protected Vercel preview URL as the Supabase Site URL. Email
confirmation links should redirect to the public production domain.

Admin accounts are controlled by `profiles.account_type = 'admin'`.
