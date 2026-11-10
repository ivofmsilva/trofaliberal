// Formatação de números à portuguesa: espaço entre milhares, vírgula nos decimais.
const NBSP = " ";

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

// O que se escreve a seguir ao número, conforme a unidade do indicador.
export function sufixo(unidade: string): string {
  if (unidade.startsWith("%")) return "%";
  if (unidade.startsWith("‰")) return "‰";
  if (unidade.startsWith("€/m²")) return NBSP + "€/m²";
  if (unidade.startsWith("€")) return NBSP + "€";
  return "";
}

export function valor(v: number | null, unidade: string): string {
  return v === null ? "—" : numero(v) + sufixo(unidade);
}

// Versão curta para os números grandes em euros (milhões).
export function compacto(v: number | null, unidade: string): string {
  if (v === null) return "—";
  if (unidade === "€" && Math.abs(v) >= 1_000_000) {
    const m = v / 1_000_000;
    return numero(m, m >= 100 ? 1 : 2) + NBSP + "M€";
  }
  return valor(v, unidade);
}

export function variacao(v: number | null): { texto: string; sinal: "sobe" | "desce" | "igual" } | null {
  if (v === null) return null;
  const abs = Math.abs(v).toLocaleString("pt-PT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return { texto: `${abs}%`, sinal: v > 0 ? "sobe" : v < 0 ? "desce" : "igual" };
}

// Unidade sem o símbolo inicial, para ler por baixo do número ("% dos votos" → "dos votos").
export function legenda(unidade: string): string {
  const t = unidade.replace(/^(%|‰)\s*/, "").replace(/^€\s*/, "euros ").trim();
  return t.replace(/^\((.*)\)$/, "$1");
}
