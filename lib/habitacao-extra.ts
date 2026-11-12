// Conteúdo extra da página /ideias/habitacao. Tudo vem do capítulo da Habitação do Programa
// Eleitoral Autárquico 2025 (public/programas/programa-trofa-para-cima.pdf, páginas 5 a 12).

// "O que muda para ti": as medidas do programa agrupadas por situação.
export type Perfil = { id: string; titulo: string; resumo: string; medidas: string[] };

export const perfis: Perfil[] = [
  {
    id: "familias",
    titulo: "Quero comprar casa",
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
      "Rejeitar a banalização das expropriações (só em casos excecionais) e tolerância zero para ocupações indevidas",
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
    resumo: "Para os jovens que começam e para quem está em dificuldade: apoio limitado, com caminho para a autonomia.",
    medidas: [
      "Programa municipal de apoio à renda jovem",
      "Copagamento temporário de rendas ou de prestações bancárias na fase de instalação",
      "Alojamento temporário em edifícios municipais reabilitados, para jovens deslocados",
      "Residências jovens em parceria com instituições de ensino",
      "Estúdios de curta duração, até seis meses, para quem inicia atividade na Trofa",
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
    resposta: "Um portal digital com pedido único, acompanhamento do processo e alertas de atraso, e um prazo médio de 40 dias úteis quando não são precisos pareceres externos.",
  },
  {
    problema: "A construção nova esteve parada, por falta de incentivos, excesso de taxas e insegurança nos processos",
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
