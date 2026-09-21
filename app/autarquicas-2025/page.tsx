import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { candidatos, hino, programas } from "@/lib/autarquicas";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Autárquicas 2025 — Iniciativa Liberal Trofa" };

export default function Autarquicas() {
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Trofa Para Cima!" image={{ src: "/images/geral/outdoor-campanha.jpg", alt: "Outdoor da campanha Trofa Para Cima", w: 1440, h: 960 }}>
        <p>
          A Trofa, tantas vezes referida como um diamante em bruto, é um concelho com enorme
          potencial económico, social e cultural — um potencial que continua sistematicamente
          desaproveitado.
        </p>
        <a
          href={hino}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
        >
          Ouvir o hino de campanha ↗
        </a>
      </PageHero>

      <section className="mx-auto max-w-3xl space-y-5 px-4 py-20 text-lg text-ink/85 sm:px-6">
        <p>
          Localizada no coração de uma das zonas mais dinâmicas e exportadoras do país, a Trofa tem
          tudo para ser uma referência no desenvolvimento regional, mas precisa de liderança, visão
          e coragem para romper com o conformismo.
        </p>
        <p>
          A Iniciativa Liberal acredita numa Trofa mais livre, mais eficiente, mais próxima dos
          cidadãos, mais atrativa para famílias e empresas, e mais preparada para o futuro. Com mais
          oportunidades para todos, melhor qualidade de vida e onde o poder público serve e não
          atrapalha.
        </p>
        <p className="font-display text-2xl font-bold text-navy">
          Está na hora de libertar o potencial da Trofa. Está na hora de colocar a Trofa para cima.
        </p>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">Propostas</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">Programas eleitorais</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {programas.map((p, i) => (
              <li key={p.titulo} className="flex flex-col rounded-2xl bg-navy-soft p-8">
                <span className="font-display text-sm font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-3 text-2xl font-bold">{p.titulo}</h3>
                <p className="mt-3 text-white/75">{p.texto}</p>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 font-bold text-sun hover:underline">
                  Descarregar PDF ↓
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="candidatos" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Candidatos</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          Quem leva a Trofa para cima
        </h2>
        <p className="mt-3 text-ink/75">
          Conhece as pessoas que se candidataram pela Iniciativa Liberal nas Autárquicas 2025.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {candidatos.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/autarquicas-2025/candidatos/${c.slug}`}
                className="group block overflow-hidden rounded-2xl bg-navy text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan/20"
              >
                <Image
                  src={`/images/candidatos/${c.slug}.webp`}
                  alt={c.nome}
                  width={400}
                  height={400}
                  className="aspect-square w-full bg-white object-cover object-[center_35%]"
                />
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{c.nome}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-sun">{c.cargo}</p>
                  <p className="mt-3 text-sm text-white/75">“{c.frase}”</p>
                  <span className="mt-4 inline-block text-sm font-bold text-sun group-hover:underline">
                    Conhecer {c.nome.split(" ")[0]} →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Campanha</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Eventos e campanha
          </h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            Apresentação da candidatura, vídeos, apresentação do programa e o diário dos 10 dias
            oficiais de campanha.
          </p>
          <Link
            href="/autarquicas-2025/campanha"
            className="mt-6 inline-block rounded-full bg-navy px-8 py-3 font-bold text-white transition hover:bg-pink hover:text-white"
          >
            Ver a campanha
          </Link>
        </div>
      </section>

      <section className="bg-sun py-16 text-center text-navy">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-4xl font-bold">Junta-te ao movimento liberal</h2>
          <p className="mt-3 text-lg font-medium">
            Estas propostas só se tornam realidade com o teu apoio. Vem fazer parte da mudança que a
            Trofa precisa.
          </p>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-navy px-8 py-3 font-bold text-white transition hover:bg-white hover:text-navy">
            Aderir agora
          </a>
        </div>
      </section>
    </>
  );
}
