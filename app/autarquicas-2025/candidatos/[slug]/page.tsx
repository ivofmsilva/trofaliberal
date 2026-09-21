import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { candidatos } from "@/lib/autarquicas";

export const dynamicParams = false;

export function generateStaticParams() {
  return candidatos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = candidatos.find((x) => x.slug === slug);
  return { title: c ? `${c.nome} — Autárquicas 2025` : "Autárquicas 2025" };
}

export default async function Candidato({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = candidatos.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[320px_1fr] md:py-20">
          <Image
            src={`/images/candidatos/${c.slug}.webp`}
            alt={c.nome}
            width={640}
            height={640}
            priority
            className="aspect-square w-full max-w-xs rounded-2xl object-cover"
          />
          <div>
            <Link href="/autarquicas-2025/candidatos" className="text-sm font-bold text-sun hover:underline">
              ← Voltar aos candidatos
            </Link>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-sun">{c.cargo}</p>
            <h1 className="font-display mt-3 text-5xl font-bold md:text-6xl">{c.nome}</h1>
            <p className="font-display mt-5 text-xl text-white/85">“{c.frase}”</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_360px]">
        <article className="space-y-5 text-lg text-ink/85">
          {c.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {c.citacao && (
            <blockquote className="font-display border-l-4 border-cyan pl-5 text-2xl font-bold text-navy">
              “{c.citacao}”
            </blockquote>
          )}
          <div className="flex flex-wrap gap-4 pt-4">
            {c.programa && (
              <a href={c.programa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-pink px-7 py-3 text-base font-bold text-white transition hover:bg-navy hover:text-white">
                Descarregar plano eleitoral ↓
              </a>
            )}
            {c.perfilNacional && (
              <a href={c.perfilNacional} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-navy px-7 py-3 text-base font-bold text-navy transition hover:bg-navy hover:text-white">
                Ver perfil no site nacional ↗
              </a>
            )}
          </div>
        </article>

        <aside className="space-y-8">
          <div className="rounded-2xl bg-mist p-6">
            <h2 className="font-display text-xl font-bold text-navy">Funções atuais</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink/85">
              {c.funcoes.map((f) => (
                <li key={f} className="list-disc ml-4 marker:text-sun">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {c.extra && (
            <div className="rounded-2xl bg-mist p-6">
              <h2 className="font-display text-xl font-bold text-navy">{c.extraTitulo}</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink/85">
                {c.extra.map((f) => (
                  <li key={f} className="list-disc ml-4 marker:text-sun">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">Vídeo de apresentação</h2>
          <iframe
            src={`https://www.instagram.com/p/${c.video}/embed`}
            title={`Vídeo de ${c.nome} no Instagram`}
            loading="lazy"
            className="mx-auto mt-8 h-[640px] w-full max-w-md rounded-2xl bg-white"
          />
          <a
            href={`https://www.instagram.com/p/${c.video}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-bold text-sun hover:underline"
          >
            Ver no Instagram ↗
          </a>
        </div>
      </section>
    </>
  );
}
