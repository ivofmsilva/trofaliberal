"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Minigrafico from "./Minigrafico";

export type Cartao = {
  slug: string;
  titulo: string;
  valor: string;
  legenda: string;
  periodo: string;
  variacao: string | null;
  sinal: "sobe" | "desce" | "igual" | null;
  pontos: number[];
};
export type TemaCartoes = { id: string; titulo: string; texto: string; itens: Cartao[] };

const seta = { sobe: "▲", desce: "▼", igual: "＝" } as const;

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function ListaTemas({ temas }: { temas: TemaCartoes[] }) {
  const [q, setQ] = useState("");
  const filtro = semAcentos(q.trim());

  const visiveis = useMemo(
    () =>
      temas
        .map((t) => ({
          ...t,
          itens: filtro ? t.itens.filter((i) => semAcentos(i.titulo + " " + t.titulo).includes(filtro)) : t.itens,
        }))
        .filter((t) => t.itens.length > 0),
    [temas, filtro],
  );
  const total = visiveis.reduce((n, t) => n + t.itens.length, 0);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-b border-linha bg-fundo/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {temas.map((t) => (
              <li key={t.id} className="shrink-0">
                <a
                  href={`#${t.id}`}
                  className="inline-block rounded-full border border-linha px-4 py-2 text-sm font-medium text-texto transition hover:border-tinta hover:text-tinta"
                >
                  {t.titulo}
                </a>
              </li>
            ))}
          </ul>
          <label className="relative block md:w-72">
            <span className="sr-only">Pesquisar indicadores</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pesquisar indicadores…"
              className="w-full rounded-full border border-linha bg-suave py-2 pl-4 pr-4 text-base text-tinta outline-none transition placeholder:text-apagado focus:border-tinta focus:bg-fundo"
            />
          </label>
        </div>
      </div>

      {visiveis.length === 0 && <p className="py-16 text-center text-apagado">Sem resultados. Tenta outro termo.</p>}
      {filtro && visiveis.length > 0 && (
        <p className="pt-6 text-sm text-apagado">
          {total} {total === 1 ? "indicador" : "indicadores"}
        </p>
      )}

      {visiveis.map((t) => (
        <section key={t.id} id={t.id} className="scroll-mt-24 border-b border-linha py-12 last:border-b-0">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-tinta">{t.titulo}</h2>
              <p className="mt-2 text-texto">{t.texto}</p>
              <p className="mt-3 text-sm text-apagado">
                {t.itens.length} {t.itens.length === 1 ? "indicador" : "indicadores"}
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {t.itens.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/dados/indicadores/${i.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-linha bg-fundo p-5 transition hover:border-tinta hover:shadow-sm"
                  >
                    <h3 className="text-sm font-semibold leading-snug text-texto group-hover:text-tinta">{i.titulo}</h3>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <p className="text-3xl font-bold tabular-nums tracking-tight text-tinta">{i.valor}</p>
                      <Minigrafico pontos={i.pontos} />
                    </div>
                    <p className="mt-2 flex flex-wrap items-baseline gap-x-3 text-sm text-apagado">
                      <span>
                        {i.legenda ? `${i.legenda} · ` : ""}
                        {i.periodo}
                      </span>
                      {i.variacao && i.sinal && (
                        <span className="whitespace-nowrap tabular-nums">
                          <span aria-hidden>{seta[i.sinal]}</span> {i.variacao}
                        </span>
                      )}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
