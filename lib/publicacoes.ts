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

// As três mais recentes do @liberaltrofa (atualizado a 23/11/2026).
export const ultimasPublicacoes: Publicacao[] = [
  { id: "DgC3AeRIBwN", alt: "Vira o disco e paga mais à mesma: IVA 0% nos alimentos, um alívio temporário, e fim dos benefícios fiscais para o arrendamento, rendas mais caras. O resultado? Mais cara a habitação, mas mais barato o camarão.", w: 1080, h: 1080 },
  { id: "Df712fao88G", alt: "19 de novembro: 28 anos do Concelho da Trofa. Em 1998, os trofenses foram a Lisboa e trouxeram o concelho para casa. Bom feriado, Trofa!", w: 1080, h: 1350 },
  { id: "DfvVtWMMAsZ", alt: "Convite para o Jantar de Natal dos 11 núcleos liberais do distrito do Porto: sábado, 5 de dezembro, 20h, Casa da Agra, Maia", w: 900, h: 1125 },
];
