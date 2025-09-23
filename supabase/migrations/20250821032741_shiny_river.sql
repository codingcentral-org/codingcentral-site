/*
  # Create Coding Central Database Schema

  1. New Tables
    - `profiles` - User profiles with roles
    - `chapters` - University chapters
    - `events` - Events and competitions
    - `tutoring_requests` - Student tutoring requests
    - `progress` - Student course progress

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Secure user data access

  3. Indexes
    - Add performance indexes for common queries
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'tutor', 'chapter_lead', 'admin');
CREATE TYPE request_status AS ENUM ('pending', 'assigned', 'completed', 'cancelled');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role user_role NOT NULL DEFAULT 'student',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  school text NOT NULL,
  city text NOT NULL,
  chapter_lead_id uuid REFERENCES profiles(id),
  chapter_lead_name text NOT NULL,
  description text,
  member_count integer DEFAULT 0,
  status text DEFAULT 'active',
  founded date DEFAULT CURRENT_DATE,
  meeting_time text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text,
  max_participants integer,
  registered_count integer DEFAULT 0,
  event_type text DEFAULT 'workshop',
  chapter_id uuid REFERENCES chapters(id),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tutoring requests table
CREATE TABLE IF NOT EXISTS tutoring_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  student_name text NOT NULL,
  student_email text NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  status request_status DEFAULT 'pending',
  tutor_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Progress tracking table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  course_title text NOT NULL,
  completed boolean DEFAULT false,
  progress_percentage integer DEFAULT 0,
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutoring_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read public profile data"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Chapters policies
CREATE POLICY "Anyone can read chapters"
  ON chapters
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Chapter leads can update their chapter"
  ON chapters
  FOR UPDATE
  TO authenticated
  USING (chapter_lead_id = auth.uid());

-- Events policies
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Chapter leads and admins can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND (role IN ('chapter_lead', 'admin'))
    )
  );

-- Tutoring requests policies
CREATE POLICY "Users can read own tutoring requests"
  ON tutoring_requests
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid() OR tutor_id = auth.uid());

CREATE POLICY "Students can create tutoring requests"
  ON tutoring_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id = auth.uid() OR 
    student_id IS NULL
  );

CREATE POLICY "Tutors can update assigned requests"
  ON tutoring_requests
  FOR UPDATE
  TO authenticated
  USING (
    tutor_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('tutor', 'admin')
    )
  );

-- Progress policies
CREATE POLICY "Users can manage own progress"
  ON progress
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_chapters_status ON chapters(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_tutoring_requests_status ON tutoring_requests(status);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);

-- Insert sample data for development
INSERT INTO chapters (name, school, city, chapter_lead_name, description, member_count, status) VALUES
('MIT CodeCentral', 'Massachusetts Institute of Technology', 'Cambridge, MA', 'Sarah Chen', 'Our flagship chapter at MIT focuses on advanced algorithms and research projects.', 45, 'active'),
('Stanford Coding Hub', 'Stanford University', 'Palo Alto, CA', 'Marcus Rodriguez', 'Silicon Valley chapter specializing in startup projects and entrepreneurship.', 62, 'active'),
('Berkeley Bytes', 'UC Berkeley', 'Berkeley, CA', 'Emily Wang', 'Open source enthusiasts working on community impact projects.', 38, 'active');

INSERT INTO events (title, description, date, location, max_participants, registered_count, event_type) VALUES
('Spring Hackathon 2025', 'Join us for a 48-hour coding marathon! Build innovative projects, learn new technologies, and compete for amazing prizes. Open to all skill levels.', '2025-03-15 09:00:00', 'Virtual Event', 200, 157, 'hackathon'),
('Web Development Workshop', 'Learn the basics of HTML, CSS, and JavaScript in this hands-on workshop. Perfect for complete beginners who want to build their first website.', '2025-02-20 14:00:00', 'MIT Campus, Room 32-123', 50, 23, 'workshop'),
('Tech Career Panel', 'Hear from industry professionals about their journey into tech. Learn about different career paths, interview tips, and how to break into the industry.', '2025-02-28 18:00:00', 'Virtual Event', 500, 89, 'panel');