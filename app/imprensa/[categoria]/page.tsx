import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FiltroTemas from "@/components/FiltroTemas";
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
  return {
    title: c ? `${c.titulo} — Iniciativa Liberal Trofa` : "Imprensa e eventos",
    description: c ? `${c.titulo} da Iniciativa Liberal Trofa. ${c.descricao}` : undefined,
  };
}

export default async function Lista({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const c = categorias[categoria as Categoria];
  if (!c) notFound();
  const lista = ordenados(categoria as Categoria);
  const grelha = (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {lista.map((item) => (
        <li key={item.href}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <PageHero eyebrow="Imprensa e eventos" title={c.titulo}>
        {c.descricao}
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {lista.length && categoria === "artigos" ? (
          <Suspense fallback={grelha}>
            <FiltroTemas lista={lista} />
          </Suspense>
        ) : lista.length ? (
          grelha
        ) : (
          <p className="rounded-2xl bg-mist p-6 font-bold text-ink/70">{c.vazio}</p>
        )}
        {c.nota && <p className="mt-8 max-w-3xl text-sm text-ink/70">{c.nota}</p>}
        <Link href={`/imprensa?t=${categoria}`} className="mt-8 inline-block py-2 font-bold text-cyan-dark hover:underline">
          ← Voltar a Imprensa e Eventos
        </Link>
      </div>
    </>
  );
}
