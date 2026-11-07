// Conteúdo extra da página /ideias/educacao. Os ids das propostas são os de lib/educacao.ts.

// O percurso de um aluno da Trofa: as propostas por fase da vida escolar.
export const percurso = [
  { fase: "Primeira infância", idade: "0 a 3 anos", ids: ["1.2", "4.7"] },
  { fase: "Escola básica", idade: "1.º ciclo", ids: ["1.1", "1.3"] },
  { fase: "Escolher o caminho", idade: "9.º ano", ids: ["2.2", "4.2", "4.3"] },
  { fase: "Estudar e crescer", idade: "Secundário e superior", ids: ["1.4", "1.6", "1.5"] },
  { fase: "Trabalhar na Trofa", idade: "Formação e emprego", ids: ["3.1", "3.3", "4.1"] },
];

// Propostas que valem para todas as fases.
export const emTodoOPercurso = ["4.4", "2.1", "2.3", "3.2", "4.6"];

// Cartazes da campanha sobre educação (public/images/cartazes/).
export const cartazesEducacao = [
  { src: "/images/cartazes/cartaz-44.jpg", w: 480, h: 640, alt: "Cartaz da campanha: biblioteca e salas de estudo" },
  { src: "/images/cartazes/cartaz-45.png", w: 480, h: 640, alt: "Cartaz da campanha: biblioteca municipal, salas de estudo 24 horas, creches para todos" },
  { src: "/images/cartazes/cartaz-63.jpeg", w: 480, h: 640, alt: "Cartaz da campanha: creches para todos" },
];
