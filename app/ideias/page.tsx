import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { areas, documentos } from "@/lib/propostas";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Propostas — Iniciativa Liberal Trofa" };

const pad = (n: number) => String(n).padStart(2, "0");

const programa = documentos.find((d) => d.href?.endsWith(".pdf"));

// As páginas deste bloco, logo à entrada.
const paginas = [
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
  ...(programa
    ? [
        {
          titulo: programa.titulo,
          texto: "O programa completo, em PDF.",
          href: programa.href!,
          cta: "Ler documento ↓",
          externo: true,
        },
      ]
    : []),
];

export default function Propostas() {
  return (
    <>
      <PageHero eyebrow="Ideias · Propostas" title="As medidas que fazem a diferença" image={{ src: "/images/geral/propostas-cartaz-recorte.jpeg", alt: "Cartaz de campanha: A frescura que procuras está aqui", w: 650, h: 625, vertical: true }}>
        Cada área representa um compromisso concreto, com medidas específicas para transformar a
        Trofa. Uma Trofa mais livre, próspera e justa.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginas.map((p, i) => (
            <li key={p.href}>
              <Link
                href={p.href}
                {...("externo" in p && p.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
            Propostas por temas
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            10 áreas estratégicas de intervenção
          </h2>
          <ol className="mt-10 space-y-3">
            {areas.map((a, i) => (
              <li key={a.nome}>
                <details className="group rounded-2xl bg-white shadow-sm open:shadow-lg">
                  <summary className="flex cursor-pointer list-none items-center gap-5 p-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-3xl font-bold text-sun">{pad(i + 1)}</span>
                    <span className="flex-1">
                      <span className="font-display block text-xl font-bold text-navy">{a.nome}</span>
                      <span className="block text-sm text-ink/70">{a.lema}</span>
                    </span>
                    <span
                      aria-hidden
                      className="text-2xl font-bold text-navy transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <ul className="space-y-2 border-t-2 border-mist px-6 py-5 pl-20">
                    {a.medidas.map((m) => (
                      <li key={m} className="list-disc text-ink/85 marker:text-sun">
                        {m}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-ink/75">
            Todas estas medidas estão presentes no{" "}
            <Link href="/autarquicas-2025/programa" className="font-bold text-cyan-dark hover:underline">
              programa autárquico liberal de 2025
            </Link>
            .
          </p>
          <p className="mt-3 text-ink/75">
            Consulta também as propostas da Iniciativa Liberal a nível nacional em{" "}
            <a
              href={links.nacionais}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-dark hover:underline"
            >
              iniciativaliberal.pt ↗
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
