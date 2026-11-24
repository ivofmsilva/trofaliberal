import Link from "next/link";
import { Calculadora } from "@/components/HeroImpostos";

// Cartaz dos impostos na página inicial, no mesmo estilo dos outros (dados, habitação), com a calculadora da página
// /ideias/impostos. Todo o cartaz é uma ligação para essa página. Texto neutro: convida a fazer as contas
// (o Ivo não quer "a Câmara cobra cada vez mais").
export default function BannerImpostos() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href="/ideias/impostos"
        aria-label="Impostos na Trofa: quanto pagas à Câmara? Faz as contas ao teu IMI e ao teu IRS municipal"
        className="group grid overflow-hidden rounded-3xl bg-navy text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.05fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-6 sm:px-8 md:gap-5 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-[#b0005f] px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
            Quanto pagas
            <span className="block text-sun">à Câmara?</span>
          </p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">
            Faz as contas ao teu IMI e ao teu IRS municipal.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 md:pt-4">
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Fazer as contas →
            </span>
            <p className="font-display hidden text-lg font-black uppercase leading-tight sm:block">Impostos na Trofa</p>
          </div>
        </div>

        <div className="order-first flex flex-col justify-between gap-5 bg-[#0a4fa0] px-6 py-5 sm:px-8 md:order-none md:gap-8 md:px-10 md:py-12">
          <div className="flex justify-center [&_svg]:max-w-[8.5rem] sm:[&_svg]:max-w-[11rem] md:[&_svg]:max-w-[15rem]">
            <Calculadora />
          </div>
          <div className="hidden flex-row flex-wrap items-center gap-2 sm:flex">
            {["IMI", "IRS municipal", "Taxómetro"].map((t) => (
              <span key={t} className="bg-[#b0005f] px-3 py-1 text-base font-black uppercase text-sun sm:px-3.5 sm:py-1.5 sm:text-lg">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}
