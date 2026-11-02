import Link from "next/link";
import { eixos, propostas } from "@/lib/educacao";

// Cartaz do manifesto da educação na página inicial, ao estilo do cartaz do metro.
// Todo o cartaz é uma ligação para /ideias/educacao.
export default function BannerEducacao() {
  const locais = propostas.filter((p) => eixos.find((e) => e.n === p.eixo)?.ambito === "local").length;
  const nacionais = propostas.length - locais;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link
        href="/ideias/educacao"
        aria-label="Trofa no topo da Educação: 114.º entre 186 municípios. Ver o manifesto"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-4 px-8 py-10 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-[7rem] font-black leading-[0.85] tracking-tight text-sun sm:text-[9rem] md:text-[10rem]">
            114.º
          </p>
          <p className="font-display text-2xl font-black leading-tight sm:text-3xl">
            em Educação, entre 186 municípios.
            <span className="block text-sun">Queremos a Trofa no topo.</span>
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 bg-[#0a4fa0] px-8 py-10 md:px-10 md:py-12">
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg font-extrabold tracking-wide">Manifesto pela Educação:</p>
            {[`${locais} propostas para a Trofa`, `${nacionais} para exigir ao Governo`].map((t) => (
              <span key={t} className="bg-pink px-3.5 py-1.5 text-lg font-black uppercase text-sun sm:text-xl">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-xl font-black uppercase leading-tight">
              Liberdade para aprender, autonomia para crescer
            </p>
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ver o manifesto →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
