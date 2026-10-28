"use client";

import { useCallback, useEffect, useState } from "react";

export type Marco = {
  ano: string;
  titulo: string;
  texto: string;
  foto?: { src: string; alt: string };
};

// Cada quadrado com foto abre-a ao clicar (Esc ou clicar fora para fechar).
export default function Marcos({ marcos }: { marcos: Marco[] }) {
  const [aberto, setAberto] = useState<Marco | null>(null);
  const fechar = useCallback(() => setAberto(null), []);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto, fechar]);

  return (
    <>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {marcos.map((m) => {
          const conteudo = (
            <div className="p-6 text-left">
              <span className="font-display text-4xl font-bold text-sun">{m.ano}</span>
              <h3 className="font-display mt-3 text-lg font-bold leading-snug">{m.titulo}</h3>
              <p className="mt-2 text-sm text-white/80">{m.texto}</p>
              {m.foto && (
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sun">
                  <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                    <path d="M3 8h4l2-3h6l2 3h4v11H3z" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                  Ver foto
                </span>
              )}
            </div>
          );
          return (
            <li key={`${m.ano}-${m.titulo}`} className="overflow-hidden rounded-2xl bg-navy-soft">
              {m.foto ? (
                <button
                  type="button"
                  onClick={() => setAberto(m)}
                  aria-label={`Ver a foto: ${m.titulo} (${m.ano})`}
                  className="block h-full w-full transition hover:bg-white/5"
                >
                  {conteudo}
                </button>
              ) : (
                conteudo
              )}
            </li>
          );
        })}
      </ol>

      {aberto?.foto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${aberto.titulo} (${aberto.ano})`}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/90 p-4"
          onClick={fechar}
        >
          <button
            type="button"
            onClick={fechar}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-2xl font-bold text-white hover:bg-white/20"
            aria-label="Fechar"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aberto.foto.src}
            alt={aberto.foto.alt}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="max-w-2xl text-center text-white" onClick={(e) => e.stopPropagation()}>
            <span className="font-display font-bold text-sun">{aberto.ano}</span> · {aberto.titulo}
          </p>
        </div>
      )}
    </>
  );
}
