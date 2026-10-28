// Dados da página "Metro para a Trofa" (/ideias/metro).
// O texto da nossa visão vem do comunicado em lib/imprensa.ts.

// Resposta da IL Trofa à consulta pública (Participa.pt). Quando tiveres o PDF,
// copia-o para public/metro/ e escreve aqui o caminho, por exemplo
// "/metro/resposta-participa.pdf". Enquanto for null, a página diz "em breve".
export const respostaParticipa: string | null = null;

export const consulta = {
  nome: "Estudo de Impacte Ambiental da Linha ISMAI–Paradela (Metro do Porto até à Trofa)",
  inicio: "31 de agosto de 2026",
  fim: "12 de outubro de 2026",
  portal: "https://participa.pt",
  // Fonte dos números do projeto abaixo.
  fonte: {
    titulo: "Trofa TV",
    href: "https://trofatv.sapo.pt/estudo-de-impacte-ambiental-do-metro-ate-a-trofa-entra-em-consulta-publica-com-2-alternativas-para-o-atravessamento-da-en14/",
  },
};

export const projeto = [
  { valor: "≈ 10 km", texto: "de ligação entre o ISMAI e a Trofa" },
  { valor: "≈ 3 km", texto: "de metro ligeiro, do ISMAI ao Muro" },
  { valor: "≈ 7 km", texto: "de metrobus (autocarro), do Muro à Trofa" },
  { valor: "1", texto: "transbordo obrigatório, na estação do Muro" },
];

export const linhaDoTempo = [
  {
    quando: "Fevereiro de 2002",
    titulo: "A linha estreita fecha, com a promessa do metro",
    texto:
      "O ramal ferroviário da Trofa é desativado para dar lugar a uma linha do Metro do Porto. A Trofa fica à espera.",
  },
  {
    quando: "Mais de duas décadas depois",
    titulo: "A promessa continua por cumprir",
    texto:
      "Esperámos cerca de 9000 dias. O projeto atual deixa os últimos quilómetros dependentes de uma ligação em metrobus, com transbordo no Muro.",
  },
  {
    quando: "31 de agosto a 12 de outubro de 2026",
    titulo: "Consulta pública do projeto",
    texto:
      "O Estudo de Impacte Ambiental esteve em consulta pública no Participa.pt. A IL Trofa respondeu, defendendo o Metro ligeiro até à Trofa.",
  },
];

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
