import logoJurisfy from "@/assets/logo-jurisfy.png";
import { type ClientFolder } from "@/data/mockClients";
import { Folder, Users, FileText, Search, ChevronRight, ChevronLeft, LogOut, Filter } from "lucide-react";

interface SidebarProps {
  clients: ClientFolder[];
  selectedClient: ClientFolder | null;
  onSelectClient: (client: ClientFolder) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onSignOut?: () => void;
  userEmail?: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const statusLabels: Record<string, string> = {
  all: "Todos",
  em_andamento: "Em Andamento",
  concluido: "Concluído",
  aguardando: "Aguardando",
};

const statusDot: Record<string, string> = {
  em_andamento: "bg-info",
  concluido: "bg-success",
  aguardando: "bg-warning",
};

export function Sidebar({
  clients, selectedClient, onSelectClient,
  searchTerm, onSearchChange,
  statusFilter, onStatusFilterChange,
  onSignOut, userEmail,
  collapsed, onToggleCollapse,
}: SidebarProps) {
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contractType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts: Record<string, number> = {
    all: clients.length,
    em_andamento: clients.filter(c => c.status === "em_andamento").length,
    concluido: clients.filter(c => c.status === "concluido").length,
    aguardando: clients.filter(c => c.status === "aguardando").length,
  };

  if (collapsed) {
    return (
      <aside className="w-16 min-h-screen flex flex-col bg-sidebar-bg border-r border-sidebar-border flex-shrink-0">
        <div className="p-3 border-b border-sidebar-border flex flex-col items-center gap-2 pt-4">
          <img src={logoJurisfy} alt="Jurisfy" className="w-8 h-8 object-contain" width={64} height={64} />
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg hover:bg-sidebar-muted transition-colors"
            title="Expandir barra lateral"
          >
            <ChevronRight className="w-4 h-4 text-sidebar-fg/50" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 flex flex-col items-center gap-1">
          {filteredClients.map((client) => (
            <button
              key={client.id}
              onClick={() => onSelectClient(client)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center relative transition-all ${
                selectedClient?.id === client.id
                  ? "bg-sidebar-primary/15"
                  : "hover:bg-sidebar-muted"
              }`}
              title={client.clientName}
            >
              <Folder className={`w-5 h-5 ${selectedClient?.id === client.id ? "text-sidebar-primary" : "text-sidebar-fg/50"}`} />
              <div className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${statusDot[client.status] || "bg-muted"}`} />
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-sidebar-border flex flex-col items-center gap-2">
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-fg/70 hover:text-destructive hover:bg-destructive/10 transition-all"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 min-h-screen flex flex-col bg-sidebar-bg border-r border-sidebar-border flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoJurisfy} alt="Jurisfy" className="w-8 h-8 object-contain" width={64} height={64} />
            <span className="font-display font-bold text-lg text-sidebar-fg tracking-tight">Jurisfy</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg hover:bg-sidebar-muted transition-colors"
            title="Recolher barra lateral"
          >
            <ChevronLeft className="w-4 h-4 text-sidebar-fg/50" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-fg/50" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-sidebar-muted text-sidebar-fg text-sm placeholder:text-sidebar-fg/40 border-0 outline-none focus:ring-2 focus:ring-sidebar-primary/50 transition-all"
          />
        </div>

        {/* Status Filter with counts */}
        <div className="flex items-center gap-1 flex-wrap">
          <Filter className="w-3 h-3 text-sidebar-fg/40 mr-1 flex-shrink-0" />
          {Object.entries(statusLabels).map(([value, label]) => (
            <button
              key={value}
              onClick={() => onStatusFilterChange(value)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                statusFilter === value
                  ? "bg-sidebar-primary/20 text-sidebar-primary"
                  : "text-sidebar-fg/50 hover:text-sidebar-fg/80 hover:bg-sidebar-muted"
              }`}
            >
              {label}
              {statusCounts[value] > 0 && (
                <span className="ml-1 opacity-70">({statusCounts[value]})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 mb-2">
        <div className="flex items-center gap-2 px-3 py-2 text-sidebar-fg/60 text-xs font-semibold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          Clientes ({filteredClients.length})
        </div>
      </nav>

      {/* Client List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {filteredClients.map((client) => (
          <button
            key={client.id}
            onClick={() => onSelectClient(client)}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group ${
              selectedClient?.id === client.id
                ? "bg-sidebar-primary/15 text-sidebar-primary"
                : "text-sidebar-fg hover:bg-sidebar-muted"
            }`}
          >
            <div className="flex items-center gap-2">
              <Folder className={`w-4 h-4 flex-shrink-0 ${
                selectedClient?.id === client.id ? "text-sidebar-primary" : "text-sidebar-fg/50"
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium truncate">{client.clientName}</p>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[client.status] || "bg-muted"}`} />
                </div>
                <p className="text-xs opacity-60 truncate">{client.contractType}</p>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity ${
                selectedClient?.id === client.id ? "opacity-60" : ""
              }`} />
            </div>
          </button>
        ))}

        {filteredClients.length === 0 && (
          <p className="text-center text-sidebar-fg/40 text-xs py-8 px-2 leading-relaxed">
            {clients.length === 0
              ? "Nenhum caso atribuído a este perfil ainda."
              : "Nenhum cliente encontrado."}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-3">
        {userEmail && (
          <p className="px-3 text-sidebar-fg/50 text-xs truncate">{userEmail}</p>
        )}
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-fg/70 hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        )}
        <div className="flex items-center justify-center px-3">
          <span className="text-sidebar-fg/30 text-[10px] flex items-center gap-1.5">
            <FileText className="w-3 h-3" />
            Sistema v1.0
          </span>
        </div>
      </div>
    </aside>
  );
}
