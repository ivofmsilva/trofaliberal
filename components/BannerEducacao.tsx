import Image from "next/image";
import Link from "next/link";
import { eixos, propostas } from "@/lib/educacao";

// Cartaz do manifesto da educação na página inicial, no mesmo estilo do da habitação:
// título, frase, fotografia das Jornadas Liberais e as propostas em etiquetas.
// Todo o cartaz é uma ligação para /ideias/educacao.
export default function BannerEducacao() {
  const locais = propostas.filter((p) => eixos.find((e) => e.n === p.eixo)?.ambito === "local").length;
  const nacionais = propostas.length - locais;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link
        href="/ideias/educacao"
        aria-label="Trofa no topo da Educação: liberdade para aprender, autonomia para crescer. Ver o manifesto"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.05fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-5 px-8 py-10 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            No topo
            <span className="block text-sun">da Educação</span>
          </p>
          <p className="max-w-md text-xl font-bold leading-snug sm:text-2xl">
            Liberdade para aprender, autonomia para crescer.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ver o manifesto →
            </span>
            <p className="font-display text-lg font-black uppercase leading-tight">Jornadas Liberais da Trofa</p>
          </div>
        </div>

        <div className="relative min-h-72 bg-[#0a4fa0]">
          <Image
            src="/images/eventos/lit/lit-09.jpg"
            alt="Jornadas Liberais da Trofa dedicadas à Educação: um orador diante de um ecrã com o tema A Vida de Professor"
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-[#0a4fa0] via-[#0a4fa0]/80 to-transparent px-6 pb-6 pt-16">
            {[`${locais} propostas para a Trofa`, `${nacionais} para exigir ao Governo`].map((t) => (
              <span key={t} className="bg-pink px-3 py-1.5 text-base font-black uppercase text-sun sm:text-lg">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}
