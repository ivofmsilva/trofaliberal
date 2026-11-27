// Orçamento aprovado e despesa paga: o que a Câmara se autoriza a gastar no início do ano e o que paga de facto.
// Pedido do Ivo (27/11/2026), depois de ver o orçamento da Trofa para 2027 (90 M€) acima do de Santo Tirso (85,5 M€).
//
// Despesa paga: INE, com dados da DGAL (despesas das câmaras municipais, total, 0013909, Dim3 = D), lida a 27/11/2026
// (atualizada no INE a 20/11/2026). Na Trofa bate com os relatórios de contas (2025: 74,16% de 60 521 786,61 €).
// Atualizar uma vez por ano, quando o INE publicar o ano novo (e juntar o orçamento inicial desse ano).
const CONTAS = "https://mun-trofa.pt/upload_files/1/1/Munic%C3%ADpio/C%C3%A2mara%20Municipal/planos_relatorios/";

export type AnoTrofa = {
  ano: string;
  inicial: number | null; // orçamento aprovado (dotação inicial total da despesa)
  inicialAprox?: boolean; // valor arredondado na fonte
  corrigido: number | null; // depois das revisões e alterações do ano (dotação corrigida)
  corrigidoCalculado?: boolean; // = pago ÷ grau de execução do relatório de 2025 (Quadro 16)
  pago: number | null;
  nota?: string;
  fonte?: { texto: string; url?: string };
};

// Grau de execução da despesa total (pago ÷ dotação corrigida), Relatório de Gestão de 2025, Quadro 16 (pág. 123):
// 2021 81,16%; 2022 81,50%; 2023 80,10%; 2024 79,80%; 2025 74,16%. Daí o "depois das revisões" de 2021 a 2023.
export const orcamentoTrofa: AnoTrofa[] = [
  {
    ano: "2021",
    inicial: 41_000_000,
    inicialAprox: true,
    corrigido: 42_309_000 / 0.8116,
    corrigidoCalculado: true,
    pago: 42_309_000,
  },
  {
    ano: "2022",
    inicial: 54_764_234.7,
    corrigido: 38_193_000 / 0.815,
    corrigidoCalculado: true,
    pago: 38_193_000,
    fonte: { texto: "Jornal Renovação: 54,7 M€ (ao cêntimo: o de 2023 menos o aumento noticiado, 4 472 944,71 €)", url: "http://jornal-renovacao.pt/2022/01/camara-municipal-da-trofa-aprova-orcamento-547me-2022-abstencao-do-ps/" },
  },
  {
    ano: "2023",
    inicial: 59_237_179.41,
    corrigido: 39_150_000 / 0.801,
    corrigidoCalculado: true,
    pago: 39_150_000,
    fonte: { texto: "O Notícias da Trofa: 59 237 179,41 €, mais 4 472 944,71 € do que em 2022", url: "https://www.onoticiasdatrofa.pt/folha-liberal-o-imi-e-o-orcamento-da-camara-da-trofa/" },
  },
  {
    ano: "2024",
    inicial: 84_042_998.82,
    corrigido: 48_420_264.5,
    pago: 38_640_000,
    fonte: { texto: "Relatório de Gestão de 2024, Quadro 12", url: CONTAS + "Prestacao-contas-2024-com-marcadores-site.pdf" },
  },
  {
    ano: "2025",
    inicial: 96_937_786.61,
    corrigido: 60_521_786.61,
    pago: 44_887_000,
    fonte: { texto: "Relatório de Gestão de 2025, Quadros 8, 12 e 16", url: CONTAS + "Prestacao-contas-2025.pdf" },
  },
  {
    ano: "2026",
    inicial: 93_262_464.03,
    corrigido: null,
    pago: null,
    nota: "ano em curso",
    fonte: { texto: "Relatório do Orçamento de 2026, Quadro 16", url: CONTAS + "Orcamento-2026-com-marcadores-site.pdf" },
  },
  {
    ano: "2027",
    inicial: 90_000_000,
    inicialAprox: true,
    corrigido: null,
    pago: null,
    nota: "aprovado pela Câmara a 20/11/2026",
    fonte: { texto: "O Notícias da Trofa", url: "https://www.onoticiasdatrofa.pt/trofa-aprova-orcamento-de-90-milhoes-de-euros-para-2027-e-reduz-impostos-municipais/" },
  },
];

// 2025 na Trofa (Relatório de Gestão de 2025, Quadros 8 e 12): o que mais mudou entre o orçamento inicial e o corrigido.
export const revisao2025 = {
  transferenciasCapital: { inicial: 48_958_477.34, corrigido: 13_763_244.28 }, // receita: sobretudo fundos europeus
  investimento: { inicial: 49_215_387.22, corrigido: 18_485_499.44 }, // despesa: aquisição de bens de capital
  grauExecucao: 74.16, // pago ÷ corrigido, o que o relatório apresenta
};

// Os 8 concelhos próximos: orçamento inicial (documentos das câmaras ou imprensa) e despesa paga (INE/DGAL).
export type Concelho8 = {
  concelho: string;
  anos: Record<"2024" | "2025", { inicial: number; aprox?: boolean; pago: number; fonte: string }>;
};

export const execucao8: Concelho8[] = [
  {
    concelho: "Trofa",
    anos: {
      "2024": { inicial: 84_042_998.82, pago: 38_640_000, fonte: CONTAS + "Prestacao-contas-2024-com-marcadores-site.pdf" },
      "2025": { inicial: 96_937_786.61, pago: 44_887_000, fonte: CONTAS + "Prestacao-contas-2025.pdf" },
    },
  },
  {
    concelho: "Santo Tirso",
    anos: {
      "2024": { inicial: 65_100_000, aprox: true, pago: 61_973_000, fonte: "https://www.cm-stirso.pt/cmsantotirso/uploads/links_list_item/document/394/cmst_jm51dez2023_site.pdf" },
      "2025": { inicial: 78_200_000, aprox: true, pago: 78_492_000, fonte: "https://portocanal.sapo.pt/noticia/358194" },
    },
  },
  {
    concelho: "Maia",
    anos: {
      "2024": { inicial: 153_280_451, pago: 106_860_000, fonte: "https://cm-maia.pt/cmmaia/uploads/document/file/5779/_gop_e_orcamento_2024.pdf" },
      "2025": { inicial: 228_713_149, pago: 147_131_000, fonte: "https://www.cm-maia.pt/cmmaia/uploads/document/file/6374/_gop_e_orcamento_2025.pdf" },
    },
  },
  {
    concelho: "Vila do Conde",
    anos: {
      "2024": { inicial: 112_000_000, aprox: true, pago: 81_020_000, fonte: "https://radioregional.pt/vila-do-conde-orcamento-de-112-milhoes-para-2024-e-o-maior-de-sempre/" },
      "2025": { inicial: 135_000_000, pago: 100_730_000, fonte: "https://www.cm-viladoconde.pt/cmviladoconde/uploads/document/file/9517/grandes_opcoes_do_plano_e_orcamento_para_2025.pdf" },
    },
  },
  {
    concelho: "Vila Nova de Famalicão",
    anos: {
      "2024": { inicial: 163_000_000, aprox: true, pago: 133_064_000, fonte: "https://www.famalicao.pt/famalicao-projeta-2024-com-orcamento-responsavel-e-ambicioso" },
      "2025": { inicial: 219_000_000, aprox: true, pago: 173_260_000, fonte: "https://famalicao.pt/famalicao-com-orcamento-historico-de-219-milhoes-de-euros-em-2025" },
    },
  },
  {
    concelho: "Guimarães",
    anos: {
      "2024": { inicial: 175_000_000, aprox: true, pago: 140_299_000, fonte: "https://jornaldeguimaraes.pt/noticias/camara-aprova-orcamento-de-175-milhoes-para-2024-o-maior-de-sempre/" },
      "2025": { inicial: 220_000_000, aprox: true, pago: 150_882_000, fonte: "https://www.guimaraesdigital.pt/index.php/informacao/politica/90461-220-milhoes-de-euros-camara-de-guimaraes-vai-ter-maior-orcamento-municipal-de-sempre-em-2025" },
    },
  },
  {
    concelho: "Vizela",
    anos: {
      "2024": { inicial: 20_124_546.63, pago: 20_060_000, fonte: "https://www.cm-vizela.pt/wp-content/uploads/2025/05/Prestacao_de_contas_2024.pdf" },
      "2025": { inicial: 25_253_019.03, pago: 27_630_000, fonte: "https://www.radiovizela.pt/noticia-documentos-previsionais-de-2025-aprovados-por-maioria" },
    },
  },
  {
    concelho: "Fafe",
    anos: {
      "2024": { inicial: 55_300_000, aprox: true, pago: 47_853_000, fonte: "https://cm-fafe.pt/noticia/camara-municipal-de-fafe-aprova-proposta-de-orcamento-para-2024" },
      "2025": { inicial: 85_600_000, aprox: true, pago: 63_680_000, fonte: "https://cm-fafe.pt/noticia/camara-municipal-de-fafe-aprova-proposta-de-orcamento-de-85-milhoes-para-2025" },
    },
  },
];

// Santo Tirso para 2027 (aprovado pela Câmara a 26/11/2026), para a comparação por habitante com a Trofa.
export const santoTirso2027 = {
  valor: 85_500_000,
  fonte: "https://www.cm-stirso.pt/conhecer/comunicacao/noticias/noticia/orcamento-recorde-de-85-5-milhoes-reforca-investimento-em-areas-prioritarias",
};

export const FONTE_DESPESA_PAGA = "https://www.ine.pt/xportal/xmain?xpid=INE&xpgid=ine_indicadores&indOcorrCod=0013909&contexto=bd&selTab=tab2";

export const pagoDoAprovado = (inicial: number | null, pago: number | null) => (inicial && pago !== null ? (pago / inicial) * 100 : null);
