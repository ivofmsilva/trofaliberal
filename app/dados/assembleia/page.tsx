import type { Metadata } from "next";
import DocumentosPorAno from "@/components/dados/DocumentosPorAno";
import Votacoes from "@/components/dados/Votacoes";
import { assembleia } from "@/lib/dados/autarquia";

export const metadata: Metadata = {
  title: "Assembleia Municipal",
  description: "Ordens de trabalhos, deliberações e atas das sessões da Assembleia Municipal da Trofa.",
};

const partes = [
  {
    id: "deliberacoes",
    tipo: "am-deliberacoes",
    titulo: "Deliberações",
    nomeTipo: "Deliberações",
    texto: "O que foi votado em cada sessão e como votou cada grupo municipal.",
    fonte: "https://mun-trofa.pt/menu/134/deliberacoes",
  },
  {
    id: "ordens",
    tipo: "am-ordem",
    titulo: "Ordens de trabalhos",
    nomeTipo: "Ordem de trabalhos",
    texto: "Os assuntos marcados para cada sessão.",
    fonte: "https://mun-trofa.pt/menu/132/ordem-de-trabalhos",
  },
  {
    id: "atas",
    tipo: "am-ata",
    titulo: "Atas",
    nomeTipo: "Ata",
    texto: "O registo completo de cada sessão.",
    fonte: "https://mun-trofa.pt/menu/133/atas",
  },
] as const;

export default function Assembleia() {
  return (
    <>
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Autarquia</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Assembleia Municipal</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Os documentos das sessões da Assembleia Municipal, tal como o município os publica. Cada ligação abre o PDF
            original.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            <li>
              <a href="#votacoes" className="inline-block rounded-full border border-linha bg-fundo px-4 py-2 text-sm font-medium text-texto transition hover:border-tinta hover:text-tinta">
                Votações
              </a>
            </li>
            {partes.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="inline-block rounded-full border border-linha bg-fundo px-4 py-2 text-sm font-medium text-texto transition hover:border-tinta hover:text-tinta">
                  {p.titulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <section id="votacoes" className="scroll-mt-6 border-b border-linha py-12">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Votações</h2>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            Cada ponto votado nas sessões desde 2015, com o resultado e a forma como votou cada grupo municipal, lidos
            das deliberações publicadas pelo município. O texto original está sempre à mão.
          </p>
          <Votacoes />
          <p className="mt-6 max-w-2xl text-sm text-apagado">
            Os números por grupo só se mostram quando somam certo com o total que o documento anuncia. Nos poucos casos em
            que o PDF está incompleto ou não bate certo, fica só o texto original. As votações por escrutínio secreto
            (eleições e designações) mostram só os totais.
          </p>
        </section>
        {partes.map((p) => {
          const docs = assembleia.filter((d) => d.tipo === p.tipo);
          return (
            <section key={p.id} id={p.id} className="scroll-mt-6 border-b border-linha py-12 last:border-b-0">
              <h2 className="text-2xl font-bold tracking-tight text-tinta">{p.titulo}</h2>
              <p className="mt-2 mb-6 text-texto">
                {p.texto} <span className="text-apagado">({docs.length} documentos)</span>
              </p>
              <DocumentosPorAno docs={docs} nomeTipo={p.nomeTipo} />
              <p className="mt-4 text-sm text-apagado">
                Fonte:{" "}
                <a href={p.fonte} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                  mun-trofa.pt ↗
                </a>
              </p>
            </section>
          );
        })}
      </div>
    </>
  );
}
