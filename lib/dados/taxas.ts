import bruto from "@/lib/dados/data/taxas.json";
import { numero } from "./formatar";

type Sentidos = Record<string, number>;
export type Voto = {
  tipo: "unanimidade" | "maioria" | "escrutínio secreto" | null;
  totais: { favor: number; contra: number; abstencoes: number; brancos: number } | null;
  grupos: { favor: Sentidos; contra: Sentidos; abstencoes: Sentidos; brancos: Sentidos } | null;
};
export type TaxaIMI = Voto & { sessao: string; url: string; paraAno: number; urbanos: number | null; rusticos: number | null };
export type TaxaIRS = Voto & { sessao: string; url: string; percentagem: number | null; retificacao: boolean };
export type TaxaDerrama = {
  sessao: string;
  url: string;
  normal: number | null;
  reduzida: number | null;
  votoNormal: Voto | null;
  votoReduzida: Voto | null;
};

const dados = bruto as unknown as { imi: TaxaIMI[]; irs: TaxaIRS[]; derrama: TaxaDerrama[] };
export const imi = dados.imi;
export const irs = dados.irs;
export const derrama = dados.derrama;

const NOMES: Record<string, string> = { CH: "Chega" };
const lista = (s: Sentidos) =>
  Object.entries(s)
    .map(([g, n]) => `${NOMES[g] ?? g} ${n}`)
    .join(", ");

// "Unanimidade" ou "Maioria: a favor 17 (PSD/CDS-PP 17); abstenções 8 (PS 8); contra 1 (PCP/PEV 1)".
export function textoVoto(v: Voto | null | undefined): string {
  if (!v || !v.tipo) return "—";
  if (v.tipo === "unanimidade") return "Unanimidade";
  const t = v.totais;
  if (!t) return v.tipo === "maioria" ? "Maioria" : "Escrutínio secreto";
  const partes: string[] = [];
  for (const [chave, rotulo] of [
    ["favor", "a favor"],
    ["contra", "contra"],
    ["abstencoes", "abstenções"],
    ["brancos", "brancos"],
  ] as const) {
    if (t[chave] > 0) {
      const g = v.grupos?.[chave];
      partes.push(`${rotulo} ${t[chave]}${g && Object.keys(g).length ? ` (${lista(g)})` : ""}`);
    }
  }
  return `Maioria: ${partes.join("; ")}`;
}

export const pc = (v: number | null, casas = 2) => (v === null ? "—" : `${numero(v, casas)}%`);

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
export function dataCurta(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}
