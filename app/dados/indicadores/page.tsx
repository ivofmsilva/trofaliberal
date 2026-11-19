import type { Metadata } from "next";
import Link from "next/link";
import { atualizado, indicadores, porTema, ultimo } from "@/lib/dados/dados";
import { compacto } from "@/lib/dados/formatar";
import { corDoTema } from "@/lib/dados/temas";

export const metadata: Metadata = {
  title: "Todos os indicadores",
  description: "A lista completa dos indicadores dos Dados da Trofa, por tema, com o último valor e o ano de cada um.",
};

// A lista completa, só texto: qualquer indicador a um toque, sem gráficos.
export default function TodosOsIndicadores() {
  const temas = porTema();
  return (
    <div className="bg-papel">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-14">
        <nav aria-label="Caminho" className="text-sm text-apagado">
          <Link href="/dados" className="inline-block py-2 hover:text-tinta hover:underline">
            Início
          </Link>
        </nav>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Todos os indicadores</h1>
        <p className="mt-4 text-lg text-texto">
          {indicadores.length} indicadores, por tema, com o último valor da Trofa e o ano. Atualizado a {atualizado ?? "—"}.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {temas.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="inline-block rounded-full border border-linha bg-fundo px-3.5 py-2 text-sm font-medium text-texto hover:border-tinta hover:text-tinta">
                {t.titulo}
              </a>
            </li>
          ))}
        </ul>

        {temas.map((t) => {
          const cor = corDoTema(t.id);
          return (
            <section key={t.id} id={t.id} aria-labelledby={`h-${t.id}`} className="scroll-mt-24 pt-10">
              <h2 id={`h-${t.id}`} className="flex items-center gap-3 text-xl font-bold tracking-tight text-tinta">
                <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg text-xs font-extrabold" style={{ background: cor.fundo, color: cor.tinta }}>
                  {cor.sigla}
                </span>
                {t.titulo}
                <span className="text-sm font-medium text-apagado">({t.itens.length})</span>
              </h2>
              <ul className="mt-3 divide-y divide-linha overflow-hidden rounded-2xl border border-linha bg-fundo">
                {t.itens.map((i) => {
                  const u = ultimo(i);
                  return (
                    <li key={i.slug}>
                      <Link href={`/dados/indicadores/${i.slug}`} className="flex items-center justify-between gap-4 px-5 py-3 transition hover:bg-trofa-suave">
                        <span className="min-w-0 font-medium leading-snug text-tinta">{i.titulo}</span>
                        <span className="shrink-0 text-right">
                          <span className="block font-bold tabular-nums text-trofa">{compacto(u?.v ?? null, i.unidade)}</span>
                          <span className="text-xs text-apagado">{u?.periodo ?? "—"}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
