// Contas do Município da Trofa, transcritas dos Relatórios de Gestão de cada ano (2010 a 2025, publicados em
// mun-trofa.pt) e do Relatório do Orçamento de 2026. Cada série diz de que relatório e quadro vem. Valores em euros.
// Os relatórios de 2013 a 2020 são digitalizações: os números foram lidos da imagem de cada quadro.

export const ANOS = Array.from({ length: 16 }, (_, i) => String(2010 + i)); // 2010 … 2025

export const PAGINA_RELATORIOS = "https://mun-trofa.pt/menu/88/relatorio-de-atividades-e-contas";
const BASE = "https://mun-trofa.pt/upload_files/1/1/Munic%C3%ADpio/C%C3%A2mara%20Municipal/";
const R = BASE + "codigos-planos/relatorio-atividades-contas/";
export const FONTE_CONTAS = BASE + "planos_relatorios/Prestacao-contas-2025.pdf";
// Relatório do Orçamento de 2026 (está em mun-trofa.pt/menu/506, não na página dos relatórios de contas).
export const FONTE_ORCAMENTO = BASE + "planos_relatorios/Orcamento-2026-com-marcadores-site.pdf";

// Onde está o relatório de cada ano (o de 2021 a 2023 são os relatórios de gestão e contas do município).
export const RELATORIOS: { ano: string; url: string }[] = [
  { ano: "2025", url: FONTE_CONTAS },
  { ano: "2024", url: BASE + "planos_relatorios/Prestacao-contas-2024-com-marcadores-site.pdf" },
  { ano: "2023", url: BASE + "planos_relatorios/Relat%C3%B3rio%20de%20Gest%C3%A3o%20Contas%202023.pdf" },
  { ano: "2022", url: BASE + "planos_relatorios/PRESTA%C3%87%C3%83O%20DE%20CONTAS%20ANO%202022.pdf" },
  { ano: "2021", url: BASE + "planos_relatorios/Relat%C3%B3rio%20Gest%C3%A3o%20Contas%202021.pdf" },
  { ano: "2020", url: BASE + "planos_relatorios/Relat%C3%B3rio%20Gest%C3%A3o%20Contas_2020.pdf" },
  { ano: "2019", url: R + "RELAT_GESTAOCONTAS_MUNICIPIO_2019.PDF" },
  { ano: "2018", url: R + "RELATORIO_GESTAO_CONTAS_2018.PDF" },
  { ano: "2017", url: R + "CONTAS_2017.PDF" },
  { ano: "2016", url: R + "RelatGesteContas_MunicipiodaTrofa_2016.pdf" },
  { ano: "2015", url: R + "RelatContas_2015.pdf" },
  { ano: "2014", url: R + "relat2014.pdf" },
  { ano: "2013", url: R + "RelatGestContas20131parte.pdf" },
  { ano: "2012", url: R + "2012.PDF" },
  { ano: "2011", url: R + "2011.PDF" },
  { ano: "2010", url: R + "2010.PDF" },
];

export type SerieContas = { id: string; nome: string; valores: (number | null)[]; quadro: string };

// Cada série dá-se por ano; os anos sem valor ficam em branco.
const S = (id: string, nome: string, quadro: string, porAno: Record<number, number>): SerieContas => ({
  id,
  nome,
  quadro,
  valores: ANOS.map((a) => porAno[Number(a)] ?? null),
});

// Contabilidade patrimonial (Quadros 24 e 25 do Relatório de 2025). Só existe nesta forma desde 2021 (SNC-AP).
export const gastosPessoal = S("gastosPessoal", "Gastos com pessoal", "Relatório de 2025, Quadro 24 (pág. 135) e Quadro 86 (pág. 204)", {
  2021: 7239767.05, 2022: 7764080.69, 2023: 9240966.83, 2024: 10099778.1, 2025: 12002549.74,
});
export const gastosFse = S("gastosFse", "Fornecimentos e serviços externos", "Relatório de 2025, Quadro 24 (pág. 135)", {
  2021: 5089358.57, 2022: 6830180.41, 2023: 8665137.08, 2024: 10490064.67, 2025: 10405135.33,
});
export const rendimentosOperacionais = S("rendimentosOperacionais", "Total de rendimentos operacionais", "Relatório de 2025, Quadro 25 (pág. 137)", {
  2021: 25187993.43, 2022: 28653939.01, 2023: 34618500.61, 2024: 34856936.03, 2025: 37212371.48,
});

// Contabilidade orçamental: despesa paga e receita cobrada.
export const despesaPessoalPaga = S(
  "despesaPessoalPaga",
  "Despesas com pessoal pagas",
  "Relatório de Gestão de cada ano (2021 a 2025: relatório de 2025, Quadro 15, pág. 123; 2017 a 2019: relatório de 2019, Quadro 13; 2020: relatório de 2020, Quadro 13, pág. 49)",
  {
    2010: 6940356.93, 2011: 6674986.21, 2012: 5652602.37, 2013: 6258620.47, 2014: 5946648.26, 2015: 5887977.09,
    2016: 5777871.5, 2017: 5666233.92, 2018: 6147556.08, 2019: 7107263.42, 2020: 7177570.45,
    2021: 7345973.76, 2022: 7789984.38, 2023: 9534823.93, 2024: 10320250.96, 2025: 12264030.15,
  },
);
// De 2011 a 2015 (2016 nas receitas correntes) vêm do INE, com dados da DGAL, em milhares de euros (despesas: 0009481;
// receitas: 0009480). Nos anos em que há os dois, o INE é igual aos relatórios (arredondado ao milhar). Lido a 21/11/2026.
export const despesaCorrente = S("despesaCorrente", "Despesa corrente paga", "INE, com dados da DGAL, de 2011 a 2015 (despesas das câmaras municipais, 0009481); relatórios de 2019 (Quadro 13, 2016 a 2019), 2020 (Quadro 13, pág. 49) e 2025 (Quadro 15)", {
  2011: 13588000, 2012: 13324000, 2013: 29674000, 2014: 23142000, 2015: 14811000, 2016: 13368980.91, 2017: 14592672.81, 2018: 14513456.84, 2019: 15436282.27, 2020: 14399754.75,
  2021: 16139786.01, 2022: 18250642.71, 2023: 22957602.92, 2024: 25380723.8, 2025: 28280281.17,
});
export const despesaBensServicos = S("despesaBensServicos", "Aquisição de bens e serviços pagos", "INE, com dados da DGAL, de 2011 a 2015 (0009481); relatórios de 2019 (Quadro 13, 2016 a 2019), 2020 (Quadro 13, pág. 49) e 2025 (Quadro 15)", {
  2011: 3795000, 2012: 4229000, 2013: 13896000, 2014: 5219000, 2015: 3939000, 2016: 4530703.5, 2017: 5249168.74, 2018: 5270400.05, 2019: 5724235.99, 2020: 4921399.24,
  2021: 5277953.36, 2022: 6838317.49, 2023: 9220854.75, 2024: 9920543.94, 2025: 11107509.87,
});
export const receitaCorrente = S("receitaCorrente", "Receitas correntes cobradas", "INE, com dados da DGAL, de 2011 a 2016 (receitas das câmaras municipais, 0009480); relatórios de 2020 (Quadro 9, 2017 a 2020) e 2025 (Quadro 11, pág. 114)", {
  2011: 14168000, 2012: 15000000, 2013: 17120000, 2014: 19390000, 2015: 19597000, 2016: 19851000, 2017: 19345343.68, 2018: 21372588.52, 2019: 21794803.83, 2020: 21806057.77,
  2021: 23139394.01, 2022: 27355802.74, 2023: 31387077.58, 2024: 33144655.31, 2025: 36830190.83,
});
export const impostosDiretos = S("impostosDiretos", "Impostos diretos cobrados", "Relatórios de 2020 (Quadro 9, 2017 a 2020) e 2025 (Quadro 11)", {
  2017: 9121643.65, 2018: 10141411.98, 2019: 10349945.55, 2020: 9662393.68,
  2021: 10011672.85, 2022: 12374999.7, 2023: 14174460.42, 2024: 12882251.47, 2025: 15080642.26,
});
export const transferenciasCorrentes = S("transferenciasCorrentes", "Transferências correntes recebidas", "Relatórios de 2020 (Quadro 9, 2017 a 2020) e 2025 (Quadro 11)", {
  2017: 8480181.3, 2018: 8562830.92, 2019: 8912058.74, 2020: 10224177.11,
  2021: 10587762.93, 2022: 12274308.98, 2023: 14266370.33, 2024: 16936282.24, 2025: 18221046.22,
});
// Total geral cobrado menos o saldo do ano anterior ("outras receitas"). Inclui receitas de capital e empréstimos.
// É o valor que o INE/DGAL publica como "receita total". Em 2018 inclui 24,1 M€ de empréstimos (refinanciamento da dívida).
// Receita total: a do INE (com dados da DGAL), a mesma dos indicadores. Conta as receitas correntes, as de capital e as
// "reposições não abatidas nos pagamentos" (dinheiro que volta à Câmara de pagamentos de anos anteriores), sem o saldo do ano
// anterior; bate com o total do Quadro 11 do relatório de 2025 menos o saldo (51 954 252,68 − 3 019 465,00 = 48 934 787,68 €).
// Até 21/11/2026 usava-se aqui correntes + capital dos relatórios (sem as reposições): em 2025, 47 976 376,58 €.
const receitaTotalINE = porSlug("receita_total_municipal");
export const receitaTotal = S(
  "receitaTotal",
  "Receita total (com capital e empréstimos)",
  "INE, com dados da DGAL: receitas das câmaras municipais, total (indicadores 0009480 até 2020 e 0013908 desde 2021)",
  Object.fromEntries((receitaTotalINE?.linhas ?? []).filter((l) => l.valores[0]?.v != null).map((l) => [Number(l.periodo), l.valores[0].v as number])),
);

// Dívida a 31 de dezembro. "Efetiva" exclui os valores que a lei exceciona (Relatório de 2020, Quadro 31, pág. 69, para 2013
// a 2020; Relatório de 2025, Quadros 29 e 30, pág. 140, para 2021 a 2025).
export const dividaTotal = S("dividaTotal", "Dívida total", "Relatórios de 2020 (Quadro 31) e 2025 (Quadro 29)", {
  2013: 41324468.34, 2014: 40214687.25, 2015: 36282650.29, 2016: 33408539.87, 2017: 29210940.3, 2018: 26583902.64,
  2019: 25380143.3, 2020: 24588041.06,
  2021: 24863455.13, 2022: 28428730.14, 2023: 24533825.45, 2024: 23872497.34, 2025: 19896763.5,
});
export const dividaEfetiva = S("dividaEfetiva", "Dívida efetiva do município", "Relatórios de 2020 (Quadros 31 e 32) e 2025 (Quadros 29 e 30)", {
  2013: 41324468.34, 2014: 39259670.29, 2015: 35464064.33, 2016: 32726384.91, 2017: 28665216.34, 2018: 26481579.39,
  2019: 24336922.32, 2020: 22185599.19,
  2021: 20016086.77, 2022: 21671009.13, 2023: 16978854.35, 2024: 17383214.51, 2025: 14444427.47,
});

// Orçamento de 2026 (Quadro 16, pág. 94 do relatório do orçamento): dotação inicial de 2025 e de 2026. Todas as linhas do
// quadro, para as somas baterem: correntes + capital + ativos financeiros + passivos financeiros = total.
export const orcamento = [
  { rubrica: "Despesas com pessoal", ano2025: 12955693.4, ano2026: 15371332.89, variacao: 18.65 },
  { rubrica: "Aquisição de bens e serviços", ano2025: 21851303.3, ano2026: 21732276.45, variacao: -0.54 },
  { rubrica: "Juros e outros encargos", ano2025: 1245000, ano2026: 601940.25, variacao: -51.65 },
  { rubrica: "Transferências e subsídios correntes", ano2025: 5499023.6, ano2026: 6401544.36, variacao: 16.41 },
  { rubrica: "Outras despesas correntes", ano2025: 194048.38, ano2026: 278829.92, variacao: 43.69 },
  { rubrica: "Total das despesas correntes", ano2025: 41745068.68, ano2026: 44385923.87, variacao: 6.33 },
  { rubrica: "Aquisição de bens de capital (investimento)", ano2025: 49215387.22, ano2026: 43102041.28, variacao: -12.42 },
  { rubrica: "Transferências e subsídios de capital", ano2025: 3363330.71, ano2026: 2790405.99, variacao: -17.03 },
  { rubrica: "Outras despesas de capital", ano2025: 2000, ano2026: 2000, variacao: 0 },
  { rubrica: "Total das despesas de capital", ano2025: 52580717.93, ano2026: 45894447.27, variacao: -12.72 },
  { rubrica: "Ativos financeiros", ano2025: 2000, ano2026: 2000, variacao: 0 },
  { rubrica: "Passivos financeiros (amortização de empréstimos)", ano2025: 2610000, ano2026: 2980092.89, variacao: 14.18 },
  { rubrica: "Total do orçamento da despesa", ano2025: 96937786.61, ano2026: 93262464.03, variacao: -3.79 },
];

// Variação entre o primeiro e o último ano com valor (ou entre dois anos dados).
export function crescimento(s: (number | null)[], de?: string, ate = "2025") {
  const i = de ? ANOS.indexOf(de) : s.findIndex((v) => v !== null);
  const j = ANOS.indexOf(ate);
  const a = s[i];
  const b = s[j];
  return a && b ? (b / a - 1) * 100 : null;
}
export const primeiroAno = (s: SerieContas) => ANOS[s.valores.findIndex((v) => v !== null)];
export const valorEm = (s: SerieContas, ano: string) => s.valores[ANOS.indexOf(ano)];

// Peso das despesas com pessoal na despesa corrente paga (só nos anos em que há as duas).
export const pesoPessoal = ANOS.map((_, i) => {
  const p = despesaPessoalPaga.valores[i];
  const c = despesaCorrente.valores[i];
  return p !== null && c !== null ? (p / c) * 100 : null;
});

// ---- Por habitante e comparação ------------------------------------------------------------------------------------
import { porSlug } from "@/lib/dados/dados";

// População média anual residente da Trofa (INE), por ano, para dividir os valores. Só existe desde 2011.
const popMedia = porSlug("populacao_media_residente");
export const populacaoTrofa: (number | null)[] = ANOS.map((a) => popMedia?.linhas.find((l) => l.periodo === a)?.valores[0]?.v ?? null);

export function porHabitante(s: SerieContas, nome?: string): SerieContas {
  return {
    id: s.id + "PorHab",
    nome: nome ?? s.nome + ", por habitante",
    quadro: s.quadro + ". Dividido pela população média anual residente (INE).",
    valores: s.valores.map((v, i) => (v !== null && populacaoTrofa[i] ? Math.round(v / populacaoTrofa[i]!) : null)),
  };
}

// Receitas dos municípios por habitante: a Trofa, a Área Metropolitana do Porto e "Ave e concelhos vizinhos" (nas páginas: "8 concelhos próximos"),
// no último ano em que há dados dos três.
const RECEITAS = [
  ["receita_total_municipal", "Receita total"],
  ["receita_imi", "IMI"],
  ["receita_imt", "IMT"],
  ["receita_iuc", "IUC"],
  ["receita_participacao_irs", "Participação no IRS"],
  ["receita_derrama", "Derrama"],
] as const;

export function comparacaoReceitas() {
  const pop = porSlug("populacao_media_residente");
  const linhas = RECEITAS.map(([slug, rotulo]) => {
    const i = porSlug(slug);
    if (!i || !pop) return null;
    const ult = [...i.linhas].reverse().find((l) => l.valores.slice(0, 3).every((v) => v.v !== null));
    if (!ult) return null;
    const p = pop.linhas.find((l) => l.periodo === ult.periodo);
    if (!p) return null;
    const hab = ult.valores.slice(0, 3).map((v, k) => Math.round((v.v as number) / (p.valores[k].v as number)));
    return { rotulo, ano: ult.periodo, trofa: hab[0], amp: hab[1], ave: hab[2] };
  });
  return linhas.filter((x): x is NonNullable<typeof x> => x !== null);
}
export const COLUNAS_COMPARACAO = ["Trofa", "Área Metropolitana do Porto", "Ave e concelhos vizinhos"];

// Receita de cada imposto municipal (e da participação no IRS), de 2011 a 2025, do INE (com dados da DGAL; séries 0009480
// até 2020 e 0013908 desde 2021, iguais em 2021). Total da Trofa e, por habitante, a Trofa ao lado das comparações.
export const IMPOSTOS_MUNICIPAIS = [
  ["receita_imi", "IMI"],
  ["receita_imt", "IMT"],
  ["receita_iuc", "IUC"],
  ["receita_derrama", "Derrama"],
  ["receita_participacao_irs", "Participação no IRS"],
] as const;

export type ReceitaImposto = {
  slug: string;
  nome: string;
  periodos: string[];
  colunas: string[];
  total: (number | null)[];
  porHabitante: (number | null)[][]; // uma série por coluna (Trofa, AMP, 8 concelhos, Portugal)
};

export function receitaPorImposto(): ReceitaImposto[] {
  const pop = porSlug("populacao_media_residente");
  return IMPOSTOS_MUNICIPAIS.flatMap(([slug, nome]) => {
    const i = porSlug(slug);
    if (!i || !pop) return [];
    const periodos = i.linhas.map((l) => l.periodo);
    const porHabitante = i.colunas.map((_, k) =>
      i.linhas.map((l) => {
        const p = pop.linhas.find((x) => x.periodo === l.periodo)?.valores[k]?.v;
        const v = l.valores[k]?.v;
        return v != null && p ? v / p : null;
      }),
    );
    return [{ slug, nome, periodos, colunas: i.colunas, total: i.linhas.map((l) => l.valores[0]?.v ?? null), porHabitante }];
  });
}

// Empréstimos contraídos em cada ano: receita de "passivos financeiros" do INE (com dados da DGAL), em euros (o INE dá
// milhares). Séries 0009480 até 2020 e 0013908 desde 2021 (iguais em 2021). Lido a 21/11/2026.
export const emprestimosContraidos = S(
  "emprestimosContraidos",
  "Empréstimos contraídos (receita de passivos financeiros)",
  "INE, com dados da DGAL: receitas das câmaras municipais, passivos financeiros (indicadores 0009480 até 2020 e 0013908 desde 2021)",
  {
    2011: 500000, 2012: 0, 2013: 23716000, 2014: 6603000, 2015: 0, 2016: 0, 2017: 0, 2018: 24134000, 2019: 1009000,
    2020: 1393000, 2021: 13358000, 2022: 4726000, 2023: 1870000, 2024: 0, 2025: 1620000,
  },
);

// Limite legal da dívida e prazo médio de pagamentos: os mesmos indicadores da DGAL que estão na página dos indicadores.
export const limiteDivida = {
  percentagem: porSlug("divida_percentagem_limite"),
  limite: porSlug("limite_endividamento"),
  divida: porSlug("divida_total_municipio"),
};
export const prazoPagamentos = porSlug("prazo_medio_pagamentos");

// Trabalhadores dos serviços municipais: DGAL, Portal Autárquico → Recursos Humanos, "Número de trabalhadores – por município e
// serviço municipalizado – Série 2016–2025" (folha Serviços_municipais, linha TROFA; fonte SIIAL, a partir do balanço social e dos
// recursos humanos trimestrais; atualizado a 30/10/2026). O ficheiro não diz a data de referência dentro do ano.
export const trabalhadoresCamara: Record<string, number> = {
  "2016": 294, "2017": 284, "2018": 354, "2019": 340, "2020": 335, "2021": 333, "2022": 385, "2023": 427, "2024": 474, "2025": 497,
};
export const FONTE_TRABALHADORES = "https://portalautarquico.dgal.gov.pt/pt-PT/recursos-humanos/";

// Fundo de Financiamento da Descentralização por área (receita cobrada, euros), do mapa "Transferência de competências de órgãos
// do Estado para órgãos das autarquias locais" dos relatórios de contas: 2022 e 2023 do relatório de 2023 (p. impressa 509), 2025
// do de 2025 (PDF p. 551). 2024: o mapa do relatório de 2024 não soma o que foi cobrado (5 618 149 €); a ação social é a desse
// mapa, a saúde a do mapa de 2025 ("Até N") e a educação a diferença (11 603 765,70 − 6 821 040,70). Totais iguais aos do INE.
export const ffdPorArea: { ano: number; educacao: number; acaoSocial: number | null; saude: number | null; calculado?: boolean }[] = [
  { ano: 2022, educacao: 2260633.7, acaoSocial: null, saude: null },
  { ano: 2023, educacao: 4560407, acaoSocial: 303498, saude: null },
  { ano: 2024, educacao: 4782725, acaoSocial: 409260, saude: 426164, calculado: true },
  { ano: 2025, educacao: 4939578, acaoSocial: 412660, saude: 648710.85 },
];
