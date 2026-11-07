"use client";

import { useState } from "react";
import type { Perfil } from "@/lib/habitacao-extra";

// "O que muda para ti": escolhe-se a situação e aparecem só as medidas que interessam.
export default function PerfisHabitacao({ perfis }: { perfis: Perfil[] }) {
  const [ativo, setAtivo] = useState(perfis[0].id);
  const atual = perfis.find((p) => p.id === ativo) ?? perfis[0];

  return (
    <div>
      <div role="tablist" aria-label="A tua situação" className="flex flex-wrap gap-2">
        {perfis.map((p) => (
          <button
            key={p.id}
            id={`perfil-${p.id}`}
            type="button"
            role="tab"
            aria-selected={ativo === p.id}
            aria-controls="perfil-painel"
            onClick={() => setAtivo(p.id)}
            className={`rounded-full px-5 py-2.5 font-bold transition ${
              ativo === p.id
                ? "bg-navy text-white"
                : "border-2 border-navy text-navy hover:bg-navy hover:text-white"
            }`}
          >
            {p.titulo}
          </button>
        ))}
      </div>

      <div
        id="perfil-painel"
        role="tabpanel"
        aria-labelledby={`perfil-${atual.id}`}
        className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8"
      >
        <p className="font-display text-2xl font-bold leading-tight text-navy">{atual.resumo}</p>
        <ul className="mt-5 space-y-2">
          {atual.medidas.map((m) => (
            <li key={m} className="list-disc text-ink/85 marker:text-pink ml-5">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
