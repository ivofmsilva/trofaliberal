// Formatação de números à portuguesa: espaço entre milhares, vírgula nos decimais.
const NBSP = " "; // espaço que não parte a linha

export function numero(v: number, casas?: number): string {
  const txt = v.toLocaleString("pt-PT", {
    useGrouping: false,
    minimumFractionDigits: casas ?? 0,
    maximumFractionDigits: casas ?? 2,
  });
  const [inteiro, dec] = txt.split(",");
  const neg = inteiro.startsWith("-") ? "-" : "";
  const digitos = inteiro.replace("-", "");
  const agrupado = digitos.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return neg + agrupado + (dec ? "," + dec : "");
}

// Euros: sem cêntimos quando o valor é inteiro, senão sempre com dois algarismos (nunca "493 962,8").
export function euros(v: number): string {
  return numero(v, Number.isInteger(v) ? 0 : 2);
}

// Milhões de euros: "40,04 M€"; a partir de 100 milhões, uma casa ("710,0 M€").
export function milhoes(v: number | null): string {
  if (v === null) return "—";
  const m = v / 1_000_000;
  return numero(m, Math.abs(m) >= 100 ? 1 : 2) + NBSP + "M€";
}

// O que se escreve a seguir ao número, conforme a unidade do indicador.
export function sufixo(unidade: string): string {
  if (unidade.startsWith("%")) return "%";
  if (unidade.startsWith("‰")) return "‰";
  if (unidade.startsWith("€/m²")) return NBSP + "€/m²";
  if (unidade.startsWith("€")) return NBSP + "€";
  return "";
}

export function valor(v: number | null, unidade: string): string {
  if (v === null) return "—";
  return (unidade.startsWith("€") ? euros(v) : numero(v)) + sufixo(unidade);
}

// Versão curta para os números grandes em euros (milhões).
export function compacto(v: number | null, unidade: string): string {
  if (v === null) return "—";
  if (unidade === "€" && Math.abs(v) >= 1_000_000) return milhoes(v);
  return valor(v, unidade);
}

type Variacao = { texto: string; sinal: "sobe" | "desce" | "igual" };

export function variacao(v: number | null): Variacao | null {
  if (v === null) return null;
  const abs = Math.abs(v).toLocaleString("pt-PT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return { texto: `${abs}%`, sinal: v > 0 ? "sobe" : v < 0 ? "desce" : "igual" };
}

// Quando o indicador já é uma percentagem, a variação mostra-se em pontos percentuais (de 37,7% para 32% são 5,7 p.p.),
// para não se ler uma percentagem de uma percentagem.
export function variacaoPP(atual: number | null, anterior: number | null): Variacao | null {
  if (atual === null || anterior === null) return null;
  const d = Math.round((atual - anterior) * 10) / 10;
  const abs = Math.abs(d).toLocaleString("pt-PT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return { texto: `${abs}${NBSP}p.p.`, sinal: d > 0 ? "sobe" : d < 0 ? "desce" : "igual" };
}

// Data curta: "2026-10-28" → "28/10/2026".
export function dataCurta(iso: string | null): string {
  return iso ? iso.slice(0, 10).split("-").reverse().join("/") : "—";
}

// Título de um projeto de fundos europeus, tal como se mostra. O ficheiro de origem traz "--" nos projetos sem
// descrição e perdeu alguns símbolos ("28M?" por "28 M€", "TI?s" por "TI's").
export function tituloProjeto(titulo: string): string {
  const t = titulo
    .replace(/(\d)\s?M\?/g, "$1 M€")
    .replace(/(\w)\?s\b/g, "$1's")
    .trim();
  return /^[-–—\s]*$/.test(t) ? "Sem título no ficheiro de origem" : t;
}

// Unidade sem o símbolo inicial, para ler por baixo do número ("% dos votos" → "dos votos").
export function legenda(unidade: string): string {
  const t = unidade.replace(/^(%|‰)\s*/, "").replace(/^€\s*/, "euros ").trim();
  return t.replace(/^\((.*)\)$/, "$1");
}
