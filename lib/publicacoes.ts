// Publicações do Instagram em destaque na Home. Mostra sempre as 3 mais
// recentes: quando publicares algo novo, troca o `id` (o código que aparece
// no link do post, instagram.com/p/<id>/) e o `alt`, ou acrescenta uma linha.
export type Publicacao = { id: string; alt: string };

export const ultimasPublicacoes: Publicacao[] = [
  { id: "DRc-eUEjIQ-", alt: "Comunicado da IL Trofa sobre o acordo de maioria com o PS na Câmara" },
  { id: "DPooU0GDPXr", alt: "Último dia da campanha Trofa Para Cima" },
  { id: "DNEFm6ToO5b", alt: "Apresentação da candidatura Trofa Para Cima" },
];
