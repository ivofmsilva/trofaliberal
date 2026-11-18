import Link from "next/link";
import { anosDe, vinteCincoNovembro } from "@/lib/datasAnuais";

// Banner do 25 de Novembro: só entra no carrossel na semana de 25 de novembro (app/page.tsx).
// Sem fotos (não há fotos de 1975 com licença livre): tipografia e as cores da bandeira.
export default function Banner25Novembro() {
  const anos = anosDe(vinteCincoNovembro);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href={vinteCincoNovembro.slug}
        aria-label={`25 de Novembro de 1975: ${anos} anos. Ler mais`}
        className="group grid overflow-hidden rounded-3xl bg-navy text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-7 sm:px-8 md:gap-5 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.2em] text-sun">
              1975 · {anos} anos
            </span>
          </span>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            25 de Novembro
          </p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">
            Abril deu-nos a liberdade. <span className="text-sun">Novembro garantiu que ela ficava.</span>
          </p>
          <span className="mt-auto rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
            Ler mais →
          </span>
        </div>

        <div aria-hidden className="relative order-first grid h-44 grid-cols-[2fr_3fr] sm:h-56 md:order-none md:h-auto md:min-h-80">
          <div className="bg-[#046a38]" />
          <div className="bg-[#da291c]" />
          <p className="font-display absolute inset-0 grid place-items-center text-[7rem] font-black leading-none text-white/95 drop-shadow-lg sm:text-[9rem] md:text-[12rem]">
            25
          </p>
        </div>
      </Link>
    </section>
  );
}
