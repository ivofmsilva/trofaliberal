// Publicações do Instagram em destaque na Home. Mostra só a imagem, sem
// mais nada — ao clicar abre a publicação real.
//
// Para atualizar: manda o link da publicação (instagram.com/p/<id>/) e eu
// descarrego a imagem e ponho-a aqui.
export type Publicacao = {
  id: string;
  alt: string;
  w: number;
  h: number;
};

export const ultimasPublicacoes: Publicacao[] = [
  { id: "DRc-eUEjIQ-", alt: "Comunicado da IL Trofa sobre o acordo de maioria com o PS na Câmara", w: 900, h: 1096 },
  { id: "DPooU0GDPXr", alt: "Último dia da campanha Trofa Para Cima", w: 900, h: 1200 },
  { id: "DNEFm6ToO5b", alt: "Apresentação da candidatura Trofa Para Cima", w: 900, h: 1200 },
];
