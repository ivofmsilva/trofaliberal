// Todos os indicadores, já juntados por scripts/juntar-indicadores.mjs (INE e IEFP recolhidos por nós; DGAL, DGEG, APA e
// os calculados vêm do portal de origem). As colunas são sempre Trofa, AMP, os 8 concelhos próximos e Portugal.
import bruto from "@/lib/dados/data/indicadores-novo.json";
import { variacao, variacaoPP } from "./formatar";
import { destaques, temas, temaDe } from "./temas";
import { ROTULO_GRUPO } from "./rotulos";

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
  // palavras do dia a dia para a pesquisa ("casa", "lixo", "impostos"); não aparecem na página
  palavras?: string | null;
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

// Variação de um valor face ao anterior da mesma coluna, e o período com que se compara ("desde"): em percentagem ou,
// quando o indicador já é uma percentagem, em pontos percentuais. Sem valor anterior não há variação. O sinal sai dos
// valores (e não da variação arredondada): uma descida de 0,02% é "▼ menos de 0,1%" e não "＝ 0,0%".
export function variacaoDe(i: Indicador, linha: number, coluna = 0) {
  const atual = i.linhas[linha]?.valores[coluna]?.v ?? null;
  if (atual === null) return null;
  for (let k = linha - 1; k >= 0; k--) {
    const anterior = i.linhas[k].valores[coluna]?.v ?? null;
    if (anterior === null) continue;
    const desde = i.linhas[k].periodo;
    if (i.unidade.startsWith("%")) {
      const v = variacaoPP(atual, anterior);
      return v && { ...v, desde };
    }
    if (anterior === 0) return null;
    const v = variacao(((atual - anterior) / Math.abs(anterior)) * 100);
    if (!v) return null;
    if (atual !== anterior && v.texto === "0,0%") return { texto: "menos de 0,1%", sinal: atual > anterior ? ("sobe" as const) : ("desce" as const), desde };
    return { ...v, sinal: atual > anterior ? ("sobe" as const) : atual < anterior ? ("desce" as const) : ("igual" as const), desde };
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
const ROTULO: Record<string, string> = { [NOME_GRUPO]: ROTULO_GRUPO, "Área Metropolitana do Porto": "Área Metropolitana" };
export const rotuloColuna = (c: string) => ROTULO[c] ?? c;

// Os valores das colunas comparam-se diretamente nas taxas, nos valores por habitante e nas medianas. Quando as colunas
// de comparação são totais (população, empresas, euros, MWh), compara-se a evolução. Decide-se pela conta do grupo
// (que diz se é um total) e, nos que vêm do portal de origem, pela unidade.
export function comparavelEmNivel(i: Indicador): boolean {
  if (i.metodoGrupo === "soma") return false;
  if (i.metodoGrupo && i.metodoGrupo !== "portal") return true;
  return /^%|‰| por | por$|dias|habitante|consumidor/.test(i.unidade);
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
