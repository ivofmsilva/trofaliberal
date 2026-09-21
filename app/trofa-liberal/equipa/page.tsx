import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { gcl, mesa, plenario2026, type Membro } from "@/lib/equipa";

export const metadata: Metadata = { title: "Equipa — Iniciativa Liberal Trofa" };

function iniciais(nome: string) {
  const p = nome.split(" ").filter((x) => x.length > 2);
  return `${p[0]?.[0] ?? ""}${p[p.length - 1]?.[0] ?? ""}`;
}

function Pessoa({ m, destaque }: { m: Membro; destaque?: boolean }) {
  return (
    <li className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-navy/10">
      {m.foto ? (
        <Image
          src={m.foto}
          alt={m.nome}
          width={228}
          height={228}
          className={`rounded-full ${destaque ? "h-40 w-40" : "h-32 w-32"}`}
        />
      ) : (
        <div
          aria-hidden
          className={`font-display flex items-center justify-center rounded-full bg-gradient-to-br from-cyan to-navy font-bold text-white ${
            destaque ? "h-40 w-40 text-5xl" : "h-32 w-32 text-4xl"
          }`}
        >
          {iniciais(m.nome)}
        </div>
      )}
      <p className="font-display mt-4 text-lg font-bold leading-tight text-navy">{m.nome}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-pink">{m.cargo}</p>
    </li>
  );
}

const mandatos = [
  {
    periodo: "2024 – 2026",
    foto: { src: "/images/geral/grupo-bandeira.png", alt: "Plenário de 2024 da IL Trofa, com a bandeira do concelho", w: 732, h: 578 },
    coordenador: "Ivo Silva",
    mesa: "Afonso Couto",
    texto:
      "Eleito no Plenário Territorial realizado a 7 de setembro de 2024, no auditório da Junta de Freguesia de Bougado (Polo de Santiago).",
  },
  {
    periodo: "2022 – 2024",
    foto: { src: "/images/geral/plenario-fundador-2022.jpg", alt: "Plenário fundador do núcleo da IL Trofa, em 2022", w: 1440, h: 968 },
    coordenador: "José Pedro Reis",
    mesa: "Ivo Silva",
    texto:
      "O Plenário fundador ocorreu a 25 de junho de 2022, no auditório da Junta de Freguesia do Coronado (Polo de São Romão), com a presença do antigo presidente da IL, Rui Rocha. Foi eleito o primeiro grupo de coordenação do núcleo.",
  },
];

export default function Equipa() {
  const { realizado, local } = plenario2026;
  return (
    <>
      <PageHero
        eyebrow="Trofa Liberal"
        title="A equipa que faz a diferença"
        image={{ src: "/images/geral/provisoria-equipa.jpeg", alt: "Liberais trofenses com t-shirts azuis num evento", w: 484, h: 605 }}
      >
        Uma equipa dedicada, comprometida em promover os valores liberais no concelho e em
        encontrar soluções que coloquem a liberdade individual e o progresso no centro das suas
        ações.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
          Mandato 2026 – 2028
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
          Grupo de Coordenação Local
        </h2>
        <p className="mt-3 max-w-2xl text-ink/75">
          O Grupo de Coordenação Local do Núcleo Territorial da Trofa dinamiza a atividade política
          do núcleo, organiza iniciativas e promove a participação dos membros.
        </p>
        {!realizado && (
          <p className="mt-4 inline-block rounded-full bg-sun px-4 py-1 text-sm font-bold text-navy">
            Lista a submeter ao plenário eletivo, no {local}
          </p>
        )}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gcl.map((m, i) => (
            <Pessoa key={m.nome} m={m} destaque={i < 2} />
          ))}
        </ul>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Mesa do Plenário</h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            A Mesa do Plenário impulsiona o diálogo e promove a participação ativa, reforçando os
            valores liberais de transparência e responsabilidade.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mesa.map((m) => (
              <Pessoa key={m.nome} m={m} />
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Órgãos sociais</p>
        <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Mandatos anteriores</h2>
        <ol className="mt-10 space-y-4">
          {mandatos.map((m) => (
            <li key={m.periodo}>
              <details className="group overflow-hidden rounded-2xl bg-navy text-white">
                <summary className="flex cursor-pointer list-none items-center gap-5 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-3xl font-bold text-sun">{m.periodo}</span>
                  <span className="flex-1 text-sm">
                    <span className="block">
                      <span className="text-white/70">Coordenação:</span> {m.coordenador}
                    </span>
                    <span className="block">
                      <span className="text-white/70">Mesa do Plenário:</span> {m.mesa}
                    </span>
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0 fill-none stroke-sun stroke-[3] transition-transform group-open:rotate-180"
                  >
                    <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sr-only">Mostrar ou esconder detalhes</span>
                </summary>
                <div className="grid gap-6 border-t border-white/10 p-6 md:grid-cols-[1fr_1fr]">
                  <p className="text-white/85">{m.texto}</p>
                  <Image
                    src={m.foto.src}
                    alt={m.foto.alt}
                    width={m.foto.w}
                    height={m.foto.h}
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="w-full rounded-xl object-cover"
                  />
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
