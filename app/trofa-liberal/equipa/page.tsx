import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Equipa — Iniciativa Liberal Trofa" };

function Pessoa({ nome, foto }: { nome: string; foto: string }) {
  return (
    <li className="text-center">
      <Image src={foto} alt={nome} width={228} height={228} className="mx-auto h-44 w-44 rounded-full" />
      <p className="font-display mt-4 text-xl font-bold text-navy">{nome}</p>
    </li>
  );
}

const mandatos = [
  {
    periodo: "2026 – 2028",
    tag: "Mandato atual",
    coordenador: "Bruno Magalhães e José Pedro Reis",
    mesa: "A definir",
    texto:
      "Grupo de Coordenação Local eleito em plenário em Alvarelhos, com o objetivo de levar o liberalismo a todos os cidadãos da Trofa.",
  },
  {
    periodo: "2024 – 2026",
    coordenador: "Ivo Silva",
    mesa: "Afonso Couto",
    texto:
      "Eleito no Plenário Territorial realizado a 7 de setembro de 2024, no auditório da Junta de Freguesia de Bougado (Polo de Santiago).",
  },
  {
    periodo: "2022 – 2024",
    coordenador: "José Pedro Reis",
    mesa: "Ivo Silva",
    texto:
      "O Plenário fundador ocorreu a 25 de junho de 2022, no auditório da Junta de Freguesia do Coronado (Polo de São Romão), com a presença do antigo presidente da IL, Rui Rocha.",
  },
];

export default function Equipa() {
  return (
    <>
      <PageHero eyebrow="Trofa Liberal" title="A equipa que faz a diferença" image={{ src: "/images/geral/grupo-bandeira.png", alt: "Equipa da IL Trofa com a bandeira do concelho", w: 732, h: 578 }}>
        Uma equipa dedicada, comprometida em promover os valores liberais no concelho e em
        encontrar soluções que coloquem a liberdade individual e o progresso no centro das suas
        ações.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
          Grupo de Coordenação Local
        </h2>
        <p className="mt-3 max-w-2xl text-ink/75">
          O Grupo de Coordenação Local do Núcleo Territorial da Trofa dinamiza a atividade política
          do núcleo, organiza iniciativas e promove a participação dos membros.
        </p>
        <ul className="mt-10 flex flex-wrap gap-10">
          <Pessoa nome="Bruno Magalhães" foto="/images/equipa/bruno-magalhaes.png" />
          <Pessoa nome="José Pedro Reis" foto="/images/equipa/jose-pedro-reis.png" />
        </ul>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Mesa do Plenário</h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            A Mesa do Plenário impulsiona o diálogo e promove a participação ativa, reforçando os
            valores liberais de transparência e responsabilidade.
          </p>
          <p className="mt-6 font-bold text-cyan-dark">Composição a definir.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
          Órgãos sociais
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
          Mandatos do núcleo
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {mandatos.map((m) => (
            <li key={m.periodo} className="rounded-2xl bg-navy p-8 text-white">
              <span className="font-display text-3xl font-bold text-sun">{m.periodo}</span>
              {m.tag && (
                <span className="ml-3 rounded-full bg-pink px-3 py-1 text-xs font-bold text-white">
                  {m.tag}
                </span>
              )}
              <p className="mt-4 text-sm">
                <span className="text-white/60">Coordenação:</span> {m.coordenador}
              </p>
              <p className="text-sm">
                <span className="text-white/60">Mesa do Plenário:</span> {m.mesa}
              </p>
              <p className="mt-4 text-sm text-white/75">{m.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
