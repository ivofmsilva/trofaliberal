// Páginas que só estão online uma semana por ano (Dia do Concelho, 25 de Novembro...).
// A janela repete-se todos os anos sozinha: a página e o banner aparecem e desaparecem
// com a data de Lisboa (as páginas voltam a ser geradas de hora a hora).

export type DataAnual = {
  slug: string;
  // [mês, dia], ambos incluídos
  de: [number, number];
  ate: [number, number];
};

export const diaDoConcelho: DataAnual = { slug: "/dia-do-concelho", de: [11, 18], ate: [11, 24] };

// O concelho da Trofa foi aprovado na Assembleia da República a 19 de novembro de 1998.
export const ANO_CONCELHO = 1998;

export function hojeEmLisboa(agora = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Lisbon", year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(agora)
      .map((x) => [x.type, Number(x.value)]),
  );
  return { ano: p.year as number, mes: p.month as number, dia: p.day as number };
}

export function estaNaSemana(d: DataAnual, agora = new Date()) {
  const { mes, dia } = hojeEmLisboa(agora);
  const hoje = mes * 100 + dia;
  return hoje >= d.de[0] * 100 + d.de[1] && hoje <= d.ate[0] * 100 + d.ate[1];
}

export function anosDoConcelho(agora = new Date()) {
  return hojeEmLisboa(agora).ano - ANO_CONCELHO;
}
