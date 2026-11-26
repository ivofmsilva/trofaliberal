import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaComemoracao from "@/components/PaginaComemoracao";
import { comemoracaoDe, comPaginaPropria, preencher, valoresDe } from "@/lib/comemoracoes";

// Uma página para cada data que celebramos (/restauracao-da-independencia, /natal...). Textos em lib/comemoracoes.ts.
// Só existem as datas da lista: qualquer outro endereço dá "página não encontrada".
// Os anos e as datas mudam sozinhos: a página volta a ser gerada de hora a hora.
export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  // As do partido e do núcleo estão em /a-nossa-historia (endereços antigos: next.config.ts).
  return comPaginaPropria.map((c) => ({ data: c.data.slug.slice(1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ data: string }> }): Promise<Metadata> {
  const c = comemoracaoDe((await params).data);
  if (!c) return {};
  const v = valoresDe(c);
  const titulo = preencher(c.titulo, v);
  return {
    title: `${titulo} — Iniciativa Liberal Trofa`,
    description: preencher(c.descricao, v),
    openGraph: { title: titulo, description: preencher(c.subtitulo, v), images: [c.imagem.src] },
  };
}

export default async function Pagina({ params }: { params: Promise<{ data: string }> }) {
  const c = comemoracaoDe((await params).data);
  if (!c) notFound();
  return <PaginaComemoracao c={c} />;
}
