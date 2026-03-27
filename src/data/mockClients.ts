export interface ClientFile {
  id: string;
  name: string;
  type: 'pdf' | 'audio' | 'photo' | 'doc' | 'contract';
  size: string;
  date: string;
  description: string;
  audioSrc?: string;
  fileSrc?: string;
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
  files: ClientFile[];
  sdrNotes: SdrNote[];
}

const audioSizes = ["2.8 MB", "3.5 MB", "4.2 MB", "5.1 MB", "6.3 MB", "3.9 MB", "7.0 MB", "4.7 MB", "5.6 MB", "2.4 MB", "3.1 MB", "6.8 MB", "4.0 MB", "5.3 MB", "3.7 MB", "7.5 MB", "2.9 MB", "4.5 MB", "6.1 MB", "3.3 MB"];
const pdfSizes = ["210 KB", "245 KB", "278 KB", "312 KB", "189 KB", "334 KB", "256 KB", "298 KB", "225 KB", "267 KB"];
const photoSizes = ["1.1 MB", "1.3 MB", "980 KB", "1.5 MB", "870 KB", "1.2 MB", "1.4 MB", "1.0 MB", "960 KB", "1.6 MB"];

const baseFiles = (id: number, date: string): ClientFile[] => [
  { id: `f${id}a`, name: "Contrato de Honorários.pdf", type: "pdf", size: pdfSizes[id % pdfSizes.length], date, description: "Contrato de prestação de serviços advocatícios" },
  { id: `f${id}b`, name: "Contrato Assinado.pdf", type: "contract", size: pdfSizes[(id + 3) % pdfSizes.length], date, description: "Contrato assinado digitalmente" },
  { id: `f${id}c`, name: "Gravação Atendimento.mp3", type: "audio", size: audioSizes[id % audioSizes.length], date, description: "Áudio da reunião inicial", audioSrc: `/audio/silent_${id}.wav` },
  { id: `f${id}d`, name: "Documento - Frente.jpg", type: "photo", size: photoSizes[id % photoSizes.length], date, description: "Documento de identidade - frente" },
  { id: `f${id}e`, name: "Documento - Verso.jpg", type: "photo", size: photoSizes[(id + 5) % photoSizes.length], date, description: "Documento de identidade - verso" },
  { id: `f${id}f`, name: "Ficha do Cliente.docx", type: "doc", size: ["89 KB", "102 KB", "76 KB", "95 KB", "112 KB"][id % 5], date, description: "Informações cadastrais completas" },
  { id: `f${id}g`, name: "Procuração.pdf", type: "pdf", size: pdfSizes[(id + 7) % pdfSizes.length], date, description: "Procuração ad judicia" },
];

export const mockClients: ClientFolder[] = [
  {
    id: "1", clientName: "Rainis Lejins", cpf: "040.529.648-70",
    contractType: "Aposentadoria por Idade", status: "concluido", createdAt: "2026-03-10",
    phone: "(81) 99872-3415 / (81) 99634-7821", email: "rainis.lejins@email.com", address: "Limoeiro - PE",
    benefitType: "Aposentadoria por Idade",
    files: [
      { id: "f1a", name: "Contrato de Honorários.pdf", type: "pdf", size: "312 KB", date: "2026-03-10", description: "Contrato de prestação de serviços advocatícios", fileSrc: "/clients/rainis/contrato_honorarios.pdf" },
      { id: "f1b", name: "Procuração.pdf", type: "pdf", size: "245 KB", date: "2026-03-10", description: "Procuração ad judicia", fileSrc: "/clients/rainis/procuracao.pdf" },
      { id: "f1c", name: "Gravação Atendimento.mp3", type: "audio", size: "4.2 MB", date: "2026-03-12", description: "Áudio da reunião inicial" },
      { id: "f1d", name: "Documento - Frente.jpg", type: "photo", size: "1.4 MB", date: "2026-03-10", description: "Documento de identidade - frente", fileSrc: "/clients/rainis/rg_frente.jpg" },
      { id: "f1e", name: "Documento - Verso.jpg", type: "photo", size: "1.1 MB", date: "2026-03-10", description: "Documento de identidade - verso", fileSrc: "/clients/rainis/rg_verso.jpg" },
      { id: "f1f", name: "Fachada Residência.png", type: "photo", size: "980 KB", date: "2026-03-11", description: "Foto da fachada da residência", fileSrc: "/clients/rainis/fachada.png" },
      { id: "f1g", name: "Comprovante de Endereço.pdf", type: "pdf", size: "320 KB", date: "2026-03-11", description: "Comprovante de endereço", fileSrc: "/clients/rainis/comprovante_endereco.pdf" },
    ],
    sdrNotes: [
      { sdrName: "Lucas Martins", date: "2026-03-10", channel: "WhatsApp", clientMood: "ansioso", summary: "Seu Rainis entrou em contato pelo WhatsApp após indicação de um conhecido. Tem 63 anos e está preocupado com o tempo de contribuição. Trabalhou muitos anos na área rural em Pernambuco.", notes: ["Cliente trabalhou na agricultura durante boa parte da vida", "Possui CNH e documentos pessoais em dia", "Reside em Limoeiro - PE", "Parentes forneceram contatos para acompanhamento"], nextSteps: "Agendar reunião presencial para análise dos documentos e CNIS" },
      { sdrName: "Lucas Martins", date: "2026-03-15", channel: "Presencial", clientMood: "decidido", summary: "Seu Rainis compareceu ao escritório com todos os documentos organizados. Contrato e procuração assinados no mesmo dia. Cliente demonstrou confiança no processo.", notes: ["Apresentou RG/CNH e documentos complementares", "Contrato de honorários e procuração assinados", "Cliente bastante colaborativo e organizado", "Foto da fachada da residência registrada para comprovação"], nextSteps: "Solicitar CNIS detalhado e dar entrada no requerimento administrativo" },
    ],
  },
  {
    id: "2", clientName: "José Carlos Oliveira", cpf: "987.654.321-00",
    contractType: "Aposentadoria por Tempo de Contribuição", status: "concluido", createdAt: "2026-03-06",
    phone: "(11) 91234-5678", email: "jose.oliveira@email.com", address: "Av. Paulista, 456 - São Paulo/SP",
    benefitType: "Aposentadoria por Tempo de Contribuição",
    files: [...baseFiles(2, "2026-03-07"), { id: "f2h", name: "Sentença Favorável.pdf", type: "pdf", size: "1.2 MB", date: "2026-03-12", description: "Sentença do processo - deferido" }],
    sdrNotes: [
      { sdrName: "Amanda Souza", date: "2026-03-09", channel: "Telefone", clientMood: "decidido", summary: "Seu José ligou já decidido a contratar. Disse que pesquisou bastante na internet e escolheu nosso escritório pelas avaliações no Google. Tem 35 anos de contribuição e quer saber qual a melhor regra de transição.", notes: ["Cliente muito bem informado sobre as regras de transição", "Trabalhou a vida inteira em metalúrgica", "Tem todos os documentos digitalizados no celular", "Quer resolver o mais rápido possível para poder viajar com a esposa"], nextSteps: "Fazer simulação completa com todas as regras de transição e apresentar a mais vantajosa" },
    ],
  },
  {
    id: "3", clientName: "Ana Paula Ferreira", cpf: "456.789.123-00",
    contractType: "BPC/LOAS", status: "concluido", createdAt: "2026-03-23",
    phone: "(11) 95555-1234", email: "ana.ferreira@email.com", address: "Rua dos Bandeirantes, 789 - Campinas/SP",
    benefitType: "Benefício de Prestação Continuada",
    files: [...baseFiles(3, "2026-03-18"), { id: "f3h", name: "Laudo Médico.pdf", type: "pdf", size: "890 KB", date: "2026-03-24", description: "Laudo médico pericial" }],
    sdrNotes: [
      { sdrName: "Beatriz Lima", date: "2026-03-11", channel: "Instagram", clientMood: "inseguro", summary: "Ana Paula mandou mensagem pelo Instagram perguntando se a gente ajuda com BPC. Tem um filho de 8 anos com autismo e não consegue trabalhar para cuidar dele. Está com medo de não conseguir porque o marido trabalha.", notes: ["Filho diagnosticado com TEA nível 2 de suporte", "Marido é pedreiro autônomo, renda variável", "Já tentou dar entrada sozinha no INSS e foi negado", "Muito insegura com o processo, precisa de acolhimento"], nextSteps: "Explicar os critérios de renda per capita e agendar reunião para análise da documentação médica" },
      { sdrName: "Beatriz Lima", date: "2026-03-16", channel: "Presencial", clientMood: "emotivo", summary: "Ana veio com o filho e o marido. O menino ficou brincando na recepção enquanto conversávamos. Ela trouxe uma pasta com todos os laudos, relatórios de terapia e receitas. Muito organizada apesar da situação difícil.", notes: ["Laudo do neuropediatra bem completo e recente", "Criança faz terapia ABA 3x por semana", "Renda familiar em torno de R$1.800", "Contrato assinado, cliente saiu mais confiante"], nextSteps: "Preparar requerimento administrativo com toda a documentação médica" },
    ],
  },
  {
    id: "4", clientName: "Roberto Mendes Lima", cpf: "321.654.987-00",
    contractType: "Auxílio-Doença", status: "concluido", createdAt: "2026-03-14",
    phone: "(11) 93333-7890", email: "roberto.lima@email.com", address: "Rua Augusta, 1010 - São Paulo/SP",
    benefitType: "Auxílio por Incapacidade Temporária",
    files: [...baseFiles(4, "2026-03-16"), { id: "f4h", name: "Atestado Médico.pdf", type: "pdf", size: "450 KB", date: "2026-03-06", description: "Atestado médico com CID" }],
    sdrNotes: [
      { sdrName: "Lucas Martins", date: "2026-03-23", channel: "WhatsApp", clientMood: "urgente", summary: "Roberto mandou mensagem desesperado. Sofreu uma queda no trabalho há 2 semanas e a empresa não emitiu a CAT. Está sem receber e com contas acumulando. Precisa de ajuda urgente.", notes: ["Fratura no punho direito com cirurgia agendada", "Motorista de caminhão, não consegue dirigir", "Empresa se recusou a emitir CAT", "Tem esposa e 2 filhos pequenos dependendo dele"], nextSteps: "Orientar sobre emissão de CAT pelo sindicato e agendar atendimento emergencial" },
    ],
  },
  {
    id: "5", clientName: "Francisca Almeida Costa", cpf: "654.321.789-00",
    contractType: "Pensão por Morte", status: "concluido", createdAt: "2026-03-11",
    phone: "(11) 97777-4567", email: "francisca.costa@email.com", address: "Rua Consolação, 555 - São Paulo/SP",
    benefitType: "Pensão por Morte",
    files: [...baseFiles(5, "2026-03-12"), { id: "f5h", name: "Certidão de Óbito.pdf", type: "pdf", size: "520 KB", date: "2026-03-01", description: "Certidão de óbito do segurado" }],
    sdrNotes: [
      { sdrName: "Amanda Souza", date: "2026-03-13", channel: "Telefone", clientMood: "emotivo", summary: "Dona Francisca ligou chorando muito. O marido faleceu há 3 semanas e ela não sabe o que fazer. Uma amiga da igreja indicou o escritório. Ela nunca trabalhou fora e dependia totalmente do marido.", notes: ["Marido era aposentado por tempo de contribuição", "Casados há 38 anos com certidão", "Dona Francisca tem 64 anos e nunca contribuiu", "Está morando com a filha temporariamente", "Precisa de muito acolhimento emocional"], nextSteps: "Agendar reunião com calma, pedir que traga certidão de óbito, casamento e documentos do marido" },
    ],
  },
  {
    id: "6", clientName: "Carlos Eduardo Pereira", cpf: "111.222.333-44",
    contractType: "Aposentadoria por Invalidez", status: "concluido", createdAt: "2026-03-25",
    phone: "(11) 92222-3333", email: "carlos.pereira@email.com", address: "Rua Vergueiro, 320 - São Paulo/SP",
    benefitType: "Aposentadoria por Incapacidade Permanente",
    files: [...baseFiles(6, "2026-03-14"), { id: "f6h", name: "Perícia Médica.pdf", type: "pdf", size: "1.5 MB", date: "2026-03-09", description: "Resultado da perícia médica do INSS" }],
    sdrNotes: [
      { sdrName: "Beatriz Lima", date: "2026-03-23", channel: "WhatsApp", clientMood: "ansioso", summary: "Carlos mandou áudio longo no WhatsApp. Está afastado há 1 ano com hérnia de disco severa e o auxílio-doença foi cessado na última perícia. Não consegue voltar a trabalhar e o médico disse que a lesão é permanente.", notes: ["Três cirurgias na coluna nos últimos 2 anos", "Era operador de empilhadeira em fábrica", "INSS cortou o benefício mesmo com laudos contrários", "Está tomando medicação forte para dor crônica", "Esposa passou a trabalhar como diarista para sustentar a casa"], nextSteps: "Solicitar todos os laudos e exames, preparar recurso administrativo ou ação judicial" },
    ],
  },
  {
    id: "7", clientName: "Lúcia Helena Rodrigues", cpf: "222.333.444-55",
    contractType: "Aposentadoria por Idade", status: "concluido", createdAt: "2026-03-10",
    phone: "(11) 94444-5555", email: "lucia.rodrigues@email.com", address: "Rua Oscar Freire, 890 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade",
    files: [...baseFiles(7, "2026-03-22"), { id: "f7h", name: "CNIS.pdf", type: "pdf", size: "340 KB", date: "2026-03-12", description: "Cadastro Nacional de Informações Sociais" }],
    sdrNotes: [
      { sdrName: "Lucas Martins", date: "2026-03-19", channel: "Indicação", clientMood: "tranquilo", summary: "Dona Lúcia foi indicada pela cliente Maria Santos. Chegou tranquila e organizada com todos os documentos em uma pasta. Tem 63 anos e contribuiu certinho a vida toda como professora da rede municipal.", notes: ["30 anos como professora municipal", "Documentação toda em dia e organizada", "Quer se aposentar para cuidar dos netos", "Muito simpática, trouxe bolo para o escritório"], nextSteps: "Análise rápida do CNIS e protocolar requerimento - caso simples e bem documentado" },
    ],
  },
  {
    id: "8", clientName: "Antônio Marcos Souza", cpf: "333.444.555-66",
    contractType: "Auxílio-Acidente", status: "concluido", createdAt: "2026-03-09",
    phone: "(11) 96666-7777", email: "antonio.souza@email.com", address: "Av. Brasil, 1500 - Guarulhos/SP",
    benefitType: "Auxílio-Acidente",
    files: [...baseFiles(8, "2026-03-09"), { id: "f8h", name: "Boletim de Ocorrência.pdf", type: "pdf", size: "670 KB", date: "2026-03-21", description: "BO do acidente de trabalho" }],
    sdrNotes: [
      { sdrName: "Amanda Souza", date: "2026-03-07", channel: "Telefone", clientMood: "urgente", summary: "Antônio ligou do hospital. Sofreu acidente na obra onde trabalha como pedreiro - caiu do andaime e fraturou a perna em dois lugares. Está preocupado porque é autônomo e não tem carteira assinada.", notes: ["Acidente em obra, sem equipamento de segurança", "Contribui como autônomo há 5 anos", "Fratura exposta na tíbia e fíbula", "Vai precisar de fisioterapia por meses", "Não tem reserva financeira nenhuma"], nextSteps: "Verificar qualidade de segurado e agendar visita ao hospital para colher assinatura" },
    ],
  },
  {
    id: "9", clientName: "Patrícia Gomes Nascimento", cpf: "444.555.666-77",
    contractType: "BPC/LOAS", status: "concluido", createdAt: "2026-03-08",
    phone: "(11) 98888-9999", email: "patricia.gomes@email.com", address: "Rua Ipiranga, 200 - São Paulo/SP",
    benefitType: "Benefício de Prestação Continuada",
    files: [...baseFiles(9, "2026-03-24"), { id: "f9h", name: "Declaração de Renda.pdf", type: "pdf", size: "180 KB", date: "2026-03-09", description: "Declaração de composição de renda familiar" }],
    sdrNotes: [
      { sdrName: "Beatriz Lima", date: "2026-03-07", channel: "Instagram", clientMood: "inseguro", summary: "Patrícia viu um vídeo nosso no Instagram sobre BPC para idosos e mandou mensagem. Tem 66 anos, nunca contribuiu e vive com a renda do marido que faz bicos. Perguntou se 'gente como ela' tem direito.", notes: ["Nunca trabalhou com carteira assinada", "Marido faz trabalhos esporádicos como eletricista", "Moram em casa própria simples na periferia", "Filhos moram longe e ajudam pouco", "Se sentiu acolhida quando explicamos que sim, ela tem direito"], nextSteps: "Agendar atendimento presencial para montar o processo com toda documentação de renda" },
    ],
  },
  {
    id: "10", clientName: "Fernando Ribeiro Alves", cpf: "555.666.777-88",
    contractType: "Aposentadoria Especial", status: "concluido", createdAt: "2026-03-02",
    phone: "(11) 91111-0000", email: "fernando.alves@email.com", address: "Rua da Mooca, 670 - São Paulo/SP",
    benefitType: "Aposentadoria Especial",
    files: [...baseFiles(10, "2026-03-22"), { id: "f10h", name: "PPP.pdf", type: "pdf", size: "420 KB", date: "2026-03-03", description: "Perfil Profissiográfico Previdenciário" }],
    sdrNotes: [
      { sdrName: "Lucas Martins", date: "2026-03-08", channel: "WhatsApp", clientMood: "decidido", summary: "Fernando trabalha há 22 anos como eletricista em empresa de energia. Um colega que se aposentou com a gente indicou nosso escritório. Sabe que tem direito à aposentadoria especial por exposição a periculosidade.", notes: ["Exposição contínua a alta tensão", "PPP da empresa confirma periculosidade", "Quer se aposentar para abrir negócio próprio", "Colega aposentado: Sr. João Mendes (cliente antigo)"], nextSteps: "Analisar PPP e LTCAT da empresa, verificar enquadramento por periculosidade" },
    ],
  },
  {
    id: "11", clientName: "Sandra Regina Martins", cpf: "666.777.888-99",
    contractType: "Pensão por Morte", status: "concluido", createdAt: "2026-03-14",
    phone: "(11) 93456-7890", email: "sandra.martins@email.com", address: "Rua XV de Novembro, 430 - Santos/SP",
    benefitType: "Pensão por Morte",
    files: [...baseFiles(11, "2026-03-14"), { id: "f11h", name: "Certidão de Casamento.jpg", type: "photo", size: "1.4 MB", date: "2026-03-07", description: "Certidão de casamento" }],
    sdrNotes: [
      { sdrName: "Amanda Souza", date: "2026-03-16", channel: "Telefone", clientMood: "emotivo", summary: "Sandra ligou muito abalada. O marido faleceu inesperadamente de infarto há 10 dias. Ele era caminhoneiro autônomo e ela não sabe se ele estava em dia com o INSS. Tem dois filhos adolescentes.", notes: ["Marido era caminhoneiro autônomo há 15 anos", "Não sabe informar sobre contribuições recentes", "Dois filhos de 14 e 16 anos", "Está com dificuldade financeira imediata", "Chorou bastante durante a ligação, precisou de pausa"], nextSteps: "Consultar CNIS do falecido urgente e verificar qualidade de segurado" },
    ],
  },
  {
    id: "12", clientName: "Marcos Vinícius Barbosa", cpf: "777.888.999-00",
    contractType: "Auxílio-Doença", status: "concluido", createdAt: "2026-03-15",
    phone: "(11) 95678-1234", email: "marcos.barbosa@email.com", address: "Av. Independência, 88 - Osasco/SP",
    benefitType: "Auxílio por Incapacidade Temporária",
    files: [...baseFiles(12, "2026-03-17"), { id: "f12h", name: "Exames.jpg", type: "photo", size: "2.1 MB", date: "2026-03-04", description: "Resultado de exames laboratoriais" }],
    sdrNotes: [
      { sdrName: "Beatriz Lima", date: "2026-03-04", channel: "WhatsApp", clientMood: "ansioso", summary: "Marcos mandou mensagem dizendo que foi diagnosticado com depressão severa e síndrome de burnout. Está afastado do trabalho há 1 mês e a empresa está pressionando para ele voltar. Não se sente em condições.", notes: ["Trabalhava como gerente de loja, jornada de 12h", "Diagnóstico de depressão maior e ansiedade generalizada", "Usando medicação psiquiátrica há 3 semanas", "Empresa ameaçou demitir se não voltar", "Voz trêmula durante a conversa, claramente fragilizado"], nextSteps: "Orientar sobre estabilidade e agendar para trazer laudos do psiquiatra e do clínico geral" },
    ],
  },
  {
    id: "13", clientName: "Cláudia Fernanda Pinto", cpf: "888.999.000-11",
    contractType: "Aposentadoria por Idade", status: "concluido", createdAt: "2026-03-02",
    phone: "(11) 92345-6789", email: "claudia.pinto@email.com", address: "Rua Haddock Lobo, 150 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade",
    files: baseFiles(13, "2026-03-10"),
    sdrNotes: [
      { sdrName: "Lucas Martins", date: "2026-03-09", channel: "Indicação", clientMood: "tranquilo", summary: "Cláudia veio indicada pela irmã que é nossa cliente. Tem 61 anos e quer se preparar para dar entrada na aposentadoria quando completar 62. Quer deixar tudo organizado com antecedência.", notes: ["Trabalhou 20 anos como cozinheira em restaurante", "Últimos 8 anos como MEI (marmitex)", "Quer se aposentar para se dedicar à igreja", "Muito organizada, já trouxe cópia de todos os documentos", "Irmã é a cliente Teresa Moura (#15)"], nextSteps: "Fazer análise preventiva e montar cronograma até ela completar 62 anos" },
    ],
  },
  {
    id: "14", clientName: "Raimundo Nonato Silva", cpf: "999.000.111-22",
    contractType: "Aposentadoria por Tempo de Contribuição", status: "concluido", createdAt: "2026-03-10",
    phone: "(11) 96789-0123", email: "raimundo.silva@email.com", address: "Rua Barão de Itapetininga, 77 - São Paulo/SP",
    benefitType: "Aposentadoria por Tempo de Contribuição",
    files: [...baseFiles(14, "2026-03-19"), { id: "f14h", name: "Simulação INSS.pdf", type: "pdf", size: "200 KB", date: "2026-03-25", description: "Simulação de tempo de contribuição" }],
    sdrNotes: [
      { sdrName: "Amanda Souza", date: "2026-03-22", channel: "Telefone", clientMood: "inseguro", summary: "Seu Raimundo ligou meio confuso. Tem 58 anos e acha que tem uns 32 anos de contribuição, mas não tem certeza. Trabalhou em várias empresas e algumas já fecharam. Não sabe se o tempo todo foi contado.", notes: ["Começou a trabalhar aos 16 anos no interior do Piauí", "Veio pra São Paulo em 1990", "Trabalhou em várias fábricas, algumas já fecharam", "Não tem todas as CTPS, perdeu uma em mudança", "Preocupado que o tempo rural não tenha sido registrado"], nextSteps: "Solicitar CNIS e pesquisar vínculos antigos, verificar possibilidade de tempo rural" },
    ],
  },
  {
    id: "15", clientName: "Teresa Cristina Moura", cpf: "000.111.222-33",
    contractType: "BPC/LOAS", status: "concluido", createdAt: "2026-03-17",
    phone: "(11) 94321-8765", email: "teresa.moura@email.com", address: "Rua Maria Antônia, 300 - São Paulo/SP",
    benefitType: "Benefício de Prestação Continuada",
    files: [...baseFiles(15, "2026-03-16"), { id: "f15h", name: "Decisão INSS.pdf", type: "pdf", size: "780 KB", date: "2026-03-14", description: "Decisão administrativa - Deferido" }],
    sdrNotes: [
      { sdrName: "Beatriz Lima", date: "2026-03-10", channel: "Presencial", clientMood: "emotivo", summary: "Dona Teresa veio ao escritório sem agendar, caminhando com dificuldade por causa da artrose nos joelhos. Tem 67 anos, nunca contribuiu e vive com a aposentadoria mínima do marido que mal dá pra pagar as contas. Ouviu no rádio que idoso de baixa renda tem direito.", notes: ["Artrose severa nos dois joelhos, usa bengala", "Marido recebe um salário mínimo de aposentadoria", "Moram em casa alugada no valor de R$600", "Nunca trabalhou formalmente", "Muito humilde e educada, pediu desculpa por vir sem agendar"], nextSteps: "Caso clássico de BPC idoso, montar processo com urgência dado a situação de vulnerabilidade" },
    ],
  },
  {
    id: "16", clientName: "Paulo Henrique Duarte", cpf: "112.233.445-56",
    contractType: "Aposentadoria por Invalidez", status: "concluido", createdAt: "2026-03-23",
    phone: "(11) 98765-0000", email: "paulo.duarte@email.com", address: "Av. Santo Amaro, 1200 - São Paulo/SP",
    benefitType: "Aposentadoria por Incapacidade Permanente",
    files: [...baseFiles(16, "2026-03-06"), { id: "f16h", name: "Laudo Neurológico.pdf", type: "pdf", size: "950 KB", date: "2026-03-09", description: "Laudo médico neurológico" }],
    sdrNotes: [
      { sdrName: "Lucas Martins", date: "2026-03-03", channel: "WhatsApp", clientMood: "urgente", summary: "A esposa do Paulo mandou mensagem porque ele não consegue mais mexer no celular direito. Ele teve um AVC há 4 meses e ficou com sequelas no lado esquerdo do corpo. Está no auxílio-doença mas a perícia está chegando e eles têm medo de perder.", notes: ["AVC isquêmico com hemiparesia esquerda", "Era segurança patrimonial, função exige esforço físico", "Não tem condições de voltar a trabalhar em nenhuma função", "Esposa largou o emprego para cuidar dele", "Precisam converter auxílio-doença em aposentadoria por invalidez"], nextSteps: "Reunir laudos neurológicos atualizados e preparar pedido de conversão com relatório de impossibilidade de reabilitação" },
    ],
  },
  {
    id: "17", clientName: "Rosângela Aparecida Lopes", cpf: "223.344.556-67",
    contractType: "Auxílio-Acidente", status: "concluido", createdAt: "2026-03-25",
    phone: "(11) 91234-0000", email: "rosangela.lopes@email.com", address: "Rua Domingos de Morais, 500 - São Paulo/SP",
    benefitType: "Auxílio-Acidente",
    files: [...baseFiles(17, "2026-03-09"), { id: "f17h", name: "CAT.pdf", type: "pdf", size: "300 KB", date: "2026-03-03", description: "Comunicação de Acidente de Trabalho" }],
    sdrNotes: [
      { sdrName: "Amanda Souza", date: "2026-03-05", channel: "Telefone", clientMood: "ansioso", summary: "Rosângela ligou explicando que voltou a trabalhar após acidente, mas ficou com limitação no ombro. A empresa a colocou em função adaptada mas ela sente dor todo dia. Quer saber se tem direito a alguma indenização ou benefício.", notes: ["Acidente de trabalho há 8 meses - queda de escada", "Lesão no manguito rotador com cirurgia", "Voltou ao trabalho mas com restrição de movimento", "Trabalha como auxiliar de limpeza em hospital", "Tem medo de ser demitida por não render igual antes"], nextSteps: "Avaliar redução da capacidade laborativa e possibilidade de auxílio-acidente" },
    ],
  },
  {
    id: "18", clientName: "Sebastião José Campos", cpf: "334.455.667-78",
    contractType: "Aposentadoria Especial", status: "concluido", createdAt: "2026-03-16",
    phone: "(11) 95432-1098", email: "sebastiao.campos@email.com", address: "Rua Brigadeiro, 890 - São Bernardo/SP",
    benefitType: "Aposentadoria Especial",
    files: [...baseFiles(18, "2026-03-14"), { id: "f18h", name: "LTCAT.pdf", type: "pdf", size: "560 KB", date: "2026-03-22", description: "Laudo Técnico de Condições Ambientais" }],
    sdrNotes: [
      { sdrName: "Beatriz Lima", date: "2026-03-07", channel: "Indicação", clientMood: "tranquilo", summary: "Seu Sebastião veio indicado pelo sindicato dos metalúrgicos. Trabalha há 25 anos como soldador e está exposto a ruído acima de 85dB e fumos metálicos. Sindicato já orientou que tem direito à especial.", notes: ["25 anos como soldador em indústria automobilística", "PPP e LTCAT da empresa comprovam insalubridade", "Exposição a ruído + agentes químicos", "Sindicato acompanha o caso", "Muito tranquilo e bem orientado pelo sindicato"], nextSteps: "Caso bem documentado, preparar requerimento com PPP, LTCAT e documentação do sindicato" },
    ],
  },
  {
    id: "19", clientName: "Ivone Beatriz Cardoso", cpf: "445.566.778-89",
    contractType: "Pensão por Morte", status: "concluido", createdAt: "2026-03-03",
    phone: "(11) 97890-1234", email: "ivone.cardoso@email.com", address: "Rua Teodoro Sampaio, 245 - São Paulo/SP",
    benefitType: "Pensão por Morte",
    files: [...baseFiles(19, "2026-03-08"), { id: "f19h", name: "Certidão de Óbito.pdf", type: "pdf", size: "510 KB", date: "2026-03-19", description: "Certidão de óbito do segurado" }],
    sdrNotes: [
      { sdrName: "Lucas Martins", date: "2026-03-08", channel: "WhatsApp", clientMood: "emotivo", summary: "Ivone mandou mensagem dizendo que o companheiro faleceu de câncer após longa luta. Viviam em união estável há 12 anos mas nunca formalizaram. Ela está com medo de não ter direito à pensão por não ter papel.", notes: ["União estável de 12 anos sem registro em cartório", "Companheiro era funcionário público estadual", "Têm uma filha de 9 anos juntos", "Conta conjunta no banco e comprovantes de endereço conjunto", "Muito preocupada com o futuro da filha"], nextSteps: "Reunir provas de união estável (conta conjunta, fotos, declaração de vizinhos) e verificar regime previdenciário do companheiro" },
    ],
  },
  {
    id: "20", clientName: "Jorge Luís Teixeira", cpf: "556.677.889-90",
    contractType: "Aposentadoria por Idade", status: "concluido", createdAt: "2026-03-02",
    phone: "(11) 93210-5678", email: "jorge.teixeira@email.com", address: "Av. Rebouças, 1700 - São Paulo/SP",
    benefitType: "Aposentadoria por Idade",
    files: [...baseFiles(20, "2026-03-24"), { id: "f20h", name: "Comprovante Residência.pdf", type: "pdf", size: "290 KB", date: "2026-03-04", description: "Comprovante de endereço atualizado" }],
    sdrNotes: [
      { sdrName: "Amanda Souza", date: "2026-03-12", channel: "Presencial", clientMood: "tranquilo", summary: "Seu Jorge passou no escritório sem agendar, disse que mora ali perto e viu a placa. Tem 65 anos, trabalhou a vida toda como porteiro em condomínio. Quer se aposentar para voltar pro interior da Bahia e cuidar do sítio da família.", notes: ["Porteiro há 30 anos em condomínios da região", "Todos os registros em CTPS, bem documentado", "Quer voltar para Itabuna/BA onde tem família", "Muito simpático e bem-humorado", "Disse que vai mandar todos os porteiros do prédio virem aqui também"], nextSteps: "Caso simples com boa documentação, fazer análise do CNIS e protocolar requerimento" },
    ],
  },
];
