import logo from "@/assets/logo-joao-ferret.png";
import { type ClientFolder } from "@/data/mockClients";
import { Folder, Users, FileText, Search, ChevronRight, LogOut, Filter } from "lucide-react";

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
  clients,
  selectedClient,
  onSelectClient,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSignOut,
  userEmail,
}: SidebarProps) {
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contractType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <aside className="w-72 min-h-screen flex flex-col bg-sidebar-bg border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <img src={logo} alt="João Ferret" className="h-8 object-contain" />
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

        {/* Status Filter */}
        <div className="flex items-center gap-1">
          <Filter className="w-3 h-3 text-sidebar-fg/40 mr-1" />
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
          <p className="text-center text-sidebar-fg/40 text-xs py-8">Nenhum cliente encontrado</p>
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
