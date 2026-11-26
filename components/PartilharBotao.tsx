"use client";

import { useState } from "react";

// Partilha a página (menu de partilha do telemóvel) ou, se não existir, copia o link.
// Com `endereco` (ex.: "/a-nossa-historia#nucleo"), partilha essa parte da página em vez da página toda.
export default function PartilharBotao({ titulo, texto, endereco, rotulo = "Partilhar esta página" }: { titulo: string; texto: string; endereco?: string; rotulo?: string }) {
  const [copiado, setCopiado] = useState(false);

  async function partilhar() {
    const url = endereco ? new URL(endereco, window.location.origin).href : window.location.href;
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
      {copiado ? "Link copiado ✓" : rotulo}
    </button>
  );
}
