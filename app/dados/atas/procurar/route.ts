// Pesquisa nas atas: /atas/procurar?q=…&orgao=C|A&ano=2025&inicio=0 → JSON com os resultados e os excertos.
import { procurarAtas } from "@/lib/dados/atasPesquisa";

export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const q = (p.get("q") ?? "").slice(0, 120);
  const r = procurarAtas(q, { orgao: p.get("orgao"), ano: p.get("ano"), inicio: Number(p.get("inicio") ?? 0) || 0 });
  return Response.json(r, { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } });
}
