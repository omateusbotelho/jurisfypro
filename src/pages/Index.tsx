import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ClientDetail } from "@/components/ClientDetail";
import { LoginPage } from "@/components/LoginPage";
import { useAuth } from "@/hooks/useAuth";
import { mockClients, type ClientFolder } from "@/data/mockClients";
import { fernandesClients } from "@/data/fernandesClients";
import { clyltonClients } from "@/data/clyltonClients";
import { FolderOpen, Loader2 } from "lucide-react";

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

  useEffect(() => {
    const data = getInitialClients(userEmail);
    setClients(data);
    setSelectedClientId((prev) =>
      prev && data.some((client) => client.id === prev) ? prev : null
    );
  }, [userEmail]);

  const selectedClient = clients.find((client) => client.id === selectedClientId) ?? null;

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
      <Sidebar
        clients={clients}
        selectedClient={selectedClient}
        onSelectClient={(client) => setSelectedClientId(client.id)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onSignOut={signOut}
        userEmail={session.user.email}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        {selectedClient ? (
          <ClientDetail
            client={selectedClient}
            onUpdateClient={updateClient}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
          />
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
