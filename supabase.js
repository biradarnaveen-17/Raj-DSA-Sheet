import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL = "https://pjxlewpfmjwuwsoprrql.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeGxld3BmbWp3dXdzb3BycnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjA4MzEsImV4cCI6MjA4NjAzNjgzMX0.LSOsWLs34Ki_tUPp7UPYX_PHGFiaIzEyUTDBedzzjNU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
