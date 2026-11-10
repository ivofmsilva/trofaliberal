// Cartazes marcantes da Iniciativa Liberal a nível nacional.
// As imagens estão em public/images/cartazes-nacionais/ (reproduções publicadas pela imprensa
// e pelas redes da IL); "fonte" aponta para a notícia de onde veio cada uma.
export type CartazNacional = {
  id: string;
  titulo: string;
  quando?: string;
  texto: string;
  w: number;
  h: number;
  fonte: { nome: string; href: string };
};

export const cartazesNacionais: CartazNacional[] = [
  {
    id: "libertem-infancia",
    titulo: "Libertem a infância",
    quando: "Março de 2021",
    texto: "Em plena pandemia, três baloiços vazios a pedir a abertura dos parques infantis. Foi apresentado no dia em que a IL entregou o projeto de resolução na Assembleia.",
    w: 900,
    h: 507,
    fonte: { nome: "Observador", href: "https://observador.pt/2021/03/30/libertem-a-infancia-iniciativa-liberal-pede-abertura-dos-parques-infantis/" },
  },
  {
    id: "impostopoly",
    titulo: "Impostopoly",
    quando: "Setembro de 2019",
    texto: "O Monopólio dos impostos: «o jogo em que todos perdem». Defendia uma taxa única de IRS e teve só dois exemplares, em Lisboa e no Porto.",
    w: 840,
    h: 471,
    fonte: { nome: "Observador", href: "https://observador.pt/2019/09/25/impostopoly-iniciativa-liberal-com-nova-campanha-contra-o-ps-nas-ruas-de-lisboa/" },
  },
  {
    id: "com-primos",
    titulo: "#ComPrimos",
    quando: "Agosto de 2019",
    texto: "A resposta ao «#cumprimos» do PS, colocada mesmo ao lado. O outdoor que mais rendeu à IL na campanha de 2019.",
    w: 1200,
    h: 800,
    fonte: { nome: "Correio da Manhã", href: "https://www.cmjornal.pt/politica/detalhe/iniciativa-liberal-inspira-se-em-filme-tres-cartazes-a-beira-da-estrada-para-criticar-partido-socialista" },
  },
  {
    id: "aproxima-te",
    titulo: "Aproxima-te das nossas ideias",
    quando: "Setembro de 2019",
    texto: "O programa eleitoral inteiro num outdoor, com uma escada para subir e ler as propostas ao vivo.",
    w: 960,
    h: 540,
    fonte: { nome: "Notícias ao Minuto", href: "https://www.noticiasaominuto.com/politica/1325936/o-programa-todo-num-cartaz-sim-e-mais-um-outdoor-da-iniciativa-liberal" },
  },
  {
    id: "vira-disco",
    titulo: "Vira o disco e são sempre os mesmos",
    texto: "Um vinil a girar a mostrar que, mudando o disco, a música é a mesma. O liberalismo é outro ritmo.",
    w: 1200,
    h: 900,
    fonte: { nome: "Visão", href: "https://visao.pt/atualidade/politica/2021-07-23-costa-covpide-e-outros-cartazes-polemicos-da-iniciativa-liberal/" },
  },
  {
    id: "apertem-cinto",
    titulo: "Apertem ainda mais o cinto",
    texto: "Sobre o apoio público à TAP: um aviso aos contribuintes no Saldanha, em Lisboa, com cópia junto ao aeroporto.",
    w: 960,
    h: 720,
    fonte: { nome: "Jornal Económico", href: "https://jornaleconomico.sapo.pt/noticias/iniciativa-liberal-repoe-costa-e-marcelo-furtados-na-semana-passada-598728/" },
  },
  {
    id: "aviao-brincar",
    titulo: "TAP: Todos a Pagar",
    texto: "A campanha contra o dinheiro dos contribuintes na TAP, no acesso ao aeroporto Sá Carneiro, no Porto.",
    w: 960,
    h: 673,
    fonte: { nome: "Jornal Económico", href: "https://jornaleconomico.sapo.pt/noticias/pedro-nuno-santos-marxista-e-guevarista-e-estrela-de-novo-cartaz-da-iniciativa-liberal-615865/" },
  },
  {
    id: "dia-crianca",
    titulo: "A TAP é para eu brincar",
    quando: "Dia da Criança",
    texto: "A mesma ideia levada às redes sociais no Dia da Criança.",
    w: 1080,
    h: 1080,
    fonte: { nome: "Visão", href: "https://visao.pt/atualidade/politica/2021-07-23-costa-covpide-e-outros-cartazes-polemicos-da-iniciativa-liberal/" },
  },
];
