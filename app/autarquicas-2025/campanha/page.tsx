import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { campanha, diario, type Link as Lk } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Eventos e campanha — Autárquicas 2025" };

function Chips({ items }: { items: Lk[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-3">
      {items.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border-2 border-navy px-5 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
          >
            {l.titulo} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Campanha() {
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Eventos e campanha">
        Apresentação da candidatura, apresentação do programa e o diário da campanha Trofa Para Cima.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        <Link href="/autarquicas-2025" className="font-bold text-cyan-dark hover:underline">
          ← Voltar a Autárquicas 2025
        </Link>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Apresentação da candidatura</h2>
          <a
            href={campanha.candidatura.evento}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy hover:text-white"
          >
            Evento no Facebook ↗
          </a>
          <h3 className="font-display mt-8 text-xl font-bold text-navy">Vídeos</h3>
          <Chips items={campanha.candidatura.videos} />
          <h3 className="font-display mt-8 text-xl font-bold text-navy">Imagens</h3>
          <Chips items={campanha.candidatura.imagens} />
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Apresentação do programa eleitoral</h2>
          <h3 className="font-display mt-6 text-xl font-bold text-navy">Fotos</h3>
          <Chips items={campanha.programa.fotos} />
          <h3 className="font-display mt-8 text-xl font-bold text-navy">Vídeos</h3>
          <Chips items={campanha.programa.videos} />
          <h3 className="font-display mt-8 text-xl font-bold text-navy">Programa eleitoral móvel</h3>
          <Chips items={campanha.programaMovel} />
        </section>

        <section id="diario" className="scroll-mt-24">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Diário da campanha</h2>
          <p className="mt-2 text-ink/75">Os 10 dias oficiais de campanha, um tema do programa em cada dia.</p>
          <ol className="mt-10 space-y-4">
            {diario.map((d) => (
              <li key={d.dia}>
                <details className="group rounded-2xl bg-navy text-white" open={d.dia === 1}>
                  <summary className="flex cursor-pointer list-none items-center gap-5 p-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-sm font-bold uppercase tracking-widest text-sun">
                      Dia {d.dia}
                    </span>
                    <span className="font-display flex-1 text-xl font-bold">{d.tema}</span>
                    <span aria-hidden className="text-2xl font-bold transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="space-y-4 border-t border-white/10 p-6 text-white/85">
                    {d.paragrafos.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className="inline-block font-bold text-sun hover:underline">
                      Ver no Instagram ↗
                    </a>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Brochuras</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:max-w-xl">
            {["/images/geral/brochura-1.png", "/images/geral/brochura-2.png"].map((s) => (
              <li key={s}>
                <a href={s} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-pink">
                  <Image src={s} alt="Brochura da campanha Trofa Para Cima" width={488} height={731} sizes="280px" className="w-full" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
