import type { Metadata } from "next";
import Link from "next/link";
import Galeria from "@/components/Galeria";
import PageHero from "@/components/PageHero";
import PartilharBotao from "@/components/PartilharBotao";
import PartilharHistoria from "@/components/PartilharHistoria";
import { anosDoConcelho, diaDoConcelho, estaNaSemana } from "@/lib/datasAnuais";

// Página do Dia do Concelho (19 de novembro). Fica sempre online; o banner só aparece de 18 a 20 de novembro
// e o "Bom feriado" só nesses dias.
// Os anos contam-se sozinhos (lib/datasAnuais.ts).
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const anos = anosDoConcelho();
  return {
    title: `Dia do Concelho: ${anos} anos da Trofa — Iniciativa Liberal Trofa`,
    description: `A 19 de novembro de 1998 a Trofa conquistou o seu concelho. ${anos} anos depois, obrigado a quem lutou por ele.`,
    openGraph: {
      title: `${anos} anos de Concelho da Trofa`,
      description: "19 de novembro de 1998: o dia em que a Trofa passou a decidir o seu caminho.",
      images: ["/images/concelho/assembleia-1998.webp"],
    },
  };
}

const arquivo = [
  { src: "/images/concelho/assembleia-1998.webp", legenda: "Trofenses em frente à Assembleia da República" },
  { src: "/images/concelho/lisboa-faixa-1998.webp", legenda: "A caminho de São Bento, pelas ruas de Lisboa" },
  { src: "/images/concelho/escadaria-1998.webp", legenda: "Bandeiras da Trofa na escadaria do Parlamento" },
];

const etiqueta = "text-sm font-bold uppercase tracking-[0.25em]";

export default function DiaDoConcelho() {
  const naSemana = estaNaSemana(diaDoConcelho);
  const anos = anosDoConcelho();

  return (
    <>
      <PageHero
        eyebrow="19 de novembro · Dia do Concelho"
        title={`${anos} anos de Concelho da Trofa`}
        image={{
          src: "/images/concelho/assembleia-1998.webp",
          alt: "Trofenses com bandeiras em frente à Assembleia da República, em novembro de 1998",
          w: 1080,
          h: 792,
        }}
      >
        <p>Em 1998 fomos a Lisboa e trouxemos o concelho para casa.</p>
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 py-14 text-lg leading-relaxed text-ink/85 sm:px-6">
        <p className="font-display text-2xl font-bold leading-snug text-navy md:text-3xl">
          A 19 de novembro de 1998, a Assembleia da República aprovou a criação do concelho da Trofa.
        </p>
        <div className="mt-6 space-y-5">
          <p>
            Foi uma conquista de muitos trofenses que, durante anos, se juntaram, se organizaram e não
            desistiram. Nesse dia encheram-se autocarros, levantaram-se faixas e as bandeiras da Trofa
            subiram a escadaria de São Bento. A partir daí, a Trofa passou a decidir o seu próprio caminho.
          </p>
          <p>
            A todos os que lutaram por este dia, os que ainda cá estão e os que já partiram, o nosso
            obrigado.
          </p>
          <p>
            Em {anos} anos a Trofa cresceu: mais famílias, mais empresas e mais vida nas freguesias. Mas a
            independência não foi um ponto de chegada. Foi o direito de fazermos melhor por nós próprios,
            e ainda há muito caminho pela frente.
          </p>
          <p>
            Acreditamos numa Trofa com mais liberdade e mais oportunidades, que confia nos trofenses e
            não os deixa à espera. É com esse espírito de 1998 que queremos continuar.
          </p>
          {naSemana && <p className="font-display text-2xl font-bold text-pink">Bom feriado, Trofa!</p>}
        </div>
        <div className="mt-8 space-y-6">
          <PartilharBotao
            titulo={`${anos} anos de Concelho da Trofa`}
            texto="19 de novembro de 1998: o dia em que a Trofa conquistou o seu concelho."
          />
          <PartilharHistoria
            src="/dia-do-concelho/historia"
            nome="dia-do-concelho.png"
            titulo={`${anos} anos de Concelho da Trofa`}
            endereco="trofaliberal.pt/dia-do-concelho"
          />
        </div>
      </article>

      <section className="bg-mist py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className={`${etiqueta} text-pink`}>Novembro de 1998</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-navy md:text-4xl">A Trofa em Lisboa</h2>
          <Galeria fotos={arquivo.map((f) => f.src)} legendas={arquivo.map((f) => f.legenda)} alt="Novembro de 1998" />
          <p className="mt-2 text-sm text-ink/70">
            Fotos: Arquivo da Câmara Municipal da Trofa e Centro Digital de Informação Local.
          </p>
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
        </div>
      </section>
    </>
  );
}
