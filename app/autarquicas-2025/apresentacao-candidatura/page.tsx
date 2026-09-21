import type { Metadata } from "next";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { campanha } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Apresentação da candidatura — Autárquicas 2025" };

export default function ApresentacaoCandidatura() {
  const c = campanha.candidatura;
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Apresentação da candidatura">
        Os vídeos e as imagens do momento em que a candidatura Trofa Para Cima foi apresentada.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        <a
          href={c.evento}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
        >
          Evento no Facebook ↗
        </a>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Imagens</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.imagens.map((l) => (
              <li key={l.href}>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Vídeos</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.videos.map((l) => (
              <li key={l.href}>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
