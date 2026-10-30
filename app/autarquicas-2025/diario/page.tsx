import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { diario } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Diário de campanha — Autárquicas 2025" };

export default function Diario() {
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Diário de campanha">
        Os 10 dias oficiais de campanha, com um tema do programa em cada dia.
      </PageHero>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <ol className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {diario.map((d) => (
            <li key={d.dia}>
              <Link
                href={`/autarquicas-2025/diario/${d.dia}`}
                className="group flex h-full flex-col justify-between rounded-2xl bg-navy p-5 text-white transition hover:-translate-y-1 hover:bg-pink hover:shadow-xl hover:shadow-navy/30"
              >
                <span className="font-display text-5xl font-bold leading-none text-sun group-hover:text-white">
                  {String(d.dia).padStart(2, "0")}
                </span>
                <span className="font-display mt-6 block text-lg font-bold leading-tight">{d.tema}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
