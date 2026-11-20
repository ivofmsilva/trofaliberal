import Image from "next/image";

// `vertical`: imagem já recortada na vertical (por exemplo, um cartaz): mostra-se inteira, em altura fixa.
// `foco`: que parte da imagem fica à vista quando é cortada (CSS object-position, por exemplo "50% 0%" para o topo).
export type HeroImage = { src: string; alt: string; w: number; h: number; vertical?: boolean; foco?: string };

// Faixa azul no topo de cada página: compacta, para o conteúdo aparecer logo.
// No telemóvel a imagem aparece por baixo do texto, baixa (faixa 2:1, ou o cartaz vertical a 12 rem de altura), para a faixa
// não ficar comprida; em ecrãs largos fica ao lado do texto.
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
          image ? `md:grid md:items-center ${image.vertical ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[1fr_300px]"}` : ""
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
            style={image.foco ? { objectPosition: image.foco } : undefined}
            sizes={image.vertical ? "(min-width: 768px) 200px, 160px" : "(min-width: 768px) 300px, 100vw"}
            className={`mt-5 rounded-2xl shadow-xl shadow-black/30 ring-4 ring-white/30 md:mt-0 ${
              image.vertical
                ? "h-48 w-auto object-contain md:h-72 md:justify-self-end"
                : "aspect-[2/1] w-full object-cover object-[50%_30%] md:aspect-[16/9]"
            }`}
          />
        )}
      </div>
    </section>
  );
}
