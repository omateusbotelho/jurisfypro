import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ClientDetail } from "@/components/ClientDetail";
import { LoginPage } from "@/components/LoginPage";
import { useAuth } from "@/hooks/useAuth";
import { mockClients, type ClientFolder } from "@/data/mockClients";
import { fernandesClients } from "@/data/fernandesClients";
import { clyltonClients } from "@/data/clyltonClients";
import { FolderOpen, Loader2, Menu } from "lucide-react";

const FERNANDES_EMAIL = "fernandesrodriguesadv@gmail.com";
const CLYLTON_EMAIL = "clyltonsantos.adv@gmail.com";
const DEMO_EMAILS = ["joaoferretadv@gmail.com"];

const getInitialClients = (email: string | undefined): ClientFolder[] => {
  if (!email) return [];
  const e = email.toLowerCase();
  if (DEMO_EMAILS.includes(e)) return mockClients;
  if (e === FERNANDES_EMAIL) return fernandesClients;
  if (e === CLYLTON_EMAIL) return clyltonClients;
  return [];
};

const Index = () => {
  const { session, loading, signOut } = useAuth();
  const userEmail = session?.user?.email;
  const [clients, setClients] = useState<ClientFolder[]>(getInitialClients(userEmail));
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const data = getInitialClients(userEmail);
    setClients(data);
    setSelectedClientId((prev) =>
      prev && data.some((client) => client.id === prev) ? prev : null
    );
  }, [userEmail]);

  const selectedClient = clients.find((client) => client.id === selectedClientId) ?? null;

  // Fix 7: update page title on client change
  useEffect(() => {
    document.title = selectedClient ? `${selectedClient.clientName} — Jurisfy` : "Jurisfy";
  }, [selectedClient]);

  const updateClient = useCallback((updatedClient: ClientFolder) => {
    setClients((prev) =>
      prev.map((client) => (client.id === updatedClient.id ? updatedClient : client))
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sidebar-bg">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Fix 10: Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Fix 10: Sidebar — overlay on mobile, static on desktop */}
      <div className={mobileMenuOpen ? "fixed inset-y-0 left-0 z-50" : "hidden lg:block"}>
        <Sidebar
          clients={clients}
          selectedClient={selectedClient}
          onSelectClient={(client) => {
            setSelectedClientId(client.id);
            setMobileMenuOpen(false);
          }}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onSignOut={signOut}
          userEmail={session.user.email}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => {
            setSidebarCollapsed((v) => !v);
            setMobileMenuOpen(false);
          }}
        />
      </div>

      <main className="flex-1 min-w-0 overflow-y-auto p-4 lg:p-8">
        {/* Fix 10: Mobile header with hamburger */}
        <div className="lg:hidden flex items-center gap-3 mb-4 pb-3 border-b border-border">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
            title="Abrir menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <span className="text-sm font-medium text-muted-foreground truncate">
            {selectedClient ? selectedClient.clientName : "Jurisfy"}
          </span>
        </div>

        {selectedClient ? (
          /* Fix 9: key forces remount + fade-in on client change */
          <ClientDetail
            key={selectedClient.id}
            client={selectedClient}
            onUpdateClient={updateClient}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
          />
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Nenhum caso atribuído
            </h2>
            <p className="text-muted-foreground max-w-md">
              Ainda não há pastas vinculadas a este perfil. Entre em contato com a equipe João Ferret para receber seus primeiros casos.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <FolderOpen className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Sistema de Contratos
            </h2>
            <p className="text-muted-foreground max-w-md">
              Selecione um cliente na barra lateral para visualizar seus documentos, contratos e arquivos do processo previdenciário.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
