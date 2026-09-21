import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { diario } from "@/lib/autarquicas";

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
    </>
  );
}
