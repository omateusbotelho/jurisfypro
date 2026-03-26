import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ClientDetail } from "@/components/ClientDetail";
import { type ClientFolder } from "@/data/mockClients";
import { FolderOpen } from "lucide-react";

const Index = () => {
  const [selectedClient, setSelectedClient] = useState<ClientFolder | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedClient={selectedClient}
        onSelectClient={setSelectedClient}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        {selectedClient ? (
          <ClientDetail client={selectedClient} />
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
