"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Mostra um banner de cada vez (Metro, Habitação, Educação). Passa sozinho de 9 em 9 segundos,
// pára quando o rato ou o foco estão em cima, e não passa sozinho a quem pediu menos movimento.
// Cada banner é uma ligação e continua a ser uma página própria; isto só os organiza.
export default function CarrosselBanners({ titulos, children }: { titulos: string[]; children: React.ReactNode[] }) {
  const pista = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [parado, setParado] = useState(false);
  const total = titulos.length;

  const ir = useCallback((i: number) => {
    const el = pista.current;
    if (!el) return;
    const alvo = (i + total) % total;
    el.scrollTo({ left: alvo * el.clientWidth, behavior: "smooth" });
  }, [total]);

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
            className="w-full shrink-0 snap-center pb-8 pt-2"
          >
            {c}
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => ir(atual - 1)}
          aria-label="Banner anterior"
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-navy font-bold text-navy transition hover:bg-navy hover:text-white"
        >
          ←
        </button>
        <ul className="flex items-center gap-2">
          {titulos.map((t, i) => (
            <li key={t}>
              <button
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ver: ${t}`}
                aria-current={atual === i}
                className={`h-3 rounded-full transition-all ${atual === i ? "w-8 bg-pink" : "w-3 bg-navy/25 hover:bg-navy/50"}`}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => ir(atual + 1)}
          aria-label="Banner seguinte"
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-navy font-bold text-navy transition hover:bg-navy hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
