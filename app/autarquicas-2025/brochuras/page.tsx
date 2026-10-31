import type { Metadata } from "next";
import Image from "next/image";
import Galeria from "@/components/Galeria";
import PageHero from "@/components/PageHero";
import { hino } from "@/lib/autarquicas";
import { fotos } from "@/lib/galeria";
import { formatarData, ordenados } from "@/lib/imprensa";

export const metadata: Metadata = { title: "Outros — Autárquicas 2025" };

const hinoId = new URL(hino).searchParams.get("v") ?? "";
const brochuras = [
  { src: "/images/geral/brochura-1.png", alt: "Brochura 1 da campanha Trofa Para Cima", w: 488, h: 731 },
  { src: "/images/geral/brochura-2.png", alt: "Brochura 2 da campanha Trofa Para Cima", w: 488, h: 731 },
  { src: "/images/geral/brochura-3.webp", alt: "Brochura de Pedro Rebelo, candidato à Junta de Freguesia de Bougado", w: 1120, h: 1600 },
  { src: "/images/geral/brochura-4.webp", alt: "Brochura de Bruno Magalhães, candidato à Junta de Freguesia de Alvarelhos", w: 1120, h: 1600 },
];

export default function Outros() {
  const noticias = ordenados("noticias").filter((n) => n.tema === "autarquicas");
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Outros">
        Brochuras, t-shirt, hino, sede e notícias da campanha Trofa Para Cima.
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Brochuras</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {brochuras.map((b) => (
            <li key={b.src}>
              <a href={b.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-pink">
                <Image src={b.src} alt={b.alt} width={b.w} height={b.h} sizes="(min-width: 640px) 480px, 100vw" className="h-auto w-full" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">T-shirt de campanha</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink/80">
            Azul, com o logótipo Trofa Para Cima à frente e a marca da Iniciativa Liberal Trofa nas costas.
          </p>
          <Image
            src="/images/geral/tshirt-campanha.webp"
            alt="T-shirt azul da campanha Trofa Para Cima, vista da frente e das costas"
            width={1061}
            height={544}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="mt-8 h-auto w-full rounded-2xl"
          />
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Hino de campanha</h2>
          <div className="mt-8 overflow-hidden rounded-2xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${hinoId}`}
              title="Hino de campanha da Iniciativa Liberal Trofa, 2025"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Sede de campanha</h2>
        <p className="mt-3 max-w-2xl text-lg text-ink/80">
          A montra da sede com os candidatos à Câmara, à Assembleia Municipal e à Junta de Bougado.
        </p>
        <Galeria fotos={fotos("sede-2025")} alt="Sede de campanha da Iniciativa Liberal Trofa" />
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
