-- =====================================================================
-- MCT2000 — Migration : ride_submissions (sorties passées)
-- Run in Supabase SQL Editor after schema.sql
-- =====================================================================

-- ---------- Member-submitted past outings ----------
create table if not exists public.ride_submissions (
  id           uuid primary key default gen_random_uuid(),
  submitted_by uuid not null references public.profiles(id) on delete cascade,
  title        text not null check (length(title) between 3 and 200),
  description  text check (description is null or length(description) <= 2000),
  ride_date    date not null,
  location     text,
  distance_km  integer check (distance_km is null or (distance_km > 0 and distance_km < 10000)),
  cover_image_url text,
  status       text default 'pending' check (status in ('pending','approved','rejected')),
  admin_note   text,
  reviewed_by  uuid references public.profiles(id) on delete set null,
  reviewed_at  timestamptz,
  created_at   timestamptz default now()
);

create index if not exists ride_submissions_status_date_idx
  on public.ride_submissions (status, ride_date desc);

-- View enriched with submitter pseudo
create or replace view public.ride_submissions_with_pseudo
with (security_invoker = true) as
  select rs.*, p.pseudo
  from public.ride_submissions rs
  join public.profiles p on p.id = rs.submitted_by;

-- ---------- Row Level Security ----------
alter table public.ride_submissions enable row level security;

-- Read: approved entries visible to everyone;
--       own submissions visible to submitter;
--       admins see everything.
drop policy if exists ride_submissions_select on public.ride_submissions;
create policy ride_submissions_select on public.ride_submissions
  for select using (
    status = 'approved'
    or auth.uid() = submitted_by
    or private.is_admin()
  );

-- Insert: any authenticated user may submit their own
drop policy if exists ride_submissions_insert on public.ride_submissions;
create policy ride_submissions_insert on public.ride_submissions
  for insert with check (auth.uid() = submitted_by);

-- Update: only admins can approve / reject
drop policy if exists ride_submissions_admin_update on public.ride_submissions;
create policy ride_submissions_admin_update on public.ride_submissions
  for update using (private.is_admin()) with check (private.is_admin());

-- Delete: submitter can retract own pending; admins can delete anything
drop policy if exists ride_submissions_delete on public.ride_submissions;
create policy ride_submissions_delete on public.ride_submissions
  for delete using (
    (auth.uid() = submitted_by and status = 'pending')
    or private.is_admin()
  );

-- ---------- Realtime ----------
alter publication supabase_realtime add table public.ride_submissions;
