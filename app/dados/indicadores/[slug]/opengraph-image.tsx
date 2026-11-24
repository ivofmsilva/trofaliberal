import { ImageResponse } from "next/og";
import { comparacaoUltimo, comparavelEmNivel, emMilhoes, indicadores, porSlug, serieColuna, ultimo } from "@/lib/dados/dados";
import { compacto, legenda, milhoes } from "@/lib/dados/formatar";
import { ROTULO_GRUPO } from "@/lib/dados/rotulos";

// Imagem de cada indicador para quando a página é partilhada (WhatsApp, Facebook, X): o título, o último valor da Trofa,
// a comparação com os 8 concelhos próximos e a evolução. Gerada na compilação, uma por indicador.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Indicador dos Dados da Trofa";

export function generateStaticParams() {
  return indicadores.map((i) => ({ slug: i.slug }));
}

const VIOLETA = "#6b3fd4";
const CINZA = "#9a98a8";

export default async function Imagem({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = porSlug(slug);
  const u = i ? ultimo(i) : null;
  const titulo = i?.titulo ?? "Dados da Trofa";
  const fmt = (v: number | null) => (i && v !== null ? (emMilhoes(i) ? milhoes(v) : compacto(v, i.unidade)) : "—");
  const unidade = i ? (emMilhoes(i) ? "" : legenda(i.unidade)) : "";
  const grupo = i && u && comparavelEmNivel(i) ? comparacaoUltimo(i).find((c) => c.nome === ROTULO_GRUPO) : null;

  // evolução da Trofa (e do grupo, quando se compara o valor): linhas desenhadas à mão, na mesma escala
  const trofa = i ? serieColuna(i, 0) : [];
  const g8 = i && comparavelEmNivel(i) ? serieColuna(i, 2) : [];
  const todos = [...trofa, ...g8].filter((v): v is number => v !== null);
  const min = Math.min(...todos), max = Math.max(...todos);
  const L = 470, A = 190;
  const linha = (s: (number | null)[]) => {
    const pts = s.map((v, k) => (v === null ? null : [ (k / Math.max(1, s.length - 1)) * L, A - ((v - min) / (max - min || 1)) * A ])).filter((p): p is number[] => p !== null);
    return pts.map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  };

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", background: "#16142a", color: "#ffffff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#c9c6d8" }}>
          <div style={{ display: "flex", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>Dados da Trofa</div>
          <div style={{ display: "flex" }}>trofaliberal.pt/dados</div>
        </div>
        <div style={{ display: "flex", fontSize: titulo.length > 60 ? 44 : 54, fontWeight: 700, lineHeight: 1.15, maxWidth: 1060 }}>{titulo}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 26, color: "#c9c6d8" }}>Trofa{u ? `, ${u.periodo}` : ""}</div>
            <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>{fmt(u?.v ?? null)}</div>
            {unidade ? <div style={{ display: "flex", fontSize: 26, color: "#c9c6d8" }}>{unidade}</div> : null}
            {grupo && grupo.v !== null ? (
              <div style={{ display: "flex", marginTop: 18, fontSize: 28, color: "#e6e4f0" }}>8 concelhos próximos: {fmt(grupo.v)}</div>
            ) : null}
          </div>
          {todos.length > 1 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <svg width={L + 20} height={A + 20} viewBox={`-10 -10 ${L + 20} ${A + 20}`}>
                {g8.some((v) => v !== null) ? <path d={linha(g8)} fill="none" stroke={CINZA} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" /> : null}
                <path d={linha(trofa)} fill="none" stroke={VIOLETA} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <div style={{ display: "flex", fontSize: 22, color: "#c9c6d8", marginTop: 8 }}>
                <span style={{ color: "#b49cf5", fontWeight: 700 }}>Trofa</span>
                {g8.some((v) => v !== null) ? <span style={{ marginLeft: 14, color: CINZA, fontWeight: 700 }}>8 concelhos</span> : null}
                <span style={{ marginLeft: 14 }}>
                  {i?.linhas[0]?.periodo} – {i?.linhas.at(-1)?.periodo}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#a7a4b8" }}>Fonte: {i?.fonte?.slice(0, 110) ?? "INE"}</div>
      </div>
    ),
    { ...size },
  );
}
