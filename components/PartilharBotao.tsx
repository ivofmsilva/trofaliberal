"use client";

import { useState } from "react";

// Partilha a página (menu de partilha do telemóvel) ou, se não existir, copia o link.
export default function PartilharBotao({ titulo, texto }: { titulo: string; texto: string }) {
  const [copiado, setCopiado] = useState(false);

  async function partilhar() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto, url });
        return;
      } catch {
        // cancelado pelo utilizador: tenta copiar
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <button
      type="button"
      onClick={partilhar}
      className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
    >
      {copiado ? "Link copiado ✓" : "Partilhar esta página"}
    </button>
  );
}
