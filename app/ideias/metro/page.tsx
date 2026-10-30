import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DiasEmEspera from "@/components/DiasEmEspera";
import HeroMetro from "@/components/HeroMetro";
import PartilharBotao from "@/components/PartilharBotao";
import { itens } from "@/lib/imprensa";
import {
  argumentos,
  cartazesMetro,
  comparacao,
  consulta,
  cronologia,
  diasDesde,
  esperaDesde,
  gestao,
  participacao,
  projeto,
} from "@/lib/metro";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Metro para a Trofa — Iniciativa Liberal Trofa",
  description: "Esperámos mais de 9000 dias. A Trofa merece metro ligeiro, não transbordo.",
  openGraph: {
    title: "Metro ligeiro até à Trofa — Iniciativa Liberal Trofa",
    description: "Esperámos mais de 9000 dias. Agora é a nossa vez.",
    images: ["/images/geral/metro-9000-dias.png"],
  },
};

const etiqueta = "text-sm font-bold uppercase tracking-[0.25em]";

// O texto da visão é o do comunicado "Metro ligeiro até à Trofa" (lib/imprensa.ts).
// Os restantes dados desta página estão em lib/metro.ts.
export default function Metro() {
  const c = itens.comunicados.find((i) => i.slug === "metro-ligeiro-ate-a-trofa");
  if (!c?.corpo) notFound();

  return (
    <>
      <HeroMetro />

      {/* Contador da espera */}
      <section className="mt-6 bg-mist py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[340px_1fr]">
          <Image
            src="/images/geral/metro-9000-dias.png"
            alt="Senha n.º 9000, emitida em 2002: a Trofa tirou a senha em 2002 e esperou 9000 dias. Agora é a nossa vez."
            width={720}
            height={1020}
            sizes="(min-width: 768px) 340px, 80vw"
            className="mx-auto w-full max-w-xs rounded-2xl shadow-xl"
          />
          <div>
            <p className={`${etiqueta} text-cyan-dark`}>A Trofa tirou a senha em 2002</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
              E ainda aguarda a sua vez.
            </h2>
            <div className="mt-8">
              <DiasEmEspera desde={esperaDesde} inicial={diasDesde(esperaDesde)} />
            </div>
            <p className="mt-8 text-lg text-ink/85">
              Em 2002 o comboio da Trofa deixou de circular, com a promessa de que o Metro ocuparia o
              seu lugar. A promessa continua por cumprir. O Metro para a Trofa é uma causa que
              sempre uniu a população.
            </p>
          </div>
        </div>
      </section>

      {/* O projeto atual */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-sun`}>O projeto atual</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">
            Metro até ao Muro, autocarro até à Trofa
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            O projeto em consulta liga o ISMAI à Trofa em cerca de 10 km, mas só os primeiros são de
            metro. Os últimos quilómetros fazem-se em metrobus, depois de um transbordo no Muro.
          </p>

          {/* desenho da linha, à escala 3 km / 7 km */}
          <div
            className="relative mt-16 h-44"
            role="img"
            aria-label="Linha do ISMAI ao Muro em metro ligeiro, com cerca de 3 km, e do Muro à Trofa em metrobus, com cerca de 7 km"
          >
            <p className="absolute left-0 top-0 w-[30%] text-center text-sm font-bold text-sun">
              Metro ligeiro · {projeto.metroKm}
            </p>
            <p className="absolute right-0 top-0 w-[70%] text-center text-sm font-bold text-white/80">
              Metrobus · {projeto.busKm}
            </p>
            <div className="absolute left-0 top-12 h-3 w-[30%] rounded-l-full bg-sun" />
            <div className="absolute right-0 top-12 h-3 w-[70%] rounded-r-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.7)_0_20px,transparent_20px_34px)]" />
            {[
              { left: "0%", nome: "ISMAI", extra: "metro do Porto", grande: false, t: "" },
              { left: "30%", nome: "Muro", extra: "TRANSBORDO", grande: true, t: "-translate-x-1/2" },
              { left: "100%", nome: "Trofa", extra: "Interface", grande: false, t: "" },
            ].map((n) => (
              <div key={n.nome}>
                <span
                  aria-hidden
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] bg-white ${
                    n.grande ? "h-10 w-10 border-pink" : "h-7 w-7 border-sun"
                  }`}
                  style={{ left: n.left, top: "3.35rem" }}
                />
                <div
                  className={`absolute top-24 ${n.t} ${
                    n.left === "0%" ? "text-left" : n.left === "100%" ? "text-right" : "text-center"
                  }`}
                  style={{ left: n.left === "100%" ? undefined : n.left, right: n.left === "100%" ? 0 : undefined }}
                >
                  <p className="font-display text-xl font-bold">{n.nome}</p>
                  <p
                    className={`text-xs font-bold uppercase tracking-widest ${
                      n.grande ? "mt-1 inline-block rounded-full bg-pink px-3 py-1 text-white" : "text-white/70"
                    }`}
                  >
                    {n.extra}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-white/70">
            Valores aproximados, segundo o Estudo de Impacte Ambiental em consulta pública (fonte:{" "}
            <a href={projeto.fonte.href} target="_blank" rel="noopener noreferrer" className="font-bold text-sun hover:underline">
              {projeto.fonte.titulo}
            </a>
            ).
          </p>
        </div>
      </section>

      {/* História */}
      <section id="historia" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>A história do metro da Trofa</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          De um comboio que se foi a um metro que não chega
        </h2>
        <ol className="mt-12 space-y-10 border-l-4 border-sun pl-8">
          {cronologia.map((f) => (
            <li key={`${f.quando}-${f.titulo}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.85rem] top-1 h-5 w-5 rounded-full border-4 border-navy bg-white"
              />
              <p className="text-sm font-bold uppercase tracking-widest text-pink">{f.quando}</p>
              <h3 className="font-display mt-1 text-2xl font-bold text-navy">{f.titulo}</h3>
              <p className="mt-2 text-lg text-ink/85">{f.texto}</p>
              {f.fonte && (
                <a
                  href={f.fonte.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-bold text-cyan-dark hover:underline"
                >
                  {f.fonte.nome} ↗
                </a>
              )}
              {f.ligacao && (
                <a href={f.ligacao.href} className="mt-2 inline-block text-sm font-bold text-cyan-dark hover:underline">
                  {f.ligacao.nome} →
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Uma causa mal gerida */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-sun`}>Uma causa mal gerida</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">
            Falharam todos, e a Trofa continua à espera
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-white/85">{gestao.intro}</p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {gestao.blocos.map((b, i) => (
              <li key={b.titulo} className="rounded-2xl bg-navy-soft p-8">
                <span className="font-display text-sm font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight">{b.titulo}</h3>
                <p className="mt-3 text-white/85">{b.texto}</p>
              </li>
            ))}
          </ol>
          <p className="font-display mt-10 max-w-3xl text-2xl font-bold text-sun">{gestao.fecho}</p>
        </div>
      </section>

      {/* Metro e metrobus, em texto */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className={`${etiqueta} text-cyan-dark`}>Metro e metrobus</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Obra mais barata, mas dura metade
          </h2>
          <div className="mt-8 space-y-4 text-lg text-ink/85">
            {comparacao.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/60">Fonte: {comparacao.fonte}</p>
        </div>
      </section>

      {/* Porque o metro até ao Interface (os nossos argumentos) */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-sun`}>Porque defendemos o metro até ao Interface</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">
            Mudar de veículo a meio do caminho não faz sentido
          </h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {argumentos.map((a, i) => (
              <li key={a.titulo} className="rounded-2xl bg-navy-soft p-8">
                <span className="font-display text-sm font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight">{a.titulo}</h3>
                <p className="mt-3 text-white/85">{a.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* A nossa visão (texto do comunicado) */}
      <article id="posicao" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>A nossa visão</p>
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
          <p className={`${etiqueta} text-cyan-dark`}>Campanha</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Metro para a Trofa já!
          </h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            Levámos esta causa para as ruas do concelho. Carrega numa imagem para a ver maior.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {cartazesMetro.map((cz) => (
              <li key={cz.src}>
                <a
                  href={cz.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-2 ring-transparent transition hover:ring-pink"
                >
                  <Image
                    src={cz.src}
                    alt={cz.legenda}
                    width={cz.w}
                    height={cz.h}
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="aspect-[4/5] w-full object-cover transition group-hover:scale-105"
                  />
                  <p className="p-4 text-sm font-bold text-navy">{cz.legenda}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A nossa participação (Participa.pt) */}
      <section id="participacao" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>Participa.pt</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          A nossa participação na consulta pública
        </h2>
        <p className="mt-6 text-lg text-ink/85">
          O {consulta.nome} esteve em consulta pública no portal Participa.pt, de {consulta.inicio}{" "}
          a {consulta.fim}. A Iniciativa Liberal da Trofa participou, em representação do Grupo de
          Coordenação Local.
        </p>
        <p className="mt-3 text-sm text-ink/60">
          {participacao.processo} · assinada por {participacao.assinatura} · {participacao.data}
        </p>

        <h3 className="font-display mt-10 text-2xl font-bold text-navy">A nossa posição</h3>
        <p className="mt-3 text-lg text-ink/85">{participacao.posicao}</p>

        <h3 className="font-display mt-10 text-2xl font-bold text-navy">O que pedimos</h3>
        <ol className="mt-5 space-y-3">
          {participacao.pedidos.map((p, i) => (
            <li key={p} className="flex gap-4 rounded-2xl bg-mist p-5 text-ink/85">
              <span className="font-display text-xl font-bold text-pink">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={participacao.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
          >
            Ler a participação completa (PDF) ↓
          </a>
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

      {/* Fecho */}
      <section className="bg-sun py-16 text-navy">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-4xl font-bold">Queres metro na Trofa?</h2>
          <p className="mt-3 text-lg font-medium">
            A Trofa só muda com mais liberais a dar a cara. Junta-te à causa e ajuda-nos a espalhar
            a mensagem.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/trofa-liberal/faz-te-membro"
              className="rounded-full bg-navy px-7 py-3 font-bold text-white transition hover:bg-pink"
            >
              Faz-te membro
            </Link>
            <PartilharBotao
              titulo="Metro ligeiro até à Trofa — Iniciativa Liberal Trofa"
              texto="Esperámos mais de 9000 dias. A Trofa merece metro, não transbordo."
            />
            <Link
              href={c.href}
              className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Ler o comunicado
            </Link>
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
