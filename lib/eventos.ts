export type Evento = {
  titulo: string;
  data: string; // texto livre, ex.: "17 de dezembro, 16h"
  local?: string;
  href?: string;
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
export const proximos: Evento[] = [];

export const outros = [
  {
    titulo: "Fino Liberal",
    texto: "Encontros informais onde se discute política com descontração.",
    quando: "Está atento ao próximo.",
    imagem: "/images/eventos/fino-liberal-93.jpeg",
  },
  {
    titulo: "Aniversário do núcleo",
    texto: "Desde 2022 a lutar por um bolo maior para todos.",
    quando: "Junho",
    imagem: "/images/eventos/aniversario-99.png",
  },
  {
    titulo: "Destrave Liberal",
    texto: "Uma caminhada com muita animação e um painel sobre temas da atualidade.",
    quando: "Setembro",
    imagem: "/images/geral/comunidade-destrave.jpeg",
  },
  {
    titulo: "Porto Liberal",
    texto: "Uma tradição do núcleo da Trofa. Um encontro rápido com pão-de-ló e Porto. Uma tradição sem falha desde 2021.",
    quando: "Dezembro",
    imagem: "/images/eventos/porto-liberal-95.png",
  },
];

export const links = {
  litVideo: "https://www.facebook.com/share/r/1C2oidH3bG/",
  litEvento: "https://fb.me/e/6QuqojQt3",
  parlamentoEvento: "https://fb.me/e/3W2RbTI8C",
};
