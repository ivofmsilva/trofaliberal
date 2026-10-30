// Dados da página "Metro para a Trofa" (/ideias/metro).
// O texto da nossa visão vem do comunicado em lib/imprensa.ts.

// Resposta da IL Trofa à consulta pública (Participa.pt). Quando tiveres o PDF,
// copia-o para public/metro/ e escreve aqui o caminho, por exemplo
// "/metro/resposta-participa.pdf". Enquanto for null, a página diz "em breve".
export const respostaParticipa: string | null = null;

// Início da contagem de dias à espera (a mesma data da imagem da "senha 9000").
// As fontes divergem entre 23 e 24 de fevereiro de 2002; a página diz só "fevereiro de 2002".
export const esperaDesde = "2002-02-23";

export function diasDesde(iso: string, agora: number = Date.now()): number {
  return Math.floor((agora - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000);
}

export const consulta = {
  nome: "Estudo de Impacte Ambiental da Linha ISMAI–Paradela (Metro do Porto até à Trofa)",
  inicio: "31 de agosto de 2026",
  fim: "12 de outubro de 2026",
  portal: "https://participa.pt",
};

// ---- O projeto atual -------------------------------------------------------
// Proporção do desenho: ≈3 km de metro ligeiro e ≈7 km de metrobus (30% / 70%).
export const projeto = {
  metroKm: "≈ 3 km",
  busKm: "≈ 7 km",
  fonte: {
    titulo: "Trofa TV",
    href: "https://trofatv.sapo.pt/estudo-de-impacte-ambiental-do-metro-ate-a-trofa-entra-em-consulta-publica-com-2-alternativas-para-o-atravessamento-da-en14/",
  },
};

// ---- Cronologia ------------------------------------------------------------
export type Facto = {
  quando: string;
  titulo: string;
  texto: string;
  fonte?: { nome: string; href: string };
};

export const cronologia: Facto[] = [
  {
    quando: "Fevereiro de 2002",
    titulo: "O ramal da Trofa fecha, com a promessa do metro",
    texto:
      "A linha ferroviária entre a Senhora da Hora e a Trofa é encerrada para ser convertida numa linha do Metro do Porto.",
    fonte: { nome: "Wikipédia — Linha de Guimarães", href: "https://pt.wikipedia.org/wiki/Linha_de_Guimar%C3%A3es" },
  },
  {
    quando: "26 de outubro de 2023",
    titulo: "A IL denuncia: “não é uma extensão de metro até à Trofa”",
    texto:
      "Em comunicado, os liberais alertam que o projeto combina metro e autocarro, com transbordo na estação do Muro.",
    fonte: {
      nome: "Correio da Manhã / Lusa",
      href: "https://www.cmjornal.pt/sociedade/detalhe/il-critica-expansao-do-metro-do-porto-e-recurso-a-metrobus-nas-novas-linhas",
    },
  },
  {
    quando: "18 de agosto de 2025",
    titulo: "A Metro do Porto admite o problema do transbordo",
    texto:
      "O presidente da Metro do Porto reconhece que mudar de veículo no Muro pode prejudicar a qualidade do serviço, mas defende que isso garante a sustentabilidade da operação.",
    fonte: {
      nome: "Público / Lusa",
      href: "https://www.publico.pt/2025/08/18/local/noticia/concursos-metro-chegar-gondomar-brt-trofa-lancados-inicio-2026-2144227",
    },
  },
  {
    quando: "31 de janeiro de 2026",
    titulo: "Metro até ao Muro, metrobus até Paradela",
    texto:
      "Confirma-se o desenho do projeto, com arranque previsto em 2026. O projeto é contestado por movimentos da região.",
    fonte: {
      nome: "Rádio Metropolitana Porto",
      href: "https://www.radiometropolitanaporto.pt/trofa-tera-metro-ate-ao-muro-e-ligacao-em-metrobus-ate-paradela-a-partir-de-2026/",
    },
  },
  {
    quando: "31 de agosto a 12 de outubro de 2026",
    titulo: "Consulta pública do projeto",
    texto:
      "O Estudo de Impacte Ambiental esteve em consulta pública no Participa.pt. A IL Trofa respondeu, defendendo o metro ligeiro até à Trofa.",
    fonte: {
      nome: "Trofa TV",
      href: "https://trofatv.sapo.pt/estudo-de-impacte-ambiental-do-metro-ate-a-trofa-entra-em-consulta-publica-com-2-alternativas-para-o-atravessamento-da-en14/",
    },
  },
  {
    quando: "Hoje",
    titulo: "0 km de metro no concelho da Trofa",
    texto: "Mais de duas décadas depois, o comboio não voltou e o metro ainda não chegou.",
  },
];

// ---- Metro vs metrobus (valores de referência) ------------------------------
// Valores do Certu (França, 2011), tal como reunidos pela IL Braga em bragaliberal.pt/brt.
export const comparacao = {
  linhas: [
    { criterio: "Construção da 1.ª linha", bus: "2 a 10 M€ por km", metro: "13 a 22 M€ por km" },
    { criterio: "Cada veículo", bus: "300 a 900 mil €", metro: "1,8 a 3 M€" },
    { criterio: "Exploração por km percorrido", bus: "3,5 a 5 €", metro: "6 a 10 €" },
    { criterio: "Vida útil dos veículos", bus: "10 a 15 anos", metro: "30 a 40 anos" },
  ],
  nota:
    "Olhando só para a obra, o autocarro ganha. Mas o próprio Certu conclui que, por lugar-quilómetro oferecido, os custos globais ao longo da vida útil dos dois sistemas se aproximam: o autocarro é mais barato de construir, mas mais caro de explorar, porque anda mais devagar e os veículos duram metade.",
  fonte:
    "Certu, Les coûts des transports collectifs urbains en site propre, ficha n.º 18, outubro de 2011 (valores de 2011, em França).",
};

export const estudos = [
  {
    valor: "35 vs 12,5",
    titulo: "Anos de vida: elétrico contra autocarro",
    texto:
      "Em França, os construtores estimam que um elétrico fica em serviço 35 anos e um autocarro de alto nível de serviço 12,5.",
    fonte: "Estudo FNAUT (2016), citado pela Banque des Territoires",
  },
  {
    valor: "2×",
    titulo: "O dobro da capacidade por veículo",
    texto:
      "Nas linhas analisadas pelo Tribunal de Contas norte-americano, os veículos de metro ligeiro levavam cerca do dobro dos passageiros dos autocarros de BRT.",
    fonte: "US GAO, Mass Transit: Bus Rapid Transit Shows Promise, GAO-01-984, 2001",
  },
  {
    valor: "75%",
    titulo: "Mais gente troca o carro pelo carril",
    texto:
      "Com o mesmo serviço, os passageiros preferem o elétrico ao autocarro: o estudo mediu um “fator ferroviário” de 75% para o elétrico.",
    fonte: "Scherer e Dziekan, Journal of Public Transportation, 2012",
  },
  {
    valor: "18 s",
    titulo: "Os corredores de autocarro de sucesso enchem",
    texto:
      "Ottawa foi um exemplo mundial de BRT, mas as projeções apontavam para um autocarro articulado a cada 18 segundos em 2031. A cidade avançou para o metro ligeiro: construir uma vez sai mais barato do que construir duas.",
    fonte: "ITDP, Ottawa Considers Moving from Bus Rapid Transit to Light Rail, 2011",
  },
];

// ---- A nossa posição (citações) --------------------------------------------
export const citacoes = [
  {
    texto: "Sobre o traçado, podemos discutir. Sobre o tipo de transporte, não.",
    autor: "Comunicado da IL Trofa",
    href: "/imprensa/comunicados/metro-ligeiro-ate-a-trofa",
  },
  {
    texto: "… não é uma extensão de metro até à Trofa.",
    autor: "IL Trofa, 26 de outubro de 2023",
    href: "https://www.cmjornal.pt/sociedade/detalhe/il-critica-expansao-do-metro-do-porto-e-recurso-a-metrobus-nas-novas-linhas",
  },
  {
    texto:
      "A Iniciativa Liberal da Trofa não aceita uma solução provisória, com mais promessas, para um problema estrutural.",
    autor: "Comunicado da IL Trofa",
    href: "/imprensa/comunicados/metro-ligeiro-ate-a-trofa",
  },
];

// ---- Campanha --------------------------------------------------------------
// Cartazes e materiais da campanha sobre o metro (ficheiros em public/images/cartazes/).
export const cartazesMetro = [
  {
    src: "/images/cartazes/cartaz-57.jpeg",
    w: 712,
    h: 956,
    legenda: "Metro para a Trofa já! Bus não é solução.",
  },
  {
    src: "/images/cartazes/cartaz-54.png",
    w: 532,
    h: 510,
    legenda: "O Muro perdeu o comboio. Não deixes que perca o metro. #MetroParaATrofaJá",
  },
  {
    src: "/images/cartazes/cartaz-58.jpeg",
    w: 502,
    h: 502,
    legenda: "Metro pelo centro! Mobilidade para servir a população.",
  },
  {
    src: "/images/cartazes/cartaz-56.jpeg",
    w: 533,
    h: 667,
    legenda: "Querias o Andante, dão-te o Atrasante.",
  },
];

// ---- Fontes ----------------------------------------------------------------
export const fontes = [
  { nome: "Trofa TV — Estudo de Impacte Ambiental em consulta pública (1/9/2026)", href: projeto.fonte.href },
  {
    nome: "Rádio Metropolitana Porto — Trofa terá metro até ao Muro e metrobus até Paradela (31/1/2026)",
    href: "https://www.radiometropolitanaporto.pt/trofa-tera-metro-ate-ao-muro-e-ligacao-em-metrobus-ate-paradela-a-partir-de-2026/",
  },
  {
    nome: "Público / Lusa — Concursos para metro a Gondomar e BRT à Trofa (18/8/2025)",
    href: "https://www.publico.pt/2025/08/18/local/noticia/concursos-metro-chegar-gondomar-brt-trofa-lancados-inicio-2026-2144227",
  },
  {
    nome: "Correio da Manhã / Lusa — IL critica expansão do Metro do Porto e o recurso a metrobus (26/10/2023)",
    href: "https://www.cmjornal.pt/sociedade/detalhe/il-critica-expansao-do-metro-do-porto-e-recurso-a-metrobus-nas-novas-linhas",
  },
  {
    nome: "IL Braga — BRT ou metro de superfície? (reúne os estudos citados acima: Certu, FNAUT, US GAO, Bruun, Scherer e Dziekan, ITDP)",
    href: "https://bragaliberal.pt/brt",
  },
];
