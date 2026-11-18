import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Galeria from "@/components/Galeria";
import PageHero from "@/components/PageHero";
import PartilharBotao from "@/components/PartilharBotao";
import { anosDoConcelho, diaDoConcelho, estaNaSemana } from "@/lib/datasAnuais";

// Página do Dia do Concelho (19 de novembro). Só está online de 18 a 24 de novembro
// (lib/datasAnuais.ts) e volta sozinha todos os anos, com os anos já contados.
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

const terra = [
  {
    src: "/images/concelho/vista-s-gens.webp",
    legenda: "A Trofa vista do monte de São Gens",
    autor: "Vitor Oliveira",
    licenca: "CC BY-SA 2.0",
    licencaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    fonte: "https://commons.wikimedia.org/wiki/File:Trofa_vista_de_S._Gens_(96492919).jpg",
  },
  {
    src: "/images/concelho/santuario-s-gens.webp",
    legenda: "Santuário de São Gens",
    autor: "Vitor Oliveira",
    licenca: "CC BY-SA 2.0",
    licencaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    fonte: "https://commons.wikimedia.org/wiki/File:Santu%C3%A1rio_de_S._Gens_-_Trofa_(110637408).jpg",
  },
  {
    src: "/images/concelho/rio-ave.webp",
    legenda: "O rio Ave",
    autor: "Pedro (Maia)",
    licenca: "CC BY 4.0",
    licencaUrl: "https://creativecommons.org/licenses/by/4.0/",
    fonte: "https://commons.wikimedia.org/wiki/File:Trofa_DSC_0014_(54939717390).jpg",
  },
  {
    src: "/images/concelho/ponte-rio-ave.webp",
    legenda: "Ponte sobre o rio Ave",
    autor: "Pedro (Maia)",
    licenca: "CC BY 4.0",
    licencaUrl: "https://creativecommons.org/licenses/by/4.0/",
    fonte: "https://commons.wikimedia.org/wiki/File:Trofa_DSC_0010_(54938530022).jpg",
  },
  {
    src: "/images/concelho/moinho-rio-ave.webp",
    legenda: "Moinho e açude no rio Ave",
    autor: "Pedro (Maia)",
    licenca: "CC BY 4.0",
    licencaUrl: "https://creativecommons.org/licenses/by/4.0/",
    fonte: "https://commons.wikimedia.org/wiki/File:Trofa_DSC_0026_(54940744939).jpg",
  },
];

const etiqueta = "text-sm font-bold uppercase tracking-[0.25em]";

export default function DiaDoConcelho() {
  if (!estaNaSemana(diaDoConcelho)) notFound();
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
          <p className="font-display text-2xl font-bold text-pink">Bom feriado, Trofa!</p>
        </div>
        <div className="mt-8">
          <PartilharBotao
            titulo={`${anos} anos de Concelho da Trofa`}
            texto="19 de novembro de 1998: o dia em que a Trofa conquistou o seu concelho."
          />
        </div>
      </article>

      <section className="bg-mist py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className={`${etiqueta} text-pink`}>Novembro de 1998</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-navy md:text-4xl">A Trofa em Lisboa</h2>
          <Galeria fotos={arquivo.map((f) => f.src)} legendas={arquivo.map((f) => f.legenda)} alt="Novembro de 1998" />
          <p className="mt-2 text-sm text-ink/60">
            Fotos: Arquivo da Câmara Municipal da Trofa e Centro Digital de Informação Local.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className={`${etiqueta} text-pink`}>A nossa terra</p>
        <h2 className="font-display mt-2 text-3xl font-bold text-navy md:text-4xl">Do São Gens ao rio Ave</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {terra.map((f, i) => (
            <li key={f.src} className={i === 0 ? "sm:col-span-2" : ""}>
              <div className={`relative overflow-hidden rounded-2xl ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={f.src}
                  alt={f.legenda}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className="object-cover"
                />
              </div>
              <p className="mt-2 font-bold text-navy">{f.legenda}</p>
              <p className="text-xs text-ink/60">
                Foto:{" "}
                <a href={f.fonte} target="_blank" rel="noopener noreferrer" className="underline hover:text-pink">
                  {f.autor}
                </a>
                ,{" "}
                <a href={f.licencaUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-pink">
                  {f.licenca}
                </a>
              </p>
            </li>
          ))}
        </ul>
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
