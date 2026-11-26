// Imagem para a história do Instagram de cada data com página própria (/historias/natal, /historias/25-de-abril...),
// 1080×1920, no estilo da do 25 de Novembro (desenho em lib/desenharHistoria.tsx). O botão "Partilhar na história"
// das páginas das datas (components/PaginaComemoracao.tsx) abre-a no menu de partilha do telemóvel.
// As imagens são cópias JPEG em assets/historias/<slug>.jpg (o next/og não lê WebP), feitas por
// scripts/historias-imagens.mjs. Ficam de fora as datas do partido e do núcleo (/a-nossa-historia#...) e as que
// têm rota própria (campo `historia`, ex.: app/historias/violencia-contra-as-mulheres).
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { comemoracaoDe, comPaginaPropria, preencher, valoresDe } from "@/lib/comemoracoes";
import { desenharHistoria } from "@/lib/desenharHistoria";

export const revalidate = 86400;
export const dynamicParams = false;

const comHistoriaGenerica = comPaginaPropria.filter((c) => !c.historia);

export function generateStaticParams() {
  return comHistoriaGenerica.map((c) => ({ slug: c.data.slug.slice(1) }));
}

export async function GET(_pedido: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = comemoracaoDe(slug);
  if (!c || c.historia || c.data.slug.includes("#")) return new Response("Não encontrada", { status: 404 });
  const v = valoresDe(c);
  const jpeg = await readFile(join(process.cwd(), "assets/historias", `${slug}.jpg`));
  return desenharHistoria({
    etiqueta: preencher(c.etiqueta, v),
    titulo: preencher(c.titulo, v),
    frase: preencher(c.banner.frase, v),
    endereco: c.data.slug,
    imagem: { jpeg, w: c.imagem.w, h: c.imagem.h, credito: c.imagem.credito },
  });
}
