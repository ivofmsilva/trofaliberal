import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { candidatos } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Candidatos — Autárquicas 2025" };

export default function Candidatos() {
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Quem leva a Trofa para cima">
        Conhece as pessoas que se candidataram pela Iniciativa Liberal nas Autárquicas 2025.
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {candidatos.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/autarquicas-2025/candidatos/${c.slug}`}
                className="group block h-full overflow-hidden rounded-2xl bg-navy text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/30"
              >
                <Image
                  src={`/images/candidatos/${c.slug}.webp`}
                  alt={c.nome}
                  width={400}
                  height={400}
                  className="aspect-square w-full bg-white object-cover object-[center_35%]"
                />
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold">{c.nome}</h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-sun">{c.cargo}</p>
                  <p className="mt-3 text-sm text-white/80">“{c.frase}”</p>
                  <span className="mt-4 inline-block text-sm font-bold text-sun group-hover:underline">
                    Conhecer {c.nome.split(" ")[0]} →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
