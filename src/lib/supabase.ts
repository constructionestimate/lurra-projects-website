import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://wnjabuuiufvrupziovbu.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_f9KbQnsrErpLFH2_htft3w_XdSa9PoN";

export function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}