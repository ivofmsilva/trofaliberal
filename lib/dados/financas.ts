// Contas do Município da Trofa, transcritas dos Relatórios de Gestão de cada ano (2010 a 2025, publicados em
// mun-trofa.pt) e do Relatório do Orçamento de 2026. Cada série diz de que relatório e quadro vem. Valores em euros.
// Os relatórios de 2013 a 2020 são digitalizações: os números foram lidos da imagem de cada quadro.

export const ANOS = Array.from({ length: 16 }, (_, i) => String(2010 + i)); // 2010 … 2025

export const PAGINA_RELATORIOS = "https://mun-trofa.pt/menu/88/relatorio-de-atividades-e-contas";
const BASE = "https://mun-trofa.pt/upload_files/1/1/Munic%C3%ADpio/C%C3%A2mara%20Municipal/";
const R = BASE + "codigos-planos/relatorio-atividades-contas/";
export const FONTE_CONTAS = BASE + "planos_relatorios/Prestacao-contas-2025.pdf";

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
  "Relatório de Gestão de cada ano (2021 a 2025: relatório de 2025, Quadro 15, pág. 123; 2017 a 2019: relatório de 2019, Quadro 13; 2020: relatório de 2020, Quadro 11)",
  {
    2010: 6940356.93, 2011: 6674986.21, 2012: 5652602.37, 2013: 6258620.47, 2014: 5946648.26, 2015: 5887977.09,
    2016: 5777871.5, 2017: 5666233.92, 2018: 6147556.08, 2019: 7107263.42, 2020: 7177570.45,
    2021: 7345973.76, 2022: 7789984.38, 2023: 9534823.93, 2024: 10320250.96, 2025: 12264030.15,
  },
);
export const despesaCorrente = S("despesaCorrente", "Despesa corrente paga", "Relatórios de 2019 (Quadro 13, 2016 a 2019), 2020 (Quadro 11) e 2025 (Quadro 15)", {
  2016: 13368980.91, 2017: 14592672.81, 2018: 14513456.84, 2019: 15436282.27, 2020: 14399754.75,
  2021: 16139786.01, 2022: 18250642.71, 2023: 22957602.92, 2024: 25380723.8, 2025: 28280281.17,
});
export const despesaBensServicos = S("despesaBensServicos", "Aquisição de bens e serviços pagos", "Relatórios de 2019 (Quadro 13, 2016 a 2019), 2020 (Quadro 11) e 2025 (Quadro 15)", {
  2016: 4530703.5, 2017: 5249168.74, 2018: 5270400.05, 2019: 5724235.99, 2020: 4921399.24,
  2021: 5277953.36, 2022: 6838317.49, 2023: 9220854.75, 2024: 9920543.94, 2025: 11107509.87,
});
export const receitaCorrente = S("receitaCorrente", "Receitas correntes cobradas", "Relatórios de 2020 (Quadro 9, 2017 a 2020) e 2025 (Quadro 11, pág. 114)", {
  2017: 19345343.68, 2018: 21372588.52, 2019: 21794803.83, 2020: 21806057.77,
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
export const receitaTotal = S("receitaTotal", "Receita total cobrada (com capital e empréstimos)", "Relatórios de 2020 (Quadro 9, 2017 a 2020) e 2025 (Quadro 11): total geral menos o saldo do ano anterior", {
  2017: 22011264.29, 2018: 46428948.49, 2019: 25705382.92, 2020: 25458131.64,
  2021: 41158191.77, 2022: 35694245.97, 2023: 39639492.93, 2024: 38039939.77, 2025: 47976376.58,
});

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

// Orçamento de 2026 (Quadro 16, pág. 94 do relatório do orçamento): dotação inicial de 2025 e de 2026.
export const orcamento = [
  { rubrica: "Despesas com pessoal", ano2025: 12955693.4, ano2026: 15371332.89, variacao: 18.65 },
  { rubrica: "Aquisição de bens e serviços", ano2025: 21851303.3, ano2026: 21732276.45, variacao: -0.54 },
  { rubrica: "Juros e outros encargos", ano2025: 1245000, ano2026: 601940.25, variacao: -51.65 },
  { rubrica: "Transferências e subsídios correntes", ano2025: 5499023.6, ano2026: 6401544.36, variacao: 16.41 },
  { rubrica: "Outras despesas correntes", ano2025: 194048.38, ano2026: 278829.92, variacao: 43.69 },
  { rubrica: "Total das despesas correntes", ano2025: 41745068.68, ano2026: 44385923.87, variacao: 6.33 },
  { rubrica: "Aquisição de bens de capital (investimento)", ano2025: 49215387.22, ano2026: 43102041.28, variacao: -12.42 },
  { rubrica: "Transferências e subsídios de capital", ano2025: 3363330.71, ano2026: 2790405.99, variacao: -17.03 },
  { rubrica: "Total das despesas de capital", ano2025: 52580717.93, ano2026: 45894447.27, variacao: -12.72 },
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
