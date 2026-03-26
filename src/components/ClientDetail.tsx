import { useState } from "react";
import { type ClientFolder, type ClientFile } from "@/data/mockClients";
import { FichaModal } from "./FichaModal";
import { UploadModal } from "./UploadModal";
import { useClientFiles, type UploadedFile } from "@/hooks/useClientFiles";
import {
  FileText, Music, Image, File, FileSignature, Download, Eye, Calendar, Play, Pause,
  Phone, Mail, MapPin, Hash, Scale, Clock, CheckCircle2, AlertCircle, Upload, Trash2,
  ExternalLink, Filter, X
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText, audio: Music, photo: Image, doc: File, contract: FileSignature,
};
const fileColors: Record<string, string> = {
  pdf: "bg-destructive/10 text-destructive", audio: "bg-info/10 text-info",
  photo: "bg-success/10 text-success", doc: "bg-primary/10 text-primary",
  contract: "bg-warning/10 text-warning",
};
const fileTypeLabels: Record<string, string> = {
  pdf: "PDF", audio: "Áudio", photo: "Foto", doc: "Documento", contract: "Contrato Assinado",
};
const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  em_andamento: { label: "Em Andamento", className: "bg-info/10 text-info", icon: Clock },
  concluido: { label: "Concluído", className: "bg-success/10 text-success", icon: CheckCircle2 },
  aguardando: { label: "Aguardando", className: "bg-warning/10 text-warning", icon: AlertCircle },
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function AudioPlayer({ file, onDelete }: { file: ClientFile; onDelete?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const src = file.audioSrc || "/audio/silent.wav";
  const [audioRef] = useState(() => {
    const audio = new Audio(src);
    audio.addEventListener("ended", () => { setIsPlaying(false); setProgress(0); setCurrentTime(0); });
    audio.addEventListener("timeupdate", () => { if (audio.duration) { setProgress((audio.currentTime / audio.duration) * 100); setCurrentTime(audio.currentTime); } });
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    return audio;
  });
  const togglePlay = () => { if (isPlaying) { audioRef.pause(); setIsPlaying(false); } else { audioRef.play(); setIsPlaying(true); } };
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => { const rect = e.currentTarget.getBoundingClientRect(); const pct = (e.clientX - rect.left) / rect.width; if (audioRef.duration) audioRef.currentTime = pct * audioRef.duration; };

  return (
    <div className={`group flex items-center gap-3 p-3 rounded-lg border bg-card transition-all animate-fade-in ${isPlaying ? "border-info/40 shadow-md shadow-info/10" : "border-border hover:shadow-md hover:border-primary/20"}`}>
      <button onClick={togglePlay} className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-pointer ${isPlaying ? "bg-info text-info-foreground scale-110 shadow-lg shadow-info/30 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" : "bg-info/10 text-info hover:bg-info/20 hover:scale-105"}`}>
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
        {isPlaying ? (
          <div className="space-y-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden cursor-pointer" onClick={handleSeek}>
                <div className="h-full bg-info rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex gap-[2px] items-end h-4">
                {[1,2,3,4,5].map((i) => (<div key={i} className="w-[3px] bg-info rounded-full" style={{ animation: `audioBar 0.8s ease-in-out ${i*0.1}s infinite alternate`, height: '40%' }} />))}
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground truncate">{file.description}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">{file.size}</span>
              <span className="text-xs text-muted-foreground">{new Date(file.date).toLocaleDateString("pt-BR")}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-info/10 text-info">{fileTypeLabels[file.type]}</span>
            </div>
          </>
        )}
      </div>
      {onDelete && (
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all" title="Excluir">
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      )}
    </div>
  );
}

function FileCard({ file, onDocClick, onDelete }: { file: ClientFile; onDocClick?: () => void; onDelete?: () => void }) {
  if (file.type === "audio") return <AudioPlayer file={file} onDelete={onDelete} />;
  const Icon = fileIcons[file.type] || FileText;
  const colorClass = fileColors[file.type] || "bg-muted text-muted-foreground";
  const isDoc = file.type === "doc";

  return (
    <div className={`group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all animate-fade-in ${isDoc ? "cursor-pointer" : ""}`} onClick={isDoc ? onDocClick : undefined}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}><Icon className="w-5 h-5" /></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {file.name}
          {isDoc && <span className="ml-2 text-xs text-primary font-medium">Clique para visualizar</span>}
        </p>
        <p className="text-xs text-muted-foreground truncate">{file.description}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground">{file.size}</span>
          <span className="text-xs text-muted-foreground">{new Date(file.date).toLocaleDateString("pt-BR")}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${colorClass}`}>{fileTypeLabels[file.type]}</span>
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Visualizar"><Eye className="w-4 h-4 text-muted-foreground" /></button>
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Download"><Download className="w-4 h-4 text-muted-foreground" /></button>
        {onDelete && (
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Excluir">
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>
        )}
      </div>
    </div>
  );
}

function UploadedFileCard({ file, onDelete }: { file: UploadedFile; onDelete: () => void }) {
  const Icon = fileIcons[file.file_type] || FileText;
  const colorClass = fileColors[file.file_type] || "bg-muted text-muted-foreground";
  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5 hover:shadow-md transition-all animate-fade-in">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}><Icon className="w-5 h-5" /></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {file.file_name}
          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Enviado</span>
        </p>
        <p className="text-xs text-muted-foreground truncate">{file.description || "Sem descrição"}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</span>
          <span className="text-xs text-muted-foreground">{new Date(file.created_at).toLocaleDateString("pt-BR")}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${colorClass}`}>{fileTypeLabels[file.file_type] || file.file_type}</span>
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {file.url && (
          <a href={file.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Abrir">
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        )}
        <button onClick={onDelete} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Excluir">
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}

interface ClientDetailProps {
  client: ClientFolder;
  onUpdateClient: (client: ClientFolder) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
}

export function ClientDetail({ client, onUpdateClient, typeFilter, onTypeFilterChange }: ClientDetailProps) {
  const [showFicha, setShowFicha] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const { files: uploadedFiles, uploading, uploadFile, deleteFile } = useClientFiles(client.id);
  const status = statusConfig[client.status];
  const StatusIcon = status.icon;

  const handleDeleteMockFile = (fileId: string) => {
    const updated = { ...client, files: client.files.filter((f) => f.id !== fileId) };
    onUpdateClient(updated);
    toast({ title: "Arquivo removido", description: "O arquivo foi excluído com sucesso." });
  };

  const handleStatusChange = (newStatus: string) => {
    const updated = { ...client, status: newStatus as ClientFolder["status"] };
    onUpdateClient(updated);
    toast({ title: "Status atualizado", description: `Cliente marcado como "${statusConfig[newStatus].label}".` });
  };

  const allTypes = ["all", "contract", "pdf", "doc", "photo", "audio"];
  const typeLabelsWithAll: Record<string, string> = { all: "Todos", ...fileTypeLabels };

  const groupedFiles: Record<string, ClientFile[]> = {
    contract: client.files.filter((f) => f.type === "contract"),
    pdf: client.files.filter((f) => f.type === "pdf"),
    doc: client.files.filter((f) => f.type === "doc"),
    photo: client.files.filter((f) => f.type === "photo"),
    audio: client.files.filter((f) => f.type === "audio"),
  };

  const groupedUploaded: Record<string, UploadedFile[]> = {};
  uploadedFiles.forEach((f) => {
    if (!groupedUploaded[f.file_type]) groupedUploaded[f.file_type] = [];
    groupedUploaded[f.file_type].push(f);
  });

  const totalUploaded = uploadedFiles.length;

  // Apply type filter
  const visibleTypes = typeFilter === "all" ? Object.keys(groupedFiles) : [typeFilter];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{client.clientName}</h1>
            <p className="text-muted-foreground mt-1">{client.contractType}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              <Upload className="w-4 h-4" /> Enviar Arquivo
            </button>
            {/* Status dropdown */}
            <div className="relative group/status">
              <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${status.className}`}>
                <StatusIcon className="w-4 h-4" />
                {status.label}
              </button>
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-10 min-w-[180px]">
                {Object.entries(statusConfig).map(([key, cfg]) => {
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleStatusChange(key)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        client.status === key ? "font-semibold" : ""
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${cfg.className.split(" ")[1]}`} />
                      {cfg.label}
                      {client.status === key && <CheckCircle2 className="w-3 h-3 ml-auto text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoItem icon={Hash} label="CPF" value={client.cpf} />
          <InfoItem icon={Phone} label="Telefone" value={client.phone} />
          <InfoItem icon={Mail} label="E-mail" value={client.email} />
          <InfoItem icon={MapPin} label="Endereço" value={client.address} />
          
          <InfoItem icon={Calendar} label="Data Contrato" value={new Date(client.createdAt).toLocaleDateString("pt-BR")} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {Object.entries(groupedFiles).map(([type, files]) => {
          const Icon = fileIcons[type];
          const colorClass = fileColors[type];
          const uploadedCount = groupedUploaded[type]?.length || 0;
          const isActive = typeFilter === type;
          return (
            <button
              key={type}
              onClick={() => onTypeFilterChange(isActive ? "all" : type)}
              className={`bg-card rounded-xl border p-4 text-center transition-all ${
                isActive ? "border-primary shadow-md" : "border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-foreground">{files.length + uploadedCount}</p>
              <p className="text-xs text-muted-foreground">{fileTypeLabels[type]}</p>
              {uploadedCount > 0 && <p className="text-[10px] text-primary mt-0.5">+{uploadedCount} enviados</p>}
            </button>
          );
        })}
      </div>

      {/* Active filter indicator */}
      {typeFilter !== "all" && (
        <div className="flex items-center gap-2 mb-4 px-1">
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm text-muted-foreground">Filtrando por:</span>
          <span className="text-sm font-medium text-primary">{fileTypeLabels[typeFilter]}</span>
          <button onClick={() => onTypeFilterChange("all")} className="ml-1 p-0.5 rounded hover:bg-muted transition-colors">
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Uploaded Files Section */}
      {totalUploaded > 0 && (typeFilter === "all" || groupedUploaded[typeFilter]?.length) && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Arquivos Enviados ({typeFilter === "all" ? totalUploaded : (groupedUploaded[typeFilter]?.length || 0)})
            </h3>
          </div>
          <div className="space-y-2">
            {(typeFilter === "all" ? uploadedFiles : (groupedUploaded[typeFilter] || [])).map((file) => (
              <UploadedFileCard key={file.id} file={file} onDelete={() => deleteFile(file.id, file.file_path)} />
            ))}
          </div>
        </div>
      )}

      {/* Mock Files */}
      {visibleTypes.map((type) => {
        const files = groupedFiles[type] || [];
        if (files.length === 0) return null;
        const Icon = fileIcons[type];
        return (
          <div key={type} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {fileTypeLabels[type]}s ({files.length})
              </h3>
            </div>
            <div className="space-y-2">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onDocClick={() => setShowFicha(true)}
                  onDelete={() => handleDeleteMockFile(file.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Modals */}
      {showFicha && <FichaModal client={client} onClose={() => setShowFicha(false)} />}
      {showUpload && <UploadModal onUpload={uploadFile} onClose={() => setShowUpload(false)} uploading={uploading} />}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Hash; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary/60 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}
