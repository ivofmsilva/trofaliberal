// Conteúdo extra da página /ideias/educacao. Os ids das propostas são os de lib/educacao.ts.

// O percurso de um aluno da Trofa: as propostas por fase da vida escolar.
export const percurso = [
  { fase: "Primeira infância", idade: "0 a 3 anos", ids: ["1.2", "4.7"] },
  { fase: "Escola básica", idade: "1.º ciclo", ids: ["1.1", "1.3", "4.5"] },
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

export const perguntas: { p: string; r: string }[] = [
  {
    p: "O que pode a Câmara fazer se as escolas são do Estado?",
    r: "Muito, e é por isso que três dos quatro eixos são do que a Câmara Municipal pode fazer já: a rede escolar, as creches, a biblioteca e as salas de estudo, o apoio psicológico, as bolsas de mérito, a mostra de formação e a ligação às empresas. O quarto eixo é o que exigimos ao Governo e à Assembleia da República.",
  },
  {
    p: "Isto é privatizar a escola pública?",
    r: "Não. As propostas falam de mais autonomia para as escolas públicas, de divulgar os projetos educativos do ensino público para que as famílias escolham com informação, e de acabar com a diferença nos manuais escolares entre escolas públicas e privadas. O objetivo é dar mais liberdade às famílias e às escolas.",
  },
  {
    p: "Porque falam de ensino superior se a Trofa não tem?",
    r: "Porque é essa ausência que queremos corrigir. Um polo de ensino superior especializado nas áreas do tecido económico local, como a metalomecânica, fixaria talento no concelho, elevaria as qualificações da população adulta e poderia ter uma residência para estudantes.",
  },
  {
    p: "Vai custar muito?",
    r: "Várias propostas são de custo baixo: divulgar os projetos educativos, a mostra anual de formação, a formação contínua dos profissionais, os estágios de verão. O apoio da Câmara é sem cheques em branco, com medidas e resultados mensuráveis. Não queremos educação pela via do controlo e da despesa infindável.",
  },
  {
    p: "De onde vêm estas propostas?",
    r: "Das Jornadas Liberais da Trofa dedicadas à Educação, entre 23 e 28 de março de 2026. A IL Trofa visitou escolas e centros de formação do concelho, ouviu quem trabalha na educação todos os dias e fechou a semana com um debate público no auditório da Escola Secundária da Trofa.",
  },
];
