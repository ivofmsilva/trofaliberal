"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Mostra um banner de cada vez (Metro, Educação, Habitação). Passa sozinho de 9 em 9 segundos,
// pára quando o rato ou o foco estão em cima, e não passa sozinho a quem pediu menos movimento.
// No computador as setas ficam nos lados do banner; no telemóvel passa-se com o dedo e há
// as bolinhas por baixo. Cada banner é uma ligação e continua a ser uma página própria.
export default function CarrosselBanners({ titulos, children }: { titulos: string[]; children: React.ReactNode[] }) {
  const pista = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [parado, setParado] = useState(false);
  const total = titulos.length;

  const ir = useCallback(
    (i: number) => {
      const el = pista.current;
      if (!el) return;
      const alvo = (i + total) % total;
      el.scrollTo({ left: alvo * el.clientWidth, behavior: "smooth" });
    },
    [total],
  );

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const aoRolar = () => setAtual(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", aoRolar, { passive: true });
    return () => el.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (parado || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => ir(atual + 1), 9000);
    return () => clearInterval(id);
  }, [parado, atual, ir]);

  const seta =
    "pointer-events-auto absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-2xl font-bold text-navy shadow-lg ring-1 ring-navy/10 transition hover:bg-sun md:grid";

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Propostas em destaque"
      onMouseEnter={() => setParado(true)}
      onMouseLeave={() => setParado(false)}
      onFocus={() => setParado(true)}
      onBlur={() => setParado(false)}
      onTouchStart={() => setParado(true)}
    >
      <div className="relative">
        <div
          ref={pista}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children.map((c, i) => (
            <div
              key={titulos[i]}
              role="group"
              aria-roledescription="diapositivo"
              aria-label={`${i + 1} de ${total}: ${titulos[i]}`}
              className="w-full shrink-0 snap-center pb-6 pt-2"
            >
              {c}
            </div>
          ))}
        </div>

        {/* Setas nos lados do banner (só no computador) */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6">
            <button type="button" onClick={() => ir(atual - 1)} aria-label="Banner anterior" className={`${seta} left-8`}>
              ‹
            </button>
            <button type="button" onClick={() => ir(atual + 1)} aria-label="Banner seguinte" className={`${seta} right-8`}>
              ›
            </button>
          </div>
        </div>
      </div>

      <ul className="flex items-center justify-center">
        {titulos.map((t, i) => (
          <li key={t}>
            <button
              type="button"
              onClick={() => ir(i)}
              aria-label={`Ver: ${t}`}
              aria-current={atual === i}
              className="group grid h-10 place-items-center px-1"
            >
              <span className={`block h-3 rounded-full transition-all ${atual === i ? "w-8 bg-pink" : "w-3 bg-navy/25 group-hover:bg-navy/50"}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
