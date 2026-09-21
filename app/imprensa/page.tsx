import type { Metadata } from "next";
import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import PageHero from "@/components/PageHero";
import { categorias, ordenados, type Categoria } from "@/lib/imprensa";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Na Imprensa — Iniciativa Liberal Trofa" };

const ordem: Categoria[] = ["noticias", "artigos", "comunicados"];

export default function Imprensa() {
  return (
    <>
      <PageHero eyebrow="Na Imprensa" title="Notícias, artigos e comunicados" image={{ src: "/images/geral/imprensa-reportagem.jpeg", alt: "Reportagem sobre a IL Trofa", w: 673, h: 1008 }}>
        Notícias, artigos de opinião de membros do núcleo e comunicados oficiais. Este espaço
        mantém-te informado sobre a nossa atividade política.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6">
        {ordem.map((cat, i) => {
          const c = categorias[cat];
          const [maisRecente] = ordenados(cat);
          return (
            <section key={cat} id={cat} className="scroll-mt-24">
              <h2 className="font-display flex items-baseline gap-4 text-3xl font-bold text-navy md:text-4xl">
                <span className="text-sun">{String(i + 1).padStart(2, "0")}</span>
                {c.titulo}
              </h2>
              <p className="mt-2 max-w-2xl text-ink/75">{c.descricao}</p>
              <div className="mt-8 max-w-2xl">
                {maisRecente ? (
                  <>
                    <ItemCard item={maisRecente} />
                    <Link
                      href={`/imprensa/${cat}`}
                      className="mt-5 inline-block rounded-full border-2 border-navy px-7 py-2 font-bold text-navy transition hover:bg-navy hover:text-white"
                    >
                      {c.verTodos}
                    </Link>
                  </>
                ) : (
                  <p className="rounded-2xl bg-mist p-6 font-bold text-ink/60">{c.vazio}</p>
                )}
              </div>
            </section>
          );
        })}

        <p className="border-t-2 border-mist pt-10 text-ink/75">
          Podes também seguir o nosso trabalho nas redes:{" "}
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark hover:underline">
            Instagram
          </a>{" "}
          e{" "}
          <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark hover:underline">
            Facebook
          </a>
          .
        </p>
      </div>
    </>
  );
}
