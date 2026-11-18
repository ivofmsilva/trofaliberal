export type Evento = {
  titulo: string;
  data: string; // texto livre, ex.: "17 de dezembro, 16h"
  // Opcional: início em formato ISO (ex.: "2026-12-05T20:00:00+00:00"). Com ele, o evento vai
  // também numa ficha para o Google (pode aparecer nas pesquisas de eventos).
  inicio?: string;
  local?: string;
  href?: string;
  // Opcionais: uma frase a explicar o evento e o cartaz (ficheiro em public/images/eventos/).
  texto?: string;
  imagem?: string;
};

// COMO ADICIONAR UM EVENTO: acrescenta um bloco igual ao exemplo abaixo (entre as
// chavetas, separado por vírgula). Aparece sozinho na página Eventos (Calendário)
// E na Home. Para o tirar depois do evento, apaga o bloco.
//
//   {
//     titulo: "Fino Liberal",
//     data: "17 de dezembro, 16h",
//     local: "Auditório da Junta de Freguesia de Santiago de Bougado",
//     href: "https://fb.me/e/...", // opcional: link do evento
//   },
//
// Enquanto estiver vazio, o calendário mostra "sem eventos agendados" e a Home
// não mostra a secção.
export const proximos: Evento[] = [
  {
    titulo: "Jantar de Natal dos núcleos do distrito do Porto",
    data: "5 de dezembro, sábado, 20h",
    inicio: "2026-12-05T20:00:00+00:00",
    local: "Casa da Agra, Maia",
    texto: "O Núcleo da Trofa junta-se a mais dez núcleos da Iniciativa Liberal do distrito do Porto. Reserva a data.",
    imagem: "/images/eventos/jantar-natal-2026.webp",
  },
  {
    titulo: "Porto Liberal",
    data: "Dezembro · data a anunciar",
    texto: "Pão-de-ló e vinho do Porto para celebrar o Natal com o núcleo. Uma tradição sem falha desde 2021.",
  },
];

export const outros = [
  {
    titulo: "Fino Liberal",
    texto: "Encontros informais onde se discute política com descontração.",
    quando: "Está atento ao próximo.",
    imagem: "/images/eventos/fino-liberal-93.jpeg",
  },
  {
    titulo: "Aniversário do Núcleo",
    texto: "Desde 2022 a lutar por um bolo maior para todos.",
    quando: "Junho",
    imagem: "/images/eventos/aniversario-99.png",
  },
  {
    titulo: "Destrave Liberal",
    texto: "Uma caminhada com muita animação e um painel sobre temas da atualidade.",
    quando: "Setembro",
    imagem: "/images/geral/comunidade-destrave-trofa.jpeg",
  },
  {
    titulo: "Magusto Liberal",
    texto: "Castanhas assadas, atividades lúdicas e muito convívio.",
    quando: "Novembro",
    imagem: "/images/eventos/magusto-liberal-07.jpg",
  },
  {
    titulo: "Porto Liberal",
    texto: "Uma tradição do núcleo da Trofa. Um encontro rápido com pão-de-ló e Porto. Uma tradição sem falha desde 2021.",
    quando: "Dezembro",
    imagem: "/images/eventos/porto-liberal.webp",
  },
];

export const links = {
  litVideo: "https://www.facebook.com/share/r/1C2oidH3bG/",
  litEvento: "https://fb.me/e/6QuqojQt3",
  parlamentoEvento: "https://fb.me/e/3W2RbTI8C",
};
