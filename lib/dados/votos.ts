import assembleiaBruto from "@/public/dados/data/assembleia-votos.json";
import camaraBruto from "@/public/dados/data/camara-votos.json";

type Sentidos = Record<string, number>;
type Ponto = {
  resultado: string;
  tipo: "unanimidade" | "maioria" | "escrutínio secreto" | null;
  grupos?: { favor: Sentidos; contra: Sentidos; abstencoes: Sentidos } | null;
  gruposLista?: { favor: string[]; contra: string[]; abstencoes: string[] } | null;
};
type Sessao = { data: string | null; ano?: number; itens: Ponto[] };

const assembleia = (assembleiaBruto as unknown as { sessoes: Sessao[] }).sessoes;
const camara = (camaraBruto as unknown as { sessoes: Sessao[] }).sessoes;

const anoDe = (s: Sessao) => (s.data ? Number(s.data.slice(0, 4)) : (s.ano ?? 0));
const votado = (p: Ponto) => p.tipo !== null;

export type LinhaAno = { ano: number; votados: number; unanimes: number; maioria: number; secreto: number };

export function porAno(sessoes: Sessao[]): LinhaAno[] {
  const m = new Map<number, LinhaAno>();
  for (const s of sessoes) {
    const ano = anoDe(s);
    if (!ano) continue;
    const x = m.get(ano) ?? { ano, votados: 0, unanimes: 0, maioria: 0, secreto: 0 };
    for (const p of s.itens) {
      if (!votado(p)) continue;
      x.votados++;
      if (p.tipo === "unanimidade") x.unanimes++;
      else if (p.tipo === "maioria") x.maioria++;
      else x.secreto++;
    }
    m.set(ano, x);
  }
  return [...m.values()].filter((x) => x.votados > 0).sort((a, b) => a.ano - b.ano);
}

export const anosAssembleia = porAno(assembleia);
export const anosCamara = porAno(camara);

// O mandato conta-se desde a tomada de posse (24 de outubro de 2025), não desde o dia das eleições (12 de outubro): a reunião
// de Câmara de 16 de outubro de 2025 ainda foi do executivo anterior.
export const MANDATOS = [
  { id: "atual", nome: "Mandato atual (desde outubro de 2025)", de: "2025-10-24", ate: "9999" },
  { id: "anterior", nome: "Mandato 2021–2025", de: "2021-10-01", ate: "2025-10-24" },
];

type Tabela = { lista: string; favor: number; contra: number; abstencoes: number }[];
export type Mandato = { maioria: number; unanimes: number; tabela: Tabela };

const IGNORAR = new Set(["Presidente", "Vice-presidente"]);

// Nas deliberações de dezembro de 2025 a Assembleia ainda conta por partido (PSD, CDS-PP, PS); desde 2026 conta por lista
// (PSD/CDS-PP, PS-PAN-L). No mandato atual juntam-se, para a mesma lista não aparecer duas vezes.
const LISTA_ATUAL: Record<string, string> = { PSD: "PSD/CDS-PP", "CDS-PP": "PSD/CDS-PP", PS: "PS-PAN-L", PAN: "PS-PAN-L" };

function mandato(sessoes: Sessao[], de: string, ate: string, corpo: "assembleia" | "camara", atual = false): Mandato {
  const t = new Map<string, { favor: number; contra: number; abstencoes: number }>();
  let maioria = 0;
  let unanimes = 0;
  let nomes = new Set<string>();
  const conta = (nome: string, sentido: "favor" | "contra" | "abstencoes") => {
    if (IGNORAR.has(nome)) return;
    const lista = atual && corpo === "assembleia" ? (LISTA_ATUAL[nome] ?? nome) : nome;
    const chave = sentido + "|" + lista;
    if (nomes.has(chave)) return; // a mesma lista conta uma vez por sentido em cada votação
    nomes.add(chave);
    const x = t.get(lista) ?? { favor: 0, contra: 0, abstencoes: 0 };
    x[sentido]++;
    t.set(lista, x);
  };
  for (const s of sessoes) {
    if (!s.data || s.data < de || s.data >= ate) continue;
    for (const p of s.itens) {
      if (p.tipo === "unanimidade") unanimes++;
      if (p.tipo !== "maioria") continue;
      maioria++;
      nomes = new Set<string>();
      for (const sentido of ["favor", "contra", "abstencoes"] as const) {
        if (corpo === "assembleia") {
          for (const [g, n] of Object.entries(p.grupos?.[sentido] ?? {})) if (n > 0) conta(g, sentido);
        } else {
          for (const g of p.gruposLista?.[sentido] ?? []) conta(g, sentido);
        }
      }
    }
  }
  const tabela = [...t.entries()]
    .map(([lista, v]) => ({ lista, ...v }))
    .sort((a, b) => b.favor + b.contra + b.abstencoes - (a.favor + a.contra + a.abstencoes));
  return { maioria, unanimes, tabela };
}

export const mandatosAssembleia = MANDATOS.map((m) => ({ ...m, ...mandato(assembleia, m.de, m.ate, "assembleia", m.id === "atual") }));
export const mandatosCamara = MANDATOS.map((m) => ({ ...m, ...mandato(camara, m.de, m.ate, "camara") }));
