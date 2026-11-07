"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Um separador tem conteúdo (abre aqui, na mesma página) ou um href (cartão que leva a outra página).
export type Separador = { id: string; label: string; resumo: string; conteudo?: React.ReactNode; href?: string };

// Um só separador visível de cada vez. O escolhido vai no endereço (?t=ideia), por isso as
// ligações do menu e as páginas antigas abrem logo no separador certo.
export default function Separadores({
  separadores,
  caminho,
  etiqueta,
}: {
  separadores: Separador[];
  caminho: string;
  etiqueta: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const pedido = params.get("t");
  const comConteudo = separadores.filter((s) => s.conteudo !== undefined);
  const ativo = comConteudo.find((s) => s.id === pedido)?.id ?? comConteudo[0].id;

  const cartao = "flex h-full flex-col rounded-2xl border-2 p-5 text-left transition";

  return (
    <div>
      <ul aria-label={etiqueta} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {separadores.map((s) => (
          <li key={s.id}>
            {s.href ? (
              <Link href={s.href} className={`${cartao} border-mist bg-white text-navy hover:border-cyan`}>
                <span className="font-display text-xl font-bold leading-tight">{s.label} →</span>
                <span className="mt-1 text-sm text-ink/70">{s.resumo}</span>
              </Link>
            ) : (
              <button
                id={`sep-${s.id}`}
                type="button"
                aria-pressed={ativo === s.id}
                aria-controls={`painel-${s.id}`}
                onClick={() => router.replace(`${caminho}?t=${s.id}`, { scroll: false })}
                className={`${cartao} w-full ${
                  ativo === s.id ? "border-navy bg-navy text-white" : "border-mist bg-white text-navy hover:border-cyan"
                }`}
              >
                <span className="font-display text-xl font-bold leading-tight">{s.label}</span>
                <span className={`mt-1 text-sm ${ativo === s.id ? "text-white/80" : "text-ink/70"}`}>{s.resumo}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
      {comConteudo.map((s) => (
        <div
          key={s.id}
          id={`painel-${s.id}`}
          role="region"
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
