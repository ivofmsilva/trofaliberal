import type { Metadata } from "next";
import Link from "next/link";
import ComoVotam from "@/components/dados/ComoVotam";
import ComposicaoCamara from "@/components/dados/ComposicaoCamara";
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
      <section className="border-b border-linha bg-gradient-to-b from-cinza to-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Autarquia</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Câmara Municipal</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            O executivo do município: quem faz parte da Câmara, o que faz, como vota e as deliberações e atas das reuniões, tal como a Câmara as publica.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              ["composicao", "Composição"],
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

      <section id="composicao" className="scroll-mt-6 border-b border-linha">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-tinta">Composição e funções</h2>
          <ComposicaoCamara />
        <p className="mt-10 max-w-3xl text-sm text-apagado">
          As freguesias (as juntas de freguesia das 6 freguesias do concelho) não são abordadas para já; serão no futuro.
        </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <section id="como-votam" className="scroll-mt-6 border-b border-linha py-12">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Como votam</h2>
          <p className="mt-2 mb-6 max-w-2xl text-texto">Quantas decisões são tomadas por unanimidade e, nas que não são, como votou cada lista. Contagem feita a partir das deliberações publicadas.</p>
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
            cada uma; por isso mostramos o total e as listas. 36 dos 221 documentos (2017 a 2019 e alguns dos anos
            seguintes) são digitalizações: foram lidos por reconhecimento automático de texto, que falha em alguns pontos,
            e esses ficam marcados como “não legível”. Confere sempre com o PDF original.
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
