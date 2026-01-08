import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Memory {
  id: string;
  user_id: string;
  location: string;
  photos: string[];
  preview_url: string | null;
  final_url: string | null;
  watermarked_url: string | null;
  created_at: string;
  payment_status: 'pending' | 'paid';
  payment_amount: number;
  email?: string;
}
