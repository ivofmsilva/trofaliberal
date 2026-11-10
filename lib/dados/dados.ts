import bruto from "@/lib/dados/data/indicadores.json";
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
};

const dados = bruto as unknown as { atualizado: string | null; recolhido: string; indicadores: Indicador[] };

export const indicadores = dados.indicadores;
export const atualizado = dados.atualizado;

export function porSlug(slug: string) {
  return indicadores.find((i) => i.slug === slug);
}

// Último período com valor para a Trofa (primeira coluna).
export function ultimo(i: Indicador) {
  for (let k = i.linhas.length - 1; k >= 0; k--) {
    const p = i.linhas[k].valores[0];
    if (p && p.v !== null) return { periodo: i.linhas[k].periodo, ...p };
  }
  return null;
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
