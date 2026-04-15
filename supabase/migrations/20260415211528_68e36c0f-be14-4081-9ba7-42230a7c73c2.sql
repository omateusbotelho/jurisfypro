
-- Fix client_files SELECT policy: restrict to own files only
DROP POLICY IF EXISTS "Users can view all client files" ON public.client_files;
CREATE POLICY "Users can view own client files"
  ON public.client_files
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Fix storage SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view" ON storage.objects;
CREATE POLICY "Users can view own files in client-files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'client-files' AND (storage.foldername(name))[1] = (auth.uid())::text);

-- Fix storage INSERT policy
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
CREATE POLICY "Users can upload to own folder in client-files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'client-files' AND (storage.foldername(name))[1] = (auth.uid())::text);
