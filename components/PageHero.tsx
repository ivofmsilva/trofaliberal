import Image from "next/image";

export type HeroImage = { src: string; alt: string; w: number; h: number };

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
        className={`relative mx-auto max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 ${
          image ? "grid items-center md:grid-cols-[1fr_380px]" : ""
        }`}
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/90">{eyebrow}</p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {children && <div className="mt-6 max-w-2xl text-lg text-white/90">{children}</div>}
        </div>
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.w}
            height={image.h}
            priority
            sizes="(min-width: 768px) 380px, 100vw"
            className="mx-auto mt-10 max-h-[460px] w-auto max-w-full rounded-2xl object-cover shadow-2xl shadow-black/30 ring-4 ring-white/30 md:mt-0"
          />
        )}
      </div>
    </section>
  );
}
