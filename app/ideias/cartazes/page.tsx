import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { cartazesNacionais } from "@/lib/cartazes-nacionais";

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

// Cartazes na horizontal (faixas): ocupam duas colunas, com a mesma altura dos outros.
const largos = new Set([41]);

const src = (i: number) => `/images/cartazes/cartaz-${i}.${ficheiros[i]}`;

export default function Cartazes() {
  return (
    <>
      <PageHero eyebrow="Ideias · Cartazes" title="Cartazes e Mensagens">
        Aqui podes consultar todos os cartazes e mensagens que já espalhámos pela Trofa e, no fim, os cartazes que
        marcaram a Iniciativa Liberal em todo o país.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        {grupos.map((g, i) => (
          <section key={g.titulo}>
            <h2 className="font-display flex items-baseline gap-4 text-3xl font-bold text-navy">
              <span className="text-pink">{String(i + 1).padStart(2, "0")}</span>
              {g.titulo}
            </h2>
            <ul
              className={`mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 ${
                g.cartazes.some((c) => largos.has(c)) ? "lg:grid-cols-6" : g.cartazes.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
              }`}
            >
              {g.cartazes.map((c) => (
                <li key={c} className={largos.has(c) ? "relative col-span-2" : undefined}>
                  <a
                    href={src(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block overflow-hidden rounded-2xl bg-mist ring-2 ring-transparent transition hover:ring-pink ${largos.has(c) ? "md:absolute md:inset-0" : ""}`}
                  >
                    <Image
                      src={src(c)}
                      alt={`Cartaz de campanha: ${g.titulo}`}
                      width={largos.has(c) ? 900 : 600}
                      height={largos.has(c) ? 600 : 800}
                      sizes={largos.has(c) ? "(min-width: 1024px) 480px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
                      className={largos.has(c) ? "aspect-[3/2] w-full object-cover md:aspect-auto md:h-full" : "aspect-[3/4] w-full object-cover"}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section id="nacionais">
          <h2 className="font-display flex items-baseline gap-4 text-3xl font-bold text-navy">
            <span className="text-pink">{String(grupos.length + 1).padStart(2, "0")}</span>
            Cartazes nacionais
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink/75">
            Os outdoors que fizeram a Iniciativa Liberal falar-se em todo o país: humor, ideias claras e uma estética
            que ninguém confunde.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cartazesNacionais.map((c) => (
              <li key={c.id} className="flex flex-col overflow-hidden rounded-2xl border-2 border-mist">
                <a
                  href={`/images/cartazes-nacionais/${c.id}.webp`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-mist"
                  aria-label={`Ver o cartaz «${c.titulo}» em ponto grande`}
                >
                  <Image
                    src={`/images/cartazes-nacionais/${c.id}.webp`}
                    alt={`Cartaz da Iniciativa Liberal: ${c.titulo}`}
                    width={c.w}
                    height={c.h}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] w-full object-contain"
                  />
                </a>
                <div className="flex flex-1 flex-col p-5">
                  {c.quando && <p className="text-xs font-bold uppercase tracking-widest text-cyan-dark">{c.quando}</p>}
                  <h3 className="font-display mt-1 text-2xl font-bold text-navy">{c.titulo}</h3>
                  <p className="mt-2 text-ink/75">{c.texto}</p>
                  {c.fonte && (
                    <a
                      href={c.fonte.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block pt-3 text-sm font-bold text-cyan-dark hover:underline"
                    >
                      Imagem e notícia: {c.fonte.nome} ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
