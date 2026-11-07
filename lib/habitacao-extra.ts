// Conteúdo extra da página /ideias/habitacao. Tudo vem do capítulo da Habitação do Programa
// Eleitoral Autárquico 2025 (public/programas/programa-trofa-para-cima.pdf, páginas 5 a 12).

// "O que muda para ti": as medidas do programa agrupadas por situação.
export type Perfil = { id: string; titulo: string; resumo: string; medidas: string[] };

export const perfis: Perfil[] = [
  {
    id: "jovens",
    titulo: "Sou jovem",
    resumo: "Apoio limitado, que promove a autonomia, e menos impostos para quem quer ser independente.",
    medidas: [
      "Programa municipal de apoio à renda jovem",
      "Copagamento temporário de rendas ou de prestações bancárias na fase de instalação",
      "Alojamento temporário em edifícios municipais reabilitados, para jovens deslocados",
      "Residências jovens em parceria com instituições de ensino",
      "Estúdios de curta duração, até seis meses, para quem inicia atividade na Trofa",
      "Sem taxas urbanísticas na primeira habitação",
    ],
  },
  {
    id: "familias",
    titulo: "Quero a minha primeira casa",
    resumo: "Menos custos e menos espera para quem constrói ou compra a primeira habitação.",
    medidas: [
      "Eliminar as taxas urbanísticas na primeira habitação",
      "Apoio prioritário aos processos de primeira habitação",
      "Prazo médio de licenciamento de 40 dias úteis, quando não são precisos pareceres externos",
      "Apoio a cooperativas habitacionais privadas, com acesso simplificado a terrenos municipais",
      "Construção em altura nos centros, para haver mais oferta",
    ],
  },
  {
    id: "construir",
    titulo: "Quero construir ou investir",
    resumo: "Um município que facilita: regras claras, processos digitais e prazos.",
    medidas: [
      "Gabinete do Construtor 2.0, com manual técnico digital e chatbot 24 horas por dia",
      "Portal de licenciamento com acompanhamento do processo, tempos médios de resposta e alertas de atraso",
      "Submissão única de pedidos, com integração automática nas entidades externas",
      "Gestor de projeto municipal para cada projeto que dá entrada na Câmara",
      "Licenciamentos prévios passados a fiscalizações posteriores sempre que possível",
      "Zonas especiais de urbanização junto às estações da futura linha de metro",
      "Contratos de superfície em terrenos municipais, com contrapartida em habitação acessível",
    ],
  },
  {
    id: "proprietarios",
    titulo: "Tenho um imóvel",
    resumo: "Os proprietários são parceiros e não obstáculos: incentivos para reabilitar e arrendar.",
    medidas: [
      "Reduzir as taxas de licenciamento da reabilitação e isentar os imóveis reabilitados com arrendamento duradouro (Build to Rent)",
      "Lutar pela redução do IMI nos imóveis reabilitados para arrendamento acessível",
      "Fundo de Reabilitação Urbana municipal, com possível cofinanciamento privado",
      "Protocolo para reabilitar imóveis devolutos de quem não tem meios, colocando-os no mercado por pelo menos 10 anos",
      "Rejeitar a política de expropriações e tolerância zero para ocupações indevidas",
    ],
  },
  {
    id: "arrendar",
    titulo: "Procuro casa para arrendar",
    resumo: "Mais casas no mercado e uma ponte entre quem tem e quem procura.",
    medidas: [
      "Plataforma municipal de arrendamento acessível, com intermediação e acompanhamento técnico",
      "Promotores com rendas abaixo do mercado, mediante contrapartidas",
      "Arrendamento flexível e estúdios de curta duração para quem está de passagem",
      "Mapa interativo do território, com filtros para IMI, zonas de construção e equipamentos públicos",
    ],
  },
  {
    id: "apoio",
    titulo: "Preciso de apoio",
    resumo: "Habitação social por tempo limitado, com dignidade e com caminho para a autonomia.",
    medidas: [
      "Renda resolúvel: o inquilino compra a casa de forma progressiva",
      "Resposta urgente para vítimas de violência doméstica, seniores isolados e outras emergências",
      "Apoio municipal a pequenas obras para famílias em situação de carência",
      "Melhorias energéticas nas casas municipais (painéis solares, isolamento) e bairros com melhor iluminação",
      "Nenhuma casa municipal vaga mais de dois meses entre inquilinos",
      "Publicar online a localização, a tipologia e o estado de todos os fogos sociais",
    ],
  },
];

// Do problema à resposta, com as palavras do programa.
export const problemaResposta = [
  {
    problema: "Os licenciamentos são um dos maiores bloqueios ao aumento da oferta",
    resposta: "Um portal digital com pedido único, acompanhamento do processo e alertas de atraso, e prazos obrigatórios.",
  },
  {
    problema: "A construção nova está parada, por falta de incentivos, excesso de taxas e insegurança nos processos",
    resposta: "Menos taxas urbanísticas, nenhuma na primeira habitação, e a construção em altura nos centros.",
  },
  {
    problema: "Imóveis devolutos e património público sem uso, sem que se saiba o que existe",
    resposta: "O mapeamento de todo o património, publicado numa plataforma aberta, e parcerias para o reabilitar.",
  },
  {
    problema: "O arrendamento só é viável se for financeiramente atrativo",
    resposta: "Menos peso fiscal e mais estabilidade para quem arrenda, em vez de controlar rendas.",
  },
];

export const perguntas: { p: string; r: string; href?: string; hrefLabel?: string }[] = [
  {
    p: "Porque é que mais casas baixam os preços?",
    r: "O aumento dos preços resulta da escassez de oferta e da complexidade dos licenciamentos. A forma mais eficaz de baixar os preços da habitação é aumentar a oferta disponível, removendo entraves à construção, atraindo investimento privado e mobilizando recursos que estão hoje parados.",
  },
  {
    p: "Vão controlar as rendas?",
    r: "Não. O arrendamento só se torna viável se for financeiramente atrativo, por isso, em vez de controlar rendas, queremos remover barreiras e reduzir o peso fiscal de quem quer pôr casas no mercado. É com incentivos, estabilidade e segurança jurídica que se atrai mais oferta, e é isso que permite baixar os preços.",
  },
  {
    p: "E quem não consegue comprar nem arrendar?",
    r: "Há apoio direto e limitado para os jovens (renda jovem, copagamento temporário de rendas ou prestações), uma plataforma municipal de arrendamento acessível, e habitação social por tempo limitado, com o modelo de renda resolúvel para quem quiser vir a ser proprietário.",
  },
  {
    p: "O que acontece à propriedade privada?",
    r: "É respeitada. A propriedade privada é um pilar da liberdade individual e da prosperidade local. As expropriações só devem ser equacionadas em casos absolutamente excecionais, fundamentados e com compensação justa e célere. E há tolerância zero para ocupações indevidas.",
  },
  {
    p: "Como é a habitação social no vosso modelo?",
    r: "Existe para apoiar quem realmente precisa, por tempo limitado e com responsabilidade, com avaliação periódica das condições de acesso. Quem lá vive pode comprar a casa por renda resolúvel, com preços controlados e sem revenda nem permuta durante 10 anos. Tudo com transparência: a localização, a tipologia e o estado dos fogos publicados online.",
  },
  {
    p: "Isto tem a ver com o Metro?",
    r: "Tem. O programa propõe zonas especiais de urbanização junto às estações da futura linha de metro, para que a mobilidade e a habitação cresçam juntas.",
    href: "/ideias/metro",
    hrefLabel: "Ver a nossa visão do Metro",
  },
];
