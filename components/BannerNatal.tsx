import Image from "next/image";
import Link from "next/link";

// Cartaz dos packs de Natal na página inicial, no mesmo estilo dos outros banners.
// Todo o cartaz é uma ligação para a secção dos packs na loja.
export default function BannerNatal() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href="/loja#natal"
        aria-label="Packs de Natal: camisola, cachecol e gorro de malha, em três versões. Ver na loja"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[0.85fr_1.35fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-6 sm:px-8 md:gap-5 md:px-10 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Packs
            <span className="block text-sun">de Natal</span>
          </p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">
            Camisola, cachecol e gorro de malha.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 md:pt-4">
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ver na loja →
            </span>
            <p className="font-display hidden text-lg font-black uppercase leading-tight sm:block">
              Veste o Natal com estilo
            </p>
          </div>
        </div>

        <div className="relative order-first h-52 bg-[#cfe0f3] sm:h-64 md:order-none md:h-auto md:min-h-80">
          <Image
            src="/images/loja/banner-natal.webp"
            alt="Três camisolas de Natal de malha da IL Trofa: azul-marinho com a frase O Natal é liberal, creme com renas e a palavra Liberal, e azul com a frase Feliz Natal em liberdade"
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover object-[50%_55%]"
          />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {["3 versões"].map((t) => (
              <span key={t} className="bg-pink px-3 py-1 text-base font-black uppercase text-sun sm:px-3.5 sm:py-1.5 sm:text-lg">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}
