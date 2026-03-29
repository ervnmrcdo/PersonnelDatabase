-- Create drafts storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('drafts-pdf', 'drafts-pdf', false),
  ('drafts-docx', 'drafts-docx', false);

-- Create draft applications table
CREATE TABLE IF NOT EXISTS draft_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  publication_id INTEGER REFERENCES publications(publication_id),
  award_id INTEGER REFERENCES awards(award_id),
  form41_path VARCHAR(500),
  form42_path VARCHAR(500),
  form43_path VARCHAR(500),
  form44_path VARCHAR(500),
  status VARCHAR(20) DEFAULT 'in_progress',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, publication_id, award_id)
);

-- Enable RLS
ALTER TABLE draft_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own drafts" ON draft_applications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own drafts" ON draft_applications
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own drafts" ON draft_applications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own drafts" ON draft_applications
  FOR DELETE USING (user_id = auth.uid());

-- Storage policies for drafts-pdf bucket
CREATE POLICY "Users can upload own draft PDFs" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'drafts-pdf' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own draft PDFs" ON storage.objects
  FOR UPDATE USING (bucket_id = 'drafts-pdf' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own draft PDFs" ON storage.objects
  FOR DELETE USING (bucket_id = 'drafts-pdf' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for drafts-docx bucket
CREATE POLICY "Users can upload own draft DOCXs" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'drafts-docx' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own draft DOCXs" ON storage.objects
  FOR UPDATE USING (bucket_id = 'drafts-docx' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own draft DOCXs" ON storage.objects
  FOR DELETE USING (bucket_id = 'drafts-docx' AND auth.uid()::text = (storage.foldername(name))[1]);
