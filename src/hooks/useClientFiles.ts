import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface UploadedFile {
  id: string;
  client_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  description: string;
  created_at: string;
  url?: string;
}

export function useClientFiles(clientId: string) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = useCallback(async () => {
    const { data, error } = await supabase
      .from("client_files")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
      return;
    }

    // Get signed URLs for each file
    const filesWithUrls = await Promise.all(
      (data || []).map(async (file: any) => {
        const { data: urlData } = await supabase.storage
          .from("client-files")
          .createSignedUrl(file.file_path, 3600);
        return { ...file, url: urlData?.signedUrl || "" };
      })
    );

    setFiles(filesWithUrls);
    setLoading(false);
  }, [clientId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadFile = async (
    file: File,
    fileType: string,
    description: string
  ) => {
    setUploading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Não autenticado");

      const userId = userData.user.id;
      const filePath = `${userId}/${clientId}/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("client-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("client_files").insert({
        user_id: userId,
        client_id: clientId,
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
        file_path: filePath,
        description,
      });

      if (dbError) throw dbError;

      toast({
        title: "Arquivo enviado!",
        description: `${file.name} foi adicionado com sucesso.`,
      });

      await fetchFiles();
    } catch (err: any) {
      console.error("Upload error:", err);
      toast({
        title: "Erro no upload",
        description: err.message || "Não foi possível enviar o arquivo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileId: string, filePath: string) => {
    try {
      await supabase.storage.from("client-files").remove([filePath]);
      await supabase.from("client_files").delete().eq("id", fileId);
      toast({ title: "Arquivo removido", description: "O arquivo foi excluído com sucesso." });
      await fetchFiles();
    } catch (err: any) {
      toast({ title: "Erro", description: "Não foi possível remover o arquivo.", variant: "destructive" });
    }
  };

  return { files, loading, uploading, uploadFile, deleteFile, refetch: fetchFiles };
}
