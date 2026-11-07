import Image from "next/image";
import { formatarData, ordenados } from "@/lib/imprensa";

// Notícia do novo coordenador, no mesmo estilo dos outros banners da página inicial.
// O cartaz inteiro é uma ligação para a notícia (que está num jornal, por isso abre noutro separador).
export default function BannerCoordenador() {
  const noticia = ordenados("noticias").find((n) => n.titulo.startsWith("Bruno Magalhães eleito"));
  if (!noticia) return null;
  const data = formatarData(noticia.data);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <a
        href={noticia.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bruno Magalhães eleito coordenador da Iniciativa Liberal da Trofa. Ler a notícia"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.05fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-6 sm:px-8 md:gap-5 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-2xl font-black uppercase italic tracking-wide text-white/90 sm:text-3xl">
            Novo coordenador
          </p>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight text-sun sm:text-6xl lg:text-7xl">
            Bruno
            <span className="block">Magalhães</span>
          </p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">
            Eleito coordenador da Iniciativa Liberal da Trofa.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 md:pt-4">
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ler a notícia ↗
            </span>
          </div>
        </div>

        <div className="relative order-first flex flex-col items-center justify-center gap-3 bg-[#0a4fa0] px-6 py-5 md:order-none md:gap-4 md:py-12">
          <Image
            src="/images/equipa/bruno-magalhaes.png"
            alt="Bruno Magalhães, coordenador da Iniciativa Liberal da Trofa"
            width={228}
            height={228}
            sizes="228px"
            className="h-28 w-28 rounded-full ring-4 ring-white/40 sm:h-36 sm:w-36 md:h-56 md:w-56"
          />
          <span className="bg-pink px-3 py-1 text-center text-sm font-black uppercase text-sun sm:py-1.5 sm:text-lg">
            {[noticia.fonte, data].filter(Boolean).join(" · ")}
          </span>
        </div>
      </a>
    </section>
  );
}
