import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lugarDe } from "@/components/BannerComemoracao";
import PageHero from "@/components/PageHero";
import PartilharBotao from "@/components/PartilharBotao";
import { MESES, proximaVez } from "@/lib/datasAnuais";
import { festas } from "@/lib/festas";

// Festas das freguesias, pela ordem em que acontecem a partir de hoje (datas em lib/festas.ts).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Festas da nossa terra — Iniciativa Liberal Trofa",
  description: "As festas das freguesias da Trofa ao longo do ano, com as datas deste ano.",
};

const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

export default function Festas() {
  const lista = festas
    .map((f) => ({ f, p: proximaVez(f.data) }))
    .sort((a, b) => a.p.dias - b.p.dias);

  return (
    <>
      <PageHero eyebrow="Ao longo do ano" title="Festas da nossa terra">
        <p>Cada freguesia tem as suas festas. Aqui ficam todas, pela ordem em que acontecem.</p>
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <p className="max-w-3xl text-lg leading-relaxed text-ink/85">
          A música, a comida, a tradição e o encontro de quem vive cá e de quem volta: as festas são uma parte do
          que somos. Boas festas a todas as freguesias da Trofa!
        </p>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
          {lista.map(({ f, p }) => {
            const semana = DIAS[new Date(Date.UTC(p.ano, p.mes - 1, p.dia)).getUTCDay()];
            return (
              <li key={f.id} id={f.id} className="scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10">
                {f.imagem && (
                  <Image
                    src={f.imagem.src}
                    alt={f.imagem.alt}
                    width={f.imagem.w}
                    height={f.imagem.h}
                    sizes="(min-width: 640px) 480px, 100vw"
                    className="aspect-[3/2] w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-pink">
                    {semana}, {p.dia} de {MESES[p.mes - 1]} de {p.ano}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-bold text-navy">{f.nome}</h2>
                  <p className="font-bold text-cyan-dark">{lugarDe(f.freguesia)}</p>
                  {f.texto && <p className="mt-3 text-ink/80">{f.texto}</p>}
                  <p className="mt-3 text-sm text-ink/60">Todos os anos: {f.data.quando}.</p>
                  {f.imagem?.credito && (
                    <p className="mt-2 text-xs text-ink/50">
                      Foto:{" "}
                      <a href={f.imagem.credito.url} className="underline" target="_blank" rel="noopener noreferrer">
                        {f.imagem.credito.autor}
                      </a>
                      , {f.imagem.credito.licenca}, via Wikimedia Commons.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-sm text-ink/60">
          As datas seguem a tradição de cada festa e podem mudar de um ano para o outro. Confirma sempre no programa
          da comissão de festas ou da Junta de Freguesia.
        </p>
        <div className="mt-8">
          <PartilharBotao titulo="Festas da nossa terra" texto="As festas das freguesias da Trofa ao longo do ano." />
        </div>
      </section>

      <section className="bg-navy py-12 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="font-display text-2xl font-bold md:text-3xl">Queres ajudar a Trofa a ir mais longe?</p>
          <Link
            href="/participa?t=membro"
            className="mt-6 inline-block rounded-full bg-sun px-7 py-3 font-bold text-navy transition hover:bg-white"
          >
            Junta-te a nós →
          </Link>
          <p className="mt-6 text-sm text-white/80">
            <Link href="/datas" className="font-bold underline hover:text-sun">
              Outras datas que celebramos
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
