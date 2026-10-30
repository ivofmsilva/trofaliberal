import type { Metadata } from "next";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { campanha } from "@/lib/autarquicas";

export const metadata: Metadata = { title: "Apresentação do programa — Autárquicas 2025" };

const destaques = [
  {
    titulo: "No auditório da Escola Secundária da Trofa",
    texto: "Escolhemos uma escola para reforçar a importância que os liberais dão à educação e às ideias.",
  },
  {
    titulo: "O primeiro programa a ser divulgado",
    texto:
      "Fomos o primeiro partido a disponibilizar o programa eleitoral e o único a fazê-lo antes do debate dos candidatos.",
  },
  {
    titulo: "O único evento só para o programa",
    texto: "Fomos o único partido a organizar um evento dedicado à apresentação do programa eleitoral.",
  },
];

export default function ApresentacaoPrograma() {
  const p = campanha.programa;
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Apresentação do programa eleitoral">
        Fotos e vídeo da sessão de apresentação do programa eleitoral, no auditório da Escola
        Secundária da Trofa.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">A sessão</p>
          <div className="mt-6 max-w-3xl space-y-4 text-lg text-ink/85">
            <p>
              Apresentámos o programa eleitoral no auditório da Escola Secundária da Trofa. Não foi
              por acaso: queríamos mostrar a importância que os liberais dão à educação e às ideias.
            </p>
            <p>
              Fomos o primeiro partido a disponibilizar o programa eleitoral e o único a fazê-lo antes
              do debate dos candidatos. E fomos o único partido a organizar um evento dedicado à
              apresentação do programa. Os outros partidos multiplicaram-se em eventos de apresentação
              de candidatos, e isso mostra que dão muito mais importância aos nomes do que às ideias.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {destaques.map((d, i) => (
              <li key={d.titulo} className="rounded-2xl bg-navy p-8 text-white">
                <span className="font-display text-sm font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight">{d.titulo}</h3>
                <p className="mt-3 text-white/85">{d.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Fotos</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {p.fotos.map((l) => (
              <li key={l.href}>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Vídeo</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {p.videos.map((l) => (
              <li key={l.href}>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Mais publicações</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campanha.programaPublicacoes.map((l) => (
              <li key={l.href}>
                <InstagramEmbed id={igId(l.href)} titulo={l.titulo} altura={680} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
