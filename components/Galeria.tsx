"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Galeria({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [aberta, setAberta] = useState<number | null>(null);

  const fechar = useCallback(() => setAberta(null), []);
  const mover = useCallback(
    (d: number) => setAberta((i) => (i === null ? i : (i + d + fotos.length) % fotos.length)),
    [fotos.length],
  );

  useEffect(() => {
    if (aberta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberta, fechar, mover]);

  if (!fotos.length) {
    return <p className="mt-6 rounded-2xl bg-white p-6 font-bold text-ink/60">Fotos em breve.</p>;
  }

  return (
    <>
      <ul className="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4">
        {fotos.map((s, i) => (
          <li key={s} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setAberta(i)}
              className="block w-full overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-pink"
              aria-label={`Ampliar foto ${i + 1} de ${fotos.length}`}
            >
              <Image src={s} alt={`${alt} (${i + 1})`} width={600} height={600} sizes="(min-width: 1024px) 25vw, 50vw" className="h-auto w-full" />
            </button>
          </li>
        ))}
      </ul>

      {aberta !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={fechar}
        >
          <button type="button" onClick={fechar} className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-2xl font-bold text-white hover:bg-white/20" aria-label="Fechar">
            ×
          </button>
          {fotos.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); mover(-1); }} className="absolute left-2 rounded-full bg-white/10 px-4 py-3 text-3xl font-bold text-white hover:bg-white/20 md:left-6" aria-label="Foto anterior">
                ‹
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); mover(1); }} className="absolute right-2 rounded-full bg-white/10 px-4 py-3 text-3xl font-bold text-white hover:bg-white/20 md:right-6" aria-label="Foto seguinte">
                ›
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotos[aberta]} alt={`${alt} (${aberta + 1})`} className="max-h-[90vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
