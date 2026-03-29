-- Create storage buckets for form submissions
-- Run this migration to create the new storage buckets

-- Create submissions-pdf bucket for PDF files (Form 41, 44)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'submissions-pdf',
  'submissions-pdf',
  true,
  52428800,  -- 50MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Create submissions-docx bucket for DOCX files (Form 42, 43)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'submissions-docx',
  'submissions-docx',
  true,
  52428800,  -- 50MB
  ARRAY['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Grant storage permissions
GRANT ALL ON storage.objects TO "anon";
GRANT ALL ON storage.objects TO "authenticated";
GRANT ALL ON storage.objects TO "service_role";
