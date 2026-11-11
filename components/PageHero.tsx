import Image from "next/image";

export type HeroImage = { src: string; alt: string; w: number; h: number };

// Faixa azul no topo de cada página: compacta, para o conteúdo aparecer logo.
// A imagem só se mostra em ecrãs largos (no telemóvel ocuparia demasiado espaço).
export default function PageHero({
  eyebrow,
  title,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  image?: HeroImage;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-pink/25 blur-3xl" />
      <div
        className={`relative mx-auto max-w-7xl gap-8 px-4 py-8 sm:px-6 md:py-10 ${
          image ? "md:grid md:grid-cols-[1fr_300px] md:items-center" : ""
        }`}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/90 sm:text-sm">{eyebrow}</p>
          <h1 className="font-display mt-2 max-w-4xl text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {children && <div className="mt-3 max-w-2xl text-base text-white/90 md:text-lg">{children}</div>}
        </div>
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.w}
            height={image.h}
            priority
            sizes="300px"
            className="hidden aspect-[16/9] w-full rounded-2xl object-cover object-[50%_30%] shadow-xl shadow-black/30 ring-4 ring-white/30 md:block"
          />
        )}
      </div>
    </section>
  );
}
