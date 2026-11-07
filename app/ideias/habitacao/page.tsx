import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ObraAnimada from "@/components/ObraAnimada";
import PartilharBotao from "@/components/PartilharBotao";
import { numeros, passosParaConstruir, pontos, principios, programaHref } from "@/lib/habitacao";

export const metadata: Metadata = {
  title: "Construir para o futuro — Iniciativa Liberal Trofa",
  description: "Menos burocracia e mais oferta, para que construir, arrendar e viver na Trofa seja possível.",
};

const etiqueta = "text-sm font-bold uppercase tracking-[0.25em]";
const pad = (n: number) => String(n).padStart(2, "0");

export default function Habitacao() {
  return (
    <>
      <section className="px-4 pt-6 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white shadow-xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-pink/25 blur-3xl" />
          <div className="relative grid items-center gap-10 px-8 py-14 md:grid-cols-[1.1fr_1fr] md:px-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/85 sm:text-sm">
                Iniciativa Liberal · Núcleo da Trofa · Habitação
              </p>
              <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                Construir
                <span className="block text-sun">para o futuro.</span>
              </h1>
              <p className="mt-6 text-lg font-medium italic text-white/90 md:text-xl">
                Mais liberdade para viver, construir e investir na Trofa.
              </p>
              <p className="mt-4 max-w-xl text-white/85">
                Menos burocracia e mais oferta, para que construir, arrendar e viver na Trofa seja possível,
                sobretudo para os jovens e para as famílias que começam agora.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#medidas"
                  className="rounded-full bg-white px-7 py-3 font-bold text-[#00558f] transition hover:bg-sun"
                >
                  Ver as medidas →
                </a>
                <a
                  href={programaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-white/50 px-7 py-3 font-bold transition hover:border-sun hover:text-sun"
                >
                  Ler o programa ↗
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <ObraAnimada />
            </div>
          </div>
        </div>
      </section>

      {/* Compromissos */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-cyan-dark`}>O que nos comprometemos a fazer</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
            Uma Câmara que facilita, em vez de travar
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {numeros.map((n) => (
              <li key={n.valor} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="font-display text-5xl font-bold text-pink">{n.valor}</p>
                <p className="mt-3 font-bold leading-snug text-navy">{n.legenda}</p>
                <p className="mt-3 text-xs text-ink/60">{n.fonte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Abordagem */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-sun`}>A nossa abordagem</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">
            A forma mais eficaz de baixar os preços é haver mais casas
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            A Câmara deve planear de forma descentralizada e transparente a gestão do território. Deve garantir
            liberdade, regras claras e neutralidade fiscal a quem quer investir e viver na Trofa.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {principios.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl bg-navy-soft p-8">
                <span className="font-display text-sm font-bold text-sun">{pad(i + 1)}</span>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight">{p.titulo}</h3>
                <p className="mt-3 text-white/85">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Medidas do programa */}
      <section id="medidas" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>O programa</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          {pontos.length} pontos para a habitação na Trofa
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-ink/80">
          É o capítulo da Habitação do nosso Programa Eleitoral Autárquico. Abre cada ponto para ver as medidas.
        </p>
        <ol className="mt-10 space-y-3">
          {pontos.map((p, i) => (
            <li key={p.n}>
              <details className="group rounded-2xl bg-white shadow-sm ring-1 ring-navy/10 open:shadow-lg" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center gap-5 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-3xl font-bold text-sun">{pad(p.n)}</span>
                  <span className="font-display flex-1 text-xl font-bold leading-tight text-navy">{p.titulo}</span>
                  <span aria-hidden className="text-2xl font-bold text-navy transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="space-y-6 border-t-2 border-mist px-6 py-6 sm:pl-20">
                  <p className="text-ink/85">{p.intro}</p>
                  {p.grupos.map((g) => (
                    <div key={g.titulo ?? "medidas"}>
                      {g.titulo && (
                        <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-dark">{g.titulo}</h3>
                      )}
                      <ul className="mt-3 space-y-2">
                        {g.medidas.map((m) => (
                          <li key={m} className="list-disc text-ink/85 marker:text-sun">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {p.n === 2 && (
                    <p className="text-sm text-ink/70">
                      As zonas junto às estações do metro ligam esta proposta à nossa{" "}
                      <Link href="/ideias/metro" className="font-bold text-cyan-dark hover:underline">
                        visão do Metro para a Trofa
                      </Link>
                      .
                    </p>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>

      {/* O cartaz da campanha nacional */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>Onde está o problema</p>
        <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
          Para construir uma casa em Portugal são precisos 15 passos
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-ink/80">
          É o que diz o cartaz da campanha nacional da Iniciativa Liberal, que traz o manual completo:
          quase todos os passos terminam com a mesma frase, paga-se e espera-se. Quando o processo se
          arrasta, a casa fica mais cara e quem queria construir desiste.
        </p>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Image
            src="/images/geral/habitacao-outdoor.jpg"
            alt="Outdoor da Iniciativa Liberal: mais casas, menos custos, mais construção, menos burocracia, com o manual de 15 passos para construir uma casa em Portugal"
            width={1646}
            height={1273}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="w-full rounded-2xl object-cover shadow-xl ring-1 ring-navy/10"
          />
          <ol className="space-y-2">
            {passosParaConstruir.map((p, i) => (
              <li key={p} className="flex items-baseline gap-4 border-b border-mist pb-2">
                <span className="font-display w-8 shrink-0 text-xl font-bold text-pink">{pad(i + 1)}</span>
                <span className="font-bold text-navy">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Na rua */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-cyan-dark`}>A nossa mensagem na rua</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
            Medidas liberais para a habitação, ao jeito do Monopólio
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">
            Levámos o programa para a rua com humor: um tabuleiro com as medidas, do acelerador de processos
            à renda resolúvel, e cartazes para as medidas que mais pesam.
          </p>
          <Image
            src="/images/geral/habitacao-medidas.jpg"
            alt="Tabuleiro ao estilo do Monopólio, com o Diamantino de cartola e bengala: medidas liberais para a habitação, mais casas, menos custos, mais construção, menos burocracia"
            width={1133}
            height={487}
            sizes="(min-width: 1152px) 1100px, 100vw"
            className="mt-10 w-full rounded-2xl shadow-xl ring-1 ring-navy/10"
          />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              { src: "/images/cartazes/cartaz-42.jpeg", w: 298, h: 372, titulo: "Turbo nos licenciamentos", alt: "Cartaz: turbo nos licenciamentos, redução drástica de tempos" },
              { src: "/images/cartazes/cartaz-43-recorte.jpeg", w: 188, h: 275, titulo: "Está na hora das gruas voltarem!", alt: "Cartaz: está na hora das gruas voltarem, construir como nunca, com redução de taxas e impostos, mais rapidez nos processos e construção em altura" },
            ].map((c) => (
              <li key={c.src} className="flex flex-col items-center text-center">
                <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="300px" className="w-full max-w-[300px] rounded-xl shadow-lg ring-1 ring-navy/10" />
                <p className="font-display mt-4 text-xl font-bold text-navy">{c.titulo}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fecho */}
      <section className="bg-sun py-16 text-navy">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-4xl font-bold">Queres construir o futuro da Trofa?</h2>
          <p className="mt-3 text-lg font-medium">
            Estas medidas são um ponto de partida. Diz-nos o que falta e ajuda-nos a pô-las em prática.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/participa?t=ideia"
              className="rounded-full bg-navy px-7 py-3 font-bold text-white transition hover:bg-pink"
            >
              Tens uma ideia?
            </Link>
            <a
              href={programaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Ler o programa completo ↗
            </a>
            <PartilharBotao
              titulo="Construir para o futuro — Iniciativa Liberal Trofa"
              texto="Menos burocracia e mais oferta, para que construir, arrendar e viver na Trofa seja possível."
            />
          </div>
        </div>
      </section>
    </>
  );
}
