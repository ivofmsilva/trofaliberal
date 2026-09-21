import type { Metadata } from "next";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { campanha, programas } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Programa eleitoral — Autárquicas 2025" };

export default function Programa() {
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Programa eleitoral">
        O programa autárquico completo para o concelho e os planos das freguesias de Alvarelhos e
        Bougado.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ol className="grid gap-5 md:grid-cols-3">
          {programas.map((p, i) => (
            <li key={p.titulo} className="flex flex-col rounded-2xl bg-navy p-8 text-white">
              <span className="font-display text-sm font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display mt-3 text-2xl font-bold">{p.titulo}</h2>
              <p className="mt-3 text-white/80">{p.texto}</p>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 font-bold text-sun hover:underline">
                Descarregar PDF ↓
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Programa eleitoral móvel</h2>
          <p className="mt-2 text-ink/75">Uma versão para ver no telemóvel.</p>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campanha.programaMovel.map((l) => (
              <li key={l.href}>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
