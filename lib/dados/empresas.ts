// Empresas municipais da Trofa: a TrofAmbiente (antes Trofáguas). Dados em data/empresas-municipais.json, gerados a
// partir dos documentos que a empresa publica em trofambiente.pt (scripts/extrair-trofambiente.mjs e
// scripts/contas-trofambiente.mjs), e em data/trofambiente-contratos.json, do Portal BASE (scripts/contratos-trofambiente.mjs).
import dados from "@/lib/dados/data/empresas-municipais.json";
import base from "@/lib/dados/data/trofambiente-contratos.json";

export type Contrato = { ano: number; subsidio: number; url: string };
export type Conta = {
  ano: number;
  url: string;
  relatorio: number; // ano do relatório de onde vem a demonstração de resultados
  pagina: number; // página do PDF
  vendasServicos: number;
  subsidiosExploracao: number;
  fornecimentosServicosExternos: number;
  gastosPessoal: number;
  ebitda: number;
  resultadoLiquido: number;
  nota?: string;
};
export type Documento = { titulo: string; url: string };
export type Categoria = { categoria: string; pagina: string | null; documentos: Documento[] };
export type Alteracao = { ano: number; titulo: string; url: string };
export type ContratoPublico = {
  idcontrato: string;
  objeto: string | null;
  tipo_contrato: string | null;
  tipoprocedimento: string | null;
  adjudicatario: string | null;
  valor_contratual: number | null;
  data_celebracao: string | null;
  ano: number | null;
  cpvd: string | null;
  prazo_execucao: number | null;
};

type Dados = {
  recolhido: string;
  trofambiente: {
    site: string;
    contratos: Contrato[];
    alteracoes: Alteracao[];
    contas?: Conta[];
    documentos: Categoria[];
  };
};

const d = dados as unknown as Dados;
export const trofambiente = d.trofambiente;
export const recolhido = d.recolhido;
export const contratos = trofambiente.contratos;
export const contas: Conta[] = trofambiente.contas ?? [];
export const ultimoContrato = contratos[contratos.length - 1];
export const contratoEm = (ano: number) => contratos.find((c) => c.ano === ano) ?? null;
export const contaEm = (ano: number) => contas.find((c) => c.ano === ano) ?? null;
export const alteracoesDe = (ano: number) => trofambiente.alteracoes.filter((a) => a.ano === ano);
export const contratosPublicos = base as unknown as ContratoPublico[];

// Número médio de pessoas ao serviço da empresa (nota "Número de pessoas ao serviço" até 2009 e "Benefícios dos empregados"
// desde 2012), com a página do PDF de cada relatório e contas. 2010 e 2011 sem número; o quadro de 2014 repete o de 2013.
export const pessoasAoServico: { ano: number; media: number; pagina: number }[] = [
  { ano: 2007, media: 24, pagina: 9 },
  { ano: 2008, media: 24, pagina: 9 },
  { ano: 2009, media: 25, pagina: 37 },
  { ano: 2012, media: 29, pagina: 67 },
  { ano: 2013, media: 29, pagina: 85 },
  { ano: 2014, media: 29, pagina: 83 },
  { ano: 2015, media: 11, pagina: 78 },
  { ano: 2016, media: 14, pagina: 79 },
  { ano: 2017, media: 16, pagina: 77 },
  { ano: 2018, media: 17, pagina: 74 },
  { ano: 2019, media: 16, pagina: 71 },
  { ano: 2020, media: 22, pagina: 74 },
  { ano: 2021, media: 21, pagina: 76 },
  { ano: 2022, media: 16, pagina: 72 },
  { ano: 2023, media: 19, pagina: 73 },
  { ano: 2024, media: 19, pagina: 74 },
  { ano: 2025, media: 19, pagina: 74 },
];
