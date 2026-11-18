"use client";

import Image from "next/image";
import { useState } from "react";
import type { Rosto } from "@/lib/rostos";

// Um membro de cada vez: o cartaz num quadrado e a frase ao lado, com setas para passar aos outros.
// No telemóvel também se passa com o dedo (deslizar para o lado).
export default function RostosLiberais({ rostos }: { rostos: Rosto[] }) {
  const [i, setI] = useState(0);
  const [toque, setToque] = useState<number | null>(null);
  const total = rostos.length;
  const ir = (d: number) => setI((x) => (x + d + total) % total);
  const r = rostos[i];

  const seta =
    "grid h-12 w-12 place-items-center rounded-full bg-white text-2xl font-bold text-navy shadow-md ring-1 ring-navy/10 transition hover:bg-sun";

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Rostos Liberais Trofenses"
      className="grid items-center gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:gap-12"
    >
      <div
        className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-3xl bg-[#48b3ee] shadow-xl"
        onTouchStart={(e) => setToque(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toque === null) return;
          const dx = e.changedTouches[0].clientX - toque;
          if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
          setToque(null);
        }}
      >
        <Image
          key={r.foto}
          src={r.foto}
          alt={`Cartaz de ${r.nome}, membro da IL Trofa`}
          fill
          sizes="(min-width: 768px) 420px, 90vw"
          className="scale-125 object-cover"
        />
      </div>

      <div aria-live="polite">
        <span aria-hidden className="font-display text-7xl font-black leading-none text-pink">“</span>
        <blockquote className="font-display -mt-4 text-xl font-bold leading-snug text-navy sm:text-2xl">
          {r.frase}”
        </blockquote>
        <p className="mt-4 font-bold text-ink/80">
          {r.nome} <span className="font-normal text-ink/60">· membro da IL Trofa</span>
        </p>
        <div className="mt-6 flex items-center gap-4">
          <button type="button" onClick={() => ir(-1)} aria-label="Membro anterior" className={seta}>
            ‹
          </button>
          <span className="min-w-12 text-center text-sm font-bold text-ink/60">
            {i + 1} / {total}
          </span>
          <button type="button" onClick={() => ir(1)} aria-label="Membro seguinte" className={seta}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
