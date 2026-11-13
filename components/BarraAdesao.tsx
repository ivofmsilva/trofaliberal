"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Barra discreta no fundo do ecrã nas páginas de ideias: aparece depois de se ler um bocado
// e leva a quem gostou diretamente à adesão. Fecha-se com o X até a página ser aberta de novo.
export default function BarraAdesao() {
  const [visivel, setVisivel] = useState(false);
  const [fechada, setFechada] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 700);
    const arranque = setTimeout(aoRolar, 0);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      clearTimeout(arranque);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  if (fechada) return null;

  return (
    <div
      role="region"
      aria-label="Fazer parte da Iniciativa Liberal Trofa"
      inert={!visivel}
      className={`fixed inset-x-0 bottom-0 z-40 bg-navy text-white shadow-[0_-8px_24px_rgba(0,30,70,0.25)] transition-transform duration-300 ${
        visivel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
        <p className="text-sm font-bold sm:text-base">
          Se te revês nestas ideias,
        </p>
        <Link
          href="/participa?t=membro"
          className="shrink-0 rounded-full bg-sun px-5 py-2 text-sm font-bold text-navy transition hover:bg-white"
        >
          entra na onda liberal →
        </Link>
        <button
          type="button"
          onClick={() => setFechada(true)}
          aria-label="Fechar"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
