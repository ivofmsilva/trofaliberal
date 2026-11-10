import type { Metadata } from "next";
import Link from "next/link";
import ComoVotam from "@/components/dados/ComoVotam";
import DocumentosPorAno from "@/components/dados/DocumentosPorAno";
import Votacoes from "@/components/dados/Votacoes";
import { camara } from "@/lib/dados/autarquia";

export const metadata: Metadata = {
  title: "Câmara Municipal",
  description: "Deliberações e atas das reuniões da Câmara Municipal da Trofa, desde 2017.",
};

export default function Camara() {
  const atas = camara.filter((d) => d.tipo === "camara-ata");
  return (
    <>
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Autarquia</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Câmara Municipal</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            As deliberações e as atas das reuniões do executivo municipal, tal como a Câmara as publica. Cada ponto traz
            o resultado e, quando houve votos contra ou abstenções, quem votou em cada sentido.
          </p>
          <p className="mt-3 text-sm text-texto">
            <Link href="/dados/orgaos" className="underline underline-offset-2 hover:text-tinta">← Quem decide: composição e funções</Link>
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              ["como-votam", "Como votam"],
              ["votacoes", "Deliberações"],
              ["atas", "Atas"],
            ].map(([id, nome]) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-block rounded-full border border-linha bg-fundo px-4 py-2 text-sm font-medium text-texto transition hover:border-tinta hover:text-tinta">
                  {nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <section id="como-votam" className="scroll-mt-6 border-b border-linha py-12">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Como votam</h2>
          <p className="mt-2 mb-6 max-w-2xl text-texto">Quantas decisões são tomadas por unanimidade e, nas que não são, como votou cada lista. Contado a partir das deliberações publicadas, sem comentários.</p>
          <ComoVotam corpo="camara" />
        </section>
        <section id="votacoes" className="scroll-mt-6 border-b border-linha py-12">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Deliberações</h2>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            Cada ponto decidido nas reuniões, ponto a ponto, lido das deliberações que a Câmara publica. O texto original
            e o PDF estão sempre à mão.
          </p>
          <Votacoes ficheiro="camara-votos" sessao="reunião" />
          <p className="mt-6 max-w-2xl text-sm text-apagado">
            A Câmara indica quais as listas que votaram a favor, contra ou se abstiveram, mas não diz quantos votos deu
            cada uma; por isso mostramos o total e as listas. Os PDF de 2017 e 2018 e alguns dos anos seguintes (36
            em 221) são digitalizações, sem texto que se possa ler automaticamente: ficam só com a ligação ao original.
          </p>
        </section>

        <section id="atas" className="scroll-mt-6 py-12">
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-tinta">Atas das reuniões</h2>
          <DocumentosPorAno docs={atas} nomeTipo="Ata" />
          <p className="mt-10 text-sm text-apagado">
            Fonte:{" "}
            <a href="https://mun-trofa.pt/menu/107/atas" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
              mun-trofa.pt, Atas de reuniões de Câmara ↗
            </a>
            . Os nomes dos ficheiros nem sempre trazem a data da reunião; quando falta, mostramos o que o ficheiro diz.
          </p>
        </section>
      </div>
    </>
  );
}
