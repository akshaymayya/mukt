import { createClient } from '@supabase/supabase-js';

// Hardcoding the keys since they are public (anon) anyway. 
// This bypasses any Vercel environment variable configuration issues.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://msaudnelvdmhhayzhaec.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_4ufk8UGXdkVxO2SoPJVMww_tFUJAgnN';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
