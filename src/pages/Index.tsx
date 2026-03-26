import { useState, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ClientDetail } from "@/components/ClientDetail";
import { LoginPage } from "@/components/LoginPage";
import { useAuth } from "@/hooks/useAuth";
import { mockClients, type ClientFolder } from "@/data/mockClients";
import { FolderOpen, Loader2 } from "lucide-react";

const Index = () => {
  const { session, loading, signOut } = useAuth();
  const [clients, setClients] = useState<ClientFolder[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<ClientFolder | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const updateClient = useCallback((updatedClient: ClientFolder) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setSelectedClient((prev) =>
      prev?.id === updatedClient.id ? updatedClient : prev
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
        onSelectClient={setSelectedClient}
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
