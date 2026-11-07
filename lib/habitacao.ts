// Conteúdo da página /ideias/habitacao. Fonte: capítulo 1 (Habitação) do Programa Eleitoral
// Autárquico 2025, public/programas/programa-trofa-para-cima.pdf (páginas 5 a 12).

export type Grupo = { titulo?: string; medidas: string[] };

export type Ponto = {
  n: number;
  titulo: string;
  intro: string;
  grupos: Grupo[];
};

export const programaHref = "/programas/programa-trofa-para-cima.pdf#page=5";

// Compromissos do programa que se podem medir.
export const numeros = [
  {
    valor: "40",
    legenda: "dias úteis de prazo médio de licenciamento, quando não são precisos pareceres externos",
    fonte: "Programa eleitoral, ponto 2.1",
  },
  {
    valor: "0 €",
    legenda: "de taxas urbanísticas para quem constrói a sua primeira habitação",
    fonte: "Programa eleitoral, ponto 1.2",
  },
  {
    valor: "24/7",
    legenda: "esclarecimento de dúvidas técnicas, com um chatbot no Gabinete do Construtor 2.0",
    fonte: "Programa eleitoral, ponto 2.2",
  },
  {
    valor: "2 meses",
    legenda: "é o máximo que uma casa municipal pode estar vaga entre dois inquilinos",
    fonte: "Programa eleitoral, ponto 4",
  },
];

// O cartaz da campanha nacional "Manual para construir uma casa em Portugal".
export const passosParaConstruir = [
  "Consultar o Plano Diretor Municipal",
  "Fazer um pedido de informação prévia",
  "Submeter um projeto de Arquitetura",
  "Submeter projetos de especialidade",
  "Pedir o alvará de construção",
  "Certificado energético",
  "Certificado acústico",
  "Inspeção da água",
  "Inspeção da luz",
  "Inspeção do gás",
  "Pagar as telas finais",
  "Licença de utilização",
  "Certificado de infraestrutura",
  "Aprovar a ficha técnica",
  "Alterar os documentos junto das Finanças",
];

export const principios = [
  {
    titulo: "Mais oferta",
    texto:
      "A forma mais eficaz de baixar os preços da habitação é aumentar a oferta. Para isso é preciso remover entraves à construção e mobilizar o que hoje está parado.",
  },
  {
    titulo: "Menos burocracia",
    texto:
      "A Câmara deve deixar de ser um entrave e passar a ser um facilitador: digitalizar, desburocratizar, acelerar, dar prazos e responsabilizar.",
  },
  {
    titulo: "Respeito pela propriedade",
    texto:
      "A propriedade privada é um pilar da liberdade e da prosperidade local. Os proprietários são parceiros, não obstáculos.",
  },
];

export const pontos: Ponto[] = [
  {
    n: 1,
    titulo: "Aumentar a oferta com liberdade e iniciativa privada",
    intro:
      "A Câmara deve planear de forma descentralizada e transparente a gestão do território. Deve garantir liberdade, regras claras e neutralidade fiscal a quem quer investir e viver na Trofa.",
    grupos: [
      {
        titulo: "Património público ao serviço da comunidade",
        medidas: [
          "Mapear todo o património do Estado e da Câmara com potencial habitacional ou comercial, e publicá-lo numa plataforma digital aberta a todos",
          "Gestão municipal dos imóveis devolutos do Estado, ao abrigo do Decreto-Lei n.º 106/2018",
          "Parcerias com privados e com o setor social para reabilitar e reconverter imóveis devolutos",
          "Venda, arrendamento ou direito de superfície do património público ocioso, com total transparência",
          "Usar os fundos disponíveis em projetos municipais de habitação",
        ],
      },
      {
        titulo: "Construir com liberdade e escala",
        medidas: [
          "Reduzir as taxas urbanísticas e eliminá-las na primeira habitação",
          "Construção em altura nos centros, com respeito pelas normas urbanísticas e sem dirigismo camarário",
          "Isenção de taxas para habitação em zonas estratégicas de desenvolvimento",
          "Construir em terrenos municipais através de contratos de superfície, com contrapartida em habitação acessível",
        ],
      },
    ],
  },
  {
    n: 2,
    titulo: "A revolução no licenciamento: simples, rápido e digital",
    intro:
      "Os licenciamentos são hoje um dos maiores bloqueios ao aumento da oferta. Quando um processo se arrasta, encarece o projeto e desmotiva quem quer investir.",
    grupos: [
      {
        titulo: "Acelerador de processos",
        medidas: [
          "Prazo médio de licenciamento de 40 dias úteis, quando não são necessários pareceres externos",
          "Passar licenciamentos prévios a fiscalizações posteriores sempre que possível, com responsabilidade técnica",
          "Incentivar a certificação de Revisores de Projeto Acreditados",
          "Apoio prioritário aos processos de primeira habitação",
          "Inteligência Artificial para automatizar processos administrativos repetitivos",
          "Simplificar a reconversão de uso, por exemplo de comercial para habitação",
        ],
      },
      {
        titulo: "Gabinete do Construtor 2.0",
        medidas: [
          "Manual técnico digital com regras claras, e todas as regras urbanísticas do concelho online",
          "Chatbot para esclarecer dúvidas técnicas 24 horas por dia",
          "Portal de licenciamento onde se acompanha o estado do processo, os pareceres e os tempos médios de resposta, com alertas automáticos em caso de atraso",
          "Submissão única de pedidos, com integração automática nas entidades externas",
          "Gestor de projeto municipal, para acompanhar e dar resposta rápida a cada projeto que dá entrada na Câmara",
          "Projetos geridos segundo as boas práticas do BIM (Building Information Modeling)",
          "Digitalização e reorganização de todos os processos urbanísticos antigos",
        ],
      },
      {
        titulo: "Planeamento com dados e visão a longo prazo",
        medidas: [
          "Atualização permanente da Estratégia Local de Habitação, com novos dados demográficos, migratórios e de preços",
          "Apoiar a revisão do PDM, com regras paramétricas e liberdade de uso do solo",
          "Zonas especiais de urbanização junto às estações da futura linha de metro",
          "Mapa interativo do território, com filtros para IMI, zonas de construção, equipamentos públicos e mais",
          "Defender a propriedade privada, rejeitar a política de expropriações e tolerância zero para ocupações indevidas",
        ],
      },
    ],
  },
  {
    n: 3,
    titulo: "Mais mercado no arrendamento e estímulo à reabilitação",
    intro:
      "A melhor habitação é muitas vezes a que já existe. Em vez de controlar rendas, removemos barreiras e reduzimos o peso fiscal de quem quer pôr casas no mercado.",
    grupos: [
      {
        titulo: "Reabilitação e arrendamento livre",
        medidas: [
          "Reduzir as taxas de licenciamento da reabilitação urbana, e isentar os imóveis reabilitados com arrendamento duradouro (modelo Build to Rent)",
          "Lutar pela redução do IMI nos imóveis reabilitados para arrendamento acessível e duradouro",
          "Apoios municipais a pequenas obras de adaptação, com adiantamento de rendas para reabilitação",
          "Fundo de Reabilitação Urbana municipal, com possível cofinanciamento privado",
          "Protocolo com proprietários de imóveis devolutos que não têm meios para reabilitar: reabilitam-se e são colocados no mercado por pelo menos 10 anos",
          "Simplificar processos e facilitar o acesso a financiamento para a requalificação",
          "Prémio “Regeneração Urbana” para boas práticas, e um Manual da Reabilitação Urbana para orientar os munícipes",
          "Rever e alargar as Áreas de Reabilitação Urbana (ARU), com critérios técnicos e não arbitrários",
        ],
      },
      {
        titulo: "Plataforma municipal de arrendamento acessível",
        medidas: [
          "Intermediação entre proprietários e arrendatários, com acompanhamento técnico",
          "Inclusão de património público municipal no programa",
          "Abertura a promotores que ofereçam rendas abaixo do mercado, mediante contrapartidas",
        ],
      },
    ],
  },
  {
    n: 4,
    titulo: "Habitação social: foco na autonomia e na dignidade",
    intro:
      "A habitação social deve apoiar quem realmente precisa, por tempo limitado e com responsabilidade, e permitir que quem hoje recebe apoio se torne amanhã proprietário e autónomo.",
    grupos: [
      {
        medidas: [
          "Avaliação rigorosa e periódica das condições de acesso e de permanência",
          "Modelo de “renda resolúvel”: o inquilino compra a casa de forma progressiva",
          "Venda condicionada a preços controlados, sem revenda nem permuta durante 10 anos",
          "Publicar online a localização, a tipologia e o estado de todos os fogos sociais",
          "Resposta urgente para vítimas de violência doméstica, seniores isolados e outras emergências",
          "Apoio municipal a pequenas obras para famílias em situação de carência",
          "Melhorias energéticas e ambientais no parque municipal (painéis solares, isolamento), e bairros mais seguros, com melhor iluminação",
          "Fiscalização ativa para evitar a sobrelotação",
          "Nenhuma casa municipal vaga mais de dois meses entre inquilinos",
        ],
      },
    ],
  },
  {
    n: 5,
    titulo: "Apoiar os jovens a começar",
    intro:
      "Não por paternalismo, mas por justiça geracional: um apoio limitado, que promova a autonomia, e menos impostos para quem quer ser independente.",
    grupos: [
      {
        medidas: [
          "Programa municipal de apoio à renda jovem",
          "Copagamento temporário de rendas ou de prestações bancárias na fase de instalação",
          "Alojamento temporário em edifícios municipais reabilitados, para jovens e para profissionais deslocados, como professores ou médicos",
          "Residências jovens em parceria com instituições de ensino",
        ],
      },
    ],
  },
  {
    n: 6,
    titulo: "Novas formas de habitar",
    intro:
      "Cooperativas, co-living, arrendamento rotativo, residências jovens. O município deve facilitar soluções inovadoras e não travar a liberdade de escolha.",
    grupos: [
      {
        medidas: [
          "Apoio a cooperativas habitacionais privadas, com acesso simplificado a terrenos municipais",
          "Co-habitação, sobretudo intergeracional, entre seniores ativos e jovens ou pessoas de meia-idade",
          "Estúdios de curta duração, até seis meses, para quem inicia atividade na Trofa",
          "Projetos híbridos que juntem habitação, serviços e comércio, para reduzir deslocações",
          "Projetos-piloto de habitação modular, rápida e sustentável",
          "Avaliar a pré-aprovação ou a aceleração de projetos standard, nomeadamente pré-fabricados",
        ],
      },
    ],
  },
];
