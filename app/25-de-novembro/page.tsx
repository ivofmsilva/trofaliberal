import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PartilharBotao from "@/components/PartilharBotao";
import { anosDe, vinteCincoNovembro } from "@/lib/datasAnuais";

// Página do 25 de Novembro. Fica sempre online; o banner só aparece de 24 a 26 de novembro (lib/datasAnuais.ts)
// Os anos contam-se sozinhos.
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const anos = anosDe(vinteCincoNovembro);
  return {
    title: `${anos} anos do 25 de Novembro — Iniciativa Liberal Trofa`,
    description: "Abril deu-nos a liberdade. Novembro garantiu que ela ficava.",
    openGraph: {
      title: `${anos} anos do 25 de Novembro`,
      description: "O dia em que a liberdade de Abril veio para ficar.",
      images: ["/images/eventos/25-novembro-cravos.webp"],
    },
  };
}

export default function VinteCincoNovembro() {
  const anos = anosDe(vinteCincoNovembro);

  return (
    <>
      <PageHero eyebrow="25 de novembro · 1975" title={`${anos} anos do 25 de Novembro`}>
        <p>O dia em que a liberdade de Abril veio para ficar.</p>
      </PageHero>

      <div aria-hidden className="grid h-3 grid-cols-[2fr_3fr]">
        <div className="bg-[#046a38]" />
        <div className="bg-[#da291c]" />
      </div>

      <article className="mx-auto max-w-3xl px-4 py-14 text-lg leading-relaxed text-ink/85 sm:px-6">
        <p className="font-display text-2xl font-bold leading-snug text-navy md:text-3xl">
          A 25 de novembro de 1975, Portugal garantiu a liberdade que tinha conquistado no 25 de Abril.
        </p>
        <div className="mt-6 space-y-5">
          <p>
            O 25 de Abril de 1974 pôs fim a 48 anos de ditadura e devolveu a liberdade aos portugueses. Um ano
            depois, vieram as primeiras eleições livres.
          </p>
          <p>
            Mas esses meses foram também de grande tensão: ocupações, nacionalizações e o risco de trocar uma
            ditadura por outra, e de Portugal se tornar a “Cuba da Europa”. Muitos portugueses temeram perder a
            liberdade que tinham acabado de conquistar.
          </p>
          <p>
            No 25 de Novembro, essa deriva foi travada. Ficou garantido que se respeitava a vontade que os
            portugueses tinham mostrado nas urnas, e abriu-se caminho à Constituição de 1976 e às primeiras
            eleições legislativas. Desde então, quem governa Portugal é escolhido pelo voto.
          </p>
          <p>
            O V-Dem, o projeto internacional que mede a democracia em todo o mundo, só considera Portugal uma
            democracia a partir de 1976: foi depois do 25 de Novembro que se completou o caminho aberto em Abril.
          </p>
          <figure className="py-2">
            <Image
              src="/images/eventos/25-novembro-sempre.webp"
              alt="Cartaz da Iniciativa Liberal em Lisboa: 25 de Novembro sempre. Comunismo nunca mais. Só em Novembro se cumpriu Abril."
              width={784}
              height={540}
              sizes="(min-width: 768px) 720px, 100vw"
              className="w-full rounded-2xl shadow-lg"
            />
            <figcaption className="mt-2 text-sm text-ink/60">Cartaz da Iniciativa Liberal em Lisboa.</figcaption>
          </figure>
          <p className="font-display text-xl font-bold text-navy md:text-2xl">
            Abril deu-nos a liberdade; Novembro garantiu que ela ficava. Por isso dizemos que Novembro cumpriu
            Abril.
          </p>
          <p>
            Durante anos, as instituições quase apagaram o 25 de Novembro. A Iniciativa Liberal celebra-o desde a
            sua fundação, sem complexos, tal como celebra o 25 de Abril.
          </p>
          <p>
            Para os liberais, esta lição não envelhece: a liberdade não se dá por garantida. Defende-se todos os
            dias, contra quem a quer concentrar no Estado, num partido ou numa só pessoa. Uma ditadura comunista
            teria trazido pobreza e repressão; a liberdade trouxe-nos a Europa, o crescimento e as oportunidades.
            Cabe-nos agora trabalhar por uma democracia mais robusta e por um país onde o mérito é reconhecido e
            há oportunidades para todos.
          </p>
          <p className="font-display text-2xl font-bold text-pink">
            Viva o 25 de Abril. Viva o 25 de Novembro. Viva a liberdade!
          </p>
          <figure className="pt-4">
            <Image
              src="/images/eventos/25-novembro-conquistas.webp"
              alt="Cartaz da Iniciativa Liberal: As conquistas do 25 de Novembro. Democracia, liberdade, prosperidade, com um cravo vermelho, um azul e um branco. Novembro cumpriu Abril."
              width={1600}
              height={1200}
              sizes="(min-width: 768px) 720px, 100vw"
              className="w-full rounded-2xl shadow-lg"
            />
            <figcaption className="mt-2 text-sm text-ink/60">Cartaz da Iniciativa Liberal.</figcaption>
          </figure>
        </div>
        <div className="mt-8">
          <PartilharBotao
            titulo={`${anos} anos do 25 de Novembro`}
            texto="Abril deu-nos a liberdade. Novembro garantiu que ela ficava."
          />
        </div>
      </article>

      <section className="bg-navy py-12 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="font-display text-2xl font-bold md:text-3xl">Queres ajudar a Trofa a ir mais longe?</p>
          <Link
            href="/participa?t=membro"
            className="mt-6 inline-block rounded-full bg-sun px-7 py-3 font-bold text-navy transition hover:bg-white"
          >
            Junta-te a nós →
          </Link>
        </div>
      </section>
    </>
  );
}
