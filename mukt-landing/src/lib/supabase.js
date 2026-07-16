import { createClient } from '@supabase/supabase-js';

// Hardcoding the keys since they are public (anon) anyway. 
// This bypasses any Vercel environment variable configuration issues.
const supabaseUrl = (typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL) : null) || 'https://msaudnelvdmhhayzhaec.supabase.co';
const supabaseAnonKey = (typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY) : null) || 'sb_publishable_4ufk8UGXdkVxO2SoPJVMww_tFUJAgnN';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
