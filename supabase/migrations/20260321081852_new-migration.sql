-- Create the 'comments' table if it doesn't exist
CREATE TABLE IF NOT EXISTS comments (
    id uuid default gen_random_uuid() primary key,
    slug text,
    name text,
    email text,
    comment text,
    is_approved boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- If you manually created the table in the UI, this ensures the missing columns are added!
ALTER TABLE comments ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS comment text;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS is_approved boolean default false;

-- Enable Row Level Security (RLS) security on the table
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies with the same name if you already pushed once
DROP POLICY IF EXISTS "Allow public insert" ON comments;
DROP POLICY IF EXISTS "Allow public read approved comments" ON comments;

-- Allow anyone to submit a new comment
CREATE POLICY "Allow public insert" ON comments
FOR INSERT TO public WITH CHECK (true);

-- Allow anyone to read ONLY approved comments
CREATE POLICY "Allow public read approved comments" ON comments
FOR SELECT TO public USING (is_approved = true);
