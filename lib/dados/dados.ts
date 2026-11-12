import bruto from "@/lib/dados/data/indicadores.json";
import ineBruto from "@/lib/dados/data/indicadores-ine.json";
import { variacao, variacaoPP } from "./formatar";
import { destaques, temas, temaDe } from "./temas";

export type Ponto = { v: number | null; var: number | null };
export type Indicador = {
  slug: string;
  titulo: string;
  categoria: string;
  fonte: string;
  unidade: string;
  colunas: string[];
  linhas: { periodo: string; valores: Ponto[] }[];
  // Indicadores obtidos diretamente ao INE (scripts/recolher-ine.mjs): explicação e código no INE.
  texto?: string;
  ine?: string;
};

const dados = bruto as unknown as { atualizado: string | null; recolhido: string; indicadores: Indicador[] };

const doIne = (ineBruto as unknown as { indicadores: Indicador[] }).indicadores;
export const indicadores = [...dados.indicadores, ...doIne];
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
