// Quando o plenário eletivo de 2026 (no Muro) se realizar, muda `realizado` para true:
// os textos passam de "candidatura a plenário" para "eleito".
export const plenario2026 = {
  realizado: false,
  local: "Muro",
};

export type Membro = { nome: string; cargo: string; foto?: string };

export const gcl: Membro[] = [
  { nome: "Bruno Magalhães", cargo: "Coordenador", foto: "/images/equipa/bruno-magalhaes.png" },
  { nome: "José Pedro Reis", cargo: "Vice-coordenador", foto: "/images/equipa/jose-pedro-reis.png" },
  { nome: "Paula Peixoto", cargo: "Secretária" },
  { nome: "Ivo Silva", cargo: "Tesoureiro" },
  { nome: "Duarte Pinheiro", cargo: "Vogal" },
  { nome: "Filipe Couto", cargo: "1.º Suplente" },
  { nome: "Dora Costa", cargo: "2.ª Suplente" },
];

export const mesa: Membro[] = [
  { nome: "Afonso Couto", cargo: "Presidente da Mesa do Plenário" },
  { nome: "Manuel Vilas Boas", cargo: "1.º Secretário da Mesa do Plenário" },
  { nome: "João Barros", cargo: "2.º Secretário da Mesa do Plenário" },
];
