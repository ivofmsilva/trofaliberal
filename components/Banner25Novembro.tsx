import Image from "next/image";
import Link from "next/link";
import { anosDe, vinteCincoNovembro } from "@/lib/datasAnuais";

// Banner do 25 de Novembro: só entra no carrossel na semana de 25 de novembro (app/page.tsx).
// Foto: cartaz nacional da IL "As conquistas do 25 de Novembro".
export default function Banner25Novembro() {
  const anos = anosDe(vinteCincoNovembro);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href={vinteCincoNovembro.slug}
        aria-label={`25 de Novembro de 1975: ${anos} anos. Ler mais`}
        className="group grid overflow-hidden rounded-3xl bg-navy text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[0.85fr_1.35fr]"
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

        <div className="relative order-first aspect-[5/3] bg-[#cfe0f3] md:order-none md:aspect-auto md:min-h-80">
          <Image
            src="/images/eventos/25-novembro-cravos.webp"
            alt="Cartaz da Iniciativa Liberal: As conquistas do 25 de Novembro. Democracia, liberdade, prosperidade. Novembro cumpriu Abril."
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
    </section>
  );
}
