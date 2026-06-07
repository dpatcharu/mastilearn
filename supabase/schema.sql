create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text,
  display_name text,
  bio text,
  avatar_url text,
  website_url text,
  account_type text not null default 'customer' check (account_type in ('customer', 'admin')),
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists website_url text;
create unique index if not exists profiles_username_unique_idx
on public.profiles (username)
where username is not null;

create table if not exists public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_slug text not null,
  item_title text not null,
  category_slug text not null,
  created_at timestamptz not null default now(),
  unique (user_id, item_slug)
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category_slug text not null,
  summary text not null,
  body text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_premium boolean not null default false,
  source_name text,
  source_url text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creator_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  summary text not null,
  body text not null,
  category_slug text not null,
  media_url text,
  media_type text check (media_type in ('image', 'video')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  view_count integer not null default 0,
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.creator_posts add column if not exists media_url text;
alter table public.creator_posts add column if not exists media_type text;
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'creator_posts_media_type_check'
  ) then
    alter table public.creator_posts
    add constraint creator_posts_media_type_check
    check (media_type in ('image', 'video'));
  end if;
end;
$$;

create table if not exists public.creator_follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  creator_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, creator_id),
  check (follower_id <> creator_id)
);

create table if not exists public.creator_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge text not null,
  created_at timestamptz not null default now(),
  unique (user_id, badge)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, username, display_name, account_type)
  values (
    new.id,
    new.email,
    nullif(lower(regexp_replace(coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)), '[^a-z0-9_]+', '', 'g')), ''),
    nullif(new.raw_user_meta_data->>'display_name', ''),
    coalesce(new.raw_user_meta_data->>'account_type', 'customer')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.saved_items enable row level security;
alter table public.content_items enable row level security;
alter table public.creator_posts enable row level security;
alter table public.creator_follows enable row level security;
alter table public.creator_badges enable row level security;

create policy "Users can read their own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can manage their saved items"
on public.saved_items for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Anyone can read published content"
on public.content_items for select
using (status = 'published');

create policy "Admins can manage content"
on public.content_items for all
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.account_type = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.account_type = 'admin'
  )
);

create policy "Anyone can read published creator posts"
on public.creator_posts for select
using (status = 'published');

create policy "Creators can manage their own posts"
on public.creator_posts for all
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "Users can manage their follows"
on public.creator_follows for all
using (auth.uid() = follower_id)
with check (auth.uid() = follower_id);

create policy "Anyone can read creator badges"
on public.creator_badges for select
using (true);

create policy "Users can read their own creator badges"
on public.creator_badges for select
using (auth.uid() = user_id);
