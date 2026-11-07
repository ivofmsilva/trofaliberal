import Image from "next/image";
import Link from "next/link";
import { pontos } from "@/lib/habitacao";

// Cartaz da habitação na página inicial, ao estilo dos cartazes do metro e da educação,
// mas com a fotografia do outdoor em vez de um número. Todo o cartaz é uma ligação para
// /ideias/habitacao.
export default function BannerHabitacao() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href="/ideias/habitacao"
        aria-label="Construir para o Futuro: começar já hoje a resolver o problema da habitação na Trofa e em Portugal. Ver as medidas"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.05fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-6 sm:px-8 md:gap-5 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
            Construir
            <span className="block text-sun">para o Futuro</span>
          </p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">
            Começar já hoje a resolver o problema da habitação na Trofa e em Portugal.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 md:pt-4">
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ver as medidas →
            </span>
            <p className="font-display hidden text-lg font-black uppercase leading-tight sm:block">
              Liberal faz construir Portugal!
            </p>
          </div>
        </div>

        <div className="relative order-first h-44 bg-[#0a4fa0] sm:h-64 md:order-none md:h-auto md:min-h-72">
          <Image
            src="/images/geral/habitacao-outdoor.jpg"
            alt="Outdoor da Iniciativa Liberal: mais casas, menos custos, mais construção, menos burocracia"
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-[#0a4fa0] via-[#0a4fa0]/80 to-transparent px-6 pb-6 pt-16">
            {[`${pontos.length} pontos para a Trofa`, "Licenciar em 40 dias úteis"].map((t) => (
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
