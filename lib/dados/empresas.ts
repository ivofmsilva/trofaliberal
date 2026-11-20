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
