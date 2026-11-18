// Páginas que só estão online uma semana por ano (Dia do Concelho, 25 de Novembro...).
// O banner aparece na véspera e fica sete dias (da véspera até cinco dias depois). As páginas ficam
// sempre online (arquivo discreto em Imprensa e Eventos, e no sitemap) para quem as procurar.
// Repete-se todos os anos sozinha: a página e o banner aparecem e desaparecem com a data
// de Lisboa (as páginas voltam a ser geradas de hora a hora). Calendário completo em
// docs/calendario-comemoracoes.md.

export type DataAnual = {
  slug: string;
  titulo: string; // para o arquivo "Datas que celebramos"
  dia: [number, number]; // [mês, dia]
  desde: number; // ano do acontecimento, para contar os anos
};

export const diaDoConcelho: DataAnual = { slug: "/dia-do-concelho", titulo: "Dia do Concelho", dia: [11, 19], desde: 1998 };
export const vinteCincoNovembro: DataAnual = { slug: "/25-de-novembro", titulo: "25 de Novembro", dia: [11, 25], desde: 1975 };

// Todas as datas com página, pela ordem do calendário (acrescentar aqui as novas).
export const datasCelebradas: DataAnual[] = [diaDoConcelho, vinteCincoNovembro].sort(
  (a, b) => a.dia[0] * 100 + a.dia[1] - (b.dia[0] * 100 + b.dia[1]),
);

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
export const diaPorExtenso = (d: DataAnual) => `${d.dia[1]} de ${MESES[d.dia[0] - 1]}`;

const DIA_MS = 86_400_000;

// Só para testes locais: DATA_SIMULADA=2026-11-24 npx next build mostra o site como nesse dia.
const agoraReal = () => (process.env.DATA_SIMULADA ? new Date(`${process.env.DATA_SIMULADA}T12:00:00Z`) : new Date());

export function hojeEmLisboa(agora = agoraReal()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Lisbon", year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(agora)
      .map((x) => [x.type, Number(x.value)]),
  );
  return { ano: p.year as number, mes: p.month as number, dia: p.day as number };
}

// Dias que faltam para a data deste ano (negativo se já passou).
export function diasPara(d: DataAnual, agora = agoraReal()) {
  const h = hojeEmLisboa(agora);
  return (Date.UTC(h.ano, d.dia[0] - 1, d.dia[1]) - Date.UTC(h.ano, h.mes - 1, h.dia)) / DIA_MS;
}

export function estaNaSemana(d: DataAnual, agora = agoraReal()) {
  const n = diasPara(d, agora);
  return n <= 1 && n >= -5;
}

export function anosDe(d: DataAnual, agora = agoraReal()) {
  return hojeEmLisboa(agora).ano - d.desde;
}

export function anosDoConcelho(agora = agoraReal()) {
  return anosDe(diaDoConcelho, agora);
}

// Das datas que estão na semana, primeiro as que ainda vão acontecer (a mais próxima à frente).
export function ativasPorOrdem<T extends { data: DataAnual }>(lista: T[], agora = agoraReal()) {
  return lista
    .filter((x) => estaNaSemana(x.data, agora))
    .sort((a, b) => {
      const da = diasPara(a.data, agora), db = diasPara(b.data, agora);
      if (da >= 0 !== db >= 0) return da >= 0 ? -1 : 1;
      return da >= 0 ? da - db : db - da;
    });
}
