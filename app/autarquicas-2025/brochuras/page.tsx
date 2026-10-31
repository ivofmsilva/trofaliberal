import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { formatarData, ordenados } from "@/lib/imprensa";

export const metadata: Metadata = { title: "Outros — Autárquicas 2025" };

const brochuras = ["/images/geral/brochura-1.png", "/images/geral/brochura-2.png"];

export default function Outros() {
  const noticias = ordenados("noticias").filter((n) => n.tema === "autarquicas");
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Outros">
        Brochuras e notícias da campanha Trofa Para Cima.
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Brochuras</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {brochuras.map((s, i) => (
            <li key={s}>
              <a href={s} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-pink">
                <Image src={s} alt={`Brochura ${i + 1} da campanha Trofa Para Cima`} width={488} height={731} sizes="(min-width: 640px) 480px, 100vw" className="h-auto w-full" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Notícias</h2>
          <p className="mt-3 text-ink/75">O que a imprensa local escreveu sobre a nossa campanha.</p>
          <ul className="mt-8 space-y-3">
            {noticias.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl bg-white p-6 shadow-sm ring-2 ring-transparent transition hover:ring-pink"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-pink">
                    {[formatarData(n.data), n.fonte].filter(Boolean).join(" · ")}
                  </p>
                  <p className="font-display mt-1 text-xl font-bold leading-snug text-navy group-hover:underline">
                    {n.titulo} ↗
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
