import Link from "next/link";
import { pontos } from "@/lib/habitacao";

// Cartaz da habitação na página inicial, ao estilo dos cartazes do metro e da educação.
// Todo o cartaz é uma ligação para /ideias/habitacao.
export default function BannerHabitacao() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link
        href="/ideias/habitacao"
        aria-label="Construir para o futuro: 15 passos para construir uma casa em Portugal. Ver as medidas para a habitação"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-4 px-8 py-10 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-[7rem] font-black leading-[0.85] tracking-tight text-sun sm:text-[9rem] md:text-[10rem]">
            15
          </p>
          <p className="font-display text-2xl font-black leading-tight sm:text-3xl">
            passos para construir uma casa em Portugal.
            <span className="block text-sun">
              Começar já hoje a resolver o problema da habitação na Trofa e em Portugal.
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 bg-[#0a4fa0] px-8 py-10 md:px-10 md:py-12">
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg font-extrabold tracking-wide">Construir para o futuro:</p>
            {[`${pontos.length} pontos para a Trofa`, "Licenciar em 40 dias úteis"].map((t) => (
              <span key={t} className="bg-pink px-3.5 py-1.5 text-lg font-black uppercase text-sun sm:text-xl">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-xl font-black uppercase leading-tight">
              Liberal faz construir Portugal!
            </p>
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ver as medidas →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
