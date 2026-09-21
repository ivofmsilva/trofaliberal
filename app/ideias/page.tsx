import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { areas, documentos } from "@/lib/propostas";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Propostas — Iniciativa Liberal Trofa" };

const pad = (n: number) => String(n).padStart(2, "0");

export default function Propostas() {
  return (
    <>
      <PageHero eyebrow="Ideias · Propostas" title="As medidas que fazem a diferença" image={{ src: "/images/geral/propostas-cartaz.jpeg", alt: "Membro da IL com cartaz de campanha", w: 1000, h: 1333 }}>
        Cada área representa um compromisso concreto, com medidas específicas para transformar a
        Trofa. Uma Trofa mais livre, próspera e justa.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Documentos</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          Manifestos e programa
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {documentos.map((d, i) => (
            <li key={d.titulo} className="flex flex-col rounded-2xl bg-navy p-8 text-white">
              <span className="font-display text-sm font-bold text-sun">{pad(i + 1)}</span>
              <h3 className="font-display mt-3 text-2xl font-bold leading-tight">{d.titulo}</h3>
              {d.subtitulo && <p className="mt-3 text-white/75">{d.subtitulo}</p>}
              <div className="mt-auto pt-6">
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sun hover:underline"
                  >
                    Ler documento →
                  </a>
                ) : (
                  <span className="text-sm font-bold text-white/50">Documento em breve</span>
                )}
              </div>
            </li>
          ))}
        </ol>
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
                <details className="group rounded-2xl bg-white shadow-sm open:shadow-lg" open={i === 0}>
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
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3">
        <div className="rounded-2xl border-2 border-mist p-8 transition hover:border-cyan">
          <h3 className="font-display text-2xl font-bold text-navy">Cartazes</h3>
          <p className="mt-3 text-ink/75">Consulta os cartazes e mensagens que já espalhámos pela Trofa.</p>
          <Link href="/ideias/cartazes" className="mt-6 inline-block font-bold text-cyan-dark hover:underline">
            Ver cartazes →
          </Link>
        </div>
        <div className="rounded-2xl border-2 border-mist p-8 transition hover:border-cyan">
          <h3 className="font-display text-2xl font-bold text-navy">Tens uma ideia?</h3>
          <p className="mt-3 text-ink/75">As melhores ideias vêm de quem vive a Trofa todos os dias.</p>
          <Link href="/ideias/sugestao" className="mt-6 inline-block font-bold text-cyan-dark hover:underline">
            Partilhar ideia →
          </Link>
        </div>
        <div className="rounded-2xl border-2 border-mist p-8 transition hover:border-cyan">
          <h3 className="font-display text-2xl font-bold text-navy">Documentos Nacionais</h3>
          <p className="mt-3 text-ink/75">As ideias e propostas da Iniciativa Liberal a nível nacional.</p>
          <a
            href={links.nacionais}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-bold text-cyan-dark hover:underline"
          >
            Ver em iniciativaliberal.pt ↗
          </a>
        </div>
      </section>
    </>
  );
}
