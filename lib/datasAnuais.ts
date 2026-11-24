// Datas que celebramos (Dia do Concelho, 25 de Novembro, Natal, festas das freguesias...): o banner na página
// inicial só aparece à volta do dia. Por defeito aparece só no próprio dia; as datas grandes (Dia do Concelho,
// 25 de Abril, 25 de Novembro, aniversários) têm três dias e os eventos de vários dias têm a sua janela. As páginas ficam sempre online (calendário em /datas e no sitemap) para quem as procurar.
// Repete-se todos os anos sozinha: a página e o banner aparecem e desaparecem com a data de Lisboa (as páginas
// voltam a ser geradas de hora a hora). Textos das datas em lib/comemoracoes.ts; calendário completo em
// docs/calendario-comemoracoes.md.

export type DataAnual = {
  slug: string; // página da data (ou âncora, para as festas: /festas-da-nossa-terra#covelas)
  titulo: string;
  dia?: [number, number]; // data fixa [mês, dia]
  regra?: (ano: number) => [number, number]; // datas que mudam de ano para ano (domingos, Páscoa)
  quando?: string; // como se diz a data quando muda ("1.º sábado de março")
  desde?: number; // ano do acontecimento, para contar os anos
  janela?: [number, number]; // dias antes e depois em que o banner aparece (por defeito [0, 0]: só no dia)
};

export const diaDoConcelho: DataAnual = { slug: "/dia-do-concelho", titulo: "Dia do Concelho", dia: [11, 19], desde: 1998, janela: [1, 1] };
export const vinteCincoNovembro: DataAnual = { slug: "/25-de-novembro", titulo: "25 de Novembro", dia: [11, 25], desde: 1975, janela: [1, 1] };

export const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

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

// ---- Regras para as datas que mudam (dia da semana: 0 = domingo, 6 = sábado) ----

const diaDaSemana = (ano: number, mes: number, dia: number) => new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay();

// O n-ésimo dia da semana do mês (ex.: 3.º domingo de agosto = nesimo(ano, 8, 0, 3)).
export function nesimo(ano: number, mes: number, semana: number, n: number): [number, number] {
  const primeiro = 1 + ((semana - diaDaSemana(ano, mes, 1) + 7) % 7);
  return [mes, primeiro + (n - 1) * 7];
}

// O último dia da semana do mês (ex.: último domingo de julho = ultimo(ano, 7, 0)).
export function ultimo(ano: number, mes: number, semana: number): [number, number] {
  const fim = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  return [mes, fim - ((diaDaSemana(ano, mes, fim) - semana + 7) % 7)];
}

// Soma dias a uma data do ano (pode passar de mês).
export function somarDias(ano: number, [mes, dia]: [number, number], n: number): [number, number] {
  const t = new Date(Date.UTC(ano, mes - 1, dia + n));
  return [t.getUTCMonth() + 1, t.getUTCDate()];
}

// Domingo de Páscoa (calendário gregoriano, algoritmo de Meeus/Jones/Butcher).
export function pascoa(ano: number): [number, number] {
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  return [Math.floor((h + l - 7 * m + 114) / 31), ((h + l - 7 * m + 114) % 31) + 1];
}

// ---- Contas com as datas ----

export const dataNoAno = (d: DataAnual, ano: number): [number, number] => (d.regra ? d.regra(ano) : d.dia!);

// A vez mais próxima da data (do ano passado, deste ou do próximo) e quantos dias faltam (negativo se já passou).
function ocorrencia(d: DataAnual, agora = agoraReal()) {
  const h = hojeEmLisboa(agora);
  const hoje = Date.UTC(h.ano, h.mes - 1, h.dia);
  let melhor = { ano: h.ano, dias: Infinity };
  for (const ano of [h.ano - 1, h.ano, h.ano + 1]) {
    const [m, dia] = dataNoAno(d, ano);
    const dias = (Date.UTC(ano, m - 1, dia) - hoje) / DIA_MS;
    if (Math.abs(dias) < Math.abs(melhor.dias)) melhor = { ano, dias };
  }
  return melhor;
}

export function diasPara(d: DataAnual, agora = agoraReal()) {
  return ocorrencia(d, agora).dias;
}

// Está na altura do banner? (por defeito: só no próprio dia)
export function estaNaSemana(d: DataAnual, agora = agoraReal()) {
  const [antes, depois] = d.janela ?? [0, 0];
  const n = diasPara(d, agora);
  return n <= antes && n >= -depois;
}

// O ano da vez mais próxima (a 31 de dezembro, o 1 de janeiro mais próximo já é o do ano seguinte).
export function anoDe(d: DataAnual, agora = agoraReal()) {
  return ocorrencia(d, agora).ano;
}

export function anosDe(d: DataAnual, agora = agoraReal()) {
  return anoDe(d, agora) - (d.desde ?? 0);
}

export function anosDoConcelho(agora = agoraReal()) {
  return anosDe(diaDoConcelho, agora);
}

// A próxima vez (hoje ou depois): para o calendário das datas.
export function proximaVez(d: DataAnual, agora = agoraReal()) {
  const h = hojeEmLisboa(agora);
  const hoje = Date.UTC(h.ano, h.mes - 1, h.dia);
  for (const ano of [h.ano, h.ano + 1]) {
    const [mes, dia] = dataNoAno(d, ano);
    const dias = (Date.UTC(ano, mes - 1, dia) - hoje) / DIA_MS;
    if (dias >= 0) return { ano, mes, dia, dias };
  }
  const [mes, dia] = dataNoAno(d, h.ano + 1);
  return { ano: h.ano + 1, mes, dia, dias: (Date.UTC(h.ano + 1, mes - 1, dia) - hoje) / DIA_MS };
}

// "1 de dezembro"; nas datas que mudam, a regra ("1.º sábado de março").
export const diaPorExtenso = (d: DataAnual) => (d.dia ? `${d.dia[1]} de ${MESES[d.dia[0] - 1]}` : (d.quando ?? ""));

// A data da vez mais próxima por extenso ("24 de janeiro"), útil para as datas que mudam.
export function dataProxima(d: DataAnual, agora = agoraReal()) {
  const [m, dia] = dataNoAno(d, anoDe(d, agora));
  return `${dia} de ${MESES[m - 1]}`;
}

// Das datas que estão na janela do banner, primeiro as que ainda vão acontecer (a mais próxima à frente).
export function ativasPorOrdem<T extends { data: DataAnual }>(lista: T[], agora = agoraReal()) {
  return lista
    .filter((x) => estaNaSemana(x.data, agora))
    .sort((a, b) => {
      const da = diasPara(a.data, agora), db = diasPara(b.data, agora);
      if (da >= 0 !== db >= 0) return da >= 0 ? -1 : 1;
      return da >= 0 ? da - db : db - da;
    });
}
