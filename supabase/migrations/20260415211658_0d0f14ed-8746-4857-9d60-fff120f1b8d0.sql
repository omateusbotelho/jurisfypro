
-- Add UPDATE policy for storage
CREATE POLICY "Users can update own files in client-files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'client-files' AND (storage.foldername(name))[1] = (auth.uid())::text);

-- Add DELETE policy for storage
CREATE POLICY "Users can delete own files in client-files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'client-files' AND (storage.foldername(name))[1] = (auth.uid())::text);
