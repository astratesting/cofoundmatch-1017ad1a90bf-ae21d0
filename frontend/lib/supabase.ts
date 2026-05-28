import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FounderProfile = {
  id: string;
  name: string;
  headline: string;
  skills: string[];
  interests: string[];
  location: string;
  looking_for: string;
  verified: boolean;
};
