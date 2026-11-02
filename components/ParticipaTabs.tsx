"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type Separador = { id: string; label: string; conteudo: React.ReactNode };

// Um só separador visível de cada vez. O escolhido vai no endereço (?t=ideia), por isso
// as ligações do menu e as páginas antigas abrem logo no separador certo.
export default function ParticipaTabs({ separadores }: { separadores: Separador[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const pedido = params.get("t");
  const ativo = separadores.find((s) => s.id === pedido)?.id ?? separadores[0].id;

  return (
    <div>
      <div role="tablist" aria-label="Participa" className="flex flex-wrap gap-3">
        {separadores.map((s) => (
          <button
            key={s.id}
            id={`sep-${s.id}`}
            type="button"
            role="tab"
            aria-selected={ativo === s.id}
            aria-controls={`painel-${s.id}`}
            onClick={() => router.replace(`/participa?t=${s.id}`, { scroll: false })}
            className={`rounded-full px-6 py-3 font-bold transition ${
              ativo === s.id
                ? "bg-navy text-white"
                : "border-2 border-navy text-navy hover:bg-navy hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {separadores.map((s) => (
        <div
          key={s.id}
          id={`painel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`sep-${s.id}`}
          hidden={ativo !== s.id}
          className="mt-10"
        >
          {s.conteudo}
        </div>
      ))}
    </div>
  );
}
