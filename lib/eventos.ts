export type Evento = {
  titulo: string;
  data: string; // texto livre, ex.: "17 de dezembro, 16h"
  local?: string;
  href?: string;
};

// Eventos futuros. Enquanto estiver vazio, o calendário mostra "sem eventos agendados".
export const proximos: Evento[] = [];

export const outros = [
  {
    titulo: "Fino Liberal",
    texto: "Encontros informais onde se discute política com descontração.",
    quando: "Está atento ao próximo.",
    imagem: "/images/eventos/fino-liberal-93.jpeg",
  },
  {
    titulo: "Porto Liberal",
    texto: "Uma tradição do núcleo da Trofa. Um encontro rápido com pão-de-ló e Porto. Uma tradição sem falha desde 2021.",
    quando: "23 de dezembro",
    imagem: "/images/eventos/porto-liberal-95.png",
  },
  {
    titulo: "Aniversário do núcleo",
    texto: "Mais um aniversário do núcleo. Desde 2022 a lutar por uma Trofa mais liberal.",
    quando: "25 de junho",
    imagem: "/images/eventos/aniversario-99.png",
  },
  {
    titulo: "Destrave Liberal",
    texto: "Uma caminhada com muita animação e um painel sobre temas da atualidade.",
    quando: "Setembro",
    imagem: "/images/geral/comunidade-destrave.jpeg",
  },
];

export const links = {
  litVideo: "https://www.facebook.com/share/r/1C2oidH3bG/",
  litEvento: "https://fb.me/e/6QuqojQt3",
  parlamentoEvento: "https://fb.me/e/3W2RbTI8C",
};
