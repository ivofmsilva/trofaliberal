import type { Metadata } from "next";
import Galeria from "@/components/Galeria";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { campanha } from "@/lib/autarquicas";
import { fotos } from "@/lib/galeria";

export const metadata: Metadata = { title: "Apresentação do Programa — Autárquicas 2025" };

const destaques = [
  {
    titulo: "No Auditório da Escola Secundária da Trofa",
    texto: "Escolhemos uma escola para reforçar a importância que os liberais dão à educação e às ideias.",
  },
  {
    titulo: "O Programa Antes do Debate",
    texto: "Divulgámos o programa eleitoral antes do debate dos candidatos, para que as ideias pudessem ser discutidas.",
  },
  {
    titulo: "Um Evento só para o Programa",
    texto: "Dedicámos um evento inteiro à apresentação do programa, e não só à dos candidatos.",
  },
];

export default function ApresentacaoPrograma() {
  const p = campanha.programa;
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Apresentação do Programa Eleitoral">
        Fotos e vídeo da sessão de apresentação do programa eleitoral, no auditório da Escola
        Secundária da Trofa.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">A sessão</p>
          <div className="mt-6 max-w-3xl space-y-4 text-lg text-ink/85">
            <p>
              No dia 12 de setembro, às 21h, apresentámos o programa eleitoral no auditório da Escola
              Secundária da Trofa, com a presença de Mariana Leitão, presidente da Iniciativa Liberal.
              Não foi por acaso: queríamos mostrar a importância que os
              liberais dão à educação e às ideias.
            </p>
            <p>
              Divulgámos o programa eleitoral antes do debate dos candidatos e dedicámos-lhe um evento
              próprio. Para nós, uma candidatura começa nas ideias: os nomes contam, mas é o programa
              que diz aos trofenses o que queremos fazer.
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
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Imagens</h2>
          <Galeria fotos={fotos("programa-2025")} alt="Apresentação do programa eleitoral da IL Trofa, na Escola Secundária da Trofa" />
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
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Mais Publicações</h2>
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
