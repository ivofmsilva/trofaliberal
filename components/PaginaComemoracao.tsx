import Image from "next/image";
import Link from "next/link";
import Marcos from "@/components/Marcos";
import PageHero from "@/components/PageHero";
import PartilharBotao from "@/components/PartilharBotao";
import { preencher, valoresDe, type Bloco, type Comemoracao, type Img } from "@/lib/comemoracoes";
import { marcos } from "@/lib/nucleo";

// Página de uma data que celebramos (texto em lib/comemoracoes.ts). Igual para todas: título, foto, texto,
// partilhar e o convite para entrar no núcleo. As fotos de fora levam o autor e a licença por baixo.

function Credito({ img }: { img: Img }) {
  if (!img.credito) return null;
  const c = img.credito;
  return (
    <>
      Foto:{" "}
      <a href={c.url} className="underline hover:text-pink" target="_blank" rel="noopener noreferrer">
        {c.autor}
      </a>
      , {c.licenca}, via Wikimedia Commons.
    </>
  );
}

function Figura({ img, legenda }: { img: Img; legenda?: string }) {
  return (
    <figure className="py-2">
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes="(min-width: 768px) 720px, 100vw"
        className="max-h-[32rem] w-full rounded-2xl object-cover shadow-lg"
      />
      {(legenda || img.credito) && (
        <figcaption className="mt-2 text-sm text-ink/70">
          {legenda} {legenda && img.credito && " "}
          <Credito img={img} />
        </figcaption>
      )}
    </figure>
  );
}

function MostrarBloco({ b, v }: { b: Bloco; v: Record<string, string> }) {
  if (typeof b === "string") return <p>{preencher(b, v)}</p>;
  if ("lista" in b)
    return (
      <ul className="space-y-2">
        {b.lista.map((x) => (
          <li key={x} className="ml-5 list-disc marker:text-pink">
            {preencher(x, v)}
          </li>
        ))}
      </ul>
    );
  if ("destaque" in b) return <p className="font-display text-xl font-bold text-navy md:text-2xl">{preencher(b.destaque, v)}</p>;
  if ("imagem" in b) return <Figura img={b.imagem} legenda={b.legenda && preencher(b.legenda, v)} />;
  if ("link" in b)
    return (
      <p>
        <Link href={b.href} className="font-bold text-cyan-dark hover:underline">
          {b.link}
        </Link>
      </p>
    );
  if ("nota" in b) return <p className="text-sm text-ink/70">{preencher(b.nota, v)}</p>;
  return null; // os marcos vão numa faixa própria, depois do texto
}

export default function PaginaComemoracao({ c }: { c: Comemoracao }) {
  const v = valoresDe(c);
  const titulo = preencher(c.titulo, v);
  const temMarcos = c.blocos.some((b) => typeof b === "object" && "marcos" in b);
  // A foto principal aparece logo a seguir à abertura, a não ser que já esteja no meio do texto.
  const fotoNoTexto = c.blocos.some((b) => typeof b === "object" && "imagem" in b && b.imagem.src === c.imagem.src);

  return (
    <>
      <PageHero eyebrow={preencher(c.etiqueta, v)} title={titulo}>
        <p>{preencher(c.subtitulo, v)}</p>
      </PageHero>

      <div aria-hidden className="grid h-3 grid-cols-3">
        <div className="bg-cyan" />
        <div className="bg-sun" />
        <div className="bg-pink" />
      </div>

      <article className="mx-auto max-w-3xl px-4 py-14 text-lg leading-relaxed text-ink/85 sm:px-6">
        <p className="font-display text-2xl font-bold leading-snug text-navy md:text-3xl">{preencher(c.abertura, v)}</p>
        <div className="mt-6 space-y-5">
          {!fotoNoTexto && <Figura img={c.imagem} />}
          {c.blocos.map((b, i) => (
            <MostrarBloco key={i} b={b} v={v} />
          ))}
          {c.fecho && <p className="font-display text-2xl font-bold text-pink">{preencher(c.fecho, v)}</p>}
          {c.assinatura && (
            <div className="flex items-center gap-4 pt-2">
              {c.assinatura.foto && (
                <Image src={c.assinatura.foto} alt="" width={72} height={72} className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-full" />
              )}
              <p className="leading-snug">
                <span className="font-display block text-xl font-bold text-navy">{c.assinatura.nome}</span>
                <span className="block text-base text-ink/70">{c.assinatura.cargo}</span>
              </p>
            </div>
          )}
        </div>
        <div className="mt-8">
          <PartilharBotao titulo={titulo} texto={preencher(c.partilhar, v)} />
        </div>
      </article>

      {temMarcos && (
        <section className="bg-navy py-14 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">Desde 2022</p>
            <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">Os nossos marcos</h2>
            <Marcos marcos={marcos} />
          </div>
        </section>
      )}

      <section className={`${temMarcos ? "bg-mist text-navy" : "bg-navy text-white"} py-12 text-center`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {!c.semConvite && (
            <>
              <p className="font-display text-2xl font-bold md:text-3xl">Queres ajudar a Trofa a ir mais longe?</p>
              <Link
                href="/participa?t=membro"
                className="mt-6 inline-block rounded-full bg-sun px-7 py-3 font-bold text-navy transition hover:bg-pink hover:text-white"
              >
                Junta-te a nós →
              </Link>
            </>
          )}
          <p className={`${c.semConvite ? "" : "mt-6 "}text-sm ${temMarcos ? "text-ink/70" : "text-white/90"}`}>
            <Link href="/datas" className="font-bold underline hover:text-sun">
              Outras datas que celebramos
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
