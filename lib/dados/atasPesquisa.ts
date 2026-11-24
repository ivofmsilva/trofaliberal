// Pesquisa no texto das atas da Câmara e da Assembleia (só no servidor: o texto tem 23 MB).
// O texto vem de lib/atasPesquisaDados.ts (scripts/indice-atas.mjs), com os dados pessoais escondidos nas intervenções do público.
// Procura sem acentos nem maiúsculas; todas as palavras têm de estar na ata; cada palavra conta inteira ou no plural
// ("metro" encontra "metro" e "metros", não "metropolitana"); entre aspas procura a expressão exata.
import zlib from "node:zlib";
import { ATAS_GZ_BASE64 } from "@/lib/dados/atasPesquisaDados";

type Ata = { o: "C" | "A"; d: string | null; a: number | null; n: string | number | null; u: string; t: string };
type Carregadas = { gerado: string; atas: (Ata & { s: string })[] };

let cache: Carregadas | null = null;

// Tira os acentos e põe em minúsculas sem mudar o comprimento (para os excertos baterem certo com o texto original).
const ACENTOS: Record<string, string> = {};
for (const [base, letras] of Object.entries({ a: "áàâãäå", e: "éèêë", i: "íìîï", o: "óòôõö", u: "úùûü", c: "ç", n: "ñ" })) {
  for (const l of letras) {
    ACENTOS[l] = base;
    ACENTOS[l.toUpperCase()] = base;
  }
}
export function simples(s: string) {
  const baixo = s.toLowerCase();
  if (baixo.length === s.length) return baixo.replace(/[áàâãäåéèêëíìîïóòôõöúùûüçñ]/g, (c) => ACENTOS[c]);
  // caso raro (letra que muda de comprimento em minúscula): letra a letra
  let r = "";
  for (const ch of s) {
    const m = ACENTOS[ch];
    if (m) r += m;
    else {
      const l = ch.toLowerCase();
      r += l.length === ch.length ? l : ch;
    }
  }
  return r;
}

function carregar(): Carregadas {
  if (cache) return cache;
  const json = JSON.parse(zlib.gunzipSync(Buffer.from(ATAS_GZ_BASE64, "base64")).toString("utf8")) as { gerado: string; atas: Ata[] };
  cache = { gerado: json.gerado, atas: json.atas.map((a) => ({ ...a, s: simples(a.t) })) };
  return cache;
}

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Partes da pesquisa: expressões entre aspas e palavras soltas (com 2 letras ou mais).
export function partesDaPesquisa(q: string) {
  const partes: { texto: string; exata: boolean }[] = [];
  const resto = q.replace(/["“”«»]([^"“”«»]+)["“”«»]/g, (_m, frase: string) => {
    const t = simples(frase).replace(/\s+/g, " ").trim();
    if (t.length >= 2) partes.push({ texto: t, exata: true });
    return " ";
  });
  for (const w of simples(resto).split(/[^a-z0-9-]+/)) {
    const p = w.replace(/^-+|-+$/g, "");
    if (p.length >= 2 && !partes.some((x) => x.texto === p)) partes.push({ texto: p, exata: false });
  }
  return partes.slice(0, 8);
}

function expressao(p: { texto: string; exata: boolean }) {
  const corpo = p.texto.split(" ").map(escapar).join("\\s+");
  return new RegExp(`(?<![a-z0-9])${corpo}${p.exata ? "" : "(?:s|es)?"}(?![a-z0-9])`, "g");
}

export type Excerto = { texto: string; marcas: [number, number][] };
export type Resultado = { orgao: "C" | "A"; data: string | null; ano: number | null; numero: string | number | null; url: string; vezes: number; excertos: Excerto[] };

const LARGURA = 160; // letras de cada lado da palavra encontrada

function excertos(a: Ata & { s: string }, res: RegExp[]): { vezes: number; excertos: Excerto[] } {
  const posicoes: [number, number][] = [];
  for (const re of res) {
    re.lastIndex = 0;
    for (const m of a.s.matchAll(re)) posicoes.push([m.index, m.index + m[0].length]);
  }
  posicoes.sort((x, y) => x[0] - y[0]);
  const vezes = posicoes.length;
  const lista: Excerto[] = [];
  let fimAnterior = -1;
  for (const [ini] of posicoes) {
    if (ini < fimAnterior) continue;
    let de = Math.max(0, ini - LARGURA);
    let ate = Math.min(a.t.length, ini + LARGURA);
    // começa e acaba em palavra inteira
    if (de > 0) de = a.t.indexOf(" ", de) + 1 || de;
    if (ate < a.t.length) ate = a.t.lastIndexOf(" ", ate) > ini ? a.t.lastIndexOf(" ", ate) : ate;
    const marcas = posicoes.filter(([i, f]) => i >= de && f <= ate).map(([i, f]) => [i - de, f - de] as [number, number]);
    lista.push({ texto: (de > 0 ? "…" : "") + a.t.slice(de, ate) + (ate < a.t.length ? "…" : ""), marcas: de > 0 ? marcas.map(([i, f]) => [i + 1, f + 1]) : marcas });
    fimAnterior = ate;
    if (lista.length >= 3) break;
  }
  return { vezes, excertos: lista };
}

export function procurarAtas(q: string, filtros: { orgao?: string | null; ano?: string | null; inicio?: number }) {
  const { gerado, atas } = carregar();
  const partes = partesDaPesquisa(q);
  const anos = [...new Set(atas.map((a) => a.a ?? (a.d ? Number(a.d.slice(0, 4)) : null)).filter((x): x is number => Boolean(x)))].sort((x, y) => y - x);
  if (!partes.length) return { gerado, total: 0, atasNoIndice: atas.length, anos, resultados: [] as Resultado[], partes };
  const res = partes.map(expressao);
  const orgao = filtros.orgao === "C" || filtros.orgao === "A" ? filtros.orgao : null;
  const ano = filtros.ano && /^\d{4}$/.test(filtros.ano) ? Number(filtros.ano) : null;
  const encontradas = atas.filter((a) => {
    if (orgao && a.o !== orgao) return false;
    const anoAta = a.a ?? (a.d ? Number(a.d.slice(0, 4)) : null);
    if (ano && anoAta !== ano) return false;
    return res.every((re) => {
      re.lastIndex = 0;
      return re.test(a.s);
    });
  });
  const inicio = Math.max(0, filtros.inicio ?? 0);
  const resultados: Resultado[] = encontradas.slice(inicio, inicio + 20).map((a) => ({
    orgao: a.o,
    data: a.d,
    ano: a.a ?? (a.d ? Number(a.d.slice(0, 4)) : null),
    numero: a.n,
    url: a.u,
    ...excertos(a, res),
  }));
  return { gerado, total: encontradas.length, atasNoIndice: atas.length, anos, resultados, partes };
}
