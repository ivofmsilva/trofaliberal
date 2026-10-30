import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DiasEmEspera from "@/components/DiasEmEspera";
import HeroMetro from "@/components/HeroMetro";
import PartilharBotao from "@/components/PartilharBotao";
import { itens } from "@/lib/imprensa";
import {
  cartazesMetro,
  citacoes,
  comparacao,
  consulta,
  cronologia,
  diasDesde,
  esperaDesde,
  estudos,
  fontes,
  projeto,
  respostaParticipa,
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

      {/* Promessómetro */}
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
            <p className={`${etiqueta} text-cyan-dark`}>Promessómetro</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
              A Trofa tirou a senha em 2002.
            </h2>
            <div className="mt-8">
              <DiasEmEspera desde={esperaDesde} inicial={diasDesde(esperaDesde)} />
            </div>
            <p className="mt-8 text-lg text-ink/85">
              Em 2002 o comboio da Trofa deixou de circular, com a promessa de que o Metro do Porto
              ocuparia o seu lugar. A promessa continua por cumprir. O Metro para a Trofa é uma
              causa que sempre uniu a população.
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
          <div className="relative mt-16 h-44" role="img" aria-label="Linha do ISMAI ao Muro em metro ligeiro, com cerca de 3 km, e do Muro à Trofa em metrobus, com cerca de 7 km">
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
                  className={`absolute top-24 ${n.t} ${n.left === "0%" ? "text-left" : n.left === "100%" ? "text-right" : "text-center"}`}
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

      {/* Cronologia */}
      <section id="cronologia" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>O que aconteceu</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          De um comboio que se foi a um metro que não chega
        </h2>
        <ol className="mt-12 space-y-10 border-l-4 border-sun pl-8">
          {cronologia.map((f) => (
            <li key={f.quando} className="relative">
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
            </li>
          ))}
        </ol>
      </section>

      {/* Metro vs metrobus */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className={`${etiqueta} text-cyan-dark`}>Os dois sistemas lado a lado</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Mais caro a construir, mais barato a durar
          </h2>
          <p className="mt-4 max-w-3xl text-ink/75">
            Valores de referência do Certu, o centro técnico do Estado francês para transportes e
            urbanismo, a partir das redes construídas em França.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="text-sm uppercase tracking-widest">
                  <th scope="col" className="p-5 font-bold text-ink/50"><span className="sr-only">Critério</span></th>
                  <th scope="col" className="p-5 font-bold text-ink/70">
                    Metrobus (BRT)
                    <span className="block text-xs font-medium normal-case tracking-normal text-ink/50">autocarro em canal próprio</span>
                  </th>
                  <th scope="col" className="bg-navy p-5 font-bold text-white">
                    Metro ligeiro
                    <span className="block text-xs font-medium normal-case tracking-normal text-white/70">elétrico moderno</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparacao.linhas.map((l) => (
                  <tr key={l.criterio} className="border-t-2 border-mist">
                    <th scope="row" className="p-5 font-bold text-navy">{l.criterio}</th>
                    <td className="p-5 text-ink/80">{l.bus}</td>
                    <td className="bg-navy/5 p-5 font-bold text-navy">{l.metro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-ink/85">{comparacao.nota}</p>
          <p className="mt-3 text-sm text-ink/60">Fonte: {comparacao.fonte}</p>
          <p className="mt-6 rounded-2xl border-l-4 border-pink bg-white p-5 text-lg font-medium text-navy">
            Na Trofa há ainda um custo que esta tabela não mostra: o transbordo no Muro, que obriga
            quem viaja a sair de um veículo e a esperar por outro.
          </p>
        </div>
      </section>

      {/* O que dizem os estudos */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-sun`}>O que dizem os estudos</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">
            Porque o mais barato hoje pode sair caro amanhã
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {estudos.map((e) => (
              <li key={e.valor} className="flex flex-col rounded-2xl bg-navy-soft p-8">
                <span className="font-display text-5xl font-bold text-sun">{e.valor}</span>
                <h3 className="font-display mt-3 text-xl font-bold">{e.titulo}</h3>
                <p className="mt-3 text-white/85">{e.texto}</p>
                <p className="mt-auto pt-4 text-xs text-white/60">{e.fonte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A nossa posição */}
      <section id="posicao" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>A posição da IL Trofa</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          O que defendemos, preto no branco
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {citacoes.map((q) => (
            <li key={q.texto} className="flex flex-col rounded-2xl border-2 border-mist p-8">
              <span aria-hidden className="font-display text-6xl font-bold leading-none text-pink">“</span>
              <blockquote className="font-display -mt-2 text-xl font-bold leading-snug text-navy">
                {q.texto}
              </blockquote>
              {q.href.startsWith("/") ? (
                <Link href={q.href} className="mt-auto pt-5 text-sm font-bold text-cyan-dark hover:underline">
                  {q.autor} →
                </Link>
              ) : (
                <a href={q.href} target="_blank" rel="noopener noreferrer" className="mt-auto pt-5 text-sm font-bold text-cyan-dark hover:underline">
                  {q.autor} ↗
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="font-display text-3xl font-bold text-navy md:text-4xl">A nossa visão</h3>
          <div className="mt-10 space-y-12">
            {c.corpo.map((b, i) => (
              <section key={i}>
                <h4 className="font-display mb-4 flex items-baseline gap-4 text-2xl font-bold text-navy">
                  <span className="text-pink">{String(i + 1).padStart(2, "0")}</span>
                  {b.titulo ?? "A nossa posição"}
                </h4>
                <div className="space-y-4 text-lg text-ink/85">
                  {b.paragrafos.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

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

      {/* Participa.pt */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>Participa.pt</p>
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

      {/* Fontes */}
      <section className="border-t-2 border-mist bg-white py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-navy">Fontes e estudos citados</h2>
          <ul className="mt-5 space-y-2 text-sm text-ink/75">
            {fontes.map((f) => (
              <li key={f.href}>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark hover:underline">
                  {f.nome} ↗
                </a>
              </li>
            ))}
          </ul>
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
