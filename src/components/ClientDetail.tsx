import { type ClientFolder, type ClientFile } from "@/data/mockClients";
import {
  FileText, Music, Image, File, FileSignature, Download, Eye, Calendar,
  Phone, Mail, MapPin, Hash, Scale, Clock, CheckCircle2, AlertCircle
} from "lucide-react";

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  audio: Music,
  photo: Image,
  doc: File,
  contract: FileSignature,
};

const fileColors: Record<string, string> = {
  pdf: "bg-destructive/10 text-destructive",
  audio: "bg-info/10 text-info",
  photo: "bg-success/10 text-success",
  doc: "bg-primary/10 text-primary",
  contract: "bg-warning/10 text-warning",
};

const fileTypeLabels: Record<string, string> = {
  pdf: "PDF",
  audio: "Áudio",
  photo: "Foto",
  doc: "Documento",
  contract: "Contrato Assinado",
};

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  em_andamento: { label: "Em Andamento", className: "bg-info/10 text-info", icon: Clock },
  concluido: { label: "Concluído", className: "bg-success/10 text-success", icon: CheckCircle2 },
  aguardando: { label: "Aguardando", className: "bg-warning/10 text-warning", icon: AlertCircle },
};

function FileCard({ file }: { file: ClientFile }) {
  const Icon = fileIcons[file.type] || FileText;
  const colorClass = fileColors[file.type] || "bg-muted text-muted-foreground";

  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all animate-fade-in">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground truncate">{file.description}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground">{file.size}</span>
          <span className="text-xs text-muted-foreground">{new Date(file.date).toLocaleDateString("pt-BR")}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${colorClass}`}>{fileTypeLabels[file.type]}</span>
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Visualizar">
          <Eye className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Download">
          <Download className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

interface ClientDetailProps {
  client: ClientFolder;
}

export function ClientDetail({ client }: ClientDetailProps) {
  const status = statusConfig[client.status];
  const StatusIcon = status.icon;

  const groupedFiles = {
    contract: client.files.filter((f) => f.type === "contract"),
    pdf: client.files.filter((f) => f.type === "pdf"),
    doc: client.files.filter((f) => f.type === "doc"),
    photo: client.files.filter((f) => f.type === "photo"),
    audio: client.files.filter((f) => f.type === "audio"),
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{client.clientName}</h1>
            <p className="text-muted-foreground mt-1">{client.contractType}</p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.className}`}>
            <StatusIcon className="w-4 h-4" />
            {status.label}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoItem icon={Hash} label="CPF" value={client.cpf} />
          <InfoItem icon={Phone} label="Telefone" value={client.phone} />
          <InfoItem icon={Mail} label="E-mail" value={client.email} />
          <InfoItem icon={MapPin} label="Endereço" value={client.address} />
          <InfoItem icon={Scale} label="Nº Processo" value={client.processNumber} />
          <InfoItem icon={Calendar} label="Data Contrato" value={new Date(client.createdAt).toLocaleDateString("pt-BR")} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {Object.entries(groupedFiles).map(([type, files]) => {
          const Icon = fileIcons[type];
          const colorClass = fileColors[type];
          return (
            <div key={type} className="bg-card rounded-xl border border-border p-4 text-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-foreground">{files.length}</p>
              <p className="text-xs text-muted-foreground">{fileTypeLabels[type]}</p>
            </div>
          );
        })}
      </div>

      {/* Files */}
      {Object.entries(groupedFiles).map(([type, files]) => {
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
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          </div>
        );
      })}
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
