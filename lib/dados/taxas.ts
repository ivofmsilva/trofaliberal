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

const NOMES: Record<string, string> = { CH: "Chega", "PSD/CDS-PP": "Unidos pela Trofa", "PS-PAN-L": "Trofa em Primeiro" };
// No mandato atual (desde outubro de 2025) os grupos aparecem pelo nome da lista, como nas páginas da Câmara e da
// Assembleia. As deliberações de dezembro de 2025 ainda contam por partido: somam-se na lista.
const INICIO_MANDATO_ATUAL = "2025-10-12";
const LISTA_ATUAL: Record<string, string> = { PSD: "PSD/CDS-PP", "CDS-PP": "PSD/CDS-PP", PS: "PS-PAN-L", PAN: "PS-PAN-L" };
const lista = (s: Sentidos, atual: boolean) => {
  if (!atual) return Object.entries(s).map(([g, n]) => `${NOMES[g] ?? g} ${n}`).join(", ");
  const listas = new Map<string, number>();
  for (const [g, n] of Object.entries(s)) {
    const l = LISTA_ATUAL[g] ?? g;
    listas.set(l, (listas.get(l) ?? 0) + n);
  }
  return [...listas.entries()].map(([l, n]) => `${NOMES[l] ?? l} ${n}`).join(", ");
};

// "Unanimidade" ou "Maioria: a favor 17 (PSD/CDS-PP 17); abstenções 8 (PS 8); contra 1 (PCP/PEV 1)".
// Com a data da sessão, as do mandato atual mostram as listas ("Unidos pela Trofa 14") em vez dos partidos.
export function textoVoto(v: Voto | null | undefined, sessao?: string): string {
  const atual = Boolean(sessao && sessao >= INICIO_MANDATO_ATUAL);
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
      partes.push(`${rotulo} ${t[chave]}${g && Object.keys(g).length ? ` (${lista(g, atual)})` : ""}`);
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
