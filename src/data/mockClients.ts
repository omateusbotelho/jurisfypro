export interface ClientFile {
  id: string;
  name: string;
  type: 'pdf' | 'audio' | 'photo' | 'doc' | 'contract';
  size: string;
  date: string;
  description: string;
}

export interface ClientFolder {
  id: string;
  clientName: string;
  cpf: string;
  contractType: string;
  status: 'em_andamento' | 'concluido' | 'aguardando';
  createdAt: string;
  phone: string;
  email: string;
  address: string;
  benefitType: string;
  processNumber: string;
  files: ClientFile[];
}

export const mockClients: ClientFolder[] = [
  {
    id: "1",
    clientName: "Maria da Silva Santos",
    cpf: "123.456.789-00",
    contractType: "Aposentadoria por Idade",
    status: "em_andamento",
    createdAt: "2024-03-15",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    address: "Rua das Flores, 123 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade",
    processNumber: "0001234-56.2024.8.26.0100",
    files: [
      { id: "f1", name: "Contrato de Honorários.pdf", type: "pdf", size: "245 KB", date: "2024-03-15", description: "Contrato de prestação de serviços advocatícios" },
      { id: "f2", name: "Contrato Assinado.pdf", type: "contract", size: "312 KB", date: "2024-03-15", description: "Contrato assinado digitalmente pela cliente" },
      { id: "f3", name: "Gravação Atendimento.mp3", type: "audio", size: "4.2 MB", date: "2024-03-15", description: "Áudio da reunião inicial com a cliente" },
      { id: "f4", name: "RG - Frente.jpg", type: "photo", size: "1.1 MB", date: "2024-03-16", description: "Documento de identidade - frente" },
      { id: "f5", name: "RG - Verso.jpg", type: "photo", size: "980 KB", date: "2024-03-16", description: "Documento de identidade - verso" },
      { id: "f6", name: "CTPS - Página 1.jpg", type: "photo", size: "1.3 MB", date: "2024-03-16", description: "Carteira de trabalho" },
      { id: "f7", name: "Ficha do Cliente.docx", type: "doc", size: "89 KB", date: "2024-03-15", description: "Informações cadastrais completas da cliente" },
      { id: "f8", name: "Procuração.pdf", type: "pdf", size: "156 KB", date: "2024-03-17", description: "Procuração ad judicia" },
    ],
  },
  {
    id: "2",
    clientName: "José Carlos Oliveira",
    cpf: "987.654.321-00",
    contractType: "Aposentadoria por Tempo de Contribuição",
    status: "concluido",
    createdAt: "2024-01-10",
    phone: "(11) 91234-5678",
    email: "jose.oliveira@email.com",
    address: "Av. Paulista, 456 - São Paulo/SP",
    benefitType: "Aposentadoria por Tempo de Contribuição",
    processNumber: "0005678-90.2024.8.26.0100",
    files: [
      { id: "f9", name: "Contrato de Honorários.pdf", type: "pdf", size: "245 KB", date: "2024-01-10", description: "Contrato de prestação de serviços" },
      { id: "f10", name: "Contrato Assinado.pdf", type: "contract", size: "298 KB", date: "2024-01-10", description: "Contrato assinado pelo cliente" },
      { id: "f11", name: "Gravação Consulta.mp3", type: "audio", size: "3.8 MB", date: "2024-01-10", description: "Áudio da consulta inicial" },
      { id: "f12", name: "CPF.jpg", type: "photo", size: "650 KB", date: "2024-01-11", description: "Cópia do CPF" },
      { id: "f13", name: "Ficha do Cliente.docx", type: "doc", size: "92 KB", date: "2024-01-10", description: "Dados cadastrais do cliente" },
      { id: "f14", name: "Sentença Favorável.pdf", type: "pdf", size: "1.2 MB", date: "2024-06-20", description: "Sentença do processo - deferido" },
    ],
  },
  {
    id: "3",
    clientName: "Ana Paula Ferreira",
    cpf: "456.789.123-00",
    contractType: "BPC/LOAS",
    status: "aguardando",
    createdAt: "2024-05-20",
    phone: "(11) 95555-1234",
    email: "ana.ferreira@email.com",
    address: "Rua dos Bandeirantes, 789 - Campinas/SP",
    benefitType: "Benefício de Prestação Continuada",
    processNumber: "0009012-34.2024.8.26.0100",
    files: [
      { id: "f15", name: "Contrato de Honorários.pdf", type: "pdf", size: "245 KB", date: "2024-05-20", description: "Contrato de honorários advocatícios" },
      { id: "f16", name: "Contrato Assinado.pdf", type: "contract", size: "305 KB", date: "2024-05-20", description: "Contrato assinado pela cliente" },
      { id: "f17", name: "Laudo Médico.pdf", type: "pdf", size: "890 KB", date: "2024-05-22", description: "Laudo médico pericial" },
      { id: "f18", name: "Gravação Reunião.mp3", type: "audio", size: "5.1 MB", date: "2024-05-20", description: "Áudio da reunião com a cliente" },
      { id: "f19", name: "Comprovante Residência.jpg", type: "photo", size: "720 KB", date: "2024-05-21", description: "Comprovante de endereço" },
      { id: "f20", name: "Ficha do Cliente.docx", type: "doc", size: "95 KB", date: "2024-05-20", description: "Informações completas da cliente" },
    ],
  },
  {
    id: "4",
    clientName: "Roberto Mendes Lima",
    cpf: "321.654.987-00",
    contractType: "Auxílio-Doença",
    status: "em_andamento",
    createdAt: "2024-07-08",
    phone: "(11) 93333-7890",
    email: "roberto.lima@email.com",
    address: "Rua Augusta, 1010 - São Paulo/SP",
    benefitType: "Auxílio por Incapacidade Temporária",
    processNumber: "0003456-78.2024.8.26.0100",
    files: [
      { id: "f21", name: "Contrato de Honorários.pdf", type: "pdf", size: "245 KB", date: "2024-07-08", description: "Contrato de prestação de serviços" },
      { id: "f22", name: "Contrato Assinado.pdf", type: "contract", size: "310 KB", date: "2024-07-08", description: "Contrato com assinatura digital" },
      { id: "f23", name: "Atestado Médico.pdf", type: "pdf", size: "450 KB", date: "2024-07-09", description: "Atestado médico com CID" },
      { id: "f24", name: "Exames Laboratoriais.jpg", type: "photo", size: "2.1 MB", date: "2024-07-10", description: "Resultado de exames" },
      { id: "f25", name: "Ficha do Cliente.docx", type: "doc", size: "88 KB", date: "2024-07-08", description: "Cadastro do cliente" },
      { id: "f26", name: "Gravação Atendimento.mp3", type: "audio", size: "3.5 MB", date: "2024-07-08", description: "Áudio do atendimento inicial" },
    ],
  },
  {
    id: "5",
    clientName: "Francisca Almeida Costa",
    cpf: "654.321.789-00",
    contractType: "Pensão por Morte",
    status: "concluido",
    createdAt: "2024-02-14",
    phone: "(11) 97777-4567",
    email: "francisca.costa@email.com",
    address: "Rua Consolação, 555 - São Paulo/SP",
    benefitType: "Pensão por Morte",
    processNumber: "0007890-12.2024.8.26.0100",
    files: [
      { id: "f27", name: "Contrato de Honorários.pdf", type: "pdf", size: "245 KB", date: "2024-02-14", description: "Contrato de honorários" },
      { id: "f28", name: "Contrato Assinado.pdf", type: "contract", size: "295 KB", date: "2024-02-14", description: "Contrato assinado" },
      { id: "f29", name: "Certidão de Óbito.pdf", type: "pdf", size: "520 KB", date: "2024-02-15", description: "Certidão de óbito do segurado" },
      { id: "f30", name: "Certidão de Casamento.jpg", type: "photo", size: "1.4 MB", date: "2024-02-15", description: "Certidão de casamento" },
      { id: "f31", name: "Ficha do Cliente.docx", type: "doc", size: "91 KB", date: "2024-02-14", description: "Dados da cliente" },
      { id: "f32", name: "Gravação Consulta.mp3", type: "audio", size: "4.0 MB", date: "2024-02-14", description: "Áudio da consulta" },
      { id: "f33", name: "Decisão Administrativa.pdf", type: "pdf", size: "780 KB", date: "2024-05-30", description: "Decisão do INSS - Deferido" },
    ],
  },
];
