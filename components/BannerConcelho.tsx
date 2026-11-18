import Image from "next/image";
import Link from "next/link";
import { anosDoConcelho } from "@/lib/datasAnuais";

// Banner do Dia do Concelho: só entra no carrossel na semana de 19 de novembro (app/page.tsx).
export default function BannerConcelho() {
  const anos = anosDoConcelho();
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href="/dia-do-concelho"
        aria-label={`Dia do Concelho: ${anos} anos de Concelho da Trofa. Ler mais`}
        className="group grid overflow-hidden rounded-3xl bg-[#0e7a3e] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[0.85fr_1.35fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-6 sm:px-8 md:gap-5 md:px-10 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.2em] text-sun">
              19 de novembro
            </span>
          </span>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            {anos} anos
            <span className="block text-sun">de Concelho</span>
          </p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">
            Em 1998 fomos a Lisboa e trouxemos o concelho para casa.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 md:pt-4">
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ler mais →
            </span>
            <p className="font-display hidden text-lg font-black uppercase leading-tight sm:block">
              Bom feriado, Trofa!
            </p>
          </div>
        </div>

        <div className="relative order-first h-52 bg-[#cfe0f3] sm:h-64 md:order-none md:h-auto md:min-h-80">
          <Image
            src="/images/concelho/assembleia-1998.webp"
            alt="Trofenses com bandeiras verdes em frente à Assembleia da República, em novembro de 1998"
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover object-[50%_60%]"
          />
        </div>
      </Link>
    </section>
  );
}
