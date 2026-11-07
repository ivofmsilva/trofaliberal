"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type Separador = { id: string; label: string; resumo: string; conteudo: React.ReactNode };

// Um só separador visível de cada vez. O escolhido vai no endereço (?t=ideia), por isso
// as ligações do menu e as páginas antigas abrem logo no separador certo.
export default function ParticipaTabs({ separadores }: { separadores: Separador[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const pedido = params.get("t");
  const ativo = separadores.find((s) => s.id === pedido)?.id ?? separadores[0].id;

  return (
    <div>
      <div role="tablist" aria-label="Participa" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {separadores.map((s) => (
          <button
            key={s.id}
            id={`sep-${s.id}`}
            type="button"
            role="tab"
            aria-selected={ativo === s.id}
            aria-controls={`painel-${s.id}`}
            onClick={() => router.replace(`/participa?t=${s.id}`, { scroll: false })}
            className={`flex flex-col rounded-2xl border-2 p-5 text-left transition ${
              ativo === s.id
                ? "border-navy bg-navy text-white"
                : "border-mist bg-white text-navy hover:border-cyan"
            }`}
          >
            <span className="font-display text-xl font-bold leading-tight">{s.label}</span>
            <span className={`mt-1 text-sm ${ativo === s.id ? "text-white/80" : "text-ink/70"}`}>{s.resumo}</span>
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
