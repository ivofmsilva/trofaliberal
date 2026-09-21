import type { Metadata } from "next";
import Image from "next/image";
import ItemCard from "@/components/ItemCard";
import PageHero from "@/components/PageHero";
import { links } from "@/lib/eventos";
import { itens } from "@/lib/imprensa";

export const metadata: Metadata = { title: "Aqui há Parlamento — Iniciativa Liberal Trofa" };

const imprensa = itens.noticias.filter((n) => n.data?.startsWith("2022"));

export default function AquiHaParlamento() {
  return (
    <>
      <PageHero eyebrow="Eventos" title="Aqui há Parlamento">
        Levamos o debate político para o dia a dia da Trofa.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
          Primeira edição
        </p>
        <div className="mt-6 max-w-3xl space-y-5 text-lg text-ink/85">
          <p>
            O “Aqui há Parlamento” é um evento onde os deputados eleitos pelo círculo do Porto
            falam com a população sobre o trabalho parlamentar desenvolvido. Na primeira edição
            estiveram na Trofa Carlos Guimarães Pinto e Patrícia Gilvaz, dois deputados liberais
            eleitos em 2022.
          </p>
          <p>
            A iniciativa teve lugar no dia 17 de dezembro às 16h no Auditório da Junta de Freguesia
            de Santiago de Bougado.
          </p>
          <p>
            Este evento tem o propósito de aproximar as pessoas dos deputados eleitos, sendo
            possível abordar e questionar os deputados sobre os diversos temas da vida
            parlamentar. É um evento aberto a todos os que querem conhecer mais sobre o
            funcionamento do parlamento e em especial sobre o contributo dos deputados liberais.
          </p>
        </div>
        <a href={links.parlamentoEvento} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white">
          Evento no Facebook ↗
        </a>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Galeria de fotos</h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {["/images/eventos/parlamento-91.jpg"].map((s) => (
              <li key={s}>
                <a href={s} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-pink">
                  <Image src={s} alt="Foto do evento" width={480} height={480} sizes="(min-width: 1024px) 220px, 50vw" className="aspect-square w-full object-cover" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Na imprensa</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {imprensa.map((n) => (
            <li key={n.href}>
              <ItemCard item={n} />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold">Edições futuras</h2>
          <p className="mt-2 text-sun">Brevemente.</p>
        </div>
      </section>
    </>
  );
}
