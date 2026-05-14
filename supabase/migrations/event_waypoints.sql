-- =====================================================================
-- MCT2000 — Migration : event_waypoints
-- Adds itinerary polyline to events (admin-editable)
-- Run in Supabase SQL Editor
-- =====================================================================

-- Add waypoints column to events (JSON array of [lat,lon] pairs)
alter table public.events
  add column if not exists waypoints jsonb default null;

-- Comment for documentation
comment on column public.events.waypoints is
  'Itinerary waypoints as [[lat,lon],...] JSON array. Used to draw route polyline on map.';

-- Admin can update any event (already covered by events_admin_write policy)
-- No new RLS policy needed.
