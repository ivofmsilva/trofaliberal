import type { Metadata } from "next";
import Image from "next/image";
import EntradaBloco from "@/components/EntradaBloco";
import Marcos, { type Marco } from "@/components/Marcos";
import PageHero from "@/components/PageHero";
import { gcl, mesa, plenario2026, type Membro } from "@/lib/equipa";

export const metadata: Metadata = { title: "Quem somos — Iniciativa Liberal Trofa" };

const entradas = [
  { titulo: "Sobre nós", texto: "Quem é a Iniciativa Liberal da Trofa e o que defendemos para o concelho.", href: "#sobre" },
  { titulo: "Equipa", texto: "O grupo de coordenação, a mesa do plenário e os mandatos anteriores.", href: "#equipa" },
  { titulo: "Juventude", texto: "Os jovens liberais da Trofa e o Conselho Municipal da Juventude.", href: "#juventude" },
  { titulo: "História", texto: "Os marcos do núcleo, desde o primeiro encontro liberal em 2021.", href: "#historia" },
];

function iniciais(nome: string) {
  const p = nome.split(" ").filter((x) => x.length > 2);
  return `${p[0]?.[0] ?? ""}${p[p.length - 1]?.[0] ?? ""}`;
}

function Pessoa({ m }: { m: Membro }) {
  return (
    <li className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-navy/10">
      {m.foto ? (
        <Image src={m.foto} alt={m.nome} width={228} height={228} className="h-36 w-36 rounded-full" />
      ) : (
        <div
          aria-hidden
          className="font-display flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-navy text-4xl font-bold text-white"
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

// Os quadrados com `foto` abrem-na ao clicar. Ficheiros em public/images/.
const marcos: Marco[] = [
  {
    ano: "2021",
    titulo: "Primeiro encontro liberal na Trofa",
    texto: "Primeiro contacto entre simpatizantes e membros da IL no concelho.",
    foto: {
      src: "/images/geral/primeiro-encontro-liberais.jpg",
      alt: "Primeiro encontro de liberais na Trofa",
    },
  },
  {
    ano: "2022",
    titulo: "Deputados liberais eleitos pelo círculo do Porto",
    texto: "Primeira campanha liberal a passar na Trofa.",
    foto: {
      src: "/images/geral/sobre-acao-tenda.jpg",
      alt: "Ação de rua da Iniciativa Liberal na Trofa, com tenda e bandeiras",
    },
  },
  {
    ano: "2022",
    titulo: "Plenário fundador do núcleo",
    texto: "Primeiro grupo de coordenação eleito em São Romão do Coronado.",
    foto: {
      src: "/images/geral/plenario-2022-mesa.jpg",
      alt: "Mesa do plenário fundador do núcleo da IL Trofa, em 2022",
    },
  },
  {
    ano: "2024",
    titulo: "Primeiros liberais trofenses nas listas à Assembleia da República",
    texto: "José Pedro Reis e Diamantino Costa integram as listas à Assembleia da República.",
    foto: {
      src: "/images/geral/marco-listas-ar-2024.jpg",
      alt: "Notícia: Trofenses na lista da Iniciativa Liberal ao Parlamento",
    },
  },
  {
    ano: "2024",
    titulo: "Plenário eletivo",
    texto: "Novo Grupo de Coordenação da IL Trofa eleito em Santiago de Bougado.",
    foto: {
      src: "/images/geral/plenario-2024-bougado.jpg",
      alt: "Plenário eletivo de 2024 no auditório da Junta de Freguesia de Bougado",
    },
  },
  {
    ano: "2025",
    titulo: "Primeiras Autárquicas",
    texto:
      "Listas à Câmara e à Assembleia Municipal da Trofa e às juntas de freguesia de Bougado e Alvarelhos. A IL trouxe uma nova forma de fazer política às eleições.",
    foto: {
      src: "/images/geral/sobre-acao-camisolas.jpg",
      alt: "Liberais trofenses de t-shirt azul numa ação da campanha autárquica",
    },
  },
  {
    ano: "2025",
    titulo: "Representação no Conselho Municipal de Juventude",
    texto: "Duarte Pinheiro é o primeiro representante liberal no concelho.",
    foto: {
      src: "/images/geral/juventude-cmj.jpg",
      alt: "Representantes da Iniciativa Liberal no Conselho Municipal da Juventude",
    },
  },
  {
    ano: "2026",
    titulo: "Plenário eletivo",
    texto: plenario2026.realizado
      ? `Novo Grupo de Coordenação da IL Trofa eleito no ${plenario2026.local}, a ${plenario2026.data}.`
      : `Plenário eletivo da IL Trofa, no ${plenario2026.local}, para eleger o novo Grupo de Coordenação.`,
  },
];

export default function Sobre() {
  const { realizado, local, data } = plenario2026;
  return (
    <>
      <PageHero
        eyebrow="Sobre a IL Trofa"
        title="Um caminho liberal para a Trofa"
        image={{ src: "/images/geral/grupo-mar-corte.jpeg", alt: "Membros da IL Trofa junto ao mar", w: 575, h: 304 }}
      >
        A IL Trofa existe para defender um concelho onde cada trofense possa viver com mais
        liberdade e oportunidades.
      </PageHero>

      <EntradaBloco itens={entradas} />

      <section id="sobre" className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Somos um grupo de cidadãos com iniciativa!
          </h2>
        </div>
        <div className="space-y-5 text-lg text-ink/85">
          <p>
            Acreditamos que a Trofa tem potencial para ser um dos concelhos mais prósperos e
            inovadores de Portugal. Para isso precisamos de inovar na câmara, tirar burocracia, ter
            menos impostos e mais confiança nas pessoas e nas empresas que aqui vivem e trabalham.
          </p>
          <p>
            Não somos um partido como os outros. Não prometemos tudo a todos. Apenas prometemos
            defender a liberdade em todas as suas vertentes, porque acreditamos que são as
            pessoas, não os políticos, que devem decidir o seu futuro.
          </p>
          <figure className="rounded-2xl border-l-4 border-pink bg-mist p-6">
            <blockquote className="font-display text-xl font-bold leading-snug text-navy">
              “O liberalismo é a doutrina que mantém que o indivíduo tem o direito de pensar o que
              quiser, de exprimir o que pensa como quiser, e de pôr em prática o que pensa como
              quiser, desde que essa expressão ou essa prática não infrinja diretamente a igual
              liberdade de qualquer outro indivíduo.”
            </blockquote>
            <figcaption className="mt-3 text-sm font-bold uppercase tracking-widest text-pink">
              Fernando Pessoa
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2">
        <Image
          src="/images/geral/comunidade-destrave.jpeg"
          alt="Liberais trofenses reunidos na caminhada Destrave Liberal"
          width={961}
          height={630}
          sizes="(min-width: 768px) 560px, 100vw"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
        <Image
          src="/images/geral/crianca-bandeira.jpeg"
          alt="Criança com a bandeira da Trofa"
          width={410}
          height={410}
          sizes="(min-width: 768px) 560px, 100vw"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </section>

      <section id="equipa" className="scroll-mt-24 bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Mandato 2026 – 2028</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Grupo de Coordenação Local</h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            O Grupo de Coordenação Local do Núcleo Territorial da Trofa dinamiza a atividade política
            do núcleo, organiza iniciativas e promove a participação dos membros.
          </p>
          <p className="mt-4 inline-block rounded-full bg-sun px-4 py-1 text-sm font-bold text-navy">
            {realizado
              ? `Eleito no plenário eletivo de ${data}, na freguesia do ${local}`
              : `Lista a submeter ao plenário eletivo, no ${local}`}
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gcl.map((m) => (
              <Pessoa key={m.nome} m={m} />
            ))}
          </ul>

          <h3 className="font-display mt-16 text-2xl font-bold text-navy md:text-3xl">Mesa do Plenário</h3>
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mesa.map((m) => (
              <Pessoa key={m.nome} m={m} />
            ))}
          </ul>

          <h3 className="font-display mt-16 text-2xl font-bold text-navy md:text-3xl">Mandatos anteriores</h3>
          <ol className="mt-6 space-y-4">
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
        </div>
      </section>

      <section id="juventude" className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Conselho Municipal da Juventude</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">A tua voz na juventude trofense</h2>
          <div className="mt-5 space-y-4 text-lg text-ink/85">
            <p>
              O Conselho Municipal da Juventude (CMJ) da Trofa iniciou um novo mandato a 7 de fevereiro
              de 2026, contando pela primeira vez com representação da Iniciativa Liberal, através de
              Duarte Pinheiro e Afonso Couto. Alinhado com a proposta do programa autárquico liberal, o
              executivo expandiu o Conselho, reforçando a voz dos jovens trofenses.
            </p>
            <p>
              Duarte Pinheiro foi ainda escolhido como um dos dois representantes do CMJ da Trofa no
              Grupo Estratégico Metropolitano da Juventude (GEMJ) da Área Metropolitana do Porto.
            </p>
            <p className="font-display text-xl font-bold text-navy">
              A Iniciativa Liberal será uma voz ativa, construtiva e sem medo de propor o que é melhor
              para os jovens trofenses.
            </p>
          </div>
        </div>
        <Image
          src="/images/geral/juventude-cmj.jpg"
          alt="Duarte Pinheiro e Afonso Couto no Conselho Municipal da Juventude"
          width={1438}
          height={920}
          sizes="(min-width: 768px) 560px, 100vw"
          className="w-full rounded-2xl object-cover shadow-lg"
        />
      </section>

      <section id="historia" className="scroll-mt-24 bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">A nossa história</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">Marcos do núcleo</h2>
          <Marcos marcos={marcos} />
        </div>
      </section>
    </>
  );
}
