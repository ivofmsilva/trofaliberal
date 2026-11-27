import Image from "next/image";
import Link from "next/link";
import { preencher, valoresDe, type Comemoracao, type Img } from "@/lib/comemoracoes";
import { dataProxima } from "@/lib/datasAnuais";
import type { Festa } from "@/lib/festas";
import type { Aviso } from "@/lib/avisos";
import type { MomentoComBanner } from "@/lib/historiaIL";

// Banners das datas que celebramos e das festas das freguesias: só entram no carrossel da página inicial à volta
// do dia (app/page.tsx e lib/datasAnuais.ts). Mesmo desenho do banner do 25 de Novembro.

function Banner({ href, etiqueta, titulo, frase, imagem, botao }: { href: string; etiqueta: string; titulo: string; frase: string; imagem: Img; botao: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href={href}
        aria-label={`${titulo}. ${frase} ${botao}`}
        className="group grid overflow-hidden rounded-3xl bg-navy text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[0.85fr_1.35fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-7 sm:px-8 md:gap-5 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.2em] text-sun">{etiqueta}</span>
          </span>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">{titulo}</p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">{frase}</p>
          <span className="mt-auto rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">{botao} →</span>
        </div>
        <div className="relative order-first aspect-[5/3] bg-[#cfe0f3] md:order-none md:aspect-auto md:min-h-80">
          <Image src={imagem.src} alt={imagem.alt} fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover" />
        </div>
      </Link>
    </section>
  );
}

// `agora` só serve para a página de revisão (mostra cada banner como vai aparecer no seu dia).
export function BannerComemoracao({ c, agora }: { c: Comemoracao; agora?: Date }) {
  const v = valoresDe(c, agora);
  return (
    <Banner
      href={c.data.slug}
      etiqueta={preencher(c.banner.etiqueta, v)}
      titulo={preencher(c.banner.titulo, v)}
      frase={preencher(c.banner.frase, v)}
      imagem={c.imagem}
      botao="Ler mais"
    />
  );
}

// A convenção que vem aí (lib/historiaIL.ts): banner nos dias dela.
export function BannerMomento({ m }: { m: MomentoComBanner }) {
  return <Banner href={m.data.slug} etiqueta={m.banner.etiqueta} titulo={m.banner.titulo} frase={m.banner.frase} imagem={m.banner.imagem} botao="Ler mais" />;
}

// "Bougado (Santiago)" → "Santiago de Bougado"; "Coronado (S. Mamede)" → "S. Mamede do Coronado".
export function lugarDe(freguesia: string) {
  const m = /^(.+) \((.+)\)$/.exec(freguesia);
  return m ? `${m[2]} ${m[1] === "Coronado" ? "do" : "de"} ${m[1]}` : freguesia;
}

export function BannerFesta({ f, imagem, agora }: { f: Festa; imagem: Img; agora?: Date }) {
  const lugar = lugarDe(f.freguesia);
  return (
    <Banner
      href={f.data.slug}
      etiqueta={dataProxima(f.data, agora)}
      titulo={f.nome}
      frase={f.frase ?? `Boas festas, ${lugar}! Tradição, convívio e o encontro de quem vive cá e de quem volta.`}
      imagem={f.imagem ?? imagem}
      botao="Todas as festas"
    />
  );
}

// Avisos de um dia só (lib/avisos.ts), com link para fora.
export function BannerAviso({ a }: { a: Aviso }) {
  return <Banner href={a.href} etiqueta={a.etiqueta} titulo={a.titulo} frase={a.frase} imagem={a.imagem} botao={a.botao} />;
}
