// Todos os indicadores, já juntados por scripts/juntar-indicadores.mjs (INE e IEFP recolhidos por nós; DGAL, DGEG, APA e
// os calculados vêm do portal de origem). As colunas são sempre Trofa, AMP, grupo dos 8 e Portugal.
import bruto from "@/lib/dados/data/indicadores-novo.json";
import { variacao, variacaoPP } from "./formatar";
import { destaques, temas, temaDe } from "./temas";

export type Ponto = { v: number | null; var: number | null };
export type Linha = {
  periodo: string;
  valores: Ponto[];
  // o valor de cada um dos 8 concelhos (só nos indicadores recolhidos por nós)
  concelhos?: Record<string, number | null>;
};
export type Indicador = {
  slug: string;
  titulo: string;
  categoria: string;
  fonte: string;
  unidade: string;
  colunas: string[];
  linhas: Linha[];
  texto?: string | null;
  // código no INE (e o da série antiga, quando os anos mais antigos vêm de outro código)
  ine?: string;
  ineAntigo?: string | null;
  // de onde vem: "ine" / "ine-proprio" / "iefp" (recolhidos por nós) ou "portal" (portal de origem)
  origem?: string;
  // como se calcula o grupo dos 8: soma, media (média simples), ponderada (pela população ou pelos inscritos) ou portal
  metodoGrupo?: string;
  metodologia?: string;
  notaColunas?: string;
};

const dados = bruto as unknown as { atualizado: string | null; juntado: string; indicadores: (Indicador & { unidade: string | null })[] };

export const indicadores: Indicador[] = dados.indicadores.map((i) => ({ ...i, unidade: i.unidade ?? "" }));
export const atualizado = dados.atualizado;

export function porSlug(slug: string) {
  return indicadores.find((i) => i.slug === slug);
}

// Último período com valor para a Trofa (primeira coluna).
export function ultimo(i: Indicador) {
  for (let k = i.linhas.length - 1; k >= 0; k--) {
    const p = i.linhas[k].valores[0];
    if (p && p.v !== null) return { periodo: i.linhas[k].periodo, linha: k, ...p };
  }
  return null;
}

// Variação de um valor face ao anterior da mesma coluna: em percentagem ou, quando o indicador já é uma percentagem,
// em pontos percentuais. Sem valor anterior não há variação.
export function variacaoDe(i: Indicador, linha: number, coluna = 0) {
  const p = i.linhas[linha]?.valores[coluna];
  if (!p || p.v === null || p.var === null) return null;
  if (!i.unidade.startsWith("%")) return variacao(p.var);
  for (let k = linha - 1; k >= 0; k--) {
    const anterior = i.linhas[k].valores[coluna]?.v ?? null;
    if (anterior !== null) return variacaoPP(p.v, anterior);
  }
  return null;
}

// Colunas que têm pelo menos um valor (a da Trofa fica sempre). Uma coluna de comparação toda vazia não se mostra.
export function colunasComDados(i: Indicador): number[] {
  return i.colunas.map((_, c) => c).filter((c) => c === 0 || i.linhas.some((l) => (l.valores[c]?.v ?? null) !== null));
}

// Indicadores em euros com valores de milhões: mostram-se em M€ no número grande, no gráfico e na tabela.
export function emMilhoes(i: Indicador): boolean {
  return i.unidade === "€" && i.linhas.some((l) => Math.abs(l.valores[0]?.v ?? 0) >= 1_000_000);
}

// Colunas de comparação, pela ordem em que aparecem nos cartões (a Trofa primeiro).
export const NOME_GRUPO = "Ave e concelhos vizinhos";
const ROTULO: Record<string, string> = { [NOME_GRUPO]: "Grupo dos 8", "Área Metropolitana do Porto": "Área Metropolitana" };
export const rotuloColuna = (c: string) => ROTULO[c] ?? c;

// Os valores das colunas comparam-se diretamente quando têm a mesma ordem de grandeza (taxas, valores por habitante,
// medianas). Quando a coluna de comparação é uma soma (população, empresas, euros), compara-se só a evolução.
export function comparavelEmNivel(i: Indicador): boolean {
  const g = i.colunas.indexOf(NOME_GRUPO);
  for (let k = i.linhas.length - 1; k >= 0; k--) {
    const t = i.linhas[k].valores[0]?.v, v = i.linhas[k].valores[g]?.v;
    if (t != null && v != null && t !== 0) {
      const r = v / t;
      return r > 0.25 && r < 4;
    }
  }
  return false;
}

// Comparação do último período da Trofa com as outras colunas: valor e variação de cada uma.
export function comparacaoUltimo(i: Indicador) {
  const u = ultimo(i);
  if (!u) return [];
  return colunasComDados(i).map((c) => ({
    nome: rotuloColuna(i.colunas[c]),
    trofa: c === 0,
    v: i.linhas[u.linha].valores[c]?.v ?? null,
    varBruta: i.linhas[u.linha].valores[c]?.var ?? null,
    variacao: variacaoDe(i, u.linha, c),
  }));
}

// Série de uma coluna (para o minigráfico), com null onde falta.
export function serieColuna(i: Indicador, coluna: number): (number | null)[] {
  return i.linhas.map((l) => l.valores[coluna]?.v ?? null);
}

export function serieTrofa(i: Indicador): { periodo: string; v: number }[] {
  return i.linhas.flatMap((l) => (l.valores[0]?.v == null ? [] : [{ periodo: l.periodo, v: l.valores[0].v as number }]));
}

export function porTema() {
  return temas.map((t) => ({
    ...t,
    itens: t.slugs.map((s) => porSlug(s)).filter((x): x is Indicador => Boolean(x)),
  }));
}

export function indicadoresDestaque() {
  return destaques.map((s) => porSlug(s)).filter((x): x is Indicador => Boolean(x));
}

export { temaDe };
