import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { categorias, formatarData, itens, type Categoria } from "@/lib/imprensa";

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(itens) as Categoria[]).flatMap((categoria) =>
    itens[categoria].filter((i) => i.slug).map((i) => ({ categoria, slug: i.slug! })),
  );
}

function encontrar(categoria: string, slug: string) {
  return itens[categoria as Categoria]?.find((i) => i.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}): Promise<Metadata> {
  const { categoria, slug } = await params;
  const item = encontrar(categoria, slug);
  return { title: item ? `${item.titulo} — Iniciativa Liberal Trofa` : "Na Imprensa" };
}

export default async function Artigo({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { categoria, slug } = await params;
  const item = encontrar(categoria, slug);
  if (!item || !item.corpo) notFound();
  const cat = categorias[categoria as Categoria];
  const data = formatarData(item.data);

  return (
    <>
      <PageHero eyebrow={[cat.titulo, data].filter(Boolean).join(" · ")} title={item.titulo} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-10">
          {item.corpo.map((b, i) => (
            <section key={i}>
              {b.titulo && (
                <h2 className="font-display mb-4 text-2xl font-bold text-navy md:text-3xl">{b.titulo}</h2>
              )}
              <div className="space-y-4 text-lg text-ink/85">
                {b.paragrafos.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          {item.documento && (
            <a
              href={item.documento}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
            >
              Ver documento original (PDF) ↗
            </a>
          )}
          <Link href={`/imprensa/${categoria}`} className="font-bold text-cyan-dark hover:underline">
            ← {cat.titulo}
          </Link>
        </div>
      </article>
    </>
  );
}
