import type { Metadata } from "next";
import Galeria from "@/components/Galeria";
import ItemCard from "@/components/ItemCard";
import PageHero from "@/components/PageHero";
import { links } from "@/lib/eventos";
import { fotos } from "@/lib/galeria";
import { itens } from "@/lib/imprensa";

export const metadata: Metadata = { title: "LIT — Jornadas Liberais da Trofa" };

const imprensa = itens.noticias.filter((n) => n.data?.startsWith("2026-03"));

export default function Lit() {
  return (
    <>
      <PageHero eyebrow="Eventos · LIT" title="LIT — Jornadas Liberais da Trofa">
        O nosso ciclo de debates temáticos, aberto a toda a comunidade.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
          Primeira edição
        </p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Educação</h2>
        <div className="mt-8 max-w-3xl space-y-5 text-lg text-ink/85">
          <p>
            A primeira edição das Jornadas Liberais da Trofa juntou a comunidade para debater o
            futuro da Educação no concelho.
          </p>
          <p>
            Entre 23 e 27 de março, a IL Trofa realizou visitas a estabelecimentos de ensino do
            concelho, cobrindo as várias vertentes do sistema educativo. O objetivo era conhecer a
            realidade de cada instituição e recolher perspetivas diretas dos seus responsáveis,
            construindo assim um retrato rigoroso e diversificado da educação na Trofa antes do
            debate público.
          </p>
          <p>
            No evento final foi feita uma apresentação de dados sobre o ensino na Trofa e em
            Portugal, seguida das intervenções dos oradores José Pedro Reis (professor e historiador
            trofense), Matilde Rocha (vereadora da Educação da Câmara do Porto) e Sandra Maia
            (psicóloga trofense).
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={links.litVideo} target="_blank" rel="noopener noreferrer" className="rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy hover:text-white">
            Ver vídeo ↗
          </a>
          <a href={links.litEvento} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white">
            Evento no Facebook ↗
          </a>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Galeria de fotos</h2>
          <Galeria fotos={fotos("lit")} alt="Jornadas Liberais da Trofa" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Notícias na imprensa</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {imprensa.map((n) => (
            <li key={n.href}>
              <ItemCard item={n} />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Relatório das jornadas</h2>
            <p className="mt-2 text-white/60">Download em breve.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">Edições futuras</h2>
            <p className="mt-2 text-sun">Brevemente.</p>
          </div>
        </div>
      </section>
    </>
  );
}
