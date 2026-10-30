import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Galeria from "@/components/Galeria";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { campanha, candidatos } from "@/lib/autarquicas";
import { fotos } from "@/lib/galeria";

export const metadata: Metadata = { title: "Apresentação da candidatura — Autárquicas 2025" };

const frases = [
  {
    texto: "Esta candidatura não é só da Iniciativa Liberal. É da Trofa e dos trofenses.",
    quem: "Ivo Silva, coordenador do núcleo",
  },
  {
    texto: "A candidatura liberal da Trofa é feita de gente séria, livre e competente.",
    quem: "Miguel Rangel, deputado da Assembleia da República pela Iniciativa Liberal",
  },
  {
    texto: "Uma Câmara leve, transparente e próxima.",
    quem: "Diamantino Costa, candidato à Câmara Municipal",
  },
];

// Os discursos de cada candidato, resumidos a partir das publicações da campanha (sem aspas).
const discursos = [
  {
    texto:
      "A Assembleia Municipal tem de ser um órgão de fiscalização e de intervenção, e não um lugar de silêncio.",
    quem: "José Pedro Reis, candidato à Assembleia Municipal",
  },
  {
    texto:
      "Dar mais voz às pessoas, reforçar a responsabilidade cívica e garantir uma Junta próxima da comunidade.",
    quem: "Pedro Rebelo, candidato à União das Freguesias de Bougado",
  },
  {
    texto:
      "A política não deve ser sobre heranças ou interesses instalados. Deve ser sobre compromisso e ligação genuína às pessoas.",
    quem: "Bruno Magalhães, candidato à Junta de Freguesia de Alvarelhos",
  },
];

export default function ApresentacaoCandidatura() {
  const c = campanha.candidatura;
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Apresentação da candidatura">
        No dia 2 de agosto, a Iniciativa Liberal apresentou os seus candidatos às eleições
        autárquicas na Trofa. Esta é a candidatura Trofa Para Cima.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">2 de agosto</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
              Um dia marcante para a liberdade na Trofa
            </h2>
            <div className="mt-6 space-y-4 text-lg text-ink/85">
              <p>
                A apresentação oficial da candidatura realizou-se no espaço Mordomias, no centro da
                cidade. Reunimos amigos, apoiantes e candidatos que partilham a mesma visão: uma
                Trofa mais aberta, mais justa e com futuro.
              </p>
              <p>
                Diamantino Costa foi apresentado como cabeça de lista à Câmara Municipal, a defender
                uma Trofa mais transparente, menos burocrática, com redução dos impostos e foco no
                desenvolvimento económico e habitacional. Com ele, apresentámos José Pedro Reis para a
                Assembleia Municipal, Bruno Magalhães para a Junta de Freguesia de Alvarelhos e Pedro
                Rebelo para a Junta de Freguesia de Bougado.
              </p>
              <p>
                Foi uma candidatura nascida da participação das pessoas: um programa eleitoral aberto
                a contributos da comunidade e listas compostas por trofenses que quiseram sair do
                sofá e agir.
              </p>
            </div>
            <a
              href={c.evento}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
            >
              Evento no Facebook ↗
            </a>
          </div>
          <ul className="grid gap-4">
            {frases.map((f) => (
              <li key={f.quem} className="rounded-2xl bg-navy p-6 text-white">
                <p className="font-display text-xl font-bold leading-snug">“{f.texto}”</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-sun">{f.quem}</p>
              </li>
            ))}
            {discursos.map((f) => (
              <li key={f.quem} className="rounded-2xl border-l-8 border-pink bg-mist p-6 text-navy">
                <p className="font-display text-lg font-bold leading-snug">{f.texto}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-pink">{f.quem}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Os candidatos</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
            Quem apresentámos
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {candidatos.map((cd) => (
              <li key={cd.slug}>
                <Link
                  href={`/autarquicas-2025/candidatos/${cd.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl bg-navy text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/30"
                >
                  <Image
                    src={`/images/candidatos/${cd.slug}.webp`}
                    alt={cd.nome}
                    width={400}
                    height={400}
                    className="aspect-square w-full bg-white object-cover object-[center_35%]"
                  />
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold">{cd.nome}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-sun">{cd.cargo}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Imagens</h2>
          <Galeria fotos={fotos("candidatura-2025")} alt="Apresentação da candidatura da IL Trofa, no espaço Mordomias" />
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Vídeos</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.videos.map((l) => (
              <li key={l.href}>
                <p className="font-display mb-3 text-lg font-bold leading-snug text-navy">{l.titulo}</p>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
