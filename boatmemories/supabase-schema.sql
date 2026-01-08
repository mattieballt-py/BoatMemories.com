-- BoatMemories.com - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Create memories table
CREATE TABLE IF NOT EXISTS memories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  location TEXT NOT NULL,
  photos TEXT[] NOT NULL,
  preview_url TEXT,
  watermarked_url TEXT,
  final_url TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  payment_amount INTEGER DEFAULT 0,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_memories_user_id ON memories(user_id);
CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_payment_status ON memories(payment_status);

-- Enable Row Level Security
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own memories" ON memories;
DROP POLICY IF EXISTS "Users can insert their own memories" ON memories;
DROP POLICY IF EXISTS "Users can update their own memories" ON memories;

-- Create policies
CREATE POLICY "Users can view their own memories"
  ON memories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memories"
  ON memories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memories"
  ON memories FOR UPDATE
  USING (auth.uid() = user_id);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('yacht-photos', 'yacht-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Anyone can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view photos" ON storage.objects;

-- Storage policies
CREATE POLICY "Anyone can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'yacht-photos');

CREATE POLICY "Anyone can view photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'yacht-photos');

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_memories_updated_at ON memories;
CREATE TRIGGER update_memories_updated_at
  BEFORE UPDATE ON memories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for memory statistics
CREATE OR REPLACE VIEW memory_stats AS
SELECT
  payment_status,
  COUNT(*) as count,
  SUM(payment_amount) as total_revenue,
  AVG(payment_amount) as avg_price
FROM memories
GROUP BY payment_status;

COMMENT ON TABLE memories IS 'Stores user yacht memories and AI-generated artwork';
COMMENT ON COLUMN memories.location IS 'Charter location (e.g., Monaco, Bahamas)';
COMMENT ON COLUMN memories.photos IS 'Array of uploaded photo URLs';
COMMENT ON COLUMN memories.preview_url IS 'Original AI-generated image URL';
COMMENT ON COLUMN memories.watermarked_url IS 'Watermarked preview URL';
COMMENT ON COLUMN memories.final_url IS 'High-resolution unwatermarked URL (after payment)';
COMMENT ON COLUMN memories.payment_status IS 'pending or paid';
COMMENT ON COLUMN memories.payment_amount IS 'Amount paid in dollars (39 or 79)';
