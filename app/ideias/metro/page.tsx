import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { itens } from "@/lib/imprensa";
import { cartazesMetro, consulta, linhaDoTempo, projeto, respostaParticipa } from "@/lib/metro";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Metro para a Trofa — Iniciativa Liberal Trofa",
  description: "A nossa visão: Metro ligeiro até à Trofa. Pela Trofa. Pelo futuro.",
};

// O texto da visão é o do comunicado "Metro ligeiro até à Trofa" (lib/imprensa.ts).
// Os restantes dados desta página estão em lib/metro.ts.
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

      {/* 9000 dias */}
      <section className="bg-mist py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[360px_1fr]">
          <Image
            src="/images/geral/metro-9000-dias.png"
            alt="Senha n.º 9000, emitida em 2002: a Trofa tirou a senha em 2002 e esperou 9000 dias. Agora é a nossa vez."
            width={720}
            height={1020}
            sizes="(min-width: 768px) 360px, 80vw"
            className="mx-auto w-full max-w-sm rounded-2xl shadow-xl"
          />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
              A Trofa tirou a senha em 2002
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Esperámos 9000 dias. Agora é a nossa vez.
            </h2>
            <p className="mt-6 text-lg text-ink/85">
              Em 2002 o comboio da Trofa deixou de circular, com a promessa de que o Metro do Porto
              ocuparia o seu lugar. Mais de duas décadas depois, a promessa continua por cumprir.
            </p>
            <p className="mt-4 text-lg text-ink/85">
              O Metro para a Trofa é uma causa que sempre uniu a população. Não aceitamos uma
              solução provisória para um problema estrutural.
            </p>
          </div>
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Cronologia</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          Do encerramento à consulta pública
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {linhaDoTempo.map((t, i) => (
            <li key={t.quando} className="rounded-2xl bg-navy p-8 text-white">
              <span className="font-display text-sm font-bold text-sun">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-sun">{t.quando}</p>
              <h3 className="font-display mt-3 text-xl font-bold leading-snug">{t.titulo}</h3>
              <p className="mt-3 text-white/85">{t.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* O projeto atual */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">O projeto atual</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">
            Metro até ao Muro, autocarro até à Trofa
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projeto.map((p) => (
              <li key={p.valor} className="rounded-2xl bg-navy-soft p-6">
                <span className="font-display text-4xl font-bold text-sun">{p.valor}</span>
                <p className="mt-2 text-white/85">{p.texto}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/70">
            Valores aproximados, segundo o Estudo de Impacte Ambiental em consulta pública (fonte:{" "}
            <a
              href={consulta.fonte.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sun hover:underline"
            >
              {consulta.fonte.titulo}
            </a>
            ).
          </p>
        </div>
      </section>

      {/* A nossa visão (texto do comunicado) */}
      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">A nossa visão</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          O que defendemos para o Metro
        </h2>
        <div className="mt-12 space-y-12">
          {c.corpo.map((b, i) => (
            <section key={i}>
              <h3 className="font-display mb-4 flex items-baseline gap-4 text-2xl font-bold text-navy md:text-3xl">
                <span className="text-pink">{String(i + 1).padStart(2, "0")}</span>
                {b.titulo ?? "A nossa posição"}
              </h3>
              <div className="space-y-4 text-lg text-ink/85">
                {b.paragrafos.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      {/* Campanha */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Campanha</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Metro para a Trofa já!
          </h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            Levámos esta causa para as ruas do concelho. Carrega numa imagem para a ver maior.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {cartazesMetro.map((c) => (
              <li key={c.src}>
                <a
                  href={c.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-2 ring-transparent transition hover:ring-pink"
                >
                  <Image
                    src={c.src}
                    alt={c.legenda}
                    width={c.w}
                    height={c.h}
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="aspect-[4/5] w-full object-cover transition group-hover:scale-105"
                  />
                  <p className="p-4 text-sm font-bold text-navy">{c.legenda}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Participa.pt */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Participa.pt</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          Respondemos à consulta pública
        </h2>
        <p className="mt-6 text-lg text-ink/85">
          O {consulta.nome} esteve em consulta pública no portal Participa.pt, de {consulta.inicio}{" "}
          a {consulta.fim}. A Iniciativa Liberal da Trofa participou e fez chegar a sua resposta
          sobre o projeto do Metro.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {respostaParticipa ? (
            <a
              href={respostaParticipa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
            >
              Ler a nossa resposta (PDF) ↓
            </a>
          ) : (
            <span className="rounded-full bg-mist px-7 py-3 font-bold text-ink/60">
              Resposta em PDF em breve
            </span>
          )}
          <a
            href={consulta.portal}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
          >
            Participa.pt ↗
          </a>
        </div>
      </section>

      {/* Comunicado e redes */}
      <section className="bg-sun py-16 text-navy">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-4xl font-bold">Metro ligeiro até à Trofa. Pelo futuro.</h2>
          <p className="mt-3 text-lg font-medium">
            Lê o comunicado completo ou acompanha-nos nas redes sociais.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={c.href}
              className="rounded-full bg-navy px-7 py-3 font-bold text-white transition hover:bg-pink"
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
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Instagram ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
