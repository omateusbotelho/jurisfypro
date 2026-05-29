import { useEffect } from "react";
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { type ClientFile } from "@/data/mockClients";

interface FilePreviewModalProps {
  file: ClientFile;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function FilePreviewModal({ file, onClose, onPrev, onNext }: FilePreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const isImage = file.type === "photo";
  const isPdf = file.type === "pdf" || file.type === "contract";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in" />

      <div
        className="relative bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">{file.name}</h3>
            <p className="text-xs text-muted-foreground">{file.description}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {file.fileSrc && (
              <a
                href={file.fileSrc}
                download={file.name}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4 text-muted-foreground" />
              </a>
            )}
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-muted/30 min-h-[400px] relative">
          {onPrev && (
            <button onClick={onPrev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 border border-border shadow hover:bg-card transition-colors z-10">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}

          {isImage && file.fileSrc && (
            <img
              src={file.fileSrc}
              alt={file.name}
              className="max-w-full max-h-[75vh] object-contain p-4"
            />
          )}

          {isPdf && file.fileSrc && (
            <iframe
              src={file.fileSrc}
              className="w-full h-[75vh]"
              title={file.name}
            />
          )}

          {!file.fileSrc && (
            <div className="text-center p-8">
              <p className="text-muted-foreground text-sm">Pré-visualização não disponível para este arquivo.</p>
            </div>
          )}

          {onNext && (
            <button onClick={onNext} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 border border-border shadow hover:bg-card transition-colors z-10">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
