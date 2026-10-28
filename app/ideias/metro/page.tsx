import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { itens } from "@/lib/imprensa";

export const metadata: Metadata = {
  title: "Metro para a Trofa — Iniciativa Liberal Trofa",
  description: "A nossa visão: Metro ligeiro até à Trofa. Pela Trofa. Pelo futuro.",
};

// O texto desta página é o do comunicado "Metro ligeiro até à Trofa" (lib/imprensa.ts).
// Para mudar a visão, edita o comunicado lá e a página atualiza-se sozinha.
export default function Metro() {
  const c = itens.comunicados.find((i) => i.slug === "metro-ligeiro-ate-a-trofa");
  if (!c?.corpo) notFound();

  return (
    <>
      <PageHero
        eyebrow="Ideias · Metro para a Trofa"
        title="Metro ligeiro até à Trofa"
        image={{
          src: "/images/instagram/Dc9grxpKZAR.jpg",
          alt: "Comunicado: Iniciativa Liberal da Trofa reafirma a defesa do Metro ligeiro até à Trofa",
          w: 900,
          h: 1125,
        }}
      >
        Pela Trofa. Pelo futuro. Uma ligação simples, direta e competitiva — sem transbordos
        desnecessários.
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-12">
          {c.corpo.map((b, i) => (
            <section key={i}>
              <h2 className="font-display mb-4 flex items-baseline gap-4 text-2xl font-bold text-navy md:text-3xl">
                <span className="text-pink">{String(i + 1).padStart(2, "0")}</span>
                {b.titulo ?? "A nossa posição"}
              </h2>
              <div className="space-y-4 text-lg text-ink/85">
                {b.paragrafos.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4 rounded-2xl bg-mist p-6">
          <Link
            href={c.href}
            className="rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
          >
            Ler o comunicado
          </Link>
          {c.documento && (
            <a
              href={c.documento}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Documento original (PDF) ↗
            </a>
          )}
        </div>
      </article>
    </>
  );
}
