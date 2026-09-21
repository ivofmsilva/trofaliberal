import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import PageHero from "@/components/PageHero";
import { categorias, ordenados, type Categoria } from "@/lib/imprensa";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categorias).map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const c = categorias[categoria as Categoria];
  return { title: c ? `${c.titulo} — Iniciativa Liberal Trofa` : "Na Imprensa" };
}

export default async function Lista({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const c = categorias[categoria as Categoria];
  if (!c) notFound();
  const lista = ordenados(categoria as Categoria);

  return (
    <>
      <PageHero eyebrow="Na Imprensa" title={c.titulo}>
        {c.descricao}
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {lista.length ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lista.map((item) => (
              <li key={item.href}>
                <ItemCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl bg-mist p-6 font-bold text-ink/60">{c.vazio}</p>
        )}
        <Link href="/imprensa" className="mt-10 inline-block font-bold text-cyan-dark hover:underline">
          ← Voltar a Na Imprensa
        </Link>
      </div>
    </>
  );
}
