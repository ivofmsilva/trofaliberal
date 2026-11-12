import bruto from "@/lib/dados/data/autarquia.json";

export type Documento = {
  tipo: "camara-ata" | "camara-deliberacoes" | "am-ata" | "am-deliberacoes" | "am-ordem" | "am-outro";
  ano: number | null;
  data: string | null;
  numero: number | null;
  ficheiro: string;
  url: string;
  // Só dia e mês ("12-30"), quando o nome do ficheiro não diz o ano.
  diaMes?: string;
  // Posição no arquivo antigo do site ("4Atas2020-4"): não é o número da ata.
  indice?: number;
  // "deliberações": o ficheiro que o município pôs na lista das atas é o das deliberações.
  obs?: string;
  // A data não vem no nome do ficheiro: foi lida dentro do PDF.
  dataDoPdf?: boolean;
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

// Texto do documento: "Ata n.º 18 · 30 de julho de 2026". Quando o nome do ficheiro não traz a data nem o número,
// fica o ano e, a cinzento, o que se sabe do ficheiro.
export function rotulo(d: Documento, nomeTipo: string) {
  const partes: string[] = [d.numero != null && d.tipo.endsWith("ata") ? `${nomeTipo} n.º ${d.numero}` : nomeTipo];
  if (d.data) partes.push(dataLonga(d.data));
  else if (d.diaMes) {
    const [m, dia] = d.diaMes.split("-").map(Number);
    partes.push(`${dia} de ${MESES[m - 1]}`);
  } else if (d.ano) partes.push(String(d.ano));

  let nota: string | null = null;
  if (d.obs === "deliberações") nota = "o ficheiro publicado é o das deliberações";
  else if (d.data) nota = null;
  else if (d.diaMes) nota = "o nome do ficheiro não diz o ano";
  else if (d.indice != null) nota = `ficheiro ${d.indice} do arquivo`;
  else if (d.numero == null) nota = d.ficheiro.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  return { titulo: partes.join(" · "), ficheiro: nota };
}

// Mais recentes primeiro. Quando todos têm número e a ordem dos números não contraria as datas (as atas da Câmara de
// cada ano), vale o número; senão, primeiro os que têm data, pela data, e depois os outros, pelo número ou pela
// posição no arquivo.
export function ordenar(docs: Documento[]) {
  if (docs.every((d) => d.numero != null)) {
    const porNumero = [...docs].sort((a, b) => b.numero! - a.numero! || (b.data ?? "").localeCompare(a.data ?? ""));
    const datas = porNumero.filter((d) => d.data).map((d) => d.data!);
    if (datas.every((x, i) => i === 0 || x <= datas[i - 1])) return porNumero;
  }
  const comData = docs.filter((d) => d.data).sort((a, b) => b.data!.localeCompare(a.data!) || (b.numero ?? -1) - (a.numero ?? -1));
  const semData = docs
    .filter((d) => !d.data)
    .sort((a, b) => (b.numero ?? -1) - (a.numero ?? -1) || (b.indice ?? -1) - (a.indice ?? -1) || a.ficheiro.localeCompare(b.ficheiro, "pt", { numeric: true }));
  return [...comData, ...semData];
}

// Agrupa pelo ano da sessão (o da data, quando se sabe); sem data, pelo ano da pasta onde o município pôs o ficheiro.
export function porAno(docs: Documento[]) {
  const mapa = new Map<number | "antigos", Documento[]>();
  for (const d of docs) {
    const k = d.data ? Number(d.data.slice(0, 4)) : (d.ano ?? "antigos");
    mapa.set(k, [...(mapa.get(k) ?? []), d]);
  }
  const anos = [...mapa.keys()].filter((k): k is number => k !== "antigos").sort((a, b) => b - a);
  const out: { chave: string; titulo: string; docs: Documento[] }[] = anos.map((a) => ({ chave: String(a), titulo: String(a), docs: ordenar(mapa.get(a)!) }));
  if (mapa.has("antigos")) out.push({ chave: "antigos", titulo: "Arquivo mais antigo (sem ano no nome do ficheiro)", docs: ordenar(mapa.get("antigos")!) });
  return out;
}
