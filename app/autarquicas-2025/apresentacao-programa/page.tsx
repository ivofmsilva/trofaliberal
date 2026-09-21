import type { Metadata } from "next";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { campanha } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Apresentação do programa — Autárquicas 2025" };

export default function ApresentacaoPrograma() {
  const p = campanha.programa;
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Apresentação do programa eleitoral">
        Fotos e vídeo da sessão de apresentação do programa eleitoral.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Fotos</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {p.fotos.map((l) => (
              <li key={l.href}>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Vídeo</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {p.videos.map((l) => (
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
