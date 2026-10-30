import Link from "next/link";

// Cartaz da campanha do metro na página inicial (estilo do cartaz "9000 dias" / metrobus).
// Todo o cartaz é uma ligação para /ideias/metro.
export default function BannerMetro() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
      <Link
        href="/ideias/metro"
        aria-label="Metro para a Trofa: 9000 dias à espera. Ver a página do Metro"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-4 px-8 py-10 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-[7rem] font-black leading-[0.85] tracking-tight text-sun sm:text-[9rem] md:text-[10rem]">
            9000
          </p>
          <p className="font-display text-2xl font-black leading-tight sm:text-3xl">
            dias à espera do metro.
            <span className="block text-sun">Não esperámos por um transbordo.</span>
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 bg-[#0a4fa0] px-8 py-10 md:px-10 md:py-12">
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg font-extrabold tracking-wide">Metrobus da Trofa:</p>
            {["70% autocarro", "30% metro", "0% solução"].map((t) => (
              <span key={t} className="bg-pink px-3.5 py-1.5 text-lg font-black uppercase text-sun sm:text-xl">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-xl font-black uppercase leading-tight">
              A Trofa precisa de mobilidade a sério
            </p>
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ver a página do Metro →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
