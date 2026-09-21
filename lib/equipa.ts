// Quando o plenário eletivo de 2026 (no Muro) se realizar, muda `realizado` para true:
// os textos passam de "candidatura a plenário" para "eleito".
export const plenario2026 = {
  realizado: false,
  local: "Muro",
};

export type Membro = { nome: string; cargo: string; foto?: string };

export const gcl: Membro[] = [
  { nome: "Bruno Miguel Silva Magalhães", cargo: "Coordenador", foto: "/images/equipa/bruno-magalhaes.png" },
  { nome: "José Pedro Maia dos Reis", cargo: "Vice-coordenador", foto: "/images/equipa/jose-pedro-reis.png" },
  { nome: "Paula Cristina Ferreira Peixoto", cargo: "Secretária" },
  { nome: "Ivo Francisco Matos da Silva", cargo: "Tesoureiro" },
  { nome: "João Duarte Lourenço Pinheiro", cargo: "Vogal" },
  { nome: "Filipe Manuel Silva Couto", cargo: "1.º Suplente" },
  { nome: "Dora Alexandra Martins Costa", cargo: "2.ª Suplente" },
];

export const mesa: Membro[] = [
  { nome: "José Afonso Miranda Couto", cargo: "Presidente da Mesa do Plenário" },
  { nome: "Manuel António Maia Vilas Boas", cargo: "1.º Secretário da Mesa do Plenário" },
  { nome: "João Carlos Sousa Barros", cargo: "2.º Secretário da Mesa do Plenário" },
];
