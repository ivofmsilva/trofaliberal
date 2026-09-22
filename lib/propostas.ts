export type Documento = {
  titulo: string;
  subtitulo?: string;
  // Sem href o cartão mostra "Em breve" até haver o PDF / link.
  href?: string;
};

export const documentos: Documento[] = [
  {
    titulo: "Manifesto pela Educação: Trofa no Topo da Educação",
    subtitulo: "As medidas que colocarão a Trofa no topo da educação a nível nacional.",
  },
  {
    titulo: "Manifesto pela Mobilidade: Menos Sinistralidade, Mais Segurança na Mobilidade",
  },
  {
    titulo: "Programa Eleitoral Autárquico 2025",
    href: "/programas/programa-trofa-para-cima.pdf",
  },
];

export type Area = {
  nome: string;
  lema: string;
  medidas: string[];
};

export const areas: Area[] = [
  {
    nome: "Habitação",
    lema: "Mais liberdade para viver, construir e investir",
    medidas: [
      "Reduzir prazos de licenciamento para 40 dias úteis",
      "Eliminar taxas urbanísticas para primeira habitação",
      "Digitalizar processos de licenciamento",
      "Criar Gabinete do Construtor 2.0",
      "Promover construção em altura nos centros",
      "Programa municipal de arrendamento acessível",
    ],
  },
  {
    nome: "Educação",
    lema: "Liberdade para aprender, autonomia para crescer",
    medidas: [
      "Autonomia escolar com contratos-programa a 3 anos",
      "Publicar indicadores de desempenho das escolas",
      "Biblioteca Municipal com salas de estudo 24h",
      "Feira de Saídas Profissionais da Trofa",
      "Bolsas de mérito para melhores alunos",
      "Ligação escola-empresa através de estágios",
    ],
  },
  {
    nome: "Modernização da Câmara",
    lema: "Uma câmara ao serviço das pessoas",
    medidas: [
      "Portal único para todos os serviços municipais",
      "Princípio “uma só vez” — não repetir informação",
      "App municipal com funcionalidades práticas",
      "Portal de transparência com dados em tempo real",
      "Provedor do Munícipe independente",
      "Digitalização completa do arquivo municipal",
    ],
  },
  {
    nome: "Economia e Emprego",
    lema: "Liberdade para crescer",
    medidas: [
      "Balcão Único do Investidor",
      "Reduzir a derrama municipal",
      "Criar novas zonas industriais",
      "Eliminar taxas injustificadas",
      "Revitalizar a Rua Conde São Bento",
      "Observatório Local da Economia",
    ],
  },
  {
    nome: "Mobilidade",
    lema: "Uma mobilidade eficiente e inovadora",
    medidas: [
      "Rede inter-freguesias com minibus sob procura",
      "Ciclovias funcionais e conectadas",
      "App municipal com horários em tempo real",
      "Exigir o prolongamento do Metro até à estação da Trofa",
      "Melhorar acessos rodoviários em pontos críticos",
      "Zonas de interligação modal",
    ],
  },
  {
    nome: "Ambiente",
    lema: "Ambiente responsável e planeamento com liberdade",
    medidas: [
      "Mais ecopontos em locais estratégicos",
      "Contentores enterrados em todo o concelho",
      "Ecopontos especializados com sistema de pontuação",
      "Plano de manutenção preventiva de linhas de água",
      "Sensores de qualidade da água nos cursos de água",
      "Orçamento Verde Participativo",
    ],
  },
  {
    nome: "Saúde e Desporto",
    lema: "Saúde preventiva e desporto com liberdade",
    medidas: [
      "Plano municipal de literacia em saúde",
      "Piscina municipal descoberta",
      "Regulamento transparente de acesso a equipamentos",
      "Espaços desportivos em todas as freguesias",
      "Plano Local de Saúde Mental",
      "Gabinete de Apoio ao Cuidador Informal",
    ],
  },
  {
    nome: "Fiscalidade",
    lema: "Menos impostos, mais liberdade",
    medidas: [
      "Reduzir a participação no IRS de 4,0% para 2,0%",
      "Baixar o IMI para o valor mínimo legal",
      "Reduzir a derrama de 1,5% para 0,75%",
      "Eliminar taxas desnecessárias",
      "Isenção automática de taxas inferiores a 10€",
      "Não criar novas taxas durante o mandato",
    ],
  },
  {
    nome: "Cultura e Lazer",
    lema: "A cultura não se impõe — cria-se",
    medidas: [
      "Regulamento transparente de apoio à criação cultural",
      "Museu da identidade trofense",
      "Pavilhão multiusos para eventos",
      "Casa da Juventude da Trofa",
      "Valorização do Castro de Alvarelhos",
      "Roteiro Cultural da Trofa digital",
    ],
  },
  {
    nome: "Ação Social",
    lema: "Liberdade e responsabilidade",
    medidas: [
      "Regulamento transparente de apoio ao associativismo",
      "Contratos de compromisso com beneficiários",
      "Cartão Diamante para apoio variável aos munícipes",
      "Programa de visitas domiciliárias a idosos",
      "Plano municipal de integração de imigrantes",
      "Estimular voluntariado e redes de vizinhança",
    ],
  },
];
