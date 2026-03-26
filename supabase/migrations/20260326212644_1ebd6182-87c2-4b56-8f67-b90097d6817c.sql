
-- Create storage bucket for client files
INSERT INTO storage.buckets (id, name, public) VALUES ('client-files', 'client-files', false);

-- Create table to track uploaded files
CREATE TABLE public.client_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id text NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL CHECK (file_type IN ('pdf', 'audio', 'photo', 'doc', 'contract')),
  file_size bigint NOT NULL DEFAULT 0,
  file_path text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.client_files ENABLE ROW LEVEL SECURITY;

-- RLS: authenticated users can manage their own files
CREATE POLICY "Users can view all client files" ON public.client_files
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert client files" ON public.client_files
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own client files" ON public.client_files
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Storage policies
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'client-files');

CREATE POLICY "Authenticated users can view" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'client-files');

CREATE POLICY "Authenticated users can delete own" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'client-files' AND (storage.foldername(name))[1] = auth.uid()::text);
