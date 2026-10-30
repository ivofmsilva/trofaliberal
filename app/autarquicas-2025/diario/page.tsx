import type { Metadata } from "next";
import Link from "next/link";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { diario, videosPorTema } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Diário de campanha — Autárquicas 2025" };

export default function Diario() {
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Diário de campanha">
        Os 10 dias oficiais de campanha: uma campanha diferente, com um tema do programa eleitoral
        em destaque em cada dia.
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diario.map((d) => (
            <li key={d.dia}>
              <Link
                href={`/autarquicas-2025/diario/${d.dia}`}
                className="group block h-full rounded-2xl bg-navy p-8 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/30"
              >
                <span className="font-display text-sm font-bold uppercase tracking-widest text-sun">Dia {d.dia}</span>
                <h2 className="font-display mt-2 text-2xl font-bold leading-tight">{d.tema}</h2>
                <p className="mt-3 line-clamp-3 text-white/80">{d.paragrafos[0]}</p>
                <span className="mt-5 inline-block font-bold text-sun group-hover:underline">Ler o dia →</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="videos" className="scroll-mt-24 bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Vídeos</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            A campanha por temas
          </h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            Os vídeos da campanha, agrupados pelos temas do programa eleitoral.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {videosPorTema.map((t) => (
              <li key={t.slug}>
                <a
                  href={`#${t.slug}`}
                  className="inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-navy shadow-sm transition hover:bg-navy hover:text-white"
                >
                  {t.tema}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14 space-y-16">
            {videosPorTema.map((t) => (
              <section key={t.slug} id={t.slug} className="scroll-mt-24">
                <h3 className="font-display text-3xl font-bold text-navy">{t.tema}</h3>
                <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {t.videos.map((v) => (
                    <li key={v.href}>
                      <InstagramEmbed id={igId(v.href)} titulo={v.titulo} altura={680} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
