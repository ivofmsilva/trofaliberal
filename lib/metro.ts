// Dados da página "Metro para a Trofa" (/ideias/metro).
// O texto da nossa visão vem do comunicado em lib/imprensa.ts.

// Participação da IL Trofa na consulta pública (Participa.pt), entregue a 12 de outubro de 2026.
export const participacao = {
  pdf: "/metro/resposta-participa.pdf",
  processo: "Processo de AIA n.º 3950 · Linha LT ISMAI–Paradela",
  assinatura: "Bruno Magalhães, coordenador do núcleo",
  data: "12 de outubro de 2026",
  posicao:
    "Defendemos metro ligeiro em toda a linha, até ao Interface da Trofa. É a posição do núcleo desde a sua fundação. A linha foi desativada em 2002 com a promessa do metro e, vinte e quatro anos depois, o projeto serve o centro da Trofa com autocarro, sem que essa escolha tenha sido comparada com o metro.",
  pedidos: [
    "Avaliar o metro ligeiro até ao Interface da Trofa face à solução proposta: procura, tempos de viagem, efeitos ambientais e custo a 30 anos.",
    "Publicar os estudos que fundamentam o metrobus, com dados atualizados, e reabrir a participação pública.",
    "Garantir que o troço ISMAI–Muro avança no calendário previsto, sem depender desta reavaliação.",
    "Se o metrobus for aprovado, impor na Declaração de Impacte Ambiental que viadutos, túnel, canal e cais sejam dimensionados para metro ligeiro, com o custo de conversão publicado e uma data (ou um patamar de procura) para a desencadear.",
    "Detalhar a integração no Interface e aproximar as estações das zonas residenciais, dos serviços e do comércio.",
  ],
};

export const consulta = {
  nome: "Estudo de Impacte Ambiental da Linha ISMAI–Paradela (Metro do Porto até à Trofa)",
  inicio: "31 de agosto de 2026",
  fim: "12 de outubro de 2026",
  portal: "https://participa.pt",
};

// Início da contagem de dias à espera (a mesma data da imagem da "senha 9000").
// As fontes divergem entre 23 e 24 de fevereiro de 2002; a página diz só "fevereiro de 2002".
export const esperaDesde = "2002-02-23";

export function diasDesde(iso: string, agora: number = Date.now()): number {
  return Math.floor((agora - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000);
}

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

// ---- História --------------------------------------------------------------
export type Fonte = { nome: string; href: string };

export type Facto = {
  quando: string;
  titulo: string;
  texto: string;
  fontes?: Fonte[];
  // Ligação interna (ex.: "#participacao") em vez de fonte externa.
  ligacao?: { nome: string; href: string };
};

const JPN2012: Fonte = {
  nome: "JPN — A Trofa ainda espera pela linha verde (2012)",
  href: "https://www.jpn.up.pt/2012/12/07/10-anos-do-metro-do-porto-a-trofa-ainda-espera-pela-linha-verde/",
};
const JN2021: Fonte = {
  nome: "JN — Duas décadas à espera que a linha de metro da Trofa saia do papel (2021)",
  href: "https://www.jn.pt/pais/artigo/duas-decadas-a-espera-que-a-linha-de-metro-da-trofa-saia-do-papel/13926272",
};
const ONT2019: Fonte = {
  nome: "O Notícias da Trofa — Foi há quase duas décadas que a Trofa ficou mais pobre (2019)",
  href: "https://www.onoticiasdatrofa.pt/foi-ha-quase-duas-decadas-que-a-trofa-ficou-mais-pobre/",
};
const METRO2008: Fonte = {
  nome: "Metro do Porto — Desenvolvimento do sistema de metro ligeiro (1 de outubro de 2008)",
  href: "https://www.metrodoporto.pt/uploads/document/file/69/2__e_3__fases_da_rede_do_Metro_do_Porto.pdf",
};
const JN2022: Fonte = {
  nome: "JN — Uma carta aberta e “ações à moda da Trofa” para reivindicar o metro (23/2/2022)",
  href: "https://www.jn.pt/pais/artigo/uma-carta-aberta-e-acoes-a-moda-da-trofa-para-reivindicar-o-metro/14618440",
};
const ONT2022: Fonte = {
  nome: "O Notícias da Trofa — Sérgio Humberto não quer metro a passar pelos parques e pela Alameda (19/11/2022)",
  href: "https://www.onoticiasdatrofa.pt/sergio-humberto-nao-quer-metro-a-passar-pelos-parques-e-pela-alameda-e-anuncia-novo-tracado/",
};
const OMINHO2023: Fonte = {
  nome: "O Minho — Chegada do metro à Trofa é agora ou nunca, diz autarca (12/10/2023)",
  href: "https://ominho.pt/chegada-do-metro-a-trofa-e-agora-ou-nunca-diz-autarca/",
};
const CM2023: Fonte = {
  nome: "Correio da Manhã / Lusa — IL critica expansão do Metro do Porto e o recurso a metrobus (26/10/2023)",
  href: "https://www.cmjornal.pt/sociedade/detalhe/il-critica-expansao-do-metro-do-porto-e-recurso-a-metrobus-nas-novas-linhas",
};
const PUBLICO2025: Fonte = {
  nome: "Público / Lusa — Concursos para metro a Gondomar e BRT à Trofa (18/8/2025)",
  href: "https://www.publico.pt/2025/08/18/local/noticia/concursos-metro-chegar-gondomar-brt-trofa-lancados-inicio-2026-2144227",
};
const RMP2026: Fonte = {
  nome: "Rádio Metropolitana Porto — Trofa terá metro até ao Muro e metrobus até Paradela (31/1/2026)",
  href: "https://www.radiometropolitanaporto.pt/trofa-tera-metro-ate-ao-muro-e-ligacao-em-metrobus-ate-paradela-a-partir-de-2026/",
};

export const cronologia: Facto[] = [
  {
    quando: "1996 a 2003",
    titulo: "O primeiro projeto: a Trofa na 1.ª fase do metro",
    texto:
      "A linha da Trofa faz parte da primeira fase da rede do Metro do Porto, com projetos desde 1996 e abertura prevista para 2003.",
    fontes: [JN2021, JPN2012],
  },
  {
    quando: "Fevereiro de 2002",
    titulo: "O comboio sai para dar lugar ao metro",
    texto:
      "O serviço ferroviário até à Trofa é suprimido para dar lugar ao metro. Os carris do metro nunca chegaram a ser assentes e os autocarros ocuparam o lugar do comboio.",
    fontes: [JPN2012, ONT2019],
  },
  {
    quando: "Março de 2006",
    titulo: "O metro chega ao ISMAI e pára",
    texto: "A Linha C fica concluída até ao ISMAI, na Maia. Daí até à Trofa, nada.",
    fontes: [ONT2019],
  },
  {
    quando: "1 de outubro de 2008",
    titulo: "O segundo projeto: 8 estações, 140 milhões, abertura em 2012",
    texto:
      "A Metro do Porto apresenta o prolongamento do ISMAI à Trofa: 10,7 km, com estações em Ribela, Muro, Serra, Bougado, Pateiras, Senhora das Dores, Trofa e Paradela, e entrada em funcionamento em 2012.",
    fontes: [METRO2008],
  },
  {
    quando: "2010",
    titulo: "O projeto sai do plano",
    texto:
      "A Metro do Porto retira o prolongamento à Trofa do seu plano de atividades. Uma petição com mais de 8000 assinaturas segue para a Assembleia da República.",
    fontes: [JPN2012],
  },
  {
    quando: "2017",
    titulo: "A Câmara leva o Estado e a Metro do Porto a tribunal",
    texto: "Sem metro e sem comboio, o município recorre aos tribunais.",
    fontes: [JN2021],
  },
  {
    quando: "23 de fevereiro de 2022",
    titulo: "“Uma questão de justiça”",
    texto:
      "O presidente da Câmara, Sérgio Humberto, lembra que “foi retirado o comboio com a promessa da vinda do metro, e esta é uma questão de justiça”, e avisa que a Trofa pode avançar com “ações à moda da Trofa”.",
    fontes: [JN2022],
  },
  {
    quando: "19 de novembro de 2022",
    titulo: "O presidente da Câmara quer um novo traçado, em túnel",
    texto:
      "Sérgio Humberto diz não querer o metro nos parques nem na Alameda da Estação e propõe um túnel pelo monte de Valdeirigo até à Avenida 19 de Novembro, junto ao interface.",
    fontes: [ONT2022],
  },
  {
    quando: "12 de outubro de 2023",
    titulo: "Uma estação nos Paços do Concelho?",
    texto:
      "Com o projeto de metro até ao Muro e metrobus até ao interface, o presidente da Câmara fala numa estação nos Paços do Concelho, com ligação subterrânea ao interface, e avisa: “Se não for agora não é mais”.",
    fontes: [OMINHO2023],
  },
  {
    quando: "26 de outubro de 2023",
    titulo: "A IL denuncia: “não é uma extensão de metro até à Trofa”",
    texto:
      "Em comunicado, os liberais alertam que o projeto combina metro e autocarro, com transbordo na estação do Muro.",
    fontes: [CM2023],
  },
  {
    quando: "18 de agosto de 2025",
    titulo: "A Metro do Porto admite o problema do transbordo",
    texto:
      "O presidente da Metro do Porto reconhece que mudar de veículo no Muro pode prejudicar a qualidade do serviço.",
    fontes: [PUBLICO2025],
  },
  {
    quando: "31 de janeiro de 2026",
    titulo: "Metro até ao Muro, metrobus até Paradela",
    texto:
      "Confirma-se o desenho do projeto, com arranque previsto em 2026. O projeto é contestado por movimentos da região.",
    fontes: [RMP2026],
  },
  {
    quando: "31 de agosto a 12 de outubro de 2026",
    titulo: "Consulta pública do projeto",
    texto:
      "O Estudo de Impacte Ambiental esteve em consulta pública no Participa.pt. A IL Trofa respondeu, defendendo o metro ligeiro até ao Interface da Trofa.",
    ligacao: { nome: "Ver a nossa participação", href: "#participacao" },
  },
  {
    quando: "Hoje",
    titulo: "0 km de metro no concelho da Trofa",
    texto: "Mais de duas décadas depois, o comboio não voltou e o metro ainda não chegou.",
  },
];

// ---- Porque o metro até ao Interface (da nossa participação) ----------------
export const argumentos = [
  {
    titulo: "O metro pára antes do nó",
    texto:
      "No Interface da Trofa param os comboios das linhas de Braga e de Guimarães e os autocarros, e convergem os principais acessos ao concelho. Com metro até lá, cada pessoa muda uma vez, no sítio certo. Com o projeto atual, quem chega de comboio e segue para a Maia muda duas vezes.",
  },
  {
    titulo: "Viagem direta",
    texto:
      "Do Interface à Trindade sem mudar de veículo, na Linha C. Cada transbordo custa tempo e afasta passageiros, e esse efeito devia ter sido quantificado.",
  },
  {
    titulo: "Mais capacidade",
    texto: "O metro tem uma capacidade muito superior à do metrobus.",
  },
  {
    titulo: "Um sistema, não dois",
    texto:
      "O metrobus obrigaria a manter uma frota à parte, com carregadores, circuito de inversão no Muro, manutenção e motoristas próprios. Esses custos têm de ser contabilizados.",
  },
  {
    titulo: "Infraestrutura para décadas",
    texto:
      "A via e os veículos de metro duram décadas e os autocarros são substituídos muito antes. O custo a 30 anos das duas soluções nunca foi apresentado.",
  },
  {
    titulo: "Efeito estruturante",
    texto:
      "Uma linha de metro fixa habitação, emprego e investimento, e mais gente troca o carro pelo metro, com mais conforto e melhor ambiente. Um corredor de autocarros não dá a mesma garantia.",
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
    "Na obra, o autocarro sai mais barato. Mas o próprio Certu conclui que, medidos ao longo de toda a vida útil e por lugar oferecido, os custos dos dois sistemas se aproximam: o autocarro custa menos a construir e mais a explorar, e os veículos duram metade.",
  fonte:
    "Certu, Les coûts des transports collectifs urbains en site propre, ficha n.º 18, outubro de 2011 (valores de 2011, em França).",
};

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
export const fontes: Fonte[] = [
  METRO2008,
  JPN2012,
  ONT2019,
  JN2021,
  JN2022,
  ONT2022,
  OMINHO2023,
  CM2023,
  PUBLICO2025,
  RMP2026,
  { nome: "Trofa TV — Estudo de Impacte Ambiental em consulta pública (1/9/2026)", href: projeto.fonte.href },
  {
    nome: "IL Braga — BRT ou metro de superfície? (de onde vêm os valores do Certu na tabela)",
    href: "https://bragaliberal.pt/brt",
  },
];
