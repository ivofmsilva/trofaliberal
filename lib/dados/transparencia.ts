import contratosBruto from "@/public/dados/data/contratos.json";
import { areaDe } from "./areas";
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
  // Vêm do ficheiro completo do Portal BASE (npm run recolher:base).
  cpv?: string | null;
  cpvd?: string | null;
  fund?: string | null;
  fundAD?: string | null;
  mat?: string | null;
  concorrentes?: number | null;
  // Pessoa singular: o nome não se publica (scripts/anonimizar-contratos.mjs). pid só serve para contar pessoas diferentes.
  ps?: number;
  pid?: number;
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

// Quem recebeu o contrato conta-se pelo NIF e não pelo texto: o Portal BASE escreve a mesma empresa de várias maneiras
// ("EDP Comercial, SA" / "EDP Comercial – Comercialização de Energia, S.A."), e pelo texto a mesma empresa aparecia partida em várias. Um agrupamento de empresas
// (vários NIF no mesmo contrato) é uma entidade à parte. Só quando não há NIF se usa o nome, sem acentos nem pontuação.
export function chaveEntidade(texto: string): string {
  const nifs = [...texto.matchAll(/(?:^|;)\s*(\d{8,9})\s*-/g)].map((m) => m[1]);
  if (nifs.length) return [...new Set(nifs)].sort().join("+");
  const nome = texto.replace(/^[-\s]+/, "");
  return "nome:" + nome.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

type Entidade = { n: number; valor: number; nomes: Map<string, number> };
function somarEntidade(m: Map<string, Entidade>, texto: string, valor: number) {
  const chave = chaveEntidade(texto);
  const x = m.get(chave) ?? { n: 0, valor: 0, nomes: new Map<string, number>() };
  x.n++;
  x.valor += valor;
  x.nomes.set(texto, (x.nomes.get(texto) ?? 0) + 1);
  m.set(chave, x);
}
// O nome que se mostra: a grafia mais usada nos contratos dessa entidade (em caso de empate, a mais comprida).
const nomeMaisUsado = (e: Entidade) => [...e.nomes.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]))[0][0];

export function resumoContratos() {
  const porAno = new Map<number, { n: number; valor: number }>();
  const porProc = new Map<string, { n: number; valor: number }>();
  const porEmpresa = new Map<string, Entidade>();
  for (const c of contratos) {
    const a = porAno.get(c.ano) ?? { n: 0, valor: 0 };
    a.n++;
    a.valor += c.valor_contratual;
    porAno.set(c.ano, a);
    const p = porProc.get(c.tipoprocedimento) ?? { n: 0, valor: 0 };
    p.n++;
    p.valor += c.valor_contratual;
    porProc.set(c.tipoprocedimento, p);
    if (!c.ps) somarEntidade(porEmpresa, c.adjudicatario, c.valor_contratual);
  }
  return {
    n: contratos.length,
    total: soma(contratos.map((c) => c.valor_contratual)),
    anos: [...porAno.entries()].sort((a, b) => a[0] - b[0]).map(([ano, v]) => ({ ano, ...v })),
    procedimentos: [...porProc.entries()].sort((a, b) => b[1].valor - a[1].valor).map(([nome, v]) => ({ nome, ...v })),
    // nome no formato "NIF - nome", como no ficheiro (a página separa-o com separarEmpresa).
    empresas: [...porEmpresa.values()].sort((a, b) => b.valor - a.valor).slice(0, 10).map((e) => ({ nome: nomeMaisUsado(e), n: e.n, valor: e.valor })),
  };
}

export function resumoFundos(lista: Projeto[]) {
  // Conta projetos (códigos diferentes), não linhas: se o ficheiro trouxer o mesmo projeto em mais de uma linha (uma por
  // localização), o projeto conta uma vez e os valores somam-se. (scripts/juntar-fundos.mjs já junta essas linhas.)
  const porPrograma = new Map<string, { n: number; valor: number }>();
  const porEstado = new Map<string, { n: number; valor: number }>();
  const vistos = new Set<string>();
  for (const p of lista) {
    const novo = !vistos.has(p.codigo_projeto);
    vistos.add(p.codigo_projeto);
    const a = porPrograma.get(p.programa) ?? { n: 0, valor: 0 };
    if (novo) a.n++;
    a.valor += p.valor_aprovado_municipio;
    porPrograma.set(p.programa, a);
    const e = porEstado.get(p.estado) ?? { n: 0, valor: 0 };
    if (novo) e.n++;
    e.valor += p.valor_aprovado_municipio;
    porEstado.set(p.estado, e);
  }
  return {
    n: vistos.size,
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

// ---- Ajustes diretos ------------------------------------------------------------------------------
export const AJUSTE_DIRETO = "Ajuste Direto Regime Geral";

type Soma = { n: number; valor: number };
const somar = (m: Map<string, Soma>, k: string, v: number) => {
  const x = m.get(k) ?? { n: 0, valor: 0 };
  x.n++;
  x.valor += v;
  m.set(k, x);
};
const ordenado = (m: Map<string, Soma>, por: "n" | "valor" = "valor") =>
  [...m.entries()].sort((a, b) => b[1][por] - a[1][por]).map(([nome, v]) => ({ nome, ...v }));

const ESCALOES: [string, number, number][] = [
  ["Até 1 000 €", 0, 1000],
  ["1 000 a 5 000 €", 1000, 5000],
  ["5 000 a 10 000 €", 5000, 10000],
  ["10 000 a 20 000 €", 10000, 20000],
  ["20 000 a 50 000 €", 20000, 50000],
  ["Mais de 50 000 €", 50000, Infinity],
];

export function resumoAjustes() {
  const ads = contratos.filter((c) => c.tipoprocedimento === AJUSTE_DIRETO);
  const totalValor = soma(contratos.map((c) => c.valor_contratual));
  const adValor = soma(ads.map((c) => c.valor_contratual));

  const anos = [...new Set(contratos.map((c) => c.ano))].sort((a, b) => a - b).map((ano) => {
    const todos = contratos.filter((c) => c.ano === ano);
    const dir = todos.filter((c) => c.tipoprocedimento === AJUSTE_DIRETO);
    return {
      ano,
      n: todos.length,
      nAD: dir.length,
      valor: soma(todos.map((c) => c.valor_contratual)),
      valorAD: soma(dir.map((c) => c.valor_contratual)),
    };
  });

  // Por área (a partir do CPV): quantos contratos da área foram ajustes diretos.
  const areas = new Map<string, { nome: string; n: number; valor: number; nAD: number; valorAD: number }>();
  for (const c of contratos) {
    const a = areaDe(c.cpv);
    const x = areas.get(a.id) ?? { nome: a.nome, n: 0, valor: 0, nAD: 0, valorAD: 0 };
    x.n++;
    x.valor += c.valor_contratual;
    if (c.tipoprocedimento === AJUSTE_DIRETO) {
      x.nAD++;
      x.valorAD += c.valor_contratual;
    }
    areas.set(a.id, x);
  }

  const porTipo = new Map<string, Soma>();
  const fund = new Map<string, Soma>();
  const motivo = new Map<string, Soma>();
  const empresas = new Map<string, Entidade>();
  const entidadesDiferentes = new Set<string>();
  const pessoas = { n: 0, valor: 0 };
  const escaloes = ESCALOES.map(([nome, de, ate]) => ({ nome, n: 0, valor: 0, de, ate }));
  let materiais = 0;
  for (const c of ads) {
    somar(porTipo, c.tipo_contrato, c.valor_contratual);
    somar(fund, (c.fund ?? "Sem fundamentação indicada").replace(/ do Código dos Contratos Públicos/, ""), c.valor_contratual);
    somar(motivo, c.fundAD && c.fundAD.trim() ? c.fundAD.trim() : "Sem motivo indicado", c.valor_contratual);
    entidadesDiferentes.add(c.ps ? `pessoa:${c.pid}` : chaveEntidade(c.adjudicatario));
    if (c.ps) {
      pessoas.n++;
      pessoas.valor += c.valor_contratual;
    } else somarEntidade(empresas, c.adjudicatario, c.valor_contratual);
    const e = escaloes.find((x) => c.valor_contratual >= x.de && c.valor_contratual < x.ate);
    if (e) {
      e.n++;
      e.valor += c.valor_contratual;
    }
    if (c.mat === "Sim") materiais++;
  }

  return {
    n: contratos.length,
    nAD: ads.length,
    totalValor,
    adValor,
    anos,
    areas: [...areas.values()].sort((a, b) => b.valorAD - a.valorAD),
    porTipo: ordenado(porTipo, "n"),
    fund: ordenado(fund, "n"),
    motivo: ordenado(motivo, "n"),
    empresas: [...empresas.values()]
      .sort((a, b) => b.n - a.n || b.valor - a.valor)
      .slice(0, 10)
      .map((e) => ({ nome: separarEmpresa(nomeMaisUsado(e)).nome, n: e.n, valor: e.valor })),
    escaloes,
    materiais,
    entidades: entidadesDiferentes.size,
    pessoas,
  };
}

export function resumoAreas() {
  const m = new Map<string, { nome: string; n: number; valor: number }>();
  for (const c of contratos) {
    const a = areaDe(c.cpv);
    const x = m.get(a.id) ?? { nome: a.nome, n: 0, valor: 0 };
    x.n++;
    x.valor += c.valor_contratual;
    m.set(a.id, x);
  }
  return [...m.values()].sort((a, b) => b.valor - a.valor);
}
