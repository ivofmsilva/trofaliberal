import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Ideias — Iniciativa Liberal Trofa" };

const pad = (n: number) => String(n).padStart(2, "0");

// As causas em que o núcleo trabalha hoje. O programa das autárquicas de 2025 (as 10 áreas e as medidas)
// está no arquivo das Autárquicas, em /autarquicas-2025/programa.
const causas = [
  {
    titulo: "Metro para a Trofa",
    texto: "Metro ligeiro até à Trofa. Pela Trofa. Pelo futuro.",
    href: "/ideias/metro",
    cta: "Ver a nossa visão →",
  },
  {
    titulo: "Trofa no topo da Educação",
    texto: "O nosso manifesto pela Educação: propostas para a Trofa e para o país.",
    href: "/ideias/educacao",
    cta: "Ver o manifesto →",
  },
  {
    titulo: "Construir para o Futuro",
    texto: "Habitação: menos burocracia e mais oferta, para que construir, arrendar e viver na Trofa seja possível.",
    href: "/ideias/habitacao",
    cta: "Ver as medidas →",
  },
  {
    titulo: "Cartazes",
    texto: "Os cartazes e mensagens que já espalhámos pela Trofa.",
    href: "/ideias/cartazes",
    cta: "Ver cartazes →",
  },
];

export default function Ideias() {
  return (
    <>
      <PageHero
        eyebrow="Ideias"
        title="As causas que defendemos para a Trofa"
        image={{ src: "/images/geral/propostas-cartaz-recorte.jpeg", alt: "Cartaz de campanha: A frescura que procuras está aqui", w: 650, h: 625, vertical: true }}
      >
        Do metro à educação e à habitação: o que defendemos, porquê e com que medidas. Uma Trofa mais
        livre, próspera e justa.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {causas.map((p, i) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-2xl bg-navy p-8 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/30"
              >
                <span className="font-display text-sm font-bold text-sun">{pad(i + 1)}</span>
                <h2 className="font-display mt-3 text-2xl font-bold leading-tight">{p.titulo}</h2>
                <p className="mt-3 text-white/75">{p.texto}</p>
                <span className="mt-auto pt-6 font-bold text-sun group-hover:underline">{p.cta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Arquivo</p>
            <h2 className="font-display mt-3 text-2xl font-bold text-navy">Programa autárquico de 2025</h2>
            <p className="mt-3 text-ink/80">
              As 10 áreas e as medidas com que nos apresentámos pela primeira vez a eleições autárquicas, com os
              programas para o concelho e para as freguesias.
            </p>
            <Link href="/autarquicas-2025/programa" className="mt-4 inline-block font-bold text-cyan-dark hover:underline">
              Ver o programa de 2025 →
            </Link>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Participa</p>
            <h2 className="font-display mt-3 text-2xl font-bold text-navy">Tens uma ideia para a Trofa?</h2>
            <p className="mt-3 text-ink/80">
              As melhores propostas nascem de quem vive a Trofa todos os dias. Conta-nos a tua.
            </p>
            <Link href="/participa?t=ideia" className="mt-4 inline-block font-bold text-cyan-dark hover:underline">
              Partilhar uma ideia →
            </Link>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl px-4 text-ink/75 sm:px-6">
          Consulta também as propostas da Iniciativa Liberal a nível nacional em{" "}
          <a href={links.nacionais} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark hover:underline">
            iniciativaliberal.pt ↗
          </a>
          .
        </p>
      </section>
    </>
  );
}
