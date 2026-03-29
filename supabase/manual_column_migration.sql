-- ============================================
-- SQL SCRIPT TO RUN MANUALLY ON YOUR DATABASE
-- Run this in Supabase SQL Editor or via CLI
-- ============================================

-- Add form path columns to submissions table
ALTER TABLE public.submissions 
ADD COLUMN IF NOT EXISTS form41_path character varying(500),
ADD COLUMN IF NOT EXISTS form42_path character varying(500),
ADD COLUMN IF NOT EXISTS form43_path character varying(500),
ADD COLUMN IF NOT EXISTS form44_path character varying(500);

-- Verify the columns were added
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'submissions' 
AND column_name IN ('form41_path', 'form42_path', 'form43_path', 'form44_path');
