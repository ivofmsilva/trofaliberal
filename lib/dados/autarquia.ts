import bruto from "@/lib/dados/data/autarquia.json";

export type Documento = {
  tipo: "camara-ata" | "am-ata" | "am-deliberacoes" | "am-ordem";
  ano: number | null;
  data: string | null;
  numero: number | null;
  ficheiro: string;
  url: string;
};

const dados = bruto as unknown as { recolhido: string; camara: Documento[]; assembleia: Documento[] };

export const camara = dados.camara;
export const assembleia = dados.assembleia;
export const recolhido = dados.recolhido;

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function dataLonga(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}

// Texto do documento: "Ata n.º 18 · 30 de julho de 2026", ou o nome do ficheiro quando não há mais nada.
export function rotulo(d: Documento, nomeTipo: string) {
  const partes: string[] = [];
  if (d.numero != null && d.tipo.endsWith("ata")) partes.push(`${nomeTipo} n.º ${d.numero}`);
  else partes.push(nomeTipo);
  if (d.data) partes.push(dataLonga(d.data));
  else if (d.ano && d.numero == null) partes.push(String(d.ano));
  const limpo = d.ficheiro.replace(/[_]+/g, " ").trim();
  return { titulo: partes.join(" · "), ficheiro: !d.data && d.numero == null ? limpo : null };
}

// Mais recentes primeiro: pela data quando existe, senão pelo número.
export function ordenar(docs: Documento[]) {
  return [...docs].sort((a, b) => {
    if (a.data && b.data) return b.data.localeCompare(a.data);
    if (a.numero != null && b.numero != null) return b.numero - a.numero;
    return b.ficheiro.localeCompare(a.ficheiro, "pt");
  });
}

export function porAno(docs: Documento[]) {
  const mapa = new Map<number | "antigos", Documento[]>();
  for (const d of docs) {
    const k = d.ano ?? "antigos";
    mapa.set(k, [...(mapa.get(k) ?? []), d]);
  }
  const anos = [...mapa.keys()].filter((k): k is number => k !== "antigos").sort((a, b) => b - a);
  const out: { chave: string; titulo: string; docs: Documento[] }[] = anos.map((a) => ({ chave: String(a), titulo: String(a), docs: ordenar(mapa.get(a)!) }));
  if (mapa.has("antigos")) out.push({ chave: "antigos", titulo: "Arquivo mais antigo (sem data no ficheiro)", docs: ordenar(mapa.get("antigos")!) });
  return out;
}
