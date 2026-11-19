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
  pontos: (number | null)[];
  grupo?: (number | null)[];
  mesmaEscala?: boolean;
  // Comparação do último ano: valor (quando se compara diretamente) ou variação (quando o grupo é uma soma).
  comparacao?: { nome: string; texto: string; trofa: boolean; fracao: number | null }[];
};
export type TemaCartoes = {
  id: string;
  titulo: string;
  texto: string;
  itens: Cartao[];
  cor?: { fundo: string; tinta: string; sigla: string };
  // quantos cartões se mostram antes do "ver mais" (os restantes ficam escondidos até se abrir o tema)
  principais?: number;
};

const seta = { sobe: "▲", desce: "▼", igual: "＝" } as const;

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function ListaTemas({ temas }: { temas: TemaCartoes[] }) {
  const [q, setQ] = useState("");
  const [abertos, setAbertos] = useState<Set<string>>(new Set());
  const mudar = (id: string, abrir: boolean) =>
    setAbertos((a) => {
      const n = new Set(a);
      if (abrir) n.add(id);
      else n.delete(id);
      return n;
    });
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

      {visiveis.map((t) => {
        // Na pesquisa mostra-se tudo o que bate; de resto, só os principais até se pedir "ver mais".
        const recolhido = !filtro && !abertos.has(t.id) && !!t.principais && t.principais < t.itens.length;
        const limite = recolhido ? (t.principais as number) : t.itens.length;
        const escondidos = t.itens.length - limite;
        const podeRecolher = !filtro && abertos.has(t.id) && !!t.principais && t.principais < t.itens.length;
        return (
        <section key={t.id} id={t.id} className="scroll-mt-24 border-b border-linha py-12 last:border-b-0">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <div>
              {t.cor && (
                <span aria-hidden className="mb-3 grid h-11 w-11 place-items-center rounded-xl text-base font-extrabold" style={{ background: t.cor.fundo, color: t.cor.tinta }}>
                  {t.cor.sigla}
                </span>
              )}
              <h2 className="text-2xl font-bold tracking-tight text-tinta">{t.titulo}</h2>
              <p className="mt-2 text-texto">{t.texto}</p>
              <p className="mt-3 text-sm text-apagado">
                {t.itens.length} {t.itens.length === 1 ? "indicador" : "indicadores"}
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {t.itens.slice(0, limite).map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/dados/indicadores/${i.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-linha bg-fundo p-5 transition hover:border-trofa hover:shadow-md"
                  >
                    <h3 className="text-sm font-semibold leading-snug text-tinta">{i.titulo}</h3>
                    <p className="mt-0.5 text-xs text-apagado">
                      {i.legenda ? `${i.legenda} · ` : ""}
                      {i.periodo}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <p className="text-3xl font-bold tabular-nums tracking-tight text-trofa">{i.valor}</p>
                      <Minigrafico pontos={i.pontos} grupo={i.grupo} mesmaEscala={i.mesmaEscala} />
                    </div>
                    {i.variacao && i.sinal && (
                      <p className="mt-1 text-sm font-medium tabular-nums text-texto">
                        <span aria-hidden>{seta[i.sinal]}</span> {i.variacao} face ao período anterior
                      </p>
                    )}
                    {i.comparacao && i.comparacao.length > 1 && (
                      <ul className="mt-3 grid gap-1.5 border-t border-dashed border-linha pt-3 text-xs text-texto">
                        {i.comparacao.map((c) => (
                          <li key={c.nome} className="grid grid-cols-[108px_1fr_64px] items-center gap-2">
                            <span className={c.trofa ? "font-semibold text-tinta" : ""}>{c.nome}</span>
                            <span className="h-2 rounded-full bg-[#eeedf3]">
                              {c.fracao !== null && (
                                <span
                                  className="block h-2 rounded-full"
                                  style={{ width: `${Math.max(4, c.fracao * 100)}%`, background: c.trofa ? "var(--trofa)" : c.nome === "Grupo dos 8" ? "var(--cmp)" : "var(--cmp-2)" }}
                                />
                              )}
                            </span>
                            <span className="text-right font-semibold tabular-nums text-tinta">{c.texto}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </li>
              ))}
              {escondidos > 0 && (
                <li className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => mudar(t.id, true)}
                    aria-expanded={false}
                    className="w-full rounded-2xl border border-dashed border-trofa/40 bg-trofa-suave/50 px-5 py-3.5 text-sm font-semibold text-trofa transition hover:border-trofa hover:bg-trofa-suave"
                  >
                    Ver mais {escondidos} {escondidos === 1 ? "indicador" : "indicadores"} ↓
                  </button>
                </li>
              )}
              {podeRecolher && (
                <li className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      mudar(t.id, false);
                      document.getElementById(t.id)?.scrollIntoView({ block: "start" });
                    }}
                    aria-expanded
                    className="w-full rounded-2xl px-5 py-2.5 text-sm font-medium text-apagado transition hover:text-tinta"
                  >
                    Mostrar só os principais ↑
                  </button>
                </li>
              )}
            </ul>
          </div>
        </section>
        );
      })}
    </div>
  );
}
