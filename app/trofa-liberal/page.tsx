import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { plenario2026 } from "@/lib/equipa";

export const metadata: Metadata = { title: "Sobre a IL Trofa — Iniciativa Liberal Trofa" };

type Marco = {
  ano: string;
  titulo: string;
  texto: string;
};

const marcos: Marco[] = [
  {
    ano: "2021",
    titulo: "Primeiro encontro liberal na Trofa",
    texto: "Primeiro contacto entre simpatizantes e membros da IL no concelho.",
  },
  {
    ano: "2022",
    titulo: "Deputados liberais eleitos pelo círculo do Porto",
    texto: "Primeira campanha liberal a passar na Trofa.",
  },
  {
    ano: "2022",
    titulo: "Plenário fundador do núcleo",
    texto: "Primeiro grupo de coordenação eleito em São Romão do Coronado.",
  },
  {
    ano: "2024",
    titulo: "Plenário eletivo",
    texto: "Novo Grupo de Coordenação da IL Trofa eleito em Santiago de Bougado.",
  },
  {
    ano: "2024",
    titulo: "Primeiros liberais trofenses nas listas à Assembleia da República",
    texto: "José Pedro Reis e Diamantino Costa integram as listas à Assembleia da República.",
  },
  {
    ano: "2025",
    titulo: "Representação no Conselho Municipal de Juventude",
    texto: "Duarte Pinheiro é o primeiro representante liberal no concelho.",
  },
  {
    ano: "2025",
    titulo: "Primeiras Autárquicas",
    texto:
      "Listas à Câmara e à Assembleia Municipal da Trofa e às juntas de freguesia de Bougado e Alvarelhos.",
  },
  {
    ano: "2026",
    titulo: "Plenário eletivo",
    texto: plenario2026.realizado
      ? `Novo Grupo de Coordenação da IL Trofa eleito no ${plenario2026.local}.`
      : `Plenário eletivo da IL Trofa, no ${plenario2026.local}, para eleger o novo Grupo de Coordenação.`,
  },
];

export default function Sobre() {
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

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Somos um grupo de cidadãos com iniciativa!
          </h2>
        </div>
        <div className="space-y-5 text-lg text-ink/85">
          <p>
            Acreditamos que a Trofa tem potencial para ser um dos concelhos mais prósperos e
            inovadores de Portugal. Para isso precisamos de menos burocracia na câmara, menos
            impostos, e mais confiança nas pessoas e nas empresas que aqui vivem e trabalham.
          </p>
          <p>
            Não somos um partido como os outros. Não prometemos tudo a todos. Apenas prometemos
            defender a liberdade em todas as suas vertentes, porque acreditamos que são as
            pessoas, não os políticos, que devem decidir o seu futuro.
          </p>
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

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">A nossa história</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">Marcos do núcleo</h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {marcos.map((m) => (
              <li
                key={`${m.ano}-${m.titulo}`}
                className="overflow-hidden rounded-2xl bg-navy-soft"
              >
                <div className="p-6">
                  <span className="font-display text-4xl font-bold text-sun">{m.ano}</span>
                  <h3 className="font-display mt-3 text-lg font-bold leading-snug">{m.titulo}</h3>
                  <p className="mt-2 text-sm text-white/80">{m.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
