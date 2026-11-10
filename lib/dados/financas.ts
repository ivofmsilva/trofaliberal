// Contas do Município da Trofa, transcritas do Relatório de Gestão 2025 (aprovado pela Câmara a 09/04/2026 e pela
// Assembleia a 28/04/2026) e do Relatório do Orçamento de 2026 (aprovado a 18/12/2025 e 29/12/2025).
// Cada série traz o quadro e a página do PDF de onde foi copiada. Valores em euros.

export const ANOS = ["2021", "2022", "2023", "2024", "2025"];

export const FONTE_CONTAS = "https://mun-trofa.pt/upload_files/1/1/Munic%C3%ADpio/C%C3%A2mara%20Municipal/planos_relatorios/Prestacao-contas-2025.pdf";
export const FONTE_ORCAMENTO = "https://mun-trofa.pt/menu/88/relatorio-de-atividades-e-contas";
export const PAGINA_RELATORIOS = "https://mun-trofa.pt/menu/88/relatorio-de-atividades-e-contas";

export type SerieContas = { id: string; nome: string; valores: number[]; quadro: string };

const S = (id: string, nome: string, quadro: string, valores: number[]): SerieContas => ({ id, nome, quadro, valores });

// Contabilidade patrimonial (Quadros 24 e 25).
export const gastosPessoal = S("gastosPessoal", "Gastos com pessoal", "Quadro 24 (pág. 135) e Quadro 86 (pág. 204)", [7239767.05, 7764080.69, 9240966.83, 10099778.1, 12002549.74]);
export const gastosFse = S("gastosFse", "Fornecimentos e serviços externos", "Quadro 24 (pág. 135)", [5089358.57, 6830180.41, 8665137.08, 10490064.67, 10405135.33]);
export const gastosOperacionais = S("gastosOperacionais", "Total de gastos operacionais", "Quadro 24 (pág. 135)", [21172699.93, 23327969.24, 28024159.03, 33133239.11, 35950869.16]);
export const rendimentosOperacionais = S("rendimentosOperacionais", "Total de rendimentos operacionais", "Quadro 25 (pág. 137)", [25187993.43, 28653939.01, 34618500.61, 34856936.03, 37212371.48]);
export const impostosTaxas = S("impostosTaxas", "Impostos, contribuições e taxas", "Quadro 25 (pág. 137)", [11492451.31, 12229384.91, 15075966.15, 14380762.9, 16381216.63]);

// Contabilidade orçamental, despesa paga (Quadro 15) e receita cobrada (Quadro 11).
export const despesaCorrente = S("despesaCorrente", "Despesa corrente paga", "Quadro 15 (pág. 123)", [16139786.01, 18250642.71, 22957602.92, 25380723.8, 28280281.17]);
export const despesaPessoalPaga = S("despesaPessoalPaga", "Despesas com pessoal pagas", "Quadro 15 (pág. 123)", [7345973.76, 7789984.38, 9534823.93, 10320250.96, 12264030.15]);
export const despesaBensServicos = S("despesaBensServicos", "Aquisição de bens e serviços pagos", "Quadro 15 (pág. 123)", [5277953.36, 6838317.49, 9220854.75, 9920543.94, 11107509.87]);
export const receitaCorrente = S("receitaCorrente", "Receitas correntes cobradas", "Quadro 11 (pág. 114)", [23139394.01, 27355802.74, 31387077.58, 33144655.31, 36830190.83]);
export const impostosDiretos = S("impostosDiretos", "Impostos diretos cobrados", "Quadro 11 (pág. 114)", [10011672.85, 12374999.7, 14174460.42, 12882251.47, 15080642.26]);
export const transferenciasCorrentes = S("transferenciasCorrentes", "Transferências correntes recebidas", "Quadro 11 (pág. 114)", [10587762.93, 12274308.98, 14266370.33, 16936282.24, 18221046.22]);

// Dívida (Quadros 29 e 30, pág. 140). "Efetiva" exclui os valores excecionados pela lei.
export const dividaTotal = S("dividaTotal", "Dívida total", "Quadro 29 (pág. 140)", [24863455.13, 28428730.14, 24533825.45, 23872497.34, 19896763.5]);
export const dividaEfetiva = S("dividaEfetiva", "Dívida efetiva do município", "Quadros 29 e 30 (pág. 140)", [20016086.77, 21671009.13, 16978854.35, 17383214.51, 14444427.47]);
export const dividaComParticipadas = S("dividaComParticipadas", "Dívida efetiva com as participadas", "Quadro 30 (pág. 140)", [20052595.64, 21675881.34, 16982098.33, 17389812.87, 14607329.06]);

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

export const crescimento = (s: number[]) => (s[s.length - 1] / s[0] - 1) * 100;
export const pesoPessoal = ANOS.map((_, i) => (despesaPessoalPaga.valores[i] / despesaCorrente.valores[i]) * 100);
export const milhoes = (v: number, casas = 2) => v / 1_000_000;
