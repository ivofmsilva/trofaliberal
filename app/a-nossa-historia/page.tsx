import type { Metadata } from "next";
import Link from "next/link";
import Marcos from "@/components/Marcos";
import PageHero from "@/components/PageHero";
import PartilharBotao from "@/components/PartilharBotao";
import { Figura, MostrarBloco } from "@/components/PaginaComemoracao";
import { comemoracoes, preencher, valoresDe, type Comemoracao } from "@/lib/comemoracoes";
import { MESES, type DataAnual } from "@/lib/datasAnuais";
import { momentosIL, PAGINA_HISTORIA, type Momento } from "@/lib/historiaIL";
import { marcos } from "@/lib/nucleo";

// As datas da Iniciativa Liberal e da IL Trofa numa página só, ano a ano (como as festas, mas por ordem da história).
// As três grandes (fundação, Parlamento, núcleo) têm banner e o texto todo (lib/comemoracoes.ts); as eleições e as
// convenções são mais curtas (lib/historiaIL.ts). Os títulos dizem o que aconteceu, sem "X anos" (a página vai por
// anos); os anos que faltam no texto mudam sozinhos: a página volta a ser gerada de hora a hora.
export const revalidate = 3600;

const DESCRICAO = "A Iniciativa Liberal e a IL Trofa, ano a ano: a fundação do partido, as convenções, as eleições e o núcleo da Trofa.";

export const metadata: Metadata = {
  title: "A nossa história — Iniciativa Liberal Trofa",
  description: DESCRICAO,
  openGraph: { title: "A nossa história", description: DESCRICAO, images: ["/images/datas/aniversario-il-9-anos.webp"] },
};

type Item = { id: string; data: DataAnual } & ({ c: Comemoracao; e?: undefined } | { e: Momento; c?: undefined });

const ordem = (d: DataAnual) => (d.desde ?? 0) * 10000 + (d.dia?.[0] ?? 0) * 100 + (d.dia?.[1] ?? 0);
const dataPorExtenso = (d: DataAnual) => (d.dia ? `${d.dia[1]} de ${MESES[d.dia[0] - 1]} de ${d.desde}` : String(d.desde));

// Um ponto na linha do tempo, à esquerda de cada data.
function Ponto({ cor }: { cor: string }) {
  return <span aria-hidden className={`absolute top-7 -left-[2.125rem] h-4 w-4 rounded-full ring-4 ring-white sm:-left-[2.625rem] ${cor}`} />;
}

// Por cima do título: a data e o tipo do momento.
function Cabeca({ data, tipo }: { data: string; tipo: string }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-widest">
      <span className="text-pink">{data}</span>
      <span className="rounded-full bg-navy/10 px-2.5 py-0.5 tracking-wider text-navy">{tipo}</span>
    </p>
  );
}

function Grande({ id, c }: { id: string; c: Comemoracao }) {
  const v = valoresDe(c);
  const titulo = c.naHistoria ?? preencher(c.titulo, v);
  const fotoNoTexto = c.blocos.some((b) => typeof b === "object" && "imagem" in b && b.imagem.src === c.imagem.src);
  return (
    <article id={id} className="relative scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8">
      <Ponto cor="bg-pink" />
      <Cabeca data={dataPorExtenso(c.data)} tipo={`Aniversário · ${c.data.dia![1]} de ${MESES[c.data.dia![0] - 1]}`} />
      <h3 className="font-display mt-2 text-3xl font-bold leading-tight text-navy md:text-4xl">{titulo}</h3>
      <p className="mt-2 text-ink/70">{preencher(c.subtitulo, v)}</p>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/85">
        <p className="font-display text-xl font-bold leading-snug text-navy md:text-2xl">{preencher(c.abertura, v)}</p>
        {!fotoNoTexto && <Figura img={c.imagem} />}
        {c.blocos.map((b, i) =>
          typeof b === "object" && "marcos" in b ? (
            <p key={i}>
              <a href="#marcos" className="font-bold text-cyan-dark hover:underline">
                Os marcos do núcleo, no fim da página ↓
              </a>
            </p>
          ) : (
            <MostrarBloco key={i} b={b} v={v} />
          ),
        )}
        {c.fecho && <p className="font-display text-2xl font-bold text-pink">{preencher(c.fecho, v)}</p>}
      </div>
      <div className="mt-6">
        <PartilharBotao titulo={preencher(c.titulo, v)} texto={preencher(c.partilhar, v)} endereco={`${PAGINA_HISTORIA}#${id}`} rotulo="Partilhar esta data" />
      </div>
    </article>
  );
}

function Pequena({ id, e }: { id: string; e: Momento }) {
  return (
    <article id={id} className="relative scroll-mt-28 rounded-2xl bg-mist p-6">
      <Ponto cor="bg-navy" />
      <Cabeca data={e.quando ?? dataPorExtenso(e.data)} tipo={e.tipo} />
      <h3 className="font-display mt-2 text-2xl font-bold text-navy">{e.titulo}</h3>
      <div className="mt-3 space-y-3 leading-relaxed text-ink/85">
        {e.texto.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>
      {e.link && (
        <p className="mt-3">
          <Link href={e.link.href} className="font-bold text-cyan-dark hover:underline">
            {e.link.texto}
          </Link>
        </p>
      )}
    </article>
  );
}

export default function ANossaHistoria() {
  const itens: Item[] = [
    ...comemoracoes
      .filter((c) => c.data.slug.startsWith(`${PAGINA_HISTORIA}#`))
      .map((c) => ({ id: c.data.slug.split("#")[1], data: c.data, c })),
    ...momentosIL.map((e) => ({ id: e.id, data: e.data, e })),
  ].sort((a, b) => ordem(a.data) - ordem(b.data));
  const anos = [...new Set(itens.map((i) => i.data.desde ?? 0))];

  return (
    <>
      <PageHero eyebrow="Iniciativa Liberal e IL Trofa" title="A nossa história">
        <p>As datas que nos trouxeram até aqui, ano a ano.</p>
      </PageHero>

      <div aria-hidden className="grid h-3 grid-cols-3">
        <div className="bg-cyan" />
        <div className="bg-sun" />
        <div className="bg-pink" />
      </div>

      <section className="mx-auto max-w-3xl px-4 pt-14 sm:px-6">
        <p className="text-lg leading-relaxed text-ink/85">
          Em 2016 era uma associação de cidadãos. Hoje, a Iniciativa Liberal tem nove deputados na Assembleia da
          República, dois eurodeputados e núcleos por todo o país.
        </p>
        <nav aria-label="Anos" className="mt-6 flex flex-wrap gap-2">
          {anos.map((ano) => (
            <a
              key={ano}
              href={`#ano-${ano}`}
              className="rounded-full bg-mist px-4 py-2 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              {ano}
            </a>
          ))}
        </nav>
      </section>

      {anos.map((ano) => (
        <section key={ano} id={`ano-${ano}`} aria-labelledby={`titulo-${ano}`} className="mx-auto max-w-3xl scroll-mt-24 px-4 pt-12 sm:px-6">
          <h2 id={`titulo-${ano}`} className="font-display text-5xl font-bold text-navy">
            {ano}
          </h2>
          <div className="mt-6 space-y-6 border-l-4 border-navy/15 pl-6 sm:pl-8">
            {itens
              .filter((i) => (i.data.desde ?? 0) === ano)
              .map((i) => (i.c ? <Grande key={i.id} id={i.id} c={i.c} /> : <Pequena key={i.id} id={i.id} e={i.e} />))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <PartilharBotao titulo="A nossa história" texto="A Iniciativa Liberal e a IL Trofa, ano a ano." />
      </section>

      {/* Os marcos do núcleo, no fim da página (pedido do Ivo, 26/11/2026). */}
      <section id="marcos" className="scroll-mt-24 bg-navy py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">IL Trofa · desde 2022</p>
          <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">Os marcos do núcleo</h2>
          <Marcos marcos={marcos} />
        </div>
      </section>

      <section className="bg-navy py-12 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="font-display text-2xl font-bold md:text-3xl">A próxima página escreve-se contigo.</p>
          <Link
            href="/participa?t=membro"
            className="mt-6 inline-block rounded-full bg-sun px-7 py-3 font-bold text-navy transition hover:bg-white"
          >
            Junta-te a nós →
          </Link>
          <p className="mt-6 text-sm text-white/90">
            <Link href="/datas" className="font-bold underline hover:text-sun">
              Outras datas que celebramos
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
