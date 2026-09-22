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
  { id: "Dc9grxpKZAR", alt: "Comunicado: Iniciativa Liberal da Trofa reafirma a defesa do Metro ligeiro até à Trofa", w: 900, h: 1125 },
  { id: "Dco6f0dimgQ", alt: "Parlamento na Praia — Aqui Há Parlamento com Carlos Guimarães Pinto e Miguel Rangel", w: 900, h: 900 },
  { id: "DbZFGylIVfO", alt: "Reforma da Lei de Bases da Proteção Civil — proposta liberal apresentada", w: 900, h: 1125 },
];
