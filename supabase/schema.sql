-- =====================================================================
-- MCT2000 — Supabase schema
-- Run this once in Supabase SQL Editor (https://app.supabase.com)
-- =====================================================================

-- ---------- Extensions ----------
create extension if not exists pgcrypto;

-- ---------- Profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  pseudo text unique not null,
  bike text,
  city text,
  km integer default 0,
  joined_year integer default extract(year from now())::int,
  avatar_url text,
  bio text,
  role text default 'member' check (role in ('member','officer','admin')),
  created_at timestamptz default now()
);

-- Auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, pseudo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'pseudo', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Channels (chat) ----------
create table if not exists public.channels (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz default now()
);

insert into public.channels (slug, name, description) values
  ('general', 'général', 'Discussions ouvertes'),
  ('sorties', 'sorties', 'Organiser les rides'),
  ('meca', 'mécanique', 'Entraide technique, pièces, tutos'),
  ('annonces', 'annonces', 'Officiel — lecture seule sauf officiers'),
  ('off-topic', 'off-topic', 'Hors moto')
on conflict (slug) do nothing;

-- ---------- Messages ----------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.channels(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (length(content) between 1 and 4000),
  created_at timestamptz default now()
);

create index if not exists messages_channel_created_idx
  on public.messages (channel_id, created_at desc);

-- View joining pseudo for client convenience
create or replace view public.messages_with_pseudo
with (security_invoker = true) as
  select m.*, p.pseudo
  from public.messages m
  join public.profiles p on p.id = m.user_id;

-- ---------- Posts (feed) ----------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);

create table if not exists public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- Aggregated feed view (SECURITY INVOKER: RLS applies for the calling user)
create or replace view public.feed_posts
with (security_invoker = true) as
  select
    p.id,
    p.user_id,
    pr.pseudo,
    p.content,
    p.image_url,
    p.created_at,
    coalesce((select count(*) from public.post_likes l where l.post_id = p.id), 0)::int as like_count,
    coalesce((select count(*) from public.post_comments c where c.post_id = p.id), 0)::int as comment_count,
    exists (
      select 1 from public.post_likes l
      where l.post_id = p.id and l.user_id = auth.uid()
    ) as liked_by_me
  from public.posts p
  join public.profiles pr on pr.id = p.user_id;

-- ---------- Events ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  location text,
  distance_km integer,
  level text check (level in ('Facile','Intermédiaire','Confirmé','Tous niveaux')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists public.event_rsvps (
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text default 'going' check (status in ('going','maybe','out')),
  created_at timestamptz default now(),
  primary key (event_id, user_id)
);

-- ---------- Row Level Security ----------
alter table public.profiles      enable row level security;
alter table public.channels      enable row level security;
alter table public.messages      enable row level security;
alter table public.posts         enable row level security;
alter table public.post_likes    enable row level security;
alter table public.post_comments enable row level security;
alter table public.events        enable row level security;
alter table public.event_rsvps   enable row level security;

-- Profiles : world-readable, user can update its own
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select using (true);

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (auth.uid() = id) with check (auth.uid() = id);

-- Channels : everyone can read, only admin/officer can create
drop policy if exists channels_select on public.channels;
create policy channels_select on public.channels for select using (true);

-- Messages : authenticated members can read everything, insert own
drop policy if exists messages_select on public.messages;
create policy messages_select on public.messages for select
  using (auth.role() = 'authenticated');

drop policy if exists messages_insert on public.messages;
create policy messages_insert on public.messages for insert
  with check (auth.uid() = user_id);

drop policy if exists messages_delete on public.messages;
create policy messages_delete on public.messages for delete
  using (auth.uid() = user_id);

-- Posts : everyone can read, member can post, owner can delete
drop policy if exists posts_select on public.posts;
create policy posts_select on public.posts for select using (true);

drop policy if exists posts_insert on public.posts;
create policy posts_insert on public.posts for insert with check (auth.uid() = user_id);

drop policy if exists posts_delete on public.posts;
create policy posts_delete on public.posts for delete using (auth.uid() = user_id);

drop policy if exists likes_select on public.post_likes;
create policy likes_select on public.post_likes for select using (true);
drop policy if exists likes_insert on public.post_likes;
create policy likes_insert on public.post_likes for insert with check (auth.uid() = user_id);
drop policy if exists likes_delete on public.post_likes;
create policy likes_delete on public.post_likes for delete using (auth.uid() = user_id);

drop policy if exists comments_select on public.post_comments;
create policy comments_select on public.post_comments for select using (true);
drop policy if exists comments_insert on public.post_comments;
create policy comments_insert on public.post_comments for insert with check (auth.uid() = user_id);
drop policy if exists comments_delete on public.post_comments;
create policy comments_delete on public.post_comments for delete using (auth.uid() = user_id);

-- Events
drop policy if exists events_select on public.events;
create policy events_select on public.events for select using (true);

-- Helper : is current user an admin / officer ?
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(
    (select role in ('admin','officer') from public.profiles where id = auth.uid()),
    false
  );
$$;

drop policy if exists events_admin_write on public.events;
create policy events_admin_write on public.events
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists rsvps_select on public.event_rsvps;
create policy rsvps_select on public.event_rsvps for select using (true);
drop policy if exists rsvps_all on public.event_rsvps;
create policy rsvps_all on public.event_rsvps for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- View: events with rsvp count + my status (SECURITY INVOKER: RLS applies)
create or replace view public.events_with_counts
with (security_invoker = true) as
  select
    e.*,
    coalesce((select count(*) from public.event_rsvps r where r.event_id = e.id and r.status = 'going'), 0)::int as going_count,
    (select status from public.event_rsvps r
       where r.event_id = e.id and r.user_id = auth.uid()) as my_status
  from public.events e;

-- ---------- Gallery ----------
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  taken_at date,
  added_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.gallery_photos enable row level security;
drop policy if exists gallery_select on public.gallery_photos;
create policy gallery_select on public.gallery_photos for select using (true);
drop policy if exists gallery_admin_write on public.gallery_photos;
create policy gallery_admin_write on public.gallery_photos
  for all using (public.is_admin()) with check (public.is_admin());

-- Admins can also post on behalf of the club, edit messages, etc.
drop policy if exists posts_admin_all on public.posts;
create policy posts_admin_all on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Function privileges hardening ----------
-- handle_new_user() is a SECURITY DEFINER trigger function. It only needs to run from
-- the auth.users INSERT trigger (which fires under supabase_auth_admin / postgres),
-- not via PostgREST RPC. Revoke direct execution.
revoke execute on function public.handle_new_user() from anon, authenticated, public;

-- is_admin() is SECURITY DEFINER so it can read profiles.role while RLS is on. It must
-- remain callable from RLS policies by signed-in users, but should not be exposed to anon.
revoke execute on function public.is_admin() from anon, public;
-- (kept granted to `authenticated` so RLS policies resolve)

-- ---------- Realtime ----------
-- Make sure these tables emit realtime events
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.post_likes;
alter publication supabase_realtime add table public.events;
alter publication supabase_realtime add table public.gallery_photos;

-- ---------- Bootstrap: make first user an admin ----------
-- Run AFTER you've signed up: replace the email and execute manually:
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'TOI@example.com');
