import contratosBruto from "@/public/dados/data/contratos.json";
import fundosMunicipioBruto from "@/public/dados/data/fundos-municipio.json";
import fundosConcelhoBruto from "@/public/dados/data/fundos-concelho.json";

export type Contrato = {
  idcontrato: string;
  objeto: string;
  tipo_contrato: string;
  tipoprocedimento: string;
  adjudicatario: string;
  n_concorrentes: number | null;
  valor_contratual: number;
  data_celebracao: string;
  data_fecho: string | null;
  prazo_execucao: number | null;
  link_pecas_proc: string | null;
  ano: number;
};

export type Projeto = {
  codigo_projeto: string;
  titulo: string;
  beneficiario: string;
  n_beneficiarios: number;
  programa: string;
  estado: string;
  percentagem_localizacao_municipio: number;
  valor_aprovado_municipio: number;
  data_efetiva_conclusao: string | null;
};

export const contratos = contratosBruto as unknown as Contrato[];
export const fundosMunicipio = fundosMunicipioBruto as unknown as Projeto[];
export const fundosConcelho = fundosConcelhoBruto as unknown as Projeto[];

const soma = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export function resumoContratos() {
  const porAno = new Map<number, { n: number; valor: number }>();
  const porProc = new Map<string, { n: number; valor: number }>();
  const porEmpresa = new Map<string, { n: number; valor: number }>();
  for (const c of contratos) {
    const a = porAno.get(c.ano) ?? { n: 0, valor: 0 };
    a.n++;
    a.valor += c.valor_contratual;
    porAno.set(c.ano, a);
    const p = porProc.get(c.tipoprocedimento) ?? { n: 0, valor: 0 };
    p.n++;
    p.valor += c.valor_contratual;
    porProc.set(c.tipoprocedimento, p);
    const e = porEmpresa.get(c.adjudicatario) ?? { n: 0, valor: 0 };
    e.n++;
    e.valor += c.valor_contratual;
    porEmpresa.set(c.adjudicatario, e);
  }
  return {
    n: contratos.length,
    total: soma(contratos.map((c) => c.valor_contratual)),
    anos: [...porAno.entries()].sort((a, b) => a[0] - b[0]).map(([ano, v]) => ({ ano, ...v })),
    procedimentos: [...porProc.entries()].sort((a, b) => b[1].valor - a[1].valor).map(([nome, v]) => ({ nome, ...v })),
    empresas: [...porEmpresa.entries()].sort((a, b) => b[1].valor - a[1].valor).slice(0, 10).map(([nome, v]) => ({ nome, ...v })),
  };
}

export function resumoFundos(lista: Projeto[]) {
  const porPrograma = new Map<string, { n: number; valor: number }>();
  const porEstado = new Map<string, { n: number; valor: number }>();
  for (const p of lista) {
    const a = porPrograma.get(p.programa) ?? { n: 0, valor: 0 };
    a.n++;
    a.valor += p.valor_aprovado_municipio;
    porPrograma.set(p.programa, a);
    const e = porEstado.get(p.estado) ?? { n: 0, valor: 0 };
    e.n++;
    e.valor += p.valor_aprovado_municipio;
    porEstado.set(p.estado, e);
  }
  return {
    n: lista.length,
    total: soma(lista.map((p) => p.valor_aprovado_municipio)),
    programas: [...porPrograma.entries()].sort((a, b) => b[1].valor - a[1].valor).map(([nome, v]) => ({ nome, ...v })),
    estados: [...porEstado.entries()].sort((a, b) => b[1].valor - a[1].valor).map(([nome, v]) => ({ nome, ...v })),
    maiores: [...lista].sort((a, b) => b.valor_aprovado_municipio - a.valor_aprovado_municipio).slice(0, 8),
  };
}

// Nome da empresa sem o NIF à frente ("500119309 - FRANCISCO…" → nome e NIF à parte).
export function separarEmpresa(texto: string): { nome: string; nif: string | null } {
  const m = texto.match(/^\s*(\d{8,9})\s*-\s*(.*)$/);
  if (m) return { nome: m[2].trim(), nif: m[1] };
  return { nome: texto.replace(/^[-\s]+/, "").trim(), nif: null };
}
