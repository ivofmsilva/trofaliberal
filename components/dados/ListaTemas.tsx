"use client";

// Explorar os indicadores na página inicial, um tema de cada vez:
// - ao entrar: os temas (todos à vista) e os indicadores em destaque;
// - ao escolher um tema: só esse tema, com todos os seus indicadores; o tema fica no endereço (/dados#habitacao), para se
//   poder partilhar e para o botão de recuar funcionar;
// - ao escrever na pesquisa: uma lista simples de resultados (procura no título, tema, unidade, explicação e em palavras
//   do dia a dia como "casa", "lixo" ou "impostos").
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CartaoIndicador, { type Cartao } from "./CartaoIndicador";

export type { Cartao } from "./CartaoIndicador";
export type TemaCartoes = {
  id: string;
  titulo: string;
  texto: string;
  itens: Cartao[];
  cor?: { fundo: string; tinta: string; sigla: string };
  verTambem?: { texto: string; href: string }[];
};

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const conta = (n: number) => `${n} ${n === 1 ? "indicador" : "indicadores"}`;

export default function ListaTemas({ temas, destaques, total }: { temas: TemaCartoes[]; destaques: Cartao[]; total: number }) {
  const [q, setQ] = useState("");
  const [tema, setTema] = useState<string | null>(null);

  // O tema escolhido vem do endereço (#habitacao): ao abrir, ao recuar e quando se chega de um indicador.
  useEffect(() => {
    const ler = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      setTema(temas.some((t) => t.id === h) ? h : null);
    };
    ler();
    window.addEventListener("hashchange", ler);
    window.addEventListener("popstate", ler);
    return () => {
      window.removeEventListener("hashchange", ler);
      window.removeEventListener("popstate", ler);
    };
  }, [temas]);

  const escolher = (id: string | null) => {
    setQ("");
    window.history.pushState(null, "", id ? `#${id}` : window.location.pathname + window.location.search);
    setTema(id);
    document.getElementById("explorar")?.scrollIntoView({ block: "start" });
  };

  const filtro = semAcentos(q.trim());
  const resultados = useMemo(() => {
    if (!filtro) return [];
    const palavras = filtro.split(/\s+/);
    return temas.flatMap((t) => t.itens).filter((i) => palavras.every((p) => i.procura.includes(p)));
  }, [temas, filtro]);
  const atual = tema ? temas.find((t) => t.id === tema) : undefined;

  return (
    <div id="explorar" className="scroll-mt-16">
      <div className="sticky top-16 z-20 -mx-4 border-b border-linha bg-papel/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-2">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Procurar um indicador</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Procurar um indicador: renda, lixo, IMI, médicos…"
              className="w-full rounded-full border border-linha bg-fundo py-2.5 pl-4 pr-4 text-base text-tinta outline-none transition placeholder:text-apagado focus:border-tinta"
            />
          </label>
          <label className="shrink-0">
            <span className="sr-only">Tema</span>
            <select
              value={tema ?? ""}
              onChange={(e) => escolher(e.target.value || null)}
              className="w-[8.5rem] rounded-full border border-linha bg-fundo py-2.5 pl-3 pr-2 text-sm font-medium text-tinta outline-none focus:border-tinta sm:w-56"
            >
              <option value="">Todos os temas</option>
              {temas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.titulo} ({t.itens.length})
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtro ? (
        <section aria-label="Resultados da pesquisa" className="py-8">
          <p aria-live="polite" className="text-sm text-apagado">
            {resultados.length ? `${conta(resultados.length)} com «${q.trim()}»` : ""}
          </p>
          {resultados.length === 0 ? (
            <p aria-live="polite" className="py-12 text-center text-texto">
              Nenhum indicador com essa palavra. Experimenta outra ou vê a{" "}
              <Link href="/dados/indicadores" className="font-semibold text-trofa underline underline-offset-2">
                lista completa
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-linha overflow-hidden rounded-2xl border border-linha bg-fundo">
              {resultados.map((i) => (
                <li key={i.slug}>
                  <Link href={`/dados/indicadores/${i.slug}`} className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-trofa-suave">
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug text-tinta">{i.titulo}</span>
                      <span className="text-xs text-apagado">
                        {i.tema} · {i.periodo}
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-lg font-bold tabular-nums text-trofa">
                      {i.valor}
                      {i.legenda && <span className="block max-w-[9rem] text-xs font-normal leading-tight text-apagado">{i.legenda}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : atual ? (
        <section aria-labelledby={`tema-${atual.id}`} className="py-10">
          <button type="button" onClick={() => escolher(null)} className="inline-block py-2 text-sm font-semibold text-trofa hover:underline">
            ← Todos os temas
          </button>
          <div className="mt-4 grid gap-8 lg:grid-cols-[240px_1fr]">
            <div>
              {atual.cor && (
                <span aria-hidden className="mb-3 grid h-11 w-11 place-items-center rounded-xl text-base font-extrabold" style={{ background: atual.cor.fundo, color: atual.cor.tinta }}>
                  {atual.cor.sigla}
                </span>
              )}
              <h2 id={`tema-${atual.id}`} className="text-2xl font-bold tracking-tight text-tinta">
                {atual.titulo}
              </h2>
              <p className="mt-2 text-texto">{atual.texto}</p>
              <p className="mt-3 text-sm text-apagado">{conta(atual.itens.length)}</p>
              {atual.verTambem?.map((v) => (
                <p key={v.href} className="mt-3 text-sm">
                  <Link href={v.href} className="font-semibold text-trofa hover:underline">
                    {v.texto} →
                  </Link>
                </p>
              ))}
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {atual.itens.map((i) => (
                <li key={i.slug}>
                  <CartaoIndicador i={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <>
          <nav aria-label="Temas" className="pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-tinta md:text-3xl">Escolhe um tema</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {temas.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      escolher(t.id);
                    }}
                    className="flex h-full items-center gap-3 rounded-2xl border border-linha bg-fundo p-4 transition hover:border-trofa"
                  >
                    {t.cor && (
                      <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold" style={{ background: t.cor.fundo, color: t.cor.tinta }}>
                        {t.cor.sigla}
                      </span>
                    )}
                    <span>
                      <span className="block text-sm font-bold leading-tight text-tinta">{t.titulo}</span>
                      <span className="text-xs text-apagado">{conta(t.itens.length)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/dados/indicadores" className="inline-block py-1 font-semibold text-trofa hover:underline">
                Ver a lista completa dos {total} indicadores →
              </Link>
            </p>
          </nav>

          <section aria-labelledby="destaque" className="py-10">
            <h2 id="destaque" className="text-2xl font-bold tracking-tight text-tinta md:text-3xl">
              Em destaque
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destaques.map((i) => (
                <li key={i.slug}>
                  <CartaoIndicador i={i} mostrarTema />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
