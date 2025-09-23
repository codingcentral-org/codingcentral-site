import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable auth persistence for production
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Check if we're using placeholder values
export const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key';

export type UserRole = 'student' | 'tutor' | 'chapter_lead' | 'admin';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  name: string;
  school: string;
  city: string;
  chapter_lead_id: string;
  chapter_lead_name: string;
  description?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  max_participants?: number;
  created_at: string;
}

export interface TutoringRequest {
  id: string;
  student_id: string;
  student_name: string;
  student_email: string;
  subject: string;
  description: string;
  status: 'pending' | 'assigned' | 'completed';
  tutor_id?: string;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  course_id: string;
  completed: boolean;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface VolunteerApplication {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  university?: string;
  major?: string;
  graduation_year?: string;
  programming_languages?: string;
  availability?: string;
  motivation?: string;
  experience?: string;
  interests?: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}