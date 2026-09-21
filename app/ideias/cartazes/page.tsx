import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Cartazes — Iniciativa Liberal Trofa" };

// Para acrescentar um cartaz, coloca a imagem em public/images/cartazes/ e
// junta o número/nome do ficheiro à lista do grupo respetivo.
const n = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const grupos: { titulo: string; cartazes: number[] }[] = [
  { titulo: "Habitação e Educação", cartazes: n(41, 45) },
  { titulo: "Modernização da Câmara", cartazes: n(46, 50) },
  { titulo: "Economia, Emprego e Mobilidade", cartazes: n(51, 58) },
  { titulo: "Fiscalidade, Cultura e Ação/Coesão Social", cartazes: n(59, 63) },
  { titulo: "Ambiente e Planeamento, Saúde e Desporto", cartazes: n(64, 67) },
];

const ficheiros: Record<number, string> = {
  41: "jpeg", 42: "jpeg", 43: "jpeg", 44: "jpg", 45: "png", 46: "jpeg", 47: "jpeg", 48: "png",
  49: "jpeg", 50: "jpeg", 51: "jpeg", 52: "jpeg", 53: "jpeg", 54: "png", 55: "png", 56: "jpeg",
  57: "jpeg", 58: "jpeg", 59: "jpeg", 60: "jpeg", 61: "jpeg", 62: "jpeg", 63: "jpeg", 64: "jpeg",
  65: "jpeg", 66: "jpeg", 67: "png",
};

const src = (i: number) => `/images/cartazes/cartaz-${i}.${ficheiros[i]}`;

export default function Cartazes() {
  return (
    <>
      <PageHero eyebrow="Ideias · Cartazes" title="Cartazes e mensagens">
        Aqui podes consultar todos os cartazes e mensagens que já espalhámos pela Trofa.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        {grupos.map((g, i) => (
          <section key={g.titulo}>
            <h2 className="font-display flex items-baseline gap-4 text-3xl font-bold text-navy">
              <span className="text-pink">{String(i + 1).padStart(2, "0")}</span>
              {g.titulo}
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {g.cartazes.map((c) => (
                <li key={c}>
                  <a
                    href={src(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-2xl bg-mist ring-2 ring-transparent transition hover:ring-pink"
                  >
                    <Image
                      src={src(c)}
                      alt={`Cartaz de campanha: ${g.titulo}`}
                      width={600}
                      height={800}
                      sizes="(min-width: 1024px) 300px, 50vw"
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
