export interface ClientFile {
  id: string;
  name: string;
  type: 'pdf' | 'audio' | 'photo' | 'doc' | 'contract';
  size: string;
  date: string;
  description: string;
  audioSrc?: string;
}

export interface SdrNote {
  sdrName: string;
  date: string;
  channel: string;
  summary: string;
  clientMood: 'ansioso' | 'tranquilo' | 'urgente' | 'emotivo' | 'decidido' | 'inseguro';
  notes: string[];
  nextSteps: string;
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
  sdrNotes: SdrNote[];
}

const baseFiles = (id: number, date: string): ClientFile[] => [
  { id: `f${id}a`, name: "Contrato de Honorários.pdf", type: "pdf", size: "245 KB", date, description: "Contrato de prestação de serviços advocatícios" },
  { id: `f${id}b`, name: "Contrato Assinado.pdf", type: "contract", size: "312 KB", date, description: "Contrato assinado digitalmente" },
  { id: `f${id}c`, name: "Gravação Atendimento.mp3", type: "audio", size: "4.2 MB", date, description: "Áudio da reunião inicial", audioSrc: `/audio/silent_${id}.wav` },
  { id: `f${id}d`, name: "RG - Frente.jpg", type: "photo", size: "1.1 MB", date, description: "Documento de identidade - frente" },
  { id: `f${id}e`, name: "RG - Verso.jpg", type: "photo", size: "980 KB", date, description: "Documento de identidade - verso" },
  { id: `f${id}f`, name: "Ficha do Cliente.docx", type: "doc", size: "89 KB", date, description: "Informações cadastrais completas" },
  { id: `f${id}g`, name: "Procuração.pdf", type: "pdf", size: "156 KB", date, description: "Procuração ad judicia" },
];

export const mockClients: ClientFolder[] = [
  {
    id: "1", clientName: "Maria da Silva Santos", cpf: "123.456.789-00",
    contractType: "Aposentadoria por Idade", status: "em_andamento", createdAt: "2024-03-15",
    phone: "(11) 98765-4321", email: "maria.silva@email.com", address: "Rua das Flores, 123 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade", processNumber: "0001234-56.2024.8.26.0100",
    files: [...baseFiles(1, "2024-03-15"), { id: "f1h", name: "CTPS.jpg", type: "photo", size: "1.3 MB", date: "2024-03-16", description: "Carteira de trabalho" }],
  },
  {
    id: "2", clientName: "José Carlos Oliveira", cpf: "987.654.321-00",
    contractType: "Aposentadoria por Tempo de Contribuição", status: "concluido", createdAt: "2024-01-10",
    phone: "(11) 91234-5678", email: "jose.oliveira@email.com", address: "Av. Paulista, 456 - São Paulo/SP",
    benefitType: "Aposentadoria por Tempo de Contribuição", processNumber: "0005678-90.2024.8.26.0100",
    files: [...baseFiles(2, "2024-01-10"), { id: "f2h", name: "Sentença Favorável.pdf", type: "pdf", size: "1.2 MB", date: "2024-06-20", description: "Sentença do processo - deferido" }],
  },
  {
    id: "3", clientName: "Ana Paula Ferreira", cpf: "456.789.123-00",
    contractType: "BPC/LOAS", status: "aguardando", createdAt: "2024-05-20",
    phone: "(11) 95555-1234", email: "ana.ferreira@email.com", address: "Rua dos Bandeirantes, 789 - Campinas/SP",
    benefitType: "Benefício de Prestação Continuada", processNumber: "0009012-34.2024.8.26.0100",
    files: [...baseFiles(3, "2024-05-20"), { id: "f3h", name: "Laudo Médico.pdf", type: "pdf", size: "890 KB", date: "2024-05-22", description: "Laudo médico pericial" }],
  },
  {
    id: "4", clientName: "Roberto Mendes Lima", cpf: "321.654.987-00",
    contractType: "Auxílio-Doença", status: "em_andamento", createdAt: "2024-07-08",
    phone: "(11) 93333-7890", email: "roberto.lima@email.com", address: "Rua Augusta, 1010 - São Paulo/SP",
    benefitType: "Auxílio por Incapacidade Temporária", processNumber: "0003456-78.2024.8.26.0100",
    files: [...baseFiles(4, "2024-07-08"), { id: "f4h", name: "Atestado Médico.pdf", type: "pdf", size: "450 KB", date: "2024-07-09", description: "Atestado médico com CID" }],
  },
  {
    id: "5", clientName: "Francisca Almeida Costa", cpf: "654.321.789-00",
    contractType: "Pensão por Morte", status: "concluido", createdAt: "2024-02-14",
    phone: "(11) 97777-4567", email: "francisca.costa@email.com", address: "Rua Consolação, 555 - São Paulo/SP",
    benefitType: "Pensão por Morte", processNumber: "0007890-12.2024.8.26.0100",
    files: [...baseFiles(5, "2024-02-14"), { id: "f5h", name: "Certidão de Óbito.pdf", type: "pdf", size: "520 KB", date: "2024-02-15", description: "Certidão de óbito do segurado" }],
  },
  {
    id: "6", clientName: "Carlos Eduardo Pereira", cpf: "111.222.333-44",
    contractType: "Aposentadoria por Invalidez", status: "em_andamento", createdAt: "2024-04-02",
    phone: "(11) 92222-3333", email: "carlos.pereira@email.com", address: "Rua Vergueiro, 320 - São Paulo/SP",
    benefitType: "Aposentadoria por Incapacidade Permanente", processNumber: "0002345-67.2024.8.26.0100",
    files: [...baseFiles(6, "2024-04-02"), { id: "f6h", name: "Perícia Médica.pdf", type: "pdf", size: "1.5 MB", date: "2024-04-10", description: "Resultado da perícia médica do INSS" }],
  },
  {
    id: "7", clientName: "Lúcia Helena Rodrigues", cpf: "222.333.444-55",
    contractType: "Aposentadoria por Idade", status: "concluido", createdAt: "2023-11-05",
    phone: "(11) 94444-5555", email: "lucia.rodrigues@email.com", address: "Rua Oscar Freire, 890 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade", processNumber: "0004567-89.2023.8.26.0100",
    files: [...baseFiles(7, "2023-11-05"), { id: "f7h", name: "CNIS.pdf", type: "pdf", size: "340 KB", date: "2023-11-06", description: "Cadastro Nacional de Informações Sociais" }],
  },
  {
    id: "8", clientName: "Antônio Marcos Souza", cpf: "333.444.555-66",
    contractType: "Auxílio-Acidente", status: "aguardando", createdAt: "2024-06-12",
    phone: "(11) 96666-7777", email: "antonio.souza@email.com", address: "Av. Brasil, 1500 - Guarulhos/SP",
    benefitType: "Auxílio-Acidente", processNumber: "0006789-01.2024.8.26.0100",
    files: [...baseFiles(8, "2024-06-12"), { id: "f8h", name: "Boletim de Ocorrência.pdf", type: "pdf", size: "670 KB", date: "2024-06-13", description: "BO do acidente de trabalho" }],
  },
  {
    id: "9", clientName: "Patrícia Gomes Nascimento", cpf: "444.555.666-77",
    contractType: "BPC/LOAS", status: "em_andamento", createdAt: "2024-08-01",
    phone: "(11) 98888-9999", email: "patricia.gomes@email.com", address: "Rua Ipiranga, 200 - São Paulo/SP",
    benefitType: "Benefício de Prestação Continuada", processNumber: "0008901-23.2024.8.26.0100",
    files: [...baseFiles(9, "2024-08-01"), { id: "f9h", name: "Declaração de Renda.pdf", type: "pdf", size: "180 KB", date: "2024-08-02", description: "Declaração de composição de renda familiar" }],
  },
  {
    id: "10", clientName: "Fernando Ribeiro Alves", cpf: "555.666.777-88",
    contractType: "Aposentadoria Especial", status: "aguardando", createdAt: "2024-03-28",
    phone: "(11) 91111-0000", email: "fernando.alves@email.com", address: "Rua da Mooca, 670 - São Paulo/SP",
    benefitType: "Aposentadoria Especial", processNumber: "0001122-33.2024.8.26.0100",
    files: [...baseFiles(10, "2024-03-28"), { id: "f10h", name: "PPP.pdf", type: "pdf", size: "420 KB", date: "2024-03-29", description: "Perfil Profissiográfico Previdenciário" }],
  },
  {
    id: "11", clientName: "Sandra Regina Martins", cpf: "666.777.888-99",
    contractType: "Pensão por Morte", status: "em_andamento", createdAt: "2024-09-10",
    phone: "(11) 93456-7890", email: "sandra.martins@email.com", address: "Rua XV de Novembro, 430 - Santos/SP",
    benefitType: "Pensão por Morte", processNumber: "0003344-55.2024.8.26.0100",
    files: [...baseFiles(11, "2024-09-10"), { id: "f11h", name: "Certidão de Casamento.jpg", type: "photo", size: "1.4 MB", date: "2024-09-11", description: "Certidão de casamento" }],
  },
  {
    id: "12", clientName: "Marcos Vinícius Barbosa", cpf: "777.888.999-00",
    contractType: "Auxílio-Doença", status: "concluido", createdAt: "2024-02-20",
    phone: "(11) 95678-1234", email: "marcos.barbosa@email.com", address: "Av. Independência, 88 - Osasco/SP",
    benefitType: "Auxílio por Incapacidade Temporária", processNumber: "0005566-77.2024.8.26.0100",
    files: [...baseFiles(12, "2024-02-20"), { id: "f12h", name: "Exames.jpg", type: "photo", size: "2.1 MB", date: "2024-02-22", description: "Resultado de exames laboratoriais" }],
  },
  {
    id: "13", clientName: "Cláudia Fernanda Pinto", cpf: "888.999.000-11",
    contractType: "Aposentadoria por Idade", status: "em_andamento", createdAt: "2024-05-05",
    phone: "(11) 92345-6789", email: "claudia.pinto@email.com", address: "Rua Haddock Lobo, 150 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade", processNumber: "0007788-99.2024.8.26.0100",
    files: baseFiles(13, "2024-05-05"),
  },
  {
    id: "14", clientName: "Raimundo Nonato Silva", cpf: "999.000.111-22",
    contractType: "Aposentadoria por Tempo de Contribuição", status: "aguardando", createdAt: "2024-06-30",
    phone: "(11) 96789-0123", email: "raimundo.silva@email.com", address: "Rua Barão de Itapetininga, 77 - São Paulo/SP",
    benefitType: "Aposentadoria por Tempo de Contribuição", processNumber: "0009900-11.2024.8.26.0100",
    files: [...baseFiles(14, "2024-06-30"), { id: "f14h", name: "Simulação INSS.pdf", type: "pdf", size: "200 KB", date: "2024-07-01", description: "Simulação de tempo de contribuição" }],
  },
  {
    id: "15", clientName: "Teresa Cristina Moura", cpf: "000.111.222-33",
    contractType: "BPC/LOAS", status: "concluido", createdAt: "2023-10-18",
    phone: "(11) 94321-8765", email: "teresa.moura@email.com", address: "Rua Maria Antônia, 300 - São Paulo/SP",
    benefitType: "Benefício de Prestação Continuada", processNumber: "0002233-44.2023.8.26.0100",
    files: [...baseFiles(15, "2023-10-18"), { id: "f15h", name: "Decisão INSS.pdf", type: "pdf", size: "780 KB", date: "2024-01-15", description: "Decisão administrativa - Deferido" }],
  },
  {
    id: "16", clientName: "Paulo Henrique Duarte", cpf: "112.233.445-56",
    contractType: "Aposentadoria por Invalidez", status: "em_andamento", createdAt: "2024-08-22",
    phone: "(11) 98765-0000", email: "paulo.duarte@email.com", address: "Av. Santo Amaro, 1200 - São Paulo/SP",
    benefitType: "Aposentadoria por Incapacidade Permanente", processNumber: "0004455-66.2024.8.26.0100",
    files: [...baseFiles(16, "2024-08-22"), { id: "f16h", name: "Laudo Neurológico.pdf", type: "pdf", size: "950 KB", date: "2024-08-25", description: "Laudo médico neurológico" }],
  },
  {
    id: "17", clientName: "Rosângela Aparecida Lopes", cpf: "223.344.556-67",
    contractType: "Auxílio-Acidente", status: "aguardando", createdAt: "2024-07-15",
    phone: "(11) 91234-0000", email: "rosangela.lopes@email.com", address: "Rua Domingos de Morais, 500 - São Paulo/SP",
    benefitType: "Auxílio-Acidente", processNumber: "0006677-88.2024.8.26.0100",
    files: [...baseFiles(17, "2024-07-15"), { id: "f17h", name: "CAT.pdf", type: "pdf", size: "300 KB", date: "2024-07-16", description: "Comunicação de Acidente de Trabalho" }],
  },
  {
    id: "18", clientName: "Sebastião José Campos", cpf: "334.455.667-78",
    contractType: "Aposentadoria Especial", status: "concluido", createdAt: "2023-09-01",
    phone: "(11) 95432-1098", email: "sebastiao.campos@email.com", address: "Rua Brigadeiro, 890 - São Bernardo/SP",
    benefitType: "Aposentadoria Especial", processNumber: "0008899-00.2023.8.26.0100",
    files: [...baseFiles(18, "2023-09-01"), { id: "f18h", name: "LTCAT.pdf", type: "pdf", size: "560 KB", date: "2023-09-03", description: "Laudo Técnico de Condições Ambientais" }],
  },
  {
    id: "19", clientName: "Ivone Beatriz Cardoso", cpf: "445.566.778-89",
    contractType: "Pensão por Morte", status: "em_andamento", createdAt: "2024-10-05",
    phone: "(11) 97890-1234", email: "ivone.cardoso@email.com", address: "Rua Teodoro Sampaio, 245 - São Paulo/SP",
    benefitType: "Pensão por Morte", processNumber: "0001010-20.2024.8.26.0100",
    files: [...baseFiles(19, "2024-10-05"), { id: "f19h", name: "Certidão de Óbito.pdf", type: "pdf", size: "510 KB", date: "2024-10-06", description: "Certidão de óbito do segurado" }],
  },
  {
    id: "20", clientName: "Jorge Luís Teixeira", cpf: "556.677.889-90",
    contractType: "Aposentadoria por Idade", status: "aguardando", createdAt: "2024-09-20",
    phone: "(11) 93210-5678", email: "jorge.teixeira@email.com", address: "Av. Rebouças, 1700 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade", processNumber: "0003030-40.2024.8.26.0100",
    files: [...baseFiles(20, "2024-09-20"), { id: "f20h", name: "Comprovante Residência.jpg", type: "photo", size: "720 KB", date: "2024-09-21", description: "Comprovante de endereço atualizado" }],
  },
];
