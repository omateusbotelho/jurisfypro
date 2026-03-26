import { type ClientFolder, type SdrNote } from "@/data/mockClients";
import {
  X, User, Calendar, MessageCircle, Phone, Globe, Instagram,
  Users, ClipboardList, ArrowRight, Heart, AlertTriangle, Smile,
  Zap, Shield, HelpCircle
} from "lucide-react";

const moodConfig: Record<string, { label: string; emoji: string; className: string; icon: typeof Heart }> = {
  ansioso: { label: "Ansioso(a)", emoji: "😟", className: "bg-warning/10 text-warning", icon: AlertTriangle },
  tranquilo: { label: "Tranquilo(a)", emoji: "😌", className: "bg-success/10 text-success", icon: Smile },
  urgente: { label: "Urgente", emoji: "🚨", className: "bg-destructive/10 text-destructive", icon: Zap },
  emotivo: { label: "Emotivo(a)", emoji: "🥺", className: "bg-primary/10 text-primary", icon: Heart },
  decidido: { label: "Decidido(a)", emoji: "💪", className: "bg-info/10 text-info", icon: Shield },
  inseguro: { label: "Inseguro(a)", emoji: "😔", className: "bg-muted text-muted-foreground", icon: HelpCircle },
};

const channelIcons: Record<string, typeof Phone> = {
  WhatsApp: MessageCircle,
  Telefone: Phone,
  Instagram: Instagram,
  Presencial: Users,
  Indicação: Heart,
};

interface FichaModalProps {
  client: ClientFolder;
  onClose: () => void;
}

export function FichaModal({ client, onClose }: FichaModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sidebar-bg to-sidebar-muted p-6 text-sidebar-fg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-sidebar-fg/10 transition-colors"
          >
            <X className="w-5 h-5 text-sidebar-fg/70" />
          </button>

          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-sidebar-primary" />
            </div>
            <div>
              <p className="text-xs text-sidebar-fg/50 uppercase tracking-wider font-medium">Ficha de Atendimento</p>
              <h2 className="text-xl font-display font-bold text-sidebar-fg">{client.clientName}</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-sidebar-fg/60">
            <span>CPF: {client.cpf}</span>
            <span>•</span>
            <span>{client.contractType}</span>
            <span>•</span>
            <span>Processo: {client.processNumber}</span>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 space-y-6">
          {(client.sdrNotes || []).map((note, idx) => (
            <SdrNoteCard key={idx} note={note} index={idx} total={(client.sdrNotes || []).length} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SdrNoteCard({ note, index, total }: { note: SdrNote; index: number; total: number }) {
  const mood = moodConfig[note.clientMood];
  const MoodIcon = mood.icon;
  const ChannelIcon = channelIcons[note.channel] || Globe;

  return (
    <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Atendimento header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            {note.sdrName}
            <span className="font-normal text-muted-foreground ml-1">
              — Atendimento {index + 1}{total > 1 ? ` de ${total}` : ""}
            </span>
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {new Date(note.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            <span className="flex items-center gap-1">
              <ChannelIcon className="w-3 h-3" />
              {note.channel}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-muted/50 rounded-xl p-4 mb-3">
        <p className="text-sm text-foreground leading-relaxed italic">"{note.summary}"</p>
      </div>

      {/* Notes */}
      <div className="space-y-1.5 mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Observações do SDR</p>
        {note.notes.map((n, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
            <span>{n}</span>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-primary mb-0.5">Próximos Passos</p>
          <p className="text-sm text-foreground">{note.nextSteps}</p>
        </div>
      </div>

      {/* Divider between notes */}
      {index < total - 1 && (
        <div className="border-t border-border mt-6" />
      )}
    </div>
  );
}
