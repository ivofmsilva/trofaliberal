import type { Metadata } from "next";
import Image from "next/image";
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
  const inicio = item?.corpo?.[0]?.paragrafos[0];
  const title = item ? `${item.titulo} — Iniciativa Liberal Trofa` : "Imprensa e eventos";
  const description = inicio ? (inicio.length > 155 ? `${inicio.slice(0, 152).replace(/\s+\S*$/, "")}…` : inicio) : undefined;
  const im = item?.imagens?.[0];
  return {
    title,
    description,
    // A primeira imagem do artigo serve de pré-visualização quando o link é partilhado. O openGraph de uma página
    // substitui o do layout por inteiro, por isso repete-se aqui o que é comum.
    ...(im && {
      openGraph: {
        title,
        description,
        images: [{ url: im.src, width: im.w, height: im.h, alt: im.alt }],
        locale: "pt_PT",
        type: "article",
        siteName: "Iniciativa Liberal Trofa",
      },
    }),
  };
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
        {item.autor && <p className="mb-8 text-lg font-bold text-navy">Por {item.autor}</p>}
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
        {cat.nota && item.autor && <p className="mt-10 text-sm text-ink/60">{cat.nota}</p>}
        {item.imagens && (
          <section className="mt-14" aria-label="Imagens do artigo">
            <h2 className="font-display mb-5 text-2xl font-bold text-navy">Imagens para partilhar</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {item.imagens.map((im) => (
                <a key={im.src} href={im.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl shadow-lg shadow-navy/15 transition hover:-translate-y-1">
                  <Image src={im.src} width={im.w} height={im.h} alt={im.alt} sizes="(min-width: 640px) 380px, 100vw" className="h-auto w-full" />
                </a>
              ))}
            </div>
          </section>
        )}
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
          {item.slug === "metro-ligeiro-ate-a-trofa" && (
            <Link href="/ideias/metro" className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white">
              Ver a página do Metro →
            </Link>
          )}
          <Link href={`/imprensa/${categoria}`} className="font-bold text-cyan-dark hover:underline">
            ← {cat.titulo}
          </Link>
        </div>
      </article>
    </>
  );
}
