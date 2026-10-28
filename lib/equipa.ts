// Plenário eletivo de 2026: realizou-se a 3 de outubro, na freguesia do Muro.
export const plenario2026 = {
  realizado: true,
  local: "Muro",
  data: "3 de outubro de 2026",
};

export type Membro = { nome: string; cargo: string; foto?: string };

// As fotos são círculos de fundo azul (#009de0) em public/images/equipa/.
// Para acrescentar uma foto, guarda o ficheiro lá e escreve o caminho em `foto`.
export const gcl: Membro[] = [
  { nome: "Bruno Magalhães", cargo: "Coordenador", foto: "/images/equipa/bruno-magalhaes.png" },
  { nome: "José Pedro Reis", cargo: "Vice-coordenador", foto: "/images/equipa/jose-pedro-reis.png" },
  { nome: "Paula Peixoto", cargo: "Secretária" },
  { nome: "Ivo Silva", cargo: "Tesoureiro", foto: "/images/equipa/ivo-silva.png" },
  { nome: "Duarte Pinheiro", cargo: "Vogal", foto: "/images/equipa/duarte-pinheiro.png" },
  { nome: "Filipe Couto", cargo: "1.º Suplente" },
  { nome: "Dora Costa", cargo: "2.ª Suplente" },
];

export const mesa: Membro[] = [
  { nome: "Afonso Couto", cargo: "Presidente da Mesa do Plenário", foto: "/images/equipa/afonso-couto.png" },
  { nome: "Manuel Vilas Boas", cargo: "1.º Secretário da Mesa do Plenário" },
  { nome: "João Barros", cargo: "2.º Secretário da Mesa do Plenário" },
];
